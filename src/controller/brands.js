const slugify = require("slugify");
const Brand = require("../models/brands");
const shortid = require("shortid")


var fs = require("fs")  // to delet files








exports.createBrand = (req, res) => {
    /* res.status(200).json({
          file: req.files, body:req.body
      })*/
  
    const {
      name,
      Nativename,
      tradename,
      origin,
      Headquarters,
      ISIN,
     /* Activity,*/
      Founded,
      parentId,
      description,
      Website,
       
  
  
  
  
    } = req.body;
  
    let brandPictures = [];
    /*req.files['gallery'] */
  //Not Work
  /*  Not Working  ==>
  if (req.files.length > 0) {
      

        console.log("req.files //01", req.files);

        brandPictures = req.files.map((file) => {
            console.log("req.files", file);
        return { img: file.filename };

      });

    }*/

    /*if (req.files["brandPicture"].length > 0) {
        console.log("req.files //01");

        brandPictures = req.files["brandPicture"].map((file) => {
            console.log("req.files", file);
        return { img: file.filename };

      });
        }*/

        console.log("brandLogo", req.body.brandLogo )

        if (req.files) {
                if (Array.isArray(req.files["brandPicture"]) ) {
                  console.log("req.files //01");
          
                  brandPictures = req.files["brandPicture"].map((file) => {
                      console.log("req.files", file);
                  return { img: file.filename };
          
                });
                }
                else {
                    
                }
            }
        
   


    let brandLogo;

    if (req.files) {
      if (Array.isArray(req.files['brandLogo']) ) {
       
        req.files['brandLogo'].map((e) => {
            // console.log("e", e.filename);
            brandLogo =  e.filename
        
            })
        }
        else {
            
        }
    }

          
  
    
   

  



  
    let  Activities = [];

   /* Activities = {
        "Activity" : req.body.Activity
    }
    */
   /*
    Activities.push(
        {
         "Activity" :req.body.Activity
        }
    )
*/


  if (req.body.categoryId) {


  

    if (Array.isArray(req.body.categoryId) ) {
      req.body.categoryId.map((item) => {
          Activities.push(  {"categoryId" : item} )
      });
  }else {
      Activities.push({"categoryId" : req.body.categoryId} )
  }

  }
  

  

    const brandObj = new Brand({
              /*slug : `${slugify(req.body.name)}-${shortid.generate()}`,*/

      name,
      slug: `${slugify(req.body.name)}-${shortid.generate()}`,

      Nativename,
      tradename,
      origin,
      Headquarters,
      ISIN,
      Activities,
      Founded,
      parentId,
      description,
      Website,
      brandPictures,
      brandLogo,
      

      createdBy: req.user._id,
  
    
    });

    Brand.findOne({ name: req.body.name }).exec(  (error, brand) => {
        if(brand) {return res.status(400).json({
            message: "brand already exist"
          })
        }
        else{
            brandObj.save((error, brand) => {
                if (error) {
                  return res.status(400).json({
                    error,
                  });
                }
            
                if (brand) {
                  return res.status(200).json({
                      brand,
                  });
                }
              });
        }
    })
  
  
  };
  
  
  
  /* End Product Creat */
  



  

exports.updateBrand = (req, res) => {

  const {
    name,
    Nativename,
    tradename,
    origin,
    Headquarters,
    ISIN,
   /* Activity,*/
    Founded,
    parentId,
    description,
    Website,


  } = req.body;


  //fs.unlinkSync("del.jpg");
  //fs.mkdirSync("mkTest");
    //fs.rmdirSync("mkTest");
  //fs.unlinkSync("./mkTest/test.txt");
  
  
  
  //fs.unlinkSync("./src/uploads/test.txt");
  //fs.unlinkSync("./src/uploads/Name");






  


  let brandLogo;

  if (Array.isArray(req.files['brandLogo']) ) {
     
  req.files['brandLogo'].map((e) => {
      // console.log("e", e.filename);
      brandLogo =  e.filename
  
      })
  }
  else {
      
  }

  
 
  
  Brand.findOneAndUpdate({ "_id" : req.body._id }, 

  { "$set": { "name": req.body.name, "Nativename": Nativename, "tradename": tradename, "ISIN": ISIN, "origin" : origin,
              "Headquarters" : Headquarters, "Founded": Founded, "parentId" : parentId, "description" : description,
              "Website" : Website,
              "brandLogo" : brandLogo
            
            }
  }, 
{ //new: true,  // return Newu value   // commennted to get the prev name of brandLogo and deleted
   omitUndefined: true,   // return prev value if champ not exixstne 
    // useFindAndModify: false,
}
)


.exec(function(error, brand){
  if (error) {
    console.log("error", error)

      return res.status(400).json({
        error,
      }); 
    }

    if (brand) { 

      console.log("brand", brand)

      if (brandLogo) {
        console.log("brandLogo Name : ", brand.brandLogo, "id Deleted from directory")
      
        fs.unlinkSync(`./src/uploads/${brand.brandLogo}`);
          
      }

      
      return res.status(200).send({
          brand,
      });
    }
});





}


exports.getallBrands = async (req, res) => {
  const brands = await Brand.find({})
    //.select("_id name ")
   // .populate({  })
    .exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
};



