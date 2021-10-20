const express =require("express");
const { singup, singin, singout } = require("../../controller/admin/user");

const { check } = require ("express-validator");
const { validateSingupRequest, validateSinginRequest, isRequestValidated } = require("../../validators/user");
const { requireSingin } = require("../../common-middleware/commonMiddleware");

const router =express.Router();






/*
router.post('/admin/singup', singup);
*/
router.post('/admin/singup',validateSingupRequest, isRequestValidated, singup);



router.post('/admin/singin',validateSinginRequest,isRequestValidated, singin);




router.post('/admin/singout', /*requireSingin,*/ singout);



module.exports= router;