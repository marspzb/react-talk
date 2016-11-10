import React from 'react';
import { connect } from 'react-redux';

class UseCaseMenuComponent extends React.Component {
    render() {
        var config = this.props.conf.configuration;
        if (!config || !config.ready()) return null;
        console.log(this.useCase);

        let content = <ul>
            <li onclick={this.props.onUseCase1Click()} className={(this.useCase=='Denunciation'?"selected":"")}>{config._('Denunciation')}</li>
            <li onclick={this.props.onUseCase2Click()} className={(this.useCase=='Videos'?"selected":"")}>{config._('Videos')}</li>
        </ul>;


        return <div className='tlg-use-case-menu'>
            {content}

        </div>;
    }
}

const changeUseCase = (useCaseName) => {
    return {
        type: 'CHANGE_USE_CASE',
        name: useCaseName
    }
};


const UseCaseMenu = connect(
    (state) => { return { conf: state.configuration, useCase: state.currentUseCase } },
    (dispatch) => {
        return {
            onUseCase1Click: () => {
                
                dispatch(changeUseCase('DENOUNCE'))
            },
            onUseCase2Click: () => {
                dispatch(changeUseCase('SUVEILIANCE'))
            }
        }

    }
)(UseCaseMenuComponent)

export default UseCaseMenu