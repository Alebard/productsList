import {json} from "./products/products.js"
import {render} from "./render.js";

export let products = json
export const manufacturersCategory = ['СОБСТВЕННОЕ ПРОИЗВОДСТВО АВТОМОБИЛЬНЫХ ЗАВОДОВ','КОМПЛЕКТУЮЩИЕ-ЗАВОДОВ СМЕЖНИКОВ','ИМПОРТНЫЕ КОМПЛЕКТУЮЩИЕ','АЛЬТЕРНАТИВА']


render()