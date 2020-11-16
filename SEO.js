//strona aplikacji webowej --> Baza słów kluczowych --> dodać kilka słów, które pasują do tematyki aktualności (muszą być oddzielone przecinkami)

let tagi = ""; //empty string

for (let i = 0; i < document.getElementsByClassName("table-keyword pull-left ng-star-inserted").length; i++)
{
    if (tagi.length + document.getElementsByClassName("table-keyword pull-left ng-star-inserted")[i].innerHTML.length > 500) //check whether or not the string will exceed 500 characters (limit set by eduweb360)
    {
        break; //if true, the loop will break
    }
    else
    { 
        tagi = tagi + (document.getElementsByClassName("table-keyword pull-left ng-star-inserted")[i].innerHTML) + ", "; //adding a comma after the keyword to fit the eduweb requirements
    };
};

console.log(tagi); //print the tags