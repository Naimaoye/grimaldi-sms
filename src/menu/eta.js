import axios from 'axios';
import { sendToUser } from '../utils/sms-services';
import { WELCOME_MESSAGE_INVALID } from './constants';

const ETARotationNum = async (msisdn, bl, messageId, res) => {
try{
if(bl){
    const url = `https://billing.grimaldi-nigeria.com:1449/api/USSD/ETARotationNo?bl=${bl}`;
        await axios.get(url, {
            auth: {
                "username": "UserUssd",
                "password": "paswUssd"
            }
        }).then(response =>{
            if(response.data.success == 'true'){
                if(response.data["data"]["berthing"] !== "" && response.data["data"]["rotationNo"] !== ""){
                        const berthing = response.data["data"]["berthing"];
                        const rotationNo = response.data["data"]["rotationNo"];
const ETAValue =`
Rotation Number: ${rotationNo}
Expected Berthing Date: ${berthing}
`;
                            sendToUser(msisdn, ETAValue, messageId, res);
                                } else {
                                    const notFound = "values not found";
                                    sendToUser(msisdn, notFound, messageId, res);
                                }
                        } else {
                            const err = "unable to fetch, please try again later";
                            sendToUser(msisdn, err, messageId, res);
                        }  
                        })
                    } else {
                        sendToUser(msisdn, WELCOME_MESSAGE_INVALID, messageId, res);
                    }
                } catch(e){
                    console.log('err', e)
const ans= "unable to process request, please try again";

    sendToUser(msisdn, ans, messageId, res);
                }            
}

export default ETARotationNum;
