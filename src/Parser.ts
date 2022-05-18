import Token from "./Token";
import TokenType, {tokenTypesList} from "./TokenType";
import ExpressionNode from "./AST/ExpressionNode";
import StatemenNode from "./AST/StatemenNode";
import BinOperationNode from "./AST/BinOperationNode";
import NumberNode from "./AST/NumberNode";
import VariableNode from "./AST/VariableNode";
import UnarOperationNode from "./AST/UnarOperatorNode";
import HyphotenuseNode from "./AST/HyphotenuseNode";
import TextNode from "./AST/TextNode";
import LinkedListNode from "./AST/LinkedListNode";
import ConstantaNode from "./AST/ConstantaNode";

export default class Parser {
    tokens: Token[]; //список токенов
    pos: number = 0; //позиция



    constructor(tokens: Token[]) {
        this.tokens = tokens; // параметр список токенов от лексера
    }


    // получает список типов токенов
    match(...expected: TokenType[]): Token | null { //возвращает токены или пустое знаяение по их позиции
        if (this.pos < this.tokens.length) { // проверка позиции, чтобы не выйти за нап.код
            const currentToken = this.tokens[this.pos]; // достаем токен из массива по индексам- номер позиции
            if (expected.find(type => type.name === currentToken.type.name)) { //если совпадает с типом
                this.pos += 1; //увеличиваем позицию для дальнейшего считывания сл токена
                return currentToken; //возвращаем токен
            }
        }
        return null; //или возвращаем 0
    }

    // для ошибок ждали ; а ее нет, скобки не закрылись
    // получает список типов токенов
    require(...expected: TokenType[]): Token { //возвращает токен
        const token = this.match(...expected); //ищем ожидаемый токен
        if (!token) {
            throw new Error(`на позиции ${this.pos} ожидается ${expected[0].name}`)
        }
        return token;
    }

    parsePrint(): ExpressionNode { //парсит оператор вывода в консоль
        const operatorLog = this.tokens[this.pos];//ожидаем токен
        this.pos += 1;
        if (this.match(tokenTypesList.QUOTE) != null) {
            if (this.match(tokenTypesList.VARIABLE) != null) {
                this.pos -= 1;
                const textNode = this.parseText();
                this.require(tokenTypesList.QUOTE);
                return new UnarOperationNode(operatorLog, textNode)
            }
        }
        return new UnarOperationNode(operatorLog, this.parseFormula())//опперанд мб любым
        throw new Error(`Ожидается унарный оператор КОНСОЛЬ на ${this.pos} позиции`)
    }

    parseParentheses(): ExpressionNode { //для парсинга скобок
        if (this.match(tokenTypesList.LPAR) != null) { //ожидаем левую скобку
            const node = this.parseFormula();
            this.require(tokenTypesList.RPAR);//ожидаем правую скобку
            return node;
        } else {
            return this.parseVariableOrNumber();//если не скобки то просто парсим число или переменную
        }
    }

    parseFormula(): ExpressionNode { //парсим формулу
        let leftNode = this.parseParentheses(); //создадим узел левого операнда
        let operator = this.match(tokenTypesList.MINUS, tokenTypesList.PLUS); //оператор
        while (operator != null) {
            const rightNode = this.parseParentheses();//создаем узел правого операнда
            leftNode = new BinOperationNode(operator, leftNode, rightNode);// перезаписываем узел левого оператора и строится дерево узлов
            operator = this.match(tokenTypesList.MINUS, tokenTypesList.PLUS);
        }
        return leftNode;// вернет узел
    }


    parseVariableOrNumber(): ExpressionNode { //парсим переменные или числа
        const number = this.match(tokenTypesList.NUMBER); //ожидаем число
        if (number != null) {
            return new NumberNode(number);//вернем узел числа создавая дерево
        }
        const variable = this.match(tokenTypesList.VARIABLE);//ожидаем переменную
        if (variable != null) {
            return new VariableNode(variable);// вернем узел переменной создавая дерево
        }
        throw new Error(`Ожидается переменная или число на ${this.pos} позиции`)
    }
    parseText(): ExpressionNode {
        const text = this.match(tokenTypesList.VARIABLE);//ожидаем переменную
        if (text != null) {
            return new TextNode(text);// вернем узел переменной создавая дерево
        }
        throw new Error(`Ожидается текст на ${this.pos} позиции`)
    }

