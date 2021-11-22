import axios from 'axios';
import { logger } from '../config/loggerConfig';

const apiKey = ""
export const sendToUser = async (url, msisdn, text) => {
    const headers = {
        'Authorization': `${apiKey}`
      }
    const data = {
        "sender": "55019",
        "message": `${text}`,
        "receiver": `${msisdn}`
      }
   await axios.post(url, data, {
        headers: headers
    }).then((response) => {
        logger.debug('response from gateway', response);
    }).catch((error) => {
        logger.error('error', error);
    });

};


export const extractKeyword = (parseUrl) => {
    const keyword = parseUrl['keyword'];
    const keywordValue = keyword.split(' ')[0]
    return keywordValue;
}
