import React from 'react';

import './Thread.css'

class Post extends React.Component 
{

    render() {
        return (
            <div>
                <UserDetails></UserDetails>
                <Content />
            </div>
        );
    }
}

class UserDetails extends React.Component
{
    render() {
        return (
            <div>
                <p>user details</p>
            </div>
        );
    }
}

class Content extends React.Component
{
    render() {
        return (
            <div>
                <textarea></textarea>
            </div>
        );
    }
}



export default class Thread extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        );
    }
}