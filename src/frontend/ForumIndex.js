import React from 'react';
import { Link } from 'react-router-dom';
import './ForumIndex.css'


export default class ForumIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            threadLinks: 
                [<ThreadLink key='1' text="threadlink 1" num='1'/>,
                <ThreadLink key='2' text="threadlink 2" num='2'/>,
                <ThreadLink key='3' text="threadlink 3" num='3'/>,
                <ThreadLink key='4' text="threadlink 4" num='4'/>,
                <ThreadLink key='5' text="threadlink 5" num='5'/>,
                <ThreadLink key='6' text="threadlink 6" num='6'/>]
        };
    }

    render() {
        return (<div className='ForumIndex'>
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
        <div className='ThreadLink'>
            <Link to={`/thread/${this.state.num}`}>{this.state.text}</Link>
        </div>);
    }
}