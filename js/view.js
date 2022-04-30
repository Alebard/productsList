export const UI = {
    PRODUCT_LIST: document.querySelector('.products_list'),
    CATEGORIES_LIST: document.querySelector('.manufacturers_categories')

}

export function accordeon() {
    const list = this.nextElementSibling
    if(list.classList.contains('active')){
        list.classList.toggle('active')
    }else{
        document.querySelectorAll('.manufacturers_list').forEach((item) =>{
            item.classList.remove('active')
        })
        list.classList.toggle('active')
    }
}