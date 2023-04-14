import * as fs from 'fs';

export class ConfNum {

    private static readonly filePath = "lastConfNum.txt"

    private static confirmationNum: number = this.getLastNum();
    private static readonly modulo = 2147483648
    private static readonly multiplier = 1103515245
    private static readonly increment = 12345


    private static getLastNum(): number {

        const data = fs.readFileSync(ConfNum.filePath, 'utf8');
        return +data
    }

    public static getNum(): number{
        let currentNum = ConfNum.confirmationNum;
        fs.writeFileSync(this.filePath, currentNum.toString())
        this.updateNum();
        return currentNum;
    }

    private static updateNum(){

        let nextNum = ((this.multiplier * this.confirmationNum + this.increment) % this.modulo)
        this.confirmationNum = nextNum
    }

}