class CommandK extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <dialog id="command-k">
              <form method="dialog">
                <input type="text" placeholder="Search" id="command-k-search-field">
                <ul id="command-k-search-results">
                </ul>
                <menu>
                  <button type="reset" id="close">Cancel</button>
                </menu>
            </dialog>
        `;
        this.shadowRoot.appendChild(document.querySelector('template').content.cloneNode(true));
    }

    connectedCallback() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'k' && e.metaKey) {
                e.preventDefault();
                if (this.shadowRoot.querySelector('#command-k').open) {
                    this.shadowRoot.querySelector('#command-k').close();
                    return;
                }
                this.shadowRoot.querySelector('#command-k').showModal();
                this.shadowRoot.querySelector('#command-k-search-field').focus();
            }
        });

        this.shadowRoot.querySelector('#close').addEventListener('click', (e) => {
            this.shadowRoot.querySelector('#command-k').close();
        });

        this.shadowRoot.querySelector('#command-k-search-field').addEventListener('input', (e) => {
            const searchField = e.target;
            const searchResults = this.shadowRoot.querySelector('#command-k-search-results');
            searchResults.innerHTML = '';
            if (searchField.value.length > 0) {
                searchFunction(searchField, this.shadowRoot);
            }
        });
        // if click outside, close the dialog
        this.shadowRoot.querySelector('#command-k').addEventListener('click', (e) => {
            if (e.target.tagName === 'DIALOG') {
                this.shadowRoot.querySelector('#command-k').close();
            }
        });
    }

    // open the dialog if Search link poressed
    open() {
        this.shadowRoot.querySelector('#command-k').showModal();
        this.shadowRoot.querySelector('#command-k-search-field').focus();
    }
}

customElements.define('command-k', CommandK);

// override browser command+k
document.addEventListener('keydown', (e) => {
    if (e.key === 'k' && e.metaKey) {
        console.log('command k');
        e.preventDefault();
        e.stopPropagation();
    }
    if (e.key === 'k' && e.ctrlKey) {
        e.preventDefault();
        document.querySelector('command-k').open();
    }
});
