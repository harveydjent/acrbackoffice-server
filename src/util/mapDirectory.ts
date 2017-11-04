import * as fs from 'fs'
import * as path from 'path'
import { isUndefined, isPlainObject} from 'lodash';

/**
 * The mapDirectory module can be used to read the files a given directory and return an object based on the return statement
 * of the given callback. This module is mainly used to create dictionaries of all the modules in a given directory.
 *
 * See /discovery/parameterProcessorProvider.js for an actual usage example.
 *
 * @param dir - the directory to read
 * @param iterator - the mapping function
 * @param initialValue - The initial value to add each result to. Defaults to Object. Can be Array or Object.
 * @returns {Object}
 */
export default function mapDirectory(dir: string, iterator: (file: string, dir: string) => any, initialValue?: object | any[]) {
    initialValue = initialValue || {};

    dir = path.join(process.cwd(), dir);

    fs.readdirSync(dir)
        .filter(f => f.endsWith('.js')) // @todo: find way to remove ... need this line because source maps are enabled for typescript
        .forEach(file => {
            const value = iterator(file, dir);
            if(isUndefined(value)) return;

            if(isPlainObject(initialValue) && isPlainObject(value)) return Object.assign(initialValue, value);
            if(Array.isArray(initialValue)) initialValue.push(value);
        });

    return initialValue;
};