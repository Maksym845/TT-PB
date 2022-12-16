import {Application, Container, Graphics, Sprite, Text} from 'pixi.js';
import {DropShadowFilter} from "@pixi/filter-drop-shadow";

const app = new Application({
  background: '#000000',
  width: 800,
  height: 800,
});

document.body.appendChild(app.view as HTMLCanvasElement);

interface Button {
}

type Font = {
    fontFamily: string,
    fontSize: number,
    fill: number,
}

class Button {
  createButton(
    buttonWidth: number = 100,
    buttonHeight: number = 60,
    buttonColor: number[],
    x: number = 0,
    y: number = 0,
    round: number,
    img: string,
    title: string,
    font: Font,
  ) {
    const container = new Container();
    container.sortableChildren = true;
    container.interactive = true;
    container.cursor = 'pointer';

    let lengthOfButtons = 0;
    const len = buttonColor.length;
    const square = buttonWidth / len;
    const { fontFamily,fontSize, fill} = font;
    const maxSquares = Math.floor(buttonWidth / Math.max(50, buttonWidth / len));

    console.log(maxSquares);

    container.x = x;
    container.y = y;

    if (buttonWidth < 100) {
        buttonWidth = 100;
    }

    if (buttonHeight < 60) {
        buttonHeight = 60;
    }

    const rectangle = new Graphics();

    for (let i = 0; i < maxSquares; i++) {
      rectangle.beginFill(buttonColor[i], 1);
      rectangle.drawRect(
          x + lengthOfButtons,
          y,
          Math.max(50, buttonWidth / len),
          buttonHeight
      );
      rectangle.endFill();

      container.addChild(rectangle);

      lengthOfButtons += Math.max(50, buttonWidth / len);
    }

    let colorIsChanged = false;
    let children: Graphics[] = [];

    // events

    container.on('pointertap', ()  => {
        colorIsChanged = !colorIsChanged;

        lengthOfButtons = 0;

        const rect = new Graphics();

        for (let i = 0; i < maxSquares; i++) {
            const color = Math.floor(Math.random() * (16777215 + 1));

            if (colorIsChanged) {
                rect.beginFill(color, 1);
                rect.drawRect(
                    x + lengthOfButtons,
                    y,
                    Math.max(50, buttonWidth / len),
                    buttonHeight
                );
                rect.endFill();
                rect.zIndex = 0;

                container.addChild(rect);
                children.push(rect);

                lengthOfButtons += Math.max(50, buttonWidth / len);
            }

            if (!colorIsChanged) {
                container.removeChild(children[i]);
                children = [];
            }
        }
    });

    container.on('mouseover', () => {
        container.filters = [new DropShadowFilter({
            color: 0xffffff,
            distance: 10,
        })];
        container.transform.scale.set(1.05, 1.05);
        container.mask = new Graphics()
            .beginFill(0xffffff)
            .drawRoundedRect(
                x * 2 + (x * 0.05),
                y * 2 + (y * 0.05),
                buttonWidth + (buttonWidth * 0.05),
                buttonHeight + (buttonHeight * 0.05),
                round
            )
            .endFill();
    });

    container.on('mouseleave', () => {
        container.filters = [];
        container.transform.scale.set(1, 1);
        container.mask = mask;
    });

    // adding mask

    const mask = new Graphics()
        .beginFill(0xffffff)
        .drawRoundedRect(
            x * 2,
            y * 2,
            buttonWidth,
            buttonHeight,
            round
        )
        .endFill();

    container.mask = mask;

    // adding text

    const text = new AddText().ceateText(
        title,
        fontFamily,
        fontSize,
        fill,
        container
    );

    text.position.set(x + (buttonWidth / 2), y + (buttonHeight / 2));

    // adding icon

    const sprite = new AddIcon().createIcon(img, container, buttonHeight);

    sprite.position.set(
        (x + buttonWidth - (buttonHeight - 20) / 2) - (square / 2),
        y + ((buttonHeight - (buttonHeight - 20)) / 2)
    );

    // returning ready to use button

    return container;
  }
}

class AddText {
    public ceateText(
        title: string,
        fontFamily: string,
        fontSize: number,
        fill: number,
        container: Container,
    ) {
        const text = new Text(title, {
            fontFamily,
            fontSize,
            fill,
        });

        container.addChild(text);

        text.zIndex = 1;
        text.anchor.set(0.5, 0.5);

        return text;
    };
}

class AddIcon {
    createIcon(
        img: string,
        container: Container,
        height: number,
    ) {
        const sprite = Sprite.from(img);

        sprite.zIndex = 1;
        sprite.height = height - 20;
        sprite.width = height - 20;

        container.addChild(sprite);

        return sprite;
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
    'starbucks',
    {
        fontFamily: 'Arial',
        fontSize: 42,
        fill: 0x000000,
    }
));

app.stage.addChild(button.createButton(
    400,
    80,
    [
        0x8AB363,
        0xFFC410,
        0xFF8C67,
        0xECDCC3,
        0xF0EFEF,
    ],
    100,
    100,
    20,
    './img/Instagram_logo_2016.svg.webp',
    'instagram',
    {
        fontFamily: 'Arial',
        fontSize: 42,
        fill: 0x000fff,
    }
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
    160,
    20,
    './img/Twitter-logo.svg.png',
    'twitter',
    {
        fontFamily: 'Arial',
        fontSize: 42,
        fill: 0x000000,
    }
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
    220,
    20,
    './img/600px-Apple-logo.png',
    'apple',
    {
        fontFamily: 'Arial',
        fontSize: 42,
        fill: 0x000000,
    }
));
