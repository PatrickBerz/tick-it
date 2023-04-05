import { Venue } from "./Venue"; //Import Venue class
import { Performance } from "./Performance" //Import Performance class

export class Show {

    private showName: string;
    private venue: Venue;
    private performances: Performance[];

    constructor(venue: Venue, showName: string) {
        this.venue = venue;
        this.showName = showName;
        this.performances = [];
    }
    
    getShowName() {return this.showName}

    getVenue() { return this.venue}

    getPerformances() {return this.performances}

    setPerformances(performances: Performance[]) { this.performances = performances};

    addPerformance(newPerf: Performance) { this.performances.push(newPerf) }
}