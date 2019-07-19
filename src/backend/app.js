const getThreads = require('./threads');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const path = require('path');
const buildPath = '../../build';
const port = process.env.PORT || 3001;

let threads = getThreads().map(thread => {
    thread.posts = thread.posts.map((post, i) => {
        post = {
            ...post,
            date: Date.now()
                - (thread.posts.length - i) * 10000
                + Math.floor(Math.random() * Math.floor(9999))
        };
        return post;
    })
    return thread;
});

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

app.post('/rest/submit-thread', jsonParser, (req, res) => {
    console.log("Submit Thread request received");
    threads.push(
        {
            title: req.body.title,
            number: threads.length,
            posts: [{
                user: {
                    username: 'Guest'
                },
                date: Date.now(),
                content: req.body.comment
            }]
        }
    );
    res.end(JSON.stringify({
        result: true,
        message: "Successfully submitted thread to the backend!"
    }));
});

app.post('/rest/submit-post/:threadNumber', jsonParser, (req, res) => {
    const post = req.body.post;
    console.log(`Submit Post request received on Thread ` + 
        `<${req.params.threadNumber}> Post: <${post}>`);
    handleThreadRequest(req.params.threadNumber,
        res,
        thread => {
            const newPost = {
                user: {
                    username: 'Guest'
                },
                content: post
            };
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

app.use(express.static(path.join(__dirname, buildPath)));
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, buildPath, 'index.html'));
});

app.listen(port, () => console.log(`Flatpack Express Backend ` + 
    `now listening on port ${port}!`));

function handleThreadRequest(requestedNum, res, handleThread, endpoint = 'endpoint') {
    const threadNumber = parseInt(requestedNum);
    if (threadNumber.toString() !== requestedNum) {
        res.end(JSON.stringify({
            result: false,
            message: `Invalid URL, ${endpoint} requires an Integer`
        }));
    } else {
        const thread = threads.find(thread => thread.number === threadNumber);
        if (thread) {
            handleThread(thread);
        } else {
            res.end(JSON.stringify({
                result: false,
                message: `Thread ${threadNumber} does not exist!`
            }));
        }
    }
}