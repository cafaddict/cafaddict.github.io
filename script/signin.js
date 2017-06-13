$(function() {
    $('#login-form-link').click(function(e) {
		$(".login-form").delay(100).fadeIn(100);
 		$(".register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$(".register-form").delay(100).fadeIn(100);
 		$(".login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
});

//Global Variable : static
var firebase_url = "https://hevetica-e4d31.firebaseio.com/";
var firebase_api_key = "AIzaSyAqbt-WXCdum0_Hfxh4tWSUOOYDHROswdE";
var firebase_config = {
  apiKey: firebase_api_key,
  databaseURL: firebase_url
};
firebase.initializeApp(firebase_config);
var database = firebase.database();
var userRef = database.ref("user");

//Global Variable : dynamic

//Functions



function onclickLogin(){
	$('#login-submit').click(function() {
		//console.log("onclick login");

		var user_name_input = $('#login-username').val();
		var password_input = $('#login-password').val();
		var is_username = false;

		//console.log(user_name_input);
		//console.log(password_input);

		userRef.once("value", function(snapshot) {
	  	snapshot.forEach(function(child) {
		    	var single_val = child.val();
		    	//console.log(single_val);
		    	if(single_val["user_name"] == user_name_input){
		    		//console.log("hit");
		    		//console.log(single_val["password"]);
		    		if(single_val["password"] == password_input){
		    			location.href = "index.html?user_name=" + user_name_input;
		    			is_username = true;
		    			return true;
		    			//break;
		    		}
		    		else{
		    			alert("Wrong User Name or Password");
		    			$('#login-username').val("");
		    			$('#login-password').val("");
		    			is_username = true;
		    			return true;
		    			//break;
		    		}
		    	}
		  	});
	  	if(is_username == false){
			alert("Wrong User Name or Password");
			$('#login-username').val("");
			$('#login-password').val("");
		}
		return true;
		});
    });
}

function onclickRegister(){
	$('#register-submit').click(function() {
		var user_name_input = $('#register-username').val();
		var email_input = $('#register-email').val();
		var password_input = $('#register-password').val();
		var confirm_password_input = $('#register-confirm-password').val();
		var is_username = false;

		//console.log(user_name_input);
		//console.log(email_input);
		//console.log(password_input);
		//console.log(confirm_password_input);

		userRef.once("value", function(snapshot) {
	  	snapshot.forEach(function(child) {
		    	var single_val = child.val();
		    	if(single_val["user_name"] == user_name_input){
		    		alert("User name already exists!Try other user name");
		    		$('#register-username').val("");
		    		$('#register-email').val("");
		    		$('#register-password').val("");
		    		$('#register-confirm-password').val("");
		    		is_username = true;
		    		return true;
		    	}
		  	});
	  	if(is_username == false){
		  	if(password_input == confirm_password_input){
		  		userRef.push({
					"user_name":user_name_input,
					"user_email":email_input,
					"password":password_input
				});
				alert("Register complete");
			    $('#register-username').val("");
			    $('#register-email').val("");
			    $('#register-password').val("");
			    $('#register-confirm-password').val("");
			    return true;
			}else{
				alert("Password and confirm is different");
			    $('#register-username').val("");
			    $('#register-email').val("");
			    $('#register-password').val("");
			    $('#register-confirm-password').val("");
			    return true;
			}
		}
		
		});
    });
}

onclickLogin();
onclickRegister();