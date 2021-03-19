import express, {Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser'

import dgram from 'dgram'
import NetKeepAlive from 'net-keepalive'
import net from 'net'
import router from './router/index'
import errorHandler from './utils/errorHandler'
import WSServer from './helper/WSHelper/wsHelper'



const app = express();
app.use(bodyParser.json())


app.use('/api', router)

app.use(errorHandler)

app.listen(3000, () => console.log('http server is running at port 3000.'));
const ws = new WSServer(8080)
ws.start()


// const scan = () => {
//     const p = new Promise((resolve, reject)=> {
//         const ret = []
//         const sck = dgram.createSocket('udp4')

//     })
//     return p
// }

// const main = async() => {
//     // const res = await scan()
//     // console.log("res", res)
//     const ret: any = []
//     const sck = dgram.createSocket('udp4')
//     sck.on('message', (msg, rinfo)=> {
//         console.log('msg', msg.toString())
//         console.log('info', rinfo)
//         let match = msg.toString().match(/(BXB_FCS_6350)@([\w\d-]+)/)
//         if (match !== null) {
//             ret.push({
//             address: rinfo.address,
//             deviceId: match[2].replace(/-/g, '').toLowerCase()
//             })
//         }
//         console.log('ret', ret)
//     })
//     sck.on('listening', ()=> {
//         console.log('listening')
//         sck.setBroadcast(true)
//         sck.send('BXB_SCAN', 12345, '255.255.255.255')
//     })
//     sck.bind(12345)

// }

// // main()
// const connect = () => {
//     console.log('run')
//     // const ip = '192.168.2.222'
//     const ip = '192.168.2.230'

//     const opts = {
//         host: ip,
//         port: 6667,
//         retryTime: 1000,
//         retryAlways: true
//     }
//     const sck = new net.Socket()
//     sck.connect(opts)
//     sck.setKeepAlive(true, 1000)
//     sck.on('close', ()=> {
//         console.log('close')
//     })
//     sck.on('connect', ()=> {
//         console.log('connect')
//     })

//     sck.on('data', (data)=> {
//         console.log('data', data.toString())
//     })

//     sck.on('error', (e)=> {
//         console.log('error', e)
//     })

// }

// connect()