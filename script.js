"use strict";

// const body = document.body;
// const container = document.createElement("div");
// body.appendChild(container);

//const random = d.quarySelect('classname')
// const container = document.querySelector(".container");

// Create HTML element
class myElement {
  constructor(elementType, className, parent) {
    this.element = document.createElement(elementType);
    this.element.className = className;
    if (parent) {
      parent.appendChild(this.element);
    }
  }

  setTextContext(someString) {
    this.element.textContent = someString;
  }

  createList(listNumber, listType, listClassName) {
    const elements = [];
    for (let i = 1; i <= listNumber; i++) {
      const blocklist = new myElement(listType, listClassName, this.element);
      elements.push(blocklist);
    }
    return elements;
  }
}

const container = new myElement("div", "container", document.body);

//Create header
const header = new myElement("div", "header", container.element);
const hi = new myElement("div", "hi", container.element);

header.setTextContext("Etch-a-sketch");

const bodyflex = new myElement("div", "body-flex", container.element);
const menu = new myElement("div", "menu", bodyflex.element);
const grid = new myElement("div", "grid", bodyflex.element);

//List
const blocklist = menu.createList(4, "div", "blocklist");
// for (let i = 1; i <= 4; i++) {
//   const blocklist = new myElement("div", "block-list", menu.element);
// }

/*Note about function
1. New {} is created
2. function is called,this = {}
3. {} linked to prototype
4. function automatically return {}
*/

// Class Exampe
// class person {
//   constructor(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//   }
// }

// const Roy = new person("Roy", "Sompamit");
// console.log(Roy);
