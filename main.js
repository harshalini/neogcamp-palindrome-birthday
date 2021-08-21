var birthDate = document.querySelector('#birth-date');
var checkBtn = document.querySelector('#check-button');
var gif = document.querySelector("#gif");
var output = document.querySelector('#output');

function reverseStr(str) {
    var charList = str.split('');
    var reverseCharList = charList.reverse();
    var reversedStr = reverseCharList.join('');
    return reversedStr;
}

function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse;
}

function dateToStr(date) {

    var dateStr = { day: '', month: '', year: '' };

    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();
    return dateStr;
}

function getAllDateFormats(date) {
    var dateStr = dateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function allPalindromeDateFormats(date) {
    var listOfPalindromes = getAllDateFormats(date);

    var success = false;

    for (var i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            success = true;
            break;
        }
    }

    return success;
}

// leap year checking
function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

// getting next date
function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11

    // February
    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    }
    // checking for other months
    else {

        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

// next palindrome date
function nextPalindromeDate(date) {
    var cnd = 0;
    var nextDate = getNextDate(date);

    while (1) {
        cnd++;
        var isPalindrome = allPalindromeDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [cnd, nextDate];
}

gif.style.display = "none";

function clickHandler() {
    gif.style.display = "block";

    var bdayStr = birthDate.value;

    if (bdayStr !== '') {
        var DateList = bdayStr.split('-');

        var date = {
            day: Number(DateList[2]),
            month: Number(DateList[1]),
            year: Number(DateList[0])
        };

        var isPalindrome = allPalindromeDateFormats(date);

        output.style.display = "none";
        if (isPalindrome) {
            setTimeout(() => {
                    output.style.display = "block";
                    output.innerText = "Yippee! your birthday is a palindrome!! 🥳🤩";
                    gif.style.display = "none";
                },
                3000);
        } else {
            var [cnd, nextDate] = nextPalindromeDate(date);
            setTimeout(() => {
                output.style.display = "block";
                output.innerText = "Your birthday is not a palindrome date. The next palindrome date is " + nextDate.day + "-" + nextDate.month + "-" + nextDate.year + ", you missed it by " + cnd + " days! 🙁";
                gif.style.display = "none";
            }, 3000);
        }
    }
}

checkBtn.addEventListener('click', clickHandler);