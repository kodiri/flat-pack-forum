import React from 'react';
import { Redirect } from 'react-router-dom';
import './Thread.css'
import avatar from './common/images/avatar.png';
export default class Thread extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Loading Thread, please wait!',
            posts: []
        };
    }

    componentDidMount() {
        fetch(`/rest/thread/${this.props.match.params.number}`).then(res => {
            return res.ok ? res.json() : Promise.reject();
        }).then(res => {
            if (res.hasOwnProperty('title')) {
                this.setState({ title: res.title, posts: res.posts });
            } else {
                this.setState({ posts: undefined });
            }
        });
    }

    handleSubmit = posts => {
        this.setState({ posts });
    }

    render() {
        return this.state.posts ?
            <div className='Thread'>
                <div id='title'><div id='prefix'>Thread: </div>{this.state.title}</div>
                {
                    this.state.posts.map(({
                        user,
                        content,
                        date
                    }, i) => {
                        return <Post key={i}
                            user={user}
                            content={content}
                            date={date}
                            postNumber={i} />;
                    })
                }
                <SubmitPost handleSubmit={this.handleSubmit}
                    threadNumber={this.props.match.params.number} />
            </div> :
            <Redirect to='/not-found' />;
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
        fetch(`/rest/submit-post/${this.props.threadNumber}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                post: this.state.post
            })
        }).then(res => {
            return res.ok ? res.json() : Promise.reject();
        }).then(res => {
            if (res.result) {
                this.props.handleSubmit(res.posts);
            } else {
                console.log(`Error: Failed to submit post: ` +
                    `Post: ${this.state.post} ` + 
                    `ThreadNumber: ${this.props.threadNumber}`);
            }
        });
        this.setState(() => ({
            post: '',
            enableSubmit: false
        }));
    }

    render() {
        return (
            <div className='SubmitPost'>
                <textarea onChange={this.handleTA}
                    placeholder='Type your post here!'
                    value={this.state.post}
                    className='submitNewPost' />
                <input type='submit'
                    disabled={!this.state.enableSubmit}
                    value='Post'
                    onClick={this.submitPost}
                    className='submitButton' />
            </div>
        );
    }
}

class Post extends React.Component {
    render() {
        const {user, content, date, postNumber} = this.props;
        return (
            <div className='Post'>
                <img className='avatar'src={avatar} alt='avatar'/>
                <UserDetails user={user}
                    date={date}
                    postNumber={postNumber} />
                <Content content={content} />
            </div>
        );
    }
}

class UserDetails extends React.Component {
    render() {
        const {user, date, postNumber} = this.props;
        return (
            <div className='UserDetails'>
                <div className='header'>
                    <div>{formatUser(user)}</div>
                    <div class='postNumber' id={postNumber}>#{
                        postNumber
                    }</div>
                    <div className='commentDate'>Posted on {
                        new Date(date).toLocaleDateString(
                            "en-UK",
                            {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric'
                            })
                    }</div>
                </div>
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

function formatUser(user) {
    switch (user.userType) {
        case 'Guest':
            return (<>
                <div className='username'>{user.username} </div>
                <div className='guest identifier'>Guest</div>
            </>);
        case 'User':
            return (<>
                <div className='username'>{user.username} </div>
                <div className='user identifier'>User</div>
            </>);
        case 'Admin':
            return (<>
                <div className='username'>{user.username} </div>
                <div className='admin identifier'>Admin</div>
            </>);
        default:
            return (<>
                <div className='username'>{user.username} </div>
                <div className='guest identifier'>Guest</div>
            </>);
    }
}