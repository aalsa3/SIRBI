let page = document.getElementById('buttonDiv');
let buttonColors = ['red', 'blue', 'yellow'];
let buttonClass = ['btn-danger', 'btn-success', 'btn-warning'];
let itemPrice = ["13.45", "6.50", "11.95"];
let names = ["KFC Ultimate Box", "Boba/Bubble Tea", "Big Mac"];
const addCurrencyList = document.querySelector(".currency-menu");

var currentButton = 'button0';
var currentPrice = 10;
var currentCurrency = '$';

var listOfItems = [];
names.forEach(function (itemName, i) {
    var singleObj = {}
    singleObj['itemName'] = itemName;
    singleObj['itemPrice'] = itemPrice[i];
    singleObj['ID'] = i;
    listOfItems.push(singleObj);
});

console.log(listOfItems);


// Create initial button list
function constructOptions(buttonColors) {

    buttonColors.forEach(function (color, i) {


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

constructOptions(buttonColors);

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

        updateText(currentButton, currentPrice);

    });
})


//function to handle text change in result row
function updateText(buttonID, cost) {
    $('.result-row').removeClass('d-none');

    var ID = buttonID.match(/\d+/);

    var itemCost = listOfItems[ID].itemPrice;
    var itemName = listOfItems[ID].itemName;

    var calculation = cost / itemCost;
    calculation = parseFloat(calculation).toFixed(2);
    console.log("cost of item: " + itemCost);
    var displayText = $('#result-body span').html('At a price of ' + "<strong>" + currentCurrency + itemCost + 
    "</strong> " + " each, you could buy\n" + "<strong>" + calculation + "x" + itemName + "</strong>");
    displayText.html(displayText.html().replace(/\n/g, '<br/>'));
}

