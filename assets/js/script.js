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
var allergies = ["Diary","Egg","Gluten","Grain","Peanut","Seafood","Sesame","Shellfish","Soy","Sulfite","Tree Nut","Wheat"];

// declare booleans to hold if the user chose any allergies or a diet
var noAllergySelected = false;
var noDietSelected = false;

var apiURL = "https://api.spoonacular.com/recipes/complexSearch/?apiKey=58d17e2297ca4c9992ddc856f9e1ce2f&cuisine=American,Italian,Chinese&intolerances=dairy&diet=vegetarian";
// api URL to get just the allergies and cuisines
// var selectedAllergyandCusineApiURL = "https://api.spoonacular.com/recipes/complexSearch/?apiKey="+apiKey+"&cuisine="+cuisines+"&intolerances="+allergies+"&number=30";

// api URL to get just the diet and cuisines
// var selectedDietAndCusineApiURL = "https://api.spoonacular.com/recipes/complexSearch/?apiKey="+apiKey+"&cuisine="+cuisines+"&diet="+diets+"&number=30";

// api URL to get just the cuisines
// var selectedCusineApiURL = "https://api.spoonacular.com/recipes/complexSearch/?apiKey="+apiKey+"&cuisine="+cuisines;

// api URL to get the selected cuisine, allergies, and diet
// var selectedAllApiURL = "https://api.spoonacular.com/recipes/complexSearch/?apiKey="+apiKey+"&cuisine="+cuisines+"&intolerances="+allergies+"&diet="+diets+"&number=30";

// api URL to get the summary of the recipe chosen by the user
// var recipeSummaryURL = "https://api.spoonacular.com/recipes/"+id+"/information?apiKey="+apiKey

// declare an array to hold the list of id's from the displayed list of recepies
var recipeIdList = []

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
}


// TODO get whether or not user clicked no or yes and add a click event for the no and yes buttons
//function for when the user clicks not to having any allergies
$(".ALLERYBUTTONNOCLASSNAME").click(function(){
    noAllergySelected = true;
});

// function for when the user clicks yes to having allergies
// TODO need to show the modal or info to select the allergies
$(".ALLERYBUTTONYESCLASSNAME").click(function(){
    for(var i=0; i<allergies.length; i++){

    }
});

// function for when the user clicks no to having any diet restrictions
// TODO get whether or not user clicked no or yes and add a click event for the no and yes buttons
$(".DIETBUTTONNOCLASSNAME").click(function(){
    noDietSelected = true;
});

// function for when the user clicks yes to having diet restrictions
// TODO need to show the modal or info to select the allergies
$(".DIETBUTTONYESCLASSNAME").click(function(){
    for(var i=0; i<diets.length; i++){

    }
});

// TODO --- need to show how to display the modal and for user to chose selections
// function run when the user clicks to select the cusines
$(".CUSINEBUTTONCLASSNAME").click(function(){
    for(var i=0; i<cuisines.length; i++){

    }
});

// TODO --- create a click event for when the user clicks submit that will call the fetch function using a if statement to check the users selections
$(".SUBMITBUTTONCLASSNAME").click(function(){
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
// TODO --- Remove once the pages are connected
getApiInfo(apiURL);
