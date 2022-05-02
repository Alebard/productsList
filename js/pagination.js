import {UI} from "./view.js";
import {changePage, getPaginationNode, pageNumber, pagesCount, swipePage} from "./render.js";


export function renderPagination() {
    UI.PAGINATION_NAV.innerHTML = ''
    if (pageNumber > 1) {
        renderSwipeBtn('Предыдущая')
    }
    if (pagesCount < 10) {
        for (let i = 1; i <= pagesCount; i++) {
            const paginationNode = getPaginationNode(i)
            UI.PAGINATION_NAV.append(paginationNode)
        }
    } else {
        if (pageNumber < 6) {
            for (let i = 1; i <= 6; i++) {
                const paginationNode = getPaginationNode(i)
                UI.PAGINATION_NAV.append(paginationNode)
            }
            renderDotsPagination()
            renderLastPaginationBtn()
        } else if (pageNumber >= pagesCount - 4) {
            renderFirstPaginationBtn()
            renderDotsPagination()
            for (let i = pageNumber - 2; i <= pagesCount; i++) {
                const paginationNode = getPaginationNode(i)
                UI.PAGINATION_NAV.append(paginationNode)
            }
        } else if (pageNumber > 4 && pageNumber < pagesCount - 1) {
            renderFirstPaginationBtn()
            renderDotsPagination()
            for (let i = pageNumber - 1; i <= pageNumber + 1; i++) {
                const paginationNode = getPaginationNode(i)
                UI.PAGINATION_NAV.append(paginationNode)
            }
            renderDotsPagination()
            renderLastPaginationBtn()
        }
    }
    if (pageNumber < pagesCount) {
        renderSwipeBtn('Следующая')
    }
    document.querySelectorAll('.pagination_item').forEach((btn) => {
        btn.addEventListener('click', changePage)
    })

    document.querySelectorAll('.pagination_item').forEach((btn) => {
        if (Number(btn.textContent) === pageNumber) {
            btn.classList.add('active')
        }
    })
}


function renderFirstPaginationBtn() {
    const paginationNode = getPaginationNode(1)
    UI.PAGINATION_NAV.append(paginationNode)
}

function renderDotsPagination() {
    const dots = document.createElement('div')
    dots.textContent = '...'
    UI.PAGINATION_NAV.append(dots)
}

function renderLastPaginationBtn() {
    const paginationNode = getPaginationNode(pagesCount)
    UI.PAGINATION_NAV.append(paginationNode)
}


function renderSwipeBtn(name) {
    const btn = getBtn(name)
    UI.PAGINATION_NAV.append(btn)
    btn.addEventListener('click', swipePage)
}

function getBtn(name) {
    const btn = document.createElement('button')
    btn.className = 'pagination_btn'
    btn.textContent = name
    return btn
}


