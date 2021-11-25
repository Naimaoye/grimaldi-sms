//import qs from 'qs';
import { extractKeyword } from '../utils/sms-services';
import { logger } from '../config/loggerConfig';
import {smsLogic} from './sms-logic';
import { whiteList, baseURL } from '../menu/constants';



export default class Sms {

    static async smsSendLogic(req, res) {
        console.log(req)
    try {
            const messageId = req.body["message-id"]
            const {text, msisdn} = req.body;
            const keywordValue = await extractKeyword(text);
            const email = text.split(' ')[2];
            const bl = text.split(' ')[1];
            if(msisdn) {
                /* ussd Logic */  
                smsLogic(baseURL, msisdn, email, bl, keywordValue, messageId);
              } else {
                logger.error('Incomplete query parameters received or phone number not whitelisted');
            }
    } catch(e){
        logger.error("error", e);
    }
}
}

