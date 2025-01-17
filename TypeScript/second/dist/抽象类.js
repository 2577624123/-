"use strict";
/*
 * @Author: 2577624123 2577624123@qq.com
 * @Date: 2023-01-30 15:38:35
 * @LastEditors: 2577624123 2577624123@qq.com
 * @LastEditTime: 2023-01-30 15:38:52
 * @FilePath: \Web-learning\TypeScript\second\抽象类.ts
 * @Description:
 *
 */
(function () {
    /*
    *   以abstract开头的类是抽象类，
    *       抽象类和其他类区别不大，只是不能用来创建对象
    *       抽象类就是专门用来被继承的类
    *
    *       抽象类中可以添加抽象方法
    * */
    class Animal {
        constructor(name) {
            this.name = name;
        }
    }
    class Dog extends Animal {
        sayHello() {
            console.log('汪汪汪汪！');
        }
    }
    class Cat extends Animal {
        sayHello() {
            console.log('喵喵喵喵！');
        }
    }
    const dog = new Dog('旺财');
    dog.sayHello();
})();
