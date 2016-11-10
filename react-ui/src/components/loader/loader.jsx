import React from 'react';
import { connect } from 'react-redux';

class LoaderComponent extends React.Component {
    render() {
        var isLoading = false;
        if (this.props.currentlyLoading) {
            isLoading = this.props.currentlyLoading.some(function (currentlyLoading) {
                return this.props.targets.indexOf(currentlyLoading) >= 0;
            });
        }
        return <div className='loader' style={{display:  (isLoading ? 'none' : 'block')}}>
            <img src='loader.gif' />
        </div>;
    }
}


const Loader = connect(
    (state) => { return { currentlyLoading: state.loading } }
)(LoaderComponent)

export default Loader