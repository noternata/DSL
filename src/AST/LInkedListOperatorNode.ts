import ExpressionNode from "./ExpressionNode";
import Token from "../Token";

//для бинарных операторов(2операнда) + - =
export default class LInkedListOperatorNode extends ExpressionNode {
    operator: Token; //сам токен оператора
    leftNode: Token; //левый операнд мб перем или число
    rightNode: ExpressionNode; //правый операнд


    constructor(operator: Token, leftNode: Token, rightNode: ExpressionNode) {
        super();
        this.operator = operator;
        this.leftNode = leftNode;
        this.rightNode = rightNode;
    }
}