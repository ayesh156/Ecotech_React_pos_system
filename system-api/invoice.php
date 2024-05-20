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

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "POST":

        $email = $_GET['email'] ?? null;
        // Check if the email parameter is provided
        if ($email !== null) {
            if (isset($email)) {
                $email = $_GET['email'];

                $input = file_get_contents('php://input');
                $data = json_decode($input, true);

                if ($data) {
                    $customerId = $data['customerId'];
                    $invoiceNumber = $data['invoiceNumber'];
                    $selectedDate = $data['selectedDate'];
                    $selectedDueDate = $data['selectedDueDate'];
                    $summary = $data['summary'];
                    $notes = $data['notes'];
                    $footerNotes = $data['footerNotes'];
                    $paidAmount = $data['paidAmount'];
                    $paymentInstructions = $data['paymentInstructions'];
                    $productTable = $data['productTable'];

                    $user_rs = Database::search("SELECT * FROM user WHERE email = '$email'");
                    $user_data = $user_rs->fetch_assoc();

                    // Ensure paidAmount is set to 0 if it's empty
                    if (empty($paidAmount)) {
                        $paidAmount = 0;
                    }

                    // Calculate the total amount
                    $totalAmount = 0;
                    foreach ($productTable as $product) {
                        $qty = $product['qty'];
                        $price = $product['price'];
                        $tax = $product['tax'];

                        $totalProductPrice = $qty * $price;
                        $totalProductTax = $totalProductPrice * ($tax / 100);
                        $totalAmount += $totalProductPrice + $totalProductTax;
                    }

                    $dueAmount = $totalAmount - $paidAmount;

                    // Ensure the due amount is not negative
                    if ($dueAmount < 0) {
                        $dueAmount = 0;
                    }

                    // Calculate the balance
                    $balance = $paidAmount - $totalAmount;

                    $data_rs = Database::search("SELECT * FROM customer WHERE id = $customerId");
                    $data = $data_rs->fetch_assoc();

                    $html = '
    <table style="padding: 15px 0 8px 15px;">
        <tbody>
        <tr>
        <td style=" width: 95px;"><img src="' . $user_data['company_image'] . '"/></td>
    
        <td style="width: 381px;">
        <span style="font-size: 20px;">' . $user_data['company_name'] . '</span>
        <br/>
        <span style="color: #9E9E9E;">' . $user_data['company_address'] . '</span>
        </td>
    
        <td style="width: 230px;" align="right">
        <span style="font-size: 16px;">Contact information</span><br/>
        <span style="color: #9E9E9E;">' . $user_data['company_email'] . '</span><br/>
        <span style="color: #9E9E9E;">' . $user_data['company_mobile'] . '</span>
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
        <table style="padding: 5px 15px 10px 15px;">
        <tbody>
        <tr>
        <td style="width: 546px;"><span style="font-size: 22px;">' . explode(" ", $user_data['company_name'])[0] . ' INVOICE</span><br/><span style="color: #9E9E9E;font-size: 18px;">' . $user_data['company_name'] . '</span>
        </td>
        <td align="right" style="width: 190px;" ><span style="font-size: 17px;">Amount Due (LKR)</span><br/><span style="font-size: 25px; font-weight: bold;">' . number_format($dueAmount, 2) . '</span>
        </td>
        </tr>
        </tbody>
        </table>
        ';


                    $html .= '
	<table style="padding: 0 15px 15px 15px;">
	<tbody>
	<tr>
	<td style="width: 546px;"><span style="color: #9E9E9E;">Bill to: </span>' . $data['name'] . '<br/>
	<span style="color: #9E9E9E;">Email: </span>' . $data['email'] . '<br/>
	<span style="color: #9E9E9E;">Phone: </span>' . $data['mobile'] . '
	</td>
	<td  style="width: 190px;">
	<span style="color: #9E9E9E;">Invoice Number: </span>' . $invoiceNumber . '<br/>
	<span style="color: #9E9E9E;">Invoice Date: </span>' . $selectedDate . '<br/>
	<span style="color: #9E9E9E;">Payment Due: </span>' . $selectedDueDate . '
	</td>
	</tr>
	</tbody>
	</table>
	';
                    $html .= '
    <table style="padding: 15px 8px 15px 15px;">
	<thead>
	<tr style="font-weight:bold;background-color: #F5F5FF;">
    <th style="border-bottom: 1px solid #9E9E9E; width: 350px;">Items</th>
    <th style="border-bottom: 1px solid #9E9E9E; text-align: center; width: 70px;">Quantity</th>
    <th style="border-bottom: 1px solid #9E9E9E; text-align: center; width: 130px;">Price</th>
    <th style="border-bottom: 1px solid #9E9E9E; text-align: right; width: 173px;">Amount</th>
	</tr>
	</thead>
	<tbody>';

                    // Insert into invoice table
                    $sql_invoice = "INSERT INTO invoice (customer_id, invoice_id, date, due_date, summary, notes, footer, paid_amount, instruction) VALUES ('$customerId', '$invoiceNumber', '$selectedDate', '$selectedDueDate', '$summary', '$notes', '$footerNotes', '$paidAmount', '$paymentInstructions')";
                    $status_invoice = Database::iud($sql_invoice);

                    if ($status_invoice) {
                        // Get the last inserted invoice ID
                        $invoice_id = Database::getLastInsertedId();

                        $taxTotal = 0;
                        $subTotal = 0;

                        $i = 0; // Initialize the counter
                        $invoice_items_num = count($productTable); // Get the number of items
                        // Insert into invoice_item table
                        foreach ($productTable as $product) {
                            $name = $product['name'];
                            $description = $product['description'];
                            $qty = is_numeric($product['qty']) ? $product['qty'] : 0;
                            $buying_price = is_numeric($product['buying_price']) && $product['buying_price'] > 0 ? $product['buying_price'] : 0;
                            $price = is_numeric($product['price']) ? $product['price'] : 0;
                            $tax = is_numeric($product['tax']) ? $product['tax'] : 0;
                            $totalPrice = $qty * $price;

                            // Calculate tax for this item
                            $taxAmount = ($totalPrice * $tax) / 100;

                            // Add tax amount to tax total
                            $taxTotal += $taxAmount;

                            // Add total price (to grand total
                            $subTotal += $totalPrice;

                            $sql_invoice_item = "INSERT INTO invoice_item (invoice_id, name, description, qty, selling_price, buying_price, tax) VALUES ('$invoice_id', '$name', '$description', '$qty', '$price', '$buying_price', '$tax')";
                            $status_invoice_item = Database::iud($sql_invoice_item);

                            // Determine if this is the last item
                            $borderStyle = ($i === $invoice_items_num - 1) ? '' : 'border-bottom: 1px solid #dfe6e9;';

                            $html .= '<tr>';
                            $html .= '<td style="' . $borderStyle . ' width: 350px;">';
                            $html .= '<span>' . $name . '</span><br/>';
                            $html .= '<span style="color: #9E9E9E;">' . $description . '</span>';
                            $html .= '</td>';
                            $html .= '<td style="' . $borderStyle . ' text-align: center; width: 70px; color: #2d3436;">' . $qty . '</td>';
                            $html .= '<td style="' . $borderStyle . ' text-align: right; width: 130px; color: #2d3436;">LKR ' . number_format($price, 2) . '</td>';
                            $html .= '<td style="' . $borderStyle . ' text-align: right; width: 173px; color: #2d3436;">LKR ' . number_format($totalPrice, 2) . '</td>';
                            $html .= '</tr>';

                            if (!$status_invoice_item) {
                                $response = ['status' => 0, 'message' => 'Failed to create invoice item record.'];
                                echo json_encode($response);
                                exit;
                            }

                            $i++; // Increment the counter
                        }

                    } else {
                        // No invoice items found
                        $html .= '<tr><td colspan="4">No items found</td></tr>';
                    }

                    // Update the customer balance if the balance is negative
                    if ($balance < 0) {
                        $balanceUpdate = abs($balance);
                        $sql_update_balance = "UPDATE customer SET balance = balance + '$balanceUpdate' WHERE id = '$customerId'";
                        $status_update_balance = Database::iud($sql_update_balance);

                        if (!$status_update_balance) {
                            $response = ['status' => 0, 'message' => 'Failed to update customer balance.'];
                            echo json_encode($response);
                            exit;
                        }
                    }

                    $html .= '</tbody>
</table>';
                    $html .= '
    <table style="padding: 5px 18px 5px 9px;">
    <hr style="color: #9E9E9E;" />
    <tbody>
	<tr>
    <td><span>Payment Instruction</span><br/>
	<span style="color: #9E9E9E;">' . $paymentInstructions . '</span>
	</td>
	<td align="right"><strong>Grand Total: LKR ' . number_format($totalAmount, 2) . '</strong></td>
	</tr>
    </tbody>
</table>';

                    // Check if the notes is not empty
                    $notesText = !empty($notes) ? '<br/>' . $notes : '';
                    // Check if the footer is not empty
                    $footerText = !empty($footerNotes) ? $footerNotes . '<br/>' : '';

                    $html .= '
<table style="padding: 5px 18px 5px 9px;">
    <tbody>
	<tr>
	<td colspan="4">
	<span style="font-size:16px;">Notes / Terms<br/></span>
	<span style="color: #9E9E9E;">PLEASE PRODUSE THE INVOICE FOR WARRANTY. NO WARRANTY FOR CHIP BURNS, PHYSICAL DAMAGE OR CORROSION. Warranty covers only manufacturer\'s defects. Damage or defect due to other causes such as negligence, misuses, improper operation, power fluctuation, lightening, or other natural disasters, sabotage, or accident etc. (01M) = 30 Days, (03M) = 90 Days, (06M) = 180 Days, (01Y) = 350 Days, (02Y) = 700 Days, (03Y) = 1050 Days, (05Y) = 1750 Days, (10Y) = 3500 Days, (L/W) = Lifetime Warranty. (N/W) = No Warranty).</span><span style="color: #9E9E9E;">' . $notesText . '</span>
	</td>
	</tr>
    <tr>
	<td colspan="4">
	<span style="font-size:16px;">Footer:<br/></span>
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
                    $pdf->SetFont($fontname, '', 10);
                    $pdf->AddPage();
                    // Print text using writeHTMLCell()
                    $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 0, 0, true, '', true);
                    //$pdf->Output(dirname(__FILE__).'example_001.pdf', 'F');

                    // ---------------------------------------------------------

                    // Generate a unique PDF filename
                    $pdfFilename = 'Invoice_#' . $invoiceNumber . '.pdf';

                    if (filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {

                        $pdfContent = $pdf->Output($pdfFilename, 'S');


                        //============================================================+
                        // END OF FILE
                        //============================================================+

                        $mail = new PHPMailer;
                        $mail->IsSMTP();
                        $mail->Host = 'smtp.gmail.com';
                        $mail->SMTPAuth = true;
                        $mail->Username = 'sender'; // sender
                        $mail->Password = ' '; // Enter your SMTP password here
                        $mail->SMTPSecure = 'ssl';
                        $mail->Port = 465;
                        $mail->setFrom('sender email', 'sender'); // sender email  sender
                        $mail->addReplyTo('sender emai', 'sender'); // sender email  sender
                        $mail->addAddress($data['email']);
                        $mail->isHTML(true);
                        $mail->Subject = 'Invoice_#' . $invoiceNumber;
                        $bodyContent = '<div style="width: 100%; background-color: #F6F6F6; padding: 30px 0 50px 0;">
                <div
                    style="width: 600px; background-color: #fff; margin: auto; padding: 20px; text-align: center; border: 1px solid #E9E9E9; text-align: left;">
                    <div>Hi,</div>
                    <div style="margin-top: 10px;">Please see the attached Invoice_#' . $invoiceNumber . ' The due amount is LKR ' . number_format($dueAmount, 2) . ' The invoice
                        is due by ' . $selectedDate . '. Please
                        don\'t hesitate to get in touch if you have any questions or need clarifications.</div>
                    <div style="margin-top: 10px;">Best regards,</div>
                </div>
                </div>';
                        $mail->Body = $bodyContent;

                        // Attach the PDF
                        $mail->addStringAttachment($pdfContent, 'Invoice_#' . $invoiceNumber . '.pdf');

                        if (!$mail->send()) {
                            $response = ['status' => 0, 'message' => 'Email sending failed: ' . $mail->ErrorInfo];
                        }

                    } else {
                        $response = ['status' => 0, 'message' => 'Invalid email address provided.'];
                    }

                    $response = ['status' => 1, 'message' => 'Invoice created successfully.', 'invoice_id' => $invoice_id];

                } else {
                    $response = ['status' => 0, 'message' => 'Invalid input.'];
                }

            } else {
                $response = ['status' => 0, 'message' => 'Invalid email provided.'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'Please login first!'];
        }

        echo json_encode($response);
        break;

    case 'GET':
        $email = $_GET['email'] ?? null;

        // Check if the email parameter is provided
        if ($email !== null) {
            if (isset($_GET['id']) && isset($email)) {
                $id = $_GET['id'];
                $email = $_GET['email'];

                // Select data from the invoice table based on id and email
                $sql = "SELECT * FROM invoice WHERE id = '$id'";
                $result = Database::search($sql); // Assuming Database::search executes the SQL query

                // Fetch data and format as an associative array
                $invoice = [];
                $row = $result->fetch_assoc();
                if ($row) {
                    $invoice = [
                        'customerId' => intval($row['customer_id']),
                        'footerNotes' => $row['footer'],
                        'invoiceNumber' => intval($row['invoice_id']),
                        'notes' => $row['notes'],
                        'paidAmount' => intval($row['paid_amount']),
                        'selectedDate' => $row['date'],
                        'paymentInstructions' => $row['instruction'],
                        'selectedDueDate' => $row['due_date'],
                        'summary' => $row['summary'],
                        'productTable' => [] // Initialize productTable array
                    ];

                    // Initialize an auto-incrementing id variable
                    $autoIncrementId = 1;

                    // Assuming $id contains the invoice ID
                    $ii_sql = "SELECT * FROM invoice_item WHERE invoice_id = '$id'";
                    $ii_result = Database::search($ii_sql); // Assuming Database::search executes the SQL query

                    // Loop through the result set to fetch all rows
                    while ($ii_row = $ii_result->fetch_assoc()) {

                        $qty = intval($ii_row['qty']);
                        $price = intval($ii_row['selling_price']);
                        $tax = intval($ii_row['tax']);

                        $totalAmount = 0;
                        $totalProductPrice = $qty * $price;
                        $totalProductTax = $totalProductPrice * ($tax / 100);
                        $totalAmount += $totalProductPrice + $totalProductTax;

                        // Format each row as an associative array
                        $invoice_item = [
                            'id' => $autoIncrementId++, // Auto-incrementing id
                            'name' => $ii_row['name'],
                            'description' => $ii_row['description'],
                            'qty' => intval($ii_row['qty']),
                            'buying_price' => intval($ii_row['buying_price']),
                            'price' => intval($ii_row['selling_price']),
                            'tax' => intval($ii_row['tax']),
                            'amount' => $totalAmount
                        ];

                        // Add the formatted invoice item to the productTable array
                        $invoice['productTable'][] = $invoice_item;
                    }
                }

                // Prepare the final response
                $response = ['status' => 1, 'message' => 'Invoice found successfully.', 'invoice' => $invoice];

            } else {
                $response = ['status' => 0, 'message' => 'Invalid id or email provided.'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'Please login first!'];
        }
        echo json_encode($response);

        break;

    case "PUT":

        $email = $_GET['email'] ?? null;

        // Check if the email parameter is provided
        if ($email !== null) {
            if (isset($_GET['id']) && isset($email)) {
                $id = $_GET['id'];
                $email = $_GET['email'];

                $input = file_get_contents('php://input');
                $data = json_decode($input, true);

                if ($data) {
                    $customerId = $data['customerId'];
                    $invoiceNumber = $data['invoiceNumber'];
                    $selectedDate = $data['selectedDate'];
                    $selectedDueDate = $data['selectedDueDate'];
                    $summary = $data['summary'];
                    $notes = $data['notes'];
                    $footerNotes = $data['footerNotes'];
                    $paidAmount = $data['paidAmount'];
                    $paymentInstructions = $data['paymentInstructions'];
                    $productTable = $data['productTable'];

                    $user_rs = Database::search("SELECT * FROM user WHERE email = '$email'");
                    $user_data = $user_rs->fetch_assoc();

                    // Ensure paidAmount is set to 0 if it's empty
                    if (empty($paidAmount)) {
                        $paidAmount = 0;
                    }

                    // Calculate the total amount
                    $totalAmount = 0;
                    foreach ($productTable as $product) {
                        $qty = is_numeric($product['qty']) ? $product['qty'] : 0;
                        $price = is_numeric($product['price']) ? $product['price'] : 0;
                        $tax = is_numeric($product['tax']) ? $product['tax'] : 0;

                        $totalProductPrice = $qty * $price;
                        $totalProductTax = $totalProductPrice * ($tax / 100);
                        $totalAmount += $totalProductPrice + $totalProductTax;
                    }

                    $dueAmount = $totalAmount - $paidAmount;

                    // Ensure the due amount is not negative
                    if ($dueAmount < 0) {
                        $dueAmount = 0;
                    }

                    // Update invoice table
                    $sql_invoice = "UPDATE invoice SET customer_id = '$customerId', invoice_id = '$invoiceNumber', date = '$selectedDate', due_date = '$selectedDueDate', summary = '$summary', notes = '$notes', footer = '$footerNotes', paid_amount = '$paidAmount', instruction = '$paymentInstructions' WHERE id = '$id'";
                    $status_invoice = Database::iud($sql_invoice);

                    $data_rs = Database::search("SELECT * FROM customer WHERE id = $customerId");
                    $data = $data_rs->fetch_assoc();

                    $html = '
<table style="padding: 15px 0 15px 15px;">
	<tbody>
	<tr>
    <td style=" width: 95px;"><img src="' . $user_data['company_image'] . '"/></td>

	<td style="width: 381px;">
	<span style="font-size: 20px;">' . $user_data['company_name'] . '</span>
	<br/>
	<span style="color: #9E9E9E;">' . $user_data['company_address'] . '</span>
	</td>

	<td style="width: 230px;" align="right">
	<span style="font-size: 16px;">Contact information</span><br/>
	<span style="color: #9E9E9E;">' . $user_data['company_email'] . '</span><br/>
	<span style="color: #9E9E9E;">' . $user_data['company_mobile'] . '</span>
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
	<table style="padding: 5px 15px;">
	<tbody>
	<tr>
	<td style="width: 546px;">
	<span style="font-size: 22px;">' . explode(" ", $user_data['company_name'])[0] . ' INVOICE</span>
	<br/>
	<span style="color: #9E9E9E;font-size: 18px;">' . $user_data['company_name'] . '</span>
	</td>
	<td align="right" style="width: 190px;" >
	<span style="font-size: 17px;">Amount Due (LKR)</span>
	<br/>
	<span style="font-size: 25px; font-weight: bold;">' . number_format($dueAmount, 2) . '</span>
	</td>
	</tr>
	</tbody>
	</table>
	';
                    $html .= '
	<table style="padding: 0 15px 15px 15px;">
	<tbody>
	<tr>
	<td style="width: 546px;"><span style="color: #9E9E9E;">Bill to: </span>' . $data['name'] . '<br/>
	<span style="color: #9E9E9E;">Email: </span>' . $data['email'] . '<br/>
	<span style="color: #9E9E9E;">Phone: </span>' . $data['mobile'] . '
	</td>
	<td  style="width: 190px;">
	<span style="color: #9E9E9E;">Invoice Number: </span>' . $id . '<br/>
	<span style="color: #9E9E9E;">Invoice Date: </span>' . $selectedDate . '<br/>
	<span style="color: #9E9E9E;">Payment Due: </span>' . $selectedDueDate . '
	</td>
	</tr>
	</tbody>
	</table>
	';
                    $html .= '
    <table style="padding: 15px 8px 15px 15px;">
	<thead>
	<tr style="font-weight:bold;background-color: #F5F5FF;">
    <th style="border-bottom: 1px solid #9E9E9E; width: 350px;">Items</th>
    <th style="border-bottom: 1px solid #9E9E9E; text-align: center; width: 70px;">Quantity</th>
    <th style="border-bottom: 1px solid #9E9E9E; text-align: center; width: 130px;">Price</th>
    <th style="border-bottom: 1px solid #9E9E9E; text-align: right; width: 173px;">Amount</th>
	</tr>
	</thead>
	<tbody>';

                    if ($status_invoice) {
                        // Delete existing invoice items
                        $sql_delete_items = "DELETE FROM invoice_item WHERE invoice_id = '$id'";
                        $status_delete_items = Database::iud($sql_delete_items);

                        if (!$status_delete_items) {
                            $response = ['status' => 0, 'message' => 'Failed to delete existing invoice items.'];
                            echo json_encode($response);
                            exit;
                        }

                        $taxTotal = 0;
                        $subTotal = 0;

                        $i = 0; // Initialize the counter
                        $invoice_items_num = count($productTable); // Get the number of items
                        // Insert new invoice items
                        foreach ($productTable as $product) {
                            $name = $product['name'];
                            $description = $product['description'];
                            $qty = is_numeric($product['qty']) ? $product['qty'] : 0;
                            $buying_price = is_numeric($product['buying_price']) && $product['buying_price'] > 0 ? $product['buying_price'] : 0;
                            $price = is_numeric($product['price']) ? $product['price'] : 0;
                            $tax = is_numeric($product['tax']) ? $product['tax'] : 0;
                            $totalPrice = $qty * $price;

                            // Calculate tax for this item
                            $taxAmount = ($totalPrice * $tax) / 100;

                            // Add tax amount to tax total
                            $taxTotal += $taxAmount;

                            // Add total price (to grand total
                            $subTotal += $totalPrice;

                            $sql_invoice_item = "INSERT INTO invoice_item (invoice_id, name, description, qty, selling_price, buying_price, tax) VALUES ('$id', '$name', '$description', '$qty', '$price', '$buying_price', '$tax')";
                            $status_invoice_item = Database::iud($sql_invoice_item);

                            // Determine if this is the last item
                            $borderStyle = ($i === $invoice_items_num - 1) ? '' : 'border-bottom: 1px solid #dfe6e9;';

                            $html .= '<tr>';
                            $html .= '<td style="' . $borderStyle . ' width: 350px;">';
                            $html .= '<span>' . $name . '</span><br/>';
                            $html .= '<span style="color: #9E9E9E;">' . $description . '</span>';
                            $html .= '</td>';
                            $html .= '<td style="' . $borderStyle . ' text-align: center; width: 70px; color: #2d3436;">' . $qty . '</td>';
                            $html .= '<td style="' . $borderStyle . ' text-align: right; width: 130px; color: #2d3436;">LKR ' . number_format($price, 2) . '</td>';
                            $html .= '<td style="' . $borderStyle . ' text-align: right; width: 173px; color: #2d3436;">LKR ' . number_format($totalPrice, 2) . '</td>';
                            $html .= '</tr>';

                            if (!$status_invoice_item) {
                                $response = ['status' => 0, 'message' => 'Failed to create invoice item record.'];
                                echo json_encode($response);
                                exit;
                            }

                            $i++; // Increment the counter
                        }


                    } else {
                        // No invoice items found
                        $html .= '<tr><td colspan="4">No items found</td></tr>';
                    }

                    $html .= '</tbody>
</table>';
                    $html .= '
    <table style="padding: 5px 18px 5px 9px;">
    <hr style="color: #9E9E9E;" />
    <tbody>
	<tr>
    <td><span>Payment Instruction</span><br/>
	<span style="color: #9E9E9E;">' . $paymentInstructions . '</span>
	</td>
	<td align="right"><strong>Grand Total: LKR ' . number_format($totalAmount, 2) . '</strong></td>
	</tr>
    </tbody>
</table>';

                    // Check if the notes is not empty
                    $notesText = !empty($notes) ? '<br/>' . $notes : '';
                    // Check if the footer is not empty
                    $footerText = !empty($footerNotes) ? $footerNotes . '<br/>' : '';

                    $html .= '
<table style="padding: 5px 18px 5px 9px;">
    <tbody>
	<tr>
	<td colspan="4">
	<span style="font-size:16px;">Notes / Terms<br/></span>
	<span style="color: #9E9E9E;">PLEASE PRODUSE THE INVOICE FOR WARRANTY. NO WARRANTY FOR CHIP BURNS, PHYSICAL DAMAGE OR CORROSION. Warranty covers only manufacturer\'s defects. Damage or defect due to other causes such as negligence, misuses, improper operation, power fluctuation, lightening, or other natural disasters, sabotage, or accident etc. (01M) = 30 Days, (03M) = 90 Days, (06M) = 180 Days, (01Y) = 350 Days, (02Y) = 700 Days, (03Y) = 1050 Days, (05Y) = 1750 Days, (10Y) = 3500 Days, (L/W) = Lifetime Warranty. (N/W) = No Warranty).</span><span style="color: #9E9E9E;">' . $notesText . '</span>
	</td>
	</tr>
    <tr>
	<td colspan="4">
	<span style="font-size:16px;">Footer:<br/></span>
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
                    $pdf->SetFont($fontname, '', 10);
                    $pdf->AddPage();
                    // Print text using writeHTMLCell()
                    $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 0, 0, true, '', true);
                    //$pdf->Output(dirname(__FILE__).'example_001.pdf', 'F');

                    // ---------------------------------------------------------

                    // Generate a unique PDF filename
                    $pdfFilename = 'Invoice_#' . $invoiceNumber . '.pdf';

                    if (filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {

                        $pdfContent = $pdf->Output($pdfFilename, 'S');


                        //============================================================+
                        // END OF FILE
                        //============================================================+

                        $mail = new PHPMailer;
                        $mail->IsSMTP();
                        $mail->Host = 'smtp.gmail.com';
                        $mail->SMTPAuth = true;
                        $mail->Username = 'sender'; // sender
                        $mail->Password = ' '; // Enter your SMTP password here
                        $mail->SMTPSecure = 'ssl';
                        $mail->Port = 465;
                        $mail->setFrom('sender email', 'sender'); // sender email  sender
                        $mail->addReplyTo('sender emai', 'sender'); // sender email  sender
                        $mail->addAddress($data['email']);
                        $mail->isHTML(true);
                        $mail->Subject = 'Invoice_#' . $invoiceNumber;
                        $bodyContent = '<div style="width: 100%; background-color: #F6F6F6; padding: 30px 0 50px 0;">
                <div
                    style="width: 600px; background-color: #fff; margin: auto; padding: 20px; text-align: center; border: 1px solid #E9E9E9; text-align: left;">
                    <div>Hi,</div>
                    <div style="margin-top: 10px;">Please see the attached Invoice_#' . $invoiceNumber . ' The due amount is LKR ' . number_format($dueAmount, 2) . ' The invoice
                        is due by ' . $selectedDate . '. Please
                        don\'t hesitate to get in touch if you have any questions or need clarifications.</div>
                    <div style="margin-top: 10px;">Best regards,</div>
                </div>
                </div>';
                        $mail->Body = $bodyContent;

                        // Attach the PDF
                        $mail->addStringAttachment($pdfContent, 'Invoice_#' . $invoiceNumber . '.pdf');

                        if (!$mail->send()) {
                            $response = ['status' => 0, 'message' => 'Email sending failed: ' . $mail->ErrorInfo];
                        }

                    } else {
                        $response = ['status' => 0, 'message' => 'Invalid email address provided.'];
                    }

                    $response = ['status' => 1, 'message' => 'Invoice updated successfully.'];

                } else {
                    $response = ['status' => 0, 'message' => 'Invalid input.'];
                }
            } else {
                $response = ['status' => 0, 'message' => 'Invalid email provided.'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'Please login first!'];
        }

        echo json_encode($response);
        break;
}
?>