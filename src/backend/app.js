const { User, getUsers } = require('./users');
const getThreads = require('./threads');
const throttle60s = require('./spamChecker');
const sessionStore = require('./sessionStore');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const fetch = require('node-fetch');
const path = require('path');
const buildPath = '../../build';
const port = process.env.PORT || 3001;

let users = getUsers();

let threads = getThreads().map(thread => {
    thread.posts = thread.posts.map((post, i) => {
        post = {
            ...post,
            user: {
                ...post.user,
                userType: post.user.username === 'Admin' ? 'Admin' : 'User'
            },
            date: Date.now()
                - (thread.posts.length - i) * 10000
                + Math.floor(Math.random() * Math.floor(9999))
        };
        return post;
    })
    return thread;
});

app.use(sessionStore());

app.get('/refresh-session', (req, res) => {
    const clientInfo = req.session.signedIn ?
        {
            ...req.session.clientInfo,
            expires: req.session.cookie._expires
        } :
        { noSession: true };
    res.end(JSON.stringify({
        result: true,
        message: "Session refreshed!",
        clientInfo
    }));
});

app.get('/rest/thread/:threadNumber', (req, res) => {
    handleThreadRequest(
        req.params.threadNumber,
        res,
        thread => res.end(JSON.stringify(thread)),
        '/rest/thread/:threadNumber'
    )
});

app.get('/rest/forumIndex', (_req, res) => {
    res.end(JSON.stringify(threads.map(thread => ({
        title: thread.title,
        number: thread.number,
        firstPost: thread.posts[0],
        lastPost: thread.posts[thread.posts.length - 1]
    }))));
});

app.get('/rest/threads', (_req, res) => {
    res.end(JSON.stringify(threads));
});

app.get('/rest/threads/titles', (_req, res) => {
    res.end(JSON.stringify(threads.map(thread => thread.title)));
});

app.get('/rest/posts/:threadNumber', (req, res) => {
    console.log(`Received GET request for /rest/posts/${req.params.threadNumber}`);
    handleThreadRequest(req.params.threadNumber,
        res,
        thread => res.end(JSON.stringify(thread.posts)),
        '/rest/posts/:threadNumber');
});

app.get('/rest/users', (_req, res) => {
    res.end(JSON.stringify(users));
});

app.get('/rest/user/:uuid', (req, res) => {
    const uuid = req.params.uuid;
    console.log(`Received GET request for User ${uuid} on /rest/user/${uuid}`);
    handleUserRequest(uuid,
        res,
        user => res.end(JSON.stringify(user)),
        '/rest/user/:uuid');
});

app.post('/rest/submit-thread', jsonParser, (req, res) => {
    console.log("Submit Thread request received");
    const ipAddress = req.ip;
    throttle60s(ipAddress, res, () => {
        const threadNumber = threads.length;
        threads.push(
            {
                title: req.body.title,
                number: threadNumber,
                posts: [new Post('Guest', 'Guest', req.body.comment, Date.now())]
            }
        );
        res.end(JSON.stringify({
            result: true,
            message: `Successfully submitted thread to the backend! The thread is `
                + `available at threadNumber: ${threadNumber}`,
            threadNumber
        }));
        console.log(`Successfully created a thread from ipAddress: ${ipAddress}`);
    });
});

app.post('/rest/submit-post/:threadNumber', jsonParser, (req, res) => {
    const { username, userType } = req.session.signedIn ? {
        username: req.session.clientInfo.username,
        userType: req.session.clientInfo.userType
    } : {
            username: req.body.username,
            userType: 'Guest'
        };
    const post = req.body.post;
    console.log(`Submit Post request received on Thread ` +
        `<${req.params.threadNumber}> Post: <${post}>`);
    handleThreadRequest(req.params.threadNumber,
        res,
        thread => {
            const newPost = new Post(
                (username || 'Guest'),
                userType,
                post,
                Date.now()
            );
            thread.posts.push(newPost);
            console.log("Created new post: ", newPost);
            res.end(JSON.stringify({
                result: true,
                message: "Successfully submitted post to the backend!",
                post: `The post: ${post}`,
                posts: thread.posts
            }));
        },
        '/rest/submit-post/:threadNumber'
    );
});

app.post('/rest/authenticate/sign-up', jsonParser, (req, res) => {
    console.log("Received request to sign up!");
    let {name, password, email} = req.body;
    let user = users.find(user => user.email === email);
    if (user) {
        res.end(JSON.stringify({
            result: false,
            message: `User already exists! (Standard method)`
        }));
    } else {
        signUpUser(req, name, password, email);
        res.end(JSON.stringify({
            result: true,
            message: `Successfully signed up user with standard method`
        }));
    }
})

