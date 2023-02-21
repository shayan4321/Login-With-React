
const UserModel = require('../model/userModel.js')
const bcrypt = require('bcrypt');

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
async function register(req,res){
       try {
           const {username, password, profile, email} = req.body;
        //    Check the existing user
        const existUsername = new Promise((resolve, reject)=>{
            UserModel.findOne({username}, function(err, user){
                if(err) reject(new Error(err))
                if(user) reject({error: "Please use Unique Username"});

                resolve();
            })
        });

        // Check For Existing Email
        const existEmail = new Promise((resolve, reject)=>{
            UserModel.findOne({email}, function(err, user){
                if(err) reject(new Error(err))
                if(email) reject({error: "Please use Unique Email"});

                resolve();
            })
        });
        Promise.all([existUsername, existEmail])
            .then(() => {
                if(password){
                    bcrypt.hash(password, 10)
                    .then(hashedPassword => {
                        const user = new UserModel({
                            username,
                            password: hashedPassword,
                            profile: profile || '',
                            email
                        });
                        // return save result as a response
                        user.save()
                            .then(result => res.status(201).send({ msg: "User Registered Successfully"}))
                            .catch(error => res.status(500).send({error}))
                    }).catch(error => {
                        return res.status(500).send({
                            error: "Enable to Hashed Password"
                        }) 
                    })
                }

            }).catch(error => {
                return res.status(500).send({ error })
            })

       } catch (error) {
           return res.status(500).send(error);
       }
}

/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
 async function login(req,res){
    res.json('login route');
}

/** GET: http://localhost:8080/api/user/example123 */
 async function getUser(req,res){
    res.json('getUser route');
}

/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
 async function updateUser(req,res){
    res.json('updateUser route');
}

/** GET: http://localhost:8080/api/generateOTP */
 async function generateOTP(req,res){
    res.json('generateOTP route');
}

/** GET: http://localhost:8080/api/verifyOTP */
 async function verifyOTP(req,res){
    res.json('verifyOTP route');
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
async function createResetSession(req,res){
    res.json('createResetSession route');
}

// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
async function resetPassword(req,res){
    res.json('resetPassword route');
}


module.exports = {
    register,
    login,
    getUser,
    updateUser,
    generateOTP,
    verifyOTP,
    createResetSession,
    resetPassword
    
}
