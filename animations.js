function mount() {
    setTimeout(() => {
        document.getElementById("mainText").innerHTML = "I'm Fate";
        reset_animation();
    }, 4000);
    setTimeout(() => {
        document.getElementById("mainText").innerHTML = "Or you might know me as Ritvik";
        reset_animation();
    }, 8000);
    setTimeout(() => {
        document.getElementById("mainText").innerHTML = "Welcome to my portfolio";
    }, 12000);
    setTimeout(() => {
        document.getElementById("a").style.display = "block";
        reset_animation2(); 
        reset_animation3();
    }, 12000);
}

function reset_animation() {
    var el = document.getElementById('mainText');
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = null;
}

function reset_animation2() {
    var el = document.getElementById('divhr');
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = null;
}
function reset_animation3() {
    var el = document.getElementById('divhr2');
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = null;
}


mount()