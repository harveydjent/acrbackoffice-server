
export default abstract class DatabaseClient {
    public host: string;
    public port: number;

    constructor({ host, port }) {
        if(!host) throw new Error(`Unable to construct instance of ${this.constructor.name}, missing 'host' configuration value.`);
        if(!process.env[host]) throw new Error(`${host} environment variable not defined.`);
        this.host = process.env[host];

        if(!port) throw new Error(`Unable to construct instance of ${this.constructor.name}, missing 'port' configuration value.`);
        if(!process.env[port]) throw new Error(`${port} environment variable not defined.`);
        this.port = parseInt(process.env[port]);
    }

    public async abstract get(sql: string): Promise<any>
    public async abstract update(sql: string): Promise<any>
    public async abstract insert(sql: string): Promise<any>
}