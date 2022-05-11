export default class TokenType {
    //создадим поля которые будет иметь каждый экземпляр класса типтокена
    name: string; //название типа
    regex: string; //регулярное выражение

    constructor(name: string, regex: string) {
        this.name = name;
        this.regex = regex;
    }
}
export const tokenTypesList = { //объект в котором описаны все возможные типы токенов
    'NUMBER': new TokenType('NUMBER', '[0-9]*'),
    'VARIABLE': new TokenType('VARIABLE', '[а-я]*'),
    'SEMICOLON': new TokenType('SEMICOLON', ';'),
    'SPACE': new TokenType('SPACE', '[ \\n\\    \\r]'), //пробелы табуляции и переход строки
    'ASSIGN': new TokenType('ASSIGN', 'РАВНО'),
    'LOG': new TokenType('LOG', 'КОНСОЛЬ'), //вывод в консоль
    'PLUS': new TokenType('PLUS', 'ПЛЮС'),
    'MINUS': new TokenType('MINUS', 'МИНУС'),
    'LPAR': new TokenType('LPAR', '\\('),
    'RPAR': new TokenType('RPAR', '\\)'),
    'HYPOTENUSE': new TokenType('HYPOTENUSE', 'ГИПОТЕНУЗА'),
    'COMMA': new TokenType('COMMA', '\\,'),
}
