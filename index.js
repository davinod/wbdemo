var express = require("express");
var app     = express();

//const appurl  = 'web-jewerly-demo.ap-southeast-2.elasticbeanstalk.com';
const logfolder = '/var/log/nodejs';
//const appurl  = 'http://localhost:3000'
//const logfolder = '.';

const countryCode = function(){
  countries = ['AUS','NZ','BRA','US','CAN','FRA','ITA','ARG','CRO','NIG','HOL'];
  return countries[Math.floor(Math.random() * 11) ]
};

const logUsage = function (page) {
  //this is just a mock to obtain country code and timespent
  timeSpent = Math.floor(Math.random() * 30) + 1 ;
  timestamp = new Date().toISOString();
  country = countryCode();

  message = "{'timestamp':'" + timestamp + "','countryCode':'" + country + "', 'page':'" + page + "','timeSpent':" + timeSpent + "}" ;
  messageCSV = timestamp + "," + country + "," + page + "," + timeSpent;

  var fs = require('fs');
  fs.appendFile(logfolder + '/app_usage.log', message + '\n', function (err) {
    if (err) console.log(err);
    console.log('Saved!');
  });

  fs.appendFile(logfolder + '/app_usage.csv', messageCSV + '\n', function (err) {
    if (err) console.log(err);
    console.log('Saved!');
  });
};

var datetime = new Date();

const twitterBootstrap = '<!-- Latest compiled and minified CSS --> \
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"> \
      <!-- Optional theme --> \
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css"> \
      <!-- Latest compiled and minified JavaScript --> \
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>';

var startbody = '<html><header><title>Jewerly Products</title>' + twitterBootstrap + '</header><body><h1>Jewerly Products</h1><div class="container">';
var endbody   = '</body></html>'


var products = [];

products.push({name: 'QIANSE', price: 1999.00, description: 'Heart-shaped pendant wrapped in a bowtie', page: 'QIANSE', image: 'https://s3-ap-southeast-2.amazonaws.com/aws-davidiog-s3-general/temp/QIANSE.png', stock: 10, rating:4.9 })
products.push({name: 'sedmart', price: 2499.00, description: 'Sedmart Tree of life pendant Amethyst Rose Crystal Necklace Gemstone Chakra Jewelry Mothers Day Gifts', page: 'sedmart', image: 'https://s3-ap-southeast-2.amazonaws.com/aws-davidiog-s3-general/temp/sedmart.png', stock:3, rating:4.8})
products.push({name: 'ALEX and ANI', price: 899.00, description: 'Alex and Ani Wrap Birth Month Adjustable Ring', page: 'ALEXandANI', image: 'https://s3-ap-southeast-2.amazonaws.com/aws-davidiog-s3-general/temp/ALEXandANI.png', stock:2, rating:5})

app.get("/QIANSE", function(req, res) {

  res.setHeader('content-type', 'text/html');

  logUsage("QIANSE");

  var response = startbody;
  var product = '';

  product = '<div id="' + products[0].name + '"><br><br>';
  product += '<img src="' + products[0].image + '" width="200" height="200" border="0"><br>';
  product += '<h2>' + products[0].name + '</h2><br>';
  product += '<h3> Price : $' + products[0].price + '</h3><br>';
  product += '<h3> Rating: ' + products[0].rating + ' stars</h3><br>';
  product += '<h3> Stock : ' + products[0].stock + ' remaining</h3><br><br></div>';

  response += product;
  response += endbody;

  res.send(response);

});

app.get("/sedmart", function(req, res) {

  res.setHeader('content-type', 'text/html');

  logUsage("sedmart");

  var response = startbody;
  var product = '';

  product = '<div id="' + products[1].name + '"><br><br>';
  product += '<img src="' + products[1].image + '" width="200" height="200" border="0"><br>';
  product += '<h2>' + products[1].name + '</h2><br>';
  product += '<h3> Price : $' + products[1].price + '</h3><br>';
  product += '<h3> Rating: ' + products[1].rating + ' stars</h3><br>';
  product += '<h3> Stock : ' + products[1].stock + ' remaining</h3><br><br></div>';

  response += product;
  response += endbody;

  res.send(response);

});

app.get("/ALEXandANI", function(req, res) {

  res.setHeader('content-type', 'text/html');

  //Calculate time spent and country code into a log for real time analysis
  logUsage('ALEXandANI') ;

  var response = startbody;
  var product = '';

  product = '<div id="' + products[2].name + '"><br><br>';
  product += '<img src="' + products[2].image + '" width="200" height="200" border="0"><br>';
  product += '<h2>' + products[2].name + '</h2><br>';
  product += '<h3> Price : $' + products[2].price + '</h3><br>';
  product += '<h3> Rating: ' + products[2].rating + ' stars</h3><br>';
  product += '<h3> Stock : ' + products[2].stock + ' remaining</h3><br><br></div>';

  response += product;
  response += endbody;

  res.send(response);

});

app.get("/",function(req,res){

  res.setHeader('content-type', 'text/html');

  //Calculate time spent and country code into a log for real time analysis
  logUsage('index') ;

  var response = startbody;
  var product = '';

  response += '<table id="products"><tr>';

  for (var i in products) {

    product = '<td id="' + products[i].name + '"><br><br>';
    product += '<a href="/' + products[i].page + '"><h3>' + products[i].name + '</h3></a><br>';
    product += '<a href="/' + products[i].page + '"><img src="' + products[i].image + '" width="150" height="150" border="0"></a><br></td>';
    //product += '<h4> $ ' + products[i].price + '</h4></div>';

    response += product;

    //console.log(product);
  }

  response += '</tr></table>';

  response += endbody;

  //console.log(response);
  res.send(response);

});

app.listen(process.env.PORT || 3000, function (){
  console.log("Node app is running...");
});
