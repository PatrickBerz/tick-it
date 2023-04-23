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

router.use(cors({
    origin: '*'
}));

// handle frontend GET request for list of all season ticket holders
router.get("/seasonTickets", (req: any, res: any) => {
    //get list of season ticket holders from System
    //let seasonTixList: SeasonTicketHolder[] = [ new SeasonTicketHolder("Richard Blargson", "5000 Fancy Boulevard", "123-555-5555", new Seat("Orchestra", "A", 15, false, true, 99999.99)),
                                                //new SeasonTicketHolder("Moneyton Blargson", "5001 Fancy Boulevard", "123-555-5556", new Seat("Orchestra", "A", 16, false, true, 99999.99))] 
    let seasonTixList: SeasonTicketHolder[] = System.getSeasonTicketHolders();
    res.json(seasonTixList)
})

// handle POST request to add a season ticket holder
router.post("/newSeasonTicket", (req: any, res: any) => {

    let data = req.body

    // create objects for the season holder and add them to the list in System
    let seat = new Seat(data.section, data.row, data.seatNum, data.accessible, true, data.defaultPrice)
    System.createSeasonHolder(data.name, data.address, data.phoneNum, seat);
})

// handle POST request to update a season ticket holder's information
router.post("/holderUpdate", (req: any, res: any) => {

    let data = req.body.passUpdate
    let checkSeat = new Seat(data.section, data.row, data.seatNum, false, false, 1)

    // get the list of existing season ticket holders
    let seasonList = System.getSeasonTicketHolders()
    //console.log(JSON.stringify(seasonList))

    // Loop through list, find holder to change, and update their info
    seasonList.forEach(holder => {
        if (holder.getSeatAssignment().equals(checkSeat)) {
            holder.setName(data.name)
            holder.setAddress(data.address)
            holder.setPhoneNum(data.phoneNum)
        }
    });
    
    // Re-serialize the list to its JSON file
    System.serializeSeasonHolders()
})