    parseHypo(): ExpressionNode {
        this.pos -= 1;
        const hypoOperator = this.require(tokenTypesList.HYPOTENUSE);
        this.require(tokenTypesList.LPAR);
        if ((this.match(tokenTypesList.NUMBER) || this.match(tokenTypesList.VARIABLE) )!= null) {
            this.pos -= 1;
            let firstNode = this.parseVariableOrNumber();
            this.require(tokenTypesList.COMMA);
            if ((this.match(tokenTypesList.NUMBER) || this.match(tokenTypesList.VARIABLE) )!= null) {
                this.pos -= 1;
                const secondNode = this.parseVariableOrNumber();
                this.require(tokenTypesList.RPAR);
                const hypoNode = new HyphotenuseNode(hypoOperator, firstNode, secondNode);
                return hypoNode;
            }//throw new Error(`Неворно указан второй катет гипотенузы на ${this.pos} позиции`)
        }
        throw new Error(`Ожидается оператор ГИПОТЕНУЗА на ${this.pos} позиции`)
    }
    parseConst(): ExpressionNode {
        this.pos -= 1;
        const init = this.require(tokenTypesList.CONST);//ожидаем оператор константы
        const variable = this.match(tokenTypesList.VARIABLE);//ожидаем переменную
        if (variable != null){
            //this.pos -= 1;
            //let variableNode = this.parseVariableOrNumber();
            this.require(tokenTypesList.ASSIGN);
            this.require(tokenTypesList.NEW);
            this.require(tokenTypesList.LINKEDLIST)
            this.require(tokenTypesList.LDAT);
            const data = this.match(tokenTypesList.VARIABLE);
            if ( data != null){
                //const variable2 = this.match(tokenTypesList.VARIABLE);
                const listNode = new LinkedListNode(null,null, data);
                this.require(tokenTypesList.RDAT);
                this.require(tokenTypesList.LPAR);
                this.require(tokenTypesList.RPAR);
                return new ConstantaNode(init,variable,listNode);
            }
            //parse linked list
        }
        throw new Error(`Ожидается СПИСОК на ${this.pos} позиции`)
    }
    parseExpression(): ExpressionNode { //парсит строки
        if (this.match(tokenTypesList.CONST) != null) {
            const constNode = this.parseConst()
            return constNode;
        }
        else if (this.match(tokenTypesList.HYPOTENUSE) != null) {
            const hypoNode = this.parseHypo()
            return hypoNode;
        }
        else if (this.match(tokenTypesList.LOG) != null) {
            this.pos -= 1;
            //const operatorLog = this.require(tokenTypesList.LOG);//ожидаем токен
            const printNode = this.parsePrint() //тогда ожидаем оператор консоль
            //if (this.match(tokenTypesList.CENUM) != null) {
                //const printNode2 = this.parsePrint()
            //}
            return printNode; //вернет узел
        }
        else if (this.match(tokenTypesList.VARIABLE) != null) {// ожидаем токен переменную или

            //добавить для линкедлиста

            this.pos -= 1;// если была переменная вернемся обратно
            let variableNode = this.parseVariableOrNumber(); //парсим переменую #или числна
            const assignOperator = this.match(tokenTypesList.ASSIGN); //ожидаем оператор присвоения
            if (assignOperator != null) { //проверка, что вернулся токен а не ноль
                const rightFormulaNode = this.parseFormula(); // распарсиваем формулу
                const binaryNode = new BinOperationNode(assignOperator, variableNode, rightFormulaNode);//создаем узел бинарного оператора
                return binaryNode;// вернем корневой узел
            }
        }
        throw new Error(`После переменной ожидается оператор присвоения на позиции ${this.pos}`);
    }

    parseCode(): ExpressionNode {
        const root = new StatemenNode(); //объект корневого класса
        while (this.pos < this.tokens.length) { //пока позиция меньше колличества токенов в массиве
            const codeStringNode = this.parseExpression(); //считываем строку кода
            this.require(tokenTypesList.SEMICOLON); //ожидаем ; после кажд строки
            root.addNode(codeStringNode); //добавляем в массив узлов узел строки
        }
        return root; //возвращает узел строки
    }

}
