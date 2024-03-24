//----- Imports -------
import { Router, Request, Response, Application } from 'express';
import axios from "axios";
import current_draw from "./current_draw.json"
import fs from "fs";
import { ObjectId } from 'mongodb';




//----- Declaing Const/Var ----
const newDrawPrice = 1

//Function to Update json files
const writeDataToFile = async (file: string, data: any): Promise<void> => {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      await fs.promises.writeFile(file, jsonData);
      console.log("Data written to the file successfully.");
    } catch (error) {
      console.error(error);
    }
  };


// ---- Function to check &/or Update current_draw.json ----
export async function updateCurrentDrawLocal(currentDrawCollection: any) {
    const currentDate = new Date();
    const currentDatePlusTwentyMinutes = new Date(currentDate.getTime() + 20 * 60 * 1000);

    var currentDraw = await currentDrawCollection.findOne({"is_current_draw": true});

    console.log("Get Current Draw from is_current_draw")
    console.log(currentDraw)

    if (currentDraw && currentDraw.is_current_draw === true) {
        // Your code here for the case where currentDraw.is_current_draw is true
        if (currentDraw && currentDraw.end_date < currentDatePlusTwentyMinutes) { 
            // The Current Draw is valid
            console.log("We have the Current Draw, Updating file");
            await writeDataToFile("./src/app/current_draw.json", currentDraw)
        } else {
            console.error("We have the WRONG Current Draw (current draw is outdated)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }
      } else {
        // Your code here for the case where currentDraw.is_current_draw is false or currentDraw is null
        console.error("We dont have the current draw!!!!!!!!!!!!!!!!!!!");
      }

}

// ------ Function to Create New Draw -----
export async function createNewDraw(currentDrawCollection: any) {
    const nextSunday = 7 - new Date().getDay();
    const targetDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + nextSunday, 18, 0, 0);
    console.log("Next Closing time: ", targetDate);

    const newDraw =  await currentDrawCollection.insertOne({ 
        is_current_draw: true,
        start_date: new Date(),
        end_date: targetDate,
        price: newDrawPrice,
        entries: 0,
        prize_pool: 0
    });

    console.log(newDraw);

    return newDraw
}



// ---- API call for frontend to get Current Draw Data
export async function getCurrentDraw(router: Router) {
    await updateCurrentDrawLocal
}