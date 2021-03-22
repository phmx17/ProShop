import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}
export default generateToken;
// see www.jwt.io
// the token payload carries: algo and type; after the period comes instantiation and expiration;then after 2nd period comes verify signature stuff
