// V. 1.1
// changelog:
// multiple line photo descriptions are not supported. That's caused by the multitude of styles represented by many writers. I don't know how to make an algorithm that's universal. Yet.
// added another diagnostic tool that's checking the amount of links before and after.
// line 239 and 250 are now incremental, instead od + 2. For testing purposes, but it seems to be a lot safer this way, no links are now missing.

// ___________LEAD/OPIS_________________


let lead = document.getElementById("description").value;
let leadEdited = "";
let leadLetters = lead.split("");
let savedIteratorValues = [];

// numery (indeksy) niepotrzebnych znaków (jedna ze spacji w podwojnych spacjach, nowe linie tekstu, inne niechciane znaki) są przechowywane w liście.
// Każda pętla po kolei ma za zadanie indeksowanie tych znaków. Zostaną one później wsadowo usunięte.
// Rozwiązanie ma na celu optymalizację wykorzystania zasobów i złożoności obliczeniowej.

if (leadLetters[0] === " ") // sprwadzam, czy przed pierwszym słowem występują spacje
{
	for (let i = 0; i < leadLetters.length; i++)  // usuwam spacje występujące przed pierwszym słowem
	{ 
		if (leadLetters[i] === " ")
		{
			savedIteratorValues.push(i);
			break;
		}
	}
}

for (let i = 0; i < leadLetters.length; i++)
{
	if (leadLetters[i] === "\n") // usuwam znaki nowych linii
	{
		savedIteratorValues.push(i);
		continue;
	}
	else if (leadLetters[i] === " ") // usuwam podwojne spacje (druga z dwoch spacji zostanie usunieta)
	{
		if (leadLetters[i + 1] < leadLetters.length) // nie chce, by funkcja wyszła poza długość listy
		{
			if (leadLetters[i + 1] === " ")
			{
				savedIteratorValues.push(i + 1);
				continue;
			}
		}
	}
	else if (leadLetters[i] === "&") // sprawdzam, czy w tekście występuje spacja niełamiąca. Niestety, konieczne jest sprawdzenie 6 znaków po kolei
	{
		if (leadLetters[i + 1] === "#" || "n")
		{
			if (leadLetters[i + 2] === "1" || "b")
			{
				if (leadLetters[i + 3] === "6" || "s")
				{
					if (leadLetters[i + 4] === "0" || "p")
					{
						if (leadLetters[i + 5] === ";")
						{
							savedIteratorValues.push(i, i + 1, i + 2, i + 3, i + 4, i + 5);
						}
					}
				}
			}
		}
	}
}

// usuwam znaki o okreslonych przez uprzednie pętle indeksach
for (let i = 0; i < savedIteratorValues.length; i++)
{
	leadLetters.splice(savedIteratorValues[i] - i, 1); // "[i] - i", ponieważ usunięcie znaku skraca długość listy
}

for (let i = 0; i < leadLetters.length; i++) // leadLetters musi zostać policzone ponownie, ponieważ pierwotna długość leada została skrócona
{
	leadEdited += leadLetters[i]; // do pustego stringa dodaję każdy sprawdzony znak
}

document.getElementById("description").value = leadEdited; // podmiana tekstu w tabelce "Opis"

// porównanie oryginalnego Leada z poprawnionym

console.log("Oryginalny Lead\n"+lead);
console.log("Poprawiony Lead\n"+leadEdited);

// ___________CALY_HTML_________________

let arrayToStoreArticleCode = "";
let articleCode = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("tinymce").innerHTML;
let letters = articleCode.split("");
let everyTagInNewLine = [];

// narzędzie diagnostyczne - sprawdzam długość artykułu przed wprowadzeniem zmian i drukuję tę liczbę do konsoli
let letterCount1 = document.getElementById("description").value.length; //LEAD
let letterCount2 = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("tinymce").innerText.length; //TEKST przed edycją

// pętla rozdziela każdy tag HTML do osobnej linijki
for (let i = 0; i < letters.length; i++)
{
	if (letters[i] === "<")
	{
		arrayToStoreArticleCode += "\n";
	}
	else if (letters[i] === ">")
	{
		arrayToStoreArticleCode += letters[i];
		arrayToStoreArticleCode += "\n";
		continue;
	}
	arrayToStoreArticleCode += letters[i];
}

everyTagInNewLine = arrayToStoreArticleCode.split("\n");

let imageCount1 = 0; // zliczam ilość zdjęć przed wprowadzeniem zmian
for (let i = 0; i < everyTagInNewLine.length; i++) // pętla usuwa puste elementy listy
{
	if (everyTagInNewLine[i].substring(0, 4) === "<img")
	{
		imageCount1++;
	}
}

