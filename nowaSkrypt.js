// TO DO
// <h3> to be retained
// <br> inside photo frame when description has multiple lines


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
				
let finalArticleArray = []

for (let i = 4; i < everyTagInNewLineWithoutEmptyOnes.length; i++) // zaczynam iterować pętle od 4, ponieważ pierwsze 3 tagi są związane z datą, którą zawsze usuwamy
{
	if (everyTagInNewLineWithoutEmptyOnes[i] === "<div>") // usuwam tagi otwierające division
	{
		continue;
	}
	else if (everyTagInNewLineWithoutEmptyOnes[i] === "</div>") // usuwam tagi zamykające division
	{
		continue;
	}
	else if (everyTagInNewLineWithoutEmptyOnes[i] === "<br>") // usuwam tagi break
	{
		continue;
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

let stylingArray = ["<em>", "<strong>", "<i>", "<b>", "<a href"]; // tagi HTML określające styl i obecność linków
let finalArticleArrayToDelete = []

for (let i = 0; i < finalArticleArray.length; i++) // szukam tagów stylizujacych (em, strong, i itd.) i usuwam paragrafy, które je poprzedzają i które po nich nastepują. Usuwam też <p> występujące przed i po tagu oznaczającym koniec stylowania np. </em>. Stąd usuwane są łącznie 2 <p> i 2 </p>
{
	for (let j = 0; j < stylingArray.length; j++)
	{
		if (finalArticleArray[i].substring(0, 3) === stylingArray[j].substring(0, 3))
		{
			if (finalArticleArrayToDelete.push(i - 1) === "</p>")
			{
				finalArticleArrayToDelete.push(i - 1);
			}
			else if (finalArticleArrayToDelete.push(i + 1) === "<p>")
			{
				finalArticleArrayToDelete.push(i + 1);
			}
			else if (finalArticleArrayToDelete.push(i + 3) === "</p>")
			{
				finalArticleArrayToDelete.push(i + 3);
			}
			else if (finalArticleArrayToDelete.push(i + 5) === "<p>")
			{
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
		if (finalArticleArray[i + 1].substring(0, 4) === "<spa") // sprawdzam, czy zdjęcie ma podpis
		{
			temp.push('<figure class="image" contenteditable="false">'); // inny typ cudzysłowia, bo HTML zawiera już cudzysłów
			temp.push(finalArticleArray[i].substring(0, finalArticleArray[i].length - 1) + 'style="float: left";');
			temp.push('<figcaption = "">');
			temp.push('<figcaption contenteditable="true">');
			temp.push("<br>");		
			let j = i + 2; // przechodze od razu do opisu fotografii, który znajduje się 3 linijki pod tagiem <img>)
			while (finalArticleArray[j] !== "</span>")
			{
				temp.push(finalArticleArray[j]);
				j++;
			}
			temp.push('</figcaption>');
			temp.push('</figure>');
			// temp.push('<br>'); // break point dodawany po zdjeciu!
			i = j // pomijam zaczytane tagi HTML opisujace zdjecie, span, img itd...
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
			// temp.push('<br>'); // break point dodawany po zdjeciu!
			i = i + 2; // pomijam zaczytane tagi HTML opisujace zdjecie, span, img itd...
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
let imageCount2 = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByTagName("img").length
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