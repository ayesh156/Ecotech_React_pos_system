<?php

class Database {

    public static $connection;

    public static function setUpConnection() {
        if(!isset(Database::$connection)) {
            Database::$connection = new mysqli("localhost", "root", "SEngineer,531", "com-system", "3306");
        }
    }

    public static function iud($q) {
        Database::setUpConnection();
        $result = Database::$connection->query($q);
        // Return true if the query was successful, otherwise return false
        return $result !== false; // Check if result is not false
    }

    public static function search($q) {
        Database::setUpConnection();
        $resultset = Database::$connection->query($q);
        return $resultset;
    }

    public static function getLastInsertedId() {
        Database::setUpConnection();
        return Database::$connection->insert_id; // Return the last inserted ID
    }
}
?>