let everyTagInNewLineWithoutEmptyOnes = []

for (let i = 0; i < everyTagInNewLine.length; i++) // pętla usuwa puste elementy listy
{
	if (everyTagInNewLine[i] !== "")
	{
		everyTagInNewLineWithoutEmptyOnes.push(everyTagInNewLine[i]);
	}
}

let linkCount1 = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByTagName("a").length; // sprawdzam ilość linków przed wprowadzaniem zmian do kodu HTML

let finalArticleArray = []

for (let i = 4; i < everyTagInNewLineWithoutEmptyOnes.length; i++) // zaczynam iterować pętle od 4, ponieważ pierwsze 3 tagi są związane z datą, którą zawsze usuwamy
{
	if (everyTagInNewLineWithoutEmptyOnes[i].substring(0, 4) === "<div") // usuwam tagi otwierające division
	{
		continue;
	}
	else if (everyTagInNewLineWithoutEmptyOnes[i].substring(0, 4) === "</di") // usuwam tagi zamykające division
	{
		continue;
	}
	else if (everyTagInNewLineWithoutEmptyOnes[i] === "<br>") // usuwam tagi break, dzięki temu kod staje się bardziej uniweralny niezależnie od redaktora.
	{
		continue;
	}
	else if (everyTagInNewLineWithoutEmptyOnes[i] === "<h3>") // h3 pozostaje niezmienione, nie usuwam ani nie dodaję paragrafów
	{
		finalArticleArray.push(everyTagInNewLineWithoutEmptyOnes[i]); // znalazłem <h3>
		switch (true)
		{
			case (everyTagInNewLineWithoutEmptyOnes[i + 1].substring(0, 1) !== "<"): // szukam treści, nie tagów HTML
				finalArticleArray.push(everyTagInNewLineWithoutEmptyOnes[i + 1]); // treść śródtytułu
				i = i + 2;
		}
	}
	else if (everyTagInNewLineWithoutEmptyOnes[i] === "</h3>") // tag kończący </h3> również pozostawiam bez zmian
	{
		finalArticleArray.push(everyTagInNewLineWithoutEmptyOnes[i]); // dodaję koniec śródtytułu
	}
	else if (everyTagInNewLineWithoutEmptyOnes[i][0] !== "<") // wybieram z HTML czysty tekst (w tym opisy zdjęć)
	{
		finalArticleArray.push("<p>");		
		finalArticleArray.push(everyTagInNewLineWithoutEmptyOnes[i]);
		finalArticleArray.push("</p>");
		continue;
	}
	finalArticleArray.push(everyTagInNewLineWithoutEmptyOnes[i]);
}

let stylingArray = ["<em>", "<i>", "<b>", "<a href", "<sub>", "<sup>"]; // tagi HTML określające styl i obecność linków. pogrubienia w trakcie tekstu zostają pominięte, ponieważ często są indykatorami wywiadu. Niestety, to konieczny kompromis, ze względu na mnogość autorów głosu i ich stylów
// , "<strong>" usunięte ze stylingArray, ponieważ częściej mamy do czynienia z wywiadami, niż boldem w środku artykułu
let finalArticleArrayToDelete = []

for (let i = 0; i < finalArticleArray.length; i++) // szukam tagów stylizujacych (em, strong, i itd.) i usuwam paragrafy, które je poprzedzają i które po nich nastepują. Usuwam też <p> występujące przed i po tagu oznaczającym koniec stylowania np. </em>. Stąd usuwane są łącznie 2 <p> i 2 </p>
{
	for (let j = 0; j < stylingArray.length; j++)
	{
		if (finalArticleArray[i].substring(0, 3) === stylingArray[j].substring(0, 3))
		{
			switch (true)
			{
				case (finalArticleArray[i - 1] === "</p>"):
					finalArticleArrayToDelete.push(i - 1);
				case (finalArticleArray[i + 1] === "<p>"):
					finalArticleArrayToDelete.push(i + 1);
				case (finalArticleArray[i + 3] === "</p>"):
					finalArticleArrayToDelete.push(i + 3);
				case (finalArticleArray[i + 5] === "<p>"):
					finalArticleArrayToDelete.push(i + 5);
			}
		}
	}
}

// usuwam <p> z przed tagów stylizujących tekst: <em>, <strong> itd. i </p> po tagach stylizujących tekst: </em>, </strong> itd)
for (let i = 0; i < finalArticleArrayToDelete.length; i++)
{
	finalArticleArray.splice(finalArticleArrayToDelete[i] - i, 1); // "[i] - i", ponieważ usunięcie znaku skraca długość listy
}

