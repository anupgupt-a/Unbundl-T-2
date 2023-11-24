document.addEventListener('DOMContentLoaded', function() {
  const chocolateQuantities = document.querySelectorAll('.chocolate-quantity');
  const selectedChocolates = {};

  chocolateQuantities.forEach(quantityInput => {
    quantityInput.addEventListener('input', function() {
      const chocolateType = this.parentNode.textContent.trim();
      const quantity = parseInt(this.value);

      let totalQuantity = 0;
      for (const qInput of chocolateQuantities) {
        totalQuantity += parseInt(qInput.value);
      }

      if (totalQuantity <= 8) {
        if (quantity >= 0 && quantity <= 8) {
          if (quantity === 0) {
            delete selectedChocolates[chocolateType];
          } else {
            selectedChocolates[chocolateType] = quantity;
          }

          const totalPrice = calculateTotalPrice(selectedChocolates);
          document.getElementById('total-price').textContent = totalPrice;

       
          const selectedChocolatesList = document.querySelector('.selected-chocolates');
          selectedChocolatesList.innerHTML = '';
          for (const [chocolate, count] of Object.entries(selectedChocolates)) {
            const li = document.createElement('li');
            li.textContent = `${chocolate} x ${count}`;
            selectedChocolatesList.appendChild(li);
          }
        }
      } else {
        alert('The cart is full. You can only select up to 8 chocolates.');
        this.value = selectedChocolates[chocolateType] || 0;
      }
    });
  });

  function calculateTotalPrice(selectedChocolates) {
    let totalPrice = 0;
    for (const [chocolate, quantity] of Object.entries(selectedChocolates)) {
      totalPrice += quantity * chocolatePrices[chocolate];
    }
    return totalPrice.toFixed(2);
  }

  const chocolatePrices = {
    'Dark Chocolate': 50.0,
    'Milk Chocolate': 27.0,
    'White Chocolate': 25.0,
    'Hazelnut Chocolate': 38.0,
    'Caramel Chocolate': 100.0,
    'Raspberry Chocolate': 80.0,
    'Orange Chocolate': 95.0,
    'Coconut Chocolate': 10.0,
  };
});


