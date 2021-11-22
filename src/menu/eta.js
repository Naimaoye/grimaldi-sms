import axios from 'axios';
import { sendToUser } from '../utils/sms-services';


const ETARotationNum = async (baseURL, msisdn, bl) => {
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
                            sendToUser(baseURL, msisdn, ETAValue);
                                } else {
                                    const notFound = "values not found";
                                    sendToGateway(baseURL, msisdn, notFound);
                                }
                        } else {
                            const err = "unable to fetch, please try again later";
                            sendToGateway(baseURL, msisdn, err);
                        }  
                        })
                   
}

export default ETARotationNum;
