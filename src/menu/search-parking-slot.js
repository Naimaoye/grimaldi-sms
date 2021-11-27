import axios from 'axios';
import { sendToUser } from '../utils/sms-services';
import { WELCOME_MESSAGE_INVALID } from './constants';

const SearchParkingSlot = async (msisdn, bl, messageId, res) => {
    if(bl){
    const url1 = `https://billing.grimaldi-nigeria.com:1449/api/USSD/SearchParkingSlot?chassis=${bl}`;
                        await axios.get(url1, {
                                auth: {
                                    "username": "UserUssd",
                                    "password": "paswUssd"
                                }
                            }).then(response =>{
                                if(response.data.success == 'True'){
                                    const ans = response.data['data'].slot;
const newAns = `Your parking slot:
${ans}`;
                                    sendToUser(msisdn, newAns, messageId, res);
                                } else {
                                    const ans = 'parking slot not found!';
                                    sendToUser(msisdn, ans, messageId, res);
                                }
    
                            });
                        } else {
                            sendToUser(msisdn, WELCOME_MESSAGE_INVALID, messageId, res);
                        }
}

export default SearchParkingSlot;
