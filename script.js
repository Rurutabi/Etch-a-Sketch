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
  // setGridId() {
  //   let i = 0;
  //   const newE = [];
  //   for (let j = 0; j < userInput * userInput; j++) {
  //     newE.push(this.element);
  //   }
  //   console.log(newE.length);
  //   while (i < newE.length) {
  //     i++;
  //     this.element.setAttribute("dataset", i);
  //   }
  // }
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

const [pickColour, colorMode, rainbowMode, eraser, clear, selectRange] =
  newList;

//Set menu text
pickColour.setTextContext("Pick Colour");
colorMode.setTextContext("Color Mode");
rainbowMode.setTextContext("Rainbow Mode");
eraser.setTextContext("Eraser");
clear.setTextContext("Clear");
selectRange.setTextContext("Select Range");

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

newGrid.map((value, index) => value.element.setAttribute("id", index));
// const temp = document.getElementById("0");
// console.log(temp);

class colourGrid {
  colour = "black";
  randomCheck = false;
  curretIndex;
  previousIndex;
  eraserMode = false;
  constructor() {
    this.colourGrid();
    this.chooseColour();
    this.randomColour();
    this.getRandomColor();
  }

  colourGrid() {
    let isClicked = false;
    newGrid.forEach((value) => {
      value.element.addEventListener("mousedown", (e) => {
        isClicked = true;
        e.preventDefault();
      });

      value.element.addEventListener("mouseup", () => {
        isClicked = false;
      });

      value.element.addEventListener("mousemove", () => {
        this.previousIndex = this.curretIndex;
        this.curretIndex = value.element.getAttribute("id");

        if (isClicked === true) {
          if (this.randomCheck === false) {
            value.element.style.backgroundColor = this.colour;
          } else if (
            this.randomCheck === true &&
            this.curretIndex !== this.previousIndex
          ) {
            value.element.style.backgroundColor = this.getRandomColor();
          }
        }
      });
    });
  }

  chooseColour() {
    pickColour.element.addEventListener("click", () => {
      this.randomCheck = false;
      this.colour = "black";
    });
  }

  randomColour() {
    rainbowMode.element.addEventListener("click", () => {
      this.randomCheck = true;
    });
  }

  // checkMouse() {
  //   console.log((this.randomCheck = false));
  // }

  getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

const draw = new colourGrid();

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

// container.colorGrid();

// newGrid.forEach((value) => value.colorGrid());

// newGrid.element.drawGrid();

// newGrid.forEach((value) => console.log((value.element.setTextContext = "hi")));
// console.log(newGrid.element);

//Mouse over example
// let isClicked = false;
// newGrid.forEach((value) => {
//   value.element.addEventListener("mousedown", (e) => {
//     isClicked = true;
//     e.preventDefault();
//   });

//   value.element.addEventListener("mouseup", () => {
//     isClicked = false;
//   });

//   value.element.addEventListener("mousemove", () => {
//     if (isClicked === true) {
//       value.element.style.backgroundColor = "black";
//     }
//   });
// });
