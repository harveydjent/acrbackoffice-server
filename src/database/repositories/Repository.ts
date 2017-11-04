import DatabaseClient from '../clients/DatabaseClient'

export interface IRepository {
    client: DatabaseClient
    get(id: string | number): Promise<any>
    getAll(ids: string[] | number[]): Promise<Array<any>>
    delete(id: string | number): Promise<any>
    insert(): Promise<any>
    update(): Promise<any>
}

export abstract class Repository implements IRepository{
    public client: DatabaseClient;

    constructor(client: DatabaseClient) {
        this.client = client;
    }

    abstract get(id: string | number): Promise<any>;
    abstract getAll(ids: string[] | number[]): Promise<any[]>;
    abstract delete(id: string | number): Promise<any>;
    abstract insert(): Promise<any>;
    abstract update(): Promise<any>;
}