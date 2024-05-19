<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require "connection.php";

// Assuming 'email' is sent via Axios
$email = $_GET['email'] ?? null;

// Check if the email parameter is provided
if ($email !== null) {
    if (isset($email)) {
        $invoice_rs = Database::search("SELECT invoice.id AS id, TRIM(customer.name) AS name, date, due_date FROM invoice INNER JOIN customer ON invoice.customer_id = customer.id WHERE customer.user_email = '$email'");
        $invoice_num = $invoice_rs->num_rows;

        if ($invoice_num > 0) {
            $invoice_data = array();
            while ($row = $invoice_rs->fetch_assoc()) {
                // Convert id to integer
                $row['id'] = intval($row['id']);

                // Fetch invoice items for the current invoice
                $invoiceId = $row['id'];
                $invoiceItems_rs = Database::search("SELECT * FROM invoice_item WHERE invoice_id = $invoiceId");
                $totalAmount = 0;

                while ($itemRow = $invoiceItems_rs->fetch_assoc()) {
                    // Calculate total amount for each item and add to totalAmount
                    $totalAmount += ($itemRow['qty'] * $itemRow['selling_price']);
                }

                // Calculate due amount
                if (isset($email)) {
                    $invoice_rs = Database::search("SELECT invoice.id AS id, invoice_id, customer.name AS name, date, due_date, paid_amount FROM invoice INNER JOIN customer ON invoice.customer_id = customer.id WHERE customer.user_email = '$email'");
                    $invoice_num = $invoice_rs->num_rows;

                    if ($invoice_num > 0) {
                        $invoice_data = array();
                        while ($row = $invoice_rs->fetch_assoc()) {

                            // Convert id to integer
                            $row['invoice_id'] = intval($row['invoice_id']);

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

                            // Fetch invoice items for the current invoice
                            $invoiceId = $row['id'];
                            $invoiceItems_rs = Database::search("SELECT * FROM invoice_item WHERE invoice_id = $invoiceId");
                            $totalAmount = 0;

                            while ($itemRow = $invoiceItems_rs->fetch_assoc()) {
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

                            // Add row to invoice_data array
                            $invoice_data[] = $row;
                        }

                        $response = ['status' => 1, 'message' => 'Record found successfully.', 'invoice' => $invoice_data];

                    } else {
                        $response = ['status' => 0, 'message' => 'Can\'t Find Any Invoices!'];
                    }
                } else {
                    $response = ['status' => 0, 'message' => 'Invalid email provided.'];
                }
            }

            $response = ['status' => 1, 'message' => 'Record found successfully.', 'invoice' => $invoice_data];

        } else {
            $response = ['status' => 0, 'message' => 'Can\'t Find Any Invoices!'];
        }
    } else {
        $response = ['status' => 0, 'message' => 'Invalid email provided.'];
    }
} else {
    $response = ['status' => 0, 'message' => 'Please login first!'];
}

echo json_encode($response);
?>