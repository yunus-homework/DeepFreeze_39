"use strict";

let user = {
    data: {
        a: 1,
        b: 2,
        c: 3,
        d: {
            a1: 1,
            b1: 2,
            c1: 3,
            d1: {
                a2: 3,
                b2: 3,
                c2: 3,
            },
        },
    },
};

function deepFreeze(obj) {
    // Получаем имена свойств из объекта obj
    const propNames = Object.getOwnPropertyNames(obj);

    // Замораживаем свойства для заморозки самого объекта
    propNames.forEach(function (name) {
        const prop = obj[name];

        // Заморозка свойства prop, если оно объект
        if (typeof prop === "object" && prop !== null) {
            deepFreeze(prop);
        }
    });

    // Заморозить сам объект obj (ничего не произойдёт, если он уже заморожен)
    return Object.freeze(obj);
}

deepFreeze(user);

//Uncaught TypeError: Cannot add property test, object is not extensible
// user.test = "test";
// console.log(user.test);

// all true
console.log(deepFreeze(user));
console.log(Object.isFrozen(user));
console.log(Object.isFrozen(user.data));
console.log(Object.isFrozen(user.data.d));
console.log(Object.isFrozen(user.data.d.d1));

// Object.preventExtensions(user);

// user.data.a = "12331";

// console.log(user.data.a);

// console.log(user);

// function deepFreeze(obj) {
//     // Получаем имена свойств из объекта obj
//     const propNames = Object.getOwnPropertyNames(obj);

//     // Замораживаем свойства для заморозки самого объекта
//     propNames.forEach(function (name) {
//         const prop = obj[name];

//         // Заморозка свойства prop, если оно объект
//         if (typeof prop === "object" && prop !== null) {
//             deepFreeze(prop);
//         } else {
//             const descriptor = Object.getOwnPropertyDescriptor(obj, name);
//             descriptor.writable = false;
//             descriptor.configurable = false;
//             Object.defineProperty(obj, name, descriptor);
//         }
//     });

//     return obj;
// }

// deepFreeze(user);

// Uncaught TypeError: Cannot add property test, object is not extensible
// user.data = "test";
// console.log(Object.getOwnPropertyDescriptor(user, "data"));
