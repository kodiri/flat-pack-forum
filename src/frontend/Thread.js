import React from 'react';

import './Thread.css'

class Post extends React.Component 
{
   
    render() {
        return (
            <div>
                <UserDetails user='I am user alpa' />
                <Content />
                <UserDetails user='I am user bravo'/>
                <Content />
                <UserDetails user='I am user chally'/>
                <Content />
                <UserDetails user='I am user delta'/>
                <Content />
                <UserDetails user='I am user fredi'/>
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
                <p className='pUser'>{this.props.user}</p>
            </div>
        );
    }
}

class Content extends React.Component
{
    render() {
        return (
            <div>
                <textarea className='contentArea'
                rows='5' cols='100'>pls. add your comments here!</textarea>
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
            </div>
        );
    }
}