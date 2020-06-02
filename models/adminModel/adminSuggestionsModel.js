const db = require('../../utils/database');

module.exports = class Suggestions {
    constructor(params) {
        this.common_user_id = params.common_user_id,
        this.email = params.email
    }

    static getAllData() {
        return new Promise((resolve) => {
            resolve(db.query("SELECT * FROM tbl_suggestion"))
        }).catch((err) => {
            console.log(err);
        });
    }
};

