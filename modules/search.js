export class Search {
    constructor(view) {
        this.view = view;
        this.view.searchInput.addEventListener('keyup', this.debounce(this.searchRepo.bind(this), 400))
    }

    async searchRepo() {
        this.clearList()
        let insert = this.view.searchInput.value;
        if (insert) {

            return await fetch(`https://api.github.com/search/repositories?q=${this.view.searchInput.value}&per_page=5`)
                .then((response) => {
                    this.view.repoList.classList.add("list-visible")
                    if (response.ok) {
                        response.json()
                            .then(response => {
                                response.items.forEach(repo => this.view.createRepo(repo))
                            })
                    }
                })
        } else {
            this.view.repoList.classList.remove("list-visible")
            this.clearList()
        }

    }

    debounce(func, wait, immediate) {
        let timeout;
        return function () {
            const context = this, args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    clearList() {
        if (this.view.repoList.innerHTML == ' ') {
            this.view.repoList.classList.remove("list-visible")
        }
        this.view.repoList.innerHTML = ' '
    }
}