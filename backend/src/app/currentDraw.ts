//----- Imports -------
import { Router, Request, Response, Application } from 'express';
import axios from "axios";
import current_draw from "./current_draw.json"
import fs from "fs";
import { ObjectId } from 'mongodb';




//----- Declaing Const/Var ----
const newDrawPrice = 1
const newDrawName = "Pi-Ball"
const newDrawDescription = "des"

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

    var returnData = {
        "_id": null,
        "is_current_draw": false,
        "name":"error",
        "start_date": null,
        "end_date": null,
        "price": null,
        "entries": null,
        "prize_pool": null
      }
    var currentDraw = await currentDrawCollection.findOne({"is_current_draw": true});

    console.log("Get Current Draw from is_current_draw")
    console.log(currentDraw)

    if (currentDraw && currentDraw.is_current_draw === true) {
        // Your code here for the case where currentDraw.is_current_draw is true
        if (currentDraw && currentDate < new Date(currentDraw.end_date.getTime() + 20 * 60 * 1000)) { 
            // The Current Draw is valid
            console.log("We have the Current Draw, Updating file");
            await writeDataToFile("./src/app/current_draw.json", currentDraw)

            returnData = currentDraw
        } else {
            console.error("We have the WRONG Current Draw (current draw is outdated)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }
      } else {
        // Your code here for the case where currentDraw.is_current_draw is false or currentDraw is null
        console.error("We dont have the current draw!!!!!!!!!!!!!!!!!!!");
      }
    
    return returnData

}

// ------ Function to Create New Draw -----
export async function createNewDraw(currentDrawCollection: any) {
    const nextSunday = 7 - new Date().getDay();
    const targetDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + nextSunday, 18, 0, 0);
    console.log("Next Closing time: ", targetDate);

    const newDraw =  await currentDrawCollection.insertOne({ 
        is_current_draw: true,
        name: newDrawName,
        description: newDrawDescription,
        start_date: new Date(),
        end_date: targetDate,
        price: newDrawPrice,
        entries: 0,
        prize_pool: 0
    });
    console.log(newDraw);
    updateCurrentDrawLocal(currentDrawCollection)

    return newDraw
}



// ---- API call for frontend to get Current Draw Data
export async function mountCurrentDraw(router: Router) {
    router.get('/get', async (req, res) => {
        const app = req.app;
        const currentDrawCollection = app.locals.currentDrawCollection;

        const currentDrawData = await updateCurrentDrawLocal(currentDrawCollection)
        if (currentDrawData.is_current_draw == false) {
            return(res.status(404))
        } else {
            res.status(200).json(currentDrawData)
        }
    })
}
