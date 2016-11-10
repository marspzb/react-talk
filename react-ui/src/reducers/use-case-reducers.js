
const useCaseNavigationReducerInitialState = {};
export const useCaseNavigationReducer = (state = useCaseNavigationReducerInitialState, action) => {
    switch (action.type) {
        case 'CHANGE_USE_CASE':
            console.log('changing use case: ' + action.name);
            return Object.assign({}, state, { currentUseCase: action.name });
        default:
            return state;
    }
}
