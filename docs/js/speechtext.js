document.addEventListener("DOMContentLoaded", function () {
    var container = document.querySelector(".intro");

    var speeds = {
        pause: 500,
        slow: 120,
        normal: 60,
        fast: 20  
    };


    var textLines = [
        {string: "Hey there! My Name is Patrick :D", speed: speeds.normal},
        {string: "I'm an illustrator and animator based in Munich!", speed: speeds.normal},
        {string: "Feel free to browse my portfolio...", speed: speeds.normal},
        {string: "...and don't hesitate to reach out ♥ " , speed: speeds.normal},
    ];

    var characters = [];
    var currentIndex = 0; // Speichert, welches Element gerade angezeigt wird
    var isAnimating = false; // Verhindert mehrfaches Klicken während der Animation

    function startAnimation(index) {
        if (index >= textLines.length) return; // Beende, wenn alle Texte durch sind
        container.innerHTML = ""; // Löscht vorherigen Text

        var line = textLines[index];
        characters = [];

        line.string.split("").forEach((character) => {
            var span = document.createElement("span");
            span.textContent = character;
            container.appendChild(span);
            characters.push({
                span: span,
                isSpace: character === " " && !line.pause,
                delayAfter: line.speed,
                classes: line.classes || []
            });
        });

        isAnimating = true; // Blockiert weitere Klicks während der Animation
        revealOneCharacter([...characters], () => {
            isAnimating = false; // Nach der Animation wieder klickbar
        });
    }

    function revealOneCharacter(list, callback) {
        if (list.length === 0) {
            callback(); // Ruft Callback auf, wenn Animation fertig ist
            return;
        }

        var next = list.splice(0, 1)[0];
        next.span.classList.add("revealed");
        next.classes.forEach((c) => next.span.classList.add(c));
        var delay = next.isSpace && !next.pause ? 0 : next.delayAfter;

        setTimeout(function () {
            revealOneCharacter(list, callback);
        }, delay);
    }

    container.addEventListener("click", function () {
        if (isAnimating) return; // Blockiert Klicks während der Animation
        currentIndex++;
        if (currentIndex < textLines.length) {
            startAnimation(currentIndex);
        } else {
            currentIndex = 0; // Zurück zum Anfang, falls man durch ist
            startAnimation(currentIndex);
        }
    });

    // Starte mit der ersten Animation
    startAnimation(currentIndex);
});