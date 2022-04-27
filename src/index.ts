import Lexer from "./Lexer";
import Parser from "./Parser";
import Interpreter from "./Interpreter";

const code = //сам код
    `перем РАВНО 33;
сумма РАВНО 5 МИНУС 9;
суммадва РАВНО 0 МИНУС 6;
КОНСОЛЬ сумма ;
КОНСОЛЬ суммадва;
КОНСОЛЬ сумма МИНУС суммадва ПЛЮС ( 5 ПЛЮС 3 );
    `

const lexer = new Lexer(code);
lexer.lexAnalysis()
console.log(lexer.tokenList)


const parser = new Parser(lexer.tokenList);
const rootNode = parser.parseCode()
const interpriter = new Interpreter();
interpriter.run(rootNode);
