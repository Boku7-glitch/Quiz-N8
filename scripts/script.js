const button = document.querySelector('button');
const input = document.querySelector('input');
const countryInfo = document.querySelector('#countryInfo');

let enteredCountry = ''
getCountryInfo()

button.addEventListener('click', (e) => {
    enteredCountry = input.value;
    input.value = '';
    getCountryInfo();
})

async function getCountryInfo() {
    const url =
        `https://restcountries.com/v3.1/name/${input.value}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        let country = json[0].name.common;
        let city = json[0].capital[0];
        let population = json[0].population;
        let region = json[0].region;
        let flag = json[0].flags.png;
        countryInfo.innerHTML = `
    <h3>Country: ${country}, ${city}</h3>
    <h2>Population: ${population}</h2>
    <p>Region: ${region}</p>
      <img src=${flag} alt="flag">
    `
    } catch (error) {
        console.error(error.message);
    }
}
