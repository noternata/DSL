import ExpressionNode from "./ExpressionNode";
import Token from "../Token";


export default class TextNode {
    text: Token; //поле значения токенов переменных


    constructor(text: Token ) {
        //super();
        this.text = text; //принимает токены
    }
}