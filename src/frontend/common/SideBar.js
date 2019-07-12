import React from 'react';

import NavigationBarLink from './NavigationBarLink';

import './SideBar.css';

export default class SideBar extends React.Component {
    render() {
        return (
            <aside class="SideBar">
                <div class="close-icon">

                </div>
                <ul class="list">
                    <NavigationBarLink 
                        to='/' 
                        iconName='homeBlackIcon' 
                        linkName='Forum Index'/>
                    <NavigationBarLink 
                        to='/submit' 
                        iconName='submitThreadBlackIcon' 
                        linkName='Submit Thread'/>
                    <li class="item">Thread</li>
                </ul>
            </aside>
        );
    }
}