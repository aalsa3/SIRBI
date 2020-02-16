let page = document.getElementById('buttonDiv');
let buttonColors = ['red', 'blue', 'yellow'];
let buttonClass = ['btn-danger', 'btn-success', 'btn-warning'];
let itemPrice = ["13.45", "6.50", "11.95"];
let names = ["KFC Ultimate Boxes", "Boba/Bubble Teas", "Big Macs"];
const addCurrencyList = document.querySelector(".currency-menu");

var currentButton = 'button0';
var defaultPrice = 10;
var currentPrice = 10;
var currentCurrency = 'AUD';

var listOfItems = [];

if (Array.isArray(listOfItems) && !listOfItems.length) {
    names.forEach(function (itemName, i) {
        var singleObj = {
            'itemName' : itemName,
            'itemPrice' : itemPrice[i],
            'itemCurrency' : 'AUD',
        };
    
        listOfItems.push(singleObj);
    
        let button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn ' + buttonClass[i] + " choice-buttons";
        button.id = "button" + i;
    
        button.innerText = names[i];
    
        if (i == 0) {
            button.classList.add("active")
            button.setAttribute("aria-pressed", "true");
        }
        page.appendChild(button)
    });
}

console.log(listOfItems);


// Restricts input for each element in the set of matched elements to the given inputFilter.
(function ($) {
    $.fn.inputFilter = function (inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    };
}(jQuery));

// Input filter the cost so that only numerals and decimals are allowed
$("#item-price").inputFilter(function (value) {
    return /^-?\d*[.,]?\d*$/.test(value);
});

//  Update the result box when a cost is input
$(document).ready(function () {
    $('#item-price').keyup(function () {

        currentPrice = $('#item-price').val()
        updateText(currentButton, currentPrice);
    });
})


// Handle button press
$(document).ready(function () {
    $('#buttonDiv :button').click(function () {
        $(':button').removeClass('active').addClass('inactive');
        $(this).removeClass('inactive').addClass('active');
        currentButton = $(this).attr('id');

        if($('#item-price').val() == ''){
            $('#item-price').val(defaultPrice);
            currentPrice = defaultPrice;
         }

        updateText(currentButton, currentPrice);

    });
});


// Update text depending on selected currency
$(document).ready(function () {
    $('#sel1').on('click', function() {
        currentCurrency = this.value;

        console.log($('#item-price').val());
        if($('#item-price').val() == ''){
            $('#item-price').val(currentPrice);
            currentPrice = defaultPrice;
         }

        updateText(currentButton, currentPrice);
    });
});


//function to handle text change in result row
function updateText(buttonID, cost) {
    $('.result-row').removeClass('d-none');

    var ID = buttonID.match(/\d+/);

    var itemCost = listOfItems[ID].itemPrice;
    var itemName = listOfItems[ID].itemName;
    var itemCurrency = listOfItems[ID].itemCurrency;
    console.log(currentCurrency)
    // Convert itemCurrency to the selected currency
    itemCost = fx.convert(itemCost, {from: itemCurrency, to: currentCurrency});

    if (currentCurrency != 'BTC') {
        itemCost = parseFloat(itemCost).toFixed(2);
    }
    


    var calculation = cost / itemCost;
    calculation = parseFloat(calculation).toFixed(2);
    console.log("cost of item: " + itemCost);
    var displayText = $('#result-body span').html('At a price of ' + "<strong>" + currentCurrency + itemCost + 
    "</strong> " + " each, you could buy\n" + "<strong>" + calculation + "x" + itemName + "</strong>");
    displayText.html(displayText.html().replace(/\n/g, '<br/>'));
}



