
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();


const Auth = (req,res,next) => {

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {

        return res.json({ message: " <h3> Authentication Failed </h3> 😓" });

    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        return res.json({ message: " <h3> Error in Authentication </h3> 😓" });
    }

}

export default Auth;
