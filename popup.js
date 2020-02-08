let page = document.getElementById('buttonDiv');
const buttonColors = ['red','blue','yellow']
const buttonClasses = ['btn-danger', 'btn-success', 'btn-warning']

const addCurrencyList = document.querySelector(".currency-menu");

function constructOptions(buttonColors) {

    buttonColors.forEach(function (color, i) {

        const names = ["KFC Ultimate Box", "Subway Footlong", "Big Mac"];
        let button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn ' + buttonClasses[i];
        button.id = "choice-buttons"

        button.innerText = names[i];
    
        button.addEventListener('click', function() {
            console.log("hey" + color);
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.executeScript(
                    tabs[0].id,
                    {code: 'document.body.style.backgroundColor = " ' + color + ' ";'});
            });
        });

        page.appendChild(button)
    });

}

constructOptions(buttonColors);


// Auxiliary Functions

// Function to populate currency dropdown

function populateAddCurrencyList() {
    for(let i=0; i<currencies.length; i++) {
        AddCurrencyList.insertAdjacentHTML(beforeend)
    }
}

// for (i = 0; i < buttons.length; i++) {
//     let changeColor = document.getElementById(buttons[i]);
    
//     changeColor.style.backgroundColor = colors[i];

//     changeColor.onclick  = changeBackgroundColor(i);
// }

// function changeBackgroundColor(index) {
//     let color = colors[i]
//     console.log(color);
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         chrome.tabs.executeScript(
//             tabs[0].id,
//             {code: 'document.body.style.backgroundColor = " ' + color + ' ";'});
//     });
// }