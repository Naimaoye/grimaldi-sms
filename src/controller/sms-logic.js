import ETARotationNum from '../menu/eta';
import RefundRequest from '../menu/refund-request';
import WaiverRequest from '../menu/waiver-request';
import SearchParkingSlot from '../menu/search-parking-slot';
import WelcomeMessage from '../menu/welcome';
import { WELCOME_MESSAGE_INVALID } from '../menu/constants';
import { sendToUser } from '../utils/sms-services';

export const smsLogic = async (baseURL, msisdn, email, bl, keywordValue, keyword) => {
switch(keywordValue) {
    case 'HELP':
        WelcomeMessage(baseURL, msisdn);
        break;
    case 'ETA':
        ETARotationNum(baseURL, msisdn, bl)
        break;
    case 'Refunds':
        RefundRequest(baseURL, msisdn, email, bl)
        break;
    case 'Waiver':
        WaiverRequest(baseURL, msisdn, email, bl)
        break;
    case 'Parking':
        SearchParkingSlot(baseURL, msisdn, bl)
        break;
    default:
        sendToUser(baseURL, msisdn, WELCOME_MESSAGE_INVALID);
            
 } 
}
