class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    talk() {
        console.log('Hello! My name is %s and I am %d years old.', this.name, this.age);
    }
}
class Employee extends Person {
    constructor(name, age, company, salary) {
        super(name, age);
        this.company = company;
        this.salary = salary;
    }
    reward(percentage) {
        this.salary *= 1 + (percentage / 100);
        console.log(`Congratulations ${this.name}!!!
You have been rewarded!
Salary increased by ${percentage}%: new salary: ${this.salary}`);
    };
}
// the mixin
const Asset = {
    assignId: function() {
        this.id = ++Asset.lastId;
    },
    getId: function() {
        return this.id;
    }
}
Asset.lastId = 0;
// extends
function mixin(Child, Parent) {
    Object.keys(Parent).forEach(key => {
        Child.prototype[key] = Parent[key];
    });
}
mixin(Employee, Asset);

// An employee have the Person behavior and the asset behavior.
const alice = new Employee('Alice', 21, 'JLG Consulting', 2500);
alice.talk();
alice.reward(3);
alice.assignId();
console.log('alice id', alice.getId());
