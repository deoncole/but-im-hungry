var recipeIdResults = [];

var apiKey = "58d17e2297ca4c9992ddc856f9e1ce2f";

// var recipeSummaryURL = "https://api.spoonacular.com/recipes/"+id+"/information?apiKey="+apiKey
// var recipeSummaryURL = "https://api.spoonacular.com/recipes/"+id+"/information?apiKey="+apiKey

$(document).ready(function () {
    var idList = localStorage.getItem("recipeList");
        recipeIdResults = JSON.parse(idList);
        
        for (var i=0; i<recipeIdResults.length; i++){
            var recipeSummaryURL = "https://api.spoonacular.com/recipes/"+recipeIdResults[i]+"/information?apiKey="+apiKey
            getApiInfo(recipeSummaryURL);
        }
});


$("#my-results").click(function(event){
    console.log(event.target);
    var savedId = event.target.getAttribute('data-id');
    console.log(savedId);
})

// function to fetch the data from the api
var getApiInfo = function(apiURL){
    // fetch to get the data from the API
    fetch(apiURL).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data);

                var cardBodyEl = document.getElementById("my-results");
                var cardContainerEl = document.createElement("div");
                cardContainerEl.classList.add("column", "is-4", "cardId")

                var cardEl = document.createElement("div");
                cardEl.className = "card";
                var cardImg = document.createElement("img");
                cardImg.className = "is-rounded";
                cardImg.src = data.image;

                var cardTextEl = document.createElement("div");
                cardTextEl.textContent = data.title;

                var footerEl = document.createElement("footer");
                footerEl.className = "card-footer";
                var saveBtnEl = document.createElement('a');
                saveBtnEl.setAttribute('onclick', 'saveRecipe()');
                saveBtnEl.setAttribute('data-id', data.id);
                
                var viewBtnEl = document.createElement('a');
                viewBtnEl.href = data.spoonacularSourceUrl;
                viewBtnEl.target = "_blank";
                saveBtnEl.classList.add("card-footer-item","saveBtn");
                viewBtnEl.className = "card-footer-item";
                var saveText = document.createTextNode("Save");
                var delText = document.createTextNode("View");
                saveBtnEl.appendChild(saveText);
                viewBtnEl.appendChild(delText);
                footerEl.append(saveBtnEl);
                footerEl.append(viewBtnEl);

                cardEl.appendChild(cardImg);
                cardContainerEl.appendChild(cardTextEl);
                cardContainerEl.appendChild(cardImg);
                cardContainerEl.appendChild(footerEl);
                cardBodyEl.appendChild(cardContainerEl);

            });
        }

    })
        .catch(function (error) {

        });
}