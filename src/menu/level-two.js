import axios from 'axios';
import { WELCOME_MENU_INVALID, EMAIL_STRING, metaValue17, metaValueTwo } from './constants';
import { setRedis, parseData } from '../utils/redis-services'; 
import client from '../config/redis-config';
import { sendToGateway } from '../utils/ussd-services';


const LevelTwoMenu = async (baseURL, username, password, msisdn, smsc, shortcode, smsBoxUrl, text, keyword, id, network, res) => {
    if (text){
        client.get(msisdn, async (err, result) => {
            if(err){
                console.log('redis err', err);
            } else {
                const ansExist = await parseData(result);
                let a = ansExist.session.option;
                var bl;
                var option;
                var raw;
                switch(a){
                    case 'ETA':
                        const url = `https://billing.grimaldi-nigeria.com:1449/api/USSD/ETARotationNo?bl=${text}`;
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
                                    sendToGateway(baseURL, username, password, shortcode, smsc, msisdn, ETAValue, metaValue17, keyword, id, smsBoxUrl,network, res);
                                } else {
                                    const notFound = "values not found";
                                    sendToGateway(baseURL,username, password, shortcode, smsc, msisdn, notFound, metaValue17, keyword, id, smsBoxUrl, network, res);
                                }
                        } else {
                            const err = "something went wrong";
                            sendToGateway(baseURL, username, password, shortcode, smsc, msisdn, err, metaValue17, keyword, id, smsBoxUrl, network, res);
                        }  
                        })
                    client.DEL(msisdn);
                    /** send SMS Notification */
                        break;
                    case 'RR':
                        bl = text;
                        option = ansExist.session.option;
                        raw = { menu: '3', session: {msisdn: msisdn, option: option, bl: bl } };
                        sendToGateway(baseURL, username, password, shortcode, smsc, msisdn, EMAIL_STRING, metaValueTwo, keyword, id, smsBoxUrl, network, res);
                        setRedis(msisdn, 360, raw);
                        break;
                    case 'WR':
                        bl = text;
                        option = ansExist.session.option
                        raw = { menu: '3', session: {msisdn: msisdn, option: option, bl: bl } };
                        sendToGateway(baseURL, username, password, shortcode, smsc, msisdn, EMAIL_STRING, metaValueTwo, keyword, id, smsBoxUrl, network, res);
                        setRedis(msisdn, 360, raw);
                        break;
                    case 'SPS':
                        const url1 = `https://billing.grimaldi-nigeria.com:1449/api/USSD/SearchParkingSlot?chassis=${text}`;
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
                                    sendToGateway(baseURL, username, password, shortcode, smsc, msisdn, newAns, metaValue17, keyword, id, smsBoxUrl, network, res);
                                } else {
                                    const ans = 'parking slot not found!';
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

export default LevelTwoMenu;
