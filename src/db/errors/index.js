/*
 * DatabaseError 
 *  extends of the base Error class with custom message
 *
 *  @param {String} message - error message
 * */
class DatabaseError extends Error {
    constructor(message) {
        super(`[DatabaseInMemory]: ${message}`);
    }
}

const VALID_DB_OBJECT_REQUIRED = new DatabaseError(
    'A valid Non-empty object is required in order to save results'
);

const DB_STORAGE_MISSING = new DatabaseError(
    'this.storage was not initialized properly'
);

const DB_UNIQUE_ID = new DatabaseError(
    'An Unique ID is required for the object being saved'
);

export default {
    DB_UNIQUE_ID,
    DB_STORAGE_MISSING,
    VALID_DB_OBJECT_REQUIRED
};
