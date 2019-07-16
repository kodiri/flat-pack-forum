const getThreads = require('./threads');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const path = require('path');
const buildPath = '../../build';
const port = process.env.PORT || 3001;

let threads = getThreads();

app.get('/refresh-session', (_req, res) => {
    res.end(JSON.stringify({
        result: true,
        message: "Session refreshed!"
    }));
});

app.get('/rest/threads', (_req, res) => {
    res.end(JSON.stringify());
});

app.get('/rest/threads/titles', (_req, res) => {
    res.end(JSON.stringify());
});

app.get('/rest/posts/:threadNumber', (req, res) => {
    console.log(`Received GET request for /rest/posts/${req.params.threadNumber}`);
    const threadNumber = parseInt(req.params.threadNumber);
    if (threadNumber.toString() !== req.params.threadNumber) {
        res.end(JSON.stringify({
            result: false,
            message: 'Invalid URL, /rest/posts/:number requires an Integer'
        }));
    } else {
        const thread = threads.find(thread => thread.number === threadNumber);
        if (thread) {
            res.end(JSON.stringify(thread.posts));
        } else {
            res.end(JSON.stringify({
                result: false,
                message: `Thread ${threadNumber} does not exist!`
            }));
        }
    }
})

app.post('/rest/submit-thread', jsonParser, (_req, res) => {
    console.log("Submit Thread request received");
    res.end(JSON.stringify({
        result: true,
        message: "Successfully submitted thread to the backend!"
    }));
});

app.post('/rest/submit-post/:threadNumber', jsonParser, (req, res) => {
    const post = req.body.post;
    const threadNumber = parseInt(req.params.threadNumber);
    const thread = threads.find(thread => thread.number === threadNumber);
    console.log(`Submit Post request received on Thread <${threadNumber}>` + 
        `Post: <${post}>`);
    if (thread) {
        thread.posts.push({
            user: {
                username: 'Guest'
            },
            content: post
        });
        res.end(JSON.stringify({
            result: true,
            message: "Successfully submitted post to the backend!",
            post: `The post: ${post}`,
            posts: thread.posts
        }));
    } else {
        res.end(JSON.stringify({
            result: false,
            message: `Thread ${threadNumber} does not exist!`
        }));
    }
});

app.use(express.static(path.join(__dirname, buildPath)));
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, buildPath, 'index.html'));
});

app.listen(port, () => console.log(`Flatpack Express Backend ` + 
    `now listening on port ${port}!`));