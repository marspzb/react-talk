import ConfigurationModel from '../models/configuration.model.js'

const configurationInitialState = {};

function mergeConfiguration(jsonConfig, initialConfig) {
    var newConfig = new ConfigurationModel();
    return Object.assign(newConfig, initialConfig, { configuration: jsonConfig });
}

function mergeMessageResources(msgs, initialConfig) {
    var newConfig = new ConfigurationModel();

    return Object.assign(newConfig, initialConfig, { messages: msgs });
}
export const configuration = (state = configurationInitialState, action) => {
    var previousLoading = state.loading;
    if (!previousLoading) {
        previousLoading = [];
    }
    //console.log(previousLoading);

    switch (action.type) {
        case "CONFIGURATION_LOADING":
            return Object.assign({}, state, { loading: previousLoading.concat(['configuration']) });
        case "CONFIGURATION_LOADED":
            return Object.assign({}, state, {
                loading: previousLoading.filter(function (target) {
                    return target === 'configuration';
                }),
                configuration: mergeConfiguration(action.configuration, state.configuration)
            });


        case "MESSAGES_LOADING":
            return Object.assign({}, state, { loading: previousLoading.concat(['message-resources']) });
        case "MESSAGES_LOADED":

            return Object.assign({}, state, {
                loading: previousLoading.filter(function (target) {
                    return target === 'message-resources';
                }),
                configuration: mergeMessageResources(action.messages, state.configuration)
            });
        case "CONFIGURATION_ERROR":
            return Object.assign({}, state, { configuration: new ConfigurationModel() });
        case "MESSAGES_ERROR":
            return Object.assign({}, state, { configuration: new ConfigurationModel() });

        default:
            return state;

    }
}