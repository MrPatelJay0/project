// Add item to cart
function addToCart(name, price) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let found = false;

    for (let i = 0; i < cart.length; i++) {

        if (cart[i].name == name) {

            cart[i].quantity++;
            found = true;
        }
    }

    if (found == false) {

        let item = {
            name: name,
            price: price,
            quantity: 1
        };

        cart.push(item);
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(name + " added to cart");

    updateCartCount();
}


// Show cart
function showCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";

    if (cart.length == 0) {

        cartItems.innerHTML = `
            <div class="alert alert-info">
                Your cart is empty.
            </div>
        `;

        document.getElementById("total").innerHTML =
            "Total: ₹0";

        return;
    }

    for (let i = 0; i < cart.length; i++) {

        let subtotal =
            cart[i].price * cart[i].quantity;

        cartItems.innerHTML += `

            <div class="card mb-3">

                <div class="card-body">

                    <h5>${cart[i].name}</h5>

                    <p>Price: ₹${cart[i].price}</p>

                    <input
                        type="number"
                        value="${cart[i].quantity}"
                        min="1"
                        onchange="changeQuantity(${i}, this.value)"
                        class="form-control mb-2">

                    <p>
                        Subtotal: ₹${subtotal}
                    </p>

                    <button
                        class="btn btn-danger"
                        onclick="removeItem(${i})">

                        Remove

                    </button>

                </div>

            </div>
        `;
    }

    calculateTotal();
    updateCartCount();
}


// Change quantity
function changeQuantity(index, quantity) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity = parseInt(quantity);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    showCart();
}


// Remove item
function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    showCart();
}


// Calculate total
function calculateTotal() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    for (let i = 0; i < cart.length; i++) {

        total = total +
            (cart[i].price * cart[i].quantity);
    }

    document.getElementById("total").innerHTML =
        "Total: ₹" + total;
}


// Update cart count
function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let count = 0;

    for (let i = 0; i < cart.length; i++) {

        count = count + cart[i].quantity;
    }

    let cartCount =
        document.getElementById("cartCount");

    if (cartCount) {

        cartCount.innerHTML = count;
    }
}


// Place order
function placeOrder() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length == 0) {

        alert("Your cart is empty!");

        return;
    }


    let orders = JSON.parse(localStorage.getItem("orders")) || [];


    let newOrder = {

        items: cart,

        status: "Order Placed"

    };


    orders.push(newOrder);


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    localStorage.removeItem("cart");


    alert("Order Placed Successfully!");


    window.location.href = "orders.html";

}


// Show orders
function showOrders() {

    let orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    let ordersDiv =
        document.getElementById("orders");

    ordersDiv.innerHTML = "";

    if (orders.length == 0) {

        ordersDiv.innerHTML = `
            <div class="alert alert-info text-center">
                No orders found.
            </div>
        `;

        return;
    }


    for (let i = 0; i < orders.length; i++) {

        let total = 0;

        let items = "";


        for (let j = 0; j < orders[i].items.length; j++) {

            let item = orders[i].items[j];

            let subtotal =
                item.price * item.quantity;

            total = total + subtotal;


            items += `
                <p>
                    ${item.name}
                    × ${item.quantity}
                    - ₹${subtotal}
                </p>
            `;
        }


        ordersDiv.innerHTML += `

            <div class="card shadow-sm mb-4">

                <div class="card-body">

                    <div class="d-flex justify-content-between">

                        <h4>
                            Order #${i + 1}
                        </h4>

                        <span class="badge bg-primary">
                            ${orders[i].status}
                        </span>

                    </div>

                    <hr>

                    <h6>Items:</h6>

                    ${items}

                    <hr>

                    <h5>
                        Total: ₹${total}
                    </h5>

                    <p class="mb-0">
                        Order Status:
                        <strong>${orders[i].status}</strong>
                    </p>

                </div>

            </div>

        `;
    }
}

