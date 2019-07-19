import React from 'react';
import NavigationBarLink from './NavigationBarLink';

import './Header.css';

export default function Header() {
    return (<header className='Header'>
        <a className='title item'
            href='/'>
                <img src={require('./images/flat-pack-forum.png')} alt='Flat Pack Forum logo' />
                Flat-Pack-Forum
        </a>
        <div className='middle item'>
        </div>
        <div className='signIn item'>
            <NavigationBarLink
                to='/signIn' 
                iconName='signInBlackIcon'
                linkName='Sign In' />
        </div>
    </header>);
}