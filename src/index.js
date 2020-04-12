var flippers = Array.from(document.querySelectorAll('.flipper'));
flippers.forEach(function (flipper) {
    flipper.addEventListener('click', function () {
        flipper.classList.toggle('flip');
    });
});