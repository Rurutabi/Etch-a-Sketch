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

  replaceElement(elementType) {
    const newNode = document.createElement(elementType);
    this.element.parentNode.replaceChild(newNode, this.element);
    this.element = newNode;
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

const [pickColour, rainbowMode, eraser, clear, selectRange, rangeNumber] =
  newList;

//Set menu text
rainbowMode.setTextContext("Rainbow Mode");
eraser.setTextContext("Eraser");
clear.setTextContext("Clear");

//li change list element to input
pickColour.replaceElement("input");
pickColour.element.setAttribute("type", "color");
pickColour.element.setAttribute("value", "#000000");
selectRange.replaceElement("input");
selectRange.element.setAttribute("type", "range");
selectRange.element.setAttribute("value", "16");
selectRange.element.setAttribute("min", "1");
selectRange.element.setAttribute("max", "64");
rangeNumber.element.textContent = 16;

class colourGrid {
  colour = pickColour.element.value;
  randomCheck = false;
  eraserMode = false;
  curretIndex;
  previousIndex;
  constructor() {
    this.colourGrid();
    this.chooseColour();
    this.randomColour();
    this.getRandomColor();
    this.eraseColour();
    this.clearColour();
  }

  colourGrid() {
    //DeafultSize
    let userInput = 16;
    const gridContainer = new myElement(
      "div",
      "grid-container",
      section.element
    );
    gridContainer.element.style.width = "400px";

    let newGrid = gridContainer.createList(
      userInput * userInput,
      "div",
      "grid-item"
    );
    let squareSize = gridContainer.element.clientWidth / userInput;
    gridContainer.element.style.gridTemplateRows = `repeat(${userInput}, ${squareSize}px)`;
    gridContainer.element.style.gridTemplateColumns = `repeat(${userInput}, ${squareSize}px)`;
    newGrid.map((value, index) => value.element.setAttribute("id", index));

    this.colourAllGird(newGrid);

    //User selective size
    selectRange.element.addEventListener("input", (event) => {
      rangeNumber.element.textContent = event.target.value;
      userInput = event.target.value;
      gridContainer.element.textContent = "";

      let newGrid = gridContainer.createList(
        userInput * userInput,
        "div",
        "grid-item"
      );
      let squareSize = gridContainer.element.clientWidth / userInput;
      gridContainer.element.style.gridTemplateRows = `repeat(${userInput}, ${squareSize}px)`;
      gridContainer.element.style.gridTemplateColumns = `repeat(${userInput}, ${squareSize}px)`;
      newGrid.map((value, index) => value.element.setAttribute("id", index));

      this.colourAllGird(newGrid);
    });
  }

  colourAllGird(newGrid) {
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
          if (this.randomCheck === false && this.eraserMode === false) {
            value.element.style.backgroundColor = this.colour;
          } else if (
            this.randomCheck === true &&
            this.curretIndex !== this.previousIndex
          ) {
            value.element.style.backgroundColor = this.getRandomColor();
          } else if (this.randomCheck === false && this.eraserMode === true) {
            value.element.style.backgroundColor = "white";
          }
        }
      });
    });
  }

  chooseColour() {
    pickColour.element.addEventListener("change", () => {
      this.colour = pickColour.element.value;
      this.eraserMode = false;
      this.randomCheck = false;
    });
  }

  randomColour() {
    rainbowMode.element.addEventListener("click", () => {
      this.randomCheck = true;
    });
  }

  eraseColour() {
    eraser.element.addEventListener("click", () => {
      this.randomCheck = false;
      this.eraserMode = true;
    });
  }

  clearColour() {
    clear.element.addEventListener("click", () => {
      newGrid.forEach(
        (value) => (value.element.style.backgroundColor = "white")
      );
    });
  }

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
