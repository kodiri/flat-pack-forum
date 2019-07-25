import React from 'react';
import './UserProfile.css';
import avatar from './common/images/avatar.png';

export default class UserProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            location: '',
            lastActive:'',
            joinDate: '',
            extra: ''
        }
    }

    componentDidMount() {
        fetch(`/rest/user/${this.props.match.params.number}`).then(res => {
            return res.ok ? res.json() : Promise.reject();
        }).then(res => {
            console.log(res);
            if (res.hasOwnProperty('username')) {
                this.setState({ username: res.username, location: res.location, lastActive: res.lastActive, joinDate: res.joinDate  });
            } else {
                this.setState({ username: undefined });
            }
        });
    }

    render() {
        const { username, location, joinDate, lastActive } = this.state;
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
    }
}


