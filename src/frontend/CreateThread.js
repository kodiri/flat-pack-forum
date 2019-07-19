import React from 'react';

import './CreateThread.css';

export default class CreateThread extends React.Component {
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
            <div className='CreateThread'>
                <h1>Create a new thread!</h1>
                <div className='threadTitle item'>
                    <label forHtml='threadTitle'>Title:</label>
                    <input name='threadTitle'
                        type='text'
                        placeholder='enter the title'
                        value={this.state.threadTitle}
                        onChange={this.textHandler} />
                </div>
                <div classname='threadComment item'>
                    <label forHtml='threadComment'>First Comment:</label>
                    <textarea name='threadComment'
                        placeholder='enter the comment'
                        value={this.state.threadComment}
                        onChange={this.textHandler} />
                </div>
                <button onClick={this.handleClick} className='item' type='submit' value='SUBMIT'>Create Thread!</button>
            </div>
        );
    }
}