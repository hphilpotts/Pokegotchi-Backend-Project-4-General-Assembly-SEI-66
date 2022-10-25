const express= require('express');
const router = express.Router();
router.use(express.json());

const userCntrl = require("../controllers/users");
const IsLoggedIn = require('../helper/isLoggedIn');

// Routes
router.get('/user/detail', IsLoggedIn, userCntrl.user_detail_get);
router.get('/user/index', userCntrl.user_index_get);
router.get('/user/edit', IsLoggedIn, userCntrl.user_edit_get);
router.put('/user/update', IsLoggedIn, userCntrl.user_edit_put);
router.delete('/user/delete', IsLoggedIn, userCntrl.user_delete);

module.exports = router;