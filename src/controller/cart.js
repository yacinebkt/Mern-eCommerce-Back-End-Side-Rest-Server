const Cart = require("../models/cart");

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    //you update code here

    Cart.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((result) => resolve())
      .catch((err) => reject(err));
  });
}

exports.addItemToCart = (req, res) => {
  // vérifier if cart of user existe for not crate anauther cart
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) {
      return res.status(400).json({
        error,
      });
    }

    if (cart) {
      // if cart already exist -->  update cart by quantity
      /* New */
      let promiseArray = [];

      req.body.cartItems.forEach((cartItem) => {
        const product = cartItem.product;
        const item = cart.cartItems.find((c) => c.product == product);
        let condition, update;
        if (item) {
          condition = { user: req.user._id, "cartItems.product": product };
          update = {
            $set: {
              "cartItems.$": cartItem,
            },
          };
        } else {
          condition = { user: req.user._id };
          update = {
            $push: {
              cartItems: cartItem,
            },
          };
        }
        promiseArray.push(runUpdate(condition, update));

        //Cart.findOneAndUpdate(condition, update, { new: true }).exec();
        // .exec((error, _cart) => {
        //     if(error) return res.status(400).json({ error });
        //     if(_cart){
        //         //return res.status(201).json({ cart: _cart });
        //         updateCount++;
        //     }
        // })
      });
      Promise.all(promiseArray)
        .then((response) => res.status(201).json({ response }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      //if cart not exist then create a new cart
      const cart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });
      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  });
};

/* New */

/*
            const isProductExiste = cart.cartItems.find( c => c.product == req.body.cartItems.product);
        
            if (isProductExiste) {
                // if product item already exist in the Cart --> update cartItems --> update cuantity

                Cart.findOneAndUpdate({ "user": req.user._id, "cartItems.product": req.body.cartItems.product }, {
                    "$set" : {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity : isProductExiste.quantity + req.body.cartItems.quantity
                        
                        }
                    }
    
                }).exec((error, _cart) => {
                    if (error) {
                        return res.status(400).json({
                            error
                        });
                    }
                    if (_cart) {
                        return res.status(200).json({
                            _cart
                        });
                    }
    
    
                });

                
            }
            else {
                
                // if cart already exist and item not in the cart

                
                Cart.findOneAndUpdate({ user: req.user._id }, {
                    "$push" : {
                        "cartItems": req.body.cartItems
                    }
    
                }).exec((error, _cart) => {
                    if (error) {
                        return res.status(400).json({
                            error
                        });
                    }
                    if (_cart) {
                        return res.status(200).json({
                            _cart
                        });
                    }
    
    
                });
    
            }
            /*
            return res.status(200).json({
                message: "cart alrea dy exist"
            });

            */
/*
        }

        else{
            
                 // if cart not exist --> create New Cart
             const cart = new Cart({
            user: req.user._id,
            cartItems: [req.body.cartItems]
            });
            
            cart.save((error, cart)=>{
                if (error) { 
                    return res.status(400).json({
                        error
                    })
                }

                if (cart) {
                    return res.status(201).json({
                        cart
                    })
                }
            })

        }

    });



};

*/

exports.getCartItems = (req, res) => {
  //const { user } = req.body.payload;
  //if(user){
  Cart.findOne({ user: req.user._id })
    .populate("cartItems.product", "_id name price productPictures")
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error });
      if (cart) {
        let cartItems = {};
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

// new update remove cart items
exports.removeCartItems = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Cart.update(
      { user: req.user._id },
      {
        $pull: {
          cartItems: {
            product: productId,
          },
        },
      }
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};
