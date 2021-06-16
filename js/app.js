function WikipediaSearch() {
  return {
    searchValue: '',
    searchResults: [],
    noResults: false,
    test: false,
    init() {
      this.test = (this.searchValue == '');
    },
    // search function
    async fetchSearch(searchValue) {
      if (!searchValue) {
        this.searchResults = [];
        this.noResults = false;
        return;
      }
      
      try {
        let urlparams = new URLSearchParams({
          action: 'query',
          list: 'search',
          prop: 'info|extracts',
          inprop: 'url',
          utf8: '',
          format: 'json',
          origin: '*',
          srlimit: 10,
          srsearch: this.searchValue,
        });
      
        let url = 'https://en.wikipedia.org/w/api.php' + '?' + urlparams.toString();
        const response = await fetch(url);
        const results = await response.json();

        this.searchResults = [...results.query.search];
      }
      catch (err) {
        console.error(err);
      }

      this.noResults = (this.searchValue && this.searchResults.length == 0);
    },
  };
}

document.addEventListener('alpine:initializing', () => {
  Alpine.data(WikipediaSearch);
});