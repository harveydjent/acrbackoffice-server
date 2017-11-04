import { Repository } from './Repository'
import sqlBuilder from '../../sqlBuilder'
import * as config from '../../config.json'

const coupons = sqlBuilder.table('STCPN', (<any>config).database.tables.STCPN);

export default class CouponRepository extends Repository {
    get(id: string): Promise<any> {
        const sql = coupons.select(sqlBuilder.STAR);
        sql.where({ id });
        return this.client.get(sql.toString());
    }

    getAll(): Promise<any[]> {
        const sql = coupons.select(sqlBuilder.STAR);
        return this.client.get(sql.toString());
    }

    delete(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    insert(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    update(): Promise<any> {
        throw new Error("Method not implemented.");
    }

}