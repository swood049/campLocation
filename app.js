var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require('mongoose');
    
mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', "ejs");


//SCHEMA SETUP
var campgroundSchema = mongoose.Schema({
    name:String, 
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create(
    {
            name: "Yellow Creek", 
            image:"https://images.pexels.com/photos/260593/pexels-photo-260593.jpeg?auto=compress&cs=tinysrgb&h=350",
            description: "Lush with yellow gew everywhere! This site is perfect for those who wish to rejuvinate their skin."
        },
    function(err, campground){
        
        if(err){
            console.log("there was an err! ");
            console.log(err);
        }else{
            console.log('New campground has been added: ');
            console.log(campground);
        }
    }
    
)*/

//  var campygrounds = [
//         {name: "Salmon Creek", image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350"},
//         {name: "Yellow Creek", image:"https://images.pexels.com/photos/260593/pexels-photo-260593.jpeg?auto=compress&cs=tinysrgb&h=350"},
//         {name: "Blue Creek", image:"https://images.pexels.com/photos/6757/feet-morning-adventure-camping.jpg?auto=compress&cs=tinysrgb&h=350"} 
//     ]



app.get('/', function(req, res){
    
    
    res.render("landingPage");
});

//Inxed - Show all campgrounds
app.get('/camp-grounds', function(req, res){
   //Get all campgrounds from DB 
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log("There was an err");
            console.log(err);
        }else{
            res.render('index',{campygrounds:campgrounds});
        }
    });
    
});
//Create - add new campground to DB
app.post('/camp-grounds', function(req, res){
    //grab data from form and add to array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampGround = {name: name, image: image, description: desc};
    
    //create a new campground and save to database
    Campground.create(newCampGround, function(err, campground){
        if(err){
            console.log('Oh, No! ');
            console.log(err);
        }else{
            console.log('new campground created!');
            //redirect to campgrounds
            res.redirect("/camp-grounds");
        }
    });
    
});
//New - show form to create new campground
app.get('/camp-grounds/new', function(req, res){
    res.render("new.ejs");
});

//Show - show more information of the items that were indexed
app.get('/camp-grounds/:id', function(req, res) {
    
   //find campground with that id
   Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log('an error occurred');
           console.log(err);
       }else{
           //render the show template with that campground
           res.render('show', {campground: foundCampground});
       }
   });
   
   
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Welcome!");
});