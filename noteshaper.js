// Noteshaper by Seiji Nair
/*

  1. Create slider object
      Arguments:  x,y start
                  x,y end
                  min value
                  max value
                  initial value
      Properties:
                  circle radius
                  circle fill H
                  circle fill S
                  circle fill B
                  circle stroke width
                  circle stroke H
                  circle stroke S
                  circle stroke B
                  line stroke width
                  line stroke H
                  line stroke S
                  line stroke B
      Behavior:
                  Click and drag behavior
      Calculates:
                  Percent location
                  Value
  2. Control fill color
      H: 0-360 (60 per slider)
      S: 30-50 (volume controls)
      B: 80

*/
var halfwidth;
var halfheight;
var clicked;
var hexminradius;
var hexmaxradius;

function setup() {
  createCanvas(windowWidth, windowHeight);
  halfwidth = windowWidth / 2;
  halfheight = windowHeight / 2;
  colorMode(HSB, 360, 100, 100, 1);
  ellipseMode(CENTER);
  angleMode(DEGREES);
  clicked = false;
  let cos30 = cos(30);
  let sin30 = sin(30);

  if (windowWidth > windowHeight) {
    hexminradius = windowHeight / 20;
  } else {
    hexminradius = windowWidth / 20;
  }

  if (windowWidth > windowHeight) {
    hexmaxradius = windowHeight / 3;
  } else {
    hexmaxradius = windowWidth / 3;
  }

  slider1 = new customSlider(halfwidth, halfheight - hexminradius, halfwidth, halfheight - hexmaxradius, 0, 100, 0.75);

  slider1.lineStrokeWidth = 0.2;
  slider1.inverse = true;
  slider1.initialposition();
  slider1.linecalc();

  slider2 = new customSlider(halfwidth + hexminradius * cos30, halfheight - (hexminradius * sin30), halfwidth + hexmaxradius * cos30, halfheight - (hexmaxradius * sin30), 0, 100, 0.75);
  slider2.lineStrokeWidth = 0.2;
  slider2.initialposition();
  slider2.linecalc();

  slider3 = new customSlider(halfwidth + hexminradius * cos30, halfheight + (hexminradius * sin30), halfwidth + hexmaxradius * cos30, halfheight + (hexmaxradius * sin30), 0, 100, 0.75);

  slider3.lineStrokeWidth = 0.2;
  slider3.initialposition();
  slider3.linecalc();

  slider4 = new customSlider(halfwidth, halfheight + hexminradius, halfwidth, halfheight + hexmaxradius, 0, 100, 0.75);

  slider4.lineStrokeWidth = 0.2;
  slider4.initialposition();
  slider4.linecalc();

  slider5 = new customSlider(halfwidth - hexminradius * cos30, halfheight + (hexminradius * sin30), halfwidth - hexmaxradius * cos30, halfheight + (hexmaxradius * sin30), 0, 100, 0.75);

  slider5.lineStrokeWidth = 0.2;
  slider5.inverse = true;
  slider5.initialposition();
  slider5.linecalc();

  slider6 = new customSlider(halfwidth - hexminradius * cos30, halfheight - (hexminradius * sin30), halfwidth - hexmaxradius * cos30, halfheight - (hexmaxradius * sin30), 0, 100, 0.75);

  slider6.lineStrokeWidth = 0.2;
  slider6.inverse = true;
  slider6.initialposition();
  slider6.linecalc();

  //for (var i = 0; i < 10; i++) {
  //objects[i] = new Object();
  //}
}

function draw() {
  background(50, 1, 99, 1);
  stroke(0);
  fill((slider1.output+slider2.output+slider3.output+slider4.output+slider5.output+slider6.output)*60, 40, 80);
  beginShape();
  vertex(slider1.circleX, slider1.circleY);
  vertex(slider2.circleX, slider2.circleY);
  vertex(slider3.circleX, slider3.circleY);
  vertex(slider4.circleX, slider4.circleY);
  vertex(slider5.circleX, slider5.circleY);
  vertex(slider6.circleX, slider6.circleY);
  endShape(CLOSE);

  slider1.clickdetect();
  slider1.display();
  slider2.clickdetect();
  slider2.display();
  slider3.clickdetect();
  slider3.display();
  slider4.clickdetect();
  slider4.display();
  slider5.clickdetect();
  slider5.display();
  slider6.clickdetect();
  slider6.display();
}

function windowResized() {
  halfwidth = windowWidth / 2;
  halfheight = windowHeight / 2;
}


//customSlider object takes starting XY position, ending XY position, minimum value, maximum value, and initial decimal

