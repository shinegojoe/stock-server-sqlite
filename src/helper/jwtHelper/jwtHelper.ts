import JWT from 'jsonwebtoken'


const secret = process.env['SECRET'] as string

export type Payload = {
  err: boolean
  email?: string
  password?: string
  iat?: number
  exp?: number
}


export const generateJWT = (opt: object) =>{
  const jwt = JWT.sign(opt, secret, { expiresIn: 60 * 60 })
  return jwt
}

export const verifyJWT = (jwt: string): Promise<Payload> => {
  // token expired return error 
  const p = new Promise<Payload>((resolve, reject)=> {
    JWT.verify(jwt, secret, (err, decoded: any)=> {
      if(err) {
        const payload: Payload = {
          err: true,
        }
        resolve(payload)
      } else {

        const payload: Payload = {
          err: false,
          email: decoded.email,
          password: decoded.password,
          iat: decoded.iat,
          exp: decoded.exp
        }
        resolve(payload)
      }
    })
  })
  return p
}
