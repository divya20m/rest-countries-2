import fetch from "node-fetch";
fetch("https://restcountries.com/v3.1/all").
then((res) => res.json()).
then((data) => {
    data.map((country)=>{
        console.log(country.name.common);
    })
})