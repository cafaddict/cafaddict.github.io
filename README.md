# TeamHelvetica.github.io
HCI:CS374

# How to use
start with index.html
At the begining there is only search result of baseballbat, so try to search with 'baseball' 'bat' or 'baseballbat'
When the user request a product, it will be added to database. Then the user can serach his or her product with tag or name.

# Explanation of each file
index.html is main page, dealing with search algorithm, and show search result
product_page.html shows details of product. It brings data frome firebase to show product detail.
request.html is adding new product to databse for requesting. new requested product can be searched by name or tag.
shopping_cart.html shows items added to shopping cart. This information is came from firebase.
shopping_done.html is address filling page. This page use google map api to get current location and fill address for user.

Every html file has own .css and .js file.
Every html uses bootstrap
