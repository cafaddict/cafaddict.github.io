var firebase_url = "https://hevetica-e4d31.firebaseio.com/";
var firebase_api_key = "AIzaSyAqbt-WXCdum0_Hfxh4tWSUOOYDHROswdE";
var firebase_config = {
  apiKey: firebase_api_key,
  databaseURL: firebase_url
};

firebase.initializeApp(firebase_config);
var database = firebase.database();
var cartRef = database.ref("cart")
var total = 0
cartRef.on("value", function(snapshot) {
		var comments = snapshot.val();
  		var childHTMLs = Object.keys(comments).map(function(key) {
			var data = comments[key]
			total += data.item_qty * data.min_price
			return `
				<li class="row">
			<span class="quantity"> ${data.item_qty} </span>
			<span class="itemName"> ${data.item_name} </span>
			<span class="popbtn"> <a class="arrow"> </a> </span>
			<span class="price"> $${data.min_price} </span>
			</li>`
		})
		var childHTML = childHTMLs.join("")
		$('#cart_table').empty()
		$("#cart_table").append(childHTML)
		document.getElementById("total_price").innerHTML = '$' + total
});


