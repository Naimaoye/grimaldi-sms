import { Values_Array, BOL_STRING, SEARCH_PARKING_SLOT, WELCOME_MENU_INVALID, metaValueTwo } from './constants';
    
import { sendToGateway } from '../utils/ussd-services';
import { setRedis } from '../utils/redis-services';


const LevelOneMenu = (baseURL, username, password, msisdn, smsc, shortcode, smsBoxUrl, text, keyword, id, network, res) => {
    var valueIndex;
    var option;
    var raw;
    switch(text){
    case '1':
    case '2':
    case '3':
        valueIndex = parseInt(text) - 1;
        option = Values_Array[valueIndex];
        raw = { menu: '2', session: {msisdn: msisdn, option: option } };
        sendToGateway(baseURL, username, password, shortcode, smsc, msisdn, BOL_STRING, metaValueTwo, keyword, id, smsBoxUrl, network, res);
        //setRedis(msisdn, 360, raw);
        break;
    case '4':
        valueIndex = parseInt(text) - 1;
        option = Values_Array[valueIndex];
        raw = { menu: '2', session: {msisdn: msisdn, option: option} };
        sendToGateway(baseURL, username, password, shortcode, smsc, msisdn, SEARCH_PARKING_SLOT, metaValueTwo, keyword, id, smsBoxUrl, network, res);
        setRedis(msisdn, 360, raw);
        break;

    default:
         raw = { menu: '1', session: {msisdn: msisdn}}
         setRedis(msisdn, 360, raw);
         sendToGateway(baseURL, username, password, shortcode, smsc, msisdn, WELCOME_MENU_INVALID, metaValueTwo, keyword, id, smsBoxUrl, network, res);
    }
  
}

export default LevelOneMenu;
