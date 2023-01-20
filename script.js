"use strict";

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
      const blockList = new myElement(listType, listClassName, this.element);
      elements.push(blockList);
    }
    return elements;
  }
}

const container = new myElement("div", "container", document.body);

//Create header,menu and section
const header = new myElement("div", "header", container.element);
header.setTextContext("Etch-a-sketch");
const section = new myElement("div", "section", container.element);
const menu = new myElement("div", "menu", section.element);

//Create menu list
const blockList = menu.createList(1, "div", "blockList");
const newList = blockList.flatMap((blockList) =>
  blockList.createList(6, "li", "list")
);

newList[0].setTextContext("Pick Color");
newList[1].setTextContext("Color Mode");
newList[2].setTextContext("Rainbow Mode");
newList[3].setTextContext("Eraser");
newList[4].setTextContext("Clear");
newList[5].setTextContext("Select Range");

//Creating Grid
const gridContainer = new myElement("div", "grid-container", section.element);
const userInput = 16;
gridContainer.element.style.width = "400px";
const squareSize = gridContainer.element.clientWidth / userInput;
const newGrid = gridContainer.createList(
  userInput * userInput,
  "div",
  "grid-item"
);

gridContainer.element.style.gridTemplateRows = `repeat(${userInput}, ${squareSize}px)`;
gridContainer.element.style.gridTemplateColumns = `repeat(${userInput}, ${squareSize}px)`;

//Mouse over example

// const container = document.querySelector(".container");
// const gridSize = 64;
// const squareSize = container.clientWidth / gridSize;

// container.style.gridTemplateRows = `repeat(${gridSize}, ${squareSize}px)`;
// container.style.gridTemplateColumns = `repeat(${gridSize}, ${squareSize}px)`;
// const [list1, list2, list3, list4] = newList;
// list1[0].setTextContext("Hello");

// class myGrid extends myElement {
//   constructor(elementType, className, parent, gridNumber) {
//     super(elementType, className, parent);
//     this.gridNumber = gridNumber;
//   }
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
