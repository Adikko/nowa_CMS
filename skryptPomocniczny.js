// Skrypt do aktywacji w aktualnościach na starej stronie UPWr

// DŁUGOSĆ ARTYKUŁÓW: (uwzglednia niestety date)
console.log("długość artykułu: " + document.getElementsByClassName("medium-8 columns content")[0].innerText.length + " znaków.");

// AUTOR:
console.log('autor artykułu: ' + document.getElementsByClassName("authors")[0].innerText)

// CYTATY:
let quoteArray = [];
for (let i = 0; i < document.getElementsByTagName("blockquote").length; i++)
{
    quoteArray.push(document.getElementsByTagName("blockquote")[i].innerText);
}
console.log("Ilość cytatów: " + quoteArray.length);
console.log(quoteArray);

// LINKI:
let allLinks = document.getElementsByClassName("medium-8 columns content")[0].getElementsByTagName("a").length; //zliczam wszystkie linki (niestety łącznie z tagami)
let tagsLinks = document.getElementsByClassName("tags")[0].getElementsByTagName("a").length; //zliczam linki
let articleLinks = allLinks - tagsLinks;
console.log("Ilość linków: " + articleLinks);

// ZDJĘCIA:
console.log("Ilość zdjęć: " + document.getElementsByClassName("medium-8 columns content")[0].getElementsByTagName("img").length);