app.post('/rest/authenticate/sign-in', jsonParser, (req, res) => {
    req.session.signedIn = true;
    const username = '';
    console.log(req.session);
    res.end(JSON.stringify({
        result: true,
        message: `Successfully signed in as user ${username} with standard method`
    }));
});

app.post('/rest/authenticate/sign-in/google', jsonParser, (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    const id_token = authorizationHeader && authorizationHeader.replace('Bearer ', '');
    if (id_token) {
        fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`).then(res => {
            return res.ok ? res.json() : Promise.reject();
        }).then(googleRes => {
            console.log("Decoded token: ", googleRes);
            const { name, email, email_verified } = googleRes;
            let user = users.find(user => user.email === email);
            if (user) {
                user = signInUser(req, user, {email_verified});
            } else {
                user = signUpUser(req, name, 'noPassword', email, {email_verified});
            }
            console.log(req.session);
            res.end(JSON.stringify({
                result: true,
                message: `Successfully signed in as user ${name} with Google SignIn`,
                uuid: user.uuid
            }));
        }).catch(error => {
            res.end(JSON.stringify({
                result: false,
                message: `Failed to authenticate ID with Google, ${error}`
            }));
        });
    } else {
        res.end(JSON.stringify({
            result: false,
            message: `Authorization Headers were not sent to the backend!`
        }));
    }
});

app.post('/rest/authenticate/sign-out', jsonParser, (req, res) => {
    console.log(`Received a Sign Out request!`);
    if (req.body.hasOwnProperty('clientInfo')) {
        console.log('Sucessfully signed out on backend, ClientInfo: ', req.body.clientInfo);
        req.session.signedIn = false;
        delete req.session.clientInfo;
        res.end(JSON.stringify({
            result: true,
            message: 'Successfully signed out on the backend!'
        }));
    } else {
        console.log('Failed to signout on backend');
        res.end(JSON.stringify({
            result: false,
            message: 'Failed to sign out!'
        }));
    }
});

app.use(express.static(path.join(__dirname, buildPath)));
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, buildPath, 'index.html'));
});

app.listen(port, () => console.log(`Flatpack Express Backend ` +
    `now listening on port ${port}!`));

function signInUser(req, user, googleRes) {
    console.log('Signing in User: ', user);
    user.lastActive = Date.now();
    signInSession(req, user, googleRes);
    return user;
}

function signUpUser(req, name, _password, email, googleRes) {
    console.log('Signing up User. Name: ', name, 
        '\nPassword: ', _password, '\nEmail: ', email,
        '\nGoogleRes: ', googleRes);
    const user = new User(
        name,
        'User',
        users.length,
        email,
        'N/A',
        Date.now(),
        Date.now()
    );
    users.push(user);
    console.log("Adding new user: ", user, "\nUser list: ", users);
    signInSession(req, user, googleRes);
    return user;
}

function signInSession(req, {username, userType, email, uuid}, googleRes) {
    req.session.signedIn = true;
    req.session.clientInfo = {
        signedIn: true,
        username,
        userType,
        email,
        uuid,
        ...(googleRes &&
            { email_verified: googleRes.email_verified, googleAccount: true }
        )
    };
}

function handleThreadRequest(requestedNum, res, handleThread, endpoint = 'endpoint') {
    handleWildcardNum(requestedNum, res, threadNumber => {
        const thread = threads.find(thread => thread.number === threadNumber);
        if (thread) {
            handleThread(thread);
        } else {
            res.end(JSON.stringify({
                result: false,
                message: `Thread ThreadNumber: ${threadNumber} does not exist!`
            }));
        }
    }, endpoint);
}

function handleUserRequest(requestedNum, res, handleUser, endpoint = 'endpoint') {
    handleWildcardNum(requestedNum, res, uuid => {
        const user = users.find(user => user.uuid === uuid);
        if (user) {
            handleUser(user);
        } else {
            res.end(JSON.stringify({
                result: false,
                message: `User uuid: ${uuid} does not exist!`
            }));
        }
    }, endpoint);
}

function handleWildcardNum(requestedNum, res, handleSuccess, endpoint) {
    const number = parseInt(requestedNum);
    if (number.toString() !== requestedNum) {
        res.end(JSON.stringify({
            result: false,
            message: `Invalid URL particle: '${requestedNum}', ` +
                `${endpoint} requires an Integer`
        }));
    } else {
        handleSuccess(number);
    }
}

class Post {
    constructor(username, userType, content, date) {
        this.user = { username, userType };
        this.content = content;
        this.date = date;
    }
}