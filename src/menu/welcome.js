import { WELCOME_MESSAGE } from './constants';
import { sendToUser } from '../utils/sms-services';
// import { setRedis } from '../utils/redis-services';


const WelcomeMessage = (url, msisdn, messageId) => {
     sendToUser(url, msisdn, WELCOME_MESSAGE, messageId);
}

export default WelcomeMessage;
