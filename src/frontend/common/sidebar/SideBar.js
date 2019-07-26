import React from 'react';
import SideBarIcon from './SideBarIcon';
import NavigationBarLink from '../NavigationBarLink';
import { GoogleLogout } from 'react-google-login';
import handleSignOut from '../../authentication/handleSignOut';

import './SideBar.css';

export default class SideBar extends React.Component {
    componentDidMount() {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 750) {
                let sideBar = document.getElementById('SideBar');
                sideBar.classList.remove('active');
            }
        });
        console.log("Our ClientInfo on the SideBar is: ", this.props.clientInfo);
    }

    render() {
        return (<>
            <aside id="SideBar">
                <ul className="list">
                    <NavigationBarLink
                        to='/'
                        iconName='homeBlackIcon'
                        linkName='Forum Index'
                        onClick={() => toggleSideBarVisibility()} />
                    <NavigationBarLink
                        to='/createThread'
                        iconName='createThreadBlackIcon'
                        linkName='Create Thread'
                        onClick={() => toggleSideBarVisibility()} />
                    {this.props.clientInfo.signedIn ?
                        <>
                            <NavigationBarLink
                                to={`/user/${this.props.clientInfo.uuid}`}
                                iconName='profileBlackIcon'
                                linkName='Profile' />
                            { this.props.clientInfo.googleAccount ?
                                <GoogleLogout
                                    clientId='407818662698-mdsp622g5v0hmi7dsdqp2drvraebgnj4.apps.googleusercontent.com'
                                    buttonText='Sign Out'
                                    onLogoutSuccess={() => handleSignOut(this.props.clientInfo, 
                                        this.props.history, 
                                        this.props.refreshSession,
                                        () => {
                                            console.log('Logged out!');
                                        }
                                    )}/>:
                                <NavigationBarLink
                                    to='/signOut'
                                    iconName='signOutBlackIcon'
                                    linkName='Sign Out' />
                            }
                        </> :
                        <>
                            <NavigationBarLink
                                to='/signIn'
                                iconName='signInBlackIcon'
                                linkName='Sign In' />
                            <NavigationBarLink
                                to='/signUp'
                                iconName='signUpBlackIcon'
                                linkName='Sign Up' />
                        </>
                    }
                </ul>
            </aside>
            <SideBarIcon />
        </>);
    }
}

export function toggleSideBarVisibility() {
    toggleClassName('SideBar', 'active');
}

function toggleClassName(selector, className) {
    console.log(selector);
    const el = document.getElementById(selector);
    console.log(el);
    el.classList.toggle(className);
}