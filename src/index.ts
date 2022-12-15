import {Application, Assets, Container, Graphics, GraphicsGeometry, Sprite, Texture} from 'pixi.js';

const app = new Application({
  background: '#000000',
  width: 800,
  height: 800,
});

document.body.appendChild(app.view as HTMLCanvasElement);

interface Button {
  lengthOfButtons: number;
  container: Graphics,
}

class Button {
  constructor() {
  }

  createButton(
    buttonWidth: number = 100,
    buttonHeight: number = 60,
    buttonColor: number[],
    x: number = 0,
    y: number = 0,
    round: number,
    img: string,
  ) {
    const container = new Graphics();

    let lengthOfButtons = 0;
    const len = buttonColor.length;
    const square = buttonWidth / len;

    container.x = x;

    if (buttonWidth < 100) {
        buttonWidth = 100;
    }

    if (buttonHeight < 60) {
        buttonHeight = 60;
    }

    for (let i = 0; i <= len; i++) {
      const rectangle = new Graphics();

      rectangle.beginFill(buttonColor[i], 1);
      rectangle.drawRect(x + lengthOfButtons,y,buttonWidth / len, buttonHeight);
      rectangle.endFill();

      container.addChild(rectangle);

      lengthOfButtons += buttonWidth / len;
    }

    container.mask = new Graphics()
          .beginFill(0xffffff)
          .drawRoundedRect(x * 2, y, buttonWidth, buttonHeight, round)
          .endFill();

    const sprite = Sprite.from(img);

    container.addChild(sprite);

    sprite.position.set((x + buttonWidth - 30) - (square / 2), y + ((buttonHeight - 60) / 2));
    sprite.height = 60;
    sprite.width = 60;

    return container;
  }
}

const button = new Button();

app.stage.addChild(button.createButton(
  400,
  80,
  [
      0xFF4164,
    0xFF9F9F,
    0xFFD6B4,
    0xCECEAD,
    0x87B0A0,
  ],
  100,
  40,
    20,
    './img/starbucks.png',
));

app.stage.addChild(button.createButton(
  400,
  80,
  [
      0x8AB363,
    0xFFC410,
    0xFF8C6B,
    0xECDAC3,
    0xE6EFEF,
  ],
  100,
  140,
    20,
    './img/600px-Apple-logo.png',
));

app.stage.addChild(button.createButton(
    400,
    80,
    [
        0x0E3558,
        0x3970AA,
        0x62ABDD,
        0x83D5FF,
        0x93EFF7,
    ],
    100,
    240,
    20,
    './img/Twitter-logo.svg.png',
));

app.stage.addChild(button.createButton(
    400,
    80,
    [
        0xE6B59C,
        0xFFF7CE,
        0xE6D8B5,
        0xA5ABA5,
        0xC6DDCD,
    ],
    100,
    340,
    20,
    './img/Instagram_logo_2016.svg.webp',
));

// const call = () => {
//   const container = new Container();
//   const sprite = Sprite.from('https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png');
//
//   sprite.width = 512;
//   sprite.height = 512;
//
//   // Adds a sprite as a child to this container. As a result, the sprite will be rendered whenever the container
//   // is rendered.
//   container.addChild(sprite);
//
//   // Blurs whatever is rendered by the container
//
//   // Only the contents within a circle at the center should be rendered onto the screen.
//   container.mask = new Graphics()
//       .beginFill(0xffffff)
//       .drawCircle(sprite.width / 2, sprite.height / 2, Math.min(sprite.width, sprite.height) / 2)
//       .endFill();
//
//   app.stage.addChild(container);
// }
//
// call();
