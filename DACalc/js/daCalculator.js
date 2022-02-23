js_version = 1.1;

function getValue( v ) {
if(v.value == '')
v.value = 0;
}
function saveValue( v ) {
oldValue = v.value;
v.value = '';
}

function handleEnter(field,evt) {

    evt = (evt) ? evt : window.event
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if ((charCode < 48 || charCode > 57)&&(charCode!=8)&&(charCode!=13)&&(charCode!=45)&&(charCode!=46)&&(charCode!=37)&&(charCode!=39)) {

        status = "This field accepts numbers only."
		alert('Please enter only numbers.');

return false;

    }

	status = ""
	 var keyCode = evt.keyCode ? evt.keyCode : evt.which ?
evt.which : evt.charCode;
        if (keyCode == 13) {
            var i;
            for (i = 0; i < field.form.elements.length; i++)
                if (field == field.form.elements[i])
                    break;
            i = (i + 1) % field.form.elements.length;
            field.form.elements[i].focus();
            return false;
        }
        else
        return true;

}

function calda20101(){
if((document.form1.da200911.value!=0)&&(document.form1.da200912.value!=0)) {
var avgindex20101=parseFloat(document.form1.da2009.value)+parseFloat(document.form1.da20092.value)+parseFloat(document.form1.da20093.value)+parseFloat(document.form1.da20094.value)+parseFloat(document.form1.da20095.value)+parseFloat(document.form1.da20096.value)+parseFloat(document.form1.da20097.value)+parseFloat(document.form1.da20098.value)+parseFloat(document.form1.da20099.value)+parseFloat(document.form1.da200910.value)+parseFloat(document.form1.da200911.value)+parseFloat(document.form1.da200912.value);
avgindex20101=avgindex20101/12;
var da20101=(avgindex20101-115.76)*(100/115.76);
document.form1.da1.value=parseInt(da20101);
}
else {
alert("Enter All India Consumer Index (IW) (base 2001=100) for the months of Nov-09 and Dec-09");
return false;
}
}
function calda20102(){
if((document.form1.da20097.value!=0)&&(document.form1.da20098.value!=0)&&(document.form1.da20099.value!=0)&&(document.form1.da200910.value!=0)&&(document.form1.da200911.value!=0)&&(document.form1.da200912.value!=0)&&(document.form1.da2010.value!=0)&&(document.form1.da20102.value!=0)&&(document.form1.da20103.value!=0)&&(document.form1.da20104.value!=0)&&(document.form1.da20105.value!=0)&&(document.form1.da20106.value!=0)) {
var avgindex20102=parseFloat(document.form1.da20097.value)+parseFloat(document.form1.da20098.value)+parseFloat(document.form1.da20099.value)+parseFloat(document.form1.da200910.value)+parseFloat(document.form1.da200911.value)+parseFloat(document.form1.da200912.value)+parseFloat(document.form1.da2010.value)+parseFloat(document.form1.da20102.value)+parseFloat(document.form1.da20103.value)+parseFloat(document.form1.da20104.value)+parseFloat(document.form1.da20105.value)+parseFloat(document.form1.da20106.value);
avgindex20102=avgindex20102/12;
var da20102=(avgindex20102-115.76)*(100/115.76);
document.form1.da2.value=parseInt(da20102);
}
else {
alert("Enter All India Consumer Index (IW) (base 2001=100) for the months from July-09 to June-10");
return false;
}
}
function calda20112(){
if((document.form1.da20107.value!=0)&&(document.form1.da20108.value!=0)&&(document.form1.da20109.value!=0)&&(document.form1.da201010.value!=0)&&(document.form1.da201011.value!=0)&&(document.form1.da201012.value!=0)&&(document.form1.da2011.value!=0)&&(document.form1.da20112.value!=0)&&(document.form1.da20113.value!=0)&&(document.form1.da20114.value!=0)&&(document.form1.da20115.value!=0)&&(document.form1.da20116.value!=0)) {
var avgindex20112=parseFloat(document.form1.da20107.value)+parseFloat(document.form1.da20108.value)+parseFloat(document.form1.da20109.value)+parseFloat(document.form1.da201010.value)+parseFloat(document.form1.da201011.value)+parseFloat(document.form1.da201012.value)+parseFloat(document.form1.da2011.value)+parseFloat(document.form1.da20112.value)+parseFloat(document.form1.da20113.value)+parseFloat(document.form1.da20114.value)+parseFloat(document.form1.da20115.value)+parseFloat(document.form1.da20116.value);
avgindex20112=avgindex20112/12;
var da20112=(avgindex20112-115.76)*(100/115.76);
document.form1.da4.value=parseInt(da20112);
}
else {
alert("Enter All India Consumer Index (IW) (base 2001=100) for the months from Jul-2010 to Jun-2011");
return false;
}
}
function calda20111(){
if((document.form1.da2010.value!=0)&&(document.form1.da20102.value!=0)&&(document.form1.da20103.value!=0)&&(document.form1.da20104.value!=0)&&(document.form1.da20105.value!=0)&&(document.form1.da20106.value!=0)&&(document.form1.da20107.value!=0)&&(document.form1.da20108.value!=0)&&(document.form1.da20109.value!=0)&&(document.form1.da201010.value!=0)&&(document.form1.da201011.value!=0)&&(document.form1.da201012.value!=0))  {
var avgindex20111=parseFloat(document.form1.da2010.value)+parseFloat(document.form1.da20102.value)+parseFloat(document.form1.da20103.value)+parseFloat(document.form1.da20104.value)+parseFloat(document.form1.da20105.value)+parseFloat(document.form1.da20106.value)+parseFloat(document.form1.da20107.value)+parseFloat(document.form1.da20108.value)+parseFloat(document.form1.da20109.value)+parseFloat(document.form1.da201010.value)+parseFloat(document.form1.da201011.value)+parseFloat(document.form1.da201012.value);
avgindex20111=avgindex20111/12;
var da20111=(avgindex20111-115.76)*(100/115.76);
document.form1.da3.value=parseInt(da20111);
}
else {
alert("Enter All India Consumer Index (IW) (base 2001=100) for the months from Jan-10 to Dec-2010");
return false;
}
}
