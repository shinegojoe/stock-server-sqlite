import ServerResp from '../../responseLayer/serverResp'


class LoginResplayer {
  login(data: any) {
    if(!data.isValid) {
      const msg = {
        message: "error"
      }
      return new ServerResp(msg, 'error')
    }
    return new ServerResp(data) 
  }
}

export default LoginResplayer