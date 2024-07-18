const ANSWER = WORDS[Math.floor(Math.random() * WORDS.length)]

let input = new Array(5);
let row = 0, col = 0, isWon = false;

document.addEventListener("keypress", function(event) {
	if (isWon || row == 6) return;

	var ch = String.fromCharCode(event.which);
	if (!('A' <= ch && ch <= 'Z' || 'a' <= ch && ch <= 'z')) return;
	$(".word")[row].children[col].innerText = input[col] = ch.toUpperCase();
	col++;

	if (col == 5) {
		var letters = $(".word")[row].children;

		var correct = 0;
		for (var i = 0; i < 5; i++) {
			letters[i].innerText = input[i];

			if (ANSWER.indexOf(input[i]) == -1) letters[i].setAttribute("style", "background-color: #454545;");
			else if (ANSWER[i] == input[i]) letters[i].setAttribute("style", "background-color: #52c41a;"), correct++;
			else letters[i].setAttribute("style", "background-color: #fadb14;");
		}

		if (correct == 5) isWon = true;

		row++, col = 0;
	}
});
