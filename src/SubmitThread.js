import React, {Component} from 'react';

class SubmitThread extends Component {
    constructor() {
        super();
        this.state = {
            titleThread: '',
            commentThread: '' 
        };
    }
    
    render() {
        return(
            <div>
                <input type = 'text' placeholder = 'enter the title' value= {this.state.titleThread}></input>
                <textarea placeholder = 'enter the comment' value = {this.state.commentThread}></textarea>
                <button type ='submit' value = 'SUBMIT'></button>
            </div>
        );
    }
} 
export default SubmitThread ;