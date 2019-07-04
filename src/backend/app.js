const express = require('express');
const app = express();
const path = require('path');
const buildPath = '../../build';
const port = process.env.PORT || 3001;

app.get('/refresh-session', (_req, res) => {
    res.end(JSON.stringify({
        result: true,
        message: "Session refreshed!"
    }));
});

app.get('/rest/threads', (_req, res) => {
    res.end(JSON.stringify([
        {
            title: 'Help, how to fix a chair with uneven leges??s?'
        },
        {
            title: 'Monitor isn\'t working running latest update 2.6.11'
        },
        {
            title: 'Is there shortcut to open JKWindow Dialog box?'
        },
        {
            title: 'LAST USER TO POST IN THIS THREAD WINS!1!!'
        },
        {
            title: 'Where do I go to submit application for AUWL Summer 20XX??'
        },
        {
            title: 'Confused abt transport in Niaple, overly expensive trains?'
        },
        {
            title: 'What is the most important discovery in human history?'
        },
        {
            title: 'dealing with noisy neighbours'
        },
        {
            title: 'I uploaded my work to the portal last night but my ' + 
                'profile hasn\'t updated yet'
        },
        {
            title: 'Cannot overwrite save ERROR211: Unknown, 0x86a8f886 exce...'
        },
    ]));
});

app.get('/rest/posts/:thread', (_req, res) => {
    res.end(JSON.stringify([
        {
            user: {
                username: 'Peter7737'
            },
            content: 'Yesterday was a beautiful Sunny day, tommorrow may be ' + 
                'even better!'
        },
        {
            user: {
                username: 'Infelible_Ireden'
            },
            content: 'wat'
        },
        {
            user: {
                username: 'Peter7737'
            },
            content: 'Good day to you, are you enjoying the Sun\'s brilliant' +
                ' rays today?'
        },
        {
            user: {
                username: 'xZeronLegends_00x'
            },
            content: 'Ignore Peter7737, he is a bot, please report this thread'
        },
        {
            user: {
                username: 'domdanouseWalker'
            },
            content: 'i think peter is actually a real person'
        },
        {
            user: {
                username: 'Peter7737'
            },
            content: 'Come my Sun brothers, there is plenty of Sun for ' + 
                'everyone to praise!'
        },
        {
            user: {
                username: 'Admin'
            },
            content: 'That\'s enough Peter, I\'m closing this thread'
        },
        {
            user: {
                username: 'xZeronLegends_00x'
            },
            content: 'FINALLY'
        },
    ]));
})

app.post('/rest/submitthread', (_req, res) => {
    console.log("Submit Thread request received");
    res.end(JSON.stringify({
        result: true,
        message: "Successfully submitted thread to the backend!"
    }))
});

app.post('/rest/submitpost', (_req, res) => {
    console.log("Submit Post request received");
    res.end(JSON.stringify({
        result: true,
        message: "Successfully submitted post to the backend!"
    }))
});

app.use(express.static(path.join(__dirname, buildPath)));
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, buildPath, 'index.html'));
});

app.listen(port, () => console.log(`Flatpack Express Backend ` + 
    `now listening on port ${port}!`));