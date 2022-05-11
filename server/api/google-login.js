const router = require("express").Router();
const {
  models: { User },
} = require("../db");

const dotenv = require('dotenv');
const {OAuth2Client} = require('google-auth-library');
dotenv.config()
const client = new OAuth2Client('662175514296-h4dm5bmcv28vvpcnenubrse9g470ccm7.apps.googleusercontent.com')

router.post('/', async(req,res) => {
  const token = req.body.token.xc.id_token;

  const ticket = await client.verifyIdToken({
    idToken : token,
    audience: '662175514296-h4dm5bmcv28vvpcnenubrse9g470ccm7.apps.googleusercontent.com' 
  })

  const { given_name, family_name, email} = ticket.getPayload();

  const user = await User.findOne({where: {
    googleId: req.body.token.googleId
  }})

  if(!user) {
    const newUser= await User.create({googleId: req.body.token.googleId, username: given_name, email:email, password: "123"})
    res.json(newUser)
  }
  else res.send(user)
  
 
 
})


router.get("/", (req, res, next) => {
  try {
    res.send('hello world')
  } catch (err) {
    next(err);
  }
});

module.exports = router;


