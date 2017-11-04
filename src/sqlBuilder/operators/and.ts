import builder from '../builder'
import where from '../where'
import or from './or'

export default function and(table, sql) {

    return {
        and(expression) {
            const clauses = where.getClauses(table, expression);
            return builder([and, or], table, `${sql} and ${clauses}`);
        }
    };
};