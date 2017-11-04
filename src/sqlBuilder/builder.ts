import { assign } from './util';

export default function builder( builders, table, sql ) {
	if ( !Array.isArray( builders ) ) builders = [ builders ];

	return assign( {
		toString() { return `${sql};`; }
	}, builders, table, sql );
};