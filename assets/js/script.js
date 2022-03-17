// declare global variables to access the buttons on the form page
var noAlleries = document.querySelector("#noA");
var yesAllergies = document.querySelector("#yesA");
var noDiet = document.querySelector("#noD");
var yesDiet = document.querySelector("#yesD");

// declare a variable to hold the api key
var apiKey = "58d17e2297ca4c9992ddc856f9e1ce2f";

// declare an array to hold the designated cuisines
var cuisines = ["American","African","British","Cajun","Caribbean","Chinese","Eastern European","French","German","Greek","Indian","Irish","Italian","Japanese","Jewish","Korean","Latin American","Mediterranean","Mexican","Middle Eastern","Nordic","Southern","Spanish","Thai","Vietamese"];
// declare an array to hold the allergies
var diets = ["Gluten Free","Ketogenic","Vegetarian","Vegan","Pescetarian","Paleo"];
// declare an array to hold the diet restrictions
var allergies = ["Dairy","Egg","Gluten","Grain","Peanut","Seafood","Sesame","Shellfish","Soy","Sulfite","Tree Nut","Wheat"];

// declare booleans to hold if the user chose any allergies or a diet
var noAllergySelected = false;
var noDietSelected = false;


// api URL to get just the allergies and cuisines
var selectedAllergyandCusineApiURL = "https://api.spoonacular.com/recipes/complexSearch/?apiKey="+apiKey+"&cuisine="+cuisines+"&intolerances="+allergies+"&number=15";

// api URL to get just the diet and cuisines
var selectedDietAndCusineApiURL = "https://api.spoonacular.com/recipes/complexSearch/?apiKey="+apiKey+"&cuisine="+cuisines+"&diet="+diets+"&number=15";

// api URL to get just the cuisines
var selectedCusineApiURL = "https://api.spoonacular.com/recipes/complexSearch/?apiKey="+apiKey+"&cuisine="+cuisines;

// api URL to get the selected cuisine, allergies, and diet
var selectedAllApiURL = "https://api.spoonacular.com/recipes/complexSearch/?apiKey="+apiKey+"&cuisine="+cuisines+"&intolerances="+allergies+"&diet="+diets+"&number=15";

// api URL to get the summary of the recipe chosen by the user
// var recipeSummaryURL = "https://api.spoonacular.com/recipes/"+id+"/information?apiKey="+apiKey

// declare an array to hold the list of id's from the displayed list of recepies
var recipeIdList = [];

// once the document loads hide the containers/elements that hold the allergies and diets
$(document).ready(function() {
    $("#allergies").hide();
});

$(document).ready(function() {
    $("#diets").hide();
});

// function to create the modal for an error
var createModal = function (error){
    $(".modal").addClass("is-active");
    $(".modal-content").text("Oops: We caought an error," + "\n" + error);
};

// function to close the error modal
$(".modal-close").click(function(){
    $(".modal").removeClass("is-active");
});

// function to loop through the data and save the id's of the receipes to show
var getRecipeIds = function(data){
    for (var i=0; i<data.results.length; i++){
        recipeIdList.push(data.results[i].id);
    }
};

//function for when the user clicks no to having any allergies, reset the array, and background color of the div
$("#no-allergies-btn").click(function(){
    noAllergySelected = true;
    allergies = ["Dairy","Egg","Gluten","Grain","Peanut","Seafood","Sesame","Shellfish","Soy","Sulfite","Tree Nut","Wheat"];
    $('#allergies').children().each(function () {
        $("#allergies h3").css("background-color", "");
    });
    noAllergySelected = false;
    $("#allergies").hide();
});

// function for when the user clicks yes to having allergies
$("#yes-allergies-btn").click(function(){
    // show the list of allergies
    $("#allergies").show();
});

// function for when the user clicks no to having any diet restrictions, reset the array, and the background color of the div
$("#no-diets-btn").click(function(){
    noDietSelected = true;
    diets = ["Gluten Free","Ketogenic","Vegetarian","Vegan","Pescetarian","Paleo"];
    $('#diets').children().each(function () {
        $("#diets h3").css("background-color", "");
    });
    $("#diets").hide();
});

// function for when the user clicks yes to having diet restrictions
$("#yes-diets-btn").click(function(){
    // show the list of diet restrictions
    $("#diets").show();
});

