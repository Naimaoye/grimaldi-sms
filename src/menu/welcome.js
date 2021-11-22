import { WELCOME_MESSAGE } from './constants';
import { sendToUser } from '../utils/sms-services';
// import { setRedis } from '../utils/redis-services';


const WelcomeMessage = (url, msisdn) => {
     sendToUser(url, msisdn, WELCOME_MESSAGE);
}

export default WelcomeMessage;
