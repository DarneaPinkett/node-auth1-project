const router = require("express").Router();
const restricted = require("../auth/restrictedmiddleware");

const Users = require("./userModel");

router.get("/", restricted, (req,res) => {
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(err =>
        res.send(err));
});

module.exports = router;