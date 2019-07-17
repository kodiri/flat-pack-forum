import React from 'react';
import SideBarIcon from './SideBarIcon';
import NavigationBarLink from '../NavigationBarLink';

import './SideBar.css';

export default class SideBar extends React.Component {
    componentDidMount() {
        window.addEventListener('resize', () => {
            if(window.innerWidth > 750) {
                let sideBar = document.getElementById('SideBar');
                sideBar.classList.remove('active');
            }
        });
    }

    render() {
        return (<>
            <aside id="SideBar">
                <ul className="list">
                    <NavigationBarLink
                        to='/'
                        iconName='homeBlackIcon'
                        linkName='Forum Index'
                        onClick={() => toggleSideBarVisibility()} />
                    <NavigationBarLink
                        to='/submit'
                        iconName='submitThreadBlackIcon'
                        linkName='Submit Thread'
                        onClick={() => toggleSideBarVisibility()} />
                </ul>
            </aside>
            <SideBarIcon />
        </>);
    }
}

export function toggleSideBarVisibility() {
    toggleClassName('SideBar', 'active');
}

function toggleClassName(selector, className) {
    console.log(selector);
    const el = document.getElementById(selector);
    console.log(el);
        el.classList.toggle(className);
}