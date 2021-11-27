// import axios from 'axios';
import { logger } from '../config/loggerConfig';

export const sendToUser = async (msisdn, text, messageId, res) => {
    const data = {
        "message-id": `${messageId}`,
        "msisdn": `${msisdn}`,
        "text": `${text}`
      }

return res.send(data);
//    await axios.post(url, data).then((response) => {
//         console.log(response)
//         logger.debug('response from gateway', response);
//     }).catch((error) => {
//         console.log(error)
//         logger.error('error', error);
//     });

};


export const extractKeyword = (text) => {
    if(text.includes(' ')){
        const keywordValue = text.split(' ')[0]
        return keywordValue;
    } else {
        return text;
    }
    
}
