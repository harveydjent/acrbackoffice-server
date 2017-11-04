import { encode } from '../util'

export default function equals(table, value) {

    let field;
    try {
        field = table.getFields(value)[0];
    } catch (error) {}

    return `=${field && field.field || encode(value)}`;
};