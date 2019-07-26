import React from 'react';
import GoogleSignIn from 'react-google-login';
import { handleGoogleSignIn, handleGoogleFailure } from './googleHandlers';
import { withRouter } from 'react-router-dom';

import './SignUp.css';

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            enableSubmit: false
        };
    }

    passwordChange = e => {
        this.setState({
            password: e.target.value,
            enableSubmit: e.target.value === this.state.confirmPassword && e.target.value.length >= 4 &&
                this.state.email.includes('@') && this.state.email.includes('.') && this.state.username.length >= 1
        });
    }

    confirmPasswordChange = e => {
        this.setState({
            confirmPassword: e.target.value,
            enableSubmit: this.state.password === e.target.value && e.target.value.length >= 4 &&
                this.state.email.includes('@') && this.state.email.includes('.') && this.state.username.length >= 1
        });
    }

    usernameChange = e => {
        this.setState({
            username: e.target.value,
            enableSubmit: this.state.password === this.state.confirmPassword && this.state.confirmPassword.length >= 4 &&
                this.state.email.includes('@') && this.state.email.includes('.') && e.target.value.length >= 1
        });
    }

    emailChange = e => {
        this.setState({
            email: e.target.value,
            enableSubmit: this.state.password === this.state.confirmPassword && this.state.confirmPassword.length >= 4 &&
                e.target.value.includes('@') && e.target.value.includes('.') && this.state.username.length >= 1
        });
    }


    submit = () => {
        console.log('Sending Sign Up request to backend, state is: ', this.state);
        fetch(`/rest/authenticate/sign-up`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        }).then(res => {
            return res.ok ? res.json() : Promise.reject();
        }).then(res => {
            console.log(res);
            if (res.result) {
                console.log(`Successfully signed up with Standard Method: ${res.message}`);
                this.props.refreshSession();
                this.props.history.push(`/user/${res.uuid}`);
            } else {
                console.log(`Backend failed to sign up user! ${res.message}`);
            }
        });
    }

    render() {
        return (
            <div className='SignUp'>
                <h1>Welcome to the Sign Up page!</h1>
                <div className='ContainerSignUp'>
                    <label htmlFor='username'>Username:</label>
                    <input name='username' type='text' value={this.state.username} onChange={this.usernameChange} />
                    <label htmlFor='email'>Email:</label>
                    <input name='email' type='email' value={this.state.email} onChange={this.emailChange} />
                    <label htmlFor='password'>Password: </label>
                    <input
                        name='password'
                        type='password'
                        value={this.state.password}
                        onChange={this.passwordChange} />
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                    <input
                        name='confirmPassword'
                        type='password'
                        value={this.state.confirmPassword}
                        onChange={this.confirmPasswordChange} />
                </div>
                <label className='condition'>{
                    this.state.password === this.state.confirmPassword ?
                        '' : 'Password does not match'
                }</label>
                <button
                    className='submitButton'
                    type='Submit'
                    disabled={!this.state.enableSubmit}
                    onClick={this.submit}>
                    Submit
                </button>
                <br />
                <div className='line'></div>
                <GoogleSignIn className='googleSign'
                    clientId='407818662698-mdsp622g5v0hmi7dsdqp2drvraebgnj4.apps.googleusercontent.com'
                    buttonText='Sign Up with Google!'
                    onSuccess={res => handleGoogleSignIn(
                        res, 
                        this.props.history, 
                        this.props.refreshSession
                    )}
                    onFailure={handleGoogleFailure} />
            </div>
        );
    }
}

export default withRouter(SignUp);