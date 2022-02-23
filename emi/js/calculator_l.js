var license = '<DIV ALIGN="left"><font face="Arial, Helvetica, sans-serif" size="1">' +
        '</font></DIV>';

js_version = 1.1;

// The following is something that could cause problems. But I haven't yet found a solution.
// The amortizationTable instance name is used both here and in calculator_l.html; and if 
// the same name is not used everywhere things won't work.  But it would be all too easy to  
// innocently change this name in one place and not all others...  Here we're able to assign 
// the name to a variable and use that variable everywhere. But that is not so easily done 
// in calculator_l.html...
var amortizationTableInstanceName = 'amort';
var selector_start_date = 1985;


function helpText(obj){
    var messages = new Array();
    messages["helpHelp"] = 'Click on "?" to get help on that item.';
    messages["loanAmountHelp"] = 'Loan amount: The total amount of the money that you have borrowed.';
    messages["nrOfYearsHelp"] = 'Loan term: The number of years or months you have to pay off the loan. If you fill in one of the boxes, the other will fill in automatically.';
    messages["interestRateHelp"] = 'Annual interest rate: The exact interest rate on your mortgage. This is different from the annual percentage rate or APR which is a standardized method of calculating the cost of a mortgage, stated as a yearly rate which includes such items as interest, mortgage insurance, and certain points or credit costs.';
    messages["monthlyPaymentHelp"] = 'Monthly payment: This calculation includes only principal and interest. Mortgage payments usually include additional payments for insurance and taxes that are put into escrow to be paid out when they come due.';
    messages["amortizationHelp"] = 'Amortization schedule: A timetable for the gradual repayment of a mortgage loan. An amortization schedule indicates the amount of each payment applied to interest and principal, and also the remaining loan balance after each payment is made.';
    messages["monthlyAdditionalHelp"] = 'Adding...to your monthly payment: This calculates the impact on the paid-off date of adding a specified amount to every monthly payment throughout the length of the loan.';
    messages["yearlyAdditionalHelp"] = 'Adding...as an extra yearly payment: This calculates the impact on the paid-off date of adding a single payment of a specified amount every year.';
    messages["oneAdditionalHelp"] = 'Adding...as a one-time payment: This calculates the impact on the paid-off date of adding a single payment, made in addition to and at the same time as some monthly payment. This must, of course, occur at some time after the start date of the loan.';
    messages["paidOffDateHelp"] = 'Changes paid-off date: This tells you how much sooner your loan will be paid off if you add extra payments.';
    messages["printTableHelp"] = 'This will present the table by itself in a new window for printing. After printing from this new window, close it to continue to use the calculator or browse.';
 //   document.Calculator.helpHelp.value = messages[obj.name];
     alert(messages[obj.name]);
}

var monthNames = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');

function validateNumber(localItem, minValue, maxValue, msg) {
    var decPtAt = 0;
    for (var i = 0; i < localItem.value.length; i++){
        var localChar  = localItem.value.charAt(i);
        if (localChar < "0" || localChar > "9"){
            if (localChar == "." && decPtAt == 0){
                decPtAt = i + 1;
            }else{
                if (localChar == " "){
                    localChar = "Spaces cannot";
                }else if (localChar == "."){
                    localChar = "Only one decimal point can";
                }else{
                    localChar = "The character \"" + localChar
                                + "\" cannot";
                }
                alert(localChar + " be used in the " + msg + " field." +
                    "  Please correct your entry to use only numerical" +
                    " values, a single decimal point, and no spaces or" +
                    " commas.");
                localItem.focus();
                localItem.select();
                return false;
            }
        }
    }
    return checkLimits(localItem, minValue, maxValue, msg);
}

function checkLimits(localItem, minValue, maxValue, msg) {
    if (localItem.value < minValue || localItem.value > maxValue){
        alert("Value for the " + msg + " field must be between "
            + minValue + " and " + maxValue + ".");
        localItem.focus();
        localItem.select();
        return false;
    }
    return true;
}

function thisPage(obj){
    var localString = obj.pathname;
    var pos = localString.indexOf('/') + 1;
//    return localString.substring(pos);
    return localString;
}

