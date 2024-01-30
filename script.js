import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-58e32-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const linkFieldEl = document.getElementById("link-field")
const addButtonEl = document.getElementById("add-button")
const clearButtonEl = document.getElementById("clear-button")
const shoppingListEl = document.getElementById("shopping-list")

inputFieldEl.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault()
        document.getElementById("add-button").click()
    }
})

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    let linkValue = linkFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearFieldsEl()
    
    appendToShoppingList(inputValue, linkValue)
})

clearButtonEl.addEventListener("click", function() {
    shoppingListEl.innerHTML = ""
})

function clearFieldsEl() {
    inputFieldEl.value = ""
    linkFieldEl.value = ""
}

function appendToShoppingList(itemValue, linkValue) {
    shoppingListEl.innerHTML += `<a href='${linkValue}' target='_blank'><li>${itemValue}</li></a>`
}