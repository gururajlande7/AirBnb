(function () {
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();

(function () {
  const searchInput = document.querySelector('#listingSearch');
  const searchForm = document.querySelector('.nav-search');
  const listingItems = Array.from(document.querySelectorAll('.listing-item'));
  const noMatch = document.querySelector('#noListingsMatch');
  const categoryButtons = Array.from(document.querySelectorAll('.category-pill'));
  const taxToggle = document.querySelector('#taxToggle');
  const prices = Array.from(document.querySelectorAll('.price'));

  if (searchInput && listingItems.length) {
    const filterListings = (value) => {
      const term = value.trim().toLowerCase();
      let visibleCount = 0;

      listingItems.forEach((item) => {
        const isVisible = !term || item.dataset.search.includes(term);
        item.classList.toggle('d-none', !isVisible);
        if (isVisible) visibleCount += 1;
      });

      if (noMatch) {
        noMatch.classList.toggle('d-none', visibleCount !== 0);
      }
    };

    searchForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      filterListings(searchInput.value);
    });

    searchInput.addEventListener('input', () => filterListings(searchInput.value));

    categoryButtons.forEach((button) => {
      button.addEventListener('click', () => {
        categoryButtons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        searchInput.value = button.dataset.filter || '';
        filterListings(searchInput.value);
      });
    });
  }

  if (taxToggle && prices.length) {
    const formatter = new Intl.NumberFormat('en-IN');

    const updatePrices = () => {
      prices.forEach((price) => {
        const basePrice = Number(price.dataset.basePrice);
        const finalPrice = taxToggle.checked ? Math.round(basePrice * 1.18) : basePrice;
        price.innerHTML = `&#8377;${formatter.format(finalPrice)}`;
      });
    };

    taxToggle.addEventListener('change', updatePrices);
    updatePrices();
  }
})();
