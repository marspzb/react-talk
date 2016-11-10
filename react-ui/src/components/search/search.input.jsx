import React from 'react';

export default class SearchInput extends React.Component {
    render() {

        return <div className='search-input-component'>
            <input type='text' onKeyDown={e => this.onKeyDown(e)} />
            <select onChange={e => this.onChange(e)} >
                <option value='Robbery'>Robo</option>
                <option value='Assault'>Rapiña</option>
                <option value='Burglary'>Robo casa</option>
                <option value='Domestic'>Domestica</option>
            </select>

        </div>;
    }
}
