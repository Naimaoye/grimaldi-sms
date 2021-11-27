import { logger } from '../config/loggerConfig';
import {smsLogic} from './sms-logic';
import { baseURL } from '../menu/constants';



export default class Sms {

    static async smsSendLogic(req, res) {
        console.log("request", req.body)
    try {
            const messageId = req.body["message-id"]
            const {text, msisdn} = req.body;
            console.log(msisdn, text, messageId)

            if(msisdn) {
                /* ussd Logic */  
                smsLogic(msisdn, text, messageId, res);
              } else {
                logger.error('Incomplete query parameters received or phone number not whitelisted');
            }
    } catch(e){
        logger.error("error", e);
    }
}
}

