var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = new express();
const AppPort = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-type, Accept");
  next();
});


var pool = mysql.createConnection({
	host:'localhost',
	user:'root',
	password: 'root',
	database: 'custom',
	port:'3306'
});

pool.connect(function(err){
  if(err){
    console.log('Database connection error');
  }else{
    console.log('Database connection successful');
  }
});
app.delete('/api/removeFavouriteGift/:id',function(req,resp)
{
	  var id = req.params.id;
	  console.log("Start deleting Id:"+id);
	  var stringQuery = "DELETE FROM giftfavourite WHERE id="+id;
	  console.log("Started query:" + stringQuery);
	  pool.query( stringQuery,  function(err, rows){
		if(err)	{
			console.log(err);
			return resp.status(400).send(err);
		}else{
			console.log("Success");
			return resp.status(201).send({message:'suscess'});
		}
	  });
});
app.get('/api/favouritesGifts',function(req,resp)
{
	  console.log("all favourites");
	  pool.query( 'select * from giftfavourite',  function(err, rows){
		if(err)	{
			console.log(err);
			return resp.status(400).send(err);
		}else{
			console.log("Success");
			return resp.status(201).send(rows);
		}
	  });
});
app.post('/api/addFavourite',function(req,resp)
{	
	  var gift_Id = req.body.gift_Id;
	  var gift_Url = req.body.gift_Url;
	  var gift_Preview_Url = req.body.gift_Preview_Url;
	  var gift_Preview_Width = req.body.gift_Preview_Width;
	  var gift_Preview_Height = req.body.gift_Preview_Height;
	  var gift_Preview_Size = req.body.gift_Preview_Size;
	  var queryString = "INSERT INTO giftfavourite (Id,GiftId,PreviewUrl,Url,IsFavourite,WidthPreview,HeightPreview,SizePreview) VALUES (" + null+ ", '" +gift_Id+ "', '" +gift_Preview_Url+ "', '" + gift_Url+ "', " +true+ ", '" +gift_Preview_Width+ "', '" +gift_Preview_Height+ "', '" +gift_Preview_Size+ "')";
	  console.log("Started query:" + queryString);
	  pool.query(queryString,function(err, rows)
	 {
		if(err)	{
			console.log(err);
			return resp.status(400).send(err);
		}else{
			console.log("Success");
			return resp.status(201).send({message:'data inserted'});
		}
	  });
});

app.listen(AppPort,() => console.log('Portas:' + AppPort));