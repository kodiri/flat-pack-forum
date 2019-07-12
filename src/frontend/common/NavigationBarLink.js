import React from 'react';

export default function NavigationBarLink({
    to, iconName, linkName
}) {
    return (<a className='NavigationBarLink' href={to}>
        <img className='icon' 
            src={require(`./images/${iconName}.svg`)}
            alt={`${linkName} icon`} />
        <div className='linkName'>{linkName}</div>
    </a>);
}