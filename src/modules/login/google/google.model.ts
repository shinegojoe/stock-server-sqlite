import { Request, Response, NextFunction} from 'express'
import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client'
import { IGoogleCode } from '../../../IAPI/ILogin'
import axios from 'axios'


const googleConfig = {
  clientId: '1098578335816-6q9fmc1q4cdoid6qqvcqq2osa1sv3sme.apps.googleusercontent.com',  // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  clientSecret: '0SYtO_8Kbg4rGsrSzjM5noFt', // e.g. _ASDFA%DFASDFASDFASD#FAD-
  redirect: 'http://localhost:3002/api/callback', // this must match your google api settings
}

const defaultScope = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',

]

class GoogleLoginModel {
  
  auth: OAuth2Client
  constructor() {
    this.auth = this.createConnection()
  }

  createConnection() {
    return new google.auth.OAuth2(
      googleConfig.clientId,
      googleConfig.clientSecret,
      googleConfig.redirect
    )
  }

  getConnectionUrl(auth: OAuth2Client): string {
    return auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: defaultScope
    });
    
  }

  getLoginUrl(): string {
    // const auth = this.createConnection()
    const url = this.getConnectionUrl(this.auth)
    return url
  }

  parseCodeString(codeString: string): string {
    var re = /code=\S*&scope/
    // var re = /code=\S*/
    const res: RegExpMatchArray = codeString.match(re) as RegExpMatchArray
    // const q = xx[0].replace('code=')
    // const index = xx[1].index
    const index = res.index as number + 4
    const resString = res[0]
    // console.log(resString)
    let newString = ''
    for(let i=index; i<resString.length - 6;i ++) {
      const w = resString[i]
      newString += w
    }
    return newString
  }

  async getToken(req: any) {
    // const googleCode: IGoogleCode = req.body
    // console.log('googleCode', googleCode)
    // const code = this.parseCodeString(googleCode.codeString)
    // console.log('code', code)
  
    const code: string = req.query.code as string
    const data = await this.auth.getToken(code)
    const tokens = data.tokens
    req.session.gt = tokens.id_token
    const xx = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${tokens.id_token}`)
    console.log('xx', xx.data)

    return tokens
  }
    
  
}

const model = new GoogleLoginModel()
export default model