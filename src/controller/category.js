const slugify = require("slugify");
const Category = require("../models/category");
const shortid = require("shortid")




function createCategories(categories, parentId =null ) {

    const categoryList = [];
    let category;


     /* ADD */
   /* let categoryPictures = [];

    if (req.files.length>0) {
      categoryPictures = req.files.map(file =>{
            return { img: file.filename}
        })
    }
    */
    /* */
    if (parentId == null){
        category = categories.filter ( cat => cat.parentId == undefined);
    }
    else {
        category = categories.filter ( cat => cat.parentId == parentId);

    }

    for (let cate of category ) {
        categoryList.push({
            _id : cate._id,
            name : cate.name,
            slug : cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            categoryPicture : cate.categoryPicture,
            children : createCategories(categories, cate._id)
        })
    }

    return categoryList;
};








exports.addCategory = (req, res) => {


  let urlCategory;

    


    const categoryObj = {
      name : req.body.name,
      slug : `${slugify(req.body.name)}-${shortid.generate()}`,
     
        brands: {
          "brand" : req.body.brand
        },
      

     
     /* categoryPicture: urlCategory*/
  
      
     /*slug: req.body.name, 
     slug : slugify(req.body.name)*/
    }
  

    /* update after */

    
    if (req.file){
      urlCategory = process.env.APP_API + "/public/" + req.file.filename;
      categoryObj.categoryPicture= urlCategory;
    }

    /* end update */
    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId;
    }

  /*  if (req.body.brand) {
      categoryObj.brands = {"5"}
    }
*/
  
    const cat = new Category(categoryObj);
  
    cat.save((error, category) => {
      if (error) return res.status(400).json({ error });
      if (category) {
        return res.status(201).json({ category });
      }
    });



}



exports.getOneCategory = (req, res) => {
  const categoryId  = req.body.categryId;

  if (categoryId) {
    Category.findOne({ _id: categoryId}).exec((error, category) => {
      if (error) return res.status(400).json({ error });
      if (category) {
        //const categoryNew = createCategories(categories);

        res.status(200).json({ category });
      }
    });
  } else {
    return res.status(400).json({ error: "categoryId required" });
  }
}



exports.getCategory = (req, res) => {

    Category.find({})
    .exec((error, categories) =>{
        if (error) return res.status(400).json({ error });

        if (categories) {

            const categoryList = createCategories(categories);
            return res.status(200).json({ categoryList });
          }


    });
}

exports.updateCategories = async (req, res) => {
 
  //categoryPicture Add
  const { _id, name, parentId, type} = req.body ;
 /* */


  if (req.files.length >0) {
    console.log("req.files.length>0 ========");
    console.log("req.files", req.files);
    console.log("====================================");

   
  }

  var filenames = req.files.map(function(file) {
    
    categoryPicture  = file.filename;
    console.log("categoryPicture", categoryPicture);

  });
  


console.log("name to modifed", name)
//console.log("categoryPicture to modifed", categoryPicture)


 // const categoryPicture = req.file.filename ;
 // const categoryPicture = req.file ;
  
//Note: For this {$set: { profileimage : req.file.filename}}



  
  const updatedCategories = [];
  if (name instanceof Array) {
    for (let i=0; i < name.length ;i++) {
      const category = {
        name: name[i],
        type: type[i]
      };
      if( parentId[i] !== "") {
        category.parentId= parentId[i]
      }

    /*  if (categoryPicture){
        urlCategory = process.env.APP_API + "/public/" + req.file.filename;
        category.categoryPicture= urlCategory;
      console.log("in the req.file 01")

      }

         if (req.files.length>0) {
        productPictures = req.files.map(file =>{
            return { img: file.filename}
        })
    }
    
      */
      console.log("out the req.file 01")
    
      
      
      const updatedCategory = await Category.findOneAndUpdate({_id: _id[i]}, category, {new:true});
      updatedCategories.push(updatedCategory);
    }
    return res.status(201).json({updatedCategories});

  }else {  // Single Item
    const category = {
      name, 
      type 
    };
    
    if (parentId !== "") {
      category.parentId = parentId
    }

    if (categoryPicture !== null) {
      urlCategory = process.env.APP_API + "/public/" + categoryPicture;
     // categoryObj.categoryPicture= urlCategory;
      
      category.categoryPicture = urlCategory
      console.log ('categoryPicture update', categoryPicture)
    }

    
   /* if (categoryPicture){
      urlCategory = process.env.APP_API + "/public/" + req.file.filename;
      category.categoryPicture= urlCategory;
      console.log("in the req.file 02")

    }
    */
  
  console.log("out the req.file 02")


    const updatedCategory = await Category.findOneAndUpdate({_id}, category, {new:true});

    return res.status(201).json({updatedCategory});

  }
  
}



exports.deleteCategories = async (req, res) =>{

  const { ids } = req.body.payload;
  const deletedCategories =[];

  for (let i=0; i < ids.length ; i++) {
    const deleteCategory = await Category.findOneAndDelete ({_id: ids[i]._id})
    deletedCategories.push (deleteCategory)
  }



  //   if (deleteCategory.length == ids.length)

 
  if (deletedCategories.length == ids.length) {
    res.status(201).json({ message: "Categories removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }

}