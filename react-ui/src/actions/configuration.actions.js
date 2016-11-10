export function fetchConfiguration() {
    return dispatch => {
        dispatch({ type: 'CONFIGURATION_LOADING' });
        return fetch("http://localhost:8080/talk/config", {})
            .then(resp => resp.json())
            .then(json => {
                return dispatch({
                    type: 'CONFIGURATION_LOADED',
                    configuration: json
                })
            }).catch(error => {
                dispatch({ type: 'CONFIGURATION_ERROR' })
            });
    }
}

