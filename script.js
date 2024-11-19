const countryContainer = document.querySelector(".countires-container");
const select = document.querySelector("select");
const inputText = document.querySelector('.search-container input');
const themeChanger = document.querySelector('.theme-changer');
const themeIcon = document.querySelector('.theme-changer i');
let AllCountriesData = ''
function renderCountries(data) {
  countryContainer.innerHTML = ""; 
  data.forEach((country) => {
    const card = document.createElement("a");
    card.classList.add("country-card");
    card.href = `/country.html?name=${country.name.common}`;
    const CardHtml = `<img src='${country.flags.svg}' alt="flag">
            <div class="card-text">
                <h3 class="name">${country.name.common}</h3>
                <p><b>Population: </b>${new Intl.NumberFormat("en-IN", {
                  maximumSignificantDigits: 3,
                }).format(country.population)}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital}</p>
            </div>
            `;
    card.innerHTML = CardHtml;
    countryContainer?.append(card);
  });
}

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data)=>{
     AllCountriesData = data;
    renderCountries(data);
  });

select.addEventListener("change", () => {
  console.log(select.value);
  
  fetch(`https://restcountries.com/v3.1/region/${select.value}`)
    .then((res) => res.json())
    .then(renderCountries);
});

inputText.addEventListener('input',(e)=>{
  console.log(e.target.value);
  let FilterdData =  AllCountriesData.filter((country)=>country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
  renderCountries(FilterdData)
})

themeChanger.addEventListener('click',(e)=>{
  document.body.classList.toggle('dark');
  
  if(themeChanger.innerHTML!=`<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode`)
  {
    themeChanger.innerHTML=`<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode`
  }
  else{
    themeChanger.innerHTML=`<i class="fa-solid fa-moon"></i>&nbsp;&nbsp;Dark Mode`
  }
  themeIcon.classList.toggle('fa-moon');
  themeIcon.classList.toggle('fa-sun');
  console.log(themeIcon)
  
})