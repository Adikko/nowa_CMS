// Tytuł, link, kategoria artykułu
// do uzywania na glos.upwr.edu.pl

// wydruk z konsoli, ktory ponizszy skrypt utworzy:
// 1. przekopiowac do notatnika
// 2. save as type: all files 
// 3. NAZWA_PLIKU.csv (bardzo ważne, by csv)
// 4. encoding: UTF-8 with BOM
// 5. plik otwieramy w Excelu / Google sheets
// 6. kopiujemy odpowiednie 

for (let i = 0; i < document.getElementsByClassName("list-item-content").length; i++)
{
    console.log(",", document.getElementsByClassName("list-item-content")[i].getElementsByTagName("h3")[0].innerText + ",", //drukowany jest przecinek oraz tytuł artykułu. Zaczynamy od przecinku, ponieważ konsola wypisuje też adres debuggera (VM3663:3)
    document.getElementsByClassName("list-item-content")[i].getElementsByTagName("a")[0].href + ",", //drukowany jest link do artykułu
    document.getElementsByClassName("list-item-content")[i].getElementsByTagName("div")[0].innerText); //drukowana jest kategoria artykułu
}