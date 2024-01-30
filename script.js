import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-58e32-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const clearButtonEl = document.getElementById("clear-button")
const shoppingListEl = document.getElementById("shopping-list")

inputFieldEl.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault()
        document.getElementById("add-button").click()
    }
})

clearButtonEl.addEventListener("click", function() {
    clearButton()
})

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    if (inputValue != "") {
        push(shoppingListInDB, inputValue)  
    }

    clearFieldsEl()    
})

onValue(shoppingListInDB, function(snapshot) {
    
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl()
    
        for (let i=0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemValue = currentItem[1]
            let currentItemID = currentItem[0]
    
            appendToShoppingList(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = ""
    }
})

function appendToShoppingList(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let removeID = ref(database, `shoppingList/${itemID}`)
        remove(removeID)
    })
    
    shoppingListEl.append(newEl)
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearButton() {
    let clear = ref(database, `shoppingList`)
    remove(clear)
}

function clearFieldsEl() {
    inputFieldEl.value = ""}