import ExpressionNode from "./AST/ExpressionNode";
import NumberNode from "./AST/NumberNode";
import UnarOperationNode from "./AST/UnarOperatorNode";
import {tokenTypesList} from "./TokenType";
import BinOperationNode from "./AST/BinOperationNode";
import VariableNode from "./AST/VariableNode";
import StatemenNode from "./AST/StatemenNode";
import HyphotenuseNode from "./AST/HyphotenuseNode";
import TextNode from "./AST/TextNode";
import ConstantaNode from "./AST/ConstantaNode";
import LinkedList from "./LL/LinkedList";


export default class Interpreter{
    scope: any = {}; //объект в котором ключ- название,значение- то чему равна переменная
    scope2: any = {};



    run(node: ExpressionNode): any { //часть интерпритатора
        if (node instanceof NumberNode) {//ожидает узел числа
            return parseInt(node.number.text);//возвращает само число
        }
        if (node instanceof TextNode) {//ожидает узел текста
            return node.text.text;//возвращает сам текст
        }
        if (node instanceof UnarOperationNode) { //если оператор вывода в консоль
            switch (node.operator.type.name) {
                case tokenTypesList.LOG.name:
                    console.log(this.run(node.operand)) //выводим операнд узла //для вып самих операций
                    //console.log(node.operand) // для вывода дерева
                    return;
            }
        }
        if (node instanceof BinOperationNode) {// если бинарный операор + - =
            switch (node.operator.type.name) {
                case tokenTypesList.PLUS.name: //если +
                    return this.run(node.leftNode) + this.run(node.rightNode) // возвращаем просто сложение чисел
                case tokenTypesList.MINUS.name: //если минус -
                    return this.run(node.leftNode) - this.run(node.rightNode)
                case tokenTypesList.ASSIGN.name://если присваивание =
                    const result = this.run(node.rightNode) //присваиваем перем формулу правого операнда
                    const variableNode = <VariableNode>node.leftNode;
                    this.scope[variableNode.variable.text] = result; //записываем для хранения значения переменной
                    return result;
            }
        }
        if (node instanceof VariableNode) { //если переменная
            if (this.scope[node.variable.text]) { //если есть перем в хранилище выводим ее значение
                return this.scope[node.variable.text]
            } else { //если нет в хранилище
                throw new Error(`Переменная с названием ${node.variable.text} не обнаружена`)
            }
        }
        if (node instanceof HyphotenuseNode) { //если оператор вывода в консоль
            switch (node.operator.type.name) {
                case tokenTypesList.HYPOTENUSE.name:
                    //console.log(this.run(node.operand)) //выводим операнд узла //для вып самих операций
                    //console.log(node.operand) // для вывода дерева
                    return console.log(((this.run(node.leftNode) ** 2 + this.run(node.rightNode) ** 2)**(1/2)).toFixed(5))
            }
        }


        if (node instanceof ConstantaNode) {//ожидает узел константы
            interface Post {
                title: string;
            }
            let llname = node.leftNode.text
            const linkedlist1 = new LinkedList<Post>();
            this.scope2[llname] = linkedlist1 ;
            return console.log(linkedlist1.traverse());
        }
        if (node instanceof StatemenNode) { //строка кода будет раскрываться
            node.codeStrings.forEach(codeString => {
                this.run(codeString);// проходим по строчкам кода
            })
            return;
        }
        throw new Error('Ошибка!')
    }
}
