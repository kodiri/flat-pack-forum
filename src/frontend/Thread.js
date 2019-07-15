import React from 'react';
import './Thread.css'

export default class Thread extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        fetch(`/rest/posts/${this.props.match.params.number}`).then(res => {
            return res.ok ? res.json() : Promise.reject();
        }).then(posts => {
            this.setState({ posts });
        });
    }

    handleSubmit = posts => {
        this.setState({ posts });
    }

    render() {
        return (
            <div className='Thread'>
                {this.state.posts.map(({ user: { username }, content }, i) => {
                    return <Post key={i} user={username} content={content} />;
                })}
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
            this.props.handleSubmit(res.posts);
        });
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
            <div className='Post'>
                <UserDetails user={this.props.user} />
                <Content content={this.props.content} />
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