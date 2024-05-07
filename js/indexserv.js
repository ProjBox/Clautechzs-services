
document.addEventListener("DOMContentLoaded", function() {
        /*__==Global Variables==__*/
        const cartToggle = document.getElementById('cart-button');
        const cartWrapper = document.getElementById('cart-wrapper');
        const addToCartButton = document.querySelectorAll('.add-to-cart');
        const cartProductQuantity = "<input name='quantity' id='quantity' class='quantity-value' type='number' value='1' min='1' onchange='quantitySet()'>";
        const productRemove = "<button type='button' class='remove' onclick='removeFromCart(event)'>X</button>";
        const cartTableBody = document.getElementById('cart-table-body');
        const subtotal = document.getElementById('subtotal');
        const total = document.getElementById('total');




        let timerObject = {
                timer: null,
                timeLeft: 15 * 60 // 15 minutes in seconds
            };


        let added = [], itemClass = {};
        

        let cart = {
            'items': [],
            "subtotal": 0,
            "finalDis": 0,
            'total': 0
        };


        //*Keep Shopping Button Control*
        const keepShoppingButton = document.getElementById('ks');
        if (keepShoppingButton) {
            keepShoppingButton.addEventListener('click', function() {
                cartWrapper.classList.add('close'); // This closes the cart.
            });
        }

        //*Checkout/Keepshopping Buttons Control*
        function updateButtonVisibility() {
            let cartItems = document.querySelectorAll('#cart-table-body tr');
            let checkoutButton = document.getElementById('checkout');
            let keepShoppingButton = document.getElementById('ks');

            if (cartItems.length > 0 && currentStep !== 3) {
                checkoutButton.style.display = "block";
            } else {
                checkoutButton.style.display = "none";
            }

            if (cartItems.length == 0 || currentStep == 1) {
                keepShoppingButton.style.display = "block";
            } else {
                keepShoppingButton.style.display = "none";
            }
        }

 

        /*==Timer==*/
        function startTimer() {
            stopTimer(); // Ensure no existing timers are running

            timerObject.timer = setInterval(function() {
                timerObject.timeLeft--;
                let minutes = Math.floor(timerObject.timeLeft / 60);
                let seconds = timerObject.timeLeft % 60;
                
                if(seconds < 10) {
                    seconds = '0' + seconds; // format to look like 02s instead of 2s
                }

                document.getElementById("countdown").textContent = `${minutes}m ${seconds}s`;

                if (timerObject.timeLeft <= 0) {
                    stopTimer(); // Clear the interval
                    alert("Time's up! Order has been cancelled.");

                    clearCart();
                    cartWrapper.classList.add('close'); // Close the cart
                    location.reload(); // Refresh the page  
                }
            }, 1000);
        }


        /*__Radio Buttons Modifications 2__*/
        const bankRadios = document.querySelectorAll(".bank-radio");

                bankRadios.forEach(function(radio) {
            radio.addEventListener("change", function() {
                startTimer();
            });
        });

        function stopTimer() {
            if (timerObject.timer) {
                clearInterval(timerObject.timer);
                timerObject.timer = null; // Reset the timer
            }
        }

        const creditCardRadio = document.querySelector(".payment-method");

        //*Event listener to the credit card radio button*
        creditCardRadio.addEventListener("change", function () {
            stopTimer();
        });

      

        /*__==Product Cart Control==__*/
        /*__=============================__*/

        function addToCart(event) {

            if (added.includes(event.target.parentElement.id)) {
                duplicateId = '#' + event.target.parentElement.id;
                cartTableBody.querySelector(duplicateId).querySelector('.quantity-value').value++;

                // Update details after increasing quantity
                updateQuantity(event.target);
                updateSubtotal();
                updateTotal();
                populateProductDetailsInput();
                return;
            }


            cartTableBody.addEventListener('click', function(event) {
                if (event.target && event.target.classList.contains('remove')) {
                    removeFromCart(event);

                populateProductDetailsInput()
                updateSubtotal();
                updateTotal();
                }

                populateProductDetailsInput()
                updateSubtotal();
                updateTotal();
            });


            // Capture product details
            let product = event.target.parentNode;
            let productId = product.id;
            added.unshift(productId);
            let productName = product.querySelector('.product-name').innerHTML;
            let productImageSrc = product.querySelector('.product-image').getAttribute('src');
            let productPrice = product.querySelector('.product-price').innerHTML.replace(/[^\d.-]/g, '');
            productPrice = Number(productPrice);
            let productUpdatedPrice = productPrice;

            thisClass = product.classList.value.split(' ');

            itemClass[productId] = thisClass;

            //*Add to cart model*
            cart.items.push({
                'product': productId,
                'productName': productName,
                'productPrice': productPrice,
                'productUpdatedPrice': productUpdatedPrice,
            });

            // Add a new row for image in image table
            let imageTableRow = document.createElement('tr');
            document.getElementById('cart-table-img-body').appendChild(imageTableRow);

            let imageCell = imageTableRow.insertCell(0);
            let productImage = document.createElement('img');
            productImage.src = productImageSrc;
            productImage.classList.add('thumbnail');
            imageCell.appendChild(productImage);

            // Add a new row for each product in main table
            let productRow = document.createElement('tr');
            productRow.setAttribute('id', productId);
            cartTableBody.appendChild(productRow);

            let nameCell = productRow.insertCell(0);
            nameCell.innerHTML = productName;

            let quantityCell = productRow.insertCell(1);
            quantityCell.innerHTML = cartProductQuantity;
            quantityCell.setAttribute('id', 'quantity');

            let priceCell = productRow.insertCell(2);
            priceCell.innerHTML = productPrice;
            priceCell.setAttribute('id', 'product-price');
            priceCell.setAttribute('class', 'cart-product-price');

            let updatedPriceCell = productRow.insertCell(3);
            updatedPriceCell.innerHTML = productPrice;
            updatedPriceCell.setAttribute('id', 'updated-product-price');
            updatedPriceCell.setAttribute('class', 'cart-updated-product-price');

            let updateBtnCell = productRow.insertCell(4);
            updateBtnCell.innerHTML = "<button type='button' id='update' onclick='updateTotal()'><i class='fa fa-refresh' aria-hidden='true'></i></button>";

            let removeBtnCell = productRow.insertCell(5);
            removeBtnCell.innerHTML = productRemove;

            updateSubtotal();
            updateTotal();
            updateButtonVisibility();
            populateProductDetailsInput();

            $('.slider').toggleClass('close');
            
            // Ensure the cart-table-img-body, subtotal and total are set to display
            document.getElementById('cart-table-img-body').style.display = 'table-row-group';
            document.getElementById('subtotal').style.display = 'block'; 
            document.getElementById('total').style.display = 'block'; 

            // Update details after increasing quantity
            updateQuantity(event.target);
            updateSubtotal();
            updateTotal();
            populateProductDetailsInput();

        }




        // @@ENHANCED@@

        // Updated addToCart function
// function addToCart(event) {
//     const clickedButton = event.target;
    
//     // Check if the clicked element is the "BUY" button
//     if (!clickedButton.classList.contains('add-to-cart')) return;

//     const product = clickedButton.closest('.products');
//     if (!product) return; // If the product element is not found, exit

//     const productId = product.id;

//     // Check if the product is already in the cart
//     if (added.includes(productId)) {
//         // Handle duplicate product
//         // Increment quantity or any other action you want to perform

//         duplicateId = '#' + event.target.parentElement.id;
//         const quantityInput = cartTableBody.querySelector(duplicateId).querySelector('.quantity-value');
//         quantityInput.value++;

//         // Update details after increasing quantity
//         updateQuantity(quantityInput);
//         updateSubtotal();
//         updateTotal();
//         populateProductDetailsInput();

//         return;
//     }

//     // Capture product details
//     const productName = product.querySelector('.product-name').textContent;
//     const productImageSrc = product.querySelector('.product-image').src;
//     const productPrice = parseFloat(product.querySelector('.product-price').getAttribute('value'));
    
//     let productUpdatedPrice = productPrice;

//     // Add product to the cart
//     cart.items.push({
//         'product': productId,
//         'productName': productName,
//         'productPrice': productPrice,
//         // Add any additional product details here
//         'productUpdatedPrice': productUpdatedPrice,
//     });

//     // Update UI or perform any other action as needed
//     // For example, update the cart display, total price, etc.

//     // Add a new row for image in image table
//     let imageTableRow = document.createElement('tr');
//     document.getElementById('cart-table-img-body').appendChild(imageTableRow);

//     let imageCell = imageTableRow.insertCell(0);
//     let productImage = document.createElement('img');
//     productImage.src = productImageSrc;
//     productImage.classList.add('thumbnail');
//     imageCell.appendChild(productImage);

//     // Add a new row for each product in main table
//     let productRow = document.createElement('tr');
//     productRow.setAttribute('id', productId);
//     cartTableBody.appendChild(productRow);

//     let nameCell = productRow.insertCell(0);
//     nameCell.innerHTML = productName;

//     let quantityCell = productRow.insertCell(1);
//     quantityCell.innerHTML = cartProductQuantity;
//     quantityCell.setAttribute('id', 'quantity');

//     let priceCell = productRow.insertCell(2);
//     priceCell.innerHTML = productPrice;
//     priceCell.setAttribute('id', 'product-price');
//     priceCell.setAttribute('class', 'cart-product-price');

//     let updatedPriceCell = productRow.insertCell(3);
//     updatedPriceCell.innerHTML = productPrice;
//     updatedPriceCell.setAttribute('id', 'updated-product-price');
//     updatedPriceCell.setAttribute('class', 'cart-updated-product-price');

//     let updateBtnCell = productRow.insertCell(4);
//     updateBtnCell.innerHTML = "<button type='button' id='update' onclick='updateTotal()'><i class='fa fa-refresh' aria-hidden='true'></i></button>";

//     let removeBtnCell = productRow.insertCell(5);
//     removeBtnCell.innerHTML = productRemove;

//     updateSubtotal();
//     updateTotal();
//     updateButtonVisibility();
//     populateProductDetailsInput();

//     $('.slider').toggleClass('close');
    
//     // Ensure the cart-table-img-body, subtotal and total are set to display
//     document.getElementById('cart-table-img-body').style.display = 'table-row-group';
//     document.getElementById('subtotal').style.display = 'block'; 
//     document.getElementById('total').style.display = 'block'; 

//     // Ensure the added product is marked to prevent duplicates
//     added.unshift(productId);
// }




        /*==Cart Remove Controls==*/
        function removeFromCart(event) {
            event.preventDefault(); 

            let parentRow = event.target.closest('tr');
            if (!parentRow) return;

            let parentBody = parentRow.parentNode;
            let parentRowId = parentRow.id;

            // Remove the main item
            parentBody.removeChild(parentRow);

            // Update added items list
            var index = added.indexOf(parentRowId);
            if (index !== -1) {
                added.splice(index, 1);
            }

            // Update cart items list
            for (let item of cart.items) {
                if (item.product === parentRowId) {
                    let idx = cart.items.indexOf(item);
                    cart.items.splice(idx, 1);
                }
            }

            cartTableBody.addEventListener('input', function(event) {
                if (event.target && event.target.classList.contains('quantity-value')) {
                    updateQuantity(event.target);

                    populateProductDetailsInput()
                    updateSubtotal();
                    updateTotal();
                }

                    updateSubtotal();
                    updateTotal();
                    populateProductDetailsInput()

            });


            //*Remove the thumbnail*
            let imgTableBody = document.getElementById('cart-table-img-body');
            let imgRow = imgTableBody.querySelector('tr');
            if (imgRow) {
                imgTableBody.removeChild(imgRow);

                updateSubtotal();
                updateTotal();
            }

            /*__Empty Cart Modifications 1__*/
            //*If no items remain in the cart, hide necessary elements*
            if (cart.items.length == 0) {
                document.getElementById('checkout').style.display = 'none';
                document.getElementById('subtotal').style.display = 'none'; 
                document.getElementById('total').style.display = 'none'; 
                document.getElementById('cart-table-img-body').style.display = 'none'; 
            } else {  // If there are items, ensure these elements are visible
                document.getElementById('checkout').style.display = 'block';
                document.getElementById('subtotal-wrapper').style.display = 'block'; 
                document.getElementById('total-wrapper').style.display = 'block'; 
                document.getElementById('cart-table-img-body').style.display = 'block';
            }
            
           
            /*__Empty Cart Modifications 2__*/
            // Check if cart is empty
            if (cart.items.length === 0) {
                cartWrapper.classList.add('close'); // Close the cart
                location.reload(); // Refresh the page
                }

             }


        /*__Calculate Item Quantity__*/
        function updateQuantity(inputElem) {
            let parentRow = inputElem.parentNode.parentNode;
            let parentRowId = parentRow.id;
            let productPriceElem, productPrice, updatedPrice;

            for (let node of parentRow.childNodes) {
                switch (node.id) {
                    case 'product-price':
                        productPriceElem = node;
                        productPrice = Number(node.innerHTML);
                        break;
                    case 'updated-product-price':
                        updatedPrice = node;
                        break;
                }

                updateSubtotal();
                updateTotal();
                updateButtonVisibility();
                populateProductDetailsInput();
                
            }

            //*Getting the input value of quantity and converting to a number*
            let inputQuantityValue = Number(inputElem.value);

            if (inputQuantityValue <= 0) {
                removeFromCart(inputElem);
            } else {
                let totalPrice = inputQuantityValue * productPrice;  // Multiplying the quantity with the product price
                updatedPrice.innerHTML = totalPrice.toFixed(2);  // Setting the updated price

                for (let item of cart.items) {
                    if (item.product === parentRowId) {
                        item.productUpdatedPrice = totalPrice;
                    }
                }

                updateSubtotal();
                updateTotal();
                updateButtonVisibility();
            }
        }


        //*Item Quantity update*
        cartTableBody.addEventListener('input', function(event) {
            if (event.target && event.target.classList.contains('quantity-value')) {
                updateQuantity(event.target);
                quantitySet();

                updateSubtotal();
                updateTotal();
                populateProductDetailsInput()
            }

                populateProductDetailsInput()
                updateSubtotal();
                updateTotal();
        });



        /*==Calculate Price Totals==*/
        function updateSubtotal() {
                cart.subtotal = 0;
                
                for (let item of cart.items) {
                    cart.subtotal += item.productUpdatedPrice;
                }
                
                subtotal.innerHTML = cart.subtotal.toFixed(2);
            }

        function updateTotal() {
            cart.total = 0;
            cart.total += (cart.subtotal);
            total.innerHTML = cart.total.toFixed(2);


            const keepShoppingButton = document.getElementById('ks');
            if(keepShoppingButton) {
                keepShoppingButton.addEventListener('click', function() {
                    currentStep = 1;
                    updateStep();
                });
            }

           
        }


        /*__Fill the Product Details Input field__*/
        function populateProductDetailsInput() {
            // Constructing the product details string
            let detailsArray = cart.items.map(item => {
                const qty = document.querySelector(`#${item.product} .quantity-value`).value;
                return `${item.productName} (Qty: ${qty} Price: ₦${(item.productPrice).toFixed(2)})`;
            });
            const detailsString = detailsArray.join(" | ");
            const fullDetails = detailsString + " || Total: ₦" + cart.total.toFixed(2);

            // Populating the input field
            const inputField = document.getElementById("productDetailsInput");
            const inputPrice = document.getElementById("InputPrice");

            const paidAmount = document.getElementById("inpTotal");

            inputField.value = fullDetails;

            inputPrice.value = cart.total.toFixed(2);

            paidAmount.value = cart.total.toFixed(2);

            updateSubtotal();
            updateTotal();
            populateSecondForm();

    
     }


        //*Fill the second form*
        function populateSecondForm() {
            // Get values from the first form
            var userEmail = document.getElementById("email").value;
            var userOrderNo = document.getElementById("orderNumber").value;

            // Populate email input in the second form
            document.getElementById("InputEmail").value = userEmail;

            // Populate order number input in the second form
            document.getElementById("orderNumberRef").value = userOrderNo;
        }


        /*==Clear Cart Controls==*/
        function clearCart() {
            let cartItems = document.querySelectorAll('#cart-table-body tr');
            cartItems.forEach(item => {
                item.remove();
            });

            cart = {
                'items': [],
                "subtotal": 0,
                'total': 0
            };

            updateSubtotal();
            updateTotal();
            updateButtonVisibility();

            if (cart.items.length == 0) { // Check if cart is empty
                cartWrapper.classList.add('close'); // Close the cart
                location.reload(); // Refresh the page
            }

        }


        // Toggle Cart Functionality
        cartToggle.addEventListener('click', function() {
            cartWrapper.classList.toggle('close');
        });


        //*"Next" and "Finalize Order" Buttons*
        const nextButton = document.getElementById('next');
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                currentStep++;
                updateStep();
            });
        } 
        
       
       /*== For New Step System ==*/
        let currentStep = 1;

       function hideAllSteps() {
            // Hide everything from the 1st step:
            document.querySelector('.cart').style.display = 'none';
            document.getElementById('checkout').style.display = 'none';
            
            // Hide everything from the 2nd step:
            document.querySelector('.form2flex').style.display = 'none';
            document.getElementById('next').style.display = 'none'; 
            
            // Hide everything from the 3rd step:
            document.getElementById('payment-options').style.display = 'none';
            document.getElementById('notifyButton').style.display = 'none';
            document.getElementById('goBackButton').style.display = 'none';  //  'Go Back' button
            document.getElementById('cancelOrderButton').style.display = 'none';  //  'Cancel Order' button
            
            // Hide everything from the 4th step:
            document.getElementById('final-step').style.display = 'none';
        }


        /*== Order Number Generator ==*/
        function generateOrderNumber() {
            // Generate a random 5-digit number
            let randomNum = Math.floor(10000 + Math.random() * 90000); 
            return "CLTZ0" + randomNum;
        }

        /*== Order Date/Time ==*/
        function getDateTime() {
            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }


        /*== Order detail Print Screen ==*/
        function populateOrderDetails() {
        const orderDetailsElem = document.getElementById("order-details");

        // Get product details
        let productDetailsHTML = '<h4>Products Ordered:</h4><ul>';
        cart.items.forEach(item => {
            productDetailsHTML += `<li>${item.productName} - (Qty: ${document.querySelector(`#${item.product} .quantity-value`).value}  Price: ₦ ${(item.productPrice).toFixed(2)})</li>`;
        });
        productDetailsHTML += '</ul>';

        // Gather order number, name, phone, and location
        const orderNumber = document.getElementById("orderNumber").value;
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const location = document.getElementById("location").value;
        const cabinNo = document.getElementById("cabin-no").value;
        const otherLocations = document.getElementById("other-locations").value;
        const email = document.getElementById("email").value;

        // Gather selected payment method values
        const selectedBank = document.querySelector('input[name="bank"]:checked');
        const selectedCreditCard = document.querySelector('input[name="payment-method"]:checked');

        const info = "Items shall be released on confirmation of your payment. Thanks!"

        let paymentMethodHTML = '';
        if (selectedBank) {
            paymentMethodHTML += `<p>Bank Transfer: ${selectedBank.value}</p>`;
        }
        if (selectedCreditCard) {
            paymentMethodHTML += `<p>Credit Card: ${selectedCreditCard.value}</p>`;
        }

        orderDetailsElem.innerHTML = `

            ${productDetailsHTML}
            <h4>Order Information:</h4>
            <p>Order Number: ${orderNumber}</p>
            <p>Name: ${name}</p>
            <p>Phone: ${phone}</p>
            <p>Location: ${location}</p>
            <p>Cabin No.: ${cabinNo}</p>
            <p>Other Locations: ${otherLocations}</p>
            <p>Email: ${email}</p>
            <h5><strong>Payment Method:</strong></h5>
            ${paymentMethodHTML}
            <p>Date and Time: ${getDateTime()}</p>
            <p><strong>Note:</strong> ${info}</p>
            <p>Subtotal: ₦${cart.subtotal.toFixed(2)}</p>
            <p><strong>Total: ₦${cart.total.toFixed(2)}</strong></p>
        `;
        }




        /*== Update for Steps ==*/
        function updateStep() {
            hideAllSteps();  // Hide all steps first

            if (currentStep == 1 || cart.items.length == 0) {
                document.getElementById('ks').style.display = 'block';
            } else {
                document.getElementById('ks').style.display = 'none';
            }

            
            switch (currentStep) {
                case 1:
                    document.querySelector('.cart').style.display = 'block';
                    document.getElementById('checkout').style.display = 'block';

                    // Ensure "Finalize" and "Next" buttons are hidden in the first step
                    document.getElementById('finalizeOrder').style.display = 'none';
                    document.getElementById('next').style.display = 'none';
                    break;
                case 2:
                    document.querySelector('.form2flex').style.display = 'block';
                    document.getElementById('next').style.display = 'block';

                    // Hide the totals for step 2
                    document.getElementById('subtotal-label').style.display = 'none';
                    document.getElementById('subtotal').style.display = 'none';
                    document.getElementById('total-label').style.display = 'none';
                    document.getElementById('total').style.display = 'none';
                    break;
                case 3:
                    document.querySelector('.cart').style.display = 'block';
                    document.getElementById('payment-options').style.display = 'flex';
                    document.getElementById('notifyButton').style.display = 'block';
                    document.getElementById('goBackButton').style.display = 'block';
                    document.getElementById('cancelOrderButton').style.display = 'block';
                    

                    document.getElementById('subtotal-label').style.display = 'block';
                    document.getElementById('subtotal').style.display = 'block';
                    document.getElementById('total-label').style.display = 'block';
                    document.getElementById('total').style.display = 'block';

                    break;
                case 4:
                    document.getElementById('final-step').style.display = 'flex';
                    populateOrderDetails();  // called
                    document.getElementById('finalizeOrder').style.display = 'block';
                    document.getElementById('subtotal-label').style.display = 'none';
                    document.getElementById('subtotal').style.display = 'none';
                    document.getElementById('total-label').style.display = 'none';
                    document.getElementById('total').style.display = 'none';
                    document.getElementById('amount-controls').style.display = 'none';
                    break;

            }

            // Adjust visibility of "Keep Shopping" button
            if (currentStep == 1 || cart.items.length == 0) {
                document.getElementById('ks').style.display = 'block';
            } else {
                document.getElementById('ks').style.display = 'none';
            }
            
            

            if (cart.items.length == 0) {
                // Hide all other buttons, only show 'Keep Shopping' button.
                document.getElementById('checkout').style.display = 'none';
                document.getElementById('next').style.display = 'none';
                document.getElementById('notifyButton').style.display = 'none';
                document.getElementById('finalizeOrder').style.display = 'none';
            }


            if (currentStep == 2) {
                const orderNumberInput = document.getElementById('orderNumber');
                if (orderNumberInput) {
                    const orderNo = generateOrderNumber();
                    orderNumberInput.value = orderNo;
                }
                
            }

        }


        document.getElementById('checkout').addEventListener('click', function() {
            
            currentStep = 2;
            updateStep();

            updateSubtotal();
            updateTotal();
            populateProductDetailsInput();

            // Update prices based on the current quantity
            cart.items.forEach(item => {
                const quantityInput = document.querySelector(`#${item.product} .quantity-value`);
                const newQuantity = parseInt(quantityInput.value, 10);

                // Update the quantity in the cart
                item.quantity = newQuantity;

                // Update the productUpdatedPrice based on the new quantity
                item.productUpdatedPrice = item.productPrice * newQuantity;

                // Update the displayed productUpdatedPrice
                const productUpdatedPriceElement = document.querySelector(`#${item.productPrice} .updated-product-price`);
                productUpdatedPriceElement.textContent = item.productUpdatedPrice;

            });

            // Recalculate subtotal and total
            updateSubtotal();
            updateTotal();

        });

        document.getElementById('next').addEventListener('click', function() {
            
            // Check phone and email validity before proceeding
            const phoneInput = document.getElementById('phone');
            const emailInput = document.getElementById('email');
            // Validate email and phone
            const isPhoneValid = validatePhone(phoneInput.value);
            const isEmailValid = validateEmail(emailInput.value);
            const invalidMsg = document.getElementById('invalidMsg');

            if (!validatePhone(phoneInput.value) && !validateEmail(emailInput.value)) {
                // alert('Please enter a valid phone number/email.');
                emailInput.classList.add('invalid-input');
                invalidMsg.style.display = "block";
                currentStep = 2;
                updateStep();
            } else {
                invalidMsg.style.display = "none";
                emailInput.classList.remove('invalid-input');
                currentStep = 3;
                updateStep();
                populateSecondForm();
                updateSubtotal();
                updateTotal();
                populateProductDetailsInput();
            }
                    
        });


        function validatePhone(phone) {
            // Phone number must contain '0' and have at least 11 digits
            const phoneRegex = /0\d{10,}/;
            return phoneRegex.test(phone);
            }

            // validate email format
            function validateEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }


        document.getElementById('notifyButton').addEventListener('click', function(event) {
            // event.preventDefault();  // Prevent form submission

            const selectedBank = document.querySelector('.bank-radio:checked');
            const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked');

            const initPayMsg = document.getElementById('initPayMsg');
            let initPayChar = document.getElementById('payment-options');

            if (!selectedBank && !selectedPaymentMethod) {
                // alert('Please select a bank or payment method.');
                event.preventDefault();  // Prevent form submission

                initPayMsg.style.display = "block";
                initPayMsg.style.opacity = 1;
                initPayChar.style.background = "#d66e0057";
                initPayChar.style.opacity = 0.4;
            } else {
                // If a radio button or payment method is selected..
                currentStep = 4;  // To the final step
                updateStep();
            }


        });


        document.getElementById('goBackButton').addEventListener('click', function() {
            currentStep = 2;
            updateStep();
        });



        // document.querySelectorAll('.add-to-cart').forEach(button => {
        //     button.addEventListener('click', addToCart);
        // });

        // Event listener to handle click events on the parent element
            document.addEventListener('click', function(event) {
                // Check if the clicked element is the buy button
                if (event.target && event.target.classList.contains('add-to-cart')) {
                    // Call addToCart function passing the event
                    addToCart(event);
                }
            });



        document.getElementById('cancelOrderButton').addEventListener('click', function() {
            clearCart();
            cartWrapper.classList.add('close'); // Close the cart
            location.reload(); // Refresh the page
        });



             document.getElementById('finalizeOrder').addEventListener('click', function() {
            // window.location.href = 'index.html'; // Redirect to the homepage.
            location.reload(); // Redirect to last location.
        });



       /*==paysstacks==*/
        function handleForm() {
            // Gather form data for paystack
            const formData = {
                email: document.getElementById("InputEmail").value,
                amount: document.getElementById("InputPrice").value,
                orderNumberRef: document.getElementById("orderNumberRef").value,
                // Add more form fields as needed
            };


            // calls Paystack logic
            payWithPaystack(formData);
        }

        function payWithPaystack(formData) {
            let handler = PaystackPop.setup({
                key: 'pk_test_6b1cc58f2827ac858c2d25c77ee1d78498cb8f9f', // PK
                email: formData.email,
                amount: formData.amount * 100,
                currency: 'NGN', // Naira
                ref: formData.orderNumberRef,
                channel: 'card',
                onClose: function () {
                    alert('Window closed.');
                },
                callback: function (response) {
                    let message = 'Payment complete! Reference: ' + response.reference;
                    while (true) {
                        let userConfirmed = confirm(message + '\n\n click to proceed ');

                        if (userConfirmed) {

                            // If the user confirms, submit the form
                            document.getElementById('cartForm').submit();
                            currentStep = 4; // Moves to the next step to display order details
                            updateStep();
                            break; // Exit the loop if the user confirms
                        } else {
                            // break the loop or continue prompting
                        }
                    }
                }
            });

            handler.openIframe();
        }

        // Event listener to Paystack button
        const paystackButton = document.getElementById('paystackButton'); // Paystack button
        paystackButton.addEventListener("click", function (e) {
            e.preventDefault();
            handleForm(); // handleForm directly
        }, false);


        
            // Update visibility of buttons on page load
            updateButtonVisibility();
        });



        /*==Print Control==*/
        function printOrder() {
            const printContent = document.getElementById("order-details").outerHTML;
             const printLogo = document.getElementById("logoprint").outerHTML;
            const myWindow = window.open('', 'Print', 'width=600,height=600');
            myWindow.document.write('<html><head><title>Order Details</title>');
            myWindow.document.write('</head><body >');
            myWindow.document.write(printLogo);
            myWindow.document.write('<h4>Clautech Items Order</h4>');
            myWindow.document.write("<p>Online purchase printout</p>");
            myWindow.document.write(printContent);
            myWindow.document.write('</body></html>');
            myWindow.document.close();
            myWindow.focus();
            myWindow.print();

            event.preventDefault();
        }


        /*==Radio Buttons Controls==*/

        //*Get all radio buttons with the class 'bank-radio'*
        const bankRadios = document.querySelectorAll(".bank-radio");

        bankRadios.forEach(function(radio) {
        radio.addEventListener("change", function() {
            // Hide all bank details initially
            const allBankDetails = document.querySelectorAll(".bank-details");
            allBankDetails.forEach(function(bankDetail) {
                bankDetail.style.display = "none";
            });

            // Show the bank details
            const value = radio.value;
            const bankDetailToShow = document.querySelector(".bank-details." + value);
            
            const initPayMsgRad = document.getElementById('initPayMsg');
            let initPayCharRad = document.getElementById('payment-options');

            if (bankDetailToShow) {
                bankDetailToShow.style.display = "block";
            }

            initPayMsgRad.style.display = "none";
            initPayCharRad.style.background = "transparent";
            initPayCharRad.style.opacity = 1;


            // Start the timer
            startTimer();
        });
    });


    //*Radio associated with credit card*
    document.addEventListener("DOMContentLoaded", function() {
        const paymentMethods = document.querySelectorAll(".payment-method");
        
        paymentMethods.forEach(function(method) {
            method.addEventListener("change", function() {
                if (method.value === "credit-card") {
                    
                    const allBankDetailsCard = document.querySelectorAll(".bank-details");
                    allBankDetailsCard.forEach(function(bankDetail) {
                        bankDetail.style.display = "none";
                    });

                    document.querySelector(".credit-card-details").style.display = "flex";
                    
                } else {
                    document.querySelector(".credit-card-details").style.display = "none";
                }
            });
        });


        /*__Radio Buttons Modifications 2__*/

        // Event listener to the credit card radio button
        const creditCardRadio = document.querySelector('.payment-method');
        const hiddenPaymentMethodInput = document.getElementById('selectedPaymentMethod');
        const initPayMsgRadb = document.getElementById('initPayMsg');
        let initPayCharRadb = document.getElementById('payment-options');
        creditCardRadio.addEventListener('change', function () {

            // Set the value of the hidden input to the selected payment method
            hiddenPaymentMethodInput.value = creditCardRadio.value;

            // Unselect or untick bank transfer radio buttons
            const bankRadios = document.querySelectorAll('.bank-radio');
            bankRadios.forEach(radio => {
                radio.checked = false;

            initPayMsgRadb.style.display = "none";
            initPayCharRadb.style.background = "transparent";
            initPayCharRadb.style.opacity = 1;

            });

            stopTimer();
        });


        // Event listener to the bank transfer radio buttons
        const bankRadios = document.querySelectorAll('.bank-radio');
        bankRadios.forEach(radio => {
            radio.addEventListener('change', function () {

                // Set the value of the hidden input to the selected payment method
                hiddenPaymentMethodInput.value = radio.value;

                // Uncheck the credit card radio button
                creditCardRadio.checked = false;

                document.querySelector(".credit-card-details").style.display = "none";
                
            });

        });

/*==End Line==*/

});

