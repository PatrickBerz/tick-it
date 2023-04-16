import { Purchase } from "./Purchase";
import { Attendee } from "./Attendee";
import { ConfNum } from "./ConfNum";
import { Ticket } from "./Ticket";
import { Performance } from "./Performance";
import { JSONHandler } from "../JSONHandler";
import { Seat } from "./Seat";
import { SeatSection } from "./SeatSection";
import { Venue } from "./Venue";
import { System } from "./System";

export class Test {
    constructor() {
        //Ben's purchase conf num test code
        let purchases = Array<Purchase>(5)
        for (let i = 0; i < 5; i++){
            purchases[i] = new Purchase(new Attendee("name", "addr", "phone"))
            //purchases[i].setConfNum(ConfNum.getNum());
        }

        purchases.forEach(element => {
            console.log(element.getConfNum())
        });
    }

   // have a performance with a list of tickets, make a purchase with those tickets and mark them as sold in performance, see what changes
    testPurchaseTickets() {
        //Jayde's test to see relationship between performance tickets and purchase tickets
        //New performance with a list of tickets
        //BUILD SEATS TO BUILD TICKETS
        let sys: JSONHandler = new JSONHandler();
        sys.deserializeSeat("test3.json");
        let seats: Seat[] = sys.getData();
        let tickets: Ticket[] = [];
        for (let i = 0; i < seats.length; i++) {
            let newTicket = new Ticket("West Side Story", seats[i]);
            tickets.push(newTicket);
        }

        //BUILD PERFORMANCE
        let SeatSections: SeatSection[] = []
        let testPerf = new Performance("West Side Story", "Concert Hall", new Date(), new Venue(SeatSections));
        testPerf.setTickets(tickets);

        //BUILD PURCHASE
        let testPur = new Purchase(new Attendee("Jane Doe", "jdoe@email.com", "1234567890"));
        //let's buy the two orchestra seats in the performance
        let boughtTickets: Ticket[] = [];
        boughtTickets.push(testPerf.getTickets()[0]);
        boughtTickets.push(testPerf.getTickets()[1]);
        testPur.updateTickets(boughtTickets);
        testPur.payTickets();

        // //Now let's see what the data says:
        // console.log("\nPERFORMANCE TICKETS STATUS: ");
        // for (var index in testPerf.getTickets()) {
        //     console.log("TICKET " + index + " : " + testPerf.getTickets()[index].getTicketStatus());
        // }
        // console.log("\nPURCHASE TICKETS STATUS: ");
        // for (var index in testPur.getTickets()) {
        //     console.log("TICKET " + index + " : " + testPur.getTickets()[index].getTicketStatus());
        // }

        /*console.log("SERIALIZING. . .");
        let Perfs: Performance[] = [];
        Perfs.push(testPerf);
        let Purs: Purchase[] = [];
        Purs.push(testPur);
        sys.serialize(Perfs, "testPerf.json");
        sys.serialize(Purs, "testPur.json");

        console.log("NOW DESERIALIZING. . .");
        sys.deserializePerformance("testPerf.json");
        let deserialPerf : Performance = sys.getData()[0];
        sys.deserializePurchase("testPur.json");
        let deserialPur : Purchase = sys.getData()[0];

        //Edit the tickets in the purchase
        deserialPur.pickUpTickets();*/

        //delete purchase to see if it deletes in performance
        //delete testPerf.getTickets[0];

        //Now let's see what the data says:
        console.log("\nPERFORMANCE TICKETS STATUS: ");
        for (var index in testPerf.getTickets()) {
            console.log("TICKET " + index + " : " + testPerf.getTickets()[index].getTicketStatus());
        }
        console.log("\nPURCHASE TICKETS STATUS: ");
        for (var index in testPur.getTickets()) {
            console.log("TICKET " + index + " : " + testPur.getTickets()[index].getTicketStatus());
        }   
    }

    testDeletePerformance() {
        let testDelete : Performance = new Performance("West Side Story", "Playhouse", 
                    new Date("2023-04-05T04:36:35.456Z"), System.getVenues()[0]);
        //let testDelete: Performance = System.getShows()[0].getPerformances()[0];
        console.log(System.getShows()[0].getPerformances());
        System.removePerformance(testDelete);
        console.log("\n AFTER DELETION: \n")
        console.log(System.getShows()[0].getPerformances()[0]);
    }
    
}

let sys:Test = new Test();
sys.testDeletePerformance();