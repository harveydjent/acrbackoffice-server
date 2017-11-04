import builder from './builder'
import InvalidArgumentError from './InvalidArgumentError'
import { encode, isPlainObject, isUndefined } from './util'

export default function insert(table) {

    return {
        insert(obj) {
            if(!isPlainObject(obj))
                throw new InvalidArgumentError('obj', 'object');

            let fields = table.getFields(obj);
            if(!fields.some(f => f.identifier)) fields = fields.concat(table.getFields(f => f.identifier));

            const { into, values, identifier } = fields.reduce((result, { field, name, identifier }) => {
                if(identifier) result.identifier = field;

                if(isUndefined(obj[name])) return result;

                result.into.push(field);
                result.values.push(encode(obj[name]));
                return result;
            }, { into: [], values: [], identifier: undefined });

            const sql = `insert into ${table.name} (NEXT_VAL(${identifier}),${into.join(',')}) values (1,${values.join(',')})`;
            return builder([], table, sql);
        }
    }
};