import JWT from 'jsonwebtoken'

const secret = 'xxx'

export const generateJWT = (opt: object) =>{
  const jwt = JWT.sign(opt, secret)
  return jwt
}

export const verifyJWT = (jwt: string): any => {
  const decoded = JWT.verify(jwt, secret)
  return decoded

}