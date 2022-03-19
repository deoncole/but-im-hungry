// arrays to hold the results from local storage and to put the user saved ids in local storage
var recipeIdResults = [];
var savedRecipeIDs = [];

// array to hold the list of saved recipies
var myRecipesList = [];

var apiKey = "58d17e2297ca4c9992ddc856f9e1ce2f";

// to run when the document loads
$(document).ready(function () {
    var idList = localStorage.getItem("recipeList");
        recipeIdResults = JSON.parse(idList);
        
        for (var i=0; i<recipeIdResults.length; i++){
            var recipeSummaryURL = "https://api.spoonacular.com/recipes/"+recipeIdResults[i]+"/information?apiKey="+apiKey
            getApiInfo(recipeSummaryURL);
        }
});

// function to check if local storage is empty or not
var checkLocalStorage = function(recipeId){
    if (localStorage.getItem("recipeIdList")===null){
        savedRecipeIDs.push(recipeId)
        localStorage.setItem("recipeIdList", JSON.stringify(savedRecipeIDs));
    } else if (localStorage.getItem("recipeIdList") != null){
        var idList = localStorage.getItem("recipeIdList");
        savedRecipeIDs = JSON.parse(idList);
        savedRecipeIDs.push(recipeId);
        localStorage.setItem("recipeIdList", JSON.stringify(savedRecipeIDs));
    }
};

  // create a class to hold the objects needed
  class mySavedRecipes {
    constructor(id, image, url,title) {
        this.id = id;
        this.image = image;
        this.url = url;
        this.title = title;
    }
}


// function to run when the user clicks save
var showMySavedRecipes = function (savedId){
    console.log(savedId);
    // check to see if the recipe id matches with the clicked id from the card. If so  present it to the user in the my recipe section
    for (var i = 0; i<myRecipesList.length; i++){
        console.log(myRecipesList[i].id);
        if (myRecipesList[i].id == savedId){
            console.log("it's a match");
            // TODO --- add image and link to the my list div.
                var cBodyEl = document.getElementById("my-recipes");
                var cContainerEl = document.createElement("div");
                cContainerEl.classList.add("column", "is-4")

                var cardRecipeEl = document.createElement("div");
                cardRecipeEl.className = "card";

                var cImg = document.createElement("img");
                cImg.className = "is-rounded";
                cImg.src = myRecipesList[i].image;

                var cTextEl = document.createElement("div");
                cTextEl.textContent = myRecipesList[i].title;

                var footerEl = document.createElement("footer");
                footerEl.className = "card-footer";

                var viewBtnEl = document.createElement('a');
                viewBtnEl.href = myRecipesList[i].url;
                viewBtnEl.target = "_blank";
                viewBtnEl.className = "card-footer-item";
                var delText = document.createTextNode("View");
                viewBtnEl.appendChild(delText);
                footerEl.append(viewBtnEl);

                cardRecipeEl.appendChild(cImg);
                cContainerEl.appendChild(cTextEl);
                cContainerEl.appendChild(cImg);
                cContainerEl.appendChild(footerEl);
                cBodyEl.appendChild(cContainerEl);

        } else {
            (console.log("we have a problem"));
        }
    }
}

// onclick to save the selected recipie id
$("#my-results").click(function(event){
    var savedId = event.target.getAttribute('data-id');
    // call the method to check local storage
    checkLocalStorage(savedId);
    showMySavedRecipes(savedId);
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

                var saving = new mySavedRecipes(data.id, data.image, data.spoonacularSourceUrl, data.title);
                myRecipesList.push(saving);

            });
        }

    })
        .catch(function (error) {

        });
}