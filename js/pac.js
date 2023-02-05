const Pac = document.querySelector(".pac");
const PacImage = document.querySelector(".pac-image");
const food = document.querySelector(".foodPac");
const scene = document.querySelector(".scene");
let positionX = 0;
let positionY = 0;
let point = 1;

class gamePac {
  constructor() {
    this.Pac = Pac;
    this.food = food;
  }

  point(){
      document.querySelector('.system-point span').innerText = point;
      point += 1;

     }

  //método que move a fruta para uma posição aleatória da munha cena
  alternFood() {
    this.listPositions = [];

    for (let i = 0; i < 110; i++) {
      this.listPositions.push(i * 5);
    }
    this.positionsRand =
      Math.floor(Math.random() * this.listPositions.length) + 1;
    this.food.style.left = `${this.listPositions[this.positionsRand]}px`;
    this.food.style.top = `${this.listPositions[this.positionsRand]}px`;
  }

  //método que verifica se o player ta na mesma posição que a fruta para alternar a posição dela
  alternPac(PacX, foodX, PacY, foodY) {
    if (PacX == foodX) {
      if (PacY == foodY) {
        this.alternFood();
        this.point();
      }
    }
  }

  //método que altera a imagem do meu player
  alternImage(int_food, int_Pac) {
    this.leftPosition = parseInt(getComputedStyle(food).left.split("px")[0]);
    this.topPosition = parseInt(getComputedStyle(food).top.split("px")[0]);
    this.rightPosition = parseInt(getComputedStyle(food).right.split("px")[0]);
    this.bottomPosition = parseInt(
      getComputedStyle(food).bottom.split("px")[0]
    );

    if (int_Pac == int_food) {
      PacImage.src = "pac-man-ab.png";
    } else {
      PacImage.src = "pac-man-fech.png";
    }
  }
}
//instância da classe
const PacGame = new gamePac();



//movimenando o player para os 4 lados e verfificando posições para alterar a imagem do player
document.onkeydown = (key) => {
  let PacLeft = getComputedStyle(Pac).left;
  let foodLeft = getComputedStyle(food).left;
  let PacTop = getComputedStyle(Pac).top;
  let foodTop = getComputedStyle(food).top;
  let PacRight = getComputedStyle(Pac).right;
  let foodRight = getComputedStyle(food).right;
  let PacBottom = getComputedStyle(Pac).bottom;
  let foodBottom = getComputedStyle(food).bottom;

  if (key.key == "w") {
    PacImage.style = `transform:rotate(-90deg)`;
    PacGame.alternPac(PacLeft, foodLeft, PacTop, foodTop);

    PacGame.alternPac(PacRight, foodRight, PacTop, foodTop);

    //movendo o player
    positionY -= 5;

    //alterando a imagem do player
    PacGame.alternImage(positionY, PacGame.topPosition + 5);

    if (positionY == -5) positionY = 0;
    Pac.style.top = `${positionY}px`;

    if (foodLeft > PacLeft && foodRight > PacRight && foodTop == PacTop){
      PacGame.alternFood();
      PacGame.point()
    }

  }

  if (key.key == "d") {
    PacImage.style.setProperty("--rotation", "0");
    PacImage.style = `transform:rotateY(0deg)`;
    PacGame.alternPac(PacRight, foodRight, PacBottom, foodBottom);

    PacGame.alternPac(PacRight, foodRight, PacTop, foodTop);
    //movendo o player
    positionX += 5;

    //alterando a imagem do player
    PacGame.alternImage(positionX, PacGame.leftPosition - 10);

    if (positionX == 580) positionX = 575;
    Pac.style.left = `${positionX}px`;

    if (foodTop > PacTop && foodBottom > PacBottom && foodRight == PacRight){
      PacGame.alternFood();
      PacGame.point()
    }

  }

  if (key.key == "s") {
    PacImage.style = `transform:rotate(90deg)`;
    PacGame.alternPac(PacRight, foodRight, PacBottom, foodBottom);

    PacGame.alternPac(PacLeft, foodLeft, PacBottom, foodBottom);

    //movendo o player
    positionY += 5;

    //alterando a imagem do player
    PacGame.alternImage(positionY, PacGame.topPosition - 5);

    if (positionY == 580) positionY = 575;
    Pac.style.top = `${positionY}px`;

    if (foodLeft > PacLeft && foodRight > PacRight && foodBottom == PacBottom){
      PacGame.alternFood();
      PacGame.point();
    }

  }

  if (key.key == "a") {
    PacImage.style.setProperty("--rotation", "0");
    PacImage.style = `transform:rotateY(180deg)`;
    PacGame.alternPac(PacLeft, foodLeft, PacBottom, foodBottom);

    PacGame.alternPac(PacLeft, foodLeft, PacTop, foodTop);

    //movendo o player
    positionX -= 5;

    //alterando a imagem do player
    PacGame.alternImage(positionX, PacGame.leftPosition + 5);

    if (positionX == -5) positionX = 0;
    Pac.style.left = `${positionX}px`;

    if (foodTop > PacTop && foodBottom > PacBottom && foodLeft == PacLeft){
      PacGame.alternFood();
      PacGame.point()
    }

  }
};
