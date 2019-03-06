let options = ['store', 'recall', 'clear', 'delete']
let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', '=']
let operators = ['/', '*', '-', '+']

document.addEventListener('DOMContentLoaded', function () {
    options.forEach(option => {
        createButton(option, 'option')
    })
    operators.forEach(operator => {
        createButton(operator, 'operator')
    })
    nums.forEach(number => {
        createButton(number, 'number')
    })

    function createButton(b, name) {
        let id = name + 's'
        buttonsDiv = document.getElementById(id)
        button = document.createElement('button')
        button.value = b
        button.className = name
        button.innerText = b
        buttonsDiv.appendChild(button)

        button.onclick = () => clickHandler(event, name)
    }

    let hold = ''
    let num1 = ''
    let num2 = ''
    let result = ''
    let screen = document.getElementById('screenDisplay')

    function clickHandler(event, name) {
        let val = event.target.value
        if (val == 'clear') {
            hold = ''
            num1 = ''
            num2 = ''
            result = ''
            screen.innerText = 0
        } else if ((name == 'number' || name == 'operator') && val != '=') {
            getNumbers(event, name)
        } else if (val == '=') {
            screen.innerText = result
            hold = result
            num2 = ''
        } else if (val == 'delete') {
            del()
        } else if (val == 'store') {
            store = screen.innerText
            screen.innerText = 'Stored!'
            console.log(store)
        } else if (val == 'recall') {
            hold = store
            num2 = ''
            result = ''
            screen.innerText = store
        }
        console.log('hold', hold, 'num1', num1, 'num2', num2)
    }

    function getNumbers(event, name) {
        let val = event.target.value
        switch (name) {
            case 'number':
                hold += val
                screen.innerText = hold
                if (num1 != '') {
                    num2 += val
                }
                break;
            case 'operator':
                math = val
                num1 = hold
                hold = ''
                break;
        }
        if (num1 != '' && num2 != '') {
            doMath(math)
        }
    }

    function doMath(math) {
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
    }

    function del() {
        if (screen.innerText.length > 1) {
            removed = screen.innerText.slice(0, -1)
            screen.innerText = removed
            hold = removed
        } else {
            screen.innerText = 0
            hold = 0
        }
    }
});
