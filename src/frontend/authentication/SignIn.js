import React from 'react';
import GoogleSignIn from 'react-google-login';
import { handleGoogleSignIn, handleGoogleFailure } from './googleHandlers';

import './SignIn.css';

class SignIn extends React.Component {
    render() {
        return (<div className='SignIn'>
            <div className='title'>Welcome to the Sign In page!</div>
            <div>Please enter your details here:</div>
            <label htmlFor='username'>Username:</label>
            <input name='username' type='text' />
            <label htmlFor='password'>Password:</label>
            <input name='password' type='password' />

            <div>OR</div>
            <GoogleSignIn
                clientId='407818662698-mdsp622g5v0hmi7dsdqp2drvraebgnj4.apps.googleusercontent.com'
                buttonText='Sign In with Google!'
                onSuccess={res => handleGoogleSignIn(
                    res, this.props.history, this.props.refreshSession)}
                onFailure={handleGoogleFailure} />
        </div>);
    }
}

export default SignIn;