import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from "colors";
import components from "./data/components.js";
import Component from './models/componentModel.js';
import connectDB from './config/db.js';

dotenv.config();

//connect ot the database
connectDB();


const importData = async () => {
    try {
        await Component.deleteMany();

        const sampleComponents = components.map((component)=>{
            return { ...component};
        });

        const createdComponents = await Component.insertMany(sampleComponents);

        console.log("Data imported".green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Component.deleteMany();
        
        console.log('Data deleted successfully !!!'.red.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

if(process.argv[2]==='-d'){
    destroyData();
}
else {
    importData();
}