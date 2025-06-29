const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
    this.isRead = isRead;
    this.summary = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages.`;
    };
}

function addBookToLibrary(title, author, pages, isRead){
    const myBook = new Book(title, author, pages, isRead);
    myLibrary.push(myBook);
}

function displayLibrary(){
    const tableBody = document.getElementById("library-body");
    tableBody.innerHTML = "";

    for(const book of myLibrary){
        const row= document.createElement("tr");

        const titleCell = document.createElement("td");
        titleCell.textContent = book.title;

        const authorCell = document.createElement("td");
        authorCell.textContent = book.author;

        const pagesCell = document.createElement("td");
        pagesCell.textContent = book.pages;

        const readCell = document.createElement("td");
        readCell.textContent = book.isRead ? "Yes" : "No";

        row.appendChild(titleCell);
        row.appendChild(authorCell);
        row.appendChild(pagesCell);
        row.appendChild(readCell);

        tableBody.appendChild(row);

    }
}
