import * as fs from 'fs';

export class ConfNum {

    //Last confirmation number is stored to a file so that it carries over from session to session.
    private static readonly filePath = __dirname + "/" + "lastConfNum.txt"
    private static confirmationNum: number = this.getLastNum();

    //Arbitrary variables used to generate new confirmation numbers.
    private static readonly modulo = 2147483648
    private static readonly multiplier = 1103515245
    private static readonly increment = 12345

    //Gets the last confirmation number generated.
    private static getLastNum(): number {
        const data = fs.readFileSync(ConfNum.filePath);
        return +data
    }

    //Gets a new confirmation number.
    public static getNum(): number{       
        this.updateNum();
        fs.writeFileSync(this.filePath, ConfNum.confirmationNum.toString())
        return ConfNum.confirmationNum;
    }

    //Creates a new confirmation number, using the given arbitrary parameters in addition to the previous confirmation number.
    private static updateNum(){
        let nextNum = ((this.multiplier * this.confirmationNum + this.increment) % this.modulo)
        this.confirmationNum = nextNum
    }
}