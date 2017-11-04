import { encode } from '../util'

export default function greaterThan(table, value) {

    let field;
    try {
        field = table.getFields(value);
    } catch (error) {}

    return `>${field && field.field || encode(value)}`;
};