import axios from 'axios';
import { sendToUser } from '../utils/sms-services';
import { WELCOME_MESSAGE_INVALID } from './constants';


const RefundRequest = async (msisdn, email, bl, messageId, res) => {
try{
    const url1 = `https://billing.grimaldi-nigeria.com:1449/api/USSD/RefundRequest`;
    if(email && bl){
        await axios.post(url1, {
                "bl": bl,
                "mail": email,
                "tel": '002341115874'
        }, {
            auth: {
            "username": "UserUssd",
            "password": "paswUssd"
            }
        }).then(response =>{
            console.log('here',response);
        if(response.data.success == 'true'){
            const message =  response.data["message"];
const ans =`
${message}
You will receive a feedback shortly.
`;
        
            sendToUser(msisdn, ans, messageId, res);
        } else {
const ans= "not found!";

            sendToUser(msisdn, ans, messageId, res);
        }
        });
    } else {
        sendToUser(msisdn, WELCOME_MESSAGE_INVALID, messageId, res);
    }

} catch(e){
    console.log('err', e)
const ans= "unable to process request, please try again";

    sendToUser(msisdn, ans, messageId, res);
}
}
export default RefundRequest;
