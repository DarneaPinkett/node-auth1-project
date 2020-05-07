const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const knexSession = require("connect-session-knex")(session);

const usersRouter = require('./users/userRouter');
const authRouter = require("./auth/authRouter");

const server = express();

const sessionConfig = {
    name: 'animal',
    secret: 'ilovethewild',
    cookie: {
        maxAge: 3600 * 1000,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,

    store: new knexSession(
        {
            knex: require("./data/dbConfig"),
            tablename: "sessions",
            sidfieldname: "sid",
            createtable: true,
            clearInterval: 3600 * 1000
        }
    )
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
    res.json({ api: "up"});
});

module.exports = server;