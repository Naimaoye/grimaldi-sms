import axios from 'axios';
import { sendToUser } from '../utils/sms-services';
import { WELCOME_MESSAGE_INVALID } from './constants';


const RefundRequest = async (baseURL, msisdn, email, bl) => {
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
            console.log(response);
        if(response.data.success == 'true'){
            const message =  response.data["message"];
const ans =`
${message}
You will receive a feedback shortly.
`;
        
            sendToUser(baseURL, msisdn, ans);
        } else {
const ans= "not found!";

            sendToUser(baseURL, msisdn, ans);
        }
        });
    } else {
        sendToUser(baseURL, msisdn, WELCOME_MESSAGE_INVALID);
    }
}

export default RefundRequest;
