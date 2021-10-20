const express =require("express");
const { singup, singin, getUserById, getAllUsers } = require("../controller/user");
const { validateSingupRequest, validateSinginRequest, isRequestValidated } = require("../validators/user");


const router =express.Router();






router.post('/getUserId' , getUserById);

router.get('/getAllUsers' , getAllUsers);

router.post('/singup',validateSingupRequest, isRequestValidated, singup);


router.post('/singin',validateSinginRequest,isRequestValidated, singin);



/* 
router.post ('/profile', requireSingin, (req, res) =>{

    res.status(200).json({
        user: 'profile 2'
    })
});
*/
module.exports= router;