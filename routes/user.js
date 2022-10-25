const express= require('express');
const router = express.Router();
router.use(express.json());

const userCntrl = require("../controllers/users");
// const IsLoggedIn = require('../helper/isLoggedIn');

// Routes
router.get('/user/detail', userCntrl.user_detail_get);
router.get('/user/index', userCntrl.user_index_get);
router.get('/user/edit', userCntrl.user_edit_get);
router.put('/user/update', userCntrl.user_edit_put);
router.delete('/user/delete', userCntrl.user_delete);

module.exports = router;