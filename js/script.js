
let productsContainer = [];

if (localStorage.getItem("products") == null) {
    productsContainer = [];
    let addbutton = `<button onclick="addProducts()" class="btn btn-outline-info">ADD PRODUCT</button>`;
    document.getElementById("button").innerHTML = addbutton;
}
else {
    productsContainer = JSON.parse(localStorage.getItem("products"));
    let addbutton = `<button onclick="addProducts()" class="btn btn-outline-info">ADD PRODUCT</button>`;
    document.getElementById("button").innerHTML = addbutton;
    displayProducts();
}

function addProducts() {
    let productName = document.getElementById("productName").value;
    let productPrice = document.getElementById("productPrice").value;
    let productCategory = document.getElementById("productCategory").value;
    let paymentMethod = document.getElementById("paymentMethod").value;
    let productDiscussion = document.getElementById("productDiscussion").value;
    let radioButtons = document.getElementsByName("sale");
    let onsale;
    if (radioButtons[0].checked == true) {
        onsale = true;
    }
    else {
        onsale = false;
    }

    if (typeof paymentMethod == 'undefined') {
        paymentMethod = 'cash';
    }

    if (validationName(productName) == true) {
        if (validationPrice(productPrice) == true) {
            if (validationCategory(productCategory) == true) {
                if (validationDiscussion(productDiscussion) == true) {
                    let product =
                    {
                        name: productName,
                        price: productPrice,
                        category: productCategory,
                        pay: paymentMethod,
                        desc: productDiscussion,
                        sale: onsale
                    }
                    productsContainer.push(product);
                    localStorage.setItem("products", JSON.stringify(productsContainer));
                    document.getElementById("productName").value = "";
                    document.getElementById("productPrice").value = "";
                    document.getElementById("productCategory").value = "";
                    document.getElementById("paymentMethod").value = "cash";
                    document.getElementById("productDiscussion").value = "";
                    radioButtons[1].checked = true;
                    radioButtons[0].checked = false;
                    displayProducts();
                } else {
                    alert("Enter valid product Discussion!");
                }
            } else {
                alert("Enter valid product category!");
            }
        } else {
            alert("Enter valid product price!");
        }
    } else {
        alert("Enter valid product name!");
    }
}

function displayProducts() {
    let temp = ``;
    for (let i = 0; i < productsContainer.length; i++) {
        temp += `<div class="col-lg-4 col-md-6 py-2">
            <div class="card product">
                <img class="card-img-top w-100" src="image/1.jpg">
                <div class="card-body">
                    <h2 class="card-title">Name : <strong>`+ productsContainer[i].name + `</strong></h2>
                    <p class="card-text">Category : <strong>`+ productsContainer[i].category + `</strong></p>
                    <p class="card-text">Price : <strong>`+ productsContainer[i].price + `</strong></p>
                    <p class="card-text">Payment method : <strong class="badge badge-info">` + productsContainer[i].pay + `</strong></p>`;
        if (productsContainer[i].desc.length > 0) {
            temp += `<p class="card-text">Decription : <strong>` + productsContainer[i].desc + `</strong></p>`;
        }
        temp += `<div class="text-center py-1">
                        <button onclick="deleteProducts(`+ i + `)" class="btn btn-danger">DELETE</button>
                        <button onclick="updateProducts(`+ i + `)" class="btn btn-warning">UPDATE</button>
                    </div>
         `;

        if (productsContainer[i].sale == true) {
            temp += `<div class="sale">sale</div>`;
        }

        temp += `</div></div></div>`;
    }
    document.getElementById("products").innerHTML = temp;
}

