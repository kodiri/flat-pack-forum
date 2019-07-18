import React from 'react';

import './SubmitThread.css';

export default class SubmitThread extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            threadTitle: '',
            threadComment: ''
        };
    }

    handleClick = () => {
        fetch('/rest/submit-thread', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: this.state.threadTitle,
                comment: this.state.threadComment
            })
        }).then(res => res.ok ? res.json() : Promise.reject()).then(res => {
            
        });
    }

    textHandler = event => {
        let value = event.target.value;
        let name = event.target.name;
        this.setState(() => ({ [name]: value }));
    }

    render() {
        return (
            <div className='SubmitThread'>
                <input className='item'
                    name='threadTitle'
                    type='text'
                    placeholder='enter the title'
                    value={this.state.threadTitle}
                    onChange={this.textHandler} />
                <textarea className='item'
                    name='threadComment'
                    placeholder='enter the comment'
                    value={this.state.threadComment}
                    onChange={this.textHandler} />
                <button onClick={this.handleClick} className='item' type='submit' value='SUBMIT'>SUBMIT</button>
            </div>
        );
    }
}