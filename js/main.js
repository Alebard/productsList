import {json} from "./products/products.js"
import {renderCategoriesList, renderProducts} from "./render.js";
export let products = json
export let manufacturersCategory = new Set()

function render() {
    renderProducts()

    manufacturersCategory.forEach((category) => {
        const productsManufacturer = new Set()
        products.forEach((product) => {
            if (product.Manufacturer_category === category) {
                productsManufacturer.add(product.Manufacturer)
            }
        })
        renderCategoriesList(category, productsManufacturer)
    })

}


render()