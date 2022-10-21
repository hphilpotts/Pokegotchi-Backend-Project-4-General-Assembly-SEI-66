const express = require('express');
const axios = require('axios');

const methodOverride = require('method-override');

const router = express.Router();

router.use(methodOverride('_method'))

router.use(express.urlencoded({ extended: true }));

const pokegochiCntrl = require("../controllers/pokegochi");

const IsLoggedIn = require('../helper/isLoggedIn');

// Routes
router.get("/pokegochi/add", IsLoggedIn, pokegochiCntrl.pokegochi_create_get);
router.post("/pokegochi/add", pokegochiCntrl.pokegochi_create_post);
router.get("/pokegochi/index", pokegochiCntrl.pokegochi_index_get);
router.get("/pokegochi/detail", pokegochiCntrl.pokegochi_show_get);
router.get("/pokegochi/delete", pokegochiCntrl.pokegochi_delete_get);
router.get("/pokegochi/edit", pokegochiCntrl.pokegochi_edit_get);
router.put("/pokegochi/update", pokegochiCntrl.pokegochi_update_put);

module.exports = router;
