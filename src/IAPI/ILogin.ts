
interface ILoginUrl {
  loginUrl: string
}

interface IGoogleCode {
  codeString: string
}

type LogInResp = {
  id: number
  email: string
  name: string
  jwt: string
}

type LoginReq = {
  email: string
  password: string
}

type SignUpReq = {
  email: string
  password: string
  name: string
}

export type { ILoginUrl, IGoogleCode, LogInResp, LoginReq, SignUpReq }