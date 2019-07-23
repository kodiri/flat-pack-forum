import React from 'react' ;

import './SearchBar.css'

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            showSearchResults: false
        };
    }
    handleChange = e => {
        this.setState({
            search: e.target.value,
        });
    }

    handleFocusIn = () => {
        this.setState({
            showSearchResults: true
        });
    }

    handleFocusOut = () => {
        this.setState({
            showSearchResults: false
        })
    }

    render() {
        return(
            <div className={`SearchBar ${this.props.className}`}>
                <input type="text"
                    className="input"
                    onChange={this.handleChange}
                    onFocus={this.handleFocusIn}
                    onBlur={this.handleFocusOut}
                    placeholder="Search..." />
                {
                    this.state.showSearchResults && 
                        <div className='searchResults'>
                            Hi, I'm a div<br />
                            Hi, I'm a div<br />
                            Hi, I'm a div<br />
                            Hi, I'm a div<br />
                            Hi, I'm a div<br />
                            Hi, I'm a div<br />
                            Hi, I'm a div<br />
                        </div>
                }
            </div>
        );
    }
}