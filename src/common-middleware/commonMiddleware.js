const jwt =  require("jsonwebtoken")

// 28 

const multer = require("multer");

const shortid = require ("shortid")

/*const { addCategory, getCategory } = require("../controller/category");*/

 
const path = require("path")

exports.requireSingin = (req, res, next) => {

    if (req.headers.authorization)
    {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
       
    }else{
        return res.status(400).json({
            message:"invalid authorization"
        })
    }

    next();
  
    //  jwt.decode()
} 


exports.userMiddleware = (req, res, next) =>{

    if(req.user.role !== "user") {
        return res.status(400).json({
           messag: "Access deniie : Only user can acces"
        })
    }

    next();
 
    
}



exports.adminMiddleware = (req, res, next) =>{
    if(req.user.role !== "admin") {
        return res.status(400).json({
           messag: "Access deniie : only admin can acces"
        })
    }

    next();
}


//


// to decript the uplods files -> multer.npm
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads"))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
})

/*  var upload = multer({ storage: storage }) */
exports.upload =multer({storage})

