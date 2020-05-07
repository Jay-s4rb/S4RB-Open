require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import {h, Component} from 'preact';
import {shallow} from 'preact-render-spy';
import Portal from './Portal';


test('component instance creation', () => {
    const ctx = shallow(<Portal />);
    expect(ctx.component()).toBeInstanceOf(Portal);
})

test('default state', () => {
    const ctx = shallow(<Portal />);
    expect(ctx.state()).toEqual({"data": [], "dataToDisplay": [], "period": "Month", "processedData": []});
});

test('nested Table component', () => {
    const ctx = shallow(<Portal />);
    expect(ctx.find('div').contains('<Table />'));
});
