document.querySelector('form').addEventListener('submit', function() {
  // Get the current date in dd_mm_yyyy format
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0'); // Ensure 2 digits for day
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = now.getFullYear();
  const dateStr = `${day}_${month}_${year}`;

  // Assuming the customer's mobile number is available in a variable or input field
  const customerMobileNumber = document.getElementById('phoneNumber').value; // Replace with your input field ID or variable

  // Generate the transaction ID
  const transactionId = `${dateStr}_${customerMobileNumber}`;

  // Send the purchase event to gtag
  gtag('event', 'purchase', {
    'value': totalBill, // Use the value from the totalBill variable
    'currency': 'BDT', // Currency is set to Bangladeshi Taka
    'transaction_id': transactionId // Unique transaction ID
  });
});
