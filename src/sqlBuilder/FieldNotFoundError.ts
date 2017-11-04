import AbstractError from './AbstractError';

export default class FieldNotFoundError extends AbstractError {
    constructor(table, field) {
        super(`Field '${field}' not found in table '${table}'. Please add the field configuration to the correct table.`);
    }
};