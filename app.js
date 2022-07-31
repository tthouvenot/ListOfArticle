/*

App gérant l'ajout, la modification et la suppression d'une liste d'article

Créer un article ---> ajouter une ligne au tableau
modifier un article ---> modifier l'élément sélectionné
supprimer un article ---> supprimer la ligne du tableau

colonne ID = list index
colonne nom = name
colonne quantité = quantity
colonne prix = price
colonne total = price * quantity

Objets:

    - Articles {nom, quantité, prix, total}
    - Table rows {nom, mods, id, name, quantity, price, total}

Fonctions:

    - Création de la table row:
        
        <div class="articles.name-id grid">
            <div class="mods-class grid-area-mods">
            </div>
            <div id="articles.name-id" class="grid-area-id">
                <p>
                    id = listarticle[index]
                </p>
            </div>
            <div id="articles.name-name" class="grid-area-name">
                <p>
                    name = articles.name
                </p>
            </div>
            <div id="articles.name-quantity" class="grid-area-quantity">
                <p>
                    name = articles.quantity
                </p>
            </div>
            <div id="articles.name-price" class="grid-area-price">
                <p>
                    name = articles.price
                </p>
            </div>
            <div id="articles.name-total" class="grid-area-total">
                <p>
                    name = articles.total
                </p>
            </div>
        </div>

*/

// DOM Elements

const getTableContainer = document.querySelector("#table-container");
const getFormSubmission = document.getElementById("submissionform");
const getNameNode = document.getElementById("name");
const getQuantityNode = document.getElementById("quantity");
const getPriceNode = document.getElementById("price");

// Functions

// Objects
const articlesArray = [];

function articles(name, quantity, price) {
  function total() {
    return quantity * price;
  }

  return {
    name,
    quantity,
    price,
    total,
    show: `Vous avez ajouter ${quantity} ${name}. Vous paierez: ${total()}€`,
  };
}

// function nodeElementsFactory(tagname, id, name, quantity, price, total) {}
class NodeElements {
  constructor(id, name, quantity, price) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.total = this.price * this.quantity;
  }

  createNodeElement(nameOfTag, classesNameList = null, attributesList = null) {
    const newElement = document.createElement(nameOfTag);

    if (classesNameList != null) {
      for (const element of classesNameList) {
        newElement.classList.add(element);
      }
    }

    if (attributesList != null) {
      for (const element of attributesList) {
        newElement.setAttribute(element[0], element[1]);
      }
    }

    return newElement;
  }

  rowContainerNode() {
    const nodeElement = this.createNodeElement("div", [
      "table-article",
      `${this.name}-${this.id}`,
      "grid",
    ]);
    return getTableContainer.appendChild(nodeElement);
  }

  modsClassNode() {
    return this.createNodeElement("div", [
      "mods-class-article",
      "grid-area-mods",
    ]);
  }

  articleIdNode() {
    const nodeElement = this.createNodeElement(
      "div",
      ["grid-area-id"],
      ["id", `${this.name}-id`]
    );
    nodeElement.insertAdjacentHTML("beforeend", `<span>${this.id}</span>`);
    return nodeElement;
  }

  articleNameNode() {
    const nodeElement = this.createNodeElement(
      "div",
      ["grid-area-name"],
      ["id", `${this.name}-name`]
    );
    nodeElement.insertAdjacentHTML("beforeend", `<span>${this.name}</span>`);
    return nodeElement;
  }

  articleQuantityNode() {
    const nodeElement = this.createNodeElement(
      "div",
      ["grid-area-quantity"],
      ["id", `${this.name}-quantity`]
    );
    nodeElement.insertAdjacentHTML(
      "beforeend",
      `<span>${this.quantity}</span>`
    );
    return nodeElement;
  }

  articlePriceNode() {
    const nodeElement = this.createNodeElement(
      "div",
      ["grid-area-price"],
      ["id", `${this.name}-price`]
    );
    nodeElement.insertAdjacentHTML("beforeend", `<span>${this.price} €</span>`);
    return nodeElement;
  }

  articleTotalNode() {
    const nodeElement = this.createNodeElement(
      "div",
      ["grid-area-total"],
      ["id", `${this.name}-id`]
    );
    nodeElement.insertAdjacentHTML("beforeend", `<span>${this.total} €</span>`);
    return nodeElement;
  }

  appendRowContainer() {
    return this.rowContainerNode().append(
      this.modsClassNode(),
      this.articleIdNode(),
      this.articleNameNode(),
      this.articlePriceNode(),
      this.articleQuantityNode(),
      this.articleTotalNode()
    );
  }

  // Méthode modification
  // Méthode suppression
}

const nameRegex = /^[a-zA-Z\u00e0-\u00ff]+(([- ])?[a-zA-Z\u00e0-\u00ff])+$/;
const quantityRegex = /^\d+$/;
const priceRegex = /^((\d+)(\.)(\d{2}))$|^\d+$/;

const inputValue = [
  {
    id: "name",
    isValid: (value) => nameRegex.test(value),
  },
  {
    id: "quantity",
    isValid: (value) => quantityRegex.test(value),
  },
  {
    id: "price",
    isValid: (value) => priceRegex.test(value),
  },
];

function regexTest() {
  
  const inputsValidity = {};

  inputValue.forEach((input) => {
    inputsValidity[input.id] = input.isValid(
      document.getElementById(input.id).value
    );
  });

  return inputsValidity;
}

console.log(regexTest());
console.log(inputValue);

function isFormDataValid() {
  let regexTestArray = Object.entries(regexTest());
  let isValid = true;
  
  for (const [key, value] of regexTestArray) {
    if (!value) {
      // document
      //   .getElementById(key)
      //   .parentNode.setAttribute("data-error-visible", "true");
      console.log("not good " + key);
      isValid = false;
    }
  }
  
  return isValid;
}

getFormSubmission.addEventListener("submit", (e) => {
  e.preventDefault();
  const regexBool = isFormDataValid();
  
  if (!regexBool) {
    console.log("Pas bon");
  } else {
    const nameInputValue = getNameNode.value;
    const quantityInputValue = getQuantityNode.value;
    const priceInputValue = getPriceNode.value;

    articlesArray.push([nameInputValue, parseInt(quantityInputValue), parseFloat(priceInputValue)]);
    
    for(let i = 0; i < articlesArray.length; i++) {     
      const isInArray =  articlesArray[i].includes(nameInputValue);
      
      if(isInArray){
        let testingnode = new NodeElements(i+1, articlesArray[i][0], articlesArray[i][1], articlesArray[i][2])
        testingnode.appendRowContainer(); 
      }
    }

    getNameNode.value = '';
    getQuantityNode.value = '';
    getPriceNode.value = '';

  }
});

