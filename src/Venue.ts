import { SeatSection } from "./SeatSection"; //Import SeatSection class

export class Venue {
    private seatSections: SeatSection[];

    constructor(seatSections: SeatSection[]) {
        this.seatSections = seatSections;
    }

    getSections() { return this.seatSections; }
}