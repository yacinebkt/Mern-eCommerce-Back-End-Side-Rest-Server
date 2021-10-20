const User = require ("../models/user") ;

const jwt = require ("jsonwebtoken");

const bcrypt = require("bcrypt");

const shortid = require("shortid");

const generateJwtToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
  };





exports.getUserById = (req, res) => {

  
    User.findOne({ _id: req.body.id }).exec((error, user) => {
      if (error) return res.status(400).json({ error });
      if (user) {
        res.status(200).json({ user });
      }
    });
 
};




exports.getAllUsers = (req, res) => {

    User.find({}).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(200).json({ result });
      }
    });
 
};












exports.singup = (req, res) => {
    

    User.findOne({ email: req.body.email }).exec( async (error, user) => {
        if(user) return res.status(400).json({
            message: "User already registered"
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
            /*username: Math.random().toString() */
            username: shortid.generate()
        });  


        /*_user.save((error, data)*/     
    _user.save((error, data) => {
        if (error) {
            return res.status(400).json({
                message: "Somethis wrong"
            });
        }
        if (user) {
            const token = generateJwtToken(user._id, user.role);
            const { _id, firstName, lastName, email, role, fullName } = user;
            return res.status(201).json({
            token,
            user: { _id, firstName, lastName, email, role, fullName },
         });
     
        }
       /* if (data) {
            return res.status(201).json({
            message:" User created Successfuly .. ☺ "
            
            });
        }*/
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
           /* console.log( "password problem :", user.authenticate(req.body.password)); // this return promise
            const promise = await user.authenticate(req.body.password)
            console.log( "password problem :", promise) // this return true or false*/
            const promiseVerificate = await user.authenticate(req.body.password)
            if (promiseVerificate  && user.role === "user"){
                /*const token = jwt.sign({_id: user._id,  role: user.role}, process.env.JWT_SECRET, {expiresIn: "1d"});*/
                // );
                const token = generateJwtToken(user._id, user.role);
                const { _id, firstName, lastName, email, role, fullName } = user;
                res.status(200).json({
                token,
                user: { _id, firstName, lastName, email, role, fullName },
                });
            } else {
                return res.status(400).json({
                message: "Something went wrong",
                });
            }

        } else {
            return res.status(400).json({
                message: "somethins wrong"
            })
        }



    })


};

