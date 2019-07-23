import React from 'react';
import GoogleSignIn from 'react-google-login';

import './SignIn.css';

export default class SignIn extends React.Component {
    handleGoogleSignIn = res => {
        console.log(res);
        console.log("And JWT token is: ", res.tokenObj.id_token);
    }

    render() {
        return(<div className='SignIn'>
            <div className='title'>Welcome to the Sign In page!</div>
            <div>Please enter your details here:</div>
            <label htmlFor='username'>Username:</label>
            <input name='username' type='text' />
            <label htmlFor='password'>Password:</label>
            <input name='password' type='password' />

            <GoogleSignIn
                clientId='407818662698-mdsp622g5v0hmi7dsdqp2drvraebgnj4.apps.googleusercontent.com'
                buttonText='Sign In with Google!'
                onSuccess={this.handleGoogleSignIn}
                onFailure={this.handleGoogleSignIn} />
        </div>);
    }
}