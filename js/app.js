import {manufacturersCategory, products} from "./main.js";
import {UI} from "./view.js";
import {renderProducts} from "./render.js";




export function changeInput() {
    const maxCount = Number(this.parentElement.parentElement.parentElement.previousElementSibling.lastElementChild.firstChild.textContent)
    const count = Number(this.value)
    let value = null

    if (count > maxCount) {
        value = maxCount
    } else if (count < 0) {
        value = 0
    } else {
        value = count
    }

    this.setAttribute('value', value);
    this.value = value
}

export function addCount() {
    const maxCount = Number(this.parentElement.parentElement.parentElement.previousElementSibling.lastElementChild.firstChild.textContent)
    const count = Number(this.previousElementSibling.value)
    if (count >= maxCount){
        return
    }
    this.previousElementSibling.setAttribute('value', count + 1);
    this.previousElementSibling.value = count + 1
}

export function delCount() {
    const count = Number(this.nextElementSibling.value)
    if (count < 1) return
    this.nextElementSibling.setAttribute('value', count - 1);
    this.nextElementSibling.value = count - 1
}

export function getProductImage(product) {
    return product.Image ? `${product.Image}` : `img/nonPhoto.png`
}

export function filterProductList() {
    const checkboxes = document.querySelectorAll('.manufacturer_checkbox')
    const filter = []
    checkboxes.forEach((item) => {
        if (item.checked === true) {
            filter.push(item.nextElementSibling.textContent.trim())
        }
    })
    const filteredProductsList = []
    filter.forEach((item) => {
        products.forEach((product) => {
            if (item === product.Manufacturer) {
                filteredProductsList.push(product)
            }
        })
    })
    UI.PRODUCT_LIST.innerHTML = '';
    filteredProductsList.length ? renderProducts(filteredProductsList) : renderProducts(products)
}

export function addCart(e) {
    e.preventDefault()

    const count = Number(this.parentElement.previousElementSibling.children[1].value)
    if (count === 0){
        alert('Выберите количество товара')
        return
    }

    const parent =this.parentElement.parentElement
    parent.style.display = 'none'
    parent.nextElementSibling.style.display = 'flex'
}