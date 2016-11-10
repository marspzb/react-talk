export default class ConfigurationModel {
    constructor() {

    }
    _(msgKey) {
        return this.configuration.messages[msgKey];
    }
    ready() {
        return this.configuration;
    }

}