//handle POST request to update default price of a section of a venue
router.post("/newDefault", (req: any, res: any) => {

    // console.log("Got a new default")
    
    let data = req.body.newPrice
    // console.log(JSON.stringify(req.body))

    // Get the appropriate venue object to change
    let venue: Venue;
    if(data.venueName === "Concert Hall") {
        venue = System.getVenues()[0]
    }
    else {
        venue = System.getVenues()[1]
    }

    // get the list of all seat sections in the venue
    let sectionList = venue.getSections()
    sectionList.forEach((section) => {

        // Find the matching section and set all of its default prices
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

// handle GET request for venue section default prices
router.get("/venueDefaults", (req:any, res:any) => {

    let venueList = System.getVenues()
    let venueDefaults: any[] = []

    // get all Concert Hall section default prices and add them to the concertHall object
    let concertHall: {[k: string]: any} = {}
    venueList[0].getSections().forEach ((section) => {
        concertHall[section.getSectionNum()] = section.getSeats()[0].getDefaultPrice()
    })

    // get all Playhouse section default prices and add them to the playHouse object
    let playHouse: {[k: string]: any} = {}
    venueList[1].getSections().forEach((section) => {
        playHouse[section.getSectionNum()] = section.getSeats()[0].getDefaultPrice()
        console.log(section.getSeats()[0].getDefaultPrice())
    });

    // push both venue lists to an array and return it to the frontend
    venueDefaults.push(concertHall)
    venueDefaults.push(playHouse)
    res.json(venueDefaults)
})

// handle GET request for list of all existing performances
router.get("/showData", (req: any, res: any) => {

    // get the list of shows
    let showList = System.getShows()
    //console.log("Shows: " + JSON.stringify(showList))
    let performanceList: Performance[] = []
    
    // loop through each show and append all its performances to the list
    showList.forEach(show => {
        performanceList = performanceList.concat(show.getPerformances())
    }); 
    //console.log("Performance data: " + JSON.stringify(performanceList))
    res.json(performanceList)

})

// handle GET request for all playhouse sections and their default prices
router.get("/phSections", (req:any, res:any) => {

    let venueList = System.getVenues()

    // loop through all playhouse sections and add their names and default prices to a list
    let playHouse: {[k: string]: any} = {}
    venueList[1].getSections().forEach((section) => {
        playHouse[section.getSectionNum()] = section.getSeats()[0].getDefaultPrice()
        //console.log(section.getSeats()[0].getDefaultPrice())
    });
    //console.log(JSON.stringify(playHouse))
    res.json(playHouse)
})

// handle GET request for all concert hall sections and their default prices
router.get("/chSections", (req:any, res:any) => {

    let venueList = System.getVenues()

    // loop through all concert hall sections and add their names and default prices to a list
    let concertHall: {[k: string]: any} = {}
    venueList[0].getSections().forEach((section) => {
        concertHall[section.getSectionNum()] = section.getSeats()[0].getDefaultPrice()
        //console.log(section.getSeats()[0].getDefaultPrice())
    });
    //console.log(JSON.stringify(concertHall))
    res.json(concertHall)
})

// handle POST request to add a new performance
router.post("/newShow", (req: any, res: any) => {
    let data = req.body;

    //console.log("Incoming data: " + JSON.stringify(data))
    //console.log("Incoming Perf name: " + data.newShow.performance.performanceName)
    let venue:Venue;
    let newPerf = data.newShow.performance

    //console.log(data.newShow.performance.venueName)

    // get the proper venue object based on passed in data
    if(data.newShow.performance.venueName === "Concert Hall") {
        venue = System.getVenues()[0]
        //console.log("CONCERT HALL")
    }
    else {
        venue = System.getVenues()[1]
        //console.log("PLAYHOUSE")
    }

    // create a performance and update its section default prices
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

// handle POST request to delete a performance
router.post("/deleteShow", (req: any, res: any) => {

    let data = req.body

    console.log("Incoming data: " + JSON.stringify(data))
    console.log("Incoming Perf name: " + data.showDelete.performance.performanceName)
    let venue:Venue;
    let newPerf = data.showDelete.performance
    
    // get first venue object to allow call to find performance
    // not necessarily the actual venue for the perf, since the function doesn't actually compare with it
    venue = System.getVenues()[0]

    let perfToDelete = System.findPerformance(new Performance(newPerf.performanceName, newPerf.venueName, new Date(newPerf.dateTime), venue))
    if (perfToDelete != null) {
        System.removePerformance(perfToDelete)
        //console.log("REMOVING PERFORMANCE")
        res.status(200)
        res.end()
    }
    else {
        //console.log("DIDN'T FIND IT")
        res.status(500)
        res.end()
    }
});

// handle POST request to exchange existing tickets for new ones
router.post("/exchange", (req: any, res: any) => {

    let data = req.body

    let newTickets: Ticket[] = [];
    
    let oldConfNum = data.oldConfNum
    let oldPurchase = System.findPurchase(oldConfNum)

    // check if the purchase actually exists
    if (oldPurchase) {

        let oldShow = System.findPerformance(new Performance(oldPurchase.getTickets()[0].getPerformance(), "", oldPurchase.getDate(), System.getVenues()[0]))

        if (oldShow) {
            //exchange the tickets and set HTTP status code appropriately
            let exchanger = new ExchangeHandler()
            let newPurchase = exchanger.exchange(oldShow, oldPurchase, newTickets, data.isOnline, data.ticketStatus, data.isOnline)
            if (newPurchase) {
                res.status(200)
                res.end()
            }
            else {
                res.status(500)
                res.end()
            }
        }
        else {
            res.status(500)
            res.end()
        }
    }
    else {
        res.status(500)
        res.end()
    }
})


// handle GET request for list of all existing purchases
router.get("/purchaseData", (req: any, res: any) => {
    let purchases = System.getPurchases()
    res.json(purchases);
});

// handle POST request to add a new purchase
router.post("/newPurchase", (req: any, res: any) => {
    //need venue name, show name, dateTime, ticket list, attendee info, ticketStatus (paid, picked up, or not)
    let data = req.body.newPurchase
    //console.log("NEW PURCHASE BEING MADE")

    let attendeeData = data.attendee
    let attendee = new Attendee(attendeeData.name, attendeeData.address, attendeeData.phoneNum)
    let perfToFind = new Performance(data.showName, data.venueName, data.dateTime, System.getVenues()[0])

    //console.log(JSON.stringify(perfToFind.getPerformanceName()))

    let perf = System.findPerformance(perfToFind)
    //console.log(JSON.stringify(perf))
    let newTickets: Ticket[] = [];

    // loop through all ticket locations in the purchase request and find the corresponding tickets in the performance
    data.tickets.forEach((purchTicket : any) => {
        let ticketSeat = new Seat(purchTicket.section, purchTicket.row, purchTicket.seatNum, false, false, 0);
        // console.log(JSON.stringify(ticketSeat))
        let testTicket : Ticket = new Ticket(data.showName, ticketSeat);

        if(perf) {
            // loop through all performance tickets and add requested tickets to the new purchase
            perf.getTickets().forEach(perfTicket => {
                if (testTicket.getSeat().equals(perfTicket.getSeat())) {
                    newTickets.push(perfTicket);
                    //console.log("PUSHED TICKET")
                }
            });
        }
    })
    
    //console.log("Before create purchase")
    //console.log(JSON.stringify(newTickets))
    //console.log(data.ticketStatus)

    // call System function to create a new purchase
    let maybeDupe = System.createPurchase(attendee, newTickets, new Date(data.dateTime), data.ticketStatus);

    // if maybeDupe object doesn't exist, the System function didn't add a purchase as it was a duplicate
    if (!maybeDupe) {
        //console.log("DUPLICATE CONF NUM!!!!!!!!!!!!!!!!!!!!!")
        res.status(500)
        res.end()
    }
    res.status(200)
    res.end()
    //console.log("After create purchase")
    //console.log(JSON.stringify(System.getPurchases()))

});

//handle POST request to calculate the total price of a purchase
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

router.post("/calculateSeasonPrice", (req:any, res:any) => {

    let data = req.body

    let venue:Venue;
    if(data.newShow.performance.venueName === "Concert Hall") {
        venue = System.getVenues()[0]
        //console.log("CONCERT HALL")
    }
    else {
        venue = System.getVenues()[1]
        //console.log("PLAYHOUSE")
    }

    venue.getSections().forEach( section => {
        section.getSeats().forEach( seat => {
            if (seat.getInSeasonSection()){
                let totalPrice = seat.getDefaultPrice()
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
                return
            }
        })
    })
});

export default router;
