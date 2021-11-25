import express from 'express';
import Sms from "../controller/sms-send";

const smsRoute = express.Router();

smsRoute.get('/grimaldi-sms', Sms.smsSendLogic);

export default smsRoute;
