  let balls = [];
  let img01;
  let p1;
  let x;
  let y;
  let btn1;
  let textBox;
  let sliderSpeedX;
  let sliderSpeedY;
  let ButtonColorR;
  let ButtonColorG;
  let ButtonColorB;
  let Sliderbrigthness;
  let sliderSize;

  function preload(){
    img01 = loadImage("images/brazo.png");

  }

  function setup() {
    createElement("h1", "The fuckin bubbles");
    createCanvas(600,400);

    let para = select("#titulo");
    para.style("background-color", "#F0F");
    btn1 = createButton("Push!");
    btn1.mouseOver(changeButton);
    btn1.mouseOut(buttonOut);
    btn1.mousePressed(BGCol);

    textBox = createInput("");
    textBox.input(updateText);

    sliderSpeedX = createSlider(-2, 2, 1);
    sliderSize = createSlider(5, 100, 50);

    p1 = createElement("p", "are awesome");
    p1.style("background-color", "grey");
    p1.style("color", "red");
    p1.style("padding", "24px");

    for(let i = 0; i < 50; i++){
    let posX = random(0, width);
    let posY = random(0, height);
    let speedX = random(-1, 1);
    let speedY = random(-1, 1);
    let colorR = random(50, 80);
    let colorG = random(50, 52);
    let colorB = random(50, 200);
    let brigthness = 200;
    let size = random(5, 100);
    let ball = new Ball(posX, posY, speedX, speedY, colorR, colorG, colorB, brigthness, size); // create Ball
    balls.push(ball);

  }


}

  function draw() {
    background(150);

    for(let ball of balls){
      ball.move();
      ball.bounce();
      ball.displ(sliderSize.value());
      ball.rollOver(mouseX, mouseY);
    //ball.mapCol(mouseX, mouseY);

      let overlapping = false;

      if(ball.rollOver(mouseX, mouseY)){
        ball.changeBrigth(255);
      }else{
        ball.changeBrigth(30);
      }

        for(let otherBall of balls){
          if (ball !== otherBall && ball.intersects(otherBall)) {
            overlapping = true;
        }
      }
      if (overlapping) {
        ball.changeCol(125, 0, 160, 200);
      }else {
        ball.changeCol(15, 50, 0, 100);
      }
    }

    x += (random(-2,2));

  }

  function updateText(){
    p1.html(textBox.value());
  }


  function changeButton(){
    btn1.html("Yes, Push!");
  }

  function buttonOut(){
    btn1.html("Push!");
  }

  //
  // function mouseDragged(){
  //
  //     let speedX = 0;
  //     let speedY = 0;
  //     let size = random(5, 10);
  //
  //   let ballInstance = new Ball(mouseX, mouseY, speedX, speedY, size); // create Ball
  //   balls.push(ballInstance);
  // }

  function mousePressed(){
    //   for(let ball of balls){
    //
    //   if(ball.rollOver(mouseX, mouseY)){
    //     print(ball);
    //     ball.randomCol();
    //     balls.splice(ball,1);
    //   }
    // }

    for (let i = balls.length-1; i >= 0; i--) {
        if(balls[i].rollOver(mouseX, mouseY)){
          balls.splice(i,1);
        }
      }
    }

    function BGCol(){
      background(random(random(255)));
    }

  class Ball {

    constructor(x, y, speedX, speedY, colorR, colorG, colorB, brigthness, size) {
      this.x = x;
      this.y = y;
      this.speedX = speedX;
      this.speedY = speedY
      this.colorR = colorR;
      this.colorG = colorG;
      this.colorB = colorB;
      this.brigthness =  brigthness;
      this.size = size;
    }

    move(){
        this.x += this.speedX;
        this.y += this.speedY;

    }

    bounce(){
       if(this.x > width || this.x < 0){
          this.speedX *= -1;

        }if(this.y > height || this.y < 0){
        this.speedY *= -1;
      }

    }

    displ(slideValue){

        //image(img01, this.x, this.y, this.size/2, this.size);
        noStroke();
        fill(this.colorR, this.colorG, this.colorB, this.brigthness);
        ellipse(this.x, this.y, (slideValue*this.size)/100);

    }

    changeBrigth(col){
      this.brigthness = col;
    }

    mapCol(x, y){
      this.colorR = map(x, 0, width, 0, 255);
      this.colorG = map(y, 0, height, 0, 255);
      this.colorB = map(y, 0, width, 0, 255);
    }

    randomCol(){
      this.colorR = random(0,255);
      this.colorG = random(0,255);
      this.colorB = random(0,255);
    }

    changeCol(r, g, b, a){
      this.colorR = r;
      this.colorG = g;
      this.colorB = b;
      this.colorA = a;
    }

    rollOver(x, y){
      let distance = dist(x, y, this.x, this.y);

      return distance < this.size/2;

    }

    intersects(other){
      let distance = dist(this.x, this.y, other.x, other.y);
      return (distance < (this.size/2) + (other.size/2));


    }

    clicked(x, y){
      let distance = dist(x, y, this.x, this.y);
      if(distance < this.size/2){
        this.brigthness = random(255);
      console.log("CLICKKK!!!");
      }
    }
  }
