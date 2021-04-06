var operator = document.getElementsByClassName("operator");
var number = document.getElementsByClassName("number");

function getFormattedNumber(num) {
    if (num == "-") {
        return "";
    }
    return Number(num).toLocaleString("en");
}

function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ''));
}

function main() {
    for (var i = 0; i < operator.length; i++) {
        operator[i].addEventListener('click', function () {
            if (this.id == "clear") {
                document.getElementById("history-value").innerText = "";
                document.getElementById("output-value").innerText = "";
            }
            else if (this.id == "backspace") {
                var output = reverseNumberFormat(document.getElementById("output-value").innerText).toString();
                if (output) {
                    output = output.substr(0, output.length - 1);
                    if (output == "") {
                        document.getElementById("output-value").innerText = output;
                    }
                    else {
                        document.getElementById("output-value").innerText = getFormattedNumber(output);
                    }
                }
            }
            else {
                var output = document.getElementById("output-value").innerText;
                var history = document.getElementById("history-value").innerText;
                if (output == "" && history != "") {
                    if (isNaN(history[history.length - 1])) {
                        history = history.substr(0, history.length - 1);
                    }
                }
                if (output != "" || history != "") {
                    output = output == "" ? output : reverseNumberFormat(output);
                    history = history + output;
                    if (this.id == "=") {
                        var result = eval(history);
                        if (result == "") {
                            document.getElementById("output-value").innerText = result;
                        }
                        else {
                            document.getElementById("output-value").innerText = getFormattedNumber(result);
                        }
                        document.getElementById("history-value").innerText = "";
                    }
                    else {
                        history = history + this.id;
                        document.getElementById("history-value").innerText = history;
                        document.getElementById("output-value").innerText = "";
                    }
                }
            }
    
        });
    }
    
    for (var i = 0; i < number.length; i++) {
        number[i].addEventListener('click', function () {
            var output = reverseNumberFormat(document.getElementById("output-value").innerText);
            if (output != NaN) {
                output = output + this.id;
                if (output == "") {
                    document.getElementById("output-value").innerText = output;
                }
                else {
                    document.getElementById("output-value").innerText = getFormattedNumber(output);
                }
            }
        });
    }
}

main();