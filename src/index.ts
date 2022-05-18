import Lexer from "./Lexer";
import Parser from "./Parser";
import Interpreter from "./Interpreter";

const code = //сам код
    `перем РАВНО 3;
КОНСТАНТА линкедлист РАВНО НОВЫЙ СПИСОК< данные>();
сумма РАВНО 5 МИНУС 9;
суммадва РАВНО 1 МИНУС 6;
КОНСОЛЬ сумма;
КОНСОЛЬ суммадва;
КОНСОЛЬ "суммаааааааа" ;
КОНСОЛЬ сумма МИНУС суммадва ПЛЮС ( 5 ПЛЮС 3 );
ГИПОТЕНУЗА(сумма,суммадва);
ГИПОТЕНУЗА ( 3, 7 );
`
//ГИПОТЕНУЗА (3,4);
const lexer = new Lexer(code);
lexer.lexAnalysis()
console.log(lexer.tokenList) //печатаем список токенов

// доб в конец
// доб по ин
//уд по ин
// получить по ин
const parser = new Parser(lexer.tokenList); // создаем объект парсера
const rootNode = parser.parseCode() //корневой узел
console.log(rootNode) //выводит узлы

const interpriter = new Interpreter();
interpriter.run(rootNode);
