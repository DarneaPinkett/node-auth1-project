const router = require("express").Router();

const Users = require("./userModel");

router.get("/", (req,res) => {
    if (req.session && req.session.user) {
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(err =>
        res.send(err));
    } else {
        res.status(401).json({message: 'Not loggen in'})
    }
});

module.exports = router;