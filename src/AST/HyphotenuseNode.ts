import ExpressionNode from "./ExpressionNode";
import Token from "../Token";

//для встроенной функции расчета гипотенузы
//далее можно будет так же использовать для других встроенных функций
export default class HyphotenuseNode extends ExpressionNode {
    operator: Token; //сам токен оператора
    leftNode: ExpressionNode; //левый операнд мб перем или число
    rightNode: ExpressionNode; //правый операнд


    constructor(operator: Token, leftNode: ExpressionNode, rightNode: ExpressionNode) {
        super();
        this.operator = operator;
        this.leftNode = leftNode;
        this.rightNode = rightNode;
    }
}