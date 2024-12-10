const countryContainer = document.querySelector(".countires-container");
const select = document.querySelector("select");
const inputText = document.querySelector(".search-container input");
const themeChanger = document.querySelector(".theme-changer");
const themeIcon = document.querySelector(".theme-changer i");
let AllCountriesData = "";
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
  .then((data) => {
    AllCountriesData = data;
    renderCountries(data);
  });

select.addEventListener("change", () => {
  console.log(select.value);

  fetch(`https://restcountries.com/v3.1/region/${select.value}`)
    .then((res) => res.json())
    .then(renderCountries);
});

inputText.addEventListener("input", (e) => {
  console.log(e.target.value);
  let FilterdData = AllCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderCountries(FilterdData);
});

// if (localStorage.getItem("theme") == undefined) {
//   localStorage.setItem("theme", "light");
// }
// themeChanger.addEventListener("click", (e) => {
//   if (localStorage.getItem("theme") == "light") {
//     themeChanger.innerHTML = `<i class="fa-solid fa-moon"></i>&nbsp;&nbsp;Dark Mode`;
//     localStorage.theme = "dark";
//     document.body.classList.remove("dark");
//   } else {
//     themeChanger.innerHTML = `<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode`;
//     localStorage.theme = "light";
//     document.body.classList.add("dark");
//   }

//   console.log(themeIcon);
// });
if(localStorage.isDarkMode ==null){
  localStorage.setItem('isDarkMode',false)
}
  
themeChanger.addEventListener("click",(e)=>{
  let isDark;
  if(JSON.parse(localStorage.getItem('isDarkMode'))==true)
  {
    localStorage.isDarkMode=false;
      isDark=false;
      document.body.classList.remove("dark")
  }
  else{
    localStorage.isDarkMode=true;
    isDark=true;
    document.body.classList.add("dark");
  }
  themeChanger.innerHTML = `<i class="fa-solid fa-${isDark? 'sun':'moon'}"></i>&nbsp;&nbsp;${isDark? 'Light':'Dark'} Mode`;  
  
})