import ETARotationNum from '../menu/eta';
import RefundRequest from '../menu/refund-request';
import WaiverRequest from '../menu/waiver-request';
import SearchParkingSlot from '../menu/search-parking-slot';
import WelcomeMessage from '../menu/welcome';
import { WELCOME_MESSAGE_INVALID } from '../menu/constants';
import { sendToUser, extractKeyword } from '../utils/sms-services';

export const smsLogic = async (baseURL, msisdn, text, messageId) => {
    const email = text.split(' ')[2];
    const bl = text.split(' ')[1];
    const keywordValue = extractKeyword(text)
switch(keywordValue) {
    case 'HELP':
        WelcomeMessage(baseURL, msisdn, messageId);
        break;
    case 'ETA':
        ETARotationNum(baseURL, msisdn, bl, messageId)
        break;
    case 'Refunds':
        RefundRequest(baseURL, msisdn, email, bl, messageId)
        break;
    case 'Waiver':
        WaiverRequest(baseURL, msisdn, email, bl, messageId)
        break;
    case 'Parking':
        SearchParkingSlot(baseURL, msisdn, bl, messageId)
        break;
    default:
        sendToUser(baseURL, msisdn, WELCOME_MESSAGE_INVALID, messageId);
            
 } 
}
