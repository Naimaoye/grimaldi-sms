import { WELCOME_MENU, metaValueTwo } from './constants';
import { sendToGateway } from '../utils/ussd-services';
import { setRedis } from '../utils/redis-services';


const LevelZeroMenu = (baseURL, username, password, msisdn, smsc, shortcode, smsBoxUrl, keyword, id, network, res) => {
     sendToGateway(baseURL, username, password, shortcode, smsc, msisdn, WELCOME_MENU, metaValueTwo, keyword, id, smsBoxUrl, network, res);
     const data = { menu: '1', session: {msisdn: msisdn} };
     setRedis(msisdn, 360, data);
}

export default LevelZeroMenu;
