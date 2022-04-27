import ExpressionNode from "./ExpressionNode";
//самый корневой узел дерева, который будет хранить строки кода

export default class StatemenNode extends ExpressionNode {
    codeStrings: ExpressionNode[] = [];//массив узлов

    addNode(node: ExpressionNode) {
        this.codeStrings.push(node); //парсим строчку и добавляем узел в массив
    }
}
