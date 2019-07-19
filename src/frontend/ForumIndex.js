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
        const {num, title, firstPost, lastPost} = this.props;
        return (
            <div className='ThreadLink'>
                <div className='body'>
                    <Link to={`/thread/${num}`}>{title}</Link>
                </div>
                <div className='footer'>
                    <div className='threadNumber'>#{num}</div>
                    <div className='creator'>Created by {
                        firstPost.user.username
                    }<div className='time'>{
                        new Date(firstPost.date).toLocaleDateString(
                            "en-UK",
                            {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric'
                            })
                    }</div></div>
                    <div className='lastPost'>Last post by {
                        lastPost.user.username
                    }<div className='time'>{
                        new Date(lastPost.date).toLocaleDateString(
                            "en-UK",
                            {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric'
                            })
                    }</div></div>
                </div>
            </div>);
    }
}