const router = require("express").Router();
const {
  models: { User },
} = require("../db");

const dotenv = require('dotenv');
const {OAuth2Client} = require('google-auth-library');
dotenv.config()
const client = new OAuth2Client('662175514296-h4dm5bmcv28vvpcnenubrse9g470ccm7.apps.googleusercontent.com')
//const users = [];

/*function upsert(array,item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if(1 > -1) array[i] = item;
  else array.push(item)
}*/

router.post('/', async(req,res) => {
  console.log(req.body)
  const token = req.body.xc;
  console.log(token)
//   const ticket = await client.verifyIdToken({
//     idToken : token,
//     audience: '662175514296-h4dm5bmcv28vvpcnenubrse9g470ccm7.apps.googleusercontent.com' 
//   })

//   const { given_name, family_name, email} = ticket.getPayload();

//   const user = await User.findOne({where: {
//     googleId: req.body.googleId
//   }})

//   if(!user) {
//     const newUser= User.create({googleId:req.body.googleId, username: given_name, email:email, password: "123"})
//     res.json(newUser)
//   }
//   else res.send(user)
  
//  upsert(users, {given_name,family_name,email,picture})
 
})


router.get("/", (req, res, next) => {
  try {
    res.send('hello world')
  } catch (err) {
    next(err);
  }
});

module.exports = router;


