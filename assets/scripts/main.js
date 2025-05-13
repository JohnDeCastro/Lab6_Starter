// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
	// A9. TODO - Complete the functionality as described in this function
	//           header. It is possible in only a single line, but should
	//           be no more than a few lines.

	return JSON.parse(localStorage.getItem('recipes')) || [];
	//pull raw strings of 'recipes' and convert back to JS arrays via JSON.parse
	//if localStorage empty, returns [] empty array
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
	// A10. TODO - Get a reference to the <main> element
	const main = document.querySelector('main'); //get main tag ref to insert recipe cards

	// A11. TODO - Loop through each of the recipes in the passed in array,
	//            create a <recipe-card> element for each one, and populate
	//            each <recipe-card> with that recipe data using element.data = ...
	//            Append each element to <main>
	for(const recipe of recipes){//loop through objects in localStorage array
		const recipeCard = document.createElement('recipe-card');//create new card each
		recipeCard.data = recipe;//pass actual object to custom element
		main.appendChild(recipeCard);//add to page
	}
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	// EXPLORE - START (All explore numbers start with B)
	// B1. TODO - Complete the functionality as described in this function
	//            header. It is possible in only a single line, but should
	//            be no more than a few lines.
	localStorage.setItem('recipes', JSON.stringify(recipes));//takes array, convert to string, save under recipes
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
	// B2. TODO - Get a reference to the <form> element
	const form = document.getElementById('new-recipe');//referenece to form element
	// B3. TODO - Add an event listener for the 'submit' event, which fires when the
	//            submit button is clicked
	form.addEventListener('submit', (event) => { //the submit event listiner
		event.preventDefault(); //prevents page from refreshing

		//B4
		const formData = new FormData(form); //FormData object form form

		//B5
		const recipeObject = {}; //empty recipeObject object

		for(const [key, value] of formData.entries()){ //fills object with form entries
			recipeObject[key] = value;
		}

		//for troubleshooting. avoids including undefined blank cards
		if (!recipeObject.imgSrc || !recipeObject.titleTxt || !recipeObject.titleLnk) {
  		alert("Please fill out all required fields.");
  		return;
		}

		//B6
		const recipeCard = document.createElement('recipe-card'); //new recipe-card element

		//B7
		recipeCard.data = recipeObject; //assigns data

		//B8
		document.querySelector('main').appendChild(recipeCard); //appends card to main

		//B9
		const recipes = getRecipesFromStorage(); //gets current saved recipes from array
		recipes.push(recipeObject); //add new one to it
		saveRecipesToStorage(recipes); //save to localStorage
	})
	// Steps B4-B9 will occur inside the event listener from step B3
	// B4. TODO - Create a new FormData object from the <form> element reference above
	//const formData = new FormData(form); //FormData object form form
	// B5. TODO - Create an empty object (we'll refer to this object as recipeObject to
	//            make this easier to read), and then extract the keys and corresponding
	//            values from the FormData object and insert them into recipeObject
	//const recipeObject = {}; //empty recipeObject object
	//for(const [key, value] of formData.entries()){ //fills object with form entries
		//recipeObject[key] = value;
	//}
	// B6. TODO - Create a new <recipe-card> element
	//const recipeCard = document.createElement('recipe-card'); //new recipe-card element
	// B7. TODO - Add the recipeObject data to <recipe-card> using element.data
	//recipeCard.data = recipeObject; //assigns data
	// B8. TODO - Append this new <recipe-card> to <main>
	//document.querySelector('main').appendChild(recipeCard); //appends card to main
	// B9. TODO - Get the recipes array from localStorage, add this new recipe to it, and
	//            then save the recipes array back to localStorage
	//const recipes = getRecipesFromStorage(); //gets current saved recipes from array
	//recipes.push(recipeObject); //add new one to it
	//saveRecipesToStorage(recipes); //save to localStorage
	// B10. TODO - Get a reference to the "Clear Local Storage" button
	const clearButton = document.querySelector('.danger'); //gets reference to clear local storage button
	// B11. TODO - Add a click event listener to clear local storage button
	// Steps B12 & B13 will occur inside the event listener from step B11
	// B12. TODO - Clear the local storage
	// B13. TODO - Delete the contents of <main>
	clearButton.addEventListener('click', () => { //event listener for click to clear button
		localStorage.clear(); //clears local storage to delete recipes
		document.querySelector('main').innerHTML = ''; //wipes all recipes from DOM
	});
}