function customSlider(Xstart, Ystart, Xend, Yend, min, max, initial) {

  //these values need to be updated whenever window is resized
  this.Xstart = Xstart;
  this.Ystart = Ystart;
  this.Xend = Xend;
  this.Yend = Yend;
  this.min = min;
  this.max = max;
  this.initial = initial;

  //default values 

  this.circleR = windowHeight / 50;
  this.circleFillH = 100;
  this.circleFillS = 0;
  this.circleFillB = 100;
  this.lineStrokeWidth = 1;
  this.lineStrokeH = 100;
  this.lineStrokeS = 100;
  this.lineStrokeB = 0;
  this.output = initial;
  this.outputinteger = this.output * this.max;
  
  //inverse indicates if logic is left to right or right to left
  this.inverse = false;
  this.clicked = false;
  
  //initialposition sets initial slider position based on initial decimal argument
  
  this.initialposition = function () {
      
      //if X of start and end are equal, that is a vertical slider
      if (this.Xstart == this.Xend) {
        
        this.circleX = this.Xstart;
        this.circleY = (this.Yend - this.Ystart) * (this.initial) + this.Ystart;
        
      } else {
      
      this.circleX = (this.Xend - this.Xstart) * (this.initial) + this.Xstart;
  this.circleY = (this.Yend - this.Ystart) * (this.initial) + this.Ystart;
      }
  }
  
 
  //Calculate slope (m) as delta Y / delta X

  this.linecalc = function() {
    
    //first calculate slope
    if (this.inverse == false) {
    this.slope = (this.Yend - this.Ystart) / (this.Xend - this.Xstart)
    } else {
    this.slope = (this.Ystart - this.Yend) / (this.Xstart - this.Xend)
    }
 
  //Solve for y intercept B
  //b = y - mx

  this.b = this.Ystart - this.slope * this.Xstart;
  }
  
  this.update = function() {

  }

  this.clickdetect = function() {

    if (clicked == true && mouseX > (this.circleX - this.circleR) && mouseX < (this.circleX + this.circleR) && mouseY > (this.circleY - this.circleR) && mouseY < (this.circleY + this.circleR)) {
      this.clicked = true;
    } else if (clicked == false) {
      this.clicked = false;
    }

  }
  this.display = function() {

    if (this.clicked == true) {

      //the line is expressed by y = mx+b
      //unless the X coordinate is equal for both points
      //m (slope) = delta Y / delta X

      if (this.Xstart < this.Xend) {

        if (mouseX > this.Xstart && mouseX < this.Xend) {
          this.circleX = mouseX;
          this.circleY = this.slope * mouseX + this.b;
        } else if (mouseX < this.Xstart) {
          this.circleX = this.Xstart;
          this.circleY = this.Ystart;
        } else if (mouseX > this.Xend) {
          this.circleX = this.Xend;
          this.circleY = this.Yend;
        }

        this.output = ((this.circleX - this.Xstart) / (this.Xend - this.Xstart));

      } else if (this.Xstart > this.Xend) {
        
        if (mouseX < this.Xstart && mouseX > this.Xend) {
          this.circleX = mouseX;
          this.circleY = this.slope * mouseX + this.b;
        } else if (mouseX > this.Xstart) {
          this.circleX = this.Xstart;
          this.circleY = this.Ystart;
        } else if (mouseX < this.Xend) {
          this.circleX = this.Xend;
          this.circleY = this.Yend;
        }
        
        this.output = ((this.circleX - this.Xstart) / (this.Xend - this.Xstart));
        
      }
        
        
        
        else if (this.Xstart == this.Xend && this.inverse == false) {

        if (mouseY > this.Ystart && mouseY < this.Yend) {
          this.circleX = this.Xstart;
          this.circleY = mouseY;

        } else if (mouseY < this.Ystart) {
          this.circleX = this.Xstart;
          this.circleY = this.Ystart;
        } else if (mouseY > this.Yend) {
          this.circleX = this.Xstart;
          this.circleY = this.Yend;
        }
          
        
        this.output = ((this.circleY - this.Ystart) / (this.Yend - this.Ystart));
        
      } else {
        
        if (mouseY < this.Ystart && mouseY > this.Yend) {
          this.circleX = this.Xstart;
          this.circleY = mouseY;

        } else if (mouseY > this.Ystart) {
          this.circleX = this.Xstart;
          this.circleY = this.Ystart;
        } else if (mouseY < this.Yend) {
          this.circleX = this.Xstart;
          this.circleY = this.Yend;
        }
        
        this.output = ((this.circleY - this.Ystart) / (this.Yend - this.Ystart));
      }
    this.outputinteger = this.max * this.output;
    }
    push();
    stroke(this.lineStrokeH, this.lineStrokeS, this.lineStrokeB);
    strokeWeight(this.lineStrokeWidth);
    fill(this.circleFillH, this.circleFillS, this.circleFillB);
    line(this.Xstart, this.Ystart, this.Xend, this.Yend);
    strokeWeight(1);
    ellipse(this.circleX, this.circleY, this.circleR * 2, this.circleR * 2);
    pop();
    
  }
}

function mousePressed() {
  clicked = true;
}

function mouseReleased() {
  clicked = false;
}
