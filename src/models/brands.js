const { json } = require("body-parser");
const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    Nativename : { 
        type: String,
    },

    
    tradename : { 
        type: String,
    },

    
    slug: {
        type: String,
        required: true,
        unique: true
    },

    origin : { 
        type: String,
    },
    
    Headquarters : { 
        type: String,
    },

    ISIN  : { 
        type: String,
    },

   /* Activity : [{String}],*/
    
   Activities: [
        {         
             /*type:String,*/
             categoryId:{type:mongoose.Schema.Types.ObjectId, ref:'Category'}, 
    
        }
     ],

     

    Founded : {
        type: Date
    },


    
    parentId: {
        type: String
    },



    
    description:{
        type:String,
       
        trim:true,
    },

    Website :{
        type:String,
    },

    brandLogo: {
        type:String,
    },


    brandPictures: [
       { img:{        
            type:String,
        }}
    ],
    
    
    
    createdBy:{
        type: mongoose.Schema.Types.ObjectId, ref:'User',
        required:true,

    },
    updatedAt:{
        Date
    },
    
  



  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);