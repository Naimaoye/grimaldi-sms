import LevelOneMenu from '../menu/level-one';
import LevelZeroMenu from '../menu/level-zero';
import LevelTwoMenu from '../menu/level-two';
import LevelThreeMenu from '../menu/level-three';
import { metaValue17 } from '../menu/constants';
import { parseData } from '../utils/redis-services'; 
import client from '../config/redis-config';
import { sendToGateway } from '../utils/ussd-services';

export const ussdLogic = async (baseURL, metaValue, username, password, msisdn, smsc, shortcode, smsBoxUrl, text, keyword, id, network, res) => {

switch(metaValue) {
    case '01':
        LevelZeroMenu(baseURL, username, password, msisdn, smsc, shortcode, smsBoxUrl, keyword, id, network, res);       
        break;
    case '12':
        client.get(msisdn, async (err, result) => {
            if(err){
                console.log('redis err', err);
            } else {
                const ansExist = await parseData(result);
                let a = ansExist.menu;
                switch (a) {
                case '1':
                    LevelOneMenu(baseURL, username, password, msisdn, smsc, shortcode, smsBoxUrl, text, keyword, id, network, res);
                    break;
                case '2': 
                    LevelTwoMenu(baseURL, username, password, msisdn, smsc, shortcode, smsBoxUrl, text, keyword, id, network, res);
                    break;
                case '3':
                    LevelThreeMenu(baseURL, username, password, msisdn, smsc, shortcode, smsBoxUrl, text, keyword, id, network, res);
                    break;

                }
            }
        });
        break;
        case  '21':
        case  '13':
        const empty = "";
        sendToGateway(baseURL, username, password, shortcode, smsc, msisdn, empty, metaValue17, keyword, id, smsBoxUrl, network, res);
        break;
 } 
}
