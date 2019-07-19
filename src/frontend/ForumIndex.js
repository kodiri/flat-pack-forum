import React from 'react';
import { Link } from 'react-router-dom';
import './ForumIndex.css'


export default class ForumIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            threadLinks: []
        };
    }

    componentDidMount() {
        fetch(`/rest/forumIndex`).then(res => {
            return res.ok ? res.json() : Promise.reject();
        }).then(threadLinks => {
            this.setState({
                threadLinks: threadLinks.map(({
                    title,
                    firstPost,
                    lastPost
                }, i) => {
                    return <ThreadLink key={i}
                        num={i}
                        title={title}
                        firstPost={firstPost}
                        lastPost={lastPost} />
                })
            });
        });
    }

    render() {
        return (<div className='ForumIndex'>
            {this.state.threadLinks}
        </div>);
    }
}

class ThreadLink extends React.Component {
    render() {
        const { num, title, firstPost, lastPost } = this.props;
        return (
            <div className='ThreadLink'>
                <div className='threadDetails'>
                    <div className='threadNumber'>#{num}</div>
                    <div className='creator'>Created by {
                        formatUser(firstPost.user)
                    }<div className='time'>{
                        createDate(firstPost.date)
                    }</div></div>
                    <div className='lastPost'>Last post by {
                        formatUser(lastPost.user)
                    }<div className='time'>{
                        createDate(lastPost.date)
                    }</div></div>
                </div>
                <div className='body'>
                    <Link to={`/thread/${num}`}>{title}</Link>
                </div>
            </div>);
    }
}

function formatUser(user) {
    switch (user.userType) {
        case 'Guest':
            return (<>
                <div className='guest identifier'>Guest</div>
                <div className='username'> {user.username}</div>
            </>);
        case 'User':
            return (<>
                <div className='user identifier'>User</div>
                <div className='username'> {user.username}</div>
            </>);
        case 'Admin':
            return (<>
                <div className='admin identifier'>Admin</div>
                <div className='username'> {user.username}</div>
            </>);
        default:
            return (<>
                <div className='guest identifier'>Guest</div>
                <div className='username'> {user.username}</div>
            </>);
    }
}

function createDate(unixTimestamp) {
    return new Date(unixTimestamp).toLocaleDateString(
        "en-UK",
        {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }
    );
}