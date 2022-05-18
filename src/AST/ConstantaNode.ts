import Token from "../Token";
import ExpressionNode from "./ExpressionNode";

//для унарных операторов(1операнд) вывод в консоль
export default class ConstantaNode extends ExpressionNode{
    operator: Token; //сам токен оператора
    leftNode: Token; //левый операнд мб перем или число
    //dataNode: Token; //?????
    rightNode: ExpressionNode ; //правый операнд


    constructor(operator: Token, leftNode: Token/*,dataNode: Token */, rightNode: ExpressionNode) {
        super();
        this.operator = operator;
        this.leftNode = leftNode;
        //this.dataNode = dataNode;
        this.rightNode = rightNode;
    }
}