import axios from 'axios';
import { sendToUser } from '../utils/sms-services';
import { WELCOME_MESSAGE_INVALID } from './constants';

const WaiverRequest = async (baseURL, msisdn, email, bl, messageId) => {
    if(email && bl){
         const url = `https://billing.grimaldi-nigeria.com:1449/api/USSD/WaiverRequest`;
                            await axios.post(url, {
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
                                sendToUser(baseURL, msisdn, ans, messageId);
                            } else {
const ans= "not found!";
                                sendToUser(baseURL, msisdn, ans, messageId);
                            }
                            });
                } else {
                    sendToUser(baseURL, msisdn, WELCOME_MESSAGE_INVALID, messageId);
                }         
}

export default WaiverRequest;