function getArgs(){
/*  Based on Example 13-5 in "JavaScript: The Definitive Guide," 3rd ed.,
    by David Flanagan, O'Reilly (1998) p. 245.                            */
    var args = new Object();
    var query = window.location.search.substring(1);
    var pairs = new Array();
    if ((pairs = query.split("&")) == null) pairs = localSplit(query, "&");
    for (var i =0; i < pairs.length; i++){
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
        var argname = pairs[i].substring(0,pos);
        var value = pairs[i].substring(pos+1);
        args[argname] = unescape(value);
    }
    return args;
}

function localSplit(thisStr, thisChar){
    var localStr;
    var pairs = new Array();
    var pos = 0;
    var i = 0;
    while ((pos = localStr.indexOf(thisChar)) > -1){
        pairs[i++] = localStr.substring(0, pos);
        localStr = localStr.substring(pos + 1);
    }
    return pairs;
}

function tdet(characteristics, fontdata){
    this.tdOpen = '\t\t\t<TD' + characteristics;
    this.tdCont = '>\n' + '\t\t\t\t<FONT' + fontdata + '>\n\t\t\t\t\t';
    this.tdClose = '\n\t\t\t\t</FONT>\n\t\t\t</TD>\n';
    this.ShowTD  = ShowTD;
    return;
}

function ShowTD(contents, width){
    if (width != null) this.tdOpen += ' width="' + width + '"';
    return this.tdOpen + this.tdCont + contents + this.tdClose;
}

function displayDec(val, decs){
    var factr = 1;
    for (var i = 0; i < decs; i++){
        factr *= 10;
    }
    var outputStr = Math.round(factr * val) + '';
    while (outputStr.length - decs < 1){
        outputStr = '0' + outputStr;
    }
    var pos = outputStr.length - decs;
    return outputStr.substring(0, pos) + '.' + outputStr.substring(pos);
}

function getFourDigitYear(date_obj){
    var thisyear = date_obj.getYear();
    // Following Y2k fix should work till 3799 :-), by which time getYear() should be fully repalced by getFullYear()...
    if (thisyear < 1900){
        thisyear += 1900;
    }
    return thisyear;
}

function setFourDigitYear(date_obj, thisyear){
    // Y2k fix
    if (navigator.appName == "Microsoft Internet Explorer" && thisyear < 2000){
        thisyear = thisyear - 1900;
    }
    date_obj.setYear(thisyear);
}

function amortizationTable(formName) {
    this.formName             = new Object();
    this.formName             = formName;
    this.loanAmount           = 1000.0;
    this.nrOfMonths           = 12;
    this.interestRate         = 10.0;
    this.unroundedPayment     = 87.92;
    this.monthlyAdditional    = 0.0;
    this.yearlyAdditional     = 0.0;
    this.oneAdditional        = 0.0;
    this.paymentMonths        = new Array();
    this.paymentNr            = new Array();
    this.payment              = new Array();
    this.interestPaid         = new Array();
    this.totalInterest        = new Array();
    this.principalPaid        = new Array();
    this.balance              = new Array();
    this.startDate            = new Date();
    this.yearlyAdditionalDate = new Date();
    this.oneAdditionalDate    = new Date();
    this.paidOffDate          = '';
    this.args                 = new Object();
    this.valueSource          = 'args';
    this.fontFace             = 'Arial, Helvetica, sans-serif';
    this.clearPayment         = clearPayment;
    this.getValues            = getValues;
    this.putValues            = putValues;
    this.doAmortization       = doAmortization;
    this.showTable            = showTable;
    this.tableDisplayer       = tableDisplayer;
    this.license              = license;
    this.printString          = '';
    this.printTable           = printTable;
    return;
}

