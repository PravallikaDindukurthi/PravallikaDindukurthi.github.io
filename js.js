if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}
var kuuid
function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    //window.alert(typeof(cartItemNames));
    var leng=cartItemNames.length-1
    var array2 = new Array(leng);
    var pricearray = new Array(leng);
    var quanarray = new Array(leng);


var cartRows = cartItems.getElementsByClassName('cart-row')
     
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        quanarray[i]=quantity
pricearray[i]= price 
        //alert(quantity)
    }

 
    for (var i = 0; i < cartItemNames.length; i++) {
        array2[i]=cartItemNames[i].innerText
        //alert(cartItemNames[i].innerText)
       // alert(array2[i])
//alert(quanarray[i])
//alert(pricearray[i])
//per item price.

    }
	//alert(array2[0])
	/* var firebaseConfig = {
    apiKey: "AIzaSyCQ_0LYaDjbjpjbg5p_PZIILi8YsBlr41s",
    authDomain: "ibmtest-b7246.firebaseapp.com",
    databaseURL: "https://ibmtest-b7246-default-rtdb.firebaseio.com",
    projectId: "ibmtest-b7246",
    storageBucket: "ibmtest-b7246.appspot.com",
    messagingSenderId: "847583626298",
    appId: "1:847583626298:web:5edfaf37ec52ef5cdae103",
    measurementId: "G-J2JXJLVJ7C"
    };
   firebase.initializeApp(config);
   console.log(firebase);
	var database = firebase.database();
	var ref = database.ref('scores');
	alert(array2[0])
	var data =
	{
		name : "DTS",
		score: 43 
	}
	ref.push(data)*/
	var parser = new DOMParser();	
	var xml = "<Order BuyerOrganizationCode=\"DEFAULT\" DocumentType=\"0001\" EnterpriseCode=\"DEFAULT\" OrderNo=\"" + create_UUID() +"\" SellerOrganizationCode=\"DEFAULT\">"
	xml=xml+"<OrderLines>"
	var cartRows = cartItems.getElementsByClassName('cart-row')
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        quanarray[i]=quantity
		pricearray[i]= price
		xml= xml+ "<OrderLine OrderedQty=\""+quanarray[i]+"\" PrimeLineNo=\""+ (i+1) +"\" SubLineNo=\"1\" ShipNode=\"STORE_VENDOR01\" >"
		xml= xml + "<Item ItemID=\""+ array2[i]+"\" ProductClass=\"GOOD\" UnitOfMeasure=\"EACH\"/>"
		xml= xml + "</OrderLine>"
   }
	xml= xml + "</OrderLines>"
	xml= xml + "<PersonInfoShipTo Country=\"JP\" ZipCode=\"663-8142-000\">"
	xml= xml + "</PersonInfoShipTo>"
	xml= xml + "<PersonInfoBillTo Country=\"JP\" ZipCode=\"319-2211-000\">"
	xml= xml + "</PersonInfoBillTo>"
	xml= xml + "</Order>"
	var xmlDoc = parser.parseFromString(xml, "application/xml");
    alert(xml)
	
	
	/*
	
	const xhr = new XMLHttpRequest();
	xhr.onload =function(){
		const serverResponse = document.getElementById("demoo");
		serverResponse.innerHTML=this.responseText;
	}
	xhr.open("POST","https://keerthanagolla.github.io/test.php");
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.send("name=k&message=yo");*/


	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT","https://hookb.in/6JzqVNXW37cLbb03J6D8");
	var xmlDoc;
	xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		xmlDoc = xmlhttp.responseXML;
		console.log(xmlDoc);
		//alert(array2[0])
		alert("order successfully placed")
		var p = create_UUID()
		kuuid=p
		alert("your order id " + p );
		}
	};
	//alert(array2[0])
	xmlhttp.setRequestHeader('Content-Type', 'text/xml');
	xmlhttp.send(xml);


/*
var xhr;
	 if (window.XMLHttpRequest) { // Mozilla, Safari, ...
    xhr = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE 8 and older
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}



//alert(data);
  // Build the URL to connect to
  var url = "https://keerthanagolla.github.io/test.php";

  // Open a connection to the server
  xhr.open("POST", url, true);

  // declaring that the data being sent is in XML format
  xhr.setRequestHeader("Content-Type", "text/xml");

  // Send the request
  xhr.send(xml);
*/

   // alert(array2[0])
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
	
} 


function writeUserData(Itemname) {
  firebase.database().ref('users/' + CArtItem).set({
     CArtItem : Itemname,

  });
}
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
	 //var ID = shopItem.getElementsByClassName('shop-item-ID')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    
addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
 alert('Item added')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('Sorry,This item is already added to the cart.You can add quantity by navigating to cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

 
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
	
}
