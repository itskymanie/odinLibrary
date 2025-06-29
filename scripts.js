const myLibrary = [];
const dialog = document.getElementById("book-dialog");
const form = document.getElementById("book-form");
const newBookBtn = document.getElementById("new-book-btn");
const cancelBtn = document.getElementById("cancel-btn")

newBookBtn.addEventListener("click", () => dialog.showModal());
cancelBtn.addEventListener("click", () =>{
    form.reset();
    dialog.close();
})

form.addEventListener("submit",function(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const isRead = document.getElementById("read-checkbox").checked;

    addBookToLibrary(title, author, pages, isRead);
    displayLibrary();

    form.reset();
    dialog.close();

})

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
Book.prototype.toggleRead = function() {
    this.isRead = !this.isRead;
}

function displayLibrary(){
    const tableBody = document.getElementById("library-body");
    tableBody.innerHTML = "";

    for(const book of myLibrary){
        const row= document.createElement("tr");
        row.setAttribute("data-id", book.id);

        const titleCell = document.createElement("td");
        titleCell.textContent = book.title;

        const authorCell = document.createElement("td");
        authorCell.textContent = book.author;

        const pagesCell = document.createElement("td");
        pagesCell.textContent = book.pages;

        const readCell = document.createElement("td");
        readCell.textContent = book.isRead ? "Yes" : "No";
        
        const removeCell = document.createElement("td");
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove Book";
        removeBtn.addEventListener("click",function (e) {
            const row =e.target.closest("tr");
            const bookId = row.getAttribute("data-id");
            const index = myLibrary.findIndex(b => b.id === bookId);
            if(index !== -1){
                myLibrary.splice(index, 1);
                displayLibrary();
            }
        });
        removeCell.appendChild(removeBtn);

        const readBtnCell = document.createElement("td");
        const readBtn = document.createElement("button");
        readBtn.classList.add("toggle-read-btn");

        // Initial setup based on book state
        if (book.isRead) {
            readBtn.textContent = "✓ Read";
            readBtn.classList.add("read");
            readBtn.setAttribute("aria-pressed", "true");
            readBtn.setAttribute("aria-label", "Mark as unread");
        } else {
            readBtn.textContent = "Mark As Read";
            readBtn.setAttribute("aria-pressed", "false");
            readBtn.setAttribute("aria-label", "Mark as read");
        }

        // Keep readCell in sync
        readCell.textContent = book.isRead ? "Yes" : "No";

        // Event to toggle book.isRead and update button/label
        readBtn.addEventListener("click", () => {
            book.toggleRead();

            // Update readCell
            readCell.textContent = book.isRead ? "Yes" : "No";

            // Update button label and state
            if (book.isRead) {
                readBtn.textContent = "✓ Read";
                readBtn.classList.add("read");
                readBtn.setAttribute("aria-pressed", "true");
                readBtn.setAttribute("aria-label", "Mark as unread");
            } else {
                readBtn.textContent = "Mark As Read";
                readBtn.classList.remove("read");
                readBtn.setAttribute("aria-pressed", "false");
                readBtn.setAttribute("aria-label", "Mark as read");
            }
        });
        readBtnCell.appendChild(readBtn);


        row.appendChild(titleCell);
        row.appendChild(authorCell);
        row.appendChild(pagesCell);
        row.appendChild(readCell);
        row.appendChild(readBtnCell);
        row.appendChild(removeCell);

        tableBody.appendChild(row);

    }
}
