import React from 'react';
import { Redirect } from 'react-router-dom';
import handleSignOut from './handleSignOut';

export default class SignOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signedOut: false
        }
    }

    componentDidMount() {
        handleSignOut(this.props.clientInfo, this.props.history, this.props.refreshSession, () => {
            console.log("Signed out!");
            this.setState({signedOut: true});
        });
    }
    render() {
        return this.state.signedOut ? <Redirect to='/' /> : <>Signing Out...</>;
    }
}