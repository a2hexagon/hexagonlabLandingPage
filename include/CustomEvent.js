document.querySelector('form').addEventListener('submit', function(event) {
  // Prevent the form from submitting immediately
  event.preventDefault();

  // Get the current date in dd_mm_yyyy format
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0'); // Ensure 2 digits for day
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = now.getFullYear();
  const dateStr = `${day}_${month}_${year}`;

  // Get the customer's mobile number from an input field
  const customerMobileNumber = document.getElementById('phoneNumber').value; // Replace with your input field ID or variable

  // Check if the mobile number is provided
  if (!customerMobileNumber) {
    console.error('Customer mobile number is required.');
    return;
  }

  // Generate the transaction ID
  const transactionId = `${dateStr}_${customerMobileNumber}`;

  // Get the total bill value (assuming it's available in a variable or input field)
  const totalBillInput = document.getElementById('totalBill'); // Replace with your input field ID or variable
  const totalBill = parseFloat(totalBillInput ? totalBillInput.value : 0); // Default to 0 if not found

  // Check if the total bill is valid
  if (isNaN(totalBill) || totalBill <= 0) {
    console.error('Invalid total bill value.');
    return;
  }

  // Push the purchase event to the data layer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'purchase', // Event name
    'ecommerce': {
      'transaction_id': transactionId, // Unique transaction ID
      'value': totalBill, // Total bill value
      'currency': 'BDT', // Currency
      'items': [] // Optional: Add items if needed
    }
  });

  // Send the purchase event to gtag
  gtag('event', 'purchase', {
    'value': totalBill, // Use the value from the totalBill variable
    'currency': 'BDT', // Currency is set to Bangladeshi Taka
    'transaction_id': transactionId // Unique transaction ID
  });

  // Optionally, submit the form after pushing the event
  event.target.submit();
});
