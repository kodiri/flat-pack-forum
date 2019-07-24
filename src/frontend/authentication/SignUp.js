import React from 'react';
import GoogleSignIn from 'react-google-login';

import './SignUp.css';

export default class SignUp extends React.Component {
    render() {
        return (
            <div className='SignUp'>
                <div className='title'>Welcome to the Sign Up page!</div>
                <div>Please enter your details here:</div>
                <label htmlFor='username'>Username:</label>
                <input name='username' type='text' />
                <label htmlFor='password'>Password:</label>
                <input name='password' type='password' />
                <label htmlFor='password'>Confirm Password:</label>
                <input name='password' type='password' />
                <div>OR</div>
                <GoogleSignIn
                    clientId='407818662698-mdsp622g5v0hmi7dsdqp2drvraebgnj4.apps.googleusercontent.com'
                    buttonText='Sign Up with Google!'
                    onSuccess={this.handleGoogleSignIn}
                    onFailure={this.handleGoogleSignIn} />

            </div>
        );
    }
}