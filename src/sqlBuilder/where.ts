import builder from './builder'
import _ from 'lodash'
import InvalidArgumentError from './InvalidArgumentError'
import equals from './operators/equals'
import { curry } from './util'
import comparisonOperators from './config/comparisonOperators'
import and from './operators/and'
import or from './operators/or'

const builders = [and, or];

function resolveValue(table, value) {
    if(!_.isPlainObject(value)) return equals(table, value);

    const [key, v] = (<any>Object).entries(value)[0];
    if(!comparisonOperators[key])
        throw new Error(`Invalid operator '${key}'. Valid operators are ${Object.keys(comparisonOperators)}.`);

    return comparisonOperators[key](table, v);
}

interface IWhere { (): { where() }, getClauses(table, expression) }

const where = <IWhere>function(table, sql) {
    return {
        where(expression) {
            const clauses = where.getClauses(table, expression);
            sql = `${sql} where ${clauses}`;
            return builder(builders, table, sql);
        }
    };
};

where.getClauses = function(table, expression) {
    if(!table)
        throw new InvalidArgumentError('table', 'Table');

    const resolve = curry(resolveValue, table),
        clauses = [];

    for(let [key, value] of (<any>Object).entries(expression)) {
        const field = table.getFields(key)[0];
        clauses.push(`${field.field}${resolve(value)}`);
    }

    return `${clauses.join(' and ')}`;
};

export default where;