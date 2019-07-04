import React from 'react';
import { Link } from 'react-router-dom';
import './ForumIndex.css'

export default class ForumIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (<>
            <div className='headerContainer'>
                Flat-Pack-Forum
                <div className='addThreadButton'>
                    <Link to='/submit'><img src={require('./common/images/addThread.png')} alt='add thread' /></Link>
                </div>
            </div>
            <div className='threadContainer'>
                <Link>thead link 1</Link>
            </div>
            <div className='threadContainer'>
                <Link>thead link 2</Link>
            </div>
            <div className='threadContainer'>
                <Link>thead link 3</Link>
            </div>
            <div className='threadContainer'>
                <Link>thead link 4</Link>
            </div>
            <div className='threadContainer'>
                <Link>thead link 5</Link>
            </div>
        </>);
    }
}