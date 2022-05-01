import {accordeon, UI} from "./view.js";
import {manufacturersCategory, products} from "./main.js";
import {
    addCart,
    addCount,
    changeInput,
    delCount,
    filterProductList,
    getProductImage,
} from "./app.js";


export function render() {
    renderCategories()
    renderProducts(products)
}

export function renderProducts(products) {
    products.forEach((product, index) => {
        const productNode = getProductNode(product)
        UI.PRODUCT_LIST.append((productNode))
        if (index < products.length - 1) {
            const hr = document.createElement('hr')
            UI.PRODUCT_LIST.append(hr)
        }
    })

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
            item.addEventListener('change', filterProductList)
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

