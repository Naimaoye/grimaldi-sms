import client from '../config/redis-config';

const stringifyData = (data) => {
    return JSON.stringify(data);
};

export const parseData = (data) => {
    return JSON.parse(data);
};

export const getRedis = (msisdn) => {
  client.get(msisdn, async (err, result) => {
      if(err){
          console.log('redis err', err);
      } else {
        return parseData(result);
      }
    });
};


export const setRedis = (msisdn, exp, data) => {
   client.setex(msisdn, exp, stringifyData(data));
}
