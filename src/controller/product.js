const Product = require("../models/product");
const shortid = require("shortid");
const slugify = require("slugify");
const Category = require("../models/category");


//match aggregate
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;




exports.createProduct = (req, res) => {
  /* res.status(200).json({
        file: req.files, body:req.body
    })*/

  const {
    name,
    price,
    description,
    /* productPictures*/ 
    category,
    brand,   //Add Last 
    quantity,
    createdBy,


    // ADD AFTER 
        // => storage And Ram
    InternalStorage,
    ExpandableStorage,
    SupportedMemoryCardType,
    MemoryCardSlotType,
    RAM,
    RAMType,
    SSDCapacity,
    HDDCapacity,
    RAMFrequency,
    Cache,
       // => storage End/


       // => Brand Information
       /*

      brand,
      Nativename, 
      tradename, 
      Founded ,
      origin,    
      Headquarters,   
      ISIN ,    
      Activity,  
      Website,
      descriptionBrand,

      parentBrandId,

      logoBrand, 
      Bannerimg,
      */

         // => Brand Information End




  } = req.body;

  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }


  const product = new Product({
    name: req.body.name,
    slug: slugify(name),
    price,
    description,
    productPictures,
    category,
    brand,   //Add Last 
    quantity,
    createdBy: req.user._id,

    storage : {
      InternalStorage,
      ExpandableStorage,
      SupportedMemoryCardType,
      MemoryCardSlotType,
      RAM,
      RAMType,
      SSDCapacity,
      HDDCapacity,
      RAMFrequency,
      Cache
    },
    // ADD AFTER 
        // => storage And Ram
       
           // => storage End/
  });

  product.save((error, product) => {
    if (error) {
      return res.status(400).json({
        error,
      });
    }

    if (product) {
      return res.status(200).json({
        product,
      });
    }
  });
};



/* End Product Creat */

exports.getProductsBySlug = (req, res) => {
  // extraire ht is in the path const {slug} =req.params;
  const { slug } = req.params;
  Category.findOne({ slug: slug })
    .select("_id type")
    .exec((error, category) => {
      if (error) {
        res.status(400).json({
          error,
        });
      }

      if (category) {
        Product.find({ category: category._id }).exec((error, products) => {
          if (error) {
            res.status(400).json({
              error,
            });
          }

          if (category.type) {
            if (category.type) {
              if (products.length > 0) {
                res.status(200).json({
                  products,
                  priceRange: {
                    under1MillionDz: 10000,
                    under2MillionDz: 20000,
                    under3MillionDz: 30000,
                    under4MillionDz: 40000,
                    under5MillionDz: 50000,
                    moreThan5MillionDz: 50000,
                  },
                  productsByPrice: {
                    under5MillionDz: products.filter(
                      (product) =>
                        product.price > 40000 && product.price <= 50000
                    ),
                    under4MillionDz: products.filter(
                      (product) =>
                        product.price > 30000 && product.price <= 40000
                    ),
                    under3MillionDz: products.filter(
                      (product) =>
                        product.price > 20000 && product.price <= 30000
                    ),
                    under2MillionDz: products.filter(
                      (product) =>
                        product.price > 10000 && product.price <= 20000
                    ),
                    under1MillionDz: products.filter(
                      (product) => product.price >= 00 && product.price <= 10000
                    ),
                    moreThan5MillionDz: products.filter(
                      (product) => product.price > 50000
                    ),
                  },
                });
              }
            }
          } else {
            res.status(200).json({ products });
          }
        });
      }
    });

  /* res.status(200).json({
        slug
    })
    */
};

exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

