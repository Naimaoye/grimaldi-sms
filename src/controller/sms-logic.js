import ETARotationNum from '../menu/eta';
import RefundRequest from '../menu/refund-request';
import WaiverRequest from '../menu/waiver-request';
import SearchParkingSlot from '../menu/search-parking-slot';
import WelcomeMessage from '../menu/welcome';
import { WELCOME_MESSAGE_INVALID } from '../menu/constants';
import { sendToUser, extractKeyword } from '../utils/sms-services';

export const smsLogic = async (msisdn, text, messageId, res) => {
    const email = text.split(' ')[2];
    const bl = text.split(' ')[1];
    const keywordValue = extractKeyword(text)
switch(keywordValue) {
    case 'Help':
    case 'HELP':
        WelcomeMessage(msisdn, messageId, res);
        break;
    case 'ETA':
        ETARotationNum(msisdn, bl, messageId, res)
        break;
    case 'Refunds':
        RefundRequest(msisdn, email, bl, messageId, res)
        break;
    case 'Waiver':
        WaiverRequest(msisdn, email, bl, messageId, res)
        break;
    case 'Parking':
        SearchParkingSlot(msisdn, bl, messageId, res)
        break;
    default:
        sendToUser(msisdn, WELCOME_MESSAGE_INVALID, messageId, res);
            
 } 
}
