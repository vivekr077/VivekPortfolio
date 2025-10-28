function Person(first, last, age, eyecolor) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eyecolor;
}

// Person.prototype.nationality = "English";
const person = new Person("vivek", "ranjan", 21, "brown");
console.log(Person.prototype);

