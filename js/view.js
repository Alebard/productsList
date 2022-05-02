export const UI = {
    PRODUCT_LIST: document.querySelector('.products_list'),
    CATEGORIES_LIST: document.querySelector('.manufacturers_categories'),
    STOCK_CHECKBOX: document.querySelector('.filters_stock__checkbox'),
    SORT: document.querySelector('.filters_sort'),
    SHOW_BY: document.querySelector('.filters_show'),
    PAGINATION_NAV : document.querySelector('.pagination'),
    PEVIEW_COUNT: document.querySelector('.preview_count'),
    PREVIEW_LINK: document.querySelector('.preview_link'),
    PREVIEW: document.querySelector('.preview')

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