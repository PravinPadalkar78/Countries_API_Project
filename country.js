const countryName = new URLSearchParams(location.search).get("name");
const flagImage = document.querySelector(".country-details img");
const countryNameH1 = document.querySelector(".country-details h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const topLevelDomain = document.querySelector(".top-level-domain");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");
const borderCountries = document.querySelector(".border-countries");
const themeChanger = document.querySelector('.theme-changer');


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    flagImage.src = country.flags.svg;
    countryNameH1.innerText = country.name.common;
    population.innerText = country.population.toLocaleString("en-IN");
    region.innerText = country.region;
    topLevelDomain.innerText = country.tld.join(", ");

    if (country.capital) {
      capital.innerText = country.capital?.[0];
    }

    if (country.subregion) {
      subRegion.innerText = country.subregion;
    }

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }

    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    }

    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(", ");
    }
    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([data]) => {
            // console.log(borderCountries)
            const borderCountry = document.createElement('a')
            borderCountry.innerText = data.name.common;
            borderCountry.href = `/country.html?name=${data.name.common}`
            console.log(borderCountry);
            borderCountries.append(borderCountry)
          });
      });
    }
  });
  let isDark;
  if(JSON.parse(localStorage.isDarkMode)==true){
    isDark=true;
    console.log('hi im true')
    document.body.classList.add("dark")
    themeChanger.innerHTML = `<i class="fa-solid fa-${isDark? 'sun':'moon'}"></i>&nbsp;&nbsp;${isDark? 'Light':'Dark'} Mode`;  
  }
  else{
    isDark=false;
    document.body.classList.remove("dark");
    themeChanger.innerHTML = `<i class="fa-solid fa-${isDark? 'sun':'moon'}"></i>&nbsp;&nbsp;${isDark? 'Light':'Dark'} Mode`;  
  }
    
  themeChanger.addEventListener("click",(e)=>{
    let isDark;
    if(JSON.parse(localStorage.getItem('isDarkMode')))
    {
        isDark=true;
        document.body.classList.remove("dark")
    }
    else{
      isDark=false;
      document.body.classList.add("dark");
    }
    themeChanger.innerHTML = `<i class="fa-solid fa-${isDark? 'sun':'moon'}"></i>&nbsp;&nbsp;${isDark? 'Light':'Dark'} Mode`;  
    localStorage.isDarkMode=!isDark;
  })
  