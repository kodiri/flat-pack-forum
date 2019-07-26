import React from 'react';
import GoogleSignIn from 'react-google-login';
import { handleGoogleSignIn, handleGoogleFailure } from './googleHandlers';

import './SignIn.css';

class SignIn extends React.Component {
    render() {
        return (
            <div className='SignIn'>
                <h1>Welcome to the Sign In page!</h1>
                <div className='ContainerSignIn'>
                    <label htmlFor='email'>Email:</label>
                    <input name='email' type='email' />
                    <label htmlFor='password'>Password:</label>
                    <input name='password' type='password' />
                </div>
                <button
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