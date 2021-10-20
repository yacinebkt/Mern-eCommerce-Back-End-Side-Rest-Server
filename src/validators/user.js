const { check, validationResult} = require ("express-validator");

exports.validateSingupRequest = [
    check("firstName")
    .notEmpty()
    .withMessage("firstName is requirde"),
    check("lastName")
    .notEmpty()
    .withMessage("lasttName is requirde"),
    check("email")
    .isEmail()
    .withMessage("email is requirde"),
    check("password")
    .isLength({min:6})
    .withMessage("password must be at last 6 character long"),
    
];


exports.validateSinginRequest = [
    check("email")
    .isEmail()
    .withMessage("email is requirde"),
    check("password")
    .isLength({min:6})
    .withMessage("password must be at last 6 character long"),
    
];

exports.isRequestValidated = (req, res, next) =>{

    const errors= validationResult(req);
    if (errors.array().length > 0){
        return res.status(400).json({
            error:errors.array()[0].msg
        })

    }

    next();
}