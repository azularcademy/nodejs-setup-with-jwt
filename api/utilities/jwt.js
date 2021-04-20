import config from "../../config/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from '../models';

export const sign = async function (payload) {
	let accessToken = jwt.sign(payload, config.secret, {
        algorithm: "HS256",
        expiresIn: config.tokenLife
    })
    return accessToken;
}

export const verify = function (token, callback) {
    jwt.verify(token, config.secret, callback);
}