function doAmortization(valueSource) {
    this.valueSource = valueSource;
    var returnValue  = this.getValues();
    if (!returnValue) return returnValue;
    var blnc         = this.loanAmount;
    var rate         = this.interestRate / 1200.0;
    var loanDate     = new Date();
    var loanYear     = getFourDigitYear(this.startDate);
    var loanMonth    = this.startDate.getMonth();
    var loanDay      = this.startDate.getDate();
    this.oneAdditionalDate.setDate(loanDay);
	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    if (this.oneAdditional != 0
        && getFourDigitYear(this.oneAdditionalDate) == getFourDigitYear(loanDate)
        && this.oneAdditionalDate.getMonth() == loanDate.getMonth()) {
        alert("The calculator assumes that a one-time payment is made at the same time as one of the monthly payments. A one-time payment can only be done, therefore, at some time after the start date of the loan.");
    }

    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    loanDate.setDate(loanDay);
    loanDate.setMonth(loanMonth);
    setFourDigitYear(loanDate, loanYear);
    var thisTime     = loanDate.getTime();
    var lastTime     = thisTime;
    var monthNr      = 0;
    var yearNr       = 0;
    var totInt       = 0.0;
    var factr        = 1;
    var ratePlusOne  = rate + 1;
    for (var i = 0; i < this.nrOfMonths; i++){
        factr *= ratePlusOne;
    }
    if (factr > 1) {
        this.unroundedPayment =
            (this.loanAmount * factr * rate) / (factr - 1);
        returnValue = true;
        this.payment[0]       = 0;
        this.balance[0]       = displayDec(blnc, 2);
        this.interestPaid[0]  = 0;
        this.totalInterest[0] = 0;
        this.principalPaid[0] = 0;
        var totalMonthPayment = this.unroundedPayment;
        for (var i = 0; i <= this.nrOfMonths; i++){
            if (loanMonth > 11){
                loanYear++;
                loanMonth = 0;
                setFourDigitYear(loanDate, loanYear);
            }
            this.paymentMonths[i] = loanMonth;
            monthNr               = loanMonth + 1;
            yearNr                = loanYear;
            this.paymentNr[i]     = monthNr + '<BR>' + yearNr;
            loanDate.setMonth(loanMonth++);
            if (i == 0) continue;
            totalMonthPayment     = this.unroundedPayment + this.monthlyAdditional;
            if (this.yearlyAdditionalDate.getMonth() == loanDate.getMonth())
                totalMonthPayment += this.yearlyAdditional;
            if (this.oneAdditionalDate.getMonth() == loanDate.getMonth()
                && getFourDigitYear(this.oneAdditionalDate) == getFourDigitYear(loanDate))
                    totalMonthPayment += this.oneAdditional;
            this.interestPaid[i]  = blnc * rate;
            totInt               += this.interestPaid[i];
            this.principalPaid[i] = totalMonthPayment - this.interestPaid[i];
            blnc                 -= this.principalPaid[i];
            if (blnc <= 0) {
                totalMonthPayment    += blnc;
                this.principalPaid[i] = totalMonthPayment - this.interestPaid[i];
                blnc                 = 0;
            }
            this.payment[i]       = displayDec(totalMonthPayment, 2);
            this.balance[i]       = displayDec(blnc, 2);
            this.interestPaid[i]  = displayDec(this.interestPaid[i], 2);
            this.totalInterest[i] = displayDec(totInt, 2);
            this.principalPaid[i] = displayDec(this.principalPaid[i], 2);
            if (blnc <= 0) break;
        }
    }else{
        returnValue = false;
    }
    this.paidOffDate = monthNames[loanMonth - 1] + ' '
            + loanDay + ', '
            + loanYear;
    this.putValues(returnValue);
    return returnValue;
}

