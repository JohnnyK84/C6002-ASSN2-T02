$(document).ready(function() {
var input = localStorage.getItem('input2');
var weatherUrl = "http://api.openweathermap.org/data/2.5/forecast?q= " + input + " &appid=627c45bdea11c60f24e536fd8aa8328a&units=metric";
$('#city').text(input);
$.getJSON(weatherUrl,
function (data) {
    var tr;
    for (var i = 5; i < data.list.length; i=i+8) {
        tr = $('<tr/>');
        tr.append("<td>" + moment(data.list[i].dt_txt).format('dddd') + "</td>");
        tr.append("<td>" + data.list[i].main.temp + "</td>");
        tr.append("<td>" + data.list[i].weather[0].description + "</td>");
        tr.append("<td>" + data.list[i].wind.speed + "</td>");
        $('#moreWeatherDetails').append(tr);
    }
});
});