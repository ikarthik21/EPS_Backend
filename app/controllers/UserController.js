import UserRegister from '../models/UserSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();




const UserController = () => {
    return {
        async register(req, res) {


            const { name, ilnumber, mobile, email, password } = req.body;




            const user = await UserRegister.findOne({ email: email });

            if (user) {
                return res.status(200).json({ message: "<h3>User already exists 🙄</h3>" });
            }
            else {
                const User = await new UserRegister({
                    name: name,
                    ilnumber: ilnumber,
                    mobile: mobile,
                    email: email,
                    password: password
                })

                try {
                    const registered = await User.save().then((resp) => {
                        return res.json({ message: " <h3> User Added wait for Admin Approval 😊 </h3> " });
                    });

                } catch (err) {
                    console.log(err);
                    return res.json({ message: " <h3> Error in adding the User </h3> 😓" });
                }

            }

        },
        async login(req, res) {


            const { lemail, lpassword } = req.body;
            const user = await UserRegister.findOne({ email: lemail });


            if (user) {



                if (user.verified !== "true") {
                    // Handle the error
                    return res.json({ message: '<h3>Ask Admin to approve and try again </h3>' });
                }

                const user_role = user.role;
                const userid = user._id.toHexString();


                bcrypt.compare(lpassword, user.password, (err, rslt) => {

                    if (err) {
                        // Handle the error
                        return res.status(500).json({ message: 'Internal Server Error' });
                    }

                    if (rslt) {

                        // Passwords match, generate JWT
                        const token = jwt.sign(
                            {
                                username: userid,
                                role: user_role
                            },
                            process.env.TOKEN_SECRET
                        );

                        // Send the JWT to the user
                        return res.json({ token });
                    }
                    else {
                        // Passwords do not match
                        return res.json({ message: '<h3> Wrong Username or Password </h3> 😓' });

                    }


                });




                // const user = UserRegister.findOne({ email: lemail }).then(result => {


                //     const user_role = result.role;
                //     const userid = result._id.toHexString();


                //     bcrypt.compare(lpassword, result.password, (err, rslt) => {

                //         if (err) {
                //             // Handle the error
                //             return res.status(500).json({ message: 'Internal Server Error' });
                //         }

                //         if (rslt) {

                //             // Passwords match, generate JWT
                //             const token = jwt.sign(
                //                 {
                //                     username: userid,
                //                     role: user_role
                //                 },
                //                 process.env.TOKEN_SECRET
                //             );

                //             // Send the JWT to the user
                //             return res.json({ token });
                //         }
                //         else {
                //             // Passwords do not match
                //             return res.json({ message: '<h3> Wrong Username or Password </h3> 😓' });
                //         }
                //     });







                // });


            } else {
                return res.json({ message: '<h3> User Doesn`t Exists </h3> ' });

            }
        },
        async getUsers(req, res) {

            try {

                const Users = await UserRegister.find();

                if (Users) {
                    return res.json(Users);
                } else {
                    return res.json({ message: "<h3>No users 🙄</h3>" });
                }
            } catch (error) {
                console.log(error);
                return res.json({ message: error });
            }

        },
        async approveUser(req, res) {

            const { email } = req.body;


            const User = await UserRegister.findOne({ email: email });

            try {
                if (User) {
                    User.verified = "true";

                    // Save the updated document
                    const updatedDocument = await User.save();

                    return res.json({ message: " <h3> User Approved 😊 </h3> " });
                }
                else {
                    console.log("User not found");
                    return res.json({ message: " <h3> User not found 😢 </h3> " });
                }

            } catch (err) {
                console.log(err);
                return res.json({ message: " <h3> Error in Updating 😢 </h3> " });
            }


        }

    }
}


export default UserController;


