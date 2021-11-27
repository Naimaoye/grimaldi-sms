import { WELCOME_MESSAGE } from './constants';
import { sendToUser } from '../utils/sms-services';
// import { setRedis } from '../utils/redis-services';


const WelcomeMessage = (msisdn, messageId, res) => {
     sendToUser(msisdn, WELCOME_MESSAGE, messageId, res);
}

export default WelcomeMessage;
