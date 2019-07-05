import React from 'react';
import { Link } from 'react-router-dom';
import './ForumIndex.css'

export default class ForumIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            threadLinks: 
                [<ThreadLink text="threadlink 1"/>,
                <ThreadLink text="threadlink 2"/>,
                <ThreadLink text="threadlink 3"/>,
                <ThreadLink text="threadlink 4"/>,
                <ThreadLink text="threadlink 5"/>,
                <ThreadLink text="threadlink 6"/>]
        };
    }

    render() {
        return (<>
            <div className='headerContainer'>
                Flat-Pack-Forum
                <div className='addThreadButton'>
                    <Link to='/submit'><img src={require('./common/images/addThread.png')} alt='add thread' /></Link>
                </div>
            </div>
            {this.state.threadLinks}
        </>);
    }
}

class ThreadLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text
        };
    }

    render() {
        return (
        <div className='threadContainer'>
            <Link>{this.state.text}</Link>
        </div>);
    }
}