//import the express module
var express = require('express');

//import body-parser
var bodyParser = require('body-parser');

//import validator & express-validator/check
var validator = require('validator');
const { check , validationResult } = require('express-validator/check')

//store the express in a variable 
var app = express();

// File System for loading the list of users
var fs = require('fs');


//configure body-parser for express
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// This is for hosting files
app.use(express.static('public'));

//allow express to access our html (index.html) file
app.get('/index.html', function(req, res) {
        res.sendFile(__dirname + "/" + "index.html");
    });


var  countries= ["Afghanistan","Åland Islands","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia (Plurinational State of)","Bonaire, Sint Eustatius and Saba","Bosnia and Herzegovina","Botswana","Bouvet Island","Brazil","British Indian Ocean Territory","United States Minor Outlying Islands","Virgin Islands (British)","Virgin Islands (U.S.)","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cabo Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands","Colombia","Comoros","Congo","Congo (Democratic Republic of the)","Cook Islands","Costa Rica","Croatia","Cuba","Curaçao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands (Malvinas)","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","French Southern Territories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Heard Island and McDonald Islands","Holy See","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Côte d'Ivoire","Iran (Islamic Republic of)","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Lao People's Democratic Republic","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macao","Macedonia (the former Yugoslav Republic of)","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia (Federated States of)","Moldova (Republic of)","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","Korea (Democratic People's Republic of)","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestine, State of","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Republic of Kosovo","Réunion","Romania","Russian Federation","Rwanda","Saint Barthélemy","Saint Helena, Ascension and Tristan da Cunha","Saint Kitts and Nevis","Saint Lucia","Saint Martin (French part)","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Sint Maarten (Dutch part)","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the South Sandwich Islands","Korea (Republic of)","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Svalbard and Jan Mayen","Swaziland","Sweden","Switzerland","Syrian Arab Republic","Taiwan","Tajikistan","Tanzania, United Republic of","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom of Great Britain and Northern Ireland","United States of America","Uruguay","Uzbekistan","Vanuatu","Venezuela (Bolivarian Republic of)","Viet Nam","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe"];

console.log(countries.includes('Afghanistan'));

//route the GET request to the specified path, "/user". 
//This sends the user information to the path  
app.post('/user', 

 check('name')
.isAlpha()
.isLength({ min: 3 , max: 15 }).custom((value, { req, location, path } )=> { 
    var txt = fs.readFileSync('users.json', 'utf8');
    if(txt.includes(value)){
   return false; }
   else return true;
 }).withMessage("name already exists."), 
  
check('country').custom((value, { req, location, path } )=> { 
    if(countries.includes(value)){
   return true; }
   else return false;
 }).withMessage("country don't match."),
check('age').isInt({ min: 3 , max: 120 }).withMessage('This field failed validation.')
, (req, res) => {
    var errors = validationResult(req);
    const country = req.body.country;

    if (!errors.isEmpty()) {
        res.status(400).json(errors.array());
    } else {
        //res.sendStatus(200);
    
var name  = req.body.name;

var age   = req.body.age;
var Male=req.body.gender;
console.log(Male);
var isMale;
if(Male=='Male')
isMale=true;
else isMale=false;
   
      
      
        user = {
            name : name,
            country :country,
            age:age,
            isMale: isMale,
           
 };  
 var json = JSON.stringify(user, null, 2);
  fs.appendFile('users.json', json, 'utf8', finished);
  function finished(err) {
    console.log('Finished writing users.json');
    // Don't send anything back until everything is done
 var txt = fs.readFileSync('users.json', 'utf8');
      res.send(txt);

}
   
  }
});

   
 

//This piece of code creates the server  
//and listens to the request at port 8080
//we are also generating a message once the 
//server is created
var server = app.listen(8083, function(){
        var host = server.address().address;
        var port = server.address().port;
        console.log("Example app listening at http://%s:%s", host, port);
    });