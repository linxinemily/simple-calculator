const nums = document.querySelectorAll('.num')
const display = document.querySelector('.display')
const displayAll = document.querySelector('.display-all')

let formula = '' // 使用者的 input
let numsArr = []
let symbolArr = []


nums.forEach(num => {
    num.addEventListener('click', (e) => {
        if (e.target.dataset.type === 'num') {
            formula = formula + e.target.innerHTML

        }

        if (e.target.dataset.type === 'operator') {
            
            let action = e.target.dataset.action

            // 大於 0 才推進去 numsArr 裡面
            if (parseFloat(formula) > 0) {
                numsArr.push(parseFloat(formula))
                formula = ''
            }

            // 如果數字並沒有增加，符號也不能增加
            if (symbolArr.length >= numsArr.length) {
                symbolArr.pop()
            }
            symbolArr.push(action)
        }

        if (e.target.dataset.type === 'decimal') {
            console.log(e.target.innerHTML)
            formula = formula + e.target.innerHTML
        }

        if (e.target.dataset.type === 'calculate') {
            if (formula) {
                numsArr.push(parseInt(formula))
                formula = ''
            }
        }

        if (e.target.dataset.type === 'clear') {
            formula = ''
            numsArr = []
            symbolArr = []
        }

        render()
    })
})

function sum(numsArr, symbolArr) {
    let nums = [...numsArr]
    let symbols = [...symbolArr]

    while(nums.length > 1) {
        let firstNum = nums.shift()
        let secondNum = nums.shift()

        let currentSymbol = symbols.shift()
        let result = 0

        switch (currentSymbol) {
            case 'plus':
                result += firstNum + secondNum
                break
            case 'subtract':
                result += firstNum - secondNum
                break
            case 'divide':
                result += firstNum / secondNum
                break
            case 'multiple':
                result += firstNum * secondNum
                break
        }

        nums.unshift(result)
    }

    return nums.pop()
}

function render() {
    if (!formula.indexOf('.')) {
        // 避免顯示 0 、 00
        formula = +formula
    }
    s = sum(numsArr, symbolArr)
    // console.log(formula, numsArr, symbolArr, s)
    display.innerHTML = formula || s || 0
}