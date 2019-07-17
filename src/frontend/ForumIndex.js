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
        fetch(`/rest/threads/titles`).then(res => {
            return res.ok ? res.json() : Promise.reject();
        }).then(titles => {
            this.setState({
                threadLinks: titles.map((title, i) => {
                    return <ThreadLink key={i} num={i} text={title} />
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