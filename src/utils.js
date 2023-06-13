import {fileURLToPath} from 'url';
import { dirname } from 'path';
import mongoose from 'mongoose';
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const PORT = 8080;
export async function connectToMongo(){
    const authSource = 'messages-chat';
    try{
        await mongoose.connect(`mongodb+srv://aquinonahuel:Picard1715-c@cluster0.dfk9gdc.mongodb.net/ecommerce`);

    }catch(e){
        console.log(e);
        throw Error('Cannot connect to MongoDB');
    }
};

export function generateUniqueID() {
    return Math.random().toString(30).substring(2);
}
