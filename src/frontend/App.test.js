import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import ForumIndex from './ForumIndex';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SubmitThread from './SubmitThread';
import NotFound from './common/NotFound';
import Thread from './Thread';

configure({ adapter: new Adapter() });

[{
    it: 'App shows ForumIndex page when the current path is "/" or "/index"',
    currentPath: ['/', '/index'],
    expect: {
        forumIndexExists: true,
        submitThreadExists: false,
        threadExists: false,
        notFoundExists: false
    }
}, {
    it: 'App shows SubmitThread page when the current path is "/submit"',
    currentPath: ['/submit'],
    expect: {
        forumIndexExists: false,
        submitThreadExists: true,
        threadExists: false,
        notFoundExists: false,
    }
}, {
    it: 'App shows a Thread page when the current path is "/thread/:number"',
    currentPath: ['/thread/1', '/thread/3', '/thread/6'],
    expect: {
        forumIndexExists: false,
        submitThreadExists: false,
        threadExists: true,
        notFoundExists: false,
    }
}, {
    it: 'App shows not found page when the current path is not registered',
    currentPath: ['/daoijadaoidaioj', '/thread/1/asoidjadoijads', '/index/abc'],
    expect: {
        forumIndexExists: false,
        submitThreadExists: false,
        threadExists: false,
        notFoundExists: true,
    }
}].forEach(scenario => {
    it(scenario.it, () => {

        //when
        const wrapper = mount(
            <MemoryRouter initialEntries={scenario.currentPath}>
                <App />
            </MemoryRouter>
        );

        //then
        let { forumIndexExists, submitThreadExists, threadExists,
            notFoundExists } = scenario.expect;
        expect(wrapper.find(ForumIndex).exists())
            .toEqual(forumIndexExists);
        expect(wrapper.find(SubmitThread).exists())
            .toEqual(submitThreadExists);
        expect(wrapper.find(Thread).exists())
            .toEqual(threadExists);
        expect(wrapper.find(NotFound).exists())
            .toEqual(notFoundExists);
    });
});