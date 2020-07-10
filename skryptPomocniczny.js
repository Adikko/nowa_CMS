// Skrypt do aktywacji w aktualnościach na starej stronie UPWr

// Sprawdzam jakie są węzły artykułu i zapisuję je w nodeArray
let nodeArray = [];
for (let i = 0; i < document.getElementById("content").children.length; i++)
{
    nodeArray.push(document.getElementById("content").children[i].className);
}

// DŁUGOSĆ ARTYKUŁÓW: (uwzglednia niestety date)
console.log("Długość artykułu: " + document.getElementsByClassName("medium-8 columns content")[0].innerText.length + " znaków. Ta liczba może się różnić od liczby z panelu Nowej o +/- 10%.");

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
let imageLinks;
let allLinks = document.getElementsByClassName("medium-8 columns content")[0].getElementsByTagName("a").length; //zliczam wszystkie linki (niestety łącznie z tagami)
let tagsLinks = document.getElementsByClassName("tags")[0].getElementsByTagName("a").length; //zliczam linki
if (nodeArray.includes("images naked floatbox")) //sprawdzam, czy strona ma galerię. Nie mogę liczyć nieistniejącego elementu...
{
    imageLinks = document.getElementsByClassName("images naked floatbox")[0].getElementsByTagName("a").length; //każdy obrazek podglądowy jest linkiem do zdjęcia w pełnej rodzielczosci, trzeba to wziac pod uwage
}
else
{
    imageLinks = 0;
    console.log("Nie ma galerii!");
}
let socialLinks = document.getElementsByClassName("addthis_sharing_toolbox")[0].getElementsByTagName("a").length; //zliczam linki do mediów społecznościowych
let articleLinks = allLinks - tagsLinks - socialLinks - imageLinks;
console.log("Ilość linków: " + articleLinks);

// ZDJĘCIA:
let everyImage = document.getElementsByClassName("medium-8 columns content")[0].getElementsByTagName("img").length;
let galleryImages;
if (nodeArray.includes("images naked floatbox")) //sprawdzam, czy strona ma galerię. Nie mogę liczyć nieistniejącego elementu...
{
    galleryImages = document.getElementsByClassName("images naked floatbox")[0].getElementsByTagName("img").length;
    console.log("Jest galeria.");
}
else
{
    galleryImages = 0;
}
let imageCount = everyImage - galleryImages;
console.log("Ilość zdjęć: " + imageCount);


// AUTOR:
if (document.getElementsByClassName("authors").length > 0)
{
    console.log('Autor artykułu: ' + document.getElementsByClassName("authors")[0].innerText);    
}
else
{
    console.log('Brak autora.');
}