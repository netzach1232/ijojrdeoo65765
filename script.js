const productsPerPage = 10;
const allProductsContainer = document.getElementById('allProducts');
const paginationContainer = document.getElementById('pagination');

// אוספים את כל המוצרים שנמצאים כרגע באתר
const allProducts = Array.from(allProductsContainer.querySelectorAll('.product'));
const totalPages = Math.ceil(allProducts.length / productsPerPage);

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


// גלילה למוצר הראשון בתוצאות אחרי לחיצה על Enter
document.getElementById('searchInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();

        // מציאת המוצר הראשון שמוצג (לא מוסתר)
        const firstVisibleProduct = Array.from(document.querySelectorAll('#allProducts .product'))
            .find(p => p.style.display !== 'none');

        if (firstVisibleProduct) {
            // גלילה רכה למוצר
            firstVisibleProduct.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // סגירת המקלדת במובייל
            this.blur();
        } else {
            alert("לא נמצאו מוצרים מתאימים.");
        }
    }
});
