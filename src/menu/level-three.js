import axios from 'axios';
import { WELCOME_MENU_INVALID, metaValue17, metaValueTwo } from './constants';
import { setRedis, parseData } from '../utils/redis-services'; 
import { sendToGateway } from '../utils/ussd-services';
import client from '../config/redis-config';


const LevelThreeMenu = (baseURL, username, password, msisdn, smsc, shortcode, smsBoxUrl, text, keyword, id, network, res) => {
    if (text){
        client.get(msisdn, async (err, result) => {
            if(err){
                console.log('redis err', err);
            } else {
                const ansExist = await parseData(result);
                let a = ansExist.session.option;
                var email;
                var bl;
                switch(a){
                    case 'RR':
                        email = text;
                        bl = ansExist.session.bl;
                            const url1 = `https://billing.grimaldi-nigeria.com:1449/api/USSD/RefundRequest`;
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
                            
                            sendToGateway(baseURL, username, password, shortcode, smsc, msisdn, ans, metaValue17, keyword, id, smsBoxUrl, network, res);
                            } else {
const ans= "not found!";
    
                            sendToGateway(baseURL, username, password, shortcode, smsc, msisdn, ans, metaValue17, keyword, id, smsBoxUrl, network, res);
                            }
                            });
                        /** send SMS Notification */
                        client.DEL(msisdn); 
                        break;
                        case 'WR':
                            email = text;
                            bl = ansExist.session.bl;
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
                                sendToGateway(baseURL, username, password, shortcode, smsc, msisdn, ans, metaValue17, keyword, id, smsBoxUrl, network, res);
                                } else {
const ans= "not found!";
                                sendToGateway(baseURL, username, password, shortcode, smsc, msisdn, ans, metaValue17, keyword, id, smsBoxUrl, network, res);
                                }
                                });
                            
                            client.DEL(msisdn);
                              /** send SMS Notification */
                              break;
                }
            }
          });
    } else {
        const raw = { menu: '1', session: {msisdn: msisdn}}
        setRedis(msisdn, 360, raw);
        sendToGateway(baseURL, username, password, shortcode, smsc, msisdn, WELCOME_MENU_INVALID, metaValueTwo, keyword, id, smsBoxUrl, network, res);
    }
}

export default LevelThreeMenu;
