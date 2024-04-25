import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandleClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const clicked = e.target.closest(".btn--inline");
      if (!clicked) return;
      const goToPage = +clicked.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 & other pages
    if (curPage === 1 && numPages > 1) {
      return `
        ${this._generatePaginationInfo(curPage, numPages)}
        ${this._generateMarkupBtnNext(curPage + 1)}
      `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
        ${this._generateMarkupBtnPrev(curPage - 1)}
        ${this._generatePaginationInfo(curPage, numPages)}
      `;
    }

    // Other page
    if (curPage < numPages)
      return `
        ${this._generateMarkupBtnPrev(curPage - 1)}
        ${this._generatePaginationInfo(curPage, numPages)}
        ${this._generateMarkupBtnNext(curPage + 1)}
      `;

    // Page 1 & no other pages
    return `
      ${this._generatePageInfo(curPage, numPages)}
    `;
  }

  _generateMarkupBtnPrev(prevPage) {
    return `
      <button data-goto="${prevPage}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${prevPage}</span>
      </button>
    `;
  }

  _generateMarkupBtnNext(nextPage) {
    return `
      <button data-goto="${nextPage}" class="btn--inline pagination__btn--next">
        <span>Page ${nextPage}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  _generatePaginationInfo(curPage, numPages) {
    return `<p class="pagination-info">${curPage} / ${numPages}</p>`;
  }
}

export default new PaginationView();
