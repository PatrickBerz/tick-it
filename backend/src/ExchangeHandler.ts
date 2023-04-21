import { Ticket, TicketStatus } from "./Ticket"; //Import Ticket class
import { Purchase } from "./Purchase"; //Import Purchase class
import { ConfNum } from "./ConfNum";
import { Performance } from "./Performance";
import { System } from "./System";

export class ExchangeHandler {
    //Exchange the tickets by making a new purchase
    exchange(oldPerf: Performance, ogPurchase: Purchase, newTickets: Ticket[], newDate: Date, ticketStatus: TicketStatus, onlineExchange: boolean) {
        //Mark the current tickets as Unsold so they are available
        ogPurchase.returnTickets();
        
        //Mark tickets in the old performance as Unsold so they are available
        let perfTickets = oldPerf.getTickets();
        let ogPurchaseTickets = ogPurchase.getTickets();
        for (var index1 in ogPurchaseTickets) {
            for (var index2 in perfTickets) {
                if (perfTickets[index2].getSeat().equals(ogPurchaseTickets[index1].getSeat())) {
                    perfTickets[index2].setTicketStatus(0);
                }
            }
        }
        
        //Generate new purchase with the same Attendee as original
        // let newPurchase = new Purchase(ogPurchase.getPurchaser());
        // newPurchase.updateTickets(newTickets);
        // newPurchase.setConfNum(ConfNum.getNum()); 
        let newPurchase = System.createPurchase(ogPurchase.getPurchaser(), newTickets, newDate, ticketStatus)

        if (onlineExchange && newPurchase) { this.refundOnline(ogPurchase, newPurchase); }

        return newPurchase; //Return to system to go to check-out
    }

    //A user has opted for an exchange online with a card
    refundOnline(ogPurchase: Purchase, newPurchase : Purchase) {
        let oldPrice: any = ogPurchase.calcTotalPrice();
        let newPrice: any = newPurchase.calcTotalPrice();
        let refund = 0.0;
        let ticketPrice = 0.0;

        //THIS ONLY WORKS FOR ONLINE PURCHASES
        //Exchange is the same amount
        if (oldPrice == newPrice) {
            // Set price of tickets of new purchase to 0
            for (var index in newPurchase.getTickets()) {
                newPurchase.getTickets()[index].setPrice(ticketPrice);
            }
        }

        //Buyer needs to pay more
        else if (newPrice > oldPrice) {
            // Set price of tickets of new purcase to the deficient
            refund = newPrice - oldPrice;
            ticketPrice = refund/(newPurchase.getTickets().length);
            for (var index in newPurchase.getTickets()) {
                newPurchase.getTickets()[index].setPrice(ticketPrice);
            }
        }

        //Buyer gets a "refund"
        else {
            // Set price of tickets of new purcase to the surplus
            refund = oldPrice - newPrice;
            ticketPrice = refund/(newPurchase.getTickets().length);
            for (var index in newPurchase.getTickets()) {
                newPurchase.getTickets()[index].setPrice(ticketPrice);
            }

        }
    }
}