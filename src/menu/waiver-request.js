import axios from 'axios';
import { sendToUser } from '../utils/sms-services';
import { WELCOME_MESSAGE_INVALID } from './constants';

const WaiverRequest = async (msisdn, email, bl, messageId, res) => {
try{
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

export default WaiverRequest;
