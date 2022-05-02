import {changeCountProductsShow, changePageNumber, previewProductsLength, renderProducts} from "./render.js";
import {changeProducts, products, productsArr} from "./main.js";
import {UI} from "./view.js";

export function filterProductCategory() {
    changeProducts(productsArr)
    const checkboxes = document.querySelectorAll('.manufacturer_checkbox')
    const filter = []
    checkboxes.forEach((item) => {
        if (item.checked === true) {
            filter.push(item.nextElementSibling.textContent.trim())
        }
    })

    if (filter.length < 1) {
        renderProducts()
        UI.PREVIEW.classList.remove('active')
        return
    }


    const filteredProductsList = []
    filter.forEach((item) => {
        products.forEach((product) => {
            if (item === product.Manufacturer) {
                filteredProductsList.push(product)
            }
        })
    })

    changeProducts(filteredProductsList)
    previewProductsLength()
}



export function stockChekboxChange() {
    this.parentElement.classList.toggle('checked')
    changePageNumber(1)
    renderProducts()
}

export function showBy() {
    changeCountProductsShow(UI.SHOW_BY.value)
    changePageNumber(1)
    renderProducts()
}

export function filterStock(products) {
    let productsList = products
    if (UI.STOCK_CHECKBOX.checked) {
        productsList = products.filter((product) => product.Stock > 0)
    }
    return productsList
}

export function sortedProducts() {
    let filteredProductsList
    const sortType = UI.SORT.value
    if (sortType === 'price-high') {
        filteredProductsList = sortPriceHigh()
    } else if (sortType === 'price-low') {
        filteredProductsList = sortPriceLow()
    }else if (sortType === 'a-z'){
        filteredProductsList = sortNameAB()
    }else if(sortType === 'z-a'){
        filteredProductsList = sortNameBA()
    }
    changeProducts(filteredProductsList)
}

export function sortBy() {
    sortedProducts()
    changePageNumber(1)
    renderProducts()
}

function sortPriceHigh() {
    return products.sort((a, b) => {
        if (a.Price > b.Price) {
            return -1;
        }
        if (a.Price < b.Price) {
            return 1;
        }
        return 0;
    })
}

function sortPriceLow() {
   return products.sort((a, b) => {
        if (a.Price > b.Price) {
            return 1;
        }
        if (a.Price < b.Price) {
            return -1;
        }
        return 0;
    })
}

function sortNameAB() {
   return products.sort((a, b) => {
        if (a.Name > b.Name) {
            return 1;
        }
        if (a.Name < b.Name) {
            return -1;
        }
        return 0;
    })
}

function sortNameBA() {
   return products.sort((a, b) => {
        if (a.Name > b.Name) {
            return -1;
        }
        if (a.Name < b.Name) {
            return 1;
        }
        return 0;
    })
}


