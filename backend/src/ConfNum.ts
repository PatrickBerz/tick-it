import * as fs from 'fs';

export class ConfNum {

    private static readonly filePath = __dirname + "/" + "lastConfNum.txt"

    private static confirmationNum: number = this.getLastNum();
    private static readonly modulo = 2147483648
    private static readonly multiplier = 1103515245
    private static readonly increment = 12345


    private static getLastNum(): number {

        const data = fs.readFileSync(ConfNum.filePath);
        return +data
    }

    public static getNum(): number{
        
        this.updateNum();
        fs.writeFileSync(this.filePath, ConfNum.confirmationNum.toString())
        return ConfNum.confirmationNum;
    }

    private static updateNum(){

        let nextNum = ((this.multiplier * this.confirmationNum + this.increment) % this.modulo)
        this.confirmationNum = nextNum
    }
}