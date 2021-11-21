import redis from 'redis';
import { logger } from './loggerConfig';
const client = redis.createClient(6379);
client.on("connect", () => {
   // logger.info("connected to redis...");
 });

 client.on("ready", () => {
    // logger.error("connected to redis and ready to use");
 });

 client.on("error", (error) => {
    // logger.error("redis error", error.message);
 });

 client.on("end", () => {
    //console.error("client disconnected");
 });

 client.on("ready", () => {
    //console.error("connected to redis and ready to use");
 });

 export default client;
