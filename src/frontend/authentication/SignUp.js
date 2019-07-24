import React from 'react';

import './SignUp.css';

export default class SignUp extends React.Component {
    render() {
        return (
            <div className='SignUp'>
                <div className='title'>Welcome to the SignUp page!</div>
                <div>Please enter your details here:</div>
                <label htmlFor='username'>Username:</label>
                <input name='username' type='text' />
                <label htmlFor='password'>Password:</label>
                <input name='password' type='password' />
                <label htmlFor='password'>Confirm Password:</label>
                <input name='password' type='password' />
            </div>
        );
    }
}