function getValues(){
    var returnValue = false;
    if (this.valueSource == 'form' || this.valueSource == 'term'){
        if ((this.formName.nrOfYears.value == null
                || this.formName.nrOfYears.value.length == 0)
            || (this.formName.interestRate.value == null
                || this.formName.interestRate.value.length == 0)
            || (this.formName.loanAmount.value == null
                || this.formName.loanAmount.value.length == 0)) {
            return returnValue;
        }
        if (!validateNumber(   this.formName.nrOfYears, 0.08333,       40, "Loan Term (years)")
            || !validateNumber(this.formName.interestRate,    1,       99, "Annual Interest Rate")
            || !validateNumber(this.formName.loanAmount,      1, 10000000, "Loan Amount")) {
            return returnValue;
        }
        this.nrOfMonths        = Math.round(parseFloat(this.formName.nrOfMonths.value));
        this.interestRate      = parseFloat(this.formName.interestRate.value);
        this.loanAmount        = parseFloat(this.formName.loanAmount.value);
        setFourDigitYear(this.startDate, selector_start_date + parseInt(this.formName.startYear.selectedIndex));
        this.startDate.setMonth(parseInt(this.formName.startMonth.selectedIndex));
        var monthDay = 1 + parseInt(this.formName.startDay.selectedIndex);
        if (monthDay > 28){
            monthDay = 28;
            alert('To simplify the determination of the loan payment day for each month, loan start dates later than the 28th of any month are assumed to start on the 28th.');
        }
        this.startDate.setDate(monthDay);
        this.monthlyAdditional = getValid(this.formName.monthlyAdditional, this.monthlyAdditional)
        this.yearlyAdditional  = getValid(this.formName.yearlyAdditional, this.yearlyAdditional)
        this.yearlyAdditionalDate.setMonth(parseInt(this.formName.yearlyAdditionalMonth.selectedIndex));
        this.oneAdditional     = getValid(this.formName.oneAdditional, this.oneAdditional)
        setFourDigitYear(this.oneAdditionalDate, selector_start_date + parseInt(this.formName.oneAdditionalYear.selectedIndex));
        this.oneAdditionalDate.setMonth(parseInt(this.formName.oneAdditionalMonth.selectedIndex));
        returnValue = true;
    }else{
        this.args = getArgs();
        if (this.args.nrOfMonths != null)
            this.nrOfMonths = Math.round(parseFloat(this.args.nrOfMonths));
        if (this.args.interestRate != null)
            this.interestRate = parseFloat(this.args.interestRate);
        if (this.args.loanAmount != null)
            this.loanAmount = parseFloat(this.args.loanAmount);
        if (this.args.unroundedPayment != null)
            this.unroundedPayment = parseFloat(this.args.unroundedPayment);
        if (this.args.startYear != null)
            setFourDigitYear(this.startDate, this.args.startYear);
        if (this.args.startMonth != null)
            this.startDate.setMonth(this.args.startMonth);
        if (this.args.startDay != null)
            this.startDate.setDate(this.args.startDay);
        if (this.args.monthlyAdditional != null)
            this.monthlyAdditional = parseFloat(this.args.monthlyAdditional);
        if (this.args.yearlyAdditional != null)
            this.yearlyAdditional = parseFloat(this.args.yearlyAdditional);
        if (this.args.yearlyAdditionalMonth != null)
            this.yearlyAdditionalDate.setMonth(this.args.yearlyAdditionalMonth);
        if (this.args.oneAdditional != null)
            this.oneAdditional = parseFloat(this.args.oneAdditional);
        if (this.args.oneAdditionalYear != null)
            setFourDigitYear(this.oneAdditionalDate, this.args.oneAdditionalYear);
        if (this.args.oneAdditionalMonth != null)
            this.oneAdditionalDate.setMonth(this.args.oneAdditionalMonth);
        returnValue = true;
    }
    return returnValue;
}

function getValid(obj, val){
    var val1 = val;
    if (parseFloat("0.0") != null && obj.value != null && obj.value.length > 0)
            val = parseFloat(obj.value);
    if (isNaN(0) != null && isNaN(val)) return val1;
    return val;
}

function clearPayment(){
    this.formName.monthlyPayment.value = "     ===>";
}

function putValues(noError){
    if (noError){
        this.formName.nrOfYears.value
            = displayDec(this.nrOfMonths / 12, 2);
        this.formName.nrOfMonths.value
            = this.nrOfMonths;
        this.formName.interestRate.value
            = displayDec(this.interestRate, 2);
        this.formName.loanAmount.value
            = displayDec(this.loanAmount, 2);
        this.formName.unroundedPayment.value
            = this.unroundedPayment;
        this.formName.monthlyPayment.value
            = displayDec(this.unroundedPayment, 2);
        this.formName.startYear.selectedIndex
            = getFourDigitYear(this.startDate) - selector_start_date;
        this.formName.startMonth.selectedIndex
            = this.startDate.getMonth();
        this.formName.startDay.selectedIndex
            = this.startDate.getDate() - 1;
        this.formName.monthlyAdditional.value
            = this.monthlyAdditional;
        this.formName.yearlyAdditional.value
            = this.yearlyAdditional;
        this.formName.yearlyAdditionalMonth.selectedIndex
            = this.yearlyAdditionalDate.getMonth();
        this.formName.oneAdditional.value
            = this.oneAdditional;
        this.formName.oneAdditionalYear.selectedIndex
            = getFourDigitYear(this.oneAdditionalDate) - selector_start_date;
        this.formName.oneAdditionalMonth.selectedIndex
            = this.oneAdditionalDate.getMonth();
        this.formName.paidOffDate.value = this.paidOffDate;
    }else{
        this.formName.monthlyPayment.value = "Error";
    }
}

