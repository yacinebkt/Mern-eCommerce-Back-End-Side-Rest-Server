const Category = require ("../../models/category")
const Product = require ("../../models/product")
const Order = require ("../../models/order")

const Brand = require ("../../models/brands")







function createCategories(categories, parentId =null ) {

    const categoryList = [];
    let category;
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
            type : cate.type,
            children : createCategories(categories, cate._id)
        })
    }

    return categoryList;
};


exports.initData = async (req, res) => {

    const categories = await Category.find({}).exec(); // find with empty opject will give all the categories Category.find({})    
    const brands = await Brand.find({}).exec();  // get all brands
                                     
    const products = await Product.find({})  
                                    .select( '_id name description price productPictures quantity slug')  // select Some titles
                                    //.populate ('category')  // links tow classes with mongo                      
                                    .populate ({path :'brand', select: '_id name' }) 
                                    .populate ({path :'category', select: '_id name' }) 
                                    .exec(); 
    
    const orders = await Order.find({})
    .populate("items.productId", "name")
    .exec();

    
    //.select("_id name ")
   // .populate({  })
   

    res.status(200).json({
        categories :createCategories(categories), 
        products,
        orders, 
        brands


    })
}