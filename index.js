function book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

function display() {

}
display.prototype.add = function (Book) {
    tableBody = document.getElementById("tableBody")
    console.log("add to ui")
    let uistring = `<tr>
                        <td>${Book.name}</td>
                        <td>${Book.author}</td>
                        <td>${Book.type}</td>
                    </tr>`
    tableBody.innerHTML += uistring;
}
display.prototype.clear = function () {
    let libraryForm = document.getElementById("libraryForm")
    libraryForm.reset();
}
display.prototype.validate = function (Book) {
    if (Book.name.length <2|| Book.author.length < 2 ){
        return false;
    }
    else{
        return true;
    }
}
display.prototype.show = function(type,message){
    let ShowMessage = document.getElementById("message")
    ShowMessage.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Messge:</strong> ${message}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
    setTimeout(function() {
        ShowMessage.innerHTML = ''
    }, 2000);
}

display.prototype.localstorage = function (Book) {
    console.log(Book)
    let tbody = document.getElementById("tableBody")
    let storage = localStorage.getItem("storage")
    if (storage == null){
        bookStoreObj = [];
    }
    else {
        bookStoreObj = JSON.parse(storage)
    }
    bookStoreObj.push(Book.name,Book.author,Book.type)
     localStorage.setItem("storage", JSON.stringify(bookStoreObj))
}

let libraryForm = document.getElementById("libraryForm")
libraryForm.addEventListener("submit", libraryFormSubmit)
function libraryFormSubmit(e) {
    console.log("you have submit form")
    let name = document.getElementById("bookName").value
    let author = document.getElementById("author").value
    let type;

    let fiction = document.getElementById("fiction")
    let programming = document.getElementById("programming")
    let cooking = document.getElementById("cooking")

    if (fiction.checked) {
        type = fiction.value
    } else if (programming.checked) {
        type = programming.value
    } else if (cooking.checked) {
        type = cooking.value
    }
    let Book = new book(name, author, type)
    console.log(Book)

    let Display = new display();
    if (Display.validate(Book)) {
        Display.add(Book);
        Display.clear();
        Display.show('Success','Your book has been successfully added')
    } else {
        Display.show('Danger', 'Sorry you cannot add this book')
    }
    // Display.showLibrary(libraryFormSubmit)
    Display.localstorage(Book);
    // Display.showLibrary();
   
    e.preventDefault();

}

// function showLibrary(){
//     let name = document.getElementById("bookName").value
//     let author = document.getElementById("author").value
//     let type;

//     let fiction = document.getElementById("fiction")
//     let programming = document.getElementById("programming")
//     let cooking = document.getElementById("cooking")

//     if (fiction.checked) {
//         type = fiction.value
//     } else if (programming.checked) {
//         type = programming.value
//     } else if (cooking.checked) {
//         type = cooking.value
//     }
//     let Book = new book(name, author, type)
//     console.log(Book)
// }