import React from 'react';
import GoogleSignIn from 'react-google-login';

import './SignIn.css';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const jwt = require('jwt-simple');

export default class SignIn extends React.Component {
    handleGoogleSignIn = res => {
        const id_token = res.tokenObj.id_token;
        console.log("And JWT token is: ", id_token);
        fetch(`/rest/authenticate/sign-in/google`, {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + id_token
            },
        }).then(res => res.ok ? res.json() : Promise.reject()).then(res => {
            console.log(res);
        })
        console.log(GOOGLE_CLIENT_SECRET);
        console.log(jwt.decode(id_token))
        // fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`).then(res => {
        //     return res.ok ? res.json() : Promise.reject();
        // }).then(res => {
        //     console.log("Decoded token: ", res);
        // })
    }

    render() {
        return (<div className='SignIn'>
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