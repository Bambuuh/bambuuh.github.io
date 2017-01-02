class Main {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private width: number;
    private height: number;

    private stars: Star[] = [];

    public init(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.context.translate(this.width / 2, this.height / 2);

        for(let i = 0; i < 200; i++) {
            const x = this.getRandomNumber(this.width / 2);
            const y = this.getRandomNumber(this.height / 2);
            this.stars.push(new Star(x, y));
        }
    }

    private getRandomNumber(max: number) {
        let number = Math.floor(Math.random() * max) + 1;
        number *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

        return number;
    }

    public run() {
        this.update();
        this.draw();
        setTimeout(() => this.run(), 10);
    }

    private draw() {
        this.context.fillStyle = 'black';
        this.context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

        this.stars.forEach(star => this.drawStar(star));
    }

    public update() {
        this.stars.forEach((star, i) => {
            star.update(this.width);
            if (star.x > (this.width / 2) || star.x < -(this.width / 2) || star.y > (this.height / 2) || star.y < -(this.height / 2) ) {
                const x = this.getRandomNumber(this.width / 4);
                const y = this.getRandomNumber(this.height / 4);
                star.init(x, y);
            }
        });
    }

    private drawStar(star: Star) {
        this.context.beginPath();
        this.context.arc(star.x, star.y, star.size, 0, 2 * Math.PI, false);
        this.context.fillStyle = 'white';
        this.context.fill()
    }

    private getRandomStarPos() {
        return {
            x: this.getRandomNumber(this.width / 2),
            y: this.getRandomNumber(this.height / 2),
        }
    }
}