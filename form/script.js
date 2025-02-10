document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('checkout-form');
  const cashMemo = document.getElementById('cash-memo');
  const phoneNumberInput = document.getElementById('phoneNumber');

  // Ensure only one checkbox is selected
  const checkboxes = document.querySelectorAll('input[name="deliveryAddress"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      if (this.checked) {
        checkboxes.forEach(cb => {
          if (cb !== this) cb.checked = false;
        });
      }
    });
  });

  // Automatically prepend +88 to the phone number
  phoneNumberInput.addEventListener('input', function () {
    if (!this.value.startsWith('+88')) {
      this.value = '+88' + this.value.replace(/[^0-9]/g, '').slice(0, 11);
    } else {
      this.value = '+88' + this.value.slice(3).replace(/[^0-9]/g, '').slice(0, 11);
    }
  });

  // Handle form submission
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Validate phone number
    const phoneNumber = phoneNumberInput.value;
    if (phoneNumber.length !== 14 || !phoneNumber.startsWith('+88')) {
      alert('Please enter a valid 11-digit phone number starting with +88.');
      return;
    }

    // Validate delivery address selection
    const selectedCheckbox = document.querySelector('input[name="deliveryAddress"]:checked');
    if (!selectedCheckbox) {
      alert('Please select a delivery address.');
      return;
    }

    // Calculate delivery charge
    const deliveryCharge = selectedCheckbox.value === 'inSideDhaka' ? 70 : 130;

    // Generate cash memo
    const name = document.getElementById('name').value;
    const phone = phoneNumberInput.value;
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;
    const delivery = selectedCheckbox.value === 'inSideDhaka' ? 'Inside Dhaka' : 'Outside Dhaka';
    const offerPrice = 1250; // Replace with actual offer price

    // Calculate total bill
    const totalBill = offerPrice + deliveryCharge;
    document.getElementById('totalBill').value = totalBill;

    // Update cash memo content
    document.getElementById('memo-name').textContent = name;
    document.getElementById('memo-phone').textContent = phone;
    document.getElementById('memo-address').textContent = address;
    document.getElementById('memo-payment').textContent = payment;
    document.getElementById('memo-delivery').textContent = delivery;
    document.getElementById('memo-charge').textContent = deliveryCharge + ' BDT';
    document.getElementById('memo-bill').textContent = totalBill + ' BDT';

    // Show the cash memo
    cashMemo.style.display = 'block';

    // Submit form to Netlify
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString(),
    })
      .then(() => alert('Order submitted successfully!'))
      .catch((error) => alert('Error submitting order. Please try again.'));
  });
});
