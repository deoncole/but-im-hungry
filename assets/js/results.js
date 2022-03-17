var recipeIdResults = [];

var apiKey = "58d17e2297ca4c9992ddc856f9e1ce2f";

// var recipeSummaryURL = "https://api.spoonacular.com/recipes/"+id+"/information?apiKey="+apiKey
// var recipeSummaryURL = "https://api.spoonacular.com/recipes/"+id+"/information?apiKey="+apiKey

$(document).ready(function () {
    var idList = localStorage.getItem("recipeList");
        recipeIdResults = JSON.parse(idList);
        console.log(recipeIdResults);
        
        for (var i=0; i<recipeIdResults.length; i++){
            var recipeSummaryURL = "https://api.spoonacular.com/recipes/"+recipeIdResults[i]+"/information?apiKey="+apiKey
            console.log(recipeSummaryURL);
            getApiInfo(recipeSummaryURL);
        }
});


// function to fetch the data from the api
var getApiInfo = function(apiURL){
    // fetch to get the data from the API
    fetch(apiURL).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data);

                var cardBodyEl = document.getElementById("my-results");
                var cardContainerEl = document.createElement("div");
                cardContainerEl.className = "column"

                var cardEl = document.createElement("div");
                cardEl.className = "card";
                var cardImg = document.createElement("img");
                cardImg.src = data.image;

                var cardContentEl = document.createElement("div");
                cardContentEl.className = "card-content";
                var cardTextEl = document.createElement("div");
                cardTextEl.textContent = data.title;

                var footerEl = document.createElement("footer");
                footerEl.className = "card-footer";
                var saveBtnEl = document.createElement('a');
                var delBtnEl = document.createElement('a');
                saveBtnEl.className = "card-footer-item"
                delBtnEl.className = "card-footer-item"
                var saveText = document.createTextNode("Save");
                var delText = document.createTextNode("View");
                saveBtnEl.appendChild(saveText);
                delBtnEl.appendChild(delText);
                footerEl.append(saveBtnEl);
                footerEl.append(delBtnEl);

                cardEl.appendChild(cardImg);
                cardContainerEl.appendChild(cardTextEl);
                cardContainerEl.appendChild(cardImg);
                cardContainerEl.appendChild(cardContentEl);
                cardContainerEl.appendChild(footerEl);
                cardBodyEl.appendChild(cardContainerEl);

            });
        }

    })
        .catch(function (error) {

        });
}
