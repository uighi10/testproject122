const {createLogger,transports,format} = require('winston');
const { combine, timestamp, label, printf,json } = format;
const env = require('node:process');
const printLog = combine(
    timestamp({
        format:"YYYY-MM_DD HH:mm:dd"
    }),

    json()
)

const logger = createLogger({
    transports:[new transports.File({
        filename: "access.log",
        dirname:"./logs",
        level:"info",
        format: printLog
    })]
});



module.exports = logger;