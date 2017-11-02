'use strict';
// Объявляем стандартный конструктор
function TemplateProcessor(template) {
        this.template = template;   //Свойство template класса TemplateProcessor
}

/*
* Метод fillIn(dict) 
* Принимает один аргумент dict - словарь пар {ключ : значение}
* Заменяет в строке template ключи из словаря dict на значения
* Если в шаблоне есть свойство, которого нет в словаре, то оно заменяется на пустую строку
* Если шаблон неправильно оформлен, то возращается undefined, иначе же возвращается шаблон template 
*/
TemplateProcessor.prototype.fillIn = function(dict) {
    // Замена в шаблоне свойств, которые присутствуют в словаре
    for (var key in dict) {
        this.template = this.template.replace(new RegExp("{{"+ key +"}}","g"), dict[key]);
    }
    // Поиск свойств, которые отсутствуют в словаре и замена их на пустые строки
    var element = this.template.match(new RegExp(/{{.*?}}/gi));
    for (var el in element) {
        this.template = this.template.replace(new RegExp(el[0], "i"), "");
    }
    // Проверка правильности оформления шаблока
    if (this.template.search(/[{}]/i) === -1) {
        return this.template;
    }
    return; // Если шаблон оформлен неверно, то возвращаем undefined
};