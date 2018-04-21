/*
 *  Note: Not for production use
 *
 *  use case: storing data in memory only with some db interface methods (etc. save)
 *
 * */

import root from 'window-or-global';
import uuid from 'uuid/v5';
import Errors from './errors';

const ID_KEY = '__id';
const storage = []; // Temporarily use simple array...

/* Utils */
function isEmpty(obj) {
    return Object.keys(obj).length <= 0;
}

class DatabaseInMemory {
    constructor(storage) {
        if (!storage) {
            throw Errors.DB_STORAGE_MISSING;
        }
        this.ids = [];
        this.storage = storage;
    }

    save(obj) {
        if (isEmpty(obj)) {
            throw Errors.VALID_DB_OBJECT_REQUIRED
        }
        if (!obj[ID_KEY] || this.idExists(obj[ID_KEY])) {
            throw Errors.DB_UNIQUE_ID;
        }
        this.ids.push(obj.__id);
        this.storage.push(obj);
    }

    idExists(id) {
        return this.ids.indexOf(id) >= 0;
    }

    clear() {
        this.ids = [];
        this.storage = [];
    }

    find(id) {
        return this.storage.filter(obj => obj[ID_KEY] === id);
    }
}

if (!root.__database_in_memory__) {
    root.__database_in_memory__ = new DatabaseInMemory(storage);
}

module.exports = {
    databaseInMemory: root.__database_in_memory__,
    ID_KEY
};
