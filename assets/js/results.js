// arrays to hold the results from local storage and to put the user saved ids in local storage
var recipeIdResults = [];
var savedRecipeIDs = [];

var myRecipesList = [];
var mySavedRecipes = {
    id: "",
    image: "",
    recipeURL: ""
};

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

// onclick to save the selected recipie id
$("#my-results").click(function(event){
    var savedId = event.target.getAttribute('data-id');
    // call the method to check local storage
    checkLocalStorage(savedId);
});

var showMySavedRecipes = function (savedId){
    for (var i = 0; i<myRecipesList.length; i++){
        if (savedId === myRecipesList[i].id){
            // TODO --- add image and link to the my list div.
        }
    }
}

// function to fetch the data from the api
var getApiInfo = function(apiURL){
    // fetch to get the data from the API
    fetch(apiURL).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                // console.log(data);

                mySavedRecipes.id = data.id;
                mySavedRecipes.image = data.image;
                mySavedRecipes.recipeURL = data.spoonacularSourceUrl;

                myRecipesList.push(mySavedRecipes);

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