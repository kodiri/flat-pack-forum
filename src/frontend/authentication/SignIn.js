import React from 'react';

import './SignIn.css';

export default class SignIn extends React.Component {
    render() {
        return(<div className='SignIn'>
            <div className='title'>Welcome to the SignIn page!</div>
            <div>Please enter your details here:</div>
            <label htmlFor='username'>Username:</label>
            <input name='username' type='text' />
            <label htmlFor='password'>Password:</label>
            <input name='password' type='password' />
        </div>);
    }
}