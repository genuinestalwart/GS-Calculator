/* Global variables */

var answer = "0";
var numbers = "1234567890.";

/* Button functions */

function ac() {
    $("#user-typed-text").html("0");
    $("#calculated-text").html("");
}
function addText(text) {
    $("#user-typed-text").append(text);
}
function del() {
    let utt = $("#user-typed-text").html();
    let uttLen = utt.length;
    if(uttLen > 0 && utt[uttLen - 1] == 'S') {
        $("#user-typed-text").html(utt.slice(0, uttLen - 3));
    }else if(uttLen > 0) {
        $("#user-typed-text").html(utt.slice(0, uttLen - 1));
    }
}
function equal() {
    let utt = $("#user-typed-text").html();
    utt = percentAnsPI(percentAnsPI(percentAnsPI(utt, 'A', 3, answer), 'π', 1, Math.PI + ""), '%', 1, "÷100");
    let calcAns = brackets(utt);
    if(calcAns == "Error") {
        $("#calculated-text").css("color", "tomato");
    }
    else {
        $("#calculated-text").css("color", "limegreen");
        answer = calcAns = calcAns.replace('-', '−');
    }
    $("#calculated-text").html(calcAns);
}

/* Replacement functions */

function brackets(data) { // ( and )
    while(data.indexOf('−') > -1) {
        data = data.replace('−', '-');
    }
    let datalen = data.length;
    while(data.indexOf('(') > -1 || data.indexOf(')') > -1) {
        let lastIndex = data.indexOf(')');
        if(lastIndex == -1) {
            for(i = 0; i < datalen; i++) {
                if(data[i] == '(') {
                    data += ')';
                }
            }
        datalen = data.length;
        continue;
        }
        let temp = data.slice(0, lastIndex + 1);
        if(temp.indexOf('(') == -1 || data[lastIndex - 1] == '(') {
            return "Error";
        }
        let firstIndex = temp.lastIndexOf('(');
        let value = calc(data.slice(firstIndex + 1, lastIndex));
        if(value == "Error") {
            return value;
        }
        data = change(data, firstIndex, lastIndex + 1, value);
    }
    if(datalen > 0 && data.indexOf('(') == -1 && data.indexOf(')') == -1) {
        data = calc(data);
    }
    return data;
}
function dmas(data, c) { // ÷, ×, + and -
    while(data.indexOf(c) > -1) {
        let midIndex = -1;
        if(c == '-' && data[0] == '-') {
            let temp = data.slice(1, data.length);
            midIndex = temp.indexOf(c) + 1;
            if(midIndex == 0) {
                return data;
            }
        }else {
            midIndex = data.indexOf(c);
        }
        if(midIndex == 0 || midIndex == data.length - 1) {
            return "Error";
        }
        let firstIndex = getIndex(data, midIndex, false);
        let lastIndex = getIndex(data, midIndex, true);
        if(firstIndex == "Error" || lastIndex == "Error") {
            return "Error";
        }
        let num = [data.slice(firstIndex, midIndex), data.slice(midIndex + 1, lastIndex + 1)];
        if(checknum(num[0]) == false || checknum(num[1]) == false) {
            return "Error";
        }
        num[0] = Number(num[0]);
        num[1] = Number(num[1]);
        let value = "";
        if(c == '÷') {
            if(num[1] == 0) {
                return "Error";
            }
            value = num[0] / num[1] + "";
        }else if(c == '×') {
            value = num[0] * num[1] + "";
        }else if(c == '+') {
            value = num[0] + num[1] + "";
        }else {
            value = num[0] - num[1] + "";
        }
        data = change(data, firstIndex, lastIndex + 1, value);
    }
    return data;
}
function percentAnsPI(data, x, y, z) { // %, ANS and π
    while(data.indexOf(x) > -1) {
        let index = data.indexOf(x);
        data = change(data, index, index + y, z);
    }
    return data;
}

/* Extra function */

function calc(data) {
    data = dmas(dmas(data, '÷'), '×');
    if(data.indexOf('++') > -1 || data.indexOf('--') > -1 || data.indexOf('+-') > -1 || data.indexOf('-+') > -1) {
        return "Error";
    }
    data = dmas(dmas(data, '+'), '-');
    if(checknum(data) == false) {
        return "Error";
    }
    return data;
}

/* Function for inserting the result */

function change(data, firstIndex, lastIndex, value) {
    if(firstIndex > 0 && value[0] != '÷' && numbers.indexOf(data[firstIndex - 1]) > -1 && data[firstIndex] != '-' && (data[firstIndex] == 'A' || data.indexOf('÷') > -1 || data.indexOf('×') > -1)) {
        value = '×' + value;
    }
    if(lastIndex < data.length && numbers.indexOf(data[lastIndex]) > -1) {
        value += '×';
    }
    data = data.replace(data.slice(firstIndex, lastIndex), value);
    return data;
}

/* A string can't be a dot or can't contain 2 or more dots */

function checknum(num) {
    if(num == '.') {
        return false;
    }
    let count = 0;
    for(i = 0; i < num.length; i++) {
        if(num[i] == '.') {
            count++;
        }
        if(count == 2) {
            return false;
        }
    }
    return true;
}

/* Getting the last index of the second number and the first index of the first number */

function getIndex(data, midIndex, button) {
    let index = -1;
    if(button == true) {
        index = midIndex + 1;
        if(data[index] == '÷' || data[index] == '×' || data[index] == '+' || (data[index] == '-' && (index == data.length - 1 || numbers.indexOf(data[index + 1]) == -1))) {
            return "Error";
        }
        if(data[index] == '-') {
            index++;
        }
        while(index < data.length && numbers.indexOf(data[index]) > -1) {
            index++;
        }
        index--;
    }else {
        index = midIndex - 1;
        if(numbers.indexOf(data[index]) == -1) {
            return "Error";
        }
        while(index > -1 && numbers.indexOf(data[index]) > -1) {
            index--;
        }
        if( index == -1 || (index > -1 && data[index] != '-')) {
            index++;
        }
    }
    return index;
}
