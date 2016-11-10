import React from 'react';
import {SearchInput} from './search.input.jsx'
import {SearchResults} from './search.results.jsx'

export default class Search extends React.Component {
  render() {
      
      return <div className='search-component'>
              <SearchInput onSearch='(text,type)=>this.onSearch(text,type)' />
              <SearchResults />
           </div>;
  }
}
