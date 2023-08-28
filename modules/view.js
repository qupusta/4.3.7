export class View {
    constructor() {
        this.app = document.getElementById('app')

        this.searchLine = this.createElement('div', 'search-line')
        this.searchInput = this.createElement('input', 'search-input')
        this.searchInput.placeholder = 'Type text...'
        this.repoList = this.createElement('ul', 'repo-list')
        this.addedRepo = this.createElement('ul', 'added-repo')
        this.addedRepoTitle = this.createElement('h1', 'added-repo__title')
        

        this.searchLine.append(this.searchInput)
        this.app.append(this.searchLine)
        this.app.append(this.repoList)
        this.app.append(this.addedRepoTitle)
        this.app.append(this.addedRepo)
        this.repoList.addEventListener('click', (event) => {
            let target = event.target.closest('li');
            if (!target) return;
            
            this.addToList(target);
            if (!this.repoList.children.length) {
                this.repoList.classList.remove('list-visible')
            }
        })
    }

    addToList(repo) {
        let removeButton = this.createElement('button', 'remove-button');
        removeButton.addEventListener('click', (event) => {
            let parent = event.target.parentElement;
            parent.remove()
            if (!this.addedRepo.children.length) {
                this.addedRepo.style.padding = 0;
            }
        })
        repo.append(removeButton);
        this.addedRepo.append(repo);
        if (this.addedRepo.children) {
            this.addedRepoTitle.textContent = 'Added Repositories:'
            this.addedRepo.style.padding = '10px'
        }
        this.searchInput.value = ''
    }

    createElement(elementTag, elementClass) {
        const element = document.createElement(elementTag);

        if (elementClass) {
            element.classList.add(elementClass);
        }
        return element;
    }

    createRepo(repoData) {
        const repoElement = this.createElement('li', 'repo');

        const repoName = this.createElement('p', 'repo-info');
        const repoOwner = this.createElement('p', 'repo-info');
        const repoStars = this.createElement('p', 'repo-info');

        repoName.insertAdjacentHTML('afterbegin', `Name: ${repoData.name}`);
        repoOwner.insertAdjacentHTML('afterbegin', `Owner: ${repoData.owner.login}`);
        repoStars.insertAdjacentHTML('afterbegin', `Stars: ${repoData.stargazers_count}`);
        repoElement.append(repoName, repoOwner, repoStars);
        this.repoList.append(repoElement);
    }
}