const pool = require('../config/pool')

const getMaskedMessages = async() => {
    const { rows } = await pool.query('SELECT * FROM messages')
    console.log(rows)
}

const getMessages = async() => {

}

const addMessages = async(message, user) => {
    await pool.query('INSERT INTO messages (message, person) VALUES ($1, $2)', [message, user])
}

module.exports = {
    getMaskedMessages,
    getMessages,
    addMessages
}