import { Seat } from "./Seat"; //Import Seat class

export class SeatSection {
    private section: string;
    private seats: Seat[];

    //Used to construct a new Seat Section
    constructor(sectionNum: string, seats: Seat[]) {
        this.section = sectionNum;
        this.seats = seats;
    }

    //Return the section
    getSectionNum() { return this.section; }

    //Return the collection of seats in the section
    getSeats() { return this.seats; }

    //Change the default price for the entire section
    setDefaultPrice(price: number) {
        // Change the default price of every seat in the section
        for (let i = 0; i < this.seats.length; i++) {
            this.seats[i].setDefaultPrice(price);
        }
    }

    //Change the season seating status for the entire section
    setIsSeasonSeating(seasonSeating: boolean) {
        // Change the seasonSeating status of every seat in the section
        for (let i = 0; i < this.seats.length; i++) {
            this.seats[i].setIsSeasonSection(seasonSeating);
        }
    }
}