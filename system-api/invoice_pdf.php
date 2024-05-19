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

	$data_rs = Database::search("SELECT invoice_id AS id, TRIM(customer.name) AS name, date, due_date, email, mobile, instruction, notes, footer FROM invoice INNER JOIN customer ON invoice.customer_id = customer.id WHERE invoice.id = $id");
	$data = $data_rs->fetch_assoc();

	$i_items_rs = Database::search("SELECT * FROM invoice_item WHERE invoice_id = '$id'");
	$i_items_num = $i_items_rs->num_rows;

	// Initialize variables to store tax total and grand total
	$i_taxTotal = 0;
	$i_subTotal = 0;

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
			$i_taxTotal += $i_taxAmount;

			// Add total price (including tax) to grand total
			$i_subTotal += $i_totalPrice;

		}
	}

	$i_totalAmount = $i_subTotal + $i_taxTotal;

	// create new PDF document

	$html = '
<table style="padding: 15px;">
	<tbody>
	<tr style="padding: 15px;">
    <td style="padding: 15px; width: 105px;"><img src="' . $user_data['company_image'] . '"/></td>
	<td  style="padding: 15px;">
	<span style="font-size: 20px;">' . $user_data['company_name'] . '</span>
	<br/>
	<span style="color: #9E9E9E;">' . $user_data['company_address'] . '</span>
	</td>
	<td style="padding: 15px;width: 355px;" align="right">
	<span style="font-size: 16px;">Contact information</span><br/>
	<span style="color: #9E9E9E;">' . $user_data['company_email'] . '</span><br/>
	<span style="color: #9E9E9E;">' . $user_data['company_mobile'] . '</span>
	</td>
	</tr>
	</tbody>
	</table>
    <hr />
	';
	$html .= '
	<table style="padding: 15px;">
	<tbody>
	<tr style="padding: 15px;">
	<td style="padding: 15px;">
	<span style="font-size: 22px;">' . explode(" ", $user_data['company_name'])[0] . ' INVOICE</span>
	<br/>
	<span style="color: #9E9E9E;font-size: 18px;">' . $user_data['company_name'] . '</span>
	</td>
	<td style="padding: 15px;" align="right">
	<span style="font-size: 17px;">Amount Due (LKR)</span>
	<br/>
	<span style="font-size: 25px; font-weight: bold;">' . number_format($i_totalAmount, 2) . '</span>
	</td>
	</tr>
	</tbody>
	</table>
	';
	$html .= '
	<table style="padding: 0 15px 15px 15px;">
	<tbody>
	<tr style="padding: 15px;">
	<td style="padding: 15px;"><span style="color: #9E9E9E;">Bill to: </span>' . $data['name'] . '<br/>
	<span style="color: #9E9E9E;">Email: </span>' . $data['email'] . '<br/>
	<span style="color: #9E9E9E;">Phone: </span>' . $data['mobile'] . '
	</td>
	<td style="padding: 15px;" align="right">
	<span style="color: #9E9E9E;">Invoice Number: </span>' . $data['id'] . '<br/>
	<span style="color: #9E9E9E;">Invoice Date: </span>' . $data['date'] . '<br/>
	<span style="color: #9E9E9E;">Payment Due: </span>' . $data['due_date'] . '
	</td>
	</tr>
	</tbody>
	</table>
	';
	$html .= '
	<table style="padding: 15px;">
	<thead>
	<tr style="font-weight:bold;background-color: #F5F5FF;">
    <th style="border-bottom: 1px solid #222; width: 350px;">Items</th>
    <th style="border-bottom: 1px solid #222; text-align: center; width: 77px;">Quantity</th>
    <th style="border-bottom: 1px solid #222; text-align: center; width: 130px;">Price</th>
    <th style="border-bottom: 1px solid #222; text-align: center; width: 150px;">Amount</th>
	</tr>
	</thead>
	<tbody>';

	$invoice_items_rs = Database::search("SELECT * FROM invoice_item WHERE invoice_id = '$id'");
	$invoice_items_num = $invoice_items_rs->num_rows;

	// Initialize variables to store tax total and grand total
	$taxTotal = 0;
	$subTotal = 0;

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

			// Calculate tax for this item
			$tax = $row['tax'];
			$taxAmount = ($totalPrice * $tax) / 100;

			// Add tax amount to tax total
			$taxTotal += $taxAmount;

			// Add total price (to grand total
			$subTotal += $totalPrice;

			// Add HTML code for this item to the $html string
			$html .= '<tr>';
			$html .= '<td style="border-bottom: 1px solid #222; width: 350px;">';
			$html .= '<span>' . $itemName . '</span><br/>';
			$html .= '<span style="color: #9E9E9E;">' . $itemDescription . '</span>';
			$html .= '</td>';
			$html .= '<td style="border-bottom: 1px solid #222; text-align: right; width: 70px;">' . $qty . '</td>';
			$html .= '<td style="border-bottom: 1px solid #222; text-align: right; width: 130px;">LKR ' . number_format($price, 2) . '</td>';
			$html .= '<td style="border-bottom: 1px solid #222; text-align: right; width: 150px;">LKR ' . number_format($totalPrice, 2) . '</td>';
			$html .= '</tr>';
		}
	} else {
		// No invoice items found
		$html .= '<tr><td colspan="4">No items found</td></tr>';
	}

	$totalAmount = $subTotal + $taxTotal;

	$html .= '</tbody>
</table>';
	$html .= '
    <table style="padding: 15px;">
    <tbody>
	<tr style="padding: 15px;">
    <td style="padding: 15px;"><span>Payment Instruction</span><br/>
	<span style="color: #9E9E9E;">' . $data['instruction'] . '</span>
	</td>
	<td align="right"><strong>Sub Total: LKR  ' . number_format($subTotal, 2) . '</strong><br/><strong>Total tax: LKR ' . number_format($taxTotal, 2) . '</strong><br/><strong>Grand total: LKR ' . number_format($totalAmount, 2) . '</strong></td>
	</tr>
	<tr>
	<td style="padding: 15px;" colspan="4">
	<span style="font-size:16px;">Notes / Terms<br/></span>
	<span style="color: #9E9E9E;">PLEASE PRODUSE THE INVOICE FOR WARRANTY. NO WARRANTY FOR CHIP BURNS, PHYSICAL DAMAGE OR CORROSION. Warranty covers only manufacturer\'s defects. Damage or defect due to other causes such as negligence, misuses, improper operation, power fluctuation, lightening, or other natural disasters, sabotage, or accident etc. (01M) = 30 Days, (03M) = 90 Days, (06M) = 180 Days, (01Y) = 350 Days, (02Y) = 700 Days, (03Y) = 1050 Days, (05Y) = 1750 Days, (10Y) = 3500 Days, (L/W) = Lifetime Warranty. (N/W) = No Warranty).</span><br/>
	<span style="color: #9E9E9E;">' . $data['notes'] . '</span>
	</td>
	</tr>
    <tr>
	<td style="padding: 15px;" colspan="4">
	<span style="font-size:16px;">Footer:<br/></span>
	<span style="color: #9E9E9E;">' . $data['footer'] . '<br/></span>
	<span style="color: #9E9E9E;">We know the world is full of choices. Thank you for selecting us.<br/></span>
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
	$pdf->SetMargins(5, 5, -1);
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
	$pdf->SetFont($fontname, '', 10);
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
