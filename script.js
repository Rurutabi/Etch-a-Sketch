"use strict";

// const body = document.body;
// const container = document.createElement("div");
// body.appendChild(container);

// Create HTML element
class MyElement {
  constructor(elementType, className) {
    this.element = document.createElement(elementType);
    this.element.className = className;
  }

  appendTo(parent) {
    parent.appendChild(this.element);
  }
}

const myDiv = new MyElement("p", "newClass");
myDiv.appendTo(document.body);

/*Note about function
1. New {} is created
2. function is called,this = {}
3. {} linked to prototype
4. function automatically return {}
*/

// class MyElement {
//     constructor(elementType, className) {
//       this.element = document.createElement(elementType);
//       this.element.className = className;
//     }

//     appendTo(parent) {
//       parent.appendChild(this.element);
//     }

//     setText(text) {
//       this.element.textContent = text;
//     }
//   }

// const myDiv = new MyElement("div", "my-class");
//   myDiv.setText("Hello World!");
//   myDiv.appendTo(document.body);

// Class Exampe
// class person {
//     constructor(firstName, lastName) {
//       this.firstNam = firstName;
//       this.lastName = lastName;
//     }
//   }

//   const Roy = new person("Roy", "Sompamit");
//   console.log(Roy);
