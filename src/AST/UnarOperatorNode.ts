import Token from "../Token";
import ExpressionNode from "./ExpressionNode";

//для унарных операторов(1операнд) вывод в консоль
export default class UnarOperationNode {
    operator: Token; //сам токен
    operand: ExpressionNode; //операнд


    constructor(operator: Token, operand: ExpressionNode) {
        this.operator = operator;
        this.operand = operand;
    }
}
