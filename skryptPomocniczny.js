// AUTOR:
console.log('<p style="text-align: right;">' + document.getElementsByClassName("authors")[0].innerText + '</p>')

// CYTAT:
for (let i = 0; i < document.getElementsByTagName("blockquote").length; i++)
{
    console.log("<blockquote>\n" + document.getElementsByTagName("blockquote")[i].innerText + "</blockquote>");
}

// DŁUGOŚĆ ARTYKUŁÓW
// Stara: (uwzglednia niestety date)
document.getElementsByClassName("medium-8 columns content")[0].innerText.length;