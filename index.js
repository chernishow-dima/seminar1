var operator = document.getElementsByClassName("operator");
var number = document.getElementsByClassName("number");

function getFormattedNumber(num) {
    return num == "-" ? "" : Number(num).toLocaleString("en");
}

function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ''));
}

function updateHistory(newValue) {
    document.getElementById("history-value").innerText = newValue;
}

function getHistory() {
    return document.getElementById("history-value").innerText;
}

function updateOutput(newValue) {
    if (newValue == "") {
        document.getElementById("output-value").innerText = newValue;
    }
    else {
        document.getElementById("output-value").innerText = getFormattedNumber(newValue);
    }
}

function getOutput() {
    return document.getElementById("output-value").innerText;
}

function clearWorker() {
    updateHistory("");
    updateOutput("");
}

function backspaceWorker() {
    var output = reverseNumberFormat(document.getElementById("output-value").innerText).toString();
    if (output) {
        output = removeLastSymbol(output);
        updateOutput(output);
    }
}

function removeLastNaN(string) {
    var result = string;
    if (isNaN(result[result.length - 1])) {
        result = removeLastSymbol(result);
    }
    return result;
}

function removeLastSymbol(str) {
    var tmpStr = str.slice();
    return tmpStr.substr(0, tmpStr.length - 1);
}

function operatorWorker(el) {
    var output = getOutput();
    var history = getHistory();
    if (output == "" && history != "") {
        history = removeLastNaN(history);
    }
    if (output != "" || history != "") {
        output = output == "" ? output : reverseNumberFormat(output);
        history += output;
        if (el.id == "=") {
            var result = eval(history);
            updateOutput(result);
            updateHistory("");
        }
        else {
            history += el.id;
            updateHistory(history);
            updateOutput("");
        }
    }
}

function numberClickWorker(el) {
    var output = reverseNumberFormat(getOutput());
    if (output != NaN) {
        output += el.id;
        updateOutput(output);
    }
}

function main(operators, numbers) {
    for (var i = 0; i < operators.length; i++) {
        operators[i].addEventListener('click', function () {
            if (this.id == "clear") { clearWorker(); }
            else if (this.id == "backspace") { backspaceWorker(); }
            else { operatorWorker(this); }
        });
    }

    for (var i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener('click', function () { numberClickWorker(this); });
    }
}

main(operator, number);