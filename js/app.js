function WikipediaSearch() {
  return {
    searchValue: '',
    searchResults: [],
    noResults: true,
    isSearching: false,
    init() {
      this.$watch('searchValue', (val) => {
        this.isSearching = (val != '');
      });
    },
    // function
    slide() {
      const wrapper = document.getElementById('banner-wrapper');
      
      if (wrapper.classList.contains('slide-transition-hidden')) {
        wrapper.classList.remove('slide-transition-hidden');
        wrapper.style.maxHeight = 'none';

        let height = wrapper.offsetHeight;
        wrapper.style.maxHeight = '0';

        setTimeout(function() {
          wrapper.style.maxHeight = `${ height }px`;
        }, 1);
      }
      else {
        let height = wrapper.offsetHeight;

        wrapper.style.maxHeight = `${ height }px`;
        wrapper.classList.add('slide-transition-hidden');

        setTimeout(function() {
          wrapper.style.maxHeight = '0';
        }, 1);
      }
    },
    async fetchSearch(searchValue) {
      if (!searchValue) {
        this.searchResults = [];
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
    },
  };
}

document.addEventListener('alpine:initializing', () => {
  Alpine.data(WikipediaSearch);
});