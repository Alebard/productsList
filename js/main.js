import {json} from "./products/products.js"
import {render} from "./render.js";
import {UI} from "./view.js";
import {showBy, sortBy, stockChekboxChange} from "./filters.js";
import {linkPreview} from "./app.js";

export let productsArr = json;
export let products = productsArr;

export const manufacturersCategory = ['СОБСТВЕННОЕ ПРОИЗВОДСТВО АВТОМОБИЛЬНЫХ ЗАВОДОВ', 'КОМПЛЕКТУЮЩИЕ-ЗАВОДОВ СМЕЖНИКОВ', 'ИМПОРТНЫЕ КОМПЛЕКТУЮЩИЕ', 'АЛЬТЕРНАТИВА'];

UI.STOCK_CHECKBOX.addEventListener('change', stockChekboxChange);
UI.SORT.addEventListener('change', sortBy);
UI.SHOW_BY.addEventListener('change', showBy);
UI.PREVIEW_LINK.addEventListener('click', linkPreview)


render();

export function changeProducts(productsList) {
    products = productsList
}