function showCategory(category) {

    displayFoods(category);


    // Reset buttons

    document.getElementById("allBtn").className =
        "btn btn-outline-primary";

    document.getElementById("burgerBtn").className =
        "btn btn-outline-primary";

    document.getElementById("pizzaBtn").className =
        "btn btn-outline-primary";

    document.getElementById("biryaniBtn").className =
        "btn btn-outline-primary";

    document.getElementById("coldDrinksBtn").className =
        "btn btn-outline-primary";

    document.getElementById("moreItemsBtn").className =
        "btn btn-outline-primary";


    // Highlight selected button

    if (category == "all") {

        document.getElementById("allBtn").className =
            "btn btn-primary";

    }

    if (category == "burger") {

        document.getElementById("burgerBtn").className =
            "btn btn-primary";

    }

    if (category == "pizza") {

        document.getElementById("pizzaBtn").className =
            "btn btn-primary";

    }

    if (category == "biryani") {

        document.getElementById("biryaniBtn").className =
            "btn btn-primary";

    }

    if (category == "cold drinks") {

        document.getElementById("coldDrinksBtn").className =
            "btn btn-primary";

    }

    if (category == "more items") {

        document.getElementById("moreItemsBtn").className =
            "btn btn-primary";

    }

}

// Store all food items
let allFoods = [];


// Load food from JSON and localStorage
function loadMenu() {

    fetch("foods.json")

    .then(function(response) {

        return response.json();

    })

    .then(function(foods) {

        // Store foods from JSON
        allFoods = foods;


        // Get food added by admin
        let adminFoods =
            JSON.parse(localStorage.getItem("foods")) || [];


        // Add admin food to the food list
        for (let i = 0; i < adminFoods.length; i++) {

            allFoods.push(adminFoods[i]);

        }


        // Display all food
        displayFoods("all");

    })

    .catch(function(error) {

        console.log("Error loading foods:", error);

    });

}


// Display food
function displayFoods(category) {

    let foodContainer =
        document.getElementById("foodContainer");

    foodContainer.innerHTML = "";


    // Categories for All section

    let categories = [
        "Burger",
        "Pizza",
        "Biryani",
        "Cold Drinks",
        "More Items"
    ];


    // If All is selected

    if (category == "all") {

        for (let c = 0; c < categories.length; c++) {

            let currentCategory = categories[c];

            let hasFood = false;


            // Check if category has food

            for (let i = 0; i < allFoods.length; i++) {

                if (
                    allFoods[i].category.toLowerCase() ==
                    currentCategory.toLowerCase()
                ) {

                    hasFood = true;

                    break;
                }
            }


            // Show category only if food exists

            if (hasFood) {

                let heading = "";


                if (currentCategory == "Burger") {

                    heading = "🍔 Burgers";

                }

                else if (currentCategory == "Pizza") {

                    heading = "🍕 Pizzas";

                }

                else if (currentCategory == "Biryani") {

                    heading = "🍛 Biryani";

                }

                else if (currentCategory == "Cold Drinks") {

                    heading = "🥤 Cold Drinks";

                }

                else {

                    heading = "🍟 More Items";

                }


                foodContainer.innerHTML += `

                    <div class="col-12 mt-5">

                        <h2 class="text-center mb-4">
                            ${heading}
                        </h2>

                    </div>

                `;


                // Display food of this category

                for (let i = 0; i < allFoods.length; i++) {

                    let food = allFoods[i];


                    if (
                        food.category.toLowerCase() ==
                        currentCategory.toLowerCase()
                    ) {

                        createFoodCard(food);

                    }

                }

            }

        }

    }


    // If a specific category is selected

    else {

        for (let i = 0; i < allFoods.length; i++) {

            let food = allFoods[i];


            if (
                food.category.toLowerCase() == category
            ) {

                createFoodCard(food);

            }

        }

    }

}


function createFoodCard(food) {

    let foodContainer =
        document.getElementById("foodContainer");

    let image = "";

    if (food.image) {

        image = `
            <div
                style="
                    height: 180px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: white;
                    padding: 10px;
                "
            >

                <img
                    src="${food.image}"
                    style="
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    "
                >

            </div>
        `;

    }

    foodContainer.innerHTML += `

        <div class="col-6 col-md-4 col-lg-3">

            <div class="card h-100 shadow-sm">

                ${image}

                <div class="card-body text-center">

                    <h5 class="card-title">
                        ${food.name}
                    </h5>

                    <p class="card-text mb-1">
                        ₹${food.price}
                    </p>

                    <p class="text-muted small mb-3">
                        ${food.category}
                    </p>

                    <button
                        class="btn btn-primary"
                        onclick="addToCart('${food.name}', ${food.price})">

                        Add to Cart

                    </button>

                </div>

            </div>

        </div>

    `;

}