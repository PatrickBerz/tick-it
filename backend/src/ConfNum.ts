import * as fs from 'fs';

export class ConfNum {

    private static confirmationNum: number = this.getLastNum();

    private static getLastNum(): number {

        const data = fs.readFileSync("lastConfNum.txt", 'utf8');
        return +data
    }

    public static generateNum(): number{

        //console.log(ConfNum.confirmationNum)
        return ConfNum.confirmationNum++;
    }

}