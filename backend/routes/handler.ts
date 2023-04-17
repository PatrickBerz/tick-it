import express from "express"
const router = express.Router()
import bodyParser from "body-parser"
import cors from "cors"
import { JSONHandler } from "../JSONHandler"; 
import { Seat } from "../src/Seat";
import { SeasonTicketHolder } from "../src/SeasonTicketHolder";
import { Venue } from "../src/Venue";
import { SeatSection } from "../src/SeatSection";
import { Purchase } from "../src/Purchase";
import { Attendee } from "../src/Attendee";
import { ConfNum } from "../src/ConfNum"
import { Ticket } from "../src/Ticket";
import { Performance } from "../src/Performance";
import { System } from "../src/System";

//FUNCTIONS NEEDED:
//
// Lookup purchase by confNum
// Basically, add everything to lists
// Get list of season ticket holders
// Post new season ticket holder
// Post default prices for venue
// Post an exchange
// Post file path for importing
// Post 0/1 for export csv vs json


router.use(cors({
    origin: '*'
}));

router.get("/seasonTickets", (req: any, res: any) => {
    //get list of season ticket holders from System
    //let seasonTixList: SeasonTicketHolder[] = [ new SeasonTicketHolder("Richard Blargson", "5000 Fancy Boulevard", "123-555-5555", new Seat("Orchestra", "A", 15, false, true, 99999.99)),
                                                //new SeasonTicketHolder("Moneyton Blargson", "5001 Fancy Boulevard", "123-555-5556", new Seat("Orchestra", "A", 16, false, true, 99999.99))] 
    let seasonTixList: SeasonTicketHolder[] = System.getSeasonTicketHolders();
    res.json(seasonTixList)
})

router.post("/newSeasonTicket", (req: any, res: any) => {

    //take in and parse new season ticket holder
    //call System function to add new holder to the list
    //call Sys function to mark the tickets sold in the performance
    //set return status to 201 if success
    //otherwise, set to 500
    let data = req.body
    let seat = new Seat(data.section, data.row, data.seatNum, data.accessible, true, data.defaultPrice)
    System.createSeasonHolder(data.name, data.address, data.phoneNum, seat);
    //let newHolder: SeasonTicketHolder = new SeasonTicketHolder(data.name, data.address, data.phoneNum, seat)
    //system.addSeasonHolder(newHolder)
})

router.post("/newDefaults", (req: any, res: any) => {

    // parse defaults. Need venue name and assoc. array of section name to new default price
    // {
    //     "venueName": "Playhouse",
    //     "sections": [
    //                  "Section1": 23.99,
    //                  "Section2": 33.99,
    //                  "Section3": 23.99
    //                  ]
    // }
    let data = req.body

    //call Sys class to get old venue of same name
    //Replace declaration with Sys function call
    //let venue:Venue = new Venue();

    // let sectionList = venue.getSections()
    // data.sections.forEach(sectionName => {
    //     sectionList.forEach((section) => {
    //         if (section.getSectionNum() == sectionName) {
    //             section.setDefaultPrice(data.sections[sectionName])
    //         }
    //     });
    // });

    //no need to call Sys function since returned venue should be a reference to the one in the list
    //definitely worth testing that to make sure
    
})

router.get("/showData", (req: any, res: any) => {

    //const system = System.getInstance();
    let showList = System.getShows()
    //console.log("Shows: " + JSON.stringify(showList))
    let performanceList: Performance[] = []
    showList.forEach(show => {
        performanceList = performanceList.concat(show.getPerformances())
    }); 
    //console.log("Performance data: " + JSON.stringify(performanceList))
    res.json(performanceList)

})

router.post("/newShow", (req: any, res: any) => {
    let data = req.body;

    console.log("Incoming data: " + JSON.stringify(data))
    console.log("Incoming Perf name: " + data.newShow.performance.performanceName)
    let venue:Venue;
    let newPerf = data.newShow.performance
    // if(data.venueName === "Concert Hall") {
    //     venue = System.getVenues[0]
    // }
    // else {
    //     venue = System.getVenues[1]
    // }
    venue = System.getVenues()[0]

    System.createPerformance(newPerf.performanceName, newPerf.venueName, new Date(newPerf.dateTime), venue)
    res.status(200)
    res.end()
});

