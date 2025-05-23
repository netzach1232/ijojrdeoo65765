const productsPerPage = 10;
const allProductsContainer = document.getElementById('allProducts');
const paginationContainer = document.getElementById('pagination');

// אוספים את כל המוצרים שנמצאים כרגע באתר
const allProducts = Array.from(allProductsContainer.querySelectorAll('.product'));
const totalPages = Math.ceil(allProducts.length / productsPerPage);

// טעינת חיפוש מהעבר
const savedSearch = localStorage.getItem("savedSearch");
if (savedSearch) {
    const input = document.getElementById("searchInput");
    input.value = savedSearch;
    triggerSearch(); // מבצע חיפוש אוטומטי עם הטקסט השמור
}

// שמירה כשמשנים
document.getElementById("searchInput").addEventListener("input", function () {
    localStorage.setItem("savedSearch", this.value);
});


// מציג עמוד לפי מספרו
function showPage(page) {
    // מחביאים את כל המוצרים
    allProducts.forEach((product, index) => {
        product.style.display = (index >= (page - 1) * productsPerPage && index < page * productsPerPage)
            ? 'block' : 'none';
    });

    // עדכון כפתורי ניווט
    renderPagination(page);
}

// יוצר כפתורי ניווט לעמודים
function renderPagination(currentPage) {
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = i === currentPage ? 'active' : '';
        btn.addEventListener('click', () => showPage(i));
        paginationContainer.appendChild(btn);
    }
}

// טוען עמוד ראשון כברירת מחדל
showPage(1);


// מוסיף פעולה לכל תמונה של מוצר
document.querySelectorAll('.product img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function () {
        const productName = this.parentElement.querySelector('.product-name').textContent;
        document.getElementById('selectedProductInput').value = productName;
        document.getElementById('orderFormModal').style.display = 'flex';
    });
});


function toggleAbout() {
    const banner = document.getElementById("aboutBanner");
    banner.style.display = (banner.style.display === "none" || banner.style.display === "") ? "block" : "none";
}

window.addEventListener("scroll", () => {
    const btn = document.getElementById("backToTop");
    btn.style.display = window.scrollY > 300 ? "block" : "none";
});

const backToAllWrapper = document.getElementById("backToAllWrapper");
backToAllWrapper.style.display = "none"; // ודא שהעטיפה מוסתרת בהתחלה


function triggerSearch() {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    let anyVisible = false;

    allProducts.forEach(product => {
        const name = product.querySelector('.product-name').textContent.toLowerCase();
        const match = name.includes(query);
        product.style.display = match ? 'block' : 'none';
        if (match) anyVisible = true;
    });

    document.getElementById("noResultsMessage").style.display = anyVisible ? "none" : "block";

    // מציג את כל הקופסה של הכפתור רק אם באמת חיפשו משהו
    if (query.length > 0) {
        backToAllWrapper.style.display = "block";
    } else {
        backToAllWrapper.style.display = "none";
    }

    paginationContainer.innerHTML = '';
}


document.getElementById("searchInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        triggerSearch();
    }
});

document.getElementById("backToAllBtn").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    document.getElementById("noResultsMessage").style.display = "none";
    backToAllWrapper.style.display = "none";
    allProducts.forEach(product => product.style.display = "block");
    showPage(1);
});

// שמירה אוטומטית של כל שדות הטופס
const form = document.querySelector("#orderFormModal form");
const fields = form.querySelectorAll("input, textarea");

fields.forEach(field => {
    const key = "form_" + field.name;

    // טען מהשמור אם קיים
    const saved = localStorage.getItem(key);
    if (saved) field.value = saved;

    // שמור כל שינוי
    field.addEventListener("input", () => {
        localStorage.setItem(key, field.value);
    });
});
