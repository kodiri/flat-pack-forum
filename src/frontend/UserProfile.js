import React from 'react';
import {Redirect} from 'react-router-dom';
import './UserProfile.css';
import avatar from './common/images/avatar.png';

export default class UserProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        fetch(`/rest/user/${this.props.match.params.number}`).then(res => {
            return res.ok ? res.json() : Promise.reject();
        }).then(res => {
            console.log(res);
            if (res.hasOwnProperty('username')) {
                this.setState({
                    user: {
                        username: res.username,
                        location: res.location,
                        lastActive: res.lastActive,
                        joinDate: res.joinDate
                    }
                });
            } else {
                this.setState({ user: undefined });
            }
        });
    }

    render() {
        if (!this.state.user) {
            return <Redirect to='/not-found' />;
        } else {
            if (this.state.user.hasOwnProperty('username')) {
                const { username, location, joinDate, lastActive } = this.state.user;
                return (
                    <div id='UserProfile'>
                        <img className='avatar' src={avatar} alt='avatar' />
                        <div className='username'>{username}</div>
                        <div className='extra'>
                            Join Date: {
                                new Date(joinDate).toLocaleDateString(
                                    "en-UK",
                                    {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })
                            }
                            <br/>
                            Last Active: {
                                new Date(lastActive).toLocaleDateString(
                                    "en-UK",
                                    {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })
                                }
                            <br/>
                            Country: {location}
                        </div>
                        <div className='about'/>
                    </div>
                );
            } else {
                return <div>Loading!</div>;
            }
        }
    }
}


