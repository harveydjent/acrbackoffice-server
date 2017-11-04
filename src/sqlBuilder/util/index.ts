export function apply(fns, ...args) {
    return fns.map(f => f(...args));
}

export function assign(target, properties, ...args) {
    if(Array.isArray(target)) {
        args = [properties].concat(args);
        properties = target;
        target = {};
    }

    return Object.assign(target, ...apply(properties, ...args));
}

export function curry(fn, ...rest) {
    return function(...args) {
        return fn(...(rest.concat(args)));
    }
}

export function encode(value) {
    return isString(value) ? `"${value}"` : value;
}

export function isString(value) { return typeof value === 'string'; }
export function isFunction(obj) { return typeof obj === 'function'; }
export function isPlainObject(value) { return typeof value === 'object' && value !== null; }
export function isUndefined(value) { return typeof value === 'undefined'; }