import Token from "../Token";

export default class NumberNode {
    number: Token; //поля для токена чисел


    constructor(number: Token) {
        this.number = number; //принимает токены
    }
}
