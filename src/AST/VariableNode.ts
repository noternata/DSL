import ExpressionNode from "./ExpressionNode";
import Token from "../Token";


export default class VariableNode extends ExpressionNode {
    variable: Token; //поле значения токенов переменных


    constructor(variable: Token) {
        super();
        this.variable = variable; //принимает токены
    }
}
