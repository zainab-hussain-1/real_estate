import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js'; // Ensure the correct path for errorHandler
import Listings from '../models/listing.model.js'
export const test = (req, res) => {
    res.json({
        message: "Hello api world", // Fixed typo in the message
    });
};

export const updateUser = async (req, res, next) => {
    // Check if the user is trying to update their own account
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only update your own account')); // Fixed typo in errorHandler
    }

    try {
        // Hash the password if it is provided in the request body
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        // Find and update the user
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar
                }
            },
            { new: true } // Return the updated document
        );

        // If no user is found, return an error
        if (!updatedUser) {
            return next(errorHandler(404, 'User not found'));
        }

        // Destructure the password out of the user document
        const { password, ...rest } = updatedUser._doc;

        // Respond with the updated user details
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async(req,res,next)=>{
      if (req.user.id === req.params.id) 
        return next(errorHandler(401,'You can only delete your own account'));
try{
    await User.findByIdAndDelete (req.params.id);
    res.clearCookie('access_token')
    res.status(200).json('User has been deleted!');
}catch(error){
    next(error);
}
    };

    export const getUserListings = async (req,res,next)=>{
        if(req.user.id === req.params.id){
              try{
            const listings =await Listings.find({userRef:req.params.id});
            res .status(200).json(listings);
            } catch(error) {
                next(error)
            }
        }  else {
            return next(errorHandler(401,'you can only view your own listings!'));
        }
    
    }       
        
    

    export const getUser = async (req,res,next)=>{
       try{
        const user = await User.findById(req.params.id);
        if(!user) return next(errorHandler (404,'User not found'));
        const {password: pass,...rest}=user._doc;
        res.status(200).json(rest);
       }catch(error){
        next(error);
       }
       
    }