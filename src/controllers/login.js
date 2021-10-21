import connection from "../database/database.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

async function login(req, res) {
    const {
        email,
        password
    } = req.body;

    try {
        const user = await connection.query('SELECT name, password FROM users WHERE email = $1;', [email]);
        if(user.rows.length === 0) return res.sendStatus(404);
        if(bcrypt.compareSync(password, user.rows[0].password)) {
            return res.status(202).send({
                token: uuid()
            });
        } else {
            return res.sendStatus(403);
        }
    } catch (error) {
        res.sendStatus(500);
    }
}

export {
    login
}