import express from 'express';
import Ussd from "../controller/ussd-send";
const ussdRoute = express.Router();

ussdRoute.get('/proxy', Ussd.ussdSendLogic);

export default ussdRoute;
