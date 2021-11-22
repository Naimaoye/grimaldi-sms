import axios from 'axios';
import { sendToUser } from '../utils/sms-services';
import { WELCOME_MESSAGE_INVALID } from './constants';

const SearchParkingSlot = async (baseURL, msisdn, bl) => {
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
                                    sendToUser(baseURL, msisdn, newAns);
                                } else {
                                    const ans = 'parking slot not found!';
                                    sendToUser(baseURL, msisdn, ans);
                                }
    
                            });
                        } else {
                            sendToUser(baseURL, msisdn, WELCOME_MESSAGE_INVALID);
                        }
}

export default SearchParkingSlot;