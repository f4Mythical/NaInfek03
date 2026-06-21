var section = document.getElementById('arkusze');
var checkboxy = document.querySelectorAll('input[name="rodzaj"]');

var nazwyJezykow = { html: 'HTML', javascript: 'JS', php: 'PHP', javascriptphp: 'JS + PHP' };
var nazwyMiesiecy = { styczen: 'Styczeń', czerwiec: 'Czerwiec', pazdziernik: 'Październik' };
var kolejnoscRodzaju = { 'INF.03': 0, 'EE.09': 1, 'E.14': 2 };
var kolejnoscMiesiecy = { czerwiec: 6, styczen: 1, pazdziernik: 10 };

function sortujArkusze(lista) {
    return lista.slice().sort(function(a, b) {
        var rA = kolejnoscRodzaju[a.rodzaj] != null ? kolejnoscRodzaju[a.rodzaj] : 99;
        var rB = kolejnoscRodzaju[b.rodzaj] != null ? kolejnoscRodzaju[b.rodzaj] : 99;
        if (rA !== rB) return rA - rB;
        if (b.rok !== a.rok) return b.rok - a.rok;
        var mA = kolejnoscMiesiecy[a.miesiac] || 0;
        var mB = kolejnoscMiesiecy[b.miesiac] || 0;
        return mB - mA;
    });
}

function numerZadania(id) {
    var czesci = id.split('-');
    return czesci[czesci.length - 1];
}

function pokażArkusze() {
    var widoczne = [];

    // Sprawdź czy coś jest zaznaczone
    var zaznaczono = false;
    for (var i = 0; i < checkboxy.length; i++) {
        if (checkboxy[i].checked) { zaznaczono = true; break; }
    }

    for (var i = 0; i < ARKUSZE.length; i++) {
        var a = ARKUSZE[i];
        var pasuje = true;

        if (zaznaczono) {
            pasuje = false;
            for (var j = 0; j < checkboxy.length; j++) {
                if (checkboxy[j].checked && checkboxy[j].value === a.jezyk) {
                    pasuje = true; break;
                }
            }
        }

        if (pasuje) widoczne.push(a);
    }

    widoczne = sortujArkusze(widoczne);

    if (widoczne.length === 0) {
        section.innerHTML = '<p class="pusty">Brak arkuszy dla wybranych filtrów.</p>';
        return;
    }

    var html = '';

    for (var i = 0; i < widoczne.length; i++) {
        var a = widoczne[i];
        var nazwaJezyka = nazwyJezykow[a.jezyk] || a.jezyk;
        var nazwaMiesiaca = nazwyMiesiecy[a.miesiac] || a.miesiac;
        var nrZad = numerZadania(a.id);

        html += '<div class="karta">';
        html += '<div class="karta-img-wrap">';
        html += '<img src="' + a.zdjecie + '" alt="' + a.nazwa + '" class="karta-img" loading="lazy">';
        html += '<div class="karta-overlay">';
        html += '<span class="karta-jezyk ' + a.jezyk + '">' + nazwaJezyka + '</span>';
        html += '</div>';
        html += '</div>';
        html += '<div class="karta-body">';
        html += '<div class="karta-meta">';
        html += '<span class="karta-rodzaj">' + a.rodzaj + '</span>';
        html += '<span class="karta-zad">zad. ' + nrZad + '</span>';
        html += '</div>';
        html += '<div class="karta-nazwa">' + a.nazwa + '</div>';
        html += '<div class="karta-data">';
        html += '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>';
        html += nazwaMiesiaca + ' ' + a.rok;
        html += '</div>';
        html += '<a href="arkusz.html?id=' + a.id + '" class="btn-sprobuj">Spróbuj sam</a>';
        html += '</div>';
        html += '</div>';
    }

    section.innerHTML = html;
}

for (var i = 0; i < checkboxy.length; i++) {
    checkboxy[i].addEventListener('change', pokażArkusze);
}

// Podgląd zdjęcia po kliknięciu
var podglad = document.getElementById('podglad');
var podgladImg = podglad.querySelector('img');

section.addEventListener('click', function(e) {
    var img = e.target.classList.contains('karta-img')
        ? e.target
        : e.target.closest('.karta-img-wrap') && e.target.closest('.karta-img-wrap').querySelector('.karta-img');
    if (img) {
        podgladImg.src = img.src;
        podglad.classList.add('aktywny');
    }
});

podglad.addEventListener('click', function(e) {
    if (e.target === podglad) podglad.classList.remove('aktywny');
});

pokażArkusze();