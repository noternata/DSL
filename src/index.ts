import Lexer from "./Lexer";
import Parser from "./Parser";

const code = //сам код
    `перем РАВНО 33;
сумма РАВНО 5 МИНУС 9;
суммадва РАВНО 0 МИНУС 6;
КОНСОЛЬ сумма ;
КОНСОЛЬ суммадва;
КОНСОЛЬ сумма МИНУС суммадва ПЛЮС ( 5 ПЛЮС 2 );
    `

const lexer = new Lexer(code);
lexer.lexAnalysis()



const parser = new Parser(lexer.tokenList);
const rootNode = parser.parseCode()
parser.run(rootNode);
