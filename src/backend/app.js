const getUsers = require('./users');
const getThreads = require('./threads');
const sessionStore = require('./sessionStore');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const path = require('path');
const buildPath = '../../build';
const port = process.env.PORT || 3001;

let users = getUsers().map(user => {
    return { ...user, joinDate: Date.now(), lastActive: Date.now() };
});

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

app.get('/refresh-session', (_req, res) => {
    res.end(JSON.stringify({
        result: true,
        message: "Session refreshed!"
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
        firstPost: thread.posts[0],
        lastPost: thread.posts[thread.posts.length - 1]
    }))));
})

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
})

app.get('/rest/users', (_req, res) => {
    res.end(JSON.stringify(users));
})

app.get('/rest/user/:uuid', (req, res) => {
    const uuid = req.params.uuid;
    console.log(`Received GET request for User ${uuid} on /rest/user/${uuid}`);
    handleUserRequest(uuid,
        res,
        user => res.end(JSON.stringify(user)),
        '/rest/user/:uuid');
})

app.post('/rest/submit-thread', jsonParser, (req, res) => {
    console.log("Submit Thread request received");
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
});

app.post('/rest/submit-post/:threadNumber', jsonParser, (req, res) => {
    const post = req.body.post;
    console.log(`Submit Post request received on Thread ` + 
        `<${req.params.threadNumber}> Post: <${post}>`);
    handleThreadRequest(req.params.threadNumber,
        res,
        thread => {
            const newPost = new Post('Guest', 'Guest', post, Date.now());
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

app.post('/rest/authenticate/sign-in', jsonParser, (req, res) => {
    req.session.loggedIn = true;
    const username = '';
    console.log(req.session);
    res.end(JSON.stringify({
        result: true,
        message: `Successfully signed in as user ${username}`
    }));
});

app.use(express.static(path.join(__dirname, buildPath)));
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, buildPath, 'index.html'));
});

app.listen(port, () => console.log(`Flatpack Express Backend ` + 
    `now listening on port ${port}!`));

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
    constructor(username, usertype, content, date) {
        this.user = { username, usertype };
        this.content = content;
        this.date = date;
    }
}