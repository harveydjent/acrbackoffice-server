import { resolve, basename } from 'path'
import mapDirectory from '../util/mapDirectory'

const clients = mapDirectory('database/clients', (file, dir) => {
    const key = basename(file, '.js').toLowerCase();
    return { [key]: require(resolve(dir, file)).default };
});

export default function databaseClientProvider(config: { client: string, host: string, port: string, [props: string]: any}, ...args) {
    let ClientConstructor;
    if(!(ClientConstructor = clients[config.client.toLowerCase()]))
        throw new Error(`Unable to provide database client. No database client found for '${config.client}'.`);

    return new ClientConstructor(config, ...args);
};