import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { err500S, allMandatoryFieldsRequiredS } from "../utilities/error-functions";
import { User } from '../models';
import { sign } from "../utilities/jwt";

const TWO_HOURS = 2880000 ;
export const login = async function (req, res) {
	const {email, password} = req.body;
	if (!email || !password) {
    	return allMandatoryFieldsRequiredS(res);
	}
	await User.findOne({ email: email }).then(async function (data) {
            if (data == null) {
            	return res.status(422).json({
			        message: "Email id does not exist",
			        status: false
			    });
            }

            try {
                if (await bcrypt.compare(password, data.password)) {
                	let userDataInToken = {email: data.email, id: data._id};
                    let token = await sign(userDataInToken);
                    let user = await User.findOne({email: email}).select('-password');
                	let userData = Buffer.from(JSON.stringify(user), "ascii").toString("base64");
                	let maxAgeTime = new Date(Number(new Date()) + TWO_HOURS);
                	let maxAge = {
			            expires: maxAgeTime,
		          	};
                	res.cookie("user", userData, maxAge);
          			res.cookie("token", token, maxAge);
                    return res.status(200).json({
				        message: 'Logged In successfully',
				        status: true
				    });

                } else {
                    return res.status(422).json({
				        message: "Email id or password incorrect",
				        status: false
				    });
                }
            } catch (e) {
            	console.log(e);
                return err500S(res);
            }
        })
    .catch(function (err) {
        return done(null, false, { message: 'Incorrect password', status: false })
    });
};

export const register = async function (req, res) {
  	const { email, firstName, lastName, password} = req.body;
	if (!email || !firstName || !lastName) {
    	return allMandatoryFieldsRequiredS(res);
	}

	try {
		await bcrypt.genSalt(10, async (err, salt) => {
			await bcrypt.hash(password, salt, async (err, hash) => {
		        if (err) {
		          return err500S(res, err);
		        }
				let userObj = {email: email, firstName:firstName, lastName:lastName, password: hash};
				try {
					await User.create(userObj);
					return res.status(200).json({
				        message: "User registered successfully.Please login to continue.",
				        status: true
				    });
				} catch(exception) {
					console.log(exception);
					if(exception && exception.errors && exception.errors.email && exception.errors.email.properties && exception.errors.email.properties.message) {
						return res.status(422).json({
					        message: exception.errors.email.properties.message,
					        status: false
					    });
					} else {
						return err500S(res);
					}
				}
		        
	        });
        });
		
	} catch(exception) {
		return err500S(res);
	}
	
};

export const getUsersList = async function (req, res) {
	let loggedInUser = req.user;
  	let users = await User.find({ _id: { $ne: loggedInUser.id } }).select("-password");
  	return res.status(200).json({
  		data: users,
        message: "List of Users",
        status: true
    });

	
};

export const logout = async function (req, res) {
	req.session.destroy(function (err) {
	    setTimeout(function () {
	      res.clearCookie("user");
	      res.clearCookie("token");
	      return res.status(200).json({
	        message: "Logged out successfully",
	        status: true,
	      });
	    }, 2500);
  	});
};