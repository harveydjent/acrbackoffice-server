import DatabaseClient from './DatabaseClient'
import * as net from 'net'

/**
 *
 * @param {net.Socket} socket
 * @returns {Promise<(body: string) => Promise<object>>}
 */
async function request(socket: net.Socket): Promise<(body: string) => Promise<object>> {
    return async function(body: string): Promise<object> {
        return new Promise((resolve, reject) => {
            let buffer = '';

            socket.write(body);

            socket.on('error', error => {
                reject(error);
                socket.destroy();
            });

            socket.on('data', data => {
                buffer += data;
            });

            socket.on('end', () => {
                try {
                    resolve(JSON.parse(buffer));
                } catch(error) {
                    reject(error);
                }
                buffer = '';
                socket.destroy();
            });
        });
    };
}

/**
 *
 * @param {string} host
 * @param {number} port
 * @returns {Promise<any>}
 */
async function connect(host: string, port: number): Promise<any> {
    return new Promise((resolve, reject) => {
        const aql = new net.Socket();
        aql.setEncoding('utf8');

        aql.connect(port, host, () => {
            resolve(request(aql));
        });
        aql.on('error', reject);
    });
}

export default class AqlClient extends DatabaseClient {
    private async send(sql: string): Promise<object> {
        return (await connect(this.host, this.port))(sql);
    }

    public async get(sql: string): Promise<object> {
        return this.send(sql);
    }

    public async update(sql: string): Promise<any> {
        return this.send(sql);
    }

    public async insert(sql: string): Promise<any> {
        return this.send(sql);
    }

}