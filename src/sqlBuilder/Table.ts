import * as _ from 'lodash'
import FieldNotFoundError from './FieldNotFoundError'
import { assign, isFunction } from './util'
import select from './select'
import update from './update'
import insert from './insert'

const builders = [ select, update, insert ];

export interface IField {
    field: string
    name: string
    identifier?: boolean
}

export class Field implements IField {
    field: string;
    name: string;
    identifier: boolean;

    constructor(raw: IField | string) {
        this.field = (<IField>raw).field || (<string>raw);
        this.name = (<IField>raw).name || (<string>raw);
        this.identifier = (<IField>raw).identifier || false;
    }
}

export class Table {
    public name: string;

    private _fields: Field[];

    constructor(name: string, options: { fields: IField[] }) {
        this.name = name;
        this._fields = options.fields.map(f => new Field(f));

        assign(this, builders, this);
    }

    getFields(fields: object | string[] | ((value: Field, index: number, array: Field[]) => boolean), constants: string | string[]): Field[] {
        if(!arguments.length) return this._fields;

        if(isFunction(fields))
            return this._fields.filter((<(value: Field, index: number, array: Field[]) => boolean>fields));

        if(_.isPlainObject(fields)) fields = Object.keys(fields);

        if (!Array.isArray(fields)) fields = [fields];

        if(constants) {
            if(!Array.isArray(constants)) constants = [constants];

            if(constants.some(c => c === select.STAR)) return [new Field('*')];

            if((<string[]>fields).some((f: string) => (<string[]>constants).some(c => c === f))) return this._fields;
        }

        return (<string[]>fields).map(f => {
            f = f.toLowerCase();
            const field = this._fields.find(_f => _f.name.toLowerCase() === f || _f.field.toLowerCase() === f);
            if (!field) throw new FieldNotFoundError(this.name, fields);
            return field;
        });
    }
}