'use strict';
/*
* Функция MakeMultiFilter(originalArray)
* Принимает один аргумент originalArray - массив, который требуется отфильтровать.
* Возвращает функцию, которая может быть использована в качестве фильтра для элементов массива.
* Содержит currentArray, который содержит копию originalArray
* и функцию arrayFilterer(filterCriteria, callback), где ее аргументы две функции.
* filterCriteria – функция принимает на вход элемент массива и возвращает boolean.
* Эта функция вызывается для каждого элемента currentArray и если filterCriteria возвращает false для элемента, то этот элемент удаляется из currentArray.
* Иначе, элемент остается в currentArray.
* Если filterCriteria не функция, то возвращаемая функция (arrayFilterer) возвращает currentArray неизмененным.
* callback – функция которая вызывается, когда фильтрация закончена. Принимает currentArray как фргумент.
* Объект this внутри callback функции ссылается на значение originalArray.
* Если параметр callback – не функция, он игнорируется. callback не имеет возвращаемого значения.
* Функция arrayFilterer возвращается сама, если параметр filterCriteria не указан, и в этом случае она возвращает currentArray.
* Возможно одновременное использование нескольких функций arrayFilterer.
*/
function MakeMultiFilter(originalArray) {
    var currentArray = originalArray.slice();
    return function arrayFilterer(filterCriteria, callback) {
        // Проверка аргумента filterCriteria, если не является функцией, то возвращается исходный currentArray
        if (typeof filterCriteria !== 'function') {
            return currentArray;
        } else {
            // В цикле для каждого элемента currentArray вызывается filterCriteria. 
            for (var i = 0; i < currentArray.length; ++i) {
                var element = currentArray[i];
                // Если функция filterCriteria возвращает false для элемента, то он удаляется из currentArray
                if (!filterCriteria(element)) {
                    currentArray.splice(i, 1);
                }
            }
            // Проверка callback на соотвествие типу function 
            if (typeof callback === 'function') {
                // Вызывается с установленным объектом this на originalArray
                callback.call(originalArray, currentArray);
            }
            // Возвращается сама функция arrayFilterer
            return arrayFilterer;
        }
    };
}