function getLocation(){
    var location = document.getElementById("location").value
    const capitalize = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())
    return capitalize(location).trim()
}

function searchWeatherLocation(location){
    var xhttp = new XMLHttpRequest()
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f3175f3bed5f403e2d51e326eec0895b`
    xhttp.open("GET", url, false)
    xhttp.send()

    var data = JSON.parse(xhttp.responseText)
    if(data["cod"] == 404){
        $(".loader-wrapper").fadeOut("slow");
        var resEl = document.getElementById("response")
        var textEl = document.createElement("h3")
        var text = document.createTextNode(`${location} isn't a valid location!`)
        textEl.appendChild(text)
        resEl.innerHTML = ""
        resEl.appendChild(textEl)
    } else{
        $(".loader-wrapper").fadeOut("slow");
        var dataMain = data["main"]
    
        var resEl = document.getElementById("response")
        var textEl = document.createElement("h3")
        var text = document.createTextNode(`${location}: ${(dataMain["temp"]-273.15).toLocaleString("en-us", {minimumFractionDigits: 2})}°C | ${((dataMain["temp"]-273.15)*9/5+32).toLocaleString("en-us", {minimumFractionDigits: 2})}°F`)
        textEl.appendChild(text)
        resEl.innerHTML = ""
        resEl.appendChild(textEl)
    }
}

document.getElementById("app").addEventListener("keypress", function(e){
    if (e.key == "Enter"){
        $(".loader-wrapper").fadeIn("slow");
        searchWeatherLocation(getLocation())
    }
})
