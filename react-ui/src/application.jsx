import React from 'react';
import ReactDOM from 'react-dom';
import PortfolioList from './components/portfolio-list/portfolio-list'
import UseCaseMenu from './components/use-case-components'
import { Provider } from 'react-redux'
import ChessAppReducer from './reducers/reducers.js'
import Loader from './components/loader/loader'
import { fetchConfiguration, fetchMessages } from './actions/configuration.actions'
import { connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import ChessBoard from './components/chess-board/chess-board'
import GameExplorer from './components/game-explorer'
import GameRecord from './components/game-record'
import Chat from './components/chat'



class AppComponent extends React.Component {
    render() {
        var chessHeight = window.innerHeight - 50;
        return <div>
            <h1 className='app-title'>Chess Master!</h1>
            <div className='l-flex-container'>
                <div className='l-flex-left-margin'></div>
                <div className='l-flex-board-container' style={{ width: chessHeight + "px", height: chessHeight + "px" }}><ChessBoard></ChessBoard></div>
                <div className='l-flex-right-container'>
                    <GameRecord />
                    <GameExplorer />
                    <Chat />

                </div>
                <div className='l-flex-right-margin'></div>
            </div>
            <Loader targets={['configuration', 'message-resources']} />
        </div>;
    }
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchConfiguration());
        // dispatch(fetchMessages());
    }
}
const App = connect()(AppComponent);
let store = createStore(ChessAppReducer, undefined, applyMiddleware(
    thunkMiddleware))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));

var newElement = document.createElement('div')
newElement.id = 'react-tests';
document.getElementsByTagName('body')[0].appendChild(newElement);
ReactDOM.render(<div>React junk</div>, newElement);