var sceneIndex = 0;

console.log("hello world")

document.addEventListener('keydown', function (event) {
    if (event.key == " ") {
        sceneIndex = sceneIndex + 1
    }
});
