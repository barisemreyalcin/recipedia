import View from "./View.js";

class SearchViewMobile extends View {
  _parentElement = document.querySelector(".nav__item");
  _sidebar = document.querySelector(".search-results");
  _searchForm = document.querySelector(".search");
  _btnClose = document.querySelector(".btn--close-sidebar");
  _previewRecipe = document.querySelectorAll(".preview");

  constructor() {
    super();
    this._showSidebar();
    this._closeSidebar();
  }

  _showSidebar() {
    this._parentElement.addEventListener("click", e => {
      e.preventDefault();
      const clicked = e.target.closest(".nav__btn--show-sidebar");
      if (!clicked) return;

      this._searchForm.classList.add("search--show");
      this._sidebar.classList.add("search-results--show");

      this._searchForm.querySelector(".search__field").focus();
    });
  }

  _closeSidebar() {
    this._btnClose.addEventListener("click", e => {
      e.preventDefault();
      this._searchForm.classList.remove("search--show");
      this._sidebar.classList.remove("search-results--show");
    });

    this._sidebar.addEventListener("click", e => {
      const clicked = e.target.closest(".preview__link");
      if (!clicked) return;

      this._searchForm.classList.remove("search--show");
      this._sidebar.classList.remove("search-results--show");
    });
  }
}

export default new SearchViewMobile();
