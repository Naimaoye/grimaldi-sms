//import qs from 'qs';
import { extractMetaData } from '../utils/ussd-services';
import { logger } from '../config/loggerConfig';
import {ussdLogic} from './ussd-logic';
import { username, password,  whiteList, baseURL } from '../menu/constants';



export default class Ussd {

    static async ussdSendLogic(req, res) {
    try {
            const parseUrl = req.query;
            console.log('query string', parseUrl);
            const metaValue = await extractMetaData(parseUrl);
            const { msisdn, smsc, shortcode, text, keyword, id, network } = parseUrl;
            const smsBoxUrl = parseUrl['smsbox-url'];
            if(metaValue && msisdn && smsc && shortcode && text && smsBoxUrl && keyword && whiteList.includes(msisdn)) {
                /* ussd Logic */  
                ussdLogic(baseURL, metaValue, username, password, msisdn, smsc, shortcode, smsBoxUrl, text, keyword, id, network, res);
              } else {
                logger.error('Incomplete query parameters received or phone number not whitelisted');
            }
    } catch(e){
        logger.error("error", e);
    }
}
}

