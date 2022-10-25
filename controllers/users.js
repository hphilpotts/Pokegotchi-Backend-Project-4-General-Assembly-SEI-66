const { User } = require('../models/User');

exports.user_index_get = (req, res) => {
    User.find()
    .then(users => {
        res.json({users})
    })
    .catch(err => {
        console.log(err)
    })
}

exports.user_detail_get = (req, res) => {
    console.log('finding user')
    User.findById(req.query.id)
    .then(user => {
        res.json({user})
    })
    .catch(err => {
        console.log(err)
    })
}