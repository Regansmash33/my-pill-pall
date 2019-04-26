//validate form data
//used to validate numeric inputs
var re = /^\d*[1-9]\d*$/;
//used for date input validation
var mN = moment().startOf('day');


function formChecker() {

    //run validation checks for each input field and set flags 
    var goodName = validDrugName(); //flag for name of drug
    var goodStrength = validDrugStrength(); //flag for med strength 
    var goodFilled = validFillCount(); //flag for filled amount 
    var goodTakenPer = validTakenPer(); //flag for pills taken per 
    var goodTimesPer = validPerDay(); //flag for pills taken per day
    var goodFillDate = validFillDate(); //flag for fill date
    var goodStart = validStartDate(); //flag for start date
    var goodCode = validCode(); //flag for rxcui code
    var goodDates = validDateDuration(); //flag for date duration

    if (goodName === "true" && goodStrength === "true" && goodFilled === "true" && goodTakenPer === "true" && goodTimesPer === "true" && goodFillDate === "true" && goodStart === "true" && goodCode === "true" && goodDates === "true") {
        document.getElementById("submitButton").disabled=false;
        document.getElementById("submitButton").hidden=false;
        alert("Form Successfully Validated. \n" + "Submit button can now be used, please click on it to get your results.");

    } else {
        alert("Form is invalid, fix any errors in your input to proceed");
    }

}
//validate drug name input
function validDrugName() {
    var nameDrug = document.getElementById("rxterms").value;
    if (nameDrug === null || nameDrug === " ") {
        //name is empty
        document.getElementById("nameError").innerText ="Drug name field is empty";
        goodName = "false";
    } else {
        goodName = "true";
    }
    return goodName;
}

//validate drug strength input
function validDrugStrength() {
    var medStrength = document.getElementById("drug_strengths").value;
    if (medStrength === null || medStrength === " ") {
        //med strength is empty
        document.getElementById("strengthError").innerText ="Field for medication strength is empty";
        goodStrength = "false";
    } else {
        goodStrength = "true";
    }
    return goodStrength;
}

//validate drug code
function validCode() {
    var pillCode = document.getElementById("rxcui").value;
    //check to see if code is empty
    if (pillCode === null || pillCode===" ") {
        document.getElementById("nameError").innerText ="Please select a valid drug name from the list";
        document.getElementById("strengthError").innerText ="Please select a valid drug strength from the list";
        goodCode = "false";
    } else {
        goodCode = "true";
    }
    return goodCode
}
//validate fill count
function validFillCount() {
    var pillsFilled = document.getElementById("amountFilled").value;
    if (pillsFilled === null || pillsFilled === " ") {
        //field is empty
        document.getElementById("maxError").innerText ="Quantity filled field  is empty";
        goodFilled = "false";
        //values are numeric digits postive then zero
        if (re.test(pillsFilled) === "false") {
          document.getElementById("maxError").innerText ="Invalid Input, please enter positive numbers only"
            goodFilled = "false";
        }
    } else {
        goodFilled = "true";
    }
    return goodFilled;
}

//validate taken per 
function validTakenPer() {
    var perCount = document.getElementById("takenAmount").value;
    if (perCount === null || perCount === " ") {
        //field is empty
        document.getElementById("takenError").innerText ="Per count field is empty";
        goodTakenPer = "false";
        //values are numeric digits greater then zero
        if (re.test(perCount) === "false") {
          document.getElementById("takenError").innerText ="Invalid Input, please enter positive numbers only";            
            goodTakenPer = "false";
        }
    } else {
        goodTakenPer = "true";
    }
    return goodTakenPer;
}

//validate times per day
function validPerDay() {
    var eachDay = document.getElementById("timesPerDay").value;
    if (eachDay === null || eachDay === " ") {
        //field is empty
        document.getElementById("perDayError").innerText ="Per day field is empty";
        goodTimesPer = "false";
        //values are numeric digits greater then zero
        if (re.test(eachDay) === "false") {
            document.getElementById("perDayError").innerText ="Invalid Input, please enter positive numbers only";
            goodTimesPer = "false";
        }
    } else {
        goodTimesPer = "true";
    }
    return goodTimesPer;
}
//validate fill date
function validFillDate() {
    var fillingDay = document.getElementById("dateFilled").value;
    var fD = moment(fillingDay, 'YYYY-MM-DD');

    //check if imputed fill date is in the valid format of YYYY-MM-DD
    if (fD === null || !fD.isValid()) {
        document.getElementById("fillError").innerText ="Please input a fill date";
        goodFillDate = "false";
    } else {
        goodFillDate = "true";
    }
    return goodFillDate;
}
//validate start date
function validStartDate() {

    var startingDay = document.getElementById("dateStart").value;
    var sD = moment(startingDay, "YYYY-MM-DD");
    //check if imputed fill date is in the valid format of YYYY-MM-DD
    if (sD === null || !sD.isValid()) {
        document.getElementById("startError").innerText = "Please input a start date";
        goodStart = "false";
    } else {
        goodFillDate = "true";
    }
    return goodFillDate;
}
//validate that start date is equal to or after fill date
function validDateDuration(goodDates) {
    var fillingDate = document.getElementById("dateFilled").value;
    var fDate = moment(fillingDate, 'YYYY-MM-DD');
    var startingDate = document.getElementById("dateStart").value;
    var sDate = moment(startingDate, 'YYYY-MM-DD');
    if (moment(sDate).isBefore(fDate, "days")) {
        //start date is before fill date
        document.getElementById("fillError").innerText = "Fill date cannot be after start date";
        document.getElementById("startError").innerText = "Start date cannot be before fill date";
         goodDates = "false";
    } else {
         goodDates = "true";
    }
    return goodDates;
}