import { NextApiRequest, NextApiResponse } from "next";

export default function NowTime(req : NextApiRequest, res : NextApiResponse){
    
    let today = new Date();
    
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);

    var dateString = year + '-' + month  + '-' + day;

    return res.status(200).json(dateString);
}