function tableData(contents, label, characteristics, fontdata){
    this.contents  = new Array();
    this.contents  = contents;
    this.label     = label;
    this.tdOpen    = '\t\t\t<TD' + characteristics;
    this.tdCont    = '>\n' +
                     '\t\t\t\t<FONT' + fontdata + '>\n\t\t\t\t\t';
    this.tdClose   = '\n\t\t\t\t</FONT>\n\t\t\t</TD>\n';
    this.ShowRow   = ShowRow;
    return;
}

function ShowRow(rowNr, rowLength){
    var i0 = rowNr * rowLength;
    var returnString = '            <TR>\n';
    returnString += this.tdOpen;
    if (rowLength > 0) returnString += ' align="right"';
    returnString += this.tdCont + this.label + this.tdClose;
    var dataOut = ' ';
    for (var i = i0; i <= rowLength + i0; i++){
        if ((rowNr > 0 && i == i0)||this.contents[i]==null||this.contents[i]=='NaN'){
            dataOut = '&nbsp;';
        }else{
            dataOut = this.contents[i];
        }
        if (i != i0){
            returnString += this.tdOpen + ' align="center"' + this.tdCont + dataOut + this.tdClose;
        }
    }
    returnString += '            </TR>\n';
    return returnString;
}

function showTable() {
    var rowLength       = 12;
    var nrOfRows        = Math.ceil((this.balance.length - 1) / rowLength);
    var Characteristics = ' bgcolor="#EEEEEE" valign="bottom"';
    var Fontdata        = ' face="Arial Narrow" size="1" color="#000000"';
    paymentNrOut        = new tableData(this.paymentNr, '<B>Month<BR>Year</B>', Characteristics, Fontdata);
    Characteristics     = ' bgcolor="#FFFFFF" valign="top"';
    paymentOut          = new tableData(this.payment, '<B>Payment</B>&nbsp;(Rs.)', Characteristics, Fontdata);
    principalOut        = new tableData(this.principalPaid, '<B>Principal Paid</B>&nbsp;(Rs.)', Characteristics, Fontdata);
    interestOut         = new tableData(this.interestPaid, '<B>Interest Paid</B>&nbsp;(Rs.)', Characteristics, Fontdata);
    totalIntOut         = new tableData(this.totalInterest, '<B>Total Interest</B>&nbsp;(Rs.)', Characteristics, Fontdata);
    balanceOut          = new tableData(this.balance, '<B>Balance</B>&nbsp;(Rs.)', Characteristics, Fontdata);
    initialLoan         = new tableData(this.balance, '<B>Amortization Table for Rs.' + this.balance[0] + ' borrowed on ' + monthNames[this.startDate.getMonth()] + ' ' + this.startDate.getDate() + ', ' +  getFourDigitYear(this.startDate) + '</B>', Characteristics + 'ALIGN="CENTER" COLSPAN="' + (rowLength + 1) + '"', Fontdata);
    var returnString = '        <TABLE border="1" cellpadding="3" cellspacing="0" bgcolor="#CCCCCC">\n';
    returnString += initialLoan.ShowRow(0, 0);
    for (var ir = 0; ir < nrOfRows; ir++){
        returnString += paymentNrOut.ShowRow(ir, rowLength);
        returnString += paymentOut.ShowRow(ir, rowLength);
        returnString += principalOut.ShowRow(ir, rowLength);
        returnString += interestOut.ShowRow(ir, rowLength);
        returnString += totalIntOut.ShowRow(ir, rowLength);
        returnString += balanceOut.ShowRow(ir, rowLength);
    }
    returnString += '        </TABLE>\n';
    return returnString;
}

