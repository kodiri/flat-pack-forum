import React from 'react';
import SearchBar from './SearchBar';

import './Header.css';

export default function Header() {
    return (<header className='Header'>
        <a className='title item'
            href='/'>
                <img src={require('./images/flat-pack-forum.png')} alt='Flat Pack Forum logo' />
                Flat-Pack-Forum
        </a>
        <SearchBar className='item' />
      
        
    </header>);
}