import ExpressionNode from "./ExpressionNode";
import Token from "../Token";

//для каждого элемента linkedlist, каждый элемент списка является узлом
export default class LinkedListNode <D> {
    //operator: Token; //сам токен оператора
    prevNode: LinkedListNode<D> | null= null; //левый операнд мб перем или число
    nextNode: LinkedListNode<D> | null= null; //правый операнд


    constructor(/*operator: Token, */prevNode: LinkedListNode<D> | null= null, nextNode: LinkedListNode<D> | null= null, public data: D) {
        //super();
        //this.operator = operator; //?
        this.prevNode = prevNode;
        this.nextNode = nextNode;
    }
}