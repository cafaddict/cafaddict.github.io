var firebase_url = "https://hevetica-e4d31.firebaseio.com/";
var firebase_api_key = "AIzaSyAqbt-WXCdum0_Hfxh4tWSUOOYDHROswdE";
var firebase_config = {
  apiKey: firebase_api_key,
  databaseURL: firebase_url
};


firebase.initializeApp(firebase_config);
var database = firebase.database();
var itemRef = database.ref("item");
var itemNumRef = database.ref("item_num");
var itemTagRef = database.ref("item_tag");
var itemSellerRef = database.ref("item_seller");
var userRef = database.ref("user");
var cartRef = database.ref("cart");

var item_id = location.search.split('item_id=')[1]
//alert(item_id)
var item =[];


itemRef.on("value", function(snapshot) {
		var comments = snapshot.val();
  		var childHTMLs = Object.keys(comments).map(function(key) {
			var data = comments[key]
			if (key == item_id)
			{
				
				var items = { 
								item_id: data.item_id,
								item_name: data.item_name,
								seller_num: data.seller_num,
								requst_num: data.request_num,
								description: data.description,
								min_price: data.min_price,
								image_src: data.image_src
							}

				
				item.push(items);
			}
			
			
		})

		//console.log(item[0]);
		$("#contents_table").append(`
                    <img class="img-circle" src=${item[0]["image_src"]} alt="Generic placeholder image" width="800" height="300">
                    <div class="caption-full">
                        <h3 id="product_price" class="pull-right">$${item[0]["min_price"]}</h3>
                        <h3 id="product_name"><font color="CornflowerBlue">${item[0]["item_name"]}</font></h3>
                        </h4>
                        <p id="description">${item[0]["description"]}</p>
                        <p></p>
                        <p></p>
                    </div>`);
		$("#contents_table").append(`<div class="col-md-8"></div>`);
		if(item[0]["seller_num"]>0)
		{
			$("#contents_table").append(`<div id="in_stock" class="col-md-4">
						<span id="to_cart" class="btn btn-success" onclick="location.href='./shopping_cart.html'"> To Shopping Cart </span>
						<span id="to_buy" class="btn btn-primary" onclick="location.href='shopping_done.html'"> Buy Now </span>

					</div>`);
					//onclick="location.href='shopping_cart.html'"
			$('#to_cart').click(function(){
				//var item_exists = 
				
				cartRef.once('value', function(snapshot) {
					var exists = false
					var comments = snapshot.val()
					if (comments != null) {
					var childHTMLs = Object.keys(comments).map(function(key) {
						var data = comments[key]
							if (data.item_name == "nimbus 9000") {

								//var qty = cartRef.ref('data')
								var dataRef = firebase.database().ref('cart/' + key)
								var qty = data.item_qty
								qty++
								dataRef.update({item_qty: qty})
								
								exists = true
							}
					})
					}
					
					if (!exists) {
						console.log("noitem")
						cartRef.push({
							item_name: item[0]["item_name"],
							min_price: item[0]["min_price"],
							item_qty: 1
						})
					}
				})

				alert("Added to Shopping Cart")
				//location.href = "../implements/shopping_cart.html"
			})

			$("#contents_table").append(`<div class="ratings">
						<p> </p>
	                    
	                        <p id="number_seller">
	  
	                            ${item[0]["seller_num"]} availabe sellers
	                        </p>
	                    </div>`);
			$("#seller").append(`<div class="row">
	                        <div class="col-md-12">
	                        James Lee
	                        <span class="glyphicon glyphicon-star"></span>
	                            <span class="glyphicon glyphicon-star"></span>
	                            <span class="glyphicon glyphicon-star"></span>
	                            <span class="glyphicon glyphicon-star"></span>
	                            <span class="glyphicon glyphicon-star-empty"></span>
	                            <span class="pull-right"> <h3> $${item[0]["min_price"]} </h3> </span>

	                    </div>`)
		}
		else
		{
			$("#seller").append(`
                        <button onclick="javascript:void window.open('receive email popup.html','1494164703883','width=300,height=200,toolbar=0,menubar=0,location=0,status=0,scrollbars=0,resizable=1,left=0,top=0');return false;">Request This Product!</button>
                    `)
		}
});
