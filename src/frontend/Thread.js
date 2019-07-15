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

    handleSubmit = post => {
        // v This is where you would update the array of posts
        //     - Instead of only adding a single post you would
        //       get an ARRAY of posts from the backend, and you 
        //       must call setState HERE and update Thread's array
        //       with that array
        this.setState(prevState => {
            const posts = prevState.posts;
            return {
                ...prevState,
                posts: prevState.posts.concat(
                    <Post key={posts.length + 1}
                        user='UserName: Guest'
                        content={post} />)
            }   
        });
    }

    render() {
        return (
            <div className='Thread'>
                {this.state.posts}
                <SubmitPost handleSubmit={this.handleSubmit} />
            </div>
        );
    }
}

class SubmitPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: '',
            enableSubmit: false
        };
    }

    handleTA = event => {
        const post = event.target.value;
        this.setState(() => ({
            post,
            enableSubmit: post.length > 0
        }));
    }

    submitPost = () => {
        fetch(`/rest/submit-post`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                post: this.state.post
            })
        }).then(res => {
            return res.ok ? res.json() : Promise.reject();
        }).then(res => {
            console.log(res);
        });
        this.props.handleSubmit(this.state.post); // placeholder hardcoded method of adding posts
        this.setState(() => ({
            post: '',
            enableSubmit: false
        }));
    }

    render() {
        return (<div className='SubmitPost'>
            <textarea onChange={this.handleTA}
                placeholder='Type your post here!'
                value={this.state.post} />
            <input type='submit' 
                disabled={!this.state.enableSubmit} 
                value='Post'
                onClick={this.submitPost} />
        </div>);
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