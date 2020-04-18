'use strict'

class Area {
    let firstOpenField = null;
    let fields = {
        'field_1':new Field('field_1'),
        'field_2':new Field('field_2')
        'field_3':new Field('field_3'),
        'field_4':new Field('field_4'),
        'field_5':new Field('field_5'),
        'field_6':new Field('field_6'),
        'field_7':new Field('field_7'),
        'field_8':new Field('field_8'),
        'field_9':new Field('field_9'),
        'field_10':new Field('field_10'),
        'field_11':new Field('field_11'),
        'field_12':new Field('field_12'),
    }
    
    emojies = ['&#x1F436;',
        '&#x1F430;',
        '&#x1F437;',
        '&#x1F984;',
        '&#x1F43C;',
        '&#x1F43F;&#xFE0F;',
    ]
    
    constructor(areaId) {
        this.areaId = areaId;
    }
    
    clickHandler() {
        
    }
}

class Field {
    let fieldId;
    let emoji;
    let isRevert = false;
    let isBlock = false;
    let clickHandler;

    constructor(fieldId, emoji, clickHandler) {
        this.field = document.querySelector(fieldId);
        this.field.addEventListener(click());
        this.emoji = emoji;
        this.clickHandler = clickHandler;
    }

    click() {
        this.clickHandler(this);
    }
}


var flippers = Array.from(document.querySelectorAll('.flipper'));
flippers.forEach(function (flipper) {
    flipper.addEventListener('click', function () {
        flipper.classList.toggle('flip');
    });
});

