import React from 'react';
import NavigationBarLink from './NavigationBarLink';

import './NavigationBar.css';

export default function NaviationBar() {
    return (<header className='NavigationBar'>
        <a className='title item'
            href='/'>
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