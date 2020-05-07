const router = require("express").Router();

const bcrypt = require("bcryptjs");

const Users = require('../users/userModel');

router.post('/register', (req, res) => {
    const user = req.body

    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.add(user)
    .then(saved => {
        res.status(201).json({saved});
    })
    .catch(err => {
        res.status(500).json({error: 'You shall not pass!'})
    })    
});

router.post('/login', (req, res) => {
    const {username, password} = req.body;

    Users.findBy({username})
    .then(([user]) => {
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = username;
        res.status(200).json({message: "You Made it"});
    } else {
        res.status(401).json({message: "You shall not pass!"})
    }
    })
    .catch(err => {
        res.status(500).json({error: 'You shall not pass!'})
    })
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send("Your stuck");
        } else {
            res.send("logged out");
        }
    })
});

module.exports = router;