import { Newsletter } from "./nesletter.model";

const createNewsletter = async(email:string)=>{
 const result = await Newsletter.create({email});
 return result;
}


const getAllNewsletter = async()=>{
    const result = await Newsletter.find();
    return result;
}

export const NewsletterServices = {
    createNewsletter,
    getAllNewsletter
}