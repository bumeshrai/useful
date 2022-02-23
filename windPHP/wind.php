<?php
// Get values from query string
$day = $_GET["day"];
$month = $_GET["month"];
$year = $_GET["year"];
$sel = $_GET["sel"];
$what = $_GET["what"];
$field = $_GET["field"];
$form = $_GET["form"];

if($day == "") $day = date(w,strtotime("$lastRec"));
if($month == "") $month = date("m");
if($year == "") $year = date("Y");

//echo $day;

//Get the database details
require './db/dbinfo.inc.php';

//Establish Database connection
$conn = mysql_connect(localhost,$user,$password) or die('Connection to database failed: ' . mysql_error());;
@mysql_select_db($database) or die( "Unable to select database");

//Get the last enetered date
$query="SELECT DateGeneration FROM  generation ORDER BY  DateGeneration DESC";
$result=mysql_query($query);
$lastRec=mysql_result($result,0,"DateGeneration");


$currentTimeStamp = strtotime("$year-$month-$day");

$monthName = date("M", $currentTimeStamp);
$numDays = date("t", $currentTimeStamp);
$counter = 0;

?>
<html>
<head>
<title>ICF wind mill</title>
<link rel="stylesheet" type="text/css" href="./style/wind.css">
<script language="javascript">
    function goLastMonth(month,year,form,field)
    {
        // If the month is January, decrement the year.
        if(month == 1)
		{
			--year;
			month = 13;
		}
        document.location.href = 'wind.php?month='+(month-1)+'&year='+year+'&form='+form+'&field='+field;
    }

    function goNextMonth(month,year,form,field)
    {
        // If the month is December, increment the year.
        if(month == 12)
		{
			++year;
			month = 0;
		}
        document.location.href = 'wind.php?month='+(month+1)+'&year='+year+'&form='+form+'&field='+field;
    }

</script>
</head>

<body style="margin:10px 10px 300px 300px" class="body">
<table width='350' border='1' cellspacing='1' cellpadding='1' class="body">
    <tr>
        <td width='50' colspan='1'>
        <input type='button' class='button' value=' < ' onClick='<?php echo "goLastMonth($month,$year,\"$form\",\"$field\")"; ?>'>
        </td>
        <td width='250' align="center" colspan='5'>
        <span class='title'><?php echo $monthName . " " . $year; ?></span><br>
        </td>
        <td width='50' colspan='1' align='right'>
        <input type='button' class='button' value=' > ' onClick='<?php echo "goNextMonth($month,$year,\"$form\",\"$field\")"; ?>'>
        </td>
    </tr>
    <tr>
        <td class='head' align="center" width='50'>S</td>
        <td class='head' align="center" width='50'>M</td>
        <td class='head' align="center" width='50'>T</td>
        <td class='head' align="center" width='50'>W</td>
        <td class='head' align="center" width='50'>T</td>
        <td class='head' align="center" width='50'>F</td>
        <td class='head' align="center" width='50'>S</td>
    </tr>
    <tr>

<?php
    for($i = 1; $i < $numDays+1; $i++, $counter++)
    {
        $timeStamp = strtotime("$year-$month-$i");
        if($i == 1)
        {
			// Workout when the first day of the month is
			$firstDay = date("w", $timeStamp);

			for($j = 0; $j < $firstDay; $j++, $counter++)
				echo "<td> </td>";
			}

		$query="SELECT SUM(DailyGen) FROM  generation WHERE  DateGeneration ='$year-$month-$i'";
		$result=mysql_query($query);
		$dailyGen=mysql_result($result,0,"SUM(DailyGen)");

        if($counter % 7 == 0)
	        echo "</tr><tr>";

        if(date("w", $timeStamp) == 0)
	        $class = "class='weekend'";
        else if($i == date("d") && $month == date("m") && $year == date("Y"))
	        	$class = "class='today'";
        else
	        $class = "class='normal'";
	    $refer = 'wind.php?month='.$month.'&day='.$i.'&year='.$year;

        echo "<td class='tr' bgcolor='#ffffff' align='center' width='25'>
        		<table><tr><td  align='center'>
        		<font $class>$i</font>
        		</td></tr>
        		<tr><td  align='center'>
        		<font class='energy'><a href=$refer>
        		$dailyGen</a></font>
        		</td></tr></table></td>";
    }
?>
    </tr>
</table><br>
<table width='500' border='1' cellspacing='1' cellpadding='1' class="body">
	<tr><td class ='banner'>
	Generation statistics, location wise as on <?php  echo "$day-$month-$year"; ?>
	</td></tr>
</table><br><br>
<table width='300' border='1' cellspacing='1' cellpadding='1' class="body">
<?php
	echo "<tr>
	<td class='location' align='center' width='50'>Location</td>
	<td class='location' align='center'>Day's Gen.</td>
	<td class='location' align='center'>No. of Days</td>
	<td class='location' align='center'>Cummulative</td>
	<td class='location' align='center'>Avg.Daily.Gen</td>
	</tr>";
	$loc=array("TP104","TP38","TP56","TP60","TP65","TP80","TP92");
	foreach ($loc as $value) {
		$query = "SELECT DailyGen FROM generation
	   		WHERE DateGeneration = '$year-$month-$day' AND Location = '$value';";
		$result=mysql_query($query);
		$tpDailyGen=mysql_result($result,0,"DailyGen");

		$query = "SELECT COUNT(DailyGen) FROM generation
	   		WHERE DailyGen != 0 AND Location = '$value'
	   		AND DateGeneration>='2009-04-01' AND DateGeneration <= '$year-$month-$day';";
		$result=mysql_query($query);
		$tpNosDayGen=mysql_result($result,0,"COUNT(DailyGen)");

		$query = "SELECT SUM(DailyGen) FROM generation
	   		WHERE DateGeneration>='2009-04-01' AND DateGeneration <= '$year-$month-$day'
	   		AND Location = '$value';";
		$result=mysql_query($query);
		$tpCumGen=mysql_result($result,0,"SUM(DailyGen)");
		$avgGen = round($tpCumGen/$tpNosDayGen,0);

		echo "<tr>
			<td class='location' align='center'>$value</td>
			<td align='center' width='100'>$tpDailyGen</td>
			<td align='center' width='100'>$tpNosDayGen</td>
			<td align='center' width='150'>$tpCumGen</td>
			<td align='center' width='150'>$avgGen</td>
			</tr>";
	}

?>
</table>
</body>
</html>
