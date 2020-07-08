// Skrypt do aktywacji w aktualnościach na starej stronie UPWr

// DŁUGOSĆ ARTYKUŁÓW: (uwzglednia niestety date)
console.log("Długość artykułu: " + document.getElementsByClassName("medium-8 columns content")[0].innerText.length + " znaków. Ta liczba może się różnić od liczby z panelu Nowej o +/- 5%.");

// CYTATY:
let quoteArray = [];
for (let i = 0; i < document.getElementsByTagName("blockquote").length; i++)
{
    quoteArray.push(document.getElementsByTagName("blockquote")[i].innerText);
}
console.log("Ilość cytatów: " + quoteArray.length); //wypisuje cytaty dopiero wtedy, gdy jakies sie w tekscie pojawiaja
if (quoteArray.length > 0)
{
    console.log(quoteArray);
}

// LINKI:
let allLinks = document.getElementsByClassName("medium-8 columns content")[0].getElementsByTagName("a").length; //zliczam wszystkie linki (niestety łącznie z tagami)
let tagsLinks = document.getElementsByClassName("tags")[0].getElementsByTagName("a").length; //zliczam linki
let socialLinks = document.getElementsByClassName("addthis_sharing_toolbox")[0].getElementsByTagName("a").length; //zliczam linki do mediów społecznościowych
let articleLinks = allLinks - tagsLinks - socialLinks;
console.log("Ilość linków: " + articleLinks);

// ZDJĘCIA:
console.log("Ilość zdjęć: " + document.getElementsByClassName("medium-8 columns content")[0].getElementsByTagName("img").length);


// AUTOR:
if (document.getElementsByClassName("authors").length > 0)
{
    console.log('Autor artykułu: ' + document.getElementsByClassName("authors")[0].innerText);    
}
else
{
    console.log('Brak autora.');
}