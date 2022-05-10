const router = require("express").Router();


const dotenv = require('dotenv');
const {OAuth2Client} = require('google-auth-library');
dotenv.config()
const client = new OAuth2Client('662175514296-h4dm5bmcv28vvpcnenubrse9g470ccm7.apps.googleusercontent.com')
const users = [];

function upsert(array,item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if(1 > -1) array[i] = item;
  else array.push(item)
}

router.post('/', async(req,res) => {
  const {token} = req.body;
  const ticket = await client.verifyIdToken({
    idToken : token,
    audience: '662175514296-h4dm5bmcv28vvpcnenubrse9g470ccm7.apps.googleusercontent.com'
  })

  console.log(ticket)

  const { name, email, picture} = ticket.getPayload();
  upsert(users, {name,email,picture})
  res.status(201);
  res.json({name,email,picture})
})


router.get("/", (req, res, next) => {
  try {
    res.send('hello world')
  } catch (err) {
    next(err);
  }
});

module.exports = router;


