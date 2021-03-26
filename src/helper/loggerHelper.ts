const winston = require('winston')

const date = new Date()

const x = date.toLocaleTimeString().split(' ')
// console.log(x)
const fileName = `${date.toLocaleDateString()}_${x[0]}`
// console.log(fileName)

const fileLogger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: `log/${fileName}.log` })
  ]
})


export { fileLogger }