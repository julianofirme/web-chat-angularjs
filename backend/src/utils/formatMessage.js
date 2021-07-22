const moment = require('moment');

function formatMessage(username, roomId, msgContent) {
    return {
        username,
        roomId,
        msgContent,
        time: moment().format('h:mma')
    }
}

module.exports = formatMessage;


