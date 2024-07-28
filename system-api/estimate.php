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

                $action = $data['action'] ?? '';

                switch ($action) {
                    case 'send':
                        $response = handleSendEstimate($data, $email);
                        break;

                    case 'save':
                        $response = handleSaveEstimate($data, $email);
                        break;

                    default:
                    $response = ['status' => 0, 'message' => 'Invalid action'];
                        break;
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

        if ($email !== null) {
            if (isset($email)) {
                // Handle the case where both 'id' and 'email' are provided
                if (isset($_GET['id'])) {
                    $id = $_GET['id'];
                    $email = $_GET['email'];

                    // Select data from the estimate table based on id and email
                    $sql = "SELECT * FROM estimate WHERE id = '$id'";
                    $result = Database::search($sql); // Assuming Database::search executes the SQL query

                    // Fetch data and format as an associative array
                    $estimate = [];
                    $row = $result->fetch_assoc();
                    if ($row) {
                        $estimate = [
                            'customerId' => intval($row['customer_id']),
                            'footerNotes' => $row['footer'],
                            'estimateNumber' => intval($row['estimate_id']),
                            'notes' => $row['notes'],
                            'paidAmount' => intval($row['paid_amount']),
                            'selectedDate' => $row['date'],
                            'paymentInstructions' => $row['instruction'],
                            'selectedDueDate' => $row['due_date'],
                            'estimateName' => $row['name'],
                            'subhead' => $row['subhead'],
                            'productTable' => [] // Initialize productTable array
                        ];

                        // Initialize an auto-incrementing id variable
                        $autoIncrementId = 1;

                        // Fetch estimate items
                        $ii_sql = "SELECT * FROM estimate_item WHERE estimate_id = '$id'";
                        $ii_result = Database::search($ii_sql); // Assuming Database::search executes the SQL query

                        while ($ii_row = $ii_result->fetch_assoc()) {
                            $qty = intval($ii_row['qty']);
                            $price = intval($ii_row['selling_price']);
                            $tax = intval($ii_row['tax']);

                            $totalAmount = 0;
                            $totalProductPrice = $qty * $price;
                            $totalProductTax = $totalProductPrice * ($tax / 100);
                            $totalAmount += $totalProductPrice + $totalProductTax;

                            // Format each row as an associative array
                            $estimate_item = [
                                'id' => $autoIncrementId++, // Auto-incrementing id
                                'name' => $ii_row['name'],
                                'description' => $ii_row['description'],
                                'qty' => intval($ii_row['qty']),
                                'buying_price' => intval($ii_row['buying_price']),
                                'price' => intval($ii_row['selling_price']),
                                'tax' => intval($ii_row['tax']),
                                'amount' => $totalAmount
                            ];

                            // Add the formatted estimate item to the productTable array
                            $estimate['productTable'][] = $estimate_item;
                        }
                    }

                    // Prepare the final response
                    $response = ['status' => 1, 'message' => 'Estimate found successfully.', 'estimate' => $estimate];

                } else {
                    // Handle the case where only 'email' is provided
                    $estimate_rs = Database::search("SELECT estimate.id AS id, TRIM(customer.name) AS name, date, due_date FROM estimate INNER JOIN customer ON estimate.customer_id = customer.id WHERE customer.user_email = '$email'");
                    $estimate_num = $estimate_rs->num_rows;

                    if ($estimate_num > 0) {
                        $estimate_data = array();
                        while ($row = $estimate_rs->fetch_assoc()) {
                            // Convert id to integer
                            $row['id'] = intval($row['id']);

                            // Fetch estimate items for the current estimate
                            $estimateId = $row['id'];
                            $estimateItems_rs = Database::search("SELECT * FROM estimate_item WHERE estimate_id = $estimateId");
                            $totalAmount = 0;

                            while ($itemRow = $estimateItems_rs->fetch_assoc()) {
                                // Calculate total amount for each item and add to totalAmount
                                $totalAmount += ($itemRow['qty'] * $itemRow['selling_price']);
                            }

                            // Calculate due amount
                            $estimate_rs = Database::search("SELECT estimate.id AS id, estimate_id, customer.name AS name, date, due_date, paid_amount FROM estimate INNER JOIN customer ON estimate.customer_id = customer.id WHERE customer.user_email = '$email'");
                            $estimate_num = $estimate_rs->num_rows;

                            if ($estimate_num > 0) {
                                $estimate_data = array();
                                while ($row = $estimate_rs->fetch_assoc()) {

                                    // Convert id to integer
                                    $row['estimate_id'] = intval($row['estimate_id']);

                                    // Trim spaces from the name field
                                    $row['name'] = trim($row['name']);

                                    // Check if the name contains a space
                                    if (strpos($row['name'], ' ') !== false) {
                                        // Split the name into an array of words
                                        $nameParts = explode(" ", $row['name']);

                                        // Remove the last name
                                        array_pop($nameParts);

                                        // Reconstruct the name without the last name
                                        $row['name'] = implode(" ", $nameParts);
                                    }

                                    // Fetch estimate items for the current estimate
                                    $estimateId = $row['id'];
                                    $estimateItems_rs = Database::search("SELECT * FROM estimate_item WHERE estimate_id = $estimateId");
                                    $totalAmount = 0;

                                    while ($itemRow = $estimateItems_rs->fetch_assoc()) {
                                        // Calculate total amount for each item including tax and add to totalAmount
                                        $itemTotal = $itemRow['qty'] * $itemRow['selling_price'];
                                        $taxAmount = ($itemTotal * $itemRow['tax']) / 100;
                                        $totalAmount += $itemTotal + $taxAmount;
                                    }

                                    // Calculate due amount
                                    $dueAmount = max(0, $totalAmount - $row['paid_amount']);

                                    // Append total amount and due amount to the current row
                                    $row['total_amount'] = $totalAmount;
                                    $row['due_amount'] = $dueAmount;

                                    // Remove paid_amount from the row
                                    unset($row['paid_amount']);

                                    // Add row to estimate_data array
                                    $estimate_data[] = $row;
                                }

                                $response = ['status' => 1, 'message' => 'Record found successfully.', 'estimate' => $estimate_data];

                            } else {
                                $response = ['status' => 0, 'message' => 'Can\'t Find Any Estimates!'];
                            }
                        }

                        $response = ['status' => 1, 'message' => 'Record found successfully.', 'estimate' => $estimate_data];

                    } else {
                        $response = ['status' => 0, 'message' => 'Can\'t Find Any Estimates!'];
                    }
                }
            } else {
                $response = ['status' => 0, 'message' => 'Invalid email provided.'];
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

                $action = $data['action'] ?? '';

                switch ($action) {
                    case 'send':
                        $response = handleSendUEstimate($data, $email, $id);
                        break;

                    case 'save':
                        $response = handleUpdateEstimate($data, $email, $id);
                        break;

                    default:
                    $response = ['status' => 0, 'message' => 'Invalid action'];
                        break;
                }
                
            } else {
                $response = ['status' => 0, 'message' => 'Invalid email provided.'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'Please login first!'];
        }

        echo json_encode($response);
        break;

    case "DELETE":

        $email = $_GET['email'] ?? null;

        // Check if the email parameter is provided
        if ($email !== null) {
            if (isset($_GET['id']) && isset($email)) {
                // Add DELETE request handling for deleting an estimate and its items
                $estimateId = $_GET['id'] ?? null;

                // Delete all estimate items associated with the estimate
                $sql_delete_estimate_items = "DELETE FROM estimate_item WHERE estimate_id = '$estimateId'";
                $status_delete_estimate_items = Database::iud($sql_delete_estimate_items);

                if ($status_delete_estimate_items) {
                    // Delete the estimate itself
                    $sql_delete_estimate = "DELETE FROM estimate WHERE id = '$estimateId'";
                    $status_delete_estimate = Database::iud($sql_delete_estimate);

                    if ($status_delete_estimate) {
                        $response = ['status' => 1, 'message' => 'Estimate deleted successfully.'];
                    } else {
                        $response = ['status' => 0, 'message' => 'Failed to delete the estimate.'];
                    }
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to delete estimate items.'];
                }
            } else {
                $response = ['status' => 0, 'message' => 'Invalid id or email provided.'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'Please login first!'];
        }

        echo json_encode($response);
        break;
}


function handleSendEstimate($data, $email)
{

    $response = [];

    if ($data) {
        $customerId = $data['customerId'];
        $estimateNumber = $data['estimateNumber'];
        $selectedDate = $data['selectedDate'];
        $selectedDueDate = $data['selectedDueDate'];
        $estimateName = $data['estimateName'];
        $subhead = $data['subhead'];
        $notes = $data['notes'];
        $footerNotes = $data['footerNotes'];
        $paidAmount = $data['paidAmount'];
        $paymentInstructions = $data['paymentInstructions'];
        $productTable = $data['productTable'];

        $user_rs = Database::search("SELECT * FROM user WHERE email = '$email'");
        $user_data = $user_rs->fetch_assoc();

        if (empty($notes)) {
            $notes = $user_data['notes'];
        }
        if (empty($footerNotes)) {
            $footerNotes = $user_data['footer'];
        }
        if (empty($paymentInstructions)) {
            $paymentInstructions = $user_data['instruction'];
        }

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
<td style="width: 546px;"><span style="font-size: 22px;">' . explode(" ", $user_data['company_name'])[0] . ' ESTIMATE</span><br/><span style="color: #9E9E9E;font-size: 18px;">' . $user_data['company_name'] . '</span>
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
<span style="color: #9E9E9E;">Estimate Number: </span>' . $estimateNumber . '<br/>
<span style="color: #9E9E9E;">Estimate Date: </span>' . $selectedDate . '<br/>
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

        // Insert into estimate table
        $sql_estimate = "INSERT INTO estimate (customer_id, estimate_id, date, due_date, name, subhead, notes, footer, paid_amount, instruction, user_email) VALUES ('$customerId', '$estimateNumber', '$selectedDate', '$selectedDueDate', '$estimateName', '$subhead', '".$notes."', '".$footerNotes."', '$paidAmount', '".$paymentInstructions."','$email')";
        $status_estimate = Database::iud($sql_estimate);

        if ($status_estimate) {
            // Get the last inserted estimate ID
            $estimate_id = Database::getLastInsertedId();

            $taxTotal = 0;
            $subTotal = 0;

            $i = 0; // Initialize the counter
            $estimate_items_num = count($productTable); // Get the number of items
            // Insert into estimate_item table
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

                $sql_estimate_item = "INSERT INTO estimate_item (estimate_id, name, description, qty, selling_price, buying_price, tax) VALUES ('$estimate_id', '$name', '$description', '$qty', '$price', '$buying_price', '$tax')";
                $status_estimate_item = Database::iud($sql_estimate_item);

                // Determine if this is the last item
                $borderStyle = ($i === $estimate_items_num - 1) ? '' : 'border-bottom: 1px solid #dfe6e9;';

                $html .= '<tr>';
                $html .= '<td style="' . $borderStyle . ' width: 350px;">';
                $html .= '<span>' . $name . '</span><br/>';
                $html .= '<span style="color: #9E9E9E;">' . $description . '</span>';
                $html .= '</td>';
                $html .= '<td style="' . $borderStyle . ' text-align: center; width: 70px; color: #2d3436;">' . $qty . '</td>';
                $html .= '<td style="' . $borderStyle . ' text-align: right; width: 130px; color: #2d3436;">LKR ' . number_format($price, 2) . '</td>';
                $html .= '<td style="' . $borderStyle . ' text-align: right; width: 173px; color: #2d3436;">LKR ' . number_format($totalPrice, 2) . '</td>';
                $html .= '</tr>';

                if (!$status_estimate_item) {
                    $response = ['status' => 0, 'message' => 'Failed to create estimate item record.'];
                    echo json_encode($response);
                    exit;
                }

                $i++; // Increment the counter
            }

        } else {
            // No estimate items found
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
        $notesText = $notes;
        // Check if the footer is not empty
        $footerText = $footerNotes;

        $html .= '
<table style="padding: 5px 18px 5px 9px;">
<tbody>
<tr>
<td colspan="4">
<span style="font-size:16px;">Notes / Terms<br/></span>
<span style="color: #9E9E9E;">' . $notesText . '</span>
</td>
</tr>
<tr>
<td colspan="4">
<span style="font-size:16px;">Footer:<br/></span>
<span style="color: #9E9E9E;">' . $footerText . '</span>
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
        $pdfFilename = 'Estimate_#' . $estimateNumber . '.pdf';

        if (filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {

            $pdfContent = $pdf->Output($pdfFilename, 'S');


            //============================================================+
            // END OF FILE
            //============================================================+

            $mail = new PHPMailer;
            $mail->IsSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = ''; // sender
            $mail->Password = ''; // Enter your SMTP password here
            $mail->SMTPSecure = 'ssl';
            $mail->Port = 465;
            $mail->setFrom('sender email', ''); // sender email  sender
            $mail->addReplyTo('sender emai', ''); // sender email  sender
            $mail->addAddress($data['email']);
            $mail->isHTML(true);
            $mail->Subject = 'Estimate_#' . $estimateNumber;
            $bodyContent = '<div style="width: 100%; background-color: #F6F6F6; padding: 30px 0 50px 0;">
    <div
        style="width: 600px; background-color: #fff; margin: auto; padding: 20px; text-align: center; border: 1px solid #E9E9E9; text-align: left;">
        <div>Hi,</div>
        <div style="margin-top: 10px;">Please see the attached Estimate_#' . $estimateNumber . ' The due amount is LKR ' . number_format($dueAmount, 2) . ' The estimate
            is due by ' . $selectedDate . '. Please
            don\'t hesitate to get in touch if you have any questions or need clarifications.</div>
        <div style="margin-top: 10px;">Best regards,</div>
    </div>
    </div>';
            $mail->Body = $bodyContent;

            // Attach the PDF
            $mail->addStringAttachment($pdfContent, 'Estimate_#' . $estimateNumber . '.pdf');

        } else {
            $response = ['status' => 0, 'message' => 'Invalid email address provided.'];
        }

        $response = ['status' => 1, 'message' => 'Estimate updated successfully.', 'estimate_id' => $estimate_id];

        
        if (!$mail->send()) {
            $response = ['status' => 0, 'message' => 'Email sending failed: ' . $mail->ErrorInfo];
        }

    } else {
        $response = ['status' => 0, 'message' => 'Invalid input.'];
    }

    return $response;
}

function handleSaveEstimate($data, $email)
{
    $response = [];

    if ($data) {
        $customerId = $data['customerId'];
        $estimateNumber = $data['estimateNumber'];
        $selectedDate = $data['selectedDate'];
        $selectedDueDate = $data['selectedDueDate'];
        $estimateName = $data['estimateName'];
        $subhead = $data['subhead'];
        $notes = $data['notes'];
        $footerNotes = $data['footerNotes'];
        $paidAmount = $data['paidAmount'];
        $paymentInstructions = $data['paymentInstructions'];
        $productTable = $data['productTable'];

        $user_rs = Database::search("SELECT * FROM user WHERE email = '$email'");
        $user_data = $user_rs->fetch_assoc();

        if (empty($notes)) {
            $notes = $user_data['notes'];
        }
        if (empty($footerNotes)) {
            $footerNotes = $user_data['footer'];
        }
        if (empty($paymentInstructions)) {
            $paymentInstructions = $user_data['instruction'];
        }

        // Ensure paidAmount is set to 0 if it's empty
        if (empty($paidAmount)) {
            $paidAmount = 0;
        }


        // Insert into estimate table
        $sql_estimate = "INSERT INTO estimate (customer_id, estimate_id, date, due_date, name, subhead, notes, footer, paid_amount, instruction, user_email) VALUES ('$customerId', '$estimateNumber', '$selectedDate', '$selectedDueDate', '$estimateName', '$subhead', '".$notes."', '".$footerNotes."', '$paidAmount', '".$paymentInstructions."','$email')";
        $status_estimate = Database::iud($sql_estimate);

        if ($status_estimate) {
            // Get the last inserted estimate ID
            $estimate_id = Database::getLastInsertedId();

            // Insert into estimate_item table
            foreach ($productTable as $product) {
                $name = $product['name'];
                $description = $product['description'];
                $qty = is_numeric($product['qty']) ? $product['qty'] : 0;
                $buying_price = is_numeric($product['buying_price']) && $product['buying_price'] > 0 ? $product['buying_price'] : 0;
                $price = is_numeric($product['price']) ? $product['price'] : 0;
                $tax = is_numeric($product['tax']) ? $product['tax'] : 0;


                $sql_estimate_item = "INSERT INTO estimate_item (estimate_id, name, description, qty, selling_price, buying_price, tax) VALUES ('$estimate_id', '$name', '$description', '$qty', '$price', '$buying_price', '$tax')";
                $status_estimate_item = Database::iud($sql_estimate_item);

                if (!$status_estimate_item) {
                    $response = ['status' => 0, 'message' => 'Failed to create invoice item record.'];
                    echo json_encode($response);
                    exit;
                }


            }

        }

        $response = ['status' => 1, 'message' => 'Estimate updated successfully.', 'estimate_id' => $estimate_id];

    } else {
        $response = ['status' => 0, 'message' => 'Invalid input.'];
    }

    return $response;
}


function handleSendUEstimate($data, $email, $id){

    $response = [];

    if ($data) {
        $customerId = $data['customerId'];
        $estimateNumber = $data['estimateNumber'];
        $selectedDate = $data['selectedDate'];
        $selectedDueDate = $data['selectedDueDate'];
        $estimateName = $data['estimateName'];
        $subhead = $data['subhead'];
        $notes = $data['notes'];
        $footerNotes = $data['footerNotes'];
        $paidAmount = $data['paidAmount'];
        $paymentInstructions = $data['paymentInstructions'];
        $productTable = $data['productTable'];

        $user_rs = Database::search("SELECT * FROM user WHERE email = '$email'");
        $user_data = $user_rs->fetch_assoc();

        if (empty($notes)) {
            $notes = $user_data['notes'];
        }
        if (empty($footerNotes)) {
            $footerNotes = $user_data['footer'];
        }
        if (empty($paymentInstructions)) {
            $paymentInstructions = $user_data['instruction'];
        }

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

        // Update estimate table
        $sql_estimate = "UPDATE estimate SET customer_id = '$customerId', estimate_id = '$estimateNumber', date = '$selectedDate', due_date = '$selectedDueDate', name = '$estimateName',subhead = '$subhead', notes = '".$notes."', footer = '".$footerNotes."', paid_amount = '$paidAmount', instruction = '".$paymentInstructions."' WHERE id = '$id'";
        $status_estimate = Database::iud($sql_estimate);

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
<span style="font-size: 22px;">' . explode(" ", $user_data['company_name'])[0] . ' ESTIMATE</span>
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
<span style="color: #9E9E9E;">Estimate Number: </span>' . $id . '<br/>
<span style="color: #9E9E9E;">Estimate Date: </span>' . $selectedDate . '<br/>
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

        if ($status_estimate) {
            // Delete existing estimate items
            $sql_delete_items = "DELETE FROM estimate_item WHERE estimate_id = '$id'";
            $status_delete_items = Database::iud($sql_delete_items);

            if (!$status_delete_items) {
                $response = ['status' => 0, 'message' => 'Failed to delete existing estimate items.'];
                echo json_encode($response);
                exit;
            }

            $taxTotal = 0;
            $subTotal = 0;

            $i = 0; // Initialize the counter
            $estimate_items_num = count($productTable); // Get the number of items
            // Insert new estimate items
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

                $sql_estimate_item = "INSERT INTO estimate_item (estimate_id, name, description, qty, selling_price, buying_price, tax) VALUES ('$id', '$name', '$description', '$qty', '$price', '$buying_price', '$tax')";
                $status_estimate_item = Database::iud($sql_estimate_item);

                // Determine if this is the last item
                $borderStyle = ($i === $estimate_items_num - 1) ? '' : 'border-bottom: 1px solid #dfe6e9;';

                $html .= '<tr>';
                $html .= '<td style="' . $borderStyle . ' width: 350px;">';
                $html .= '<span>' . $name . '</span><br/>';
                $html .= '<span style="color: #9E9E9E;">' . $description . '</span>';
                $html .= '</td>';
                $html .= '<td style="' . $borderStyle . ' text-align: center; width: 70px; color: #2d3436;">' . $qty . '</td>';
                $html .= '<td style="' . $borderStyle . ' text-align: right; width: 130px; color: #2d3436;">LKR ' . number_format($price, 2) . '</td>';
                $html .= '<td style="' . $borderStyle . ' text-align: right; width: 173px; color: #2d3436;">LKR ' . number_format($totalPrice, 2) . '</td>';
                $html .= '</tr>';

                if (!$status_estimate_item) {
                    $response = ['status' => 0, 'message' => 'Failed to create estimate item record.'];
                    echo json_encode($response);
                    exit;
                }

                $i++; // Increment the counter
            }


        } else {
            // No estimate items found
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
        $notesText = $notes;
        // Check if the footer is not empty
        $footerText = $footerNotes;

        $html .= '
<table style="padding: 5px 18px 5px 9px;">
<tbody>
<tr>
<td colspan="4">
<span style="font-size:16px;">Notes / Terms<br/></span>
<span style="color: #9E9E9E;">' . $notesText . '</span>
</td>
</tr>
<tr>
<td colspan="4">
<span style="font-size:16px;">Footer:<br/></span>
<span style="color: #9E9E9E;">' . $footerText . '</span>
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
        $pdfFilename = 'Estimate_#' . $estimateNumber . '.pdf';

        if (filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {

            $pdfContent = $pdf->Output($pdfFilename, 'S');


            //============================================================+
            // END OF FILE
            //============================================================+

            $mail = new PHPMailer;
            $mail->IsSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = ''; // sender
            $mail->Password = ''; // Enter your SMTP password here
            $mail->SMTPSecure = 'ssl';
            $mail->Port = 465;
            $mail->setFrom('sender email', ''); // sender email  sender
            $mail->addReplyTo('sender emai', ''); // sender email  sender
            $mail->addAddress($data['email']);
            $mail->isHTML(true);
            $mail->Subject = 'Estimate_#' . $estimateNumber;
            $bodyContent = '<div style="width: 100%; background-color: #F6F6F6; padding: 30px 0 50px 0;">
    <div
        style="width: 600px; background-color: #fff; margin: auto; padding: 20px; text-align: center; border: 1px solid #E9E9E9; text-align: left;">
        <div>Hi,</div>
        <div style="margin-top: 10px;">Please see the attached Estimate_#' . $estimateNumber . ' The due amount is LKR ' . number_format($dueAmount, 2) . ' The estimate
            is due by ' . $selectedDate . '. Please
            don\'t hesitate to get in touch if you have any questions or need clarifications.</div>
        <div style="margin-top: 10px;">Best regards,</div>
    </div>
    </div>';
            $mail->Body = $bodyContent;

            // Attach the PDF
            $mail->addStringAttachment($pdfContent, 'Estimate_#' . $estimateNumber . '.pdf');

        } else {
            $response = ['status' => 0, 'message' => 'Invalid email address provided.'];
        }

        $response = ['status' => 1, 'message' => 'Estimate updated successfully.'];

        if (!$mail->send()) {
            $response = ['status' => 0, 'message' => 'Email sending failed: ' . $mail->ErrorInfo];
        }

    } else {
        $response = ['status' => 0, 'message' => 'Invalid input.'];
    }

    return $response;
}


function handleUpdateEstimate($data, $email, $id){
    $response = [];

    if ($data) {
        $customerId = $data['customerId'];
        $estimateNumber = $data['estimateNumber'];
        $selectedDate = $data['selectedDate'];
        $selectedDueDate = $data['selectedDueDate'];
        $estimateName = $data['estimateName'];
        $subhead = $data['subhead'];
        $notes = $data['notes'];
        $footerNotes = $data['footerNotes'];
        $paidAmount = $data['paidAmount'];
        $paymentInstructions = $data['paymentInstructions'];
        $productTable = $data['productTable'];

        $user_rs = Database::search("SELECT * FROM user WHERE email = '$email'");
        $user_data = $user_rs->fetch_assoc();

        if (empty($notes)) {
            $notes = $user_data['notes'];
        }
        if (empty($footerNotes)) {
            $footerNotes = $user_data['footer'];
        }
        if (empty($paymentInstructions)) {
            $paymentInstructions = $user_data['instruction'];
        }

        // Ensure paidAmount is set to 0 if it's empty
        if (empty($paidAmount)) {
            $paidAmount = 0;
        }

        // Update estimate table
        $sql_estimate = "UPDATE estimate SET customer_id = '$customerId', estimate_id = '$estimateNumber', date = '$selectedDate', due_date = '$selectedDueDate', name = '$estimateName', subhead = '$subhead', notes = '".$notes."', footer = '".$footerNotes."', paid_amount = '$paidAmount', instruction = '".$paymentInstructions."' WHERE id = '$id' ";

        $status_estimate = Database::iud($sql_estimate);

        if ($status_estimate) {
            // Delete existing estimate items
            $sql_delete_items = "DELETE FROM estimate_item WHERE estimate_id = '$id'";
            $status_delete_items = Database::iud($sql_delete_items);

            if (!$status_delete_items) {
                $response = ['status' => 0, 'message' => 'Failed to delete existing estimate items.'];
                echo json_encode($response);
                exit;
            }

            // Insert new estimate items
            foreach ($productTable as $product) {
                $name = $product['name'];
                $description = $product['description'];
                $qty = is_numeric($product['qty']) ? $product['qty'] : 0;
                $buying_price = is_numeric($product['buying_price']) && $product['buying_price'] > 0 ? $product['buying_price'] : 0;
                $price = is_numeric($product['price']) ? $product['price'] : 0;
                $tax = is_numeric($product['tax']) ? $product['tax'] : 0;
               
                $sql_estimate_item = "INSERT INTO estimate_item (estimate_id, name, description, qty, selling_price, buying_price, tax) VALUES ('$id', '$name', '$description', '$qty', '$price', '$buying_price', '$tax')";
                $status_estimate_item = Database::iud($sql_estimate_item);

                if (!$status_estimate_item) {
                    $response = ['status' => 0, 'message' => 'Failed to create estimate item record.'];
                    echo json_encode($response);
                    exit;
                }

            }

        }
        
        $response = ['status' => 1, 'message' => 'Estimate updated successfully.', 'estimate_id' => $id];

    } else {
        $response = ['status' => 0, 'message' => 'Invalid input.'];
    }

    return $response;
}

?>
