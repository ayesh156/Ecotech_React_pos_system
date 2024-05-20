<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require "connection.php";

require "SMTP.php";
require "PHPMailer.php";
require "Exception.php";
require 'tcpdf/tcpdf.php'; // Include Composer autoload for TCPDF

use PHPMailer\PHPMailer\PHPMailer;

// Include the main TCPDF library (search for installation path).
require_once ('tcpdf/tcpdf.php');
require_once ('tcpdf/config/tcpdf_config.php');

if (isset($_GET['data'])) {

	$encodedData = $_GET['data']; // Retrieve encoded data

	// Replace with your chosen encoding method (Base64 recommended)
	$decodedData = base64_decode($encodedData); // Base64 decode

	$data = explode(",", $decodedData); // Split the decoded string back to invoiceId and email

	$id = $data[0];
	$email = $data[1];

	$user_rs = Database::search("SELECT * FROM user WHERE email = '$email'");
	$user_data = $user_rs->fetch_assoc();

	$data_rs = Database::search("SELECT invoice_id AS id, TRIM(customer.name) AS name, date, due_date, email, mobile, instruction, notes, footer, paid_amount FROM invoice INNER JOIN customer ON invoice.customer_id = customer.id WHERE invoice.id = $id");
	$data = $data_rs->fetch_assoc();

	$i_items_rs = Database::search("SELECT * FROM invoice_item WHERE invoice_id = '$id'");
	$i_items_num = $i_items_rs->num_rows;

	// Initialize variables to store tax total and grand total
	$taxTotal = 0;
	$subTotal = 0;

	// Check if there are any invoice items
	if ($i_items_num > 0) {
		// Loop through each invoice item
		for ($n = 0; $n < $i_items_num; $n++) {
			$i_row = $i_items_rs->fetch_assoc();

			$i_qty = $i_row['qty'];
			$i_price = $i_row['selling_price']; // Assuming 'price' is stored as 'selling_price' in the database
			$i_totalPrice = $i_qty * $i_price;

			// Calculate tax for this item
			$i_tax = $i_row['tax'];
			$i_taxAmount = ($i_totalPrice * $i_tax) / 100;

			// Add tax amount to tax total
			$taxTotal += $i_taxAmount;

			// Add total price (including tax) to grand total
			$subTotal += $i_totalPrice;

		}
	}

	$totalAmount = $subTotal + $taxTotal;

	$dueAmount = $totalAmount - $data['paid_amount'];

	// Ensure the due amount is not negative
	if ($dueAmount < 0) {
		$dueAmount = 0;
	}

	// create new PDF document

	$html = '
<table style="padding: 15px 0px 15px 15px;">
	<tbody>
	<tr>
    <td style="width: 70px;"><img src="' . $user_data['company_image'] . '"/></td>
	<td style="width: 381px;">
	<span style="font-size: 18px;">' . $user_data['company_name'] . '</span>
	<br/>
	<span style="color: #9E9E9E;font-size: 12px;">' . $user_data['company_address'] . '</span>
	</td>
	<td style="width: 257px;" align="right">
	<span style="font-size: 16px;">Contact information</span><br/>
	<span style="color: #9E9E9E; font-size: 12px;">' . $user_data['company_email'] . '</span><br/>
	<span style="color: #9E9E9E; font-size: 12px;">' . $user_data['company_mobile'] . '</span>
	</td>
	</tr>
	</tbody>
	</table>
	
	<table style="padding: 0 7px 0 0;">
	<tbody>
	<tr>
	<td colspan="4">
	<hr style="color: #9E9E9E;" />
	</td>
	</tr>
	
	</tbody>
	</table>
	';
	$html .= '
	<table style="padding: 0 15px 5px 15px;">
	<tbody>
	<tr>
	<td>
	<span style="font-size: 16px;">' . explode(" ", $user_data['company_name'])[0] . ' INVOICE</span>
	<br/>
	<span style="color: #9E9E9E;font-size: 12px;">' . $user_data['company_name'] . '</span>
	</td>
	<td align="right">
	<span style="font-size: 12px;">Amount Due (LKR)</span>
	<br/>
	<span style="font-size: 18px; font-weight: bold;">' . number_format($dueAmount, 2) . '</span>
	</td>
	</tr>
	</tbody>
	</table>
	';

	$html .= '
	<table style="padding: 0 15px 15px 15px; font-size: 11px;">
	<tbody>
	<tr>
	<td style="width: 564px;"><span style="color: #9E9E9E;">Bill to: </span>' . $data['name'] . '<br/>
	<span style="color: #9E9E9E;">Email: </span>' . $data['email'] . '<br/>
	<span style="color: #9E9E9E;">Phone: </span>' . $data['mobile'] . '
	</td>
	<td style="width: 200px;">
	<span style="color: #9E9E9E;">Invoice Number: </span>' . $data['id'] . '<br/>
	<span style="color: #9E9E9E;">Invoice Date: </span>' . $data['date'] . '<br/>
	<span style="color: #9E9E9E;">Payment Due: </span>' . $data['due_date'] . '
	</td>
	</tr>
	</tbody>
	</table>
	';
	
	$html .= '
	<table style="padding: 5px 8px 5px 15px">
	<thead>
	<tr style="font-weight:bold;background-color: #F5F5FF;">
    <th style="border-bottom: 1px solid #9E9E9E; width: 378px;">Items</th>
    <th style="border-bottom: 1px solid #9E9E9E; text-align: center; width: 75px;">Quantity</th>
    <th style="border-bottom: 1px solid #9E9E9E; text-align: center; width: 110px;">Price</th>
    <th style="border-bottom: 1px solid #9E9E9E; text-align: right; width: 160px;">Amount</th>
	</tr>
	</thead>
	<tbody>';

	$invoice_items_rs = Database::search("SELECT * FROM invoice_item WHERE invoice_id = '$id'");
	$invoice_items_num = $invoice_items_rs->num_rows;

	// Check if there are any invoice items
	if ($invoice_items_num > 0) {
		// Loop through each invoice item
		for ($i = 0; $i < $invoice_items_num; $i++) {
			$row = $invoice_items_rs->fetch_assoc();
			// Extract item details
			$itemName = $row['name'];
			$itemDescription = $row['description'];
			$qty = $row['qty'];
			$price = $row['selling_price']; // Assuming 'price' is stored as 'selling_price' in the database
			$totalPrice = $qty * $price;

			 // Determine if this is the last item
			 $borderStyle = ($i === $invoice_items_num - 1) ? '' : 'border-bottom: 1px solid #dfe6e9;';

			// Add HTML code for this item to the $html string
			$html .= '<tr>';
			$html .= '<td style="'.$borderStyle.' width: 378px;">';
			$html .= '<span>' . $itemName . '</span><br/>';
			$html .= '<span style="color: #9E9E9E;">' . $itemDescription . '</span>';
			$html .= '</td>';
			$html .= '<td style="'.$borderStyle.' text-align: center; width: 75px; color: #2d3436;">' . $qty . '</td>';
			$html .= '<td style="'.$borderStyle.' text-align: right; width: 110px; color: #2d3436;">LKR ' . number_format($price, 2) . '</td>';
			$html .= '<td style="'.$borderStyle.' text-align: right; width: 160px; color: #2d3436;">LKR ' . number_format($totalPrice, 2) . '</td>';
			$html .= '</tr>';
		}
	} else {
		// No invoice items found
		$html .= '<tr><td colspan="4">No items found</td></tr>';
	}


	$html .= '</tbody>
</table>';
	$html .= '
    <table style="padding: 6px 17px 6px 9px;">
	<hr style="color: #9E9E9E;" />
    <tbody>
	<tr>
    <td><span>Payment Instruction</span><br/>
	<span style="color: #9E9E9E;">' . $data['instruction'] . '</span>
	</td>
	<td align="right"><strong>Grand Total: LKR ' . number_format($totalAmount, 2) . '</strong></td>
	</tr>
	</tbody>
</table>';

// Check if the notes is not empty
$notesText = !empty($data['notes']) ? '<br/>' . $data['notes']  : '';
// Check if the footer is not empty
$footerText = !empty($data['footer']) ? $data['footer'] . '<br/>' : '';

	$html .= '
    <table style="padding: 5px 18px 5px 9px;">
    <tbody>
	<tr>
	<td colspan="4">
	<span style="font-size:12px;">Notes / Terms<br/></span>
	<span style="color: #9E9E9E;">PLEASE PRODUSE THE INVOICE FOR WARRANTY. NO WARRANTY FOR CHIP BURNS, PHYSICAL DAMAGE OR CORROSION. Warranty covers only manufacturer\'s defects. Damage or defect due to other causes such as negligence, misuses, improper operation, power fluctuation, lightening, or other natural disasters, sabotage, or accident etc. (01M) = 30 Days, (03M) = 90 Days, (06M) = 180 Days, (01Y) = 350 Days, (02Y) = 700 Days, (03Y) = 1050 Days, (05Y) = 1750 Days, (10Y) = 3500 Days, (L/W) = Lifetime Warranty. (N/W) = No Warranty).</span><span style="color: #9E9E9E;">' . $notesText . '</span>
	</td>
	</tr>
    <tr>
	<td colspan="4">
	<span style="font-size:12px;">Footer:<br/></span>
	<span style="color: #9E9E9E;">' . $footerText . '</span><span style="color: #9E9E9E;">We know the world is full of choices. Thank you for selecting us.<br/></span>
	</td>
	</tr>
	</tbody>
	</table>
	';
	//end content
// create new PDF document
	$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
	// set default monospaced font
// set margins
	$pdf->SetMargins(2, 3, -2, true);
	// remove default header/footer
	$pdf->setPrintHeader(false);
	$pdf->setPrintFooter(false);
	// set auto page breaks
	$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
	// set image scale factor
	$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
	// set default font subsetting mode
	$pdf->setFontSubsetting(true);
	// Set font
	// dejavusans is a UTF-8 Unicode font, if you only need to
	// print standard ASCII chars, you can use core fonts like
	// helvetica or times to reduce file size.
	$fontname = TCPDF_FONTS::addTTFfont('tcpdf/fonts/Roboto-Medium.ttf', 'TrueTypeUnicode', '', 96);
	$fontbold = TCPDF_FONTS::addTTFfont('tcpdf/fonts/Roboto-Bold.ttf', 'TrueTypeUnicode', '', 96);
	$pdf->SetFont($fontname, '', 8);
	
	$pdf->AddPage();
	// Print text using writeHTMLCell()
	$pdf->writeHTMLCell(0, 0, '', '', $html, 0, 0, 0, true, '', true);
	//$pdf->Output(dirname(__FILE__).'example_001.pdf', 'F');

	// ---------------------------------------------------------

	// Generate a unique PDF filename
	$pdfFilename = 'Invoice_#' . $data['id'] . '.pdf';

	// Output the PDF document
	$pdf->Output($pdfFilename, 'I');

}
