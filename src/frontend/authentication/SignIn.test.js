import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SignIn from './SignIn';

configure({ adapter: new Adapter() });

it("must return an input box for username and password", () => {
    
    // when
    const wrapper = shallow(<SignIn/>);
    const getInputUsername = () => wrapper.find('input[type="text"]');
    const getInputPassword = () => wrapper.find('input[type="password"]');

    // then
    expect(getInputUsername().exists()).toBe(true);
    expect(getInputPassword().exists()).toBe(true);
});