<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require "connection.php";

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "POST":

        $customer = json_decode(file_get_contents('php://input'));

        // Define the regular expression for the phone number
        $phoneRegExp = '/^[0]{1}[1245678]{1}[01245678]{1}[0-9]{7}$/';

        // Validate the mobile number against the regular expression
        if (!preg_match($phoneRegExp, $customer->mobile)) {
            $customer->mobile = "";
            echo $customer->mobile . " ";
        }

        // Insert into customer table
        $c_sql = "INSERT INTO customer (name, email, mobile, balance, user_email) 
          VALUES ('" . $customer->name . "','" . $customer->email . "', '" . $customer->mobile . "', '0', '" . $customer->user_email . "')";

        $status_c = Database::iud($c_sql);

        if ($status_c) {

            // Check if any data related to customer_details table has been entered
            if (!empty($customer->address1) || !empty($customer->address2) || !empty($customer->city) || !empty($customer->postal) || !empty($customer->instructions) || !empty($customer->account) || !empty($customer->fax) || !empty($customer->telephone) || !empty($customer->website) || !empty($customer->notes)) {

                // Retrieve the auto-incremented ID
                $customer_id = Database::getLastInsertedId();

                // Validate the mobile number against the regular expression
                if (!preg_match($phoneRegExp, $customer->telephone)) {
                    $customer->telephone = "";
                }

                // Validate the fax number length
                if (strlen($customer->fax) > 15) {
                    $customer->fax = "";
                }

                // Insert into customer_details table
                $cd_sql = "INSERT INTO customer_details (address1, address2, city, postal_code, instruction, account_no, fax, telephone, website, note, province_id, customer_id) 
                   VALUES ('" . $customer->address1 . "','" . $customer->address2 . "', '" . $customer->city . "', '" . $customer->postal . "', '" . $customer->instructions . "', '" . $customer->account . "', '" . $customer->fax . "', '" . $customer->telephone . "', '" . $customer->website . "', '" . $customer->notes . "', '" . $customer->province . "', " . $customer_id . ")";

                $status_cd = Database::iud($cd_sql);

                if ($status_cd) {
                    $response = ['status' => 1, 'message' => 'Customer created successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to create Customer in customer_details table.'];
                }

            } else {
                $response = ['status' => 1, 'message' => 'Customer created successfully.'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create Customer in customer table.'];
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

                // Select data from the customer table based on id and email
                $sql = "SELECT * FROM customer WHERE id = '$id' AND user_email = '$email'";
                $result = Database::search($sql); // Assuming Database::search executes the SQL query

                // Fetch data and format as an associative array
                $customer = [];
                $row = $result->fetch_assoc();
                if ($row) {
                    $customer = [
                        'name' => $row['name'],
                        'email' => $row['email'],
                        'mobile' => $row['mobile'],
                        'balance' => intval($row['balance']),
                        'payment' => 0,
                    ];
                }

                if ($customer) {

                    // Check if there is any data related to the row of the customer table in the customer_details table
                    $cd_sql = "SELECT * FROM customer_details WHERE customer_id = '$id'";
                    $cd_result = Database::search($cd_sql); // Assuming Database::search executes the SQL query

                    // Fetch data and format as an associative array
                    $customerDetails = [];
                    $cd_row = $cd_result->fetch_assoc();
                    if ($cd_row) {
                        // Data related to the row exists in the customer_details table
                        $customerDetails = [
                            'address1' => $cd_row['address1'],
                            'address2' => $cd_row['address2'],
                            'city' => $cd_row['city'],
                            'postal' => $cd_row['postal_code'],
                            'instructions' => $cd_row['instruction'],
                            'account' => $cd_row['account_no'],
                            'fax' => $cd_row['fax'],
                            'telephone' => $cd_row['telephone'],
                            'website' => $cd_row['website'],
                            'notes' => $cd_row['note'],
                            'province' => $cd_row['province_id']
                        ];
                    } else {
                        // No data related to the row found in the customer_details table
                        // Show empty values for customer details
                        $customerDetails = [
                            'address1' => '',
                            'address2' => '',
                            'city' => '',
                            'postal' => '',
                            'instructions' => '',
                            'account' => '',
                            'fax' => '',
                            'telephone' => '',
                            'website' => '',
                            'notes' => '',
                            'province' => 1
                        ];
                    }

                    // Merge customer and customer details into a single array
                    $response = ['status' => 1, 'message' => 'Customer found successfully.', 'customer' => array_merge($customer, $customerDetails)];

                } else {
                    $response = ['status' => 0, 'message' => 'No customer found.'];
                }
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
            // Handle PUT request for updating data
            $customer = json_decode(file_get_contents('php://input'));

            if (isset($_GET['id']) && isset($email)) {
                $id = $_GET['id'];
                $email = $_GET['email'];

                // Define the regular expression for extracting the numeric value from payment string
                $paymentRegExp = '/\d+(\.\d+)?/';
                // Extract numeric value from payment string
                preg_match($paymentRegExp, $customer->payment, $matches);
                $paymentAmount = isset($matches[0]) ? $matches[0] : 0;

                // Deduct payment amount from balance
                $customer->balance -= $paymentAmount;

                // Define the regular expression for the phone number
                $phoneRegExp = '/^[0]{1}[1245678]{1}[01245678]{1}[0-9]{7}$/';

                // Validate the mobile number against the regular expression
                if (!preg_match($phoneRegExp, $customer->mobile)) {
                    $customer->mobile = "";
                }

                $payment = $customer->payment;
                $balance = $customer->balance;

                // Check if the customer exists
                $sql_update = "UPDATE customer SET name='" . $customer->name . "', email='" . $customer->email . "', mobile='" . $customer->mobile . "', balance='" . $customer->balance . "' WHERE id='$id' AND user_email='$email'";
                $status_c = Database::iud($sql_update);

                if ($status_c) {

                    // Check if any data related to customer_details table has been entered
                    if (!empty($customer->address1) || !empty($customer->address2) || !empty($customer->city) || !empty($customer->postal) || !empty($customer->instructions) || !empty($customer->account) || !empty($customer->fax) || !empty($customer->telephone) || !empty($customer->website) || !empty($customer->notes)) {

                        // Validate the mobile number against the regular expression
                        if (!preg_match($phoneRegExp, $customer->telephone)) {
                            $customer->telephone = "";
                        }

                        // Validate the fax number length
                        if (strlen($customer->fax) > 15) {
                            $customer->fax = "";
                        }


                        // Check if a row exists in the customer_details table based on the customer_id
                        $cd_check_sql = "SELECT * FROM customer_details WHERE customer_id = '$id'";
                        $cd_check_result = Database::search($cd_check_sql);

                        if ($cd_check_result->num_rows > 0) {
                            // Row exists, update the existing row in customer_details table
                            $cd_sql = "UPDATE customer_details SET address1 = '" . $customer->address1 . "', address2 = '" . $customer->address2 . "', city = '" . $customer->city . "', postal_code = '" . $customer->postal . "', instruction = '" . $customer->instructions . "', account_no = '" . $customer->account . "', fax = '" . $customer->fax . "', telephone = '" . $customer->telephone . "', website = '" . $customer->website . "', note = '" . $customer->notes . "', province_id = '" . $customer->province . "' WHERE  customer_id = '$id'";
                        } else {
                            // Row doesn't exist, insert a new row into customer_details table with customer_id
                            $cd_sql = "INSERT INTO customer_details (address1, address2, city, postal_code, instruction, account_no, fax, telephone, website, note, province_id, customer_id) 
                                        VALUES ('" . $customer->address1 . "','" . $customer->address2 . "', '" . $customer->city . "', '" . $customer->postal . "', '" . $customer->instructions . "', '" . $customer->account . "', '" . $customer->fax . "', '" . $customer->telephone . "', '" . $customer->website . "', '" . $customer->notes . "', '" . $customer->province . "', '$id')";
                        }

                        $status_cd = Database::iud($cd_sql);

                        if ($status_cd) {
                            $response = ['status' => 1, 'message' => 'Customer updated successfully.'];
                        } else {
                            $response = ['status' => 0, 'message' => 'Failed to update Customer in customer_details table.'];
                        }
                    } else {
                        // No data related to customer_details table has been entered, update customer table only
                        $response = ['status' => 1, 'message' => 'Customer updated successfully.'];
                    }
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to update Customer in customer table.'];
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

?>