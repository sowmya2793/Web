// JavaScript goes here.
var EUR = document.getElementById('EUR');
var USD = document.getElementById('USD');
var JPY = document.getElementById('JPY');
var historyTable = document.getElementById('searchHistory');
var resultRates;
var historyStored = localStorage.getItem('conversionHistory');
if(historyStored) { historyTable.innerHTML = historyStored; } else { historyStored=""}
//API call for currency conversion
axios.get('http://data.fixer.io/api/latest?access_key=ed1c55bdaa99f851ca8846737508c556&format=1').then(function(response){
    resultRates = response.data.rates;
    EUR.value = resultRates.EUR;
    USD.value = resultRates.USD;
    JPY.value = resultRates.JPY;
})
.catch(function(error){
       console.log(error);
});

EUR.addEventListener('input',function(){
    if(isNaN(parseFloat(EUR.value))){ EUR.value = 0; } 
    currencyConverter(parseFloat(EUR.value),this.id,"all")
});
USD.addEventListener('input',function(){ 
    if(isNaN(parseFloat(USD.value))){ USD.value = 0; } 
    currencyConverter(parseFloat(USD.value),this.id,"JPY");
});
JPY.addEventListener('input',function(){
    if(isNaN(parseFloat(JPY.value))){ JPY.value = 0; }  
    currencyConverter(parseFloat(JPY.value),this.id,"USD");
});

var currencyConverter = (currencyValue,currency,convertValue) => {
    if(currency == "EUR"){
        USD.value = (parseFloat(EUR.value)*resultRates.USD).toFixed(4);
        JPY.value = (parseFloat(EUR.value)*resultRates.JPY).toFixed(4);
    }
    else if(currency == "USD"){
        EUR.value= parseFloat(currencyValue/resultRates[currency]).toFixed(4);
        JPY.value= parseFloat(EUR.value*resultRates[convertValue]).toFixed(4);
    }else{
        EUR.value= parseFloat(currencyValue/resultRates[currency]).toFixed(4);
        USD.value= parseFloat(EUR.value*resultRates[convertValue]).toFixed(4); 
    }
    historyStored +="<tr><td>" + parseFloat(EUR.value) + "</td><td>" + parseFloat(USD.value) + "</td><td>" + parseFloat(JPY.value) +"</td></tr>";
    historyTable.innerHTML = historyStored;
	//Browser reload persistent storage
	localStorage.setItem('conversionHistory',historyTable.innerHTML);
}
