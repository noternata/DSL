import ExpressionNode from "./ExpressionNode";
import Token from "../Token";

//для бинарных операторов(2операнда) + - =
export default class BinOperationNode extends ExpressionNode {
    operator: Token; //сам токен оператора
    leftNode: ExpressionNode; //левый операнд мб перем или числ
    rightNode: ExpressionNode; //правый операнд


    constructor(operator: Token, leftNode: ExpressionNode, rightNode: ExpressionNode) {
        super();
        this.operator = operator;
        this.leftNode = leftNode;
        this.rightNode = rightNode;
    }
}

