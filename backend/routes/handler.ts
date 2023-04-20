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

//handle post request to add a season ticket holder
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

router.post("/holderUpdate", (req: any, res: any) => {

    let data = req.body.passUpdate
    let checkSeat = new Seat(data.section, data.row, data.seatNum, false, false, 1)


    let seasonList = System.getSeasonTicketHolders()
    //console.log(JSON.stringify(seasonList))

    seasonList.forEach(holder => {
        if (holder.getSeatAssignment().equals(checkSeat)) {
            holder.setName(data.name)
            holder.setAddress(data.address)
            holder.setPhoneNum(data.phoneNum)
        }
    });
    
    System.serializeSeasonHolders()
})

//handle post request to update default price of a section of a venue
router.post("/newDefault", (req: any, res: any) => {

    console.log("Got a new default")
    
    let data = req.body.newPrice
    console.log(JSON.stringify(req.body))

    let venue: Venue;
    if(data.venueName === "Concert Hall") {
        venue = System.getVenues()[0]
    }
    else {
        venue = System.getVenues()[1]
    }
    //venue = System.getVenues()[0]
    let sectionList = venue.getSections()
    sectionList.forEach((section) => {

        if (section.getSectionNum() === data.section) {
            section.setDefaultPrice(data.sectionPrice)
            //console.log("Set new default price of: " + data.sectionPrice + " for: " + data.section)
            res.status(200)
            res.end()
        }
    })
    res.status(500)
    res.end()
})

