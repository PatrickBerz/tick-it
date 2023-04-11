import { Ticket } from "./Ticket"; //Import Ticket class
import { Purchase } from "./Purchase"; //Import Purchase class

/*export class ExchangeHandler {
    //Exchange the tickets by making a new purchase
    exchange(ogPurchase: Purchase, newTickets: Ticket[], onlineExchange: boolean) {
        //Mark the current tickets as Unsold so they are available
        //ogPurchase.returnTickets();

        //Generate new purchase with the same Attendee as original
        //let newPurchase = new Purchase(ogPurchase.getPurchaser(), newTickets);

        //if (onlineExchange) { this.refundOnline(ogPurchase, newPurchase); }

        //return newPurchase; //Return to system to go to check-out
    }

    //A user has opted for an exchange online with a card
    refundOnline(ogPurchase: Purchase, newPurchase : Purchase) {
        let oldPrice = ogPurchase.calcTotalPrice();
        let newPrice = newPurchase.calcTotalPrice();
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
}*/