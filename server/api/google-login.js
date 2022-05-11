const router = require("express").Router();
const {
  models: { User },
} = require("../db");

const {OAuth2Client} = require('google-auth-library');
require('dotenv').config()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const googlePW = process.env.STRIPE_PRIVATE_KEY

router.post('/', async(req,res) => {
  const token = req.body.token.xc.id_token;

  const ticket = await client.verifyIdToken({
    idToken : token,
    audience: process.env.GOOGLE_CLIENT_ID
  })

  const { given_name, email} = ticket.getPayload();

  const user = await User.findOne({where: {
    googleId: req.body.token.googleId
  }})

  if(!user) {
    const newUser= await User.create({googleId: req.body.token.googleId, username: given_name, email:email, password: googlePW})
    res.json(newUser)
  }
  else res.send(user)
  
 
 
})



module.exports = router;


