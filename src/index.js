//prettier-ignore
const colors = ['#ff0000','#ffff00','#ff8800',
                '#00ff00','#ff00ff','#00ffff',
                '#0000ff','#000000','#ffffff',
                '#ce00ff','#14930a','#0af89d'];

const colorsPicker = document.querySelector(".picker-box");
const boxCards = document.querySelector(".cards-box");

// Selected card
let currentCard;

// document.querySelector("button").addEventListener("click", function () {
//   window.location.href = "https://www.google.com";
// });
//Initialzation function
function init(currentCard) {
  //Create cards
  boxCards.innerHTML = memoryCards(3);

  // Create ColorPicker
  colorsPicker.innerHTML = colorPicker(colors);

  // Inject random unique backgroundColors to the cards
  const newArr = randomColorPicker(colors);

  const shallowArr = newArr.map((item) => item);
  currentCard = shallowArr[0];
  //Hide Colors with timer
  hideCardColors(document.querySelectorAll(".card"));

  // Red border for currentCard
  setTimeout(wait, 3000);
  function wait() {
    paintBorderCurrentCard(currentCard);
  }

  return shallowArr;
}

// global scope dynamic color array
const randomColorsArray = init(currentCard);

// Generate 3 cards into the dom
function memoryCards(num) {
  let str = "";
  for (let i = 0; i < num; i++) {
    str +=
      `<div data-color ="" class="card" style=height:248px; width: 214px;"></div>` +
      "\n";
  }
  return str;
}

// Generate colorPicker cards from array into the dom
function colorPicker(colors) {
  let str = "";
  for (const color of colors) {
    str +=
      `<div class="picker" style="background-color:${color}; height:80px; width: 176px;"></div>` +
      "\n";
  }
  return str;
}

// Compute random numbers
function random(max, min = 0) {
  return min + Math.round(Math.random() * (max - min));
}

// rgb To Hex convertor
function converToHex(currentCard) {
  let currCard = currentCard.style.backgroundColor;
  let newCardArr = currCard.slice(4, currCard.length - 1);
  let newArr = newCardArr.split(",");
  const numArr = newArr.map((str) => Number(str));
  let r = numArr[0];
  let g = numArr[1];
  let b = numArr[2];
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  let res = rgbToHex(r, g, b);
  return res;
}

// Create unique and random cards Array
function randomColorPicker(cards) {
  const cardList = [...document.querySelectorAll(".card")];
  let shallowCopyArr = cards.slice();

  for (const card of cardList) {
    let num = random(shallowCopyArr.length - 1, 0);
    card.style.backgroundColor = shallowCopyArr[num];
    card.dataset.color = shallowCopyArr[num];

    const filterArr = shallowCopyArr.filter(
      (item) => item !== shallowCopyArr[num]
    );

    shallowCopyArr = filterArr;
  }

  return cardList;
}

// randomColor and hideColor togheter with array and currentCard
function reset() {
  const newArr = randomColorPicker(colors);

  const shallowArr = newArr.map((item) => item);
  currentCard = shallowArr[0];
  //Hide Colors with timer
  hideCardColors(document.querySelectorAll(".card"));
}

// Conver all the cards color to not visible(Transparent)
function hideCardColors([...cards]) {
  //  make a of the original array
  const newCards = [...cards];
  const copyArr = newCards.map((item) => item);

  // Set time out of  3 seconds
  setTimeout(update, 3000);
  function update() {
    for (const card of copyArr) {
      card.style.backgroundColor = "transparent";
    }
  }
  currentCard = copyArr[0];
  return currentCard;
}

//painting border of currentCard to red and changing border pixels
function paintBorderCurrentCard(currentCard) {
  return (
    (currentCard.style.borderColor = "red") &&
    (currentCard.style.borderWidth = "10px")
  );
}

//if card isnt currentCard border will be black and border size 3px
function notCurrent(currentCard) {
  return (
    (currentCard.style.borderColor = "black") &&
    (currentCard.style.borderWidth = "3px")
  );
}

// Color picker listener
colorsPicker.addEventListener("click", listner);

//Listner function with win / lose logic
function listner(e) {
  // randomColorsArray

  let target = e.target;
  const res = converToHex(target);
  let colorOfCurrentCard = currentCard.dataset.color;
  console.log(randomColorsArray);
  console.log(target);
  console.log(colorOfCurrentCard);
  if (colorOfCurrentCard !== res) {
    const answer = confirm(`Wrong Answer... '\n' Try again?`);
    if (answer === true) {
      notCurrent(currentCard);
      reset();
      setTimeout(wait, 3000);
      function wait() {
        paintBorderCurrentCard(currentCard);
      }
    } else if (answer === false) {
      let FirstAlert = alert("Good Bye!:)");
      window.location.href = "https://www.google.com";
    }
  } else if (
    colorOfCurrentCard === res &&
    colorOfCurrentCard !==
      randomColorsArray[randomColorsArray.length - 1].dataset.color
  ) {
    currentCard.style.backgroundColor = res;
    notCurrent(currentCard);
    currentCard = randomColorsArray[randomColorsArray.indexOf(currentCard) + 1];
    paintBorderCurrentCard(currentCard);
  } else if (
    colorOfCurrentCard === res &&
    colorOfCurrentCard ===
      randomColorsArray[randomColorsArray.length - 1].dataset.color
  ) {
    const winAnswer = confirm(`You Won!!! '\n' Try again?`);
    if (winAnswer === true) {
      notCurrent(currentCard);
      reset();
      setTimeout(wait, 3000);
      function wait() {
        paintBorderCurrentCard(currentCard);
      }
    } else if (winAnswer === false) {
      let newAlert = alert("Good Bye!:)");
      window.location.href = "https://www.google.com";
    }
  }
}
