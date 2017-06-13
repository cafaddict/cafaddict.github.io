var firebase_url = "https://hevetica-e4d31.firebaseio.com/";
var firebase_api_key = "AIzaSyAqbt-WXCdum0_Hfxh4tWSUOOYDHROswdE";
var storage_bucket = "gs://hevetica-e4d31.appspot.com/";
var firebase_config = {
  apiKey: firebase_api_key,
  databaseURL: firebase_url,
  storageBucket: storage_bucket
};
firebase.initializeApp(firebase_config);
var database = firebase.database();
var itemRef = database.ref("item");
var itemNumRef = database.ref("item_num");
var itemTagRef = database.ref("item_tag");
var itemSellerRef = database.ref("item_seller");
var userRef = database.ref("user");

var id;

var image_src = "http://placehold.it/750x500";

$("#img_button").on( "click", function() {
	$("#up_img").attr("src",$("#img").val());
	image_src = $("#img").val();
});

$("#submit").on("click",function() {

	
	// var name = $("#name").val();
	add_info();
	alert("Done");
	var href = "index.html";
	window.location.href = href;
	
	
	//alert(description);
	


});
function add_info()
{
	console.log(image_src);
	var tag_id;
	itemNumRef.once("value").then(function(snapshot) {
		var item_id = snapshot.val();

		database.ref("item/" + item_id).set({
			"item_id":item_id,
			"item_name":$("#name").val(),
			//"image_src":$("#img").val(),
			"image_src":image_src,
			"seller_num":0,
			"requst_num":0,
			"description":$("#description").val(),
			"min_price":0
		});
		itemTagRef.push({
			item_id:item_id,
			item_tag:$("#tag").val()
		
		})
		itemNumRef.set(item_id+1);
	});
}

function onuploadFile(){
	document.getElementById('getval').addEventListener('change', readURL, true);
	function readURL(){
		var file = document.getElementById("getval").files[0];
		console.log(file.name);
		var storageRef = firebase.storage().ref(file.name);

		storageRef.put(file).then(function(snapshot) {
			var downloadURL = snapshot.downloadURL;
			console.log(downloadURL);
			$("#up_img").attr("src",downloadURL);
			image_src = downloadURL;
		});
	}
}

onuploadFile();

