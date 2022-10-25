const express= require('express');
const router = express.Router();
router.use(express.json());

// router.use(express.urlencoded({ extended: true }));

// const methodOverride = require('method-override');
// router.use(methodOverride('_method'))

const userCntrl = require("../controllers/users");
// const IsLoggedIn = require('../helper/isLoggedIn'); // not yet used!

// Routes
router.get('/user/detail', userCntrl.user_detail_get);
router.get('/user/index', userCntrl.user_index_get);

module.exports = router;