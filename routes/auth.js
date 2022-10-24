const router = require('express').Router();

const express = require('express');

router.use(express.json());




const authCntrl = require("../controllers/auth");

//Routes

// router.get("/", authCntrl.home_get);
router.get("/auth/signup", authCntrl.auth_signup_get); //not used
router.post("/auth/signup", authCntrl.auth_signup_post);

router.get("/auth/signin", authCntrl.auth_signin_get); //will not use
router.post("/auth/signin", authCntrl.auth_signin_post);

router.get("/auth/logout", authCntrl.auth_logout_get); //will not use

module.exports = router;