document.getElementById("home-logo").addEventListener("click", function (event) {
    if (event.target === event.currentTarget) {
        window.location.href = "index.html"; // Replace with your desired URL
    }
  });
let offer = document.querySelector('.offer');
let tracker = document.querySelector('.tracker');
let trackerCommand = document.querySelector('.tracker-command');
let form =  document.querySelector('form');
let profile = document.querySelector('a.profile');
console.log(offer,form,profile);
profile.addEventListener('click',()=>{
    offer.style.display='flex';
    form.style.display='flex';
    tracker.style.display='none';

})
trackerCommand.addEventListener('click',()=>{
    offer.style.display='none';
    form.style.display='none';
    tracker.style.display='flex';

})

window.addEventListener('DOMContentLoaded', (event) => {
    const logoutLink = document.getElementById('logoutLink');
    
    logoutLink.addEventListener('click', (event) => {
        // Prevent the default anchor link behavior
        event.preventDefault();
        
        // Clear the localStorage
        localStorage.clear();
        
        // Redirect to the home page
        window.location.href = 'index.html';  // Update the URL based on your home page
    });
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
/*   logoButton.addEventListener("click", () => {
    window.location.href = "index.html"; // Replace with your desired URL
}); */


const cartData1 = JSON.parse(localStorage.getItem('cartData1')) || { cart: { orders: [] } };
const orders = cartData1.cart.orders || [];
let ordersSection = document.querySelector('.orders');
let resumeSection = document.querySelector('.resume');  // Container where item details will be displayed

let currentExpandedItem = null; // Variable to track the currently expanded item

console.log(ordersSection);

// Check if there are no orders and display a message
if (orders.length === 0) {
    const noOrdersMessage = document.createElement('p');
    noOrdersMessage.classList.add('empty');
    noOrdersMessage.textContent = 'لا توجد طلبات حتى الآن';
    ordersSection.appendChild(noOrdersMessage);
} else {
    // Loop through the orders and create cart items
    orders.forEach((order, index) => {
        if (order) {
            const itemElement = createCartItem(order, index);
            ordersSection.appendChild(itemElement);
        }
    });
}

function createCartItem(order, index) {
    const item = document.createElement('div');
    item.classList.add('item');
    item.dataset.index = index;

    const color = order.color || '#fff';
    const size = order.size_id || 'L';
    const productName = order.product_name || 'Product';
    const quantity = order.quantity || 1;
    const price = order.full_price || 0;

    // Create the content for the cart item
    const productNameElement = document.createElement('p');
    productNameElement.textContent = ` الطلب: ${productName}`;

    const priceElement = document.createElement('p');
    priceElement.textContent =  `  الثمن  : ${price}`; 

    // Append product name and price to the item div
    item.appendChild(priceElement);
    item.appendChild(productNameElement);

    // Add click event to display the item details in the resume section
    item.addEventListener('click', () => toggleOrderDetails(order, item));

    return item;
}

function toggleOrderDetails(order, item) {
    // If another item is expanded, collapse it
    if (currentExpandedItem && currentExpandedItem !== item) {
        collapseOrderDetails(currentExpandedItem); // Collapse the currently expanded item
    }

    // Toggle the expanded state for the clicked item
    const isExpanded = item.classList.contains('expanded');
    
    if (isExpanded) {
        collapseOrderDetails(item); // Collapse the clicked item
    } else {
        displayOrderDetails(order);
        item.classList.add('expanded');
        currentExpandedItem = item; // Track the currently expanded item
    }
}

function collapseOrderDetails(item) {
    // Clear the resume section
    resumeSection.innerHTML = '';
    // Hide the process section
    const processContainer = item.querySelector('.process');
    if (processContainer) {
        processContainer.style.display = 'none';
    }
    // Remove the 'expanded' class
    item.classList.remove('expanded');
}

function displayOrderDetails(order) {
    // Clear previous content in the resume section
    resumeSection.innerHTML = '';

    // Order Details Header
    const header = document.createElement('h1');
    header.textContent = 'طلبك قيد الإنجاز';
    resumeSection.appendChild(header);

    // Order information
    const details = document.createElement('div');
    details.classList.add('order-details');

    details.innerHTML = `
        <h3>تفاصيل الطلب</h3>
        <p><strong>اسم المنتج:</strong> ${order.product_name || 'N/A'}</p>
        <p><strong>السعر:</strong> $${order.full_price || 0}</p>
        <p><strong>الكمية:</strong> ${order.quantity || 1}</p>
        <p> ${order.size_id || 'N/A'} :<strong>المقاس</strong></p>
        <p> ${order.color || 'N/A'} :<strong>اللون</strong></p>
        <p><strong>السعر الإجمالي:</strong> $${(order.full_price || 0) * (order.quantity || 1)}</p>
    `;

    // Append order details to the resume section
    resumeSection.appendChild(details);

    // Process steps container (this is now hidden initially and displayed upon clicking)
    const processContainer = document.createElement('div');
    processContainer.classList.add('process');
    processContainer.style.display = 'none'; // Initially hidden

    const steps = [
        {
            imgSrc: 'images/customers/process1_transparent.png',
            title: 'معالجة الطلب',
            description: 'فور استلام طلبك، يقوم فريقنا بمراجعته والتأكد من جميع التفاصيل لضمان جودة التنفيذ.'
        },
        {
            imgSrc: 'images/customers/printing_transparent.png',
            title: 'طباعة المنتج',
            description: 'يتم طباعة التصميم الخاص بك باستخدام أحدث تقنيات الطباعة لضمان جودة فائقة.'
        },
        {
            imgSrc: 'images/customers/shipping_transparent.png',
            title: 'شحن الطلب',
            description: 'بعد الانتهاء من الطباعة، نقوم بتغليف المنتج بعناية وإرساله إلى عنوانك بأسرع وقت ممكن.'
        }
    ];

    // Loop through each step and add to the process container
    steps.forEach(step => {
        const procDiv = document.createElement('div');
        procDiv.classList.add('proc');

        const img = document.createElement('img');
        img.src = step.imgSrc;
        img.alt = step.title;

        const icon = document.createElement('i');
        icon.classList.add('fa-regular', 'fa-circle-dot');

        const title = document.createElement('h3');
        title.textContent = step.title;

        const description = document.createElement('p');
        description.textContent = step.description;

        procDiv.appendChild(img);
        procDiv.appendChild(icon);
        procDiv.appendChild(title);
        procDiv.appendChild(description);

        processContainer.appendChild(procDiv);
    });

    // Append the process steps to the resume section
    resumeSection.appendChild(processContainer);

    // Reveal the process steps after clicking
    setTimeout(() => {
        processContainer.style.display = 'flex'; // Show the process steps after 0.3 seconds
    }, 300);
}




window.onload = function() {
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
}

/* function handleFormSubmit() {
    
  
     // Use FormData for easier data handling
    const profileData = {
      firstName: document.getElementById('fname').value || '',
      lastName: document.getElementById('lname').value || '',
      email: document.getElementById('email').value || '',
      phone: document.getElementById('phone').value || '',
      state: document.getElementById('state').value || '',
      country: document.getElementById('contry').value || '',
      
      // ... include other fields
      DOB: formData.get('DOB') || '', // Handle birthday format if needed
    };
  
    const token = localStorage.getItem('accessToken');
  
    fetch('https://custmize.digitalgo.net/api/update_profile', {
      method: 'POST',
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle successful update response
      console.log('Profile updated:', data);
      // Display a success message or update the UI
    })
    .catch(error => {
      console.error('Error updating profile:', error);
      // Handle errors, e.g., display an error message to the user
    });
  } */

  let message = JSON.parse(localStorage.getItem('message')) || "";
  let email = JSON.parse(localStorage.getItem('email')) || "";
  function showOTPDialog(message, email) {
    // Create the OTP popup HTML
    const otpPopupHTML = `
        <div class="otp-popup">
            <span class = "close">X</span>
            <div class="otp-popup-content">
                <h2>تم إنشاء الحساب بنجاح</h2>
                <p>${message}</p>
                <p>يرجى إدخال رمز التفعيل المرسل إلى بريدك الإلكتروني.</p>
                <input type="text" id="otp-input" placeholder="أدخل رمز التفعيل" />
                <button id="submit-otp">تأكيد الرمز</button>
                <div id="timer">01:30</div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", otpPopupHTML);
    
    // Start the countdown timer for OTP
    let timer = 90; // 1 minute 30 seconds
    const timerDiv = document.getElementById("timer");
    const countdown = setInterval(() => {
        const minutes = Math.floor(timer / 60).toString().padStart(2, "0");
        const seconds = (timer % 60).toString().padStart(2, "0");
        timerDiv.textContent = `${minutes}:${seconds}`;
        if (timer === 0) {
            clearInterval(countdown);
            alert("انتهى الوقت! الرجاء المحاولة مرة أخرى.");
        }
        timer--;
    }, 1000);
    const close = document.querySelector('span.close');

    // Add a click event listener to the document
    close.addEventListener('click', (event) => {
        const otpPopup = document.querySelector('.otp-popup');
        otpPopup.remove();
      
    });
    // Handle OTP submission
    document.getElementById("submit-otp").addEventListener("click", async () => {
        const otp = document.getElementById("otp-input").value.trim();
        if (!otp) {
            alert("الرجاء إدخال رمز التفعيل.");
            return;
        }

        try {
            const otpResponse = await fetch("https://custmize.digitalgo.net/api/verify_otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Language": "ar",
                },
                body: JSON.stringify({
                    otp,
                    email: email,
                }),
            });
            console.log(otpResponse);
            if (otpResponse.ok) {
                const otpData = await otpResponse.json();
                console.log(otpData);
                alert("تم تفعيل الحساب بنجاح!");
               document.getElementsByClassName('otpButton').style.display="none";
                window.location.href = "index.html"; // Redirect to homepage or dashboard
            } else {
                const otpError = await otpResponse.text();
                alert("فشل تأكيد الرمز: " + otpError);
            }
        } catch (error) {
            alert("حدث خطأ أثناء تأكيد الرمز.");
        }
    });
};

