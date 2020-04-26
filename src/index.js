'use strict'

var contains = function (arr, elem) {
    let cont = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            cont = true;
        }
    }
    ;
    return cont;
}

class Area {

    constructor(areaId, outerClickHandler, winHandler) {
        this.areaId = areaId;
        this.firstOpenField = null;
        this.fields = [
            new Field('field_1', this.clickHandler.bind(this)),
            new Field('field_2', this.clickHandler.bind(this)),
            new Field('field_3', this.clickHandler.bind(this)),
            new Field('field_4', this.clickHandler.bind(this)),
            new Field('field_5', this.clickHandler.bind(this)),
            new Field('field_6', this.clickHandler.bind(this)),
            new Field('field_7', this.clickHandler.bind(this)),
            new Field('field_8', this.clickHandler.bind(this)),
            new Field('field_9', this.clickHandler.bind(this)),
            new Field('field_10', this.clickHandler.bind(this)),
            new Field('field_11', this.clickHandler.bind(this)),
            new Field('field_12', this.clickHandler.bind(this)),
        ];
        this.emojies = ['&#x1F436;',
            '&#x1F430;',
            '&#x1F437;',
            '&#x1F984;',
            '&#x1F43C;',
            '&#x1F43F;&#xFE0F;',
        ];
        this.previous = [null, null];
        this.outerClickhandler = outerClickHandler;
        this.winHandler = winHandler;
        this.openedPairs = 0;
    }

    clickHandler(field) {
        this.outerClickhandler();
        
        if (this.firstOpenField === null && !contains(this.previous, field) && !field.isBlocked) {
            if (this.previous[0] !== null && !this.previous[0].isBlocked && !this.previous[1].isBlocked) {
                this.previous[0].flip();
                this.previous[1].flip();
                this.previous[0].flipper.querySelector('.back').classList.remove('red_back');
                this.previous[1].flipper.querySelector('.back').classList.remove('red_back');
            }

            this.previous[0] = null;
            this.previous[1] = null;
            field.flip();
            this.firstOpenField = field;
            this.previous[0] = field;
        } else if (this.firstOpenField !== field && !contains(this.previous, field) && !field.isBlocked) {
            field.flip();

            if (field.emoji === this.firstOpenField.emoji) {
                this.openedPairs++;

                if (this.openedPairs == 6) {
                    this.winHandler();
                }

                field.isBlocked = true;
                this.firstOpenField.isBlocked = true;
                this.firstOpenField.flipper.querySelector('.back').classList.add('green_back');
                field.flipper.querySelector('.back').classList.add('green_back');
            } else {
                field.flipper.querySelector('.back').classList.add('red_back');
                this.firstOpenField.flipper.querySelector('.back').classList.add('red_back');
            }

            this.previous[1] = field;
            this.firstOpenField = null;
        }

    }

    fieldsInitiate() {
        let randomIndexes = this.getRandomIndexes();
        let fieldIdx = 0;
        let emojiIdx = 0;

        while (fieldIdx < randomIndexes.length) {
            this.fields[randomIndexes[fieldIdx++]].createBack(this.emojies[emojiIdx]);
            this.fields[randomIndexes[fieldIdx++]].createBack(this.emojies[emojiIdx++]);
        }
    }

    getRandomIndexes() {
        let indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        for (let i = indexes.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));

            if (j == i + 1) {
                j = i;
            }

            [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
        }

        return indexes;
    }

    removeBacks() {
        for (let i = 0; i < this.fields.length; i++) {
            this.fields[i].removeBack();
        }
    }

    newGame() {
        this.removeBacks();
        this.fieldsInitiate();
        this.openedPairs = 0;
        this.fields.forEach(field => {
            field.close();
            field.unblock();
        });
        this.firstOpenField = null;
        this.previous = [null, null];
    }
}

class Field {

    constructor(fieldId, clickHandler) {
        this.field = document.querySelector('#' + fieldId);
        this.clickHandler = clickHandler;
        this.flipper = document.querySelector('#' + fieldId).querySelector('.flipper');
        this.flipper.addEventListener('click', this.click.bind(this));
        this.isBlocked = false;
        this.emoji = null;
    }

    createBack(emoji) {
        this.flipper.insertAdjacentHTML('beforeend', '<div class="back">' + emoji + '</div>');
        this.emoji = emoji;
    }

    click() {
        this.clickHandler(this);
    }

    removeBack() {
        let back = this.flipper.querySelector('.back');

        if (back !== null && back !== undefined) {
            back.remove();
        }
    }

    flip() {
        this.flipper.classList.toggle('flip');
    }

    isBlocked() {
        return this.isBlocked;
    }

    close() {
        this.field.querySelector('.flipper').classList.remove('flip');
    }

    unblock() {
        this.isBlocked = false;
    }
}

class Timer {
    constructor(timerId, handler) {
        this.minutes = 0;
        this.seconds = 0;
        this.timerElem = document.querySelector('#' + timerId);
        this.updateTimerElem();
        this.handler = handler;
        this.timerId = null;
    }

    digitalString(num) {
        let digString = '' + num;

        if (num <= 9) {
            digString = 0 + digString;
        }

        return digString;
    }

    set(min, sec) {
        this.minutes = min;
        this.seconds = sec;
        this.updateTimerElem();
    }

    start() {
        this.timerId = setInterval(this.tick.bind(this), 1000);
    }

    tick() {
        if (this.minutes > 0 || this.seconds > 0) {
            if (this.seconds === 0) {
                this.minutes--;
                this.seconds = 59;
            } else {
                this.seconds--;
            }

            if (this.seconds === 0 && this.minutes === 0) {
                this.handler();
            }

            this.updateTimerElem();
        } else {
            this.stop();
        }
    }

    stop() {
        if (this.timerId !== null && this.timerId !== undefined) {
            clearInterval(this.timerId);
        }
    }

    reset() {
        this.stop();
        this.minutes = 0;
        this.seconds = 0;
        this.updateTimerElem();
    }

    updateTimerElem() {
        this.timerElem.innerHTML = this.digitalString(this.minutes) + ':' + this.digitalString(this.seconds);
    }
}

class Game {
    
    constructor() {
        this.area = new Area('game-place', this.clickCardOnStart.bind(this), this.winHandler.bind(this));
        this.timer = new Timer('timer', this.loseHandler.bind(this));
        this.isStarted = false;
        document.querySelector('#newGame').addEventListener('click', this.new.bind(this));
    }

    new() {
        this.timer.set(1, 0);
        this.area.newGame();
        document.querySelector('.popup').style.display = 'none';
    }
    
    clickCardOnStart() {
        if (!this.isStarted) {
            this.isStarted = true;
            this.timer.start();
        }
    }

    winHandler() {
        document.querySelector('.popup').style.display = '';
        document.querySelector('#popup__title').innerHTML = 'Win';
        document.querySelector('#newGame').innerHTML = 'Play again';
        this.timer.reset();
        this.isStarted = false;

    }

    loseHandler() {
        document.querySelector('.popup').style.display = '';
        document.querySelector('#popup__title').innerHTML = 'Lose';
        document.querySelector('#newGame').innerHTML = 'Try again';
        this.timer.reset();
        this.isStarted = false;
    }
}

var game = new Game();
game.new();