function dateSelector(selectorName){
    var returnString = '<SELECT NAME="' + selectorName + 'Month" onChange="' + amortizationTableInstanceName + '.clearPayment();">\n';
    var today = new Date();
    var thisYear = getFourDigitYear(today);
    var maxYear  = thisYear + 10;
    for (var i = 0; i < 12; i++){
        returnString += '\t\t\t\t<OPTION VALUE="' + i + '"';
        if (i == today.getMonth()) returnString += ' SELECTED';
        returnString += '>' + monthNames[i] + '</OPTION>\n';
    }
    returnString += '\t\t\t</SELECT>\n';
    if (selectorName == 'yearlyAdditional')return returnString;
    if (selectorName == 'oneAdditional'){
        maxYear = thisYear + 30;
    }else{
        returnString += '\t\t\t<SELECT NAME="' + selectorName + 'Day" onChange="' + amortizationTableInstanceName + '.clearPayment();">\n';
        for (var i = 1; i < 32; i++){
            returnString += '\t\t\t\t<OPTION VALUE="' + i + '"';
            if (i == today.getDate()) returnString += ' SELECTED';
            returnString += '>' + i + '</OPTION>\n';
        }
        returnString += '\t\t\t</SELECT>,\n';
    }
    returnString += '\t\t\t&nbsp;<SELECT NAME="' + selectorName + 'Year" onChange="' + amortizationTableInstanceName + '.clearPayment();">\n';
    for (var i = selector_start_date; i <= maxYear; i++){
        returnString += '\t\t\t\t<OPTION VALUE="' + i + '"';
        if (i == getFourDigitYear(today)) returnString += ' SELECTED';
        returnString += '>' + i + '</OPTION>\n';
    }
    returnString += '\t\t\t</SELECT>\n';
    return returnString;
}

function tableDisplayer(){
    var margin = "\n                ";
    var returnString = 
         margin + '<tr bgcolor="#E6E6E6">' +
         margin + '    <td colspan=3 align="center">' +
         margin + '      <INPUT type="submit" name="showAmort" value="Show/Recalculate Amortization Table"><input type="button" name="amortizationHelp" value=" ? " onClick="helpText(this)">' +
         margin + '        <BR>';
    this.doAmortization('args');
    if (this.args.showAmort != null) {
        this.printString =
            margin + '      <TABLE ALIGN="center" BORDER=0 CELLSPACING=0 CELLPADDING=10>' +
            margin + '         <TR ALIGN="center" VALIGN="top">' +
            margin + '             <TD>' +
            this.showTable() +
            margin + '             </TD>' +
            margin + '         </TR>';
         returnString += this.printString +
            margin + '         <TR ALIGN="center" VALIGN="top">' +
            margin + '             <TD>' +
            margin + '                 <INPUT type="button" name="printTbl" value="Print Amortization Table" onClick="' + amortizationTableInstanceName + '.printTable()"><input type="button" name="printTableHelp" value=" ? " onClick="helpText(this)">' +
            margin + '             </TD>' +
            margin + '         </TR>' + 
            margin + '     </TABLE>';
        this.printString += 
            margin + '     </TABLE>';
    }
    returnString +=
        margin + '  </td>' +
        margin + '</tr>' +
        margin + '<tr bgcolor="#dddddd">' +
        margin + '  <td colspan=3>' +
        this.license +
        margin + '  </td>' +
        margin + "</tr>\n";
    return returnString;
}

function printTable(){
        var screenWidth = 640;
        if (screen.width && screen.width != null){
            screenWidth = screen.width;
        }
        var screenHeight = 480;
        if (screen.height && screen.height != null){
            screenHeight = screen.height;
        }
        var msg = 'The table will now be presented by itself in a new window for printing.\n\n'
            + 'After printing from this new window, '
            + 'close it to continue to use the calculator or browse.\n\n'
            + '\tNote:\tYou may need to adjust you browser\'s font size\n\t\tto fit the width of the table on a printed page.';
        var features = "toolbar=yes,location=no,menubar=yes,scrollbars=yes,resizable=yes,width=" + screenWidth + ",height=" + screenHeight + "0";
        tableTitle = 'Amortization Table';
        if (confirm(msg)){
            var w = window.open("","mainview",features);
            var d = w.document;
            // Output an HTML document into the new window.
            d.write('<BODY TEXT="#003333" BGCOLOR="#FFFFEE" TOPMARGIN="0" LEFTMARGIN="0" VLINK="#009999" ALINK="#009900" LINK="#000099">');
            d.write(this.printString);
            d.write('</BODY>');
            d.close();    
        }
    return;
}