exports.deleteProductById = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Product.deleteOne({ _id: productId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};


exports.getProducts = async (req, res) => {
  const products = await Product.find({ createdBy: req.user._id })
    .select("_id name price quantity slug description productPictures category")
    .populate({ path: "category", select: "_id name" })
    .populate ({path :'brand', select: '_id name' }) 
    .exec();

  res.status(200).json({ products });
};



exports.getAllProducts = async (req, res) => {
  const products = await Product.find({})
    //.select("_id name price quantity slug description productPictures category")
   // .populate({ path: "category", select: "_id name" })
    .exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
};










exports.updateProduct = async (req, res) => {

  if (req.body.review) {
    Product.findOneAndUpdate(
      { _id: req.body._id },
      {
        $push: {
          reviews: {
            userId: req.user._id,
            review: req.body.review,
            //"rating" : req.body.rating,
          },
        },
      },
      { new: true },
      (error, product) => {
        if (error) {
          return res.status(400).json({
            error,
          });
        } else 
        if (!(req.body.rating)) { {
            return res.status(202).json({ product });
          } }
       
      }
    );
  }

  if (req.body.rating) {
    //start
    const productInformation = await Product.find({ _id: req.body._id })
      .select("_id name ratings ")
      .exec();

    // productInformation --> reveiwsUsersIds

    let Ratings = productInformation.map(function (element) {
      return element.ratings;
    });

    let k;
    k = 0; 

    let reveiwsUsersIds2 = [];
    let reveiwsUsersIds = Ratings.map(function (e) {
      return e.map(function (element) {
        reveiwsUsersIds2.push(element.userId);
        
        return element.userId;
      });
    });

    const id = req.user._id;
  

    for (var i = 0; i < reveiwsUsersIds2.length; i++) {
      if (id == reveiwsUsersIds2[i]) {
        k = 1;
      }
    }

    //end
    if (k == 1) {
      //return res.status(202).json({ productInformation, Ratings, reveiwsUsersIds, reveiwsUsersIds2, id, k});
     // return res.status(401).json({ message: "alerady rating this product" });

     Product.findOneAndUpdate(
      { _id: req.body._id,
        "ratings.userId": req.user._id
      },
      {
        $set: {
          "ratings.$.rating": req.body.rating,
        },
      },
      { new: true },
      (error, product) => {
        if (error) {
          return res.status(400).json({
            error,
          });
        } else {
          return res.status(202).json({ product });
        }
      }
    );
     
    } else {
      Product.findOneAndUpdate(
        { _id: req.body._id },
        {
          $push: {
            ratings: { userId: req.user._id, 
                      rating: req.body.rating },
          },
        },
        { new: true },
        (error, product) => {
          if (error) {
            return res.status(400).json({
              error,
            });
          } else {
            return res.status(202).json({ product });
          }
        }
      );
    }
  }
}
;



/*
  

exports.updateProduct = async (req, res) => {
    const { _id, review} = req.body;

    
      const product = {
        _id,
        review
     };
     
      const updatedProduct = await Product.findOneAndUpdate({ _id }, {review: 'Will Riker'} , {
        new: true,
      });

      return res.status(201).json({ updatedCategory });
    
  };
  
  */

/*
  work 
  
  */

/*
  this is  woek after modifications 
  
  
  
exports.updateProduct = async (req, res) => {

    Product.findOneAndUpdate(
        { _id: req.body._id },
        {
          $push: {
            reviews :{  "userId" :  req.user._id,
                        "review": req.body.review,
                        "rating" : req.body.rating,                 
                     }
          },
        },
        { new: true },
        ( error, product) => {
          
          if (error){
            return res.status(400).json({
              error
            })

        }
          else {
            
            return res.status(202).json({ product });

        }

       
        }
      );
    
  };


  

*/





/*
	"arrayIds" : ["60b11bc98c9f1706f00f4fd9", "60c3db1091c30404dcf2e5b8", "60a503565bae3022c42df947"]
 */

exports.getProductsCategoryByArrayIds = (req, res) => {
  
 
  const ArrayIds = req.body.arrayIds;

    Product.find().where('category').in(ArrayIds)
    //.select("_id name category ")

    .exec((error, products) => {
      if (error) {
        res.status(400).json({
          error,
        });
      }

      if (products) {
        res.status(200).json({
          products,
        });
      }        
    });
};





exports.getOrderProductByPrice = (req, res) => {

  const arrayIds = req.body.arrayIds;
  const MaxOrMin = req.body.MaxOrMin;  // -1 = Max value and  1= min
  const itemsNumber = req.body.itemsNumber; // 0 to get all items

  
  const reviewsCondition = req.body.reviewsCondition; 
  const ratingCondition = req.body.ratingCondition; 
  const priceOrDate = req.body.priceOrDate  // 0 price --> 1 date



  
  
  
  if (reviewsCondition == 1 || ratingCondition == 1  ) {  // ratings reviwes 

    //const arrayIdsObjects = arrayIds.map(function(el) { return mongoose.Types.ObjectId(el) }) -> convert ids to pbjectIds
    const arrayIdsObjects =  
    arrayIds.map( e => 
        {return mongoose.Types.ObjectId(e._id)}
    ) 



    if (reviewsCondition == 1) {
      Product
      .aggregate([
        {     
          $match : {
            //_id :  ObjectId('60a7f6d366b2971a84b14f58') Work
            category: {$in : arrayIdsObjects}
          }    
        },
        {
            $addFields : {// name: "$name",reviews : "$reviews",    
    
              reviewsLenth: {$size: { "$ifNull": [ "$reviews", [] ] } } }
        }, 
        {   
            $sort: {"reviewsLenth": MaxOrMin } 
        }
      ])
      .exec((error, products) => {
        if (error) {
          res.status(400).json({
            error,
          });
        }
    
        if (products) {
          if (products.length>0) {
            res.status(200).json({
              products,
              maxPrice: Math.max.apply(Math, products.map(function(e) { return e.price; })),
              minPrice: Math.min.apply(Math, products.map(function(e) { return e.price; }))
      
            });
          }
          else{
            res.status(200).json({
              products,
              maxPrice: 0 ,
              minPrice: 0      
            });
          }
          
         
        }        
      });
       
    } 
    else {
      Product
    

      .aggregate([
       
        {     
            $match : {
              //_id :  ObjectId('60a7f6d366b2971a84b14f58') Work
              category: {$in : arrayIdsObjects}
            }   
        },
        {     
          $addFields : {
            maxQuantity: {$max: "$price"},   minQuantity: {$min: "$price"}, 
            averageRating: {$avg: { "$ifNull": [ "$ratings.rating", [] ] } } }
        }, 
        {   
            $sort: {"averageRating": MaxOrMin } 
        }

      ])
      .exec((error, products) => {
        if (error) {
          res.status(400).json({
            error,
          });
        }
    
        if (products) {
          if (products.length>0) {
            
           

            res.status(200).json({
              products,
              maxPrice: Math.max.apply(Math, products.map(function(e) { return e.price; })),
              minPrice: Math.min.apply(Math, products.map(function(e) { return e.price; }))
      
            });
          }
          else{
            res.status(200).json({
              products,
              maxPrice: 0 ,
              minPrice: 0
      
            });
          }
          
         
        }        
      });
     
  
    }

    
  } 

  else{  // price createdAt 
   
    if (priceOrDate == 1) {
       

      Product.find().where('category').in(arrayIds).sort({ createdAt : MaxOrMin}).limit(itemsNumber)
      //.select("_id name price createdAt")
      .exec((error, products) => {
        if (error) {
          res.status(400).json({
            error,
          });
        }
    
        if (products) {
          if (products.length>0) {
            res.status(200).json({
              products,
              maxPrice: Math.max.apply(Math, products.map(function(e) { return e.price; })),
              minPrice: Math.min.apply(Math, products.map(function(e) { return e.price; }))
      
            });
          }
          else{
            res.status(200).json({
              products,
              maxPrice: 0 ,
              minPrice: 0
      
            });
          }
          
        
        }        
      });
    } else{
      Product.find().where('category').in(arrayIds).sort({ price : MaxOrMin}).limit(itemsNumber)
      //.select("_id name price createdAt")
      .exec((error, products) => {
        if (error) {
          res.status(400).json({
            error,
          });
        }
    
        if (products) {
          if (products.length>0) {
            res.status(200).json({
              products,
              maxPrice: Math.max(products[0].price, products[products.length -1 ].price ) ,
              minPrice: Math.min(products[0].price, products[products.length -1 ].price )
      
            });
          }
          else{
            res.status(200).json({
              products,
              maxPrice: 0 ,
              minPrice: 0
      
            });
          }
          
        
        }        
      });

    }


    



  }
    
};





  
//Product.find({}).sort({ price : -1})  =>  order max to min 
//  Product.find({}).sort({ price : 1})   =>  order min to max 
//  Product.find({}).sort({ price : 1}).limit(1) ==> min
//   Product.find({}).sort({ price : -1}).limit(1) ==> max


 




/*
 if (products.length >0 ) {
        res.status(200).json({
          products,
          maxPrice: Math.max(products[0].price, products[products.length -1 ].price ) ,
          minPrice: Math.min(products[0].price, products[products.length -1 ].price )
  
        });
      }else {
        res.status(200).json({
          products,
         
        });

      } */


/*








/*





exports.getProductsCategoryByArraySlug = (req, res) => {
  
  
  const ArrayIds = req.body.arrayIds

  Category.find().where('_id').in(ArrayIds)
    
    .exec((error, category) => {
      if (error) {
        res.status(400).json({
          error,
        });
      }

      if (category) {
       
        res.status(200).json({
          category,
        }); 
          
      }
    });

  
};


*/

/*

 if (category.type) {
            if (category.type) {
              if (products.length > 0) {
                res.status(200).json({
                  products,
                  
                });
              }
            }
          } else {
            res.status(200).json({ products });
          }
  */


          /*
          
          {
        $group: {
            _id: null,
            maxPrice: {$max: "$price"},
            minPrice: {$min: "$price"}

        }
    }*/





    /*
    
    
exports.getOrderProductByPrice = (req, res) => {

  const arrayIds = req.body.arrayIds;
  const MaxOrMin = req.body.MaxOrMin;  // -1 = Max value and  1= min
  const itemsNumber = req.body.itemsNumber; // 0 to get all items

  const filterChapmp = req.body.filterChapmp; // price createdAt ratings  //reviews ratings dont woek
  
//  Product.find().where('category').in(arrayIds).sort({ price : MaxOrMin}).limit(itemsNumber)

  Product.find().where('category').in(arrayIds).sort({ createdAt : MaxOrMin}).limit(itemsNumber)
  .select("_id name price createdAt")
  .exec((error, products) => {
    if (error) {
      res.status(400).json({
        error,
      });
    }

    if (products) {
      if (products.length>0) {
        res.status(200).json({
          products,
          maxPrice: Math.max(products[0].price, products[products.length -1 ].price ) ,
          minPrice: Math.min(products[0].price, products[products.length -1 ].price )
  
        });
      }
      else{
        res.status(200).json({
          products,
          maxPrice: 0 ,
          minPrice: 0
  
        });
      }
      
     
    }        
  });
    
};



    */









  

exports.updateProductByAdmin = (req, res) => {

  const {
    name,
    price,
    description,
    category,
    brand, 
    quantity,
  } = req.body;


      

  let productPicturesDeleted = [];



    if (req.body.productPictureDelete){
       // console.log("productPictureDelete Exisste", req.body.productPictureDelete)
       if (Array.isArray(req.body.productPictureDelete) ) {
        productPicturesDeleted = req.body.productPictureDelete.map((item) => {
          //return { item };
          return mongoose.Types.ObjectId(item)
 
         });
       }else{
        productPicturesDeleted.push(mongoose.Types.ObjectId(req.body.productPictureDelete))
       }


      

    }
  
  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  
  
  Product.findOneAndUpdate({ "_id" : req.body._id }, 


  { "$set": {
              "name": name, "price": price, "quantity": quantity, "category": category, "brand" : brand,
              'description' : description , 
            },

    "$addToSet" : {                                 // Add if not existe
       "productPictures" :  productPictures
    }, 

  /*  "$pullAll" : {                                 // Add if not existe
      "productPictures" :  req.body.productPictureDelete  // productPicturesDeleted
    },*/
  

   /* "$pull" : {                                 // Add if not existe
      "productPictures" : {"_id" : { "$in" : productPicturesDeleted }}   // productPicturesDeleted
    }
    */
    
   
  }, 
{ new: true,  
//   omitUndefined: true,   // return prev value if champ not exixstne 

}
).exec(function(error, product){
  if (error) {
    console.log("error", error)
      return res.status(400).json({
        error,
      }); 
    }

    if (product) {      

       if (productPictures) {
        console.log("Prouct Images Name : ", product.productPictures )
      
       /* fs.unlinkSync(`./src/uploads/${brand.brandLogo}`);*/
          
      }



      return res.status(200).json({
        product,
      });
    }
});


if (productPicturesDeleted.length>0){


      Product.findOneAndUpdate({ "_id" : req.body._id }, 


      {
        "$pull" : {                                 // Add if not existe
          "productPictures" : {"_id" : { "$in" : productPicturesDeleted }}   // productPicturesDeleted
        } 
      }, 
    { new: true,  
    }
    ).exec(function(error, product){
      if (error) {
        console.log("error", error)
          return res.status(400).json({
            error,
          }); 
        }

    });



}



}
