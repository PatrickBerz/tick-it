export class Seat {
    private section: string;
    private row: string;
    private seatNum: number;
    private acessible: boolean;
    private inSeasonSection: boolean;
    private defaultPrice: number;

    constructor(section:string, row:string, seatNum:number, acessible:boolean, inSeasonSection:boolean, defaultPrice:number) {
        this.section = section;
        this.row = row;
        this.seatNum = seatNum;
        this.acessible = acessible;
        this.inSeasonSection = inSeasonSection;
        this.defaultPrice = defaultPrice;
    }

    getSection() { return this.section; }

    getRow() { return this.row; }

    getSeatNum() { return this.seatNum; }

    getAcessible() { return this.acessible; }

    getInSeasonSection() { return this.inSeasonSection; }

    getDefaultPrice() { return this.defaultPrice; }

    setDefaultPrice(price: number) { this.defaultPrice = price; }

    setIsSeasonSection(isSeasonSection: boolean) { this.inSeasonSection = isSeasonSection; }
}