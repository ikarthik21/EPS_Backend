import UserRegister from '../models/UserSchema.js';
import bcrypt from 'bcrypt';



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
            const user = UserRegister.findOne({ email: lemail }).then(result => {

                console.log(result.password);
                bcrypt.compare(lpassword, result.password, (err, result) => {
                    if (result) {


                    } 
                    else {

                        return res.json({ message: " <h3> Wrong Username or Password </h3> 😓" });  

                    }
                });


            });





        }

    }
}


export default UserController;


