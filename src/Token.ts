import TokenType from "./TokenType";

export default class Token {
    //создадим поля которые будет иметь каждый экземпляр класса токена
    type: TokenType; //тип токена число или переменная
    text: string; //текст(само число или переменная)
    pos: number; // номер позиции в коде

    constructor(type: TokenType, text: string, pos: number) { //конструктор
        this.type = type;
        this.text = text;
        this.pos = pos;
    }
}