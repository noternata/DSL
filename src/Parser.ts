import Token from "./Token";
import TokenType, {tokenTypesList} from "./TokenType";
import ExpressionNode from "./AST/ExpressionNode";
import StatemenNode from "./AST/StatemenNode";
import BinOperationNode from "./AST/BinOperationNode";
import NumberNode from "./AST/NumberNode";
import VariableNode from "./AST/VariableNode";
import UnarOperationNode from "./AST/UnarOperatorNode";

export default class Parser {
    tokens: Token[]; //список токенов
    pos: number = 0; //позиция
    scope: any = {}; //объект в котором ключ- название,значение- то чему равна переменная


    constructor(tokens: Token[]) {
        this.tokens = tokens; // параметр список токенов от лксера
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
        const operatorLog = this.match(tokenTypesList.LOG);//ожидаем токен
        if (operatorLog != null) {
            return new UnarOperationNode(operatorLog, this.parseFormula())//опперанд мб любым
        }
        throw new Error(`Ожидается унарный оператор КОНСОЛЬ на ${this.pos} позиции`)
    }

    parseParentheses(): ExpressionNode { //для парсинга скобок
        if (this.match(tokenTypesList.LPAR) != null) { //ожидаем левую скобку
            const node = this.parseFormula();
            this.require(tokenTypesList.RPAR);//ожидаем правую скобку
            return node;
        } else {
            return this.parseVariableOrNumber();
        }
    }

    parseFormula(): ExpressionNode { //парсим формулу
        let leftNode = this.parseParentheses(); //созжадим узел левого операнда
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

    parseExpression(): ExpressionNode { //парсит строки
        if (this.match(tokenTypesList.VARIABLE) == null) {// ожидаем токен переменную или
            const printNode = this.parsePrint() //тогда ожидаем оператор консоль
            return printNode; //вернет узел
        }
        this.pos -= 1;// если была переменная вернемся обратно
        let variableNode = this.parseVariableOrNumber(); //парсим переменную или числа
        const assignOperator = this.match(tokenTypesList.ASSIGN); //ожидаем оператор присвоения
        if (assignOperator != null) { //проверка, что вернулся токен а не ноль
            const rightFormulaNode = this.parseFormula(); // распарсиваем формулу
            const binaryNode = new BinOperationNode(assignOperator, variableNode, rightFormulaNode);//создаем узел бинарного оператора
            return binaryNode;// вернем корневой узел
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
    run(node: ExpressionNode): any { //
        if (node instanceof NumberNode) {//ожидает узел числа
            return parseInt(node.number.text);
        }
        if (node instanceof UnarOperationNode) { //если оператор вывода в консоль
            switch (node.operator.type.name) {
                case tokenTypesList.LOG.name:
                    console.log(this.run(node.operand)) //выводим операнд ноды
                    return;
            }
        }
        if (node instanceof BinOperationNode) {// если бинарный операор
            switch (node.operator.type.name) {
                case tokenTypesList.PLUS.name: //если +
                    return this.run(node.leftNode) + this.run(node.rightNode)
                case tokenTypesList.MINUS.name: //если минус
                    return this.run(node.leftNode) - this.run(node.rightNode)
                case tokenTypesList.ASSIGN.name://если присваивание
                    const result = this.run(node.rightNode)
                    const variableNode = <VariableNode>node.leftNode;
                    this.scope[variableNode.variable.text] = result; //записываем для хранения значения переменной
                    return result;
            }
        }
        if (node instanceof VariableNode) { //если переменная
            if (this.scope[node.variable.text]) {
                return this.scope[node.variable.text]
            } else { //если нет в хранилище
                throw new Error(`Переменная с названием ${node.variable.text} не обнаружена`)
            }
        }
        if (node instanceof StatemenNode) { //строка кода будет раскрываться
            node.codeStrings.forEach(codeString => {
                this.run(codeString);
            })
            return;
        }
        throw new Error('Ошибка!')
    }
}
