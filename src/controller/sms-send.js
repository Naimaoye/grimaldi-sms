//import qs from 'qs';
import { extractKeyword } from '../utils/sms-services';
import { logger } from '../config/loggerConfig';
import {smsLogic} from './sms-logic';
import { whiteList, baseURL } from '../menu/constants';



export default class Sms {

    static async smsSendLogic(req, res) {
    try {
            const parseUrl = req.query;
            console.log('query string', parseUrl);
            const keywordValue = await extractKeyword(parseUrl);
            const { msisdn } = parseUrl;
            const { keyword } = parseUrl['keyword']
            const email = keyword.split(' ')[2];
            const bl = keyword.split(' ')[1];
            if(msisdn && whiteList.includes(msisdn)) {
                /* ussd Logic */  
                smsLogic(baseURL, msisdn, email, bl, keywordValue);
              } else {
                logger.error('Incomplete query parameters received or phone number not whitelisted');
            }
    } catch(e){
        logger.error("error", e);
    }
}
}

