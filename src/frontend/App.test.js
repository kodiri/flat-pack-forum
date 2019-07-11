import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import ForumIndex from './ForumIndex';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it("Forum index should be shown when navigating to root of website", () => {

    //when
    const wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    );

    //then
    expect(wrapper.find(ForumIndex).exists())
        .toEqual(true);
});