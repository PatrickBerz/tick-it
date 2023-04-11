import { Venue } from "./Venue"; //Import Venue class
import { Performance } from "./Performance" //Import Performance class

export class Show {
    private showName: string;
    private venue: Venue;
    private performances: Performance[];

    //Used to construct a Show
    constructor(venue: Venue, showName: string) {
        this.venue = venue;
        this.showName = showName;
        this.performances = [];
    }
    
    //Return the name of the show
    getShowName() {return this.showName}

    //Return the venue of the show
    getVenue() { return this.venue}

    //Return the collection of performances in the show
    getPerformances() {return this.performances}

    //Change the collection of performances in the show
    setPerformances(performances: Performance[]) { this.performances = performances};

    //Add a new performance to the collection of performances
    addPerformance(newPerf: Performance) { this.performances.push(newPerf) }
}