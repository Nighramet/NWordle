const ANSWER = WORDS[Math.floor(Math.random() * WORDS.length)]

let input = new Array(5);
let row = 0, col = 0, isWon = false;

$(document).on("keypress", event => {
	if (isWon || row == 6) return;

	if (65 <= event.which && event.which <= 90 || 97 <= event.which && event.which <= 122) {
		$(".word")[row].children[col].innerText = input[col] = String.fromCharCode(event.which).toUpperCase();
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
	}
});

$(document).on("keydown", function(event) {
	if (isWon || row == 6) return;

	if (event.keyCode == 8) {
		if (col == 0) return;

		$(".word")[row].children[--col].innerText = "";
	}
});

window.onload = () =>
	$("#share").on("click", () => {
		var arr = Array.from({ length: 6 }, () => Array.from({ length: 5 }).fill("")); //new String[6][5]

		for (var i = 0; i < 6; i++)
			for (var j = 0; j < 5; j++) {
				arr[i][j] = $(".word")[i].children[j].innerText;
				$(".word")[i].children[j].innerText = "";
			}

		html2canvas($("#main")[0], {
			backgroundColor: null,
		}).then(canvas => {
			var image = canvas.toDataURL();

			var today = new Date();
			var dateString = (today.getFullYear() % 100) + (today.getMonth() + 1).toString().padStart(2, '0') + today.getDate().toString().padStart(2, '0');

			var downloader = $("<a>").attr("href", image).attr("download", "NWordle-Share-" + dateString + ".png").appendTo("body");
			downloader[0].click();
			downloader.remove();
		});

		for (var i = 0; i < 6; i++)
			for (var j = 0; j < 5; j++)
				$(".word")[i].children[j].innerText = arr[i][j];
	})
