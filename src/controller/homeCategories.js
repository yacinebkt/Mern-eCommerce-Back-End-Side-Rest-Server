const HomeCategories = require ("../models/homeCategories");


  
exports.addHomeCategory = (req, res) => {

    HomeCategories.findOne({ modelnumber: req.body.modelnumber }).exec( (error, modelnumber) => {
        if (error) {
            return res.status(400).json({
              error,
            });
        }
        // existe model and add items in the modal
        if (modelnumber) {
            
            let modelItems = req.body.modelItems;

            HomeCategories.findOneAndUpdate(
                
                { modelnumber: req.body.modelnumber }, 
                { $push: { modelItems: modelItems  } },
            ).exec((error, HomeCategories) => {
                if (error) {
                    return res.status(400).json({
                      error,
                    });
                }
                if (HomeCategories) {
                    return res.status(201).json({
                        HomeCategories,
                    });
                }

            });
                
         
        } 
         // ADD model and add items in the modal
         else{
            
                const homeCategories = new HomeCategories({
                    modelnumber : req.body.modelnumber,
                    modelItems : req.body.modelItems,
                
                  
                });

                homeCategories.save((error, homeCategories) => {
                    if (error) return res.status(400).json({ error });
                    if (homeCategories) {
                    return res.status(201).json({ homeCategories });
                    }
                });

        }

    })
};


/*
exports.getHomeCategory = (req, res) => {
    //const { user } = req.body.payload;
    //if(user){
    HomeCategories.findOne({ modelnumber: req.body.modelnumber })
      //.populate("cartItems.product", "_id name price productPictures")
      .exec((error, HomeCategories) => {
        if (error) return res.status(400).json({ error });
        if (HomeCategories) {
          let modelItems = {};
          cart.cartItems.forEach((item, index) => {
            cartItems[item.product._id.toString()] = {
              _id: item.product._id.toString(),
              name: item.product.name,
              img: item.product.productPictures[0].img,
              price: item.product.price,
              qty: item.quantity,
            };
          });
          res.status(200).json({ cartItems });
        }
      });
    //}
  };
  */

  
  


exports.getHomeCategory = (req, res) => {

    HomeCategories.find({})
    .exec((error, HomeCategories) =>{
        if (error) return res.status(400).json({ error });

        if (HomeCategories) {

            return res.status(200).json({ HomeCategories });
          }


    });
}




/*
exports.getHomeCategoryByModal = (req, res) => {
    const modelnumber = req.body.modelnumber;

    HomeCategories.findOne({modelnumber})
    .exec((error, HomeCategories) =>{
        if (error) return res.status(400).json({ error });

        if (HomeCategories) {

            return res.status(200).json({ HomeCategories });
          }


    });
}*/