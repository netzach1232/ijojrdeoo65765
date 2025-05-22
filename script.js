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


document.getElementById('searchInput').addEventListener('input', function (e) {
    const value = e.target.value.trim().toLowerCase();
    const products = document.querySelectorAll('#allProducts .product');

    let matchCount = 0;

    products.forEach(product => {
        const name = product.querySelector('.product-name').textContent.toLowerCase();
        const match = name.includes(value);
        product.style.display = match ? 'block' : 'none';
        if (match) matchCount++;
    });

    // מחביא פאגינציה בזמן חיפוש
    const pagination = document.getElementById('pagination');
    if (pagination) {
        pagination.style.display = value ? 'none' : 'flex';
    }
});


document.getElementById('searchInput').addEventListener('input', function (e) {
    const value = e.target.value.trim().toLowerCase();
    const products = document.querySelectorAll('#allProducts .product');

    if (value) {
        // בזמן חיפוש - הצג רק את התואמים והחבא פאגינציה
        let matchCount = 0;

        products.forEach(product => {
            const name = product.querySelector('.product-name').textContent.toLowerCase();
            const match = name.includes(value);
            product.style.display = match ? 'block' : 'none';
            if (match) matchCount++;
        });

        paginationContainer.style.display = 'none';
    } else {
        // כשהחיפוש ריק - חזור להצגה רגילה של עמוד 1
        showPage(1);
        paginationContainer.style.display = 'flex';
    }
});


// מוסיף פעולה לכל תמונה של מוצר
document.querySelectorAll('.product img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function () {
        const productName = this.parentElement.querySelector('.product-name').textContent;
        document.getElementById('selectedProductInput').value = productName;
        document.getElementById('orderFormModal').style.display = 'flex';
    });
});