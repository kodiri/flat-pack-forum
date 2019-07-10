import React from 'react';
import { Link } from 'react-router-dom';
import './ForumIndex.css'


export default class ForumIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            threadLinks: 
                [<ThreadLink text="threadlink 1" num='1'/>,
                <ThreadLink text="threadlink 2" num='2'/>,
                <ThreadLink text="threadlink 3" num='3'/>,
                <ThreadLink text="threadlink 4" num='4'/>,
                <ThreadLink text="threadlink 5" num='5'/>,
                <ThreadLink text="threadlink 6" num='6'/>]
        };
    }

    render() {
        return (<div className='ForumIndex'>
            <div className='headerContainer'>
                Flat-Pack-Forum
                <div className='addThreadButton'>
                    <Link to='/submit'><img src={require('./common/images/addThread.png')} alt='add thread' /></Link>
                </div>
            </div>
            {this.state.threadLinks}
        </div>);
    }
}

class ThreadLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
            num: props.num
        };
    }

    render() {
        return (
        <div className='threadContainer'>
            <Link to={`/thread/${this.state.num}`}>{this.state.text}</Link>
        </div>);
    }
}