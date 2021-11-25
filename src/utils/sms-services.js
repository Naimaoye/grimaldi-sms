import axios from 'axios';
import { logger } from '../config/loggerConfig';

export const sendToUser = async (url, msisdn, text, messageId) => {
    const data = {
        "message-id": `${messageId}`,
        "msisdn": `${msisdn}`,
        "text": `${text}`
      }
   await axios.post(url, data).then((response) => {
        console.log(response)
        logger.debug('response from gateway', response);
    }).catch((error) => {
        console.log(error)
        logger.error('error', error);
    });

};


export const extractKeyword = (text) => {
    const keywordValue = text.split(' ')[0]
    return keywordValue;
}
