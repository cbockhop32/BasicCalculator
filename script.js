const keys = document.querySelectorAll('.key'),
    mainKeys = document.querySelector('.middle-keys'),
    bottomKeys = document.querySelector('bottom-keys'),
    topResults = document.querySelector('.top-results'),
    clearBtn = document.getElementById('clear'),
    calculateBtn = document.getElementById('calculate');

let savedKeys1 = [];
let savedKeys2 = [];
let selectedOperator = '';


class Storage {
    static getInputs(key) {
        const keyInput = key;



        if(isNaN(key) == false || key == '.') {
            if(selectedOperator == '') {
                savedKeys1.push(keyInput);
            } else {
                savedKeys2.push(keyInput);
            }
            UI.displayInputs();

        } else {
            if(key !== 'calculate' && key !== '.') {
                selectedOperator = key;
            }
        }
    }

    static clearInputs() {
        savedKeys1 = [];
        savedKeys2 = [];
        selectedOperator = '';
        UI.displayInputs();
    }

}


class UI {
    static displayInputs() {

        if(selectedOperator == '') {
            topResults.innerHTML = UI.formatNumber(savedKeys1.join(''));
        } else {
            topResults.innerHTML = UI.formatNumber(savedKeys2.join(''));
        }
        
    }

    static displayResult(result) {
        topResults.innerHTML = result;
    };

    static formatNumber(number) {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
}

class CalculatorMath {
    static calculateResults() {
       const numberKeys1 = savedKeys1.join('');
       const numberKeys2 = savedKeys2.join('');
    
      const result = eval(numberKeys1 + selectedOperator + numberKeys2).toFixed(2);
    
      UI.displayResult(UI.formatNumber(result));  
    }
}


mainKeys.addEventListener('click', e => Storage.getInputs(e.target.id));
clearBtn.addEventListener('click', Storage.clearInputs);
calculateBtn.addEventListener('click', CalculatorMath.calculateResults);