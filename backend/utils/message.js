const moment = require('moment');

function formatMessage(username, msgContent) {
    return {
        username,
        msgContent,
        time: moment().format('h:mma')
    }
}

module.exports = formatMessage;


