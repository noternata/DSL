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
    'TEXT': new TokenType('TEXT', '[а-я]* [а-я]*'),
    'HYPOTENUSE': new TokenType('HYPOTENUSE', 'ГИПОТЕНУЗА'),
    'COMMA': new TokenType('COMMA', '\\,'),
    'QUOTE': new TokenType('QUOTE', '\\"'),
    'CENUM': new TokenType('CENUM', '\\+'),
    'LINKEDLIST': new TokenType('LINKEDLIST', 'СПИСОК'),
    'LDAT': new TokenType('LDAT', '\\<'),
    'RDAT': new TokenType('RDAT', '\\>'),
    'NEW': new TokenType('NEW', 'НОВЫЙ'),
    'CONST': new TokenType('CONST', 'КОНСТАНТА'),
    'POINT': new TokenType('POINT', '\\.'),
    'COLON': new TokenType('COLON', '\\:'),
    'LFIG': new TokenType('LFIG', '\\{'),
    'RFIG': new TokenType('RFIG', '\\}'),
    'INSERTATEND': new TokenType('INSERTATEND', 'ДОБАВИТЬВКОНЕЦ'),
    'INSERTATBEGIN': new TokenType('INSERTATBEGIN', 'ДОБАВИТЬВНАЧАЛО'),
    'DELITEINLIST': new TokenType('DELITEINLIST', 'ОЧИСТИТЬСПИСОК'),
    'SEARCHINLIST': new TokenType('SEARCHINLIST', 'НАЙТИВСПИСКЕ'),
    'PRINTLIST': new TokenType('PRINTLIST', 'ВЫВЕСТИСПИСОК'),
    'SIZELIST': new TokenType('SIZELIST', 'РАЗМЕРСПИСКА'),

}
//'INSERTBYID': new TokenType('INSERTBYID', 'ДОБАВИТЬПОИНДЕКСУ'),
//'GETBYID': new TokenType('GETBYID', 'ПОЛУЧИТЬПОИНДЕКСУ'),