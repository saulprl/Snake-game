let scl = 20;
let snake;
let food;
let score;
let paused = false;
let apple;

function setup() {
    createCanvas(500, 620);
    score = 0;
    snake = new Snake();
    apple = loadImage('apple.png');

    frameRate(12);
    pickLocation();
}

function draw() {
    strokeWeight(1);
    stroke(0);

    background(85);

    snake.death();
    snake.update();
    snake.show();

    if (snake.eat(food)) {
        pickLocation();
        score += (7 + floor(0.2 * snake.total));
    }

    fill(0);

    rect(0, 0, 500, 120);

    noFill();
    noStroke();
    rect(food.x, food.y, scl, scl);
    image(apple, food.x, food.y, 21, 21);

    strokeWeight(3);
    stroke('#ff004b');
    fill('#3211ff');
    rect(180, 20, 140, 80, 20);

    fill('#ff200d');

    textAlign(CENTER, CENTER);
    textSize(60);
    text('' + score, 252, 63);

    if (frameCount < 24) {
        fill ('#ff200d');
        strokeWeight(1);
        textAlign(CENTER, CENTER);
        textSize(20);
        text('Press \'P\' to pause or unpause', width / 2, height - 20);
    }

    if (paused) {
        textSize(40);
        text('Paused', width / 2, height / 2);
        pause();
    }
}

function pickLocation() {
    let columns = floor(width / scl);
    let rows = floor(height / scl);
    food = createVector(floor(random(columns)), floor(random(rows - 6) + 6));
    food.mult(scl);

    for (let i = 0; i < snake.tail.length; i++) {
        if (food.x === snake.tail[i].x && food.y === snake.tail[i].y) {
            pickLocation();
        }
    }
}

function keyPressed() {
    switch (keyCode) {
        case UP_ARROW:
        case 87:
            snake.dir(0, -1);
            break;
        case DOWN_ARROW:
        case 83:
            snake.dir(0, 1);
            break;
        case LEFT_ARROW:
        case 65:
            snake.dir(-1, 0);
            break;
        case RIGHT_ARROW:
        case 68:
            snake.dir(1, 0);
            break;
        case 80:
            paused = !paused;
            if (paused) {
                pause();
            } else {
                unpause();
            }
            break;
    }
}

function pause() {
    noLoop();
}

function unpause() {
    loop();
}