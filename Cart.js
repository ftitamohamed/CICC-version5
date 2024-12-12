document.addEventListener('DOMContentLoaded', () => {
    const subtotalElement = document.querySelector('body > main > aside > div:nth-child(5) > span');
    
    const totalPriceElement = document.querySelector('body > main > aside > div:nth-child(9) > span');
    const payNowButton = document.querySelector('.pay-now');
    const items = document.querySelectorAll('.shopping-items .item input[type="checkbox"]');
    
    const shippingCost = 15.00; // Constant shipping cost
    const taxRate = 9.6; // Constant tax amount
    
    const cartData = JSON.parse(localStorage.getItem('cartData1')) || { cart: { orders: [] } };
    const orders = cartData.cart.orders || [];
    const cartDataRequest = JSON.parse(localStorage.getItem('cartData')) || { cart: { orders: [] } };
    const ordersRequest = cartDataRequest.cart.orders || [];
    let checkoutData ;
    function updateOrderSummary() {
        let subtotal = 0;
    
        // Calculate the subtotal based on selected items
        items.forEach((item) => {
            if (item.checked) {
                const priceElement = item.closest('.item').querySelector('span.price');
                const price = parseFloat(priceElement.textContent.replace('$', ''));
                subtotal += price;
            }
        });
    
        // Update subtotal, tax, and total price
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        const total = subtotal + shippingCost + taxRate;
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    
        // Update Pay Now button text
        payNowButton.textContent = `Pay now ($${total.toFixed(2)})`;
        
        // Log the index of checked items
        items.forEach((item, index) => {
            if (item.checked) {
                console.log(index); // Logs the index of the checked item
                console.log(total, subtotal);
                console.log(ordersRequest[index]); // Assuming orders is an array corresponding to items
                 checkoutData = {
                    cart: {
                      orders: [{...ordersRequest[index]}]
                    },
                    subtotal: subtotal,
                    total_amount: total,
                    discount: 0,
                    promocode: "",
                  };
                  console.log(checkoutData);
            }
            

        });
    }
    
    
    // Add event listeners to item checkboxes
    items.forEach((item) => {
        item.addEventListener('change', updateOrderSummary);
    });

    // Initial update
    updateOrderSummary();
    function sendDataToAPI(data, url) {
        const token = localStorage.getItem("accessToken");
      
        return fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Add the authorization header with the token
          },
          body: JSON.stringify(data)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
          }
          return response.json(); // Parse the response if needed
        })
        .catch(error => {
          console.error('Error sending data to API:', error);
          // Handle the error, e.g., display an error message to the user
        });
      }
    payNowButton.addEventListener('click', () => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
        window.location.href = 'login.html';
        } else {
            sendDataToAPI(checkoutData, 'https://custmize.digitalgo.net/api/checkout')
            .then(response => {
              console.log('API response:', response);
              // Handle the API response here, e.g., show success/error messages, redirect to payment page, etc.
            })
            .catch(error => {
              console.error('Error sending data to API:', error);
              // Handle errors, e.g., show error messages to the user
            });
        }
       
      });
    
});
 // Attach the API call to the Pay Now button



// Functions to handle showing/hiding additional data
function showData() {
    const otpFrame = document.querySelector('.otp');
    otpFrame.style.display = 'block';
}

function hideData() {
    const otpFrame = document.querySelector('.otp');
    otpFrame.style.display = 'none';
}


const draggableDiv = document.getElementById("draggableDiv");
console.log(draggableDiv)
// Variables to store the current position and the offset
let isDragging = false;
let offsetX, offsetY;

// Mouse down: Initialize dragging
draggableDiv.addEventListener("mousedown", (event) => {
    isDragging = true;

    // Calculate the offset from the mouse position to the top-left corner of the div
    offsetX = event.clientX - draggableDiv.offsetLeft;
    offsetY = event.clientY - draggableDiv.offsetTop;

    // Add event listeners for mousemove and mouseup
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
});

// Function to handle the dragging
function onMouseMove(event) {
    if (!isDragging) return;

    // Calculate the new position
    const x = event.clientX - offsetX;
    const y = event.clientY - offsetY;

    // Update the position of the div
    draggableDiv.style.left = `${x}px`;
    draggableDiv.style.top = `${y}px`;
}

// Mouse up: Stop dragging
function onMouseUp() {
    isDragging = false;

    // Remove event listeners
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
}
function hideData(){
    document.querySelector(`.exit`).style='display:none';
    document.querySelector(`.otp`).style='display:none';}
function showData(){
    document.querySelector(`.exit`).style='display:block';
    document.querySelector(`.otp`).style='display:block';}
document.getElementById("home-logo").addEventListener("click", function (event) {
        if (event.target === event.currentTarget) {
            window.location.href = "index.html"; // Replace with your desired URL
        }
      });
      window.addEventListener('DOMContentLoaded', (event) => {
        const loginLink = document.getElementById('loginLink');
        
        const userName = localStorage.getItem('userName');
        
        if (userName) {
            // If userName exists in localStorage, update the link to show the user's name
            loginLink.innerHTML = `<i class="fa-solid fa-user"></i> مرحبًا, ${userName}`;
            loginLink.setAttribute('href', 'Profile.html'); // Prevent navigation to login page
            
      
        }
      });

  /*     logoButton.addEventListener("click", () => {
        window.location.href = "index.html"; // Replace with your desired URL
    }); */
   /*  window.onload = function() {
        updateCartCount();
    };
    
    function updateCartCount() {
        // Retrieve the cartData1 object from localStorage
        const cartData1 = JSON.parse(localStorage.getItem('cartData1')) || { cart: { orders: [] } };
        const orders = cartData1.cart.orders || [];
    
        // Get the cart count element
        const cartCount = document.getElementById('cart-count');
    
        // Check if orders array has any items
        if (orders.length > 0) {
            // Show the red dot with the number of items
            cartCount.style.display = 'block';
            cartCount.textContent = orders.length;
        } else {
            // Hide the red dot if no items
            cartCount.style.display = 'none';
        }
    } */
    