router.post("/deleteShow", (req: any, res: any) => {

    let data = req.body

    console.log("Incoming data: " + JSON.stringify(data))
    console.log("Incoming Perf name: " + data.showDelete.performance.performanceName)
    let venue:Venue;
    let newPerf = data.showDelete.performance
    
    // if(data.venueName === "Concert Hall") {
    //     venue = System.getVenues[0]
    
    // }
    // else {
    //     venue = System.getVenues[1]
    // }
    venue = System.getVenues()[0]
    //let perfToDelete = new Performance(newPerf.performanceName, newPerf.venueName, new Date(newPerf.dateTime), venue)
    //let perfToDelete = System.findPerformance(newPerf.performanceName, new Date(newPerf.dateTime))
    let perfToDelete = System.findPerformance(new Performance(newPerf.performanceName, newPerf.venueName, new Date(newPerf.dateTime), venue))
    if (perfToDelete != null) {
        System.removePerformance(perfToDelete)
        console.log("REMOVING PERFORMANCE")
    }
    else {
        console.log("DIDN'T FIND IT")
    }
});

router.post("/exchange", (req: any, res: any) => {
    //need old conf num (already verified hopefully), new showName, new venue, new DateTime, new tickets

    //Sys call to get purchase by confNum
    //Sys call to get performance by venueName, showName, dateTime

    //create new purchase
    //pass new purchase to Sys
})



router.get("/purchaseData", (req: any, res: any) => {
    // TODO: need System function to get list of purchases

    let jsonhandler = new JSONHandler()
    
    //jsonhandler.deserializePurchase('../test6.json')
    jsonhandler.deserializePurchase(__dirname + "/../samplePurchases.json")

    let purchases: any[] = jsonhandler.getData() 
    //console.log(purchases)
    //console.log("\n\n")
    // //const ticket = '[{"purchaser":{"name":"Susan","address":"123 Sesame Street","phoneNum":"6064135244"},"confNum":0,"tickets":[{"performance":"West Side Story","seat":{"section":"Orchestra","row":"B","seatNum":12,"acessible":false,"inSeasonSection":false,"defaultPrice":29.99},"ticketStatus":0,"price":29.99}]}]'
    res.json(purchases);
});

router.post("/newPurchase", (req: any, res: any) => {
    //need venue name, show name, dateTime, ticket list, attendee info, ticketStatus (paid, picked up, or not)
    let data = req.body
    // {
    //     "venueName": "Playhouse",
    //     "showName": "Oklahoma",
    //     "dateTime": "2023-04-15T04:33:10+0000"
    //     "ticketList": [
    //                     {
    //                         "sectionName": "Orchestra",
    //                         "row": "B",
    //                         "seatNum": "12",
    //                     }
    //                    ],
    //     "attendee": {
    //                     "name": "Ben",
    //                     "address": "123 address blvd",
    //                     "phoneNum": "123-444-1234"
    //                 }
    //     "ticketStatus": 1
    // }

    let attendeeData = data.attendee
    let attendee = new Attendee(attendeeData.name, attendeeData.address, attendeeData.phoneNum)
    let perfToFind = new Performance(data.showName, data.venueName, data.dateTime, System.getVenues()[0])

    let perf = System.findPerformance(perfToFind)
    let newTickets: Ticket[] = [];

    data.ticketList.forEach(purchTicket => {
        if(perf) {
            perf.getTickets().forEach(perfTicket => {
                if (purchTicket.getSeat().equals(perfTicket.getSeat())) {

                        newTickets.push(perfTicket)
                    }
            });
        }
    })
    
    System.createPurchase(attendee, newTickets, new Date(data.dateTime), data.ticketStatus)

})

router.post("/password", (req: any, res: any) => {
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000/password');
    let password = req.body.value;
    console.log(password);
    if (password == 'admin') {
        res.status(200);
    }
    else{
        res.status(401);
    }
    res.end();
});

router.post("/confNum", (req: any, res: any) => {
    let confNum = req.body.value;
    console.log(confNum);
    if (confNum == 12345) {
        res.status(200);
    }
    else {
        res.status(404);
    }
    res.end();
});

router.post("/currentPerformance", (req: any, res: any) => {
    let data = req.body.currentPerformance.performance;
    let currentPerf : Performance = new Performance(data.performanceName, data.venueName, new Date(data.dateTime), System.getVenues()[0]);
    let perf = System.findPerformance(currentPerf);
    if (perf != null) {
        let foundSoldSeats = perf.findSoldSeats();
        res.status(200);
        res.json(foundSoldSeats);
    } else {
        res.status(500);
        res.end();
    }
});

router.post("/currentTickets", (req: any, res: any) => {
    let data = req.body.currentPerformance.performance;
    let currentPerf : Performance = new Performance(data.performanceName, data.venueName, new Date(data.dateTime), System.getVenues()[0]);
    let perf = System.findPerformance(currentPerf);
    if (perf != null) {
        let foundTickets = perf.getTickets();
        console.log("oh boy! I worked!");
        console.log("here are the sold seats: ", foundTickets);
        res.status(200);
        res.json(foundTickets);
    } else {
        res.status(500);
        res.end();
    }
});

export default router;
