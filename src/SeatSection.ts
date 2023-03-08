import { Seat } from "./Seat"; //Import Seat class

export class SeatSection {
    private sectionNum: number;
    private seats: Seat[];

    constructor(sectionNum: number, seats: Seat[]) {
        this.sectionNum = sectionNum;
        this.seats = seats;
    }

    getSectionNum() { return this.sectionNum; }

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