import {accordeon, UI} from "./view.js";
import {manufacturersCategory, products} from "./main.js";
import {
    addCart,
    addCount,
    changeInput,
    delCount,
    getProductImage, getProductsList,
} from "./app.js";
import {filterProductCategory} from "./filters.js";
import {renderPagination} from "./pagination.js";


export function render() {
    renderCategories()
    renderProducts()
}

export let pageNumber = 1
export let pagesCount
export let countProductsShow = Number(UI.SHOW_BY.value)

export function changeCountProductsShow(n) {
    countProductsShow = n
}

export function renderProducts() {
    UI.PRODUCT_LIST.innerHTML = ''
    const productsList = getProductsList();
    pagesCount = Math.ceil((productsList.length / countProductsShow))

    productsList.forEach((product, index) => {
        if (index > (countProductsShow * pageNumber - 1) || index < (countProductsShow * (pageNumber - 1))) {
            return false
        }
        const productNode = getProductNode(product)
        UI.PRODUCT_LIST.append((productNode))
        if (index < countProductsShow) {
            const hr = document.createElement('hr')
            UI.PRODUCT_LIST.append(hr)
        }
    })

    renderPagination()

    document.querySelectorAll('.add').forEach((btn) => {
        btn.addEventListener('click', addCount)
    })
    document.querySelectorAll('.del').forEach((btn) => {
        btn.addEventListener('click', delCount)
    })
    document.querySelectorAll('.cart_add__btns').forEach((btn) => {
        btn.addEventListener('click', addCart)
    })
    document.querySelectorAll('.input_count').forEach((input) => {
        input.addEventListener('change', changeInput)
    })

}


export function changePage(e) {
    document.querySelectorAll('.pagination_item').forEach((btn) => {
        btn.classList.remove('active')
    })
    const btn = e.target
    btn.classList.add('active')

    if( !btn.classList.contains('pagination_item') ){
        return
    }
    pageNumber = Number(btn.textContent)
    renderProducts()
    scrollTop()
}

let scrollTop = function() {
    if (document.body.scrollTop>0 || document.documentElement.scrollTop>0) {
        window.scrollBy(0,-100);
        setTimeout(scrollTop, 5);
    }
}

export function getPaginationNode(i) {
    const item = document.createElement('div');
    item.className = 'pagination_item';
    item.textContent = i;
    return item
}


function renderCategories() {
    manufacturersCategory.forEach((category) => {
        const productsManufacturer = new Set()
        products.forEach((product) => {
            if (product.Manufacturer_category.toLowerCase() === category.toLowerCase()) {
                productsManufacturer.add(product.Manufacturer)
            }
        })
        renderCategoriesList(category, productsManufacturer)
        document.querySelectorAll('.manufacturer_checkbox').forEach((item) => {
            item.addEventListener('change', filterProductCategory)
        })
    })
}


export function renderCategoriesList(category, productsManufacturer) {
    const manufacturersCategory = document.createElement('div')
    manufacturersCategory.className = 'manufacturers_category'
    const manufacturerTitle = document.createElement('div')
    manufacturerTitle.className = 'manufacturers_item__title'
    manufacturerTitle.innerHTML = category
    manufacturersCategory.append(manufacturerTitle)
    const manufacturersList = getManufacturersList(productsManufacturer)
    manufacturersCategory.append(manufacturersList)
    UI.CATEGORIES_LIST.append(manufacturersCategory)
    manufacturerTitle.addEventListener('click', accordeon)

}

function getManufacturersList(productsManufacturer) {
    const list = document.createElement('div')
    list.className = 'manufacturers_list'
    productsManufacturer.forEach((item) => {
        const label = document.createElement('label')
        label.className = 'manufacturer'
        label.innerHTML = `<input type="checkbox" class="manufacturer_checkbox">
                            <div class="manufacturer_title" >
                            ${item}
                            </div>
                            `
        list.append(label)
    })
    return list
}

function getProductNode(product) {
    const countClass = product.Stock > 0 ? 'blue' : ''
    const item = document.createElement('div')
    item.className = 'products_item product'
    item.innerHTML = `
        <div class="product_image">
        <img loading="lazy" src="${getProductImage(product)}" alt="">
        </div>
        <div class="product_info">
            <div class="product_title">
                ${product.Name}
            </div>
            <div class="product_link">
                <a href="#" class="product_logo">
                    <img src=${product.logo} alt="">
                </a>
                <a href="#" class="product_manufacturer">${product.Manufacturer}</a>
            </div>
            <div class="product_code">
                <span class="product_code__text">
                    Артикул:
                </span>
                ${product.Articul}
            </div>
        </div>
        <div class="product_price">
            <div class="price">
                ${product.Price} <span class="price_curency">₽</span>
            </div>
            <div class="price_text">Ваша цена</div>
            <div class="cart">
                <div class= "stock ${countClass}">
                    <div class="stock_text">
                        На складе:
                    </div>
                    <div class="stock_count">
                        ${product.Stock} <span class="stock_currency"> шт.</span>
                    </div>
                </div>
                <div class="cart_links">
                    <div class="cart_form">
                    <div class="cart_links__count">
                        <button class="del">-</button>
                        <input type="text" class="input_count" value="0">
                        <button class="add">+</button>
                    </div>
                    <div class="cart_links__add">
                        <button class="cart_add__btns" >
                            В корзину
                        </button>
                    </div>
                    </div>
                    <div class="cart_added">
                     Товар в<a href="#" onclick="return false">&nbsp;корзине</a>
                    </div>
                </div>
            </div>
        </div>
`
    return item
}

export function swipePage(e) {
    console.log(e.target.textContent)
    if (e.target.textContent === 'Предыдущая'){
        console.log(pageNumber)
        pageNumber -= 1
    }else{
        console.log(pageNumber)
        pageNumber += 1
    }
    scrollTop()
    renderProducts()
}

export function changePageNumber(n){
    pageNumber = n
}

export function previewProductsLength(){
    const products = getProductsList()
    UI.PEVIEW_COUNT.textContent = products.length
    UI.PREVIEW.classList.add('active')
}