function searchProducts(word) {
    let temp = ``;
    for (let i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(word.toLowerCase())) {
            temp += `<div class="col-lg-4 col-md-6 py-2">
            <div class="card product">
                <img class="card-img-top w-100" src="image/1.jpg">
                <div class="card-body">
                    <h2 class="card-title">Name : <strong>`+ productsContainer[i].name + `</strong></h2>
                    <p class="card-text">Category : <strong>`+ productsContainer[i].category + `</strong></p>
                    <p class="card-text">Price : <strong>`+ productsContainer[i].price + `</strong></p>
                    <p class="card-text">Payment method : <strong class="badge badge-info">` + productsContainer[i].pay + `</strong></p>`;
            if (productsContainer[i].desc.length > 0) {
                temp += `<p class="card-text">Decription : <strong>` + productsContainer[i].desc + `</strong></p>`;
            }
            temp += `<div class="text-center py-1">
                        <button onclick="deleteProducts(`+ i + `)" class="btn btn-danger">DELETE</button>
                        <button onclick="updateProducts(`+ i + `)" class="btn btn-warning">UPDATE</button>
                    </div>
         `;

            if (productsContainer[i].sale == true) {
                temp += `<div class="sale">sale</div>`;
            }

            temp += `</div></div></div>`;
        }
    }
    document.getElementById("products").innerHTML = temp;
}

function deleteProducts(num) {
    productsContainer.splice(num, 1);
    localStorage.setItem("products", JSON.stringify(productsContainer));
    displayProducts();
}

function updateProducts(num) {
    let addbutton = `<button onclick="newProduct(` + num + `)" class="btn btn-outline-info">UPDATE PRODUCT</button>`;
    document.getElementById("button").innerHTML = addbutton;
    document.getElementById("productName").value = productsContainer[num].name;
    document.getElementById("productPrice").value = productsContainer[num].price;
    document.getElementById("productCategory").value = productsContainer[num].category;
    document.getElementById("paymentMethod").value = productsContainer[num].pay;
    document.getElementById("productDiscussion").value = productsContainer[num].desc;
    let radioButtons = document.getElementsByName("sale");
    if (productsContainer[num].sale == true) {
        radioButtons[0].checked = true;
        radioButtons[1].checked = false;
    }
    else {
        radioButtons[0].checked = false;
        radioButtons[1].checked = true;
    }
}

function newProduct(num) {
    productsContainer[num].name = document.getElementById("productName").value;
    productsContainer[num].price = document.getElementById("productPrice").value;
    productsContainer[num].category = document.getElementById("productCategory").value;
    productsContainer[num].pay = document.getElementById("paymentMethod").value;
    productsContainer[num].desc = document.getElementById("productDiscussion").value;
    let radioButtons = document.getElementsByName("sale");
    if (radioButtons[0].checked == true) {
        productsContainer[num].sale = true;
    } else {
        productsContainer[num].sale = false;
    }
    if (validationName(productsContainer[num].name) == true) {
        if (validationPrice(productsContainer[num].price) == true) {
            if (validationCategory(productsContainer[num].category) == true) {
                if (validationDiscussion(productsContainer[num].desc) == true) {
                    localStorage.setItem("products", JSON.stringify(productsContainer));
                    let addbutton = `<button onclick="addProducts()" class="btn btn-outline-info">ADD PRODUCT</button>`;
                    document.getElementById("button").innerHTML = addbutton;
                    document.getElementById("productName").value = "";
                    document.getElementById("productPrice").value = "";
                    document.getElementById("productCategory").value = "";
                    document.getElementById("paymentMethod").value = "cash";
                    document.getElementById("productDiscussion").value = "";
                    radioButtons[0].checked = false;
                    radioButtons[1].checked = true;
                    displayProducts();
                } else {
                    alert("Enter valid product Discussion!");
                }
            } else {
                alert("Enter valid product category!");
            }
        } else {
            alert("Enter valid product price!");
        }
    } else {
        alert("Enter valid product name!");
    }
}

function validationName(word) {
    let nameRegex = /^[A-Z][a-zA-Z ]{2,14}$/;
    if (nameRegex.test(word) == true) {
        return true;
    } else {
        return false;
    }
}

function validationPrice(word) {
    let nameRegex = /^[1-9][0-9]{1,6}$/;
    if (nameRegex.test(word) == true) {
        return true;
    } else {
        return false;
    }
}

function validationCategory(word) {
    let nameRegex = /[a-z]{3,10}-[0-9]{1,7}$/i;
    if (nameRegex.test(word) == true) {
        return true;
    } else {
        return false;
    }
}

function validationDiscussion(word) {
    let nameRegex = /^[a-zA-Z 0-9.]{0,}$/i;
    if (nameRegex.test(word) == true) {
        return true;
    } else {
        return false;
    }
}
