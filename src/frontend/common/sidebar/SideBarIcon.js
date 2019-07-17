import React from 'react';

import { toggleSideBarVisibility } from './SideBar';

import './SideBarIcon.css';

export default class SideBarIcon extends React.Component {
    render() {
        return (<div id="SideBarIcon" onClick={() => toggleSideBarVisibility()}>
            <img src={require(`../images/sideBarBlackIcon.svg`)} alt='Side Bar Icon' />
        </div>);
    }
}