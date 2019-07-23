import React from 'react';
import './UserProfile.css';
import avatar from './common/images/avatar.png';

export default class UserProfile extends React.Component {
    render(){
        return(
            <div id='UserProfile'>
                <img className='avatar'src={avatar} alt='avatar'/>
                <div className='username'>PETER</div>
                <div className='extra'>extra details</div>
                <div className='about'>blah blahhhhhhhhhhhhhh</div>
            </div>
        );
    }
}