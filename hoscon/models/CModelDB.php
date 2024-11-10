<?php

class CModelDB {
    private $conn;

    // Constructor to establish the database connection
    public function __construct($host, $username, $password, $dbname) {
        $this->conn = new mysqli($host, $username, $password, $dbname);

        // Check the connection
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    // Method to fetch data from the database
    public function GetData() {
        $arrayResult = [];

        // SQL query to get the required data
        $sql = "SELECT title, date_created, author_name, image_url, text FROM blog_posts";
        
        // Execute the query and check for errors
        $result = $this->conn->query($sql);

        if ($result === false) {
            // Query failed, print the error message
            echo "Error: " . $this->conn->error;
        } else {
            // Check if there are results
            if ($result->num_rows > 0) {
                // Fetch each row and add it to the result array
                while ($row = $result->fetch_assoc()) {
                    $arrayResult[] = array(
                        'TITLE' => $row['title'],
                        'DATE' => $row['date_created'],
                        'AUTHOR' => $row['author_name'],
                        'IMAGE' => $row['image_url'],
                        'TEXT' => $row['text']
                    );
                }
            } else {
                echo "No records found";
            }
        }

        // Return the results
        return $arrayResult;
    }

    // Destructor to close the database connection
    public function __destruct() {
        $this->conn->close();
    }
}
?>
