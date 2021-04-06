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
    document.getElementById("output-value").innerText = newValue;
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
        output = output.substr(0, output.length - 1);
        if (output == "") {
            updateOutput(output);
        }
        else {
            updateOutput(getFormattedNumber(output));
        }
    }
}

function removeLastNaN(string) {
    var result = string;
    if (isNaN(result[result.length - 1])) {
        result = result.substr(0, result.length - 1);
    }
    return result;
}

function operatorWorker(el) {
    var output = getOutput();
    var history = getHistory();
    if (output == "" && history != "") { // Если пустой вывод и нечего считать
        history = removeLastNaN(history);
    }
    if (output != "" || history != "") {
        output = output == "" ? output : reverseNumberFormat(output);
        history += output;
        if (el.id == "=") {
            var result = eval(history);
            if (result == "") {
                updateOutput(result);
            }
            else {
                updateOutput(getFormattedNumber(result));
            }
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
        if (output == "") {
            updateOutput(output);
        }
        else {
            updateOutput(getFormattedNumber(output));
        }
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