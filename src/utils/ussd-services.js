import axios from 'axios';
import { logger } from '../config/loggerConfig';

export const sendToGateway = async (baseURL, username, password, shortcode, smsc, msisdn, text, metaData, keyword, id, smsBoxURL, network, res) => {
   await axios.get(baseURL, {
        params: {
        'username': username,
        'id': id,
        'password': password,
        'from': shortcode,
        'shortcode': shortcode,
        'smsc': smsc,
        'to': msisdn,
        'msisdn': msisdn,
        'text': text,
        'keyword': keyword,
        'smsbox-url': smsBoxURL,
        'network': network,
        'meta-data': metaData
        }
    }).then((response) => {
        res.end();
        logger.debug('response from gateway', response);
    });

};

export const extractMetaData = (parseUrl) => {
    const meta = parseUrl['meta-data'];
    if(meta && parseUrl['meta-data'].includes('=%')){
        const metaValue = meta.split('=%')[1].split('&')[0];
        return metaValue;
    } else {
        console.log('Invalid query string!');
    }
}

/** Requests from those endpoints */

export const getETA = async (bl) => {
    const url = `https://billing.grimaldi-nigeria.com:1449/api/USSD/ETARotationNo?bl=${bl}`;
    await axios.get(url, {
        auth: {
            "username": "UserUssd",
            "password": "paswUssd"
        }
      }).then(response =>{
          console.log("response",response.data.success);
        if(response.success == 'true'){
            if(response["data"]["berthing"] !== "" && response["data"]["rotationNo"] !== ""){
                console.log('here, birthing RN')
            const berthing = response["data"]["berthing"];
            const rotationNo = response["data"]["rotationNo"];
          return `
          Rotation Number: ${rotationNo}
          Expecting Birthing Date: ${berthing}
          `;
            } else {
                return "values not found"
            }
      } else {
          return "something went wrong"
      }  
      })
     
};

export const makeRefundRequest = async (bl, email) => {
// add msisdn as a parameter
const msisdn = '002341115874';
const url = `https://billing.grimaldi-nigeria.com:1449/api/USSD/RefundRequest`;
const response = await axios.post(url, {
        "bl": bl,
        "mail": email,
        "tel": msisdn
}, {
    auth: {
        "username": "UserUssd",
        "password": "paswUssd"
    }
  });

if(response.success == true){
    const message =  response["message"]
    return `
    ${message}
    You will receive a feedback shortly.
    `;
} else {
    return "something went wrong"
}

};

export const makeWaiverRequest = async (bl, email) => {
// add msisdn as a parameter
const msisdn = '002341115874';

const url = `https://billing.grimaldi-nigeria.com:1449/api/USSD/WaiverRequest`;
const response = await axios.post(url, {
        "bl": bl,
        "mail": email,
        "tel": msisdn
}, {
    auth: {
      "username": "UserUssd",
      "password": "paswUssd"
    }
  });

  if(response.success == true){
    const message =  response["message"]
    return `
    ${message}
    You will receive a feedback shortly.
    `;
  } else {
      return "something went wrong"
  }

};

export const searchParkingLot = async (chassis) => {
    const url = `https://billing.grimaldi-nigeria.com:1449/api/USSD/SearchParkingSlot?chassis=${chassis}`;
   await axios.get(url, {
        auth: {
            "username": "UserUssd",
            "password": "paswUssd"
        }
      }).then(response =>{
        if(response.success == true){
            return response['data'].slot;
        } else {
            return 'something went wrong';
        }

      });
}
