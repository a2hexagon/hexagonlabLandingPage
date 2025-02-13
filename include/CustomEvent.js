document.querySelector('form').addEventListener('submit', function(event) {
  // Prevent the form from submitting immediately
  event.preventDefault();

  // Get the current date in dd_mm_yyyy format
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0'); // Ensure 2 digits for day
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = now.getFullYear();
  const dateStr = `${day}_${month}_${year}`;

  // Get the customer's mobile number
  const phoneNumberInput = document.getElementById('phoneNumber');
  const customerMobileNumber = phoneNumberInput ? phoneNumberInput.value.trim() : null;

  // Validate the mobile number (basic check for non-empty value)
  if (!customerMobileNumber) {
    console.error('Customer mobile number is missing or invalid.');
    return; // Exit if the mobile number is not available
  }

  // Generate the transaction ID
  const transactionId = `${dateStr}_${customerMobileNumber}`;

  // Assuming totalBill is defined elsewhere in your code
  const totalBill = parseFloat(totalBill); // Ensure totalBill is a number
  if (isNaN(totalBill) || totalBill <= 0) {
    console.error('Invalid total bill amount.');
    return; // Exit if the total bill is invalid
  }

  // Send the purchase event to gtag with a callback
  gtag('event', 'purchase', {
    'value': totalBill, // Use the value from the totalBill variable
    'currency': 'BDT', // Currency is set to Bangladeshi Taka
    'transaction_id': transactionId, // Unique transaction ID
    'event_callback': function() {
      // This function will run after the event is successfully sent
      console.log('Purchase event sent successfully. Submitting form...');
      event.target.submit(); // Submit the form
    }
  });
});
