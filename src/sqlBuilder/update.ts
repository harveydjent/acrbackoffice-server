import { isPlainObject, isString } from './util'
import builder from './builder'
import InvalidArgumentError from './InvalidArgumentError'
import where from './where'

export default function update(table) {

    return {
        update(obj) {
            if(!isPlainObject(obj))
                throw new InvalidArgumentError('obj', 'object');

            const sets = (<any>Object).entries(obj)
                .map(([key, value]) => `${table.getFields(key)[0].field}=${isString(value) ? `"${value}"` : value}`)
                .join(',');

            const sql = `update ${table.name} set ${sets}`;
            return builder(where, table, sql);
        }
    }
};