'use strict'

var contains = function (arr, elem) {
    let cont = false;
    for (let i = 0;i < arr.length;i++) {
        if (arr[i] === elem) {
            cont = true;
        }
    };
    return cont;
}

class Area {

    constructor(areaId) {
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
    }

    clickHandler(field) {
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

    newGame = function () {
        this.removeBacks();
        this.fieldsInitiate();
    }
}

class Field {

    constructor(fieldId, clickHandler) {
        let f = document.querySelector('#' + fieldId);
        let fl = f.querySelector('.flipper');
        this.fieldId = fieldId;
        this.field = f;
        this.clickHandler = clickHandler;
        this.flipper = fl;
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
}

var area = new Area('game-place');
area.newGame();

