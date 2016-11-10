import React from 'react';

export default class PortfolioList extends React.Component {
  render() {
      if(!this.props.portfolio){
          return null;
      }
      return <div className='portfolio-component'>
              <h1>{this.props.portfolio.name}</h1>
              <ul>
             {
                  this.props.portfolio.positions.map(
                        position => 
                            <li key={position.id}>{position.instrument.isin}</li>
                        )
              } 
              </ul>
           </div>;
  }
}
