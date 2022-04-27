import Token from "./Token";
import { tokenTypesList } from "./TokenType";

export default class Lexer {
    [x: string]: any;
    //поля объектов класса лексер
    code: string; //передаем в лексер сам код
    pos: number = 0; //позиция в коде на которой в данный момент находится лексер
    tokenList: Token[] = [] //список принятых токенов


    constructor(code: string) {
        this.code = code;
    }

    //функция осуществления лексического анализа
    lexAnalysis(): Token[] { //возвращает список токенов
        while (this.nextToken()) {}
        this.tokenList = this.tokenList.filter(token => token.type.name !== tokenTypesList.SPACE.name);//убераем из токена пробелы
        return this.tokenList; //возвращает список токенов
    }

    //передача токенов
    // проходится посмомвольно по коду и ищет в нем токены
    nextToken(): boolean { //возвр лог зн наличия токена
        if (this.pos >= this.code.length) { //если текущая позиция больше длинны поля то завершаем цикл
            return false;
        }
        const tokenTypesValues = Object.values(tokenTypesList) //получим все возможные типы токенов
        for (let i = 0; i < tokenTypesValues.length; i++) { // берем код и с помощью итераций просматриваем его на слвпадение с возможными токенами
            const tokenType = tokenTypesValues[i]; //элемент текущей итерации
            const regex = new RegExp('^' + tokenType.regex); //создаем сам объект соотв регулярному выражению
            const result = this.code.substr(this.pos).match(regex); //необходимо исключить найденый токен путем сдвига
            if(result && result[0]) { // если полученное далее выражение не пустое
                const token = new Token(tokenType, result[0], this.pos); //создаем новый токен с параметрами тип токена, само рег выр, позиция
                this.pos += result[0].length; //увеличиваем позицию на длинну найденного слова
                this.tokenList.push(token); //поиск след слова с игнорирование уже просмотренных символов
                return true;
            }
        }
        throw new Error(`На позиции ${this.pos} обнаружена ошибка`) //код не соотв языку
    }
}