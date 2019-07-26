import React from 'react';
import GoogleSignIn from 'react-google-login';
import { handleGoogleSignIn, handleGoogleFailure } from './googleHandlers';

import './SignIn.css';

class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            enableSubmit: false
        }
    }

    submit = () => {
        console.log('Sending Sign In request to backend, state is: ', this.state);
        fetch(`/rest/authenticate/sign-in`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then(res => {
            return res.ok ? res.json() : Promise.reject();
        }).then(res => {
            console.log(res);
            if (res.result) {
                console.log(`Successfully signed in with Standard Method: ${res.message}`);
                this.props.refreshSession();
                this.props.history.push(`/user/${res.uuid}`);
            } else {
                console.log(`Backend failed to sign in user! ${res.message}`);
            }
        });
    }
    
    handleText = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(prevState => ({
            [name] : value,
            enableSubmit: name === 'email' ? value.length > 0 : prevState.email.length > 0
        }));
    }

    render() {
        return (
            <div className='SignIn'>
                <h1>Welcome to the Sign In page!</h1>
                <div className='ContainerSignIn'>
                    <label htmlFor='email'>Email:</label>
                    <input name='email' type='email' onChange={this.handleText} />
                    <label htmlFor='password'>Password:</label>
                    <input name='password' type='password' onChange={this.handleText} />
                </div>
                <button
                    disabled={!this.state.enableSubmit}
                    onClick={this.submit}
                    className='submitButton'
                    type='Submit'>
                    Submit
                </button>
                    <br />
                    <div className='line'></div>
                    <GoogleSignIn
                        className='googleSignIn'
                        clientId='407818662698-mdsp622g5v0hmi7dsdqp2drvraebgnj4.apps.googleusercontent.com'
                        buttonText='Sign In with Google!'
                        onSuccess={res => handleGoogleSignIn(
                            res, this.props.history, this.props.refreshSession)}
                        onFailure={handleGoogleFailure} />
                </div>);
            }
        }
        
export default SignIn;