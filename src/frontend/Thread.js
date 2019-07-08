import React from 'react';

import './Thread.css'

class Post extends React.Component 
{
   
    render() {
        return (
            <div>
                <UserDetails  user={this.props.user}/>
                <Content  content={this.props.content}/>
         </div>
        );
    }
}

class UserDetails extends React.Component
{
    render() {
        return (
            <div>
                <h4>{this.props.user}</h4>
            </div>
        );
    }
}

class Content extends React.Component
{
    render() {
        return (
            <div>
            <p className='pUser'>{this.props.content}</p>
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
                <Post user='I am user alpa' content='content1'/>
                <Post user='I am user brave' content='content2'/>
                <Post user='I am user chally' content='content3'/>
                <Post user='I am user delta' content='content4'/>
                <Post user='I am user echo' content='content5'/>
            </div>
        );
    }
}