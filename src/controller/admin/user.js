const User = require ("../../models/user") ;

const jwt = require ("jsonwebtoken");

/*const {validationResult} = require ("express-validator");*/

const bcrypt = require ("bcrypt");
const shortid = require("shortid")

exports.singup = (req, res) => {
    

    /*const errors= validationResult(req);
    return res.status(400).json({errors:errors.array()})
    */

    User.findOne({ email: req.body.email }).exec( async (error, user) => {
        if(user) return res.status(400).json({
            message: "Admin already registered"
        });

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const hash_password = await bcrypt.hash(password, 10);
        const _user = new User({
            firstName,
            lastName,
            email,
            hash_password,
            /*username: Math.random().toString(),*/
            username: shortid.generate(),
            role: "admin"
        });  


        
    _user.save((error, data) => {
        if (error) {
            return res.status(400).json({
                message: "Somethis wrong"
            });
        }
        if (data) {
            return res.status(201).json({
            message:" ADMIN created Successfuly .. ☺ "
            
            });
        }
    })

    
    });


}




exports.singin = (req, res) => {
    User.findOne({ email: req.body.email }).exec( async (error, user) => {

        if (error) {
            return res.status(400).json({
                error
            });
        }
        if (user) {

           
            const promiseVerificate = await user.authenticate(req.body.password)
            if (promiseVerificate && user.role === "admin"){
                const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1h"});
                const { _id, firstName, lastName, email, role, fullName } = user;
                
                // creat cookie
                res.cookie("token", token, {expiresIn:"1h"})
                
                res.status(200).json({
                    token,
                    user: {
                        _id, firstName, lastName, email, role, fullName
                    }
                });
                
            }else{
                return res.status(400).json({
                    message: "Invalid Password"
                })

            }

        } else {
            return res.status(400).json({
                message: "somethins wrong"
            })
        }



    })


};

/*


exports.requireSingin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  next();
    //  jwt.decode()
} 
*/



exports.singout = (req, res) =>{

    res.clearCookie("token");
    res.status(200).json({
        message: "Sign Out successfully ... ☺"
    })
}