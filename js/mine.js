//hold the navbar items
var links = document.querySelectorAll('nav .nav-link');

for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(eventInfo) {
        var innerWord = eventInfo.target.innerHTML;
        getRecepies(innerWord);
    })
}



//ajax make the http request
var dataArray = [];

async function getRecepies(x) {

    let respo = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${x}`)



    let myData = await respo.json();
    dataArray = myData.recipes;

    displayData();
}
//call the data form the first time
getRecepies('tomato');
//display the DATA on the HTML page

var rowData = document.getElementById('rowData');

function displayData() {

    var div = '';

    for (var i = 0; i < dataArray.length; i++) {
        div += `   
          <div  class="col-md-3 mb-3">
            <div class="">
            <img data-toggle="modal" data-target="#exampleModal" src='${dataArray[i].image_url}' onclick='getSingleRecipe(${dataArray[i].recipe_id});' class='w-100'/> 
           
              <h2>${dataArray[i].title}</h2>
              <p>${dataArray[i].publisher}</p>
              <a class='btn btn-info' href='${dataArray[i].source_url}'>deatials</a>
            </div>
          </div>`;
    }

    rowData.innerHTML = div;
}

//get the recipe details

let recipeData;

async function getSingleRecipe(id) {

    let res = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    recipeData = await res.json();
    recipeData = recipeData.recipe;
    console.log(recipeData);

    displaySingleRecipe();

}

let modalBody = document.getElementById('modal-body');

function
displaySingleRecipe() {

    //display the ingradiants into a list
    var ingrediantsArr = [];
    for (var i = 0; i < recipeData.ingredients.length; i++) {
        ingrediantsArr += `<li>${recipeData.ingredients[i]}</li>`
    }

    let str = `<img src="${recipeData.image_url}" class="w-100" alt="">
    <h2>${recipeData.title}</h2>
    <p>${ingrediantsArr}</p>`;

    modalBody.innerHTML = str;
}

/*
const openModalBtns = document.querySelectorAll('[data-modal-target]');
const openCloseBtns = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalBtns.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    })
})

openCloseBtns.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.my-modal')
        closeModal(modal);
    })
})

function openModal(modal) {
    if (modal == null) {
        return
    }

    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal) {
    if (modal == null) {
        return
    }

    modal.classList.remove('active');
    overlay.classList.remove('active');
}
*/