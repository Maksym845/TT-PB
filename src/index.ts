import {Application, Container, Graphics} from 'pixi.js';


const app = new Application({
  background: '#ffffff',
  width: 800,
  height: 800,
});

document.body.appendChild(app.view as HTMLCanvasElement);

app.stage.position.set(800 / 2, 800 / 2);

interface Button {
  lengthOfButtons: number;
}

class Button {
  constructor() {
    this.lengthOfButtons = 0;
  }

  createButton(
    buttonWidth: number = 100,
    buttonHeight: number = 60,
    buttonColor: number[],
  ) {
    const container = new Container();

    for (let i = 0; i <= 4; i++) {
      const rectangle = new Graphics();

      rectangle.beginFill(buttonColor[i]);
      rectangle.drawRect(0,0,buttonWidth, buttonHeight);
      rectangle.endFill();

      container.addChild(rectangle);
    }

    return container;
  }
}

interface CreateButtons {
  numberOfButtons: number;
}

class CreateButtons {
  constructor(numberOfButtons: number) {
    this.numberOfButtons = numberOfButtons
  }
}

const button = new Button();

app.stage.addChild(button.createButton(
  123,
  63,
  [0xff0000, 0xAF9595FF, 0x4EA467FF, 0x6454D0FF]
));
