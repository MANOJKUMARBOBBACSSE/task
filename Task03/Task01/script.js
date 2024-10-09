
let books = [];
let borrowHistory = [];

document.getElementById('add-book-form').addEventListener('submit', addBook);
document.getElementById('search').addEventListener('input', searchBooks);


function addBook(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;

    const newBook = {
        title,
        author,
        category,
        borrowed: false
    };

    books.push(newBook);
    renderBooks();
    document.getElementById('add-book-form').reset();
}


function renderBooks() {
    const tbody = document.querySelector('#book-table tbody');
    tbody.innerHTML = ''; 

    books.forEach((book, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>${book.borrowed ? 'Borrowed' : 'Available'}</td>
            <td>
                <button class="borrow-btn" onclick="borrowBook(${index})">${book.borrowed ? 'Return' : 'Borrow'}</button>
                <button class="delete-btn" onclick="deleteBook(${index})">Delete</button>
            </td>
        `;

        tbody.appendChild(row);
    });
}


function borrowBook(index) {
    books[index].borrowed = !books[index].borrowed;

    if (books[index].borrowed) {
        borrowHistory.push(`Borrowed "${books[index].title}" on ${new Date().toLocaleString()}`);
    } else {
        borrowHistory.push(`Returned "${books[index].title}" on ${new Date().toLocaleString()}`);
    }

    renderBooks();
    renderHistory();
}


function deleteBook(index) {
    books.splice(index, 1);
    renderBooks();
}


function renderHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = ''; 

    borrowHistory.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = entry;
        historyList.appendChild(listItem);
    });
}


function searchBooks(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm)
    );

    const tbody = document.querySelector('#book-table tbody');
    tbody.innerHTML = '';

    filteredBooks.forEach((book, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>${book.borrowed ? 'Borrowed' : 'Available'}</td>
            <td>
                <button class="borrow-btn" onclick="borrowBook(${index})">${book.borrowed ? 'Return' : 'Borrow'}</button>
                <button class="delete-btn" onclick="deleteBook(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}
