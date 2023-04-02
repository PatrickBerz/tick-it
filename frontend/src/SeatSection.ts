import { Seat } from "./Seat"; //Import Seat class

export class SeatSection {
    private section: string;
    private seats: Seat[];

    constructor(sectionNum: string, seats: Seat[]) {
        this.section = sectionNum;
        this.seats = seats;
    }

    getSectionNum() { return this.section; }

    getSeats() { return this.seats; }

    setDefaultPrice(price: number) {
        // Change the default price of every seat in the section
        for (let i = 0; i < this.seats.length; i++) {
            this.seats[i].setDefaultPrice(price);
        }
    }

    setIsSeasonSeating(seasonSeating: boolean) {
        // Change the seasonSeating status of every seat in the section
        for (let i = 0; i < this.seats.length; i++) {
            this.seats[i].setIsSeasonSection(seasonSeating);
        }
    }
}