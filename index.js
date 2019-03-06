// let baseURL = 'https://api.harvardartmuseums.org/';
// let api = 'apikey=91052800-d2e8-11e8-8958-d16e90e2bdfe';

let buttons = ['store', 'recall', 'Clear', 'Delete', 7, 8, 9, '/', 4, 5, 6, '*', 1, 2, 3, '-', 0, '.', '=', '+']

document.addEventListener('DOMContentLoaded', function () {
    // fetch(
    // 	'https://api.harvardartmuseums.org/image?apikey=91052800-d2e8-11e8-8958-d16e90e2bdfe'
    // )
    // 	.then(resp => resp.json())
    // 	.then(art => {
    // 		art.records.forEach(image => {
    // 			createArtDivs(image);
    // 		});
    // 	});

    buttons.forEach(button => {
        createButton(button)
    })

    function createButton(b) {
        buttonsDiv = document.getElementById('buttons')
        button = document.createElement('button')
        button.value = b
        button.className = 'button'
        button.innerText = b
        buttonsDiv.appendChild(button)

        button.onclick = () => clickHandler(event)
    }

    let screenDisplay = ''
    let num1 = ''
    let num2 = ''
    let math
    let result = ''
    let store = ''
    function clickHandler(event) {
        let val = event.target.value
        disp = document.getElementById('screenDisplay')
        if (val.includes('Clear')) {
            num1 = ''
            num2 = ''
            screenDisplay = ''
            result = 0
            disp.innerText = result
        } else if (parseFloat(val) || val == 0 || val.includes('.')) {
            if (num1 == '') {
                screenDisplay += val
                disp.innerText = screenDisplay
            } else if (num2 == '') {
                screenDisplay += val
                disp.innerText = screenDisplay
            }
        } else if (val.includes('+') || val.includes('-') || val.includes('*') || val.includes('/')) {
            math = val
            if (num1 == '') {
                num1 = screenDisplay
                screenDisplay = ''
            }

            if (num1 != '' && num2 != '') {
                switch (math) {
                    case '+':
                        result = (parseFloat(num1) + parseFloat(num2))
                        break;
                    case '-':
                        result = (parseFloat(num1) - parseFloat(num2))
                        break;
                    case '*':
                        result = (parseFloat(num1) * parseFloat(num2))
                        break;
                    case '/':
                        result = (parseFloat(num1) / parseFloat(num2))
                        break;
                }
                num1 = result
                num2 = ''
            }
            // if (num1 == '') {
            //     num1 = screenDisplay
            //     screenDisplay = ''
            // } else {
            //     num2 = screenDisplay
            //     screenDisplay = ''
            //     console.log('here.............', screenDisplay)
            // }
        } else if (val.includes('Delete')) {
            if (screenDisplay.length > 1) {
                screenDisplay = screenDisplay.slice(0, -1)
                disp.innerText = screenDisplay
            } else {
                disp.innerText = 0
            }
        } else if (val.includes('=')) {
            num2 = screenDisplay
            screenDisplay = ''
            switch (math) {
                case '+':
                    console.log('plus')
                    result = (parseFloat(num1) + parseFloat(num2))
                    break;
                case '-':
                    result = (parseFloat(num1) - parseFloat(num2))
                    break;
                case '*':
                    result = (parseFloat(num1) * parseFloat(num2))
                    break;
                case '/':
                    result = (parseFloat(num1) / parseFloat(num2))
                    break;
            }
            num1 = result
            num2 = ''
        } else if (val.includes('store')) {
            store = disp.innerText
            disp.innerText = 'Stored!'
            console.log(store)
        } else if (val.includes('recall')) {
            num1 = store
            num2 = ''
            screenDisplay = ''
            result = 0
            disp.innerText = store
        }

        if (parseFloat(result)) {
            disp.innerText = result
        }
    }

});
