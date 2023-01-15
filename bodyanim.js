function mount() {
    setTimeout(() => {
        document.getElementById("welc").innerHTML = "Welcome";
        reset_animation();
    }, 5000);
    setTimeout(() => {
        document.getElementById("welc2").innerHTML = "Scroll Down";
        reset_animation2();
    }, 6000);
}

function reset_animation() {
    var el = document.getElementById('welc');
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = null;
}

function reset_animation2() {
    var el = document.getElementById('welc2');
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = null;
}

mount()