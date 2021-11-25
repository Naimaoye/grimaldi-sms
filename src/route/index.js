import express from 'express';
import Sms from "../controller/sms-send";

const smsRoute = express.Router();

smsRoute.post('/grimaldi-sms', Sms.smsSendLogic);

export default smsRoute;