let finalArticleArrayWithPhotos = [];

for (let i = 0; i < finalArticleArray.length; i++) // wyciągam obrazki z tekstu
{
	if (finalArticleArray[i].substring(0, 4) === "<img") // sprawdzam, czy element jest zdjęciem
	{
		temp = []; // tymczasowy array do przechowywania poprawionego HTML opisujacego grafiki
		if (finalArticleArray[i + 1].substring(0, 4) === "<spa") // sprawdzam, czy zdjęcie ma podpis. Sprawdzana jest linijka pod "<img>", ponieważ po usunięciu breaków ("<br>") kod stał się uniwersalny niezależnie od redaktora.
		{
			temp.push('<figure class="image" contenteditable="false">'); // inny typ cudzysłowia, bo HTML zawiera już cudzysłów
			temp.push(finalArticleArray[i].substring(0, finalArticleArray[i].length - 1) + 'style="float: left";');
			temp.push('<figcaption = "">');
			temp.push('<figcaption contenteditable="true">');
			temp.push("<br>");		
			let j = i + 2; // przechodze od razu do opisu fotografii, który znajduje się 3 linijki pod tagiem <img> (numeruje po liczbach naturalnych (od 1))
			while (finalArticleArray[j] !== "</span>") // sprawdzam, czy nie wyszliśmy z tagu <img>
			{
				if (finalArticleArray[j][0] !== "<") // sprawdzam, czy linijka pod zdjęciem to opis, czy tag HTML
				{
					temp.push(finalArticleArray[j]);
					temp.push("<br>");
					j++;
				}
				else // jeżeli to paragraf, span, czy cokolwiek innego - nie wstawiam kolejnego breaka
				{
					temp.push(finalArticleArray[j]);
					j++;
				}
			}
			temp.push('</figcaption>');
			temp.push('</figure>');
			i = j + 1; // +2 szło za daleko...
		}
		else
		{
			temp.push('<figure class="image" contenteditable="false">');
			temp.push(finalArticleArray[i].substring(0, finalArticleArray[i].length - 1) + 'style="float: left";');
			temp.push('<figcaption = "">');
			temp.push('<figcaption contenteditable="true">');
			temp.push("<br>");
			temp.push('</figcaption>');
			temp.push('</figure>');
			i = i + 1; // pomijam zaczytane tagi HTML opisujace zdjecie, span, img itd...
		}
		for (let k = 0; k < temp.length; k++) // usuwam paragrafy z <img>
		{
			if (temp[k] === "<p>")
			{
				continue;
			}
			if (temp[k] === "</p>")
			{
				continue;
			}
			finalArticleArrayWithPhotos.push(temp[k]);
		}
	}
	finalArticleArrayWithPhotos.push(finalArticleArray[i]);
}

let editedArticle = "";

for (let i = 0; i < finalArticleArrayWithPhotos.length; i++) // wpisuje edytowany tekst do stringa, by moc podmienic zawartość TinyMCE
{
	editedArticle += finalArticleArrayWithPhotos[i];
}

document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("tinymce").innerHTML = editedArticle;

// narzędzie diagnostyczne - sprawdzam długość artykułu po wprowadzeniu zmian i drukuję tę liczbę do konsoli
let letterCount3 = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementById("tinymce").innerText.length;
let imageCount2 = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByTagName("img").length;
let linkCount2 = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByTagName("a").length;
console.log("artykuł (wraz z Leadem) miał", letterCount1 + letterCount2, "znaków.");
console.log("artykuł (wraz z Leadem) ma", letterCount1 + letterCount3, "znaków."); // letterCount1 (Lead) nie uległ zmianie. Nie ma sensu ponowne obliczanie jego długości
if (imageCount2 === imageCount1)
{
	console.log("artykuł miał", imageCount1, "zdjęć. Po edycji ma", imageCount2, "zdjęć. Liczba jest identyczna.");
}
else
{
	console.log("artykuł miał", imageCount1, "zdjęć. Po edycji ma", imageCount2, "zdjęć. Coś poszło nie tak.");
}
if (linkCount1 === linkCount2)
{
	console.log("artykuł miał", linkCount1, "linków. Po edycji ma", linkCount2, "linków. Liczba jest identyczna.");
}
else
{
	console.log("artykuł miał", linkCount1, "linków. Po edycji ma", linkCount2, "linków. Coś poszło nie tak.");
}