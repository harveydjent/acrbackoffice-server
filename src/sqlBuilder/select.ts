import join from './join'
import where from './where'
import orderBy from './orderBy'
import builder from './builder'

const builders = [join, where, orderBy];

interface ISelect { (): { select() }, STAR: string }

const select = <ISelect>function(table) {

    return {
        select(fields) {
            if (!Array.isArray(fields)) fields = [fields];
            if (fields.includes(select.STAR) && fields.length > 1)
                throw new Error(`Invalid number of select fields. '${select.STAR}' can be the only field in the select.`);

            const sql = `select ${table.getFields(fields, select.STAR).map(f => f.field).join(', ')} from ${table.name}`;
            return builder(builders, table, sql);
        }
    };
};

select.STAR = '*';

export default select;