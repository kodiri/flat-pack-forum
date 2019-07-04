import React from 'react';

import './SubmitThread.css';

export default class SubmitThread extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titleThread: '',
            commentThread: ''
        };
    }

    render() {
        return (
            <div className='SubmitThread'>
                <input className='item' type='text' placeholder='enter the title' value={this.state.titleThread}></input>
                <textarea className='item' placeholder='enter the comment' value={this.state.commentThread}></textarea>
                <button className='item' type='submit' value='SUBMIT'>SUBMIT</button>
            </div>
        );
    }
}