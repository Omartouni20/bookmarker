var bookmarks = [];

function handleFormSubmit(e) {
    e.preventDefault();  

    var siteName = document.getElementById("site-name").value;
    var siteURL = document.getElementById("site-url").value;

    if (!siteName || !siteURL) {
        alert("Please fill all fields.");
        return;
    }

    var bookmark = { name: siteName, url: siteURL };
    bookmarks.push(bookmark);
    saveBookmarks();  
    renderTable();    
    document.getElementById("bookmark-form").reset();  
}

function renderTable() {
    var table = document.getElementById("bookmark-table");
    table.innerHTML = ""; 

    for (var i = 0; i < bookmarks.length; i++) {
        var bookmark = bookmarks[i];
        table.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${bookmark.name}</td>
                <td><button class="btn btn-success btn-sm" onclick="visitBookmark('${bookmark.url}')">Visit</button></td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteBookmark(${i})">Delete</button></td>
            </tr>
        `;
    }
}

function saveBookmarks() {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function loadBookmarks() {
    var storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) {
        bookmarks = JSON.parse(storedBookmarks);
        renderTable();
} }

function visitBookmark(url) {
    window.open(url, "_blank"); 
}

function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    saveBookmarks();  
    renderTable();   
}

window.onload = loadBookmarks;