// function for when the user clicks within the allergy section
$("#allergies").click(function(event){
    // variable to hold the text of the allergy clicked
    var chosenAllergy = event.target.innerText;
    // variables used to set the background color of the item clicked
    var yellowColor = "rgb(255, 255, 0)";
    var transparentBg = "rgb(215, 215, 217)"
    // if statement to check if hte user has clicked on the item or not. if the background color is transparent chenge it to let the user know their selection & remove from the array. If it's already selected
    if ($(event.target).css("background-color") === transparentBg){
        $(event.target).css("background-color", "yellow");
        allergies = jQuery.grep(allergies, function(value) {
            return value != chosenAllergy;
          });    
    } else if ($(event.target).css("background-color") === yellowColor){
        // check if the item is already in the array, if so return. if not change the background color to transparent and add it to the array
        if (jQuery.inArray(chosenAllergy, allergies)!= -1){
            console.log(allergies);
            return;
        } else {
            $(event.target).css("background-color", "");
            allergies.push(chosenAllergy);
        };
    }
});

//function for when the user clicks within the diet restriction section
$("#diets").click(function(event){
    // variable to hold the text of the diet clicked item
    var dietRestriction = event.target.innerText;
    // variables used to set the background color of the item clicked
    var yellowColor = "rgb(255, 255, 0)";
    var transparentBg = "rgb(215, 215, 217)"
    // if statement to check if hte user has clicked on the item or not. if the background color is transparent chenge it to let the user know their selection & remove from the array. If it's already selected
    if ($(event.target).css("background-color") === transparentBg){
        $(event.target).css("background-color", "yellow");
        diets = jQuery.grep(diets, function(value) {
            return value != dietRestriction;
          });    
    } else if ($(event.target).css("background-color") === yellowColor){
        // check if the item is already in the array, if so return. if not change the background color to transparent and add it to the array
        if (jQuery.inArray(dietRestriction, diets)!= -1){
            console.log(allergies);
            return;
        } else {
            $(event.target).css("background-color", "");
            diets.push(dietRestriction);
        };
    }
});

// function for when the user clicks on one of the cusines they don't want
$("#cusines-section").click(function (event) {
    // variable to hold the text of the allergy clicked
    var chosenCuisine = event.target.innerText;
    // variables used to set the background color of the item clicked
    var yellowColor = "rgb(255, 255, 0)";
    var transparentBg = "rgb(215, 215, 217)"
    // if statement to check if hte user has clicked on the item or not. if the background color is transparent chenge it to let the user know their selection & remove from the array. If it's already selected
    if ($(event.target).css("background-color") === transparentBg) {
        $(event.target).css("background-color", "yellow");
        cuisines = jQuery.grep(cuisines, function (value) {
            return value != chosenCuisine;
        });
    } else if ($(event.target).css("background-color") === yellowColor) {
        // check if the item is already in the array, if so return. if not change the background color to transparent and add it to the array
        if (jQuery.inArray(chosenCuisine, cuisines) != -1) {
            return;
        } else {
            $(event.target).css("background-color", "");
            cuisines.push(chosenCuisine);
        };
    }
});


// TODO --- need to show how to display the modal and for user to chose selections
// function run when the user clicks to select the cusines
// $("#.CUSINEBUTTONCLASSNAME").click(function(){
//     for(var i=0; i<cuisines.length; i++){

//     }
// });

// TODO --- create a click event for when the user clicks submit that will call the fetch function using a if statement to check the users selections
$("#lets-eat").click(function(){
    console.log("ready to eat");
    // if no allergy is selected run the API for only the diets and cusines selected
    if (noAllergySelected && !noDietSelected){
        getApiInfo(selectedDietAndCusineApiURL);
    // if no diet is selected run the API for only the allergies and cusines selected    
    } else if (noDietSelected && !noAllergySelected){
        getApiInfo(selectedAllergyandCusineApiURL);
    // if no allergy or diet is selected run the API for only the cusines selected
    } else if (noAllergySelected && noDietSelected){
        getApiInfo(selectedCusineApiURL);
    } else {
    // if an allergy, diet and cusine are selected run the API for all of them
        getApiInfo(selectedAllApiURL);
    }
});


// function to fetch the data from the api
var getApiInfo = function(apiURL){
    // fetch to get the data from the API
    fetch(apiURL).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                getRecipeIds(data);
                console.log(data);

                // TODO --- add functionality to display the list of recipes through the for loop. Each list needs to have a data atribute associated with it to fetch the correct recipie API call (use $().attr('data-id, i))
                for (var i = 0; i<data.results.length; i++){
                    var recipeImg = data.results[i].image;
                    var recipeTitle = data.results[i].title;
                }
            });
        }
    
    })
    .catch(function(error){
        createModal(error)
    });

} 
