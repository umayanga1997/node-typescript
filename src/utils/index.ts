import crypto from "crypto";

export const random = ()=> crypto.randomBytes(123).toString("base64");
export const authHash =(salt: string, passwrord: string)=>{
    return crypto.createHmac('shaa256', [salt, passwrord].join("/")).update(process.env.SECRET).digest("hex");
}