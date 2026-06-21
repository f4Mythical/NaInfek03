var btnPodglad = document.getElementById("btnPodglad");
var btnArkusz = document.getElementById("btnArkusz");
var podgladBox = document.getElementById("podgladBox");
var arkuszBox = document.getElementById("arkuszBox");

btnPodglad.addEventListener("click", function () {
    podgladBox.style.display = "block";
    arkuszBox.style.display = "none";

    btnPodglad.classList.add("aktywne");
    btnArkusz.classList.remove("aktywne");
});

btnArkusz.addEventListener("click", function () {
    arkuszBox.style.display = "block";
    podgladBox.style.display = "none";

    btnArkusz.classList.add("aktywne");
    btnPodglad.classList.remove("aktywne");
});

var trybySpany = document.querySelectorAll(".tryb");

function wypelnijKod(parametr) {
    var span;

    if (parametr === "html") {
        span = trybySpany[0];
    } else if (parametr === "css") {
        span = trybySpany[1];
    } else if (parametr === "skrypt") {
        span = trybySpany[2];
    }

    span.classList.toggle("aktywne");

    // tutaj w przyszlosci wypelnianie pola kodu
}