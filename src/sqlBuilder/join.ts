import builder from './builder'
import comparisonOperators from './config/comparisonOperators'

function on(table, sql) {
    return {
        on(field) {
            return builder([comparisonOperators], table, `${sql} on ${field}`)
        }
    }
}

export default function join(table, sql) {

    function joinImpl(type) {
        return tableName => {
            return builder(on, table, `${sql} ${type}`);
        }
    }
    
    return {
        join: joinImpl('join'),
        leftJoin: joinImpl('left join'),
        rightJoin: joinImpl('right join')
    };
};