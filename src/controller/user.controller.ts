import model from '../model/user.model'

const users = (req: any, res: any, next: any) => {
  // res.send("users!!!")
  try {
    const data = model.users()
    console.log('data', data)
    // return res.status(200).json(data)
    res.status(200).json(data)
  } catch(e) {
    next(e)
  }
  
}

export default {users}

