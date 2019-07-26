import React from 'react';
import { withRouter } from 'react-router-dom';

import './CreateThread.css';

class CreateThread extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            threadTitle: '',
            threadComment: '',
            enableSubmit: false
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
            if (res.hasOwnProperty('threadNumber')) {
                this.props.history.push(`/thread/${res.threadNumber}`);
            } else {
                console.log('Error: Thread could not be created!');
            }
        });
    }

    textHandler = event => {
        let value = event.target.value;
        let name = event.target.name;
        this.setState((prevState) => ({
            [name]: value,
            enableSubmit: value.length > 0 &&
                (name === 'threadComment' ? prevState.threadTitle.length > 0 :
                prevState.threadComment.length > 0)
        }));
    }

    render() {
        const {
            threadTitle, threadComment, enableSubmit
        } = this.state;
        return (
            <div className='CreateThread'>
                <h1>Create a new thread!</h1>
                <div className='threadTitle item'>
                    <label htmlFor='threadTitle'>Title:</label>
                    <input name='threadTitle'
                        type='text'
                        placeholder='enter the title'
                        value={threadTitle}
                        onChange={this.textHandler} />
                </div>
                <div className='threadComment item'>
                    <label htmlFor='threadComment'>First Comment:</label>
                    <textarea name='threadComment'
                        placeholder='enter the comment'
                        value={threadComment}
                        onChange={this.textHandler} />
                </div>
                <button onClick={this.handleClick}
                    disabled={!enableSubmit}
                    className='item'
                    type='submit'
                    value='SUBMIT'
                >{
                        enableSubmit ? 'Create Thread!' :
                            'Please enter a title and a comment!'
                    }</button>
            </div>
        );
    }
}

export default withRouter(CreateThread);