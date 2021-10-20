const mongoose = require("mongoose");
const homeCategorieschema = new mongoose.Schema(
  {
    modelnumber: {
        type: Number,
        unique: true,
        required: true
    },

    modelItems: [
        {
            category: {
                type: mongoose.Schema.Types.ObjectId, ref :"Category",
                required: true,
            },

            priority: {
                type: Number,
                required: true,
                default : 0, // default priority numbre
            },

            verticalbanner: {
                type:String,
            },

            Horizontalbanner: {
                type:String,
            },

        }
    ]
       
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomeCategories", homeCategorieschema);