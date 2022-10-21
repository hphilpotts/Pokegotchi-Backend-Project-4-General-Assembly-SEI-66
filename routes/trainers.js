const express= require('express');

const methodOverride = require('method-override');

const router = express.Router();

router.use(methodOverride('_method'))

router.use(express.json());

const trainerCntrl = require("../controllers/trainers");

const IsLoggedIn = require('../helper/isLoggedIn');

// Routes
router.get("/trainer/add", IsLoggedIn, trainerCntrl.trainer_create_get);
router.post("/trainer/add", IsLoggedIn, trainerCntrl.trainer_create_post);
router.get("/trainer/index", IsLoggedIn, trainerCntrl.trainer_index_get);

router.get("/trainer/detail", trainerCntrl.trainer_show_get);
router.delete("/trainer/delete", IsLoggedIn, trainerCntrl.trainer_delete_get);
router.get("/trainer/edit", IsLoggedIn, trainerCntrl.trainer_edit_get);
router.put("/trainer/update", IsLoggedIn,trainerCntrl.trainer_update_put);

module.exports = router;