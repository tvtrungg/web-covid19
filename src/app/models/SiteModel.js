const pool = require('../../config/dbPortgres')
module.exports = {

    all: async (tblName) => {



    },
    get: async () => {
        pool.connect((err, client, done) => {
            if (err) throw err
            client.query('SELECT * FROM users WHERE id = $1', [1], (err, res) => {
              done()
              if (err) {
                console.log(err.stack)
              } else {
                console.log(res)
              }
            })
          })
    },
    getN: async (value, tblName, fieldName) => {

    },
    add: async (entity, tblName) => {

    },
    update: async (tbName, fieldName, entity) => {

    },
    ///////////////////////////////////////////////////////////////
    delete: async (tbName, fieldName, val) => {

    },
};