const form = document.querySelector("#book-form")
const tbody = document.getElementById("book-list")


function addBook(kitab){

let tr = document.createElement('tr')//<tr></tr>
tr.innerHTML = `
<td>${kitab.title}</td>
<td>${kitab.author}</td>
<td>${kitab.isbn}</td>
<td><a href="#" class="btn btn-danger float-right delete">X</a></td>
`
tbody.appendChild(tr)

}


function clearAllFields(){
    document.querySelector("#title").value = ""
    document.querySelector("#author").value = ""
    document.querySelector("#isbn").value = ""
}

function showAlert(className,msg){
    const div = document.createElement("div")//<div></div>
    div.className = `alert alert-${className}`
    div.appendChild(document.createTextNode(msg))
    const container = document.querySelector(".container")
    const form = document.querySelector("#book-form")
    container.insertBefore(div,form)    
    setTimeout(()=>{
        document.querySelector(".alert").remove()
    },2000)
}

function deletebook(e){
if(e.target.classList.contains("delete")){
   if(confirm("Are You Sure U to want to delete this book")){
    e.target.parentElement.parentElement.remove()
   }
}
}

function getBooks(){
    let books ;
    if(localStorage.getItem("mybooks") === null){
        books = []
    }else{
        books = JSON.parse(localStorage.getItem("mybooks"))
    }
return books
}

function storeBook(kitab){
    let books = getBooks()
    books.push(kitab)
    localStorage.setItem("mybooks",JSON.stringify(books))
}

function showAllBooks(){
    const books = getBooks()
    books.forEach(function(book){
       addBook(book)
    })
}


form.addEventListener("submit",(e)=>{
    e.preventDefault()
    let title = document.querySelector("#title").value
    let author = document.querySelector("#author").value
    let isbn = document.querySelector("#isbn").value
    if(title == "" || author == "" || isbn == ""){
        showAlert("danger","Please Add all the Fields")
        return;
    }
    const book = {title,author,isbn}
    addBook(book)
    showAlert("success","Book Added Successfully")
    storeBook(book)
    clearAllFields()
})

tbody.addEventListener("click",deletebook)

window.addEventListener("DOMContentLoaded",showAllBooks)