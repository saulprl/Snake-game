class Snake {
  constructor() {
    this.x = 0;
    this.y = 120;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];

    this.update = function () {
      if (this.total === this.tail.length) {
        for (let i = 0; i < this.tail.length; i++) {
          this.tail[i] = this.tail[i + 1];
        }
      }

      this.tail[this.total - 1] = createVector(this.x, this.y);

      this.x += this.xspeed * scl;
      this.y += this.yspeed * scl;

      this.x = constrain(this.x, 0, width - scl);
      this.y = constrain(this.y, 120, height - scl);
    };

    this.show = function () {
      fill(255);
      for (let i = 0; i < this.tail.length; i++) {
        rect(this.tail[i].x, this.tail[i].y, scl, scl);
      }

      fill(255);
      for (let i = 0; i < this.total; i++) {
        rect(this.tail[i].x, this.tail[i].y, scl, scl);
      }

      rect(this.x, this.y, scl, scl);
    };

    this.dir = function (x, y) {
      if (this.xspeed !== 0 && x === 0) {
        this.xspeed = x;
        this.yspeed = y;
      } else if (this.yspeed !== 0 && y === 0) {
        this.xspeed = x;
        this.yspeed = y;
      }
    };

    this.eat = function (pos) {
      let distance = dist(this.x, this.y, pos.x, pos.y);

      if (distance < 1) {
        this.total++;
        return true;
      } else {
        return false;
      }
    };

    this.death = function () {
      for (let i = 0; i < this.tail.length; i++) {
        let pos = this.tail[i];
        let distance = dist(this.x, this.y, pos.x, pos.y);

        if (distance < 1) {
          this.total = 0;
          this.tail = [];
          score = 0;
        }
      }
    };
  }
}
