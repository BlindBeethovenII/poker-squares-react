// useful javascript functions

// clone a nested array - does not cope with objects
export function arrayClone( arr ) {
    var i, copy;

    if( Array.isArray( arr ) ) {
        copy = arr.slice( 0 );
        for( i = 0; i < copy.length; i++ ) {
            copy[ i ] = arrayClone( copy[ i ] );
        }
        return copy;
    } else if( typeof arr === 'object' ) {
        throw new Error ('Cannot clone array containing an object!');
    } else {
        return arr;
    }
}

// clone using quick and dirty JSON route
export function cloneByJSON(obj) {
    return JSON.parse(JSON.stringify(obj));
}