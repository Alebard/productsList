import {accordeon, UI} from "./view.js";
import {manufacturersCategory, products} from "./main.js";

export function renderProducts() {
    products.forEach((product, index) => {
        manufacturersCategory.add(product.Manufacturer_category)
        const productNode = getProductNode(product)
        UI.PRODUCT_LIST.append((productNode))
        if (index < products.length - 1) {
            const hr = document.createElement('hr')
            UI.PRODUCT_LIST.append(hr)
        }
    })
    document.querySelectorAll('.add').forEach((btn)=>{
        btn.addEventListener('click', addCount)
    })
    document.querySelectorAll('.del').forEach((btn)=>{
        btn.addEventListener('click', delCount)
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
        label.innerHTML = `<input type="checkbox">
                            <div class="manufacturer_title">
                            ${item}
                            </div>
                            `
        list.append(label)
    })
    return list
}

function getProductNode(product) {
    const item = document.createElement('div')
    item.className = 'products_item product'
    item.innerHTML = `
        <div class="product_image">
        <img src="${getProductImage(product)}" alt="">
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
                <div class="stock">
                    <div class="stock_text">
                        На складе:
                    </div>
                    <div class="stock_count">
                        ${product.Stock} <span class="stock_currency"> шт.</span>
                    </div>
                </div>
                <div class="cart_links">
                    <div class="cart_links__count">
                        <button class="del">-</button>
                        <input type="text" class="input_count" value="1">
                        <button class="add">+</button>
                    </div>
                    <div class="cart_links__add">
                        <button class="cart_add__btns">
                            В корзину
                        </button>
                    </div>
                </div>
            </div>
        </div>
`
    return item
}


export function addCount() {
    const count = Number(this.previousElementSibling.value)
    this.previousElementSibling.setAttribute('value', count + 1);
}
export function delCount() {
    const count = Number(this.nextElementSibling.value)
    if (count < 1) return
    this.nextElementSibling.setAttribute('value', count - 1);
}

function getProductImage(product) {
    return product.Image ? `${product.Image}` : `img/nonPhoto.png`
}