// handle get request for venue section default prices
router.get("/venueDefaults", (req:any, res:any) => {

    let venueList = System.getVenues()
    let venueDefaults: any[] = []

    let concertHall: {[k: string]: any} = {}
    venueList[0].getSections().forEach ((section) => {
        concertHall[section.getSectionNum()] = section.getSeats()[0].getDefaultPrice()
    })

    let playHouse: {[k: string]: any} = {}
    venueList[1].getSections().forEach((section) => {
        playHouse[section.getSectionNum()] = section.getSeats()[0].getDefaultPrice()
        console.log(section.getSeats()[0].getDefaultPrice())
    });

    venueDefaults.push(concertHall)
    venueDefaults.push(playHouse)
    res.json(venueDefaults)
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

router.get("/phSections", (req:any, res:any) => {

    let venueList = System.getVenues()

    let playHouse: {[k: string]: any} = {}
    venueList[1].getSections().forEach((section) => {
        playHouse[section.getSectionNum()] = section.getSeats()[0].getDefaultPrice()
        //console.log(section.getSeats()[0].getDefaultPrice())
    });
    //console.log(JSON.stringify(playHouse))
    res.json(playHouse)
})

router.get("/chSections", (req:any, res:any) => {

    let venueList = System.getVenues()

    let concertHall: {[k: string]: any} = {}
    venueList[0].getSections().forEach((section) => {
        concertHall[section.getSectionNum()] = section.getSeats()[0].getDefaultPrice()
        //console.log(section.getSeats()[0].getDefaultPrice())
    });
    //console.log(JSON.stringify(concertHall))
    res.json(concertHall)
})

router.post("/newShow", (req: any, res: any) => {
    let data = req.body;

    console.log("Incoming data: " + JSON.stringify(data))
    console.log("Incoming Perf name: " + data.newShow.performance.performanceName)
    let venue:Venue;
    let newPerf = data.newShow.performance

    console.log(data.newShow.performance.venueName)
    if(data.newShow.performance.venueName === "Concert Hall") {
        venue = System.getVenues()[0]
        console.log("CONCERT HALL")
    }
    else {
        venue = System.getVenues()[1]
        console.log("PLAYHOUSE")
    }

    let createdPerf = System.createPerformance(newPerf.performanceName, newPerf.venueName, new Date(newPerf.dateTime), venue)
    let tickets = createdPerf.getTickets()
    tickets.forEach(ticket => {
        Object.keys(data.newShow.performance.sections).map ((section) => {
            if(ticket.getSeat().getSection() === section){
                ticket.setPrice(data.newShow.performance.sections[section])
                //console.log("SET PRICE")
            }
        })
        
    });

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

    //let jsonhandler = new JSONHandler()
    
    //jsonhandler.deserializePurchase('../test6.json')
    //jsonhandler.deserializePurchase(__dirname + "/../samplePurchases.json")

    //let purchases: any[] = jsonhandler.getData() 
    //console.log(purchases)
    //console.log("\n\n")
    // //const ticket = '[{"purchaser":{"name":"Susan","address":"123 Sesame Street","phoneNum":"6064135244"},"confNum":0,"tickets":[{"performance":"West Side Story","seat":{"section":"Orchestra","row":"B","seatNum":12,"acessible":false,"inSeasonSection":false,"defaultPrice":29.99},"ticketStatus":0,"price":29.99}]}]'
    let purchases = System.getPurchases()
    res.json(purchases);
});

router.post("/newPurchase", (req: any, res: any) => {
    //need venue name, show name, dateTime, ticket list, attendee info, ticketStatus (paid, picked up, or not)
    let data = req.body.newPurchase
    console.log("NEW PURCHASE BEING MADE")
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

    //console.log(JSON.stringify(perfToFind.getPerformanceName()))

    let perf = System.findPerformance(perfToFind)
    //console.log(JSON.stringify(perf))
    let newTickets: Ticket[] = [];

    // data.ticketList.forEach((purchTicket : any) => {
    //     let ticketSeat = new Seat(data.section, data.row, data.seatNum, false, false, 0);
    //     let testTicket : Ticket = new Ticket(data.showName, ticketSeat);

    //     if(perf) {
    //         perf.getTickets().forEach(perfTicket => {
    //             if (testTicket.getSeat().equals(perfTicket.getSeat())) {
    //                     newTickets.push(perfTicket);
    //                 }
    //         });
    //     }
    // })

    data.tickets.forEach((purchTicket : any) => {
        let ticketSeat = new Seat(purchTicket.section, purchTicket.row, purchTicket.seatNum, false, false, 0);
        console.log(JSON.stringify(ticketSeat))
        let testTicket : Ticket = new Ticket(data.showName, ticketSeat);

        if(perf) {
            perf.getTickets().forEach(perfTicket => {
                if (testTicket.getSeat().equals(perfTicket.getSeat())) {
                        newTickets.push(perfTicket);
                        console.log("PUSHED TICKET")
                    }
            });
        }
    })
    
    console.log("Before create purchase")
    //console.log(JSON.stringify(newTickets))
    console.log(data.ticketStatus)

    let maybeDupe = System.createPurchase(attendee, newTickets, new Date(data.dateTime), data.ticketStatus);

    if (!maybeDupe) {
        console.log("DUPLICATE CONF NUM!!!!!!!!!!!!!!!!!!!!!")
        res.status(500)
        res.end()
    }
    console.log("After create purchase")
    //console.log(JSON.stringify(System.getPurchases()))

});

router.post("/calculatePrice", (req: any, res: any) => {
    let data = req.body.sendData
    let perfToFind = new Performance(data.showName, data.venueName, data.dateTime, System.getVenues()[0])

    let perf = System.findPerformance(perfToFind)
    let soldTickets: Ticket[] = [];

    console.log("Recieved Section: ", data.ticketList.parsedSeats);

    //for (let i=0; i<state.seats.length; i++){
    //data.ticketList.forEach((purchTicket : any) => {
    for (let i=0; i<data.ticketList.parsedSeats.length; i++){
        console.log("Recieved Section: ", data.ticketList.parsedSeats[i].section);
        console.log("Recieved Row: ", data.ticketList.parsedSeats[i].row);
        console.log("Recieved SeatNum: ", data.ticketList.parsedSeats[i].seatNum);

        let ticketSeat = new Seat(data.ticketList.parsedSeats[i].section, data.ticketList.parsedSeats[i].row, +data.ticketList.parsedSeats[i].seatNum, false, false, 0);
        let testTicket : Ticket = new Ticket(data.showName, ticketSeat);

        if(perf) {
            console.log("VALID PERF")
            perf.getTickets().forEach(perfTicket => {
                if (testTicket.getSeat().equals(perfTicket.getSeat())) {
                        soldTickets.push(perfTicket);
                        console.log("FOUND THE TICKET");
                }
            });
        }
        else {
            console.log("NO PERF")
        }
    }

    //Calculate total price
    let totalPrice = 0.0;
    for (var index in soldTickets) {
        totalPrice += soldTickets[index].getPrice();
    }

    if (data.discounts == "None") {
        res.status(200);
        res.json(totalPrice);
    } else if (data.discounts == "Senior") {
        totalPrice = totalPrice * .7;
        res.status(200);
        res.json(totalPrice);
    } else if (data.discounts == "Military") {
        totalPrice = totalPrice * .65;
        res.status(200);
        res.json(totalPrice);
    } else if (data.discounts == "First Responders") {
        totalPrice = totalPrice * .6;
        res.status(200);
        res.json(totalPrice);
    } else {
        console.log("Could not calculate discount!");
        res.status(500);
        res.end();
    }
});

router.post("/statusUpdate", (req: any, res: any) => {

    let data = req.body
    console.log(data)

    let purchase = System.findPurchase(+data.confNum)
    console.log(JSON.stringify(purchase))
    if(purchase) {
        switch(+data.status) {
            case 1: {
                purchase.reservedTickets()
                break;
            }
            case 2: {
                purchase.payTickets()
                break;
            }
            case 3: {
                purchase.pickUpTickets()
                console.log("Picked up")
                break;
            }
            default: {
                console.log("Broken")
            }
        }
    }
    else {
        console.log("No purchase")
    }
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

    let foundPurchase = System.findPurchase(confNum)
    if (foundPurchase) {
        res.status(200);
        res.json(foundPurchase)
        console.log(foundPurchase)
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
        console.log("here are the sold tickets: ", foundTickets);
        res.status(200);
        res.json(foundTickets);
    } else {
        res.status(500);
        res.end();
    }
});

export default router;
