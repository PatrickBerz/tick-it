export class Seat {
    private section: string;
    private row: string;
    private seatNum: number;
    private acessible: boolean;
    private inSeasonSection: boolean;
    private defaultPrice: number;

    //Used to construct a new Seat
    constructor(section:string, row:string, seatNum:number, acessible:boolean, inSeasonSection:boolean, defaultPrice:number) {
        this.section = section;
        this.row = row;
        this.seatNum = seatNum;
        this.acessible = acessible;
        this.inSeasonSection = inSeasonSection;
        this.defaultPrice = defaultPrice;
    }

    //Return the seat's section
    getSection() { return this.section; }

    //Return the seat's row
    getRow() { return this.row; }

    //Return the seat's number
    getSeatNum() { return this.seatNum; }

    //Return if the seat is accessible or not
    getAcessible() { return this.acessible; }

    //Return if the seat is in the season section or not
    getInSeasonSection() { return this.inSeasonSection; }

    //Return the default price of the seat
    getDefaultPrice() { return this.defaultPrice; }

    //Change the price of the seat
    setDefaultPrice(price: number) { this.defaultPrice = price; }

    //Change if it is in a season section or not
    setIsSeasonSection(isSeasonSection: boolean) { this.inSeasonSection = isSeasonSection; }
}