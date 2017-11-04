import AbstractError from './AbstractError'

export default class InvalidArgumentError extends AbstractError {
    constructor(name, type) {
        super(`Invalid argument. '${name}' must be of type ${type}.`);
    }
};