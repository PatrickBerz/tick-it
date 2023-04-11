import { SeatSection } from "./SeatSection"; //Import SeatSection class

export class Venue {
    private seatSections: SeatSection[];

    //Construct a new Venue
    constructor(seatSections: SeatSection[]) {
        this.seatSections = seatSections;
    }

    //Return the collection of seat sections in the Venue
    getSections() { return this.seatSections; }
}