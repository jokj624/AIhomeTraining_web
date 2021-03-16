const Sketch = (p5) => {
    const words = [] // store word objects
    p5.windowResized = () => {
      //  p5.resizeCanvas(p5.windowWidth, p5.windowHeight/2);
        p5.setup();
    }

    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight/2);
        p5.background('white');
        //const str = 'HOME TRAINING';
        words.length = 0;
        const str = 'M A I T';
        const wordsStr = str.split(' ');

        if(p5.windowWidth > 757)    p5.textSize(72);
        else    p5.textSize(40);
        // track word position
        let x = (p5.windowWidth/2 - p5.textWidth(str)/2);
        let y = p5.height/(1.3);
        p5.fill(0);
        // iterate over each word
        for (let i = 0; i < wordsStr.length; i++) {
            const wordStr = wordsStr[i]; // get current word
            const wordStrWidth = p5.textWidth(wordStr); // get current word width
            const word = new Word(wordStr, x, y, i);
            words.push(word);
            x = (x + wordStrWidth + p5.textWidth(' ')); // update x by word width + space character
            // look ahead the next word - will it fit in the space? if not, line break
            const nextWordStrWidth = p5.textWidth(wordsStr[i+1]) || 0;
            if (x > p5.width - nextWordStrWidth) {
                y += p5.height/(1.3); // line height, sort of
                x = p5.windowWidth/2-p5.textWidth(str)/2; // reset x position
            }
        }
        let timerId = setTimeout(p5.key, 0, 'r');
        setTimeout(clearTimeout, 2000, timerId);
        timerId = setTimeout(p5.key, 1000, 'r');
        setTimeout(clearTimeout, 2000, timerId);
        setTimeout(p5.key, 2000, 'c');
    }

    p5.draw = () => {
        p5.background('white');

        for (let i = 0; i < words.length; i++) {
            const word = words[i]; // retrieve word object
            word.update();
            word.display();
           
        }
    }
    p5.key = (key) => {
        if (key === 'r') {
            for (let word of words) word.spread()
        } else if (key === 'c') {
            for (let word of words) word.reset()
        }
    }
    class Word {
        constructor(word, x, y, idx) {
            this.word = word;
            this.x = x;
            this.y = y;
            // target position is the same as current position at start
            this.tx = this.x;
            this.ty = this.y;
            // original position
            this.origx = this.x;
            this.origy = this.y;
            this.idx = idx;
            this.fcolor = p5.color((22+idx*2)%255,(49+idx*5)%255,(107+idx*6)%255);
            //this.fcolor = p5.color(0);
        }

        reset = () => {
            this.tx = this.origx;
            this.ty = this.origy;
            this.fcolor = p5.color(0);
        }

        spread = () => {
            this.tx = p5.random(p5.width);
            this.ty = p5.random(p5.height);
        }

        update() {
            // move towards the target by 10% each time
            this.x = p5.lerp(this.x, this.tx, 0.1);
            this.y = p5.lerp(this.y, this.ty, 0.1);
        }

        display() {
            p5.fill(this.fcolor);
            p5.noStroke();
            p5.text(this.word, this.x, this.y);
            p5.textFont('Kalam');
           // p5.textAlign(p5.CENTER, p5.CENTER);
        }
    }
};
export default Sketch;