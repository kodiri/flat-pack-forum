import React from 'react';
import './Thread.css'

export default class Thread extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [<Post key='1' user='UserName: alpha' content='post content1' />,
            <Post key='2'user='UserName: brave' content='post content2' />,
            <Post key='3'user='UserName: chally' content='post content3' />,
            <Post key='4'user='UserName: delta' content='post content4' />,
            <Post key='5'user='UserName: echo' content='post content5' />]
        };
    }

    render() {
        return (
            <div className='Thread'>
                {this.state.posts}
            </div>
        );
    }
}

class Post extends React.Component {
    render() {
        return (
            <div className = 'Post'>
                <UserDetails user={this.props.user}/>
                <Content content={this.props.content}/>        
            </div>
        );
    }
}

class UserDetails extends React.Component {
    render() {
        return (
            <div className='UserDetails'>
                <h4>{this.props.user}</h4>
            </div>
        );
    }
}

class Content extends React.Component {
    render() {
        return (
            <div className='Content'>
                <p className='pUser'>{this.props.content}</p>
            </div>
        );
    }
}