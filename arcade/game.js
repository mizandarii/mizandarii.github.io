const KEYS = {
    LEFT:37,
    RIGHT: 39
};

let game = {
    ctx: null,
    platform: null,
    ball: null,
    blocks: [],
    rows: 4,
    cols: 8,
    sprites: {
        background: null,
        ball: null,
        platform: null,
        block: null
    },
    init: function () {
        this.ctx = document.getElementById("mycanvas").getContext("2d");
        this.setEvents();
    },
    setEvents() {
        //e.preventDefault();  
        window.addEventListener("keydown", e => {
            if (e.keyCode === KEYS.LEFT || e.keyCode ) {
                this.platform.dx = -this.platform.velocity;
            } else if (e.key === "ArrowRight") {
                this.platform.dx = this.platform.velocity;
            }
        });
        window.addEventListener("keyup", e => {
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                this.platform.dx = 0;
            }
        });
    },
    preload(callback) {
        let loaded = 0;
        let required = Object.keys(this.sprites).length;
        let onImageLoad = () => {
            ++loaded;
            if (loaded >= required) {
                callback();
            }
        };

        for (let key in this.sprites) {
            this.sprites[key] = new Image();
            this.sprites[key].src = "img/" + key + ".png";
            this.sprites[key].addEventListener("load", onImageLoad);
        }
    },
    create() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.blocks.push({
                    x: 64 * col + 65,
                    y: 24 * row + 35
                });
            }
        }
    },
    update() {
        this.platform.move();
    },
    run() {
        window.requestAnimationFrame(() => {
            this.update();
            this.render();
            this.run();
        });
    },
    render() {
        this.ctx.drawImage(this.sprites.background, 0, 0);
        this.ctx.drawImage(this.sprites.ball, 0, 0, this.ball.width, this.ball.height,
            this.ball.x, this.ball.y, this.ball.width, this.ball.height);
        this.ctx.drawImage(this.sprites.platform, this.platform.x, this.platform.y, this.platform.width, this.platform.height);
        this.renderBlocks();
    },
    renderBlocks() {
        for (let block of this.blocks) {
            this.ctx.drawImage(this.sprites.block, block.x, block.y);
        }
    },
    start: function () {
        this.init();
        this.preload(() => {
            this.create();
            this.run();
        });
    }
};

// Define game objects
game.ball = {
    x: 320,
    y: 280,
    width: 20,
    height: 20
};

game.platform = {
    x: 280,
    y: 300,
    dx: 0,
    velocity: 6,
    move() {
        this.x += this.dx;
        this.x = Math.max(0, Math.min(this.x, 640 - this.width)); // Assuming canvas width is 640
    },
    width: 100,
    height: 20
};

// Start the game
window.addEventListener("load", () => {
    game.start();
});
