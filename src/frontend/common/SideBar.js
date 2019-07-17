import React from 'react';
import toggleClassName from './ToggleFn';
import NavigationBarLink from './NavigationBarLink';

import './SideBar.css';

export default class SideBar extends React.Component {
    render() {
        return (
            <aside id="SideBar">
                <ul className="list" onClick={() => toggleClassName('SideBar', 'active')}>
                    <NavigationBarLink
                        to='/'
                        iconName='homeBlackIcon'
                        linkName='Forum Index' />
                    <NavigationBarLink
                        to='/submit'
                        iconName='submitThreadBlackIcon'
                        linkName='Submit Thread' />
                </ul>
            </aside>
        );
    }
}