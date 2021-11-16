// hook elements dom
const countriesAll = document.getElementById('countries');
const toggleTheme = document.getElementById('toggle');
const filterButton = document.getElementById('filter');
const regionFilters = filterButton.querySelectorAll('li');
const searchEl = document.getElementById('search');
const modal = document.getElementById('datiels-country');
const closeBtn = document.getElementById('close');

// under developing createa localStorage :)

// fetch data from api and display cards or countries
async function getCountries() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const countriesData = await res.json();
    displayCountries(countriesData);
}

getCountries();

function displayCountries(countries) {
    countriesAll.innerHTML = '';

    countries.forEach(country => {
        const countryEl = document.createElement('div');
        countryEl.classList.add('card');

        countryEl.innerHTML = `
            <div>
                <img src="${country.flag}" alt="Germany" />
            </div>
            <div class="card-body">
                <h3 class="country-name">${country.name}</h3>
                <p>
                    <strong>Population:</strong>
                    ${country.population}
                </p>
                <p class="country-region">
                    <strong>Region:</strong>
                    ${country.region}
                </p>
                <p>
                    <strong>Capital:</strong>
                    ${country.capital}
                </p>
            </div>
        `;

        countryEl.addEventListener('click', () => {
            modal.style.display = 'flex';
            showCountryDetails(country);
        });

        countriesAll.appendChild(countryEl);
    });
}

function showCountryDetails(country) {
    const modalBody = modal.querySelector('.modal-body');
    const modalImg = modal.querySelector('img');

    modalImg.src = country.flag;

    modalBody.innerHTML = `
        <h2>${country.name}</h2>
        <p>
            <strong>Native Name:</strong>
            ${country.nativeName}
        </p>
        <p>
            <strong>Population:</strong>
            ${country.population}
        </p>
        <p>
            <strong>Region:</strong>
            ${country.region}
        </p>
        <p>
            <strong>Sub Region:</strong>
            ${country.subregion}
        </p>
        <p>
            <strong>Capital:</strong>
            ${country.capital}
        </p>
        <p>
            <strong>Top Level Domain:</strong>
            ${country.topLevelDomain[0]}
        </p>
        <p>
            <strong>Currencies:</strong>
            ${country.currencies.map(currency => currency.code)}
        </p>
        <p>
            <strong>Languages:</strong>
            ${country.languages.map(language => language.name)}
        </p>
    `;
    document.addEventListener('keydown', (e) => {
        // debuge code 
        console.log(e.keyCode);
        if (e.keyCode === 27) {
            modal.style.display = 'none';
        }
    });
    modal.addEventListener('click', () => {
         modal.style.display= 'none';
    });

}


// show and hide the filters (li tags)
filterButton.addEventListener('click', () => {
    filterButton.classList.toggle('open');
});

// close the modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// change Theme
toggleTheme.addEventListener('click', () => {
    const theme = localStorage.getItem('theme');
    document.body.classList.toggle('dark');
});

searchEl.addEventListener('input', e => {
    const {
        value
    } = e.target;
    const countryName = document.querySelectorAll('.country-name');

    countryName.forEach(name => {
        if (name.innerText.toLowerCase().includes(value.toLowerCase())) {

            name.parentElement.parentElement.style.display = 'block';
        } else {
            name.parentElement.parentElement.style.display = 'none';
        }
    });
});

// add a filter on the li's inside the .dropdown
regionFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        const value = filter.innerText;
        const countryRegion = document.querySelectorAll('.country-region');

        countryRegion.forEach(region => {
            if (region.innerText.includes(value) || value === 'All') {

                region.parentElement.parentElement.style.display = 'block';
            } else {
                region.parentElement.parentElement.style.display = 'none';
            }
        });
    });
});