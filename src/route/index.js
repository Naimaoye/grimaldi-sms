import express from 'express';
import Sms from "../controller/sms-send";

const smsRoute = express.Router();

smsRoute.get('/proxy', Sms.smsSendLogic);

export default smsRoute;
