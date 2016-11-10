import { combineReducers } from 'redux'
import { useCaseNavigationReducer } from './use-case-reducers.js'
import { configuration } from './configuration-reducers.js'
import { gameReducer } from './game-reducers.js'
const ChessAppReducer = combineReducers({
  game: gameReducer,
  useCase: useCaseNavigationReducer,
  configuration: configuration
})

export default ChessAppReducer