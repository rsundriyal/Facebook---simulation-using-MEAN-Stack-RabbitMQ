/**
 * New node file
 */
var mysql = require('mysql');
//var db = require('./routes/db');
var pool  = require('./cpooling');
var passwordHash = require('password-hash');
var bcrypt = require('bcryptjs');



function connect()
{
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'T@rget2015',
		port: '3306',
		database: 'lab'
	});

	connection.connect();

	return connection;
}



///////////////////////////////////////////////////////////////

exports.newuser=function(email,firstname,lastname,logintime,gender,password){
	//var connection=pool.getConnection();
	var connection=connect();

	//var salt = bcrypt.genSaltSync(10);
	//var hash = bcrypt.hashSync(password, salt);
	var query="INSERT into user(email,firstname,lastname,logintime,gender,password) VALUES('"+email+"','"+firstname+"','"+lastname+"','"+logintime+"','"+gender+"','"+password+"')";
	//friend
	var query1="CREATE TABLE "+email+"(name varchar(50) NOT NULL)";
	var query2="CREATE TABLE "+email+"about(name varchar(50) NOT NULL,city varchar(50), currently varchar(50), dob varchar(50))";
	var query3="CREATE TABLE "+email+"interest(interests varchar(500) NOT NULL)";
	var query4="CREATE TABLE "+email+"group(groupname varchar(50) NOT NULL)";
	var query5="CREATE TABLE "+email+"friends(email varchar(50) NOT NULL, name varchar(50) NOT NULL)";
	var query6="CREATE TABLE "+email+"friendrequest(email varchar(50) NOT NULL, name varchar(50) NOT NULL)";
	console.log(query);
	connection.query(query,function(err,results){
		if(err)
			{
			console.log("ERROR:"+err.message);
			
			}
	//	console.log(results[0].logintime);
	});
	connection.query(query1,function(err,results){
		if(err)
			{
			console.log("ERROR:"+err.message);
			
			}
	//	console.log(results[0].logintime);
	});
	connection.query(query4,function(err,results){
		if(err)
			{
			console.log("ERROR:"+err.message);
			
			}
	//	console.log(results[0].logintime);
	});
	connection.query(query3,function(err,results){
		if(err)
			{
			console.log("ERROR:"+err.message);
			
			}
	//	console.log(results[0].logintime);
	});
	connection.query(query2,function(err,results){
		if(err)
			{
			console.log("ERROR:"+err.message);
			
			}
	//	console.log(results[0].logintime);
	});
	connection.query(query5,function(err,results){
		if(err)
			{
			console.log("ERROR:"+err.message);
			
			}
	//	console.log(results[0].logintime);
	});
	connection.query(query6,function(err,results){
		if(err)
			{
			console.log("ERROR:"+err.message);
			
			}
	//	console.log(results[0].logintime);
	});

}

exports.validate= function(callback,email,password)
{
//	var connection=pool.getConnection();
	var connection=connect();
	
	var query = "SELECT * from user where email=" + mysql.escape(email) + " AND password="+mysql.escape(password)+"";
	console.log(query);
	connection.query(query,function(err,result){
		if(err)
			{
			console.log("ERROR:"+err.message);
			callback("invalid username or password",result);
			}
		else
			{
			if(result.length!==0)
			
			{
				console.log("DATA : "+JSON.stringify(result));
				
			//	var hash = bcrypt.hashSync("sacjap", 8);
				//var hash=JSON.stringify(result[0].password);
			//	console.log(hash);
				//console.log(bcrypt.compareSync(password,hash ));
				//if(bcrypt.compareSync(password, JSON.stringify(result[0].password)))
				//	{
				callback(err, result);
					}
				
			else
			{
				callback("Invalid Username", result);
			}
			}
		pool.returnConnection(connection);
	});
	}


exports.creategroup= function(callback,name,email,firstname)
{
	var connection=pool.getConnection();
	//var connection=connect();
	console.log(email);
	console.log(firstname);
	var query="CREATE TABLE "+name+"(membername varchar(50) NOT NULL,email varchar(50) NOT NULL)";
	//var query2="CREATE TABLE "+email+"group(groupname varchar(50) NOT NULL)";
	var query3="INSERT INTO "+email+"group(groupname) VALUES('"+name+"')";
	var query1="INSERT INTO "+name+"(membername,email) VALUES('"+firstname+"','"+email+"')";
	console.log(query);
	connection.query(query,function(err,result){
		if(err)
			{
			console.log("ERROR1:"+err.message);
			callback(err, result);
			}
		else
			{
			if(result.length!==0)
			
			{
				console.log("DATA : "+JSON.stringify(result));
				connection.query(query1,function(err,results){
					if(err)
						{
						console.log("ERROR:"+err.message);
					
						
						}
				/*	connection.query(query2,function(err,results){
						if(err)
							{
							console.log("ERROR:"+err.message);
							
							}
					//	console.log(results[0].logintime);
					});*/
					connection.query(query3,function(err,results){
						if(err)
							{
							console.log("ERROR:"+err.message);
							
							}
					//	console.log(results[0].logintime);
					});
				//	console.log(results[0].logintime);
				});
				callback(err, result);
			}
			else
			{
				callback("Invalid Username", result);
			}
			}
		pool.returnConnection(connection);
	});
	
	
}	
	exports.deletegroup= function(callback,name)
	{
		var connection=pool.getConnection();
		//var connection=connect();
		var query1="SELECT * FROM "+name+"";
		var query="DROP TABLE "+name+"";
		console.log(query1);
		connection.query(query1,function(err,result){
			if(err)
				{
				console.log("ERROR:"+err.message);
				}
			else
				{console.log(result);
				 for (var i in result) {
					 
					var query2= "DELETE FROM "+result[i].email+"group WHERE groupname='"+name+"'";
					console.log(query2);
					connection.query(query2 ,function(err,result){
						 
					 }); 
				    }
				 console.log(query);
				 connection.query(query,function(err,result){
						if(err)
							{
							console.log("ERROR:"+err.message);
							}
						else
							{
							if(result.length!==0)
							
							{
								console.log("DATA : "+JSON.stringify(result));
								callback(err, result);
								}
							else
							{
								callback("Invalid Group Name", result);
							}
							}
						
						callback(err, result);
					});
	}
			pool.returnConnection(connection);
		});
		
		

	}
	
	exports.news= function(callback)
	{
		var connection=pool.getConnection();
	//	var connection=connect();
			var query = "SELECT * from news";
			console.log(query);
			connection.query(query,function(err,result){
				if(err)
					{
					console.log("ERROR:"+err.message);
					}
				else
				{
				if(result.length!==0)
				
				{
					console.log(JSON.stringify(result));
					callback(err,result);
				}
				}

		});
			pool.returnConnection(connection);
	}
	
	exports.viewgroup= function(callback,name)
	{
		
		var connection=pool.getConnection();
		var query="SELECT * FROM "+name+"group";
		console.log(query);
		connection.query(query,function(err,result){
			if(err)
				{
				console.log("ERROR:"+err.message);
				
				}
			else
				{
				if(result.length!==0)
				
				{
					console.log(JSON.stringify(result));
					callback(err, result);
				}
				else
				{
					callback("No Groups", result);
				}
				}
	
		});
		pool.returnConnection(connection);
	}

	exports.selectgroup= function(callback,name)
	{
		var connection=pool.getConnection();
	//	var connection=connect();
		console.log(name);
		var query="SELECT membername FROM "+name+"";
		console.log(query);
		connection.query(query,function(err,result){
			if(err)
				{
				console.log("ERROR:"+err.message);
				
				}
			else
				{
				if(result.length!==0)
				
				{
					console.log(JSON.stringify(result));
					callback(err, result);
				}
				else
				{
					callback("No Groups", result);
				}
				}
			
		});
		
		pool.returnConnection(connection);
	}
	
	
	//add member to group
	exports.addmember= function(callback,name,gname)
	{
		var connection=pool.getConnection();
	//	var connection=connect();
		console.log(name);
		var query="SELECT * FROM user WHERE(email='"+name+"')";
		
		console.log(query);
		connection.query(query,function(err,result){
			if(err)
				{
				console.log("ERROR:"+err.message);
				callback(err,result);
				}
			else
				{
				if(result.length!==0)
				
				{
					console.log(JSON.stringify(result));
					var user=result[0].firstname;
					var query1="INSERT INTO "+gname+"(email,membername) VALUES('"+name+"','"+user+"')";
					connection.query(query1,function(err,results){
						if(err)
							{
							console.log("ERROR:"+err.message);
							
							}
					//	console.log(results[0].logintime);
					});
					var query3="INSERT INTO "+name+"group(groupname) VALUES('"+gname+"')";
					connection.query(query3,function(err,results){
						if(err)
							{
							console.log("ERROR:"+err.message);
							
							}
					//	console.log(results[0].logintime);
					});
					callback(err, result);
				}
				else
				{
					callback("No Groups", result);
				}
				}
			
		});
		
		pool.returnConnection(connection);
	}
//remove member
	
	exports.removemember= function(callback,name,gname)
	{
		var connection=pool.getConnection();
		
		console.log(name);
		var query="SELECT * FROM "+gname+" WHERE(email ='"+name+"')";
		
		console.log(query);
		connection.query(query,function(err,result){
			if(err)
				{
				console.log("ERROR:"+err.message);
				callback(err,result);
				}
			else
				{
				if(result.length!==0)
				
				{
					console.log(JSON.stringify(result));
					var user=result[0].firstname;
					
					var query1="DELETE FROM "+gname+" WHERE (email='"+name+"')";
					console.log(query1);
					connection.query(query1,function(err,results){
						if(err)
							{
							console.log("ERROR:"+err.message);
							
							}
					//	console.log(results[0].logintime);
					});
					callback(err, result);
				}
				else
				{
					callback("No Groups", result);
				}
				}
			
		});
		pool.returnConnection(connection);
	}
	
	//ABOUT
	exports.editabout= function(callback,uname,city,current,dob,name)
	{
		var connection=pool.getConnection();
//		var connection=connect();
		console.log(name);
		var query="DELETE FROM "+name+"about";
		var query1= "INSERT INTO "+name+"about(name,city,currently,dob) VALUES('"+uname+"','"+city+"','"+current+"','"+dob+"')";
		console.log(query);
		console.log(query1);
		
		connection.query(query,function(err,result){
			if(err)
				{
				console.log("ERROR:"+err.message);
				}
			else
				{
				if(result.length!==0)
				
				{
					console.log("DATA : "+JSON.stringify(result));
					callback(err, result);
				}
				else
				{
					callback("Invalid Group Name", result);
				}
				}
			
		});
		connection.query(query1,function(err,result){
			if(err)
				{
				console.log("ERROR:"+err.message);
				}
			else
				{
				if(result.length!==0)
				
				{
					console.log("DATA : "+JSON.stringify(result));
					callback(err, result);
				}
				else
				{
					callback("Invalid Group Name", result);
				}
				}
			
		});		
		pool.returnConnection(connection);
	}
	
	exports.about= function(callback,name)
	{
		var connection=pool.getConnection();
			var query = "SELECT * from "+name+"about";
			console.log(query);
			connection.query(query,function(err,results){
				if(err)
					{
					console.log("ERROR:"+err.message);
					}
				else
				{
				if(results.length!==0)
				
				{
					console.log(JSON.stringify(results));
					callback(err,results);
				}
				}

		});
			pool.returnConnection(connection);
	}
	
	exports.interest= function(callback,name)
	{
		var connection=pool.getConnection();
			var query = "SELECT * from "+name+"interest";
			console.log(query);
			connection.query(query,function(err,results){
				if(err)
					{
					console.log("ERROR:"+err.message);
					}
				else
				{
			
					console.log(JSON.stringify(results));
					callback(err,results);
				
				}

		});
			pool.returnConnection(connection);
	}
	exports.addinterest= function(callback,info,name)
	{
		var connection=pool.getConnection();
	
		var query = "INSERT INTO "+name+"interest (interests) VALUES ('"+info+"')";
		connection.query(query,function(err,results){
			if(err)
				{
				console.log("ERROR:"+err.message);
				}
			else
			{
			if(results.length!==0)
			
			{
				console.log(JSON.stringify(results));
				callback(err,results);
			}
	}
		});
		pool.returnConnection(connection);
	}	
	
	exports.deleteinterest=function(callback,info,name)
	{
		var connection=pool.getConnection();
		var query="DELETE FROM "+name+"interest WHERE (interests='"+info+"')";
		connection.query(query,function(err,results){
			if(err)
				{
				console.log("ERROR:"+err.message);
				}
			else
			{
			if(results.length!==0)
			
			{
				console.log(JSON.stringify(results));
				callback(err,results);
			}
	}
		});
		pool.returnConnection(connection);
	}
	
	exports.addnews=function(callback,info,name)
	{
		var connection=pool.getConnection();
		var query="INSERT INTO news  (email,event) VALUES ('"+name+"','"+info+"')";
		connection.query(query,function(err,results){
			if(err)
				{
				console.log("ERROR:"+err.message);
				}
			else
			{
			if(results.length!==0)
			
			{
				console.log(JSON.stringify(results));
				callback(err,results);
			}
	}
		});
		pool.returnConnection(connection);
	}
	
	exports.friendlist=function(callback,name)
	{
		var connection=pool.getConnection();
		var query = "SELECT * from "+name+"friends";
		connection.query(query,function(err,results){
			if(err)
				{
				console.log("ERROR:"+err.message);
				}
			else
			{
			if(results.length!==0)
			
			{
				console.log(JSON.stringify(results));
				callback(err,results);
			}
	}
		});
		pool.returnConnection(connection);
	}
	
	exports.friendrequest=function(callback,name)
	{
		var connection=pool.getConnection();
		var query = "SELECT * from "+name+"friendrequest";
		connection.query(query,function(err,results){
			if(err)
				{
				console.log("ERROR:"+err.message);
				}
			else
			{
			if(results.length!==0)
			
			{
				console.log(JSON.stringify(results));
				callback(err,results);
			}
	}
		});
		pool.returnConnection(connection);
	}
	
	exports.addfriend= function(callback,email,uemail)
	{
		var connection=pool.getConnection();
//		var connection=connect();
		console.log(uemail);
		var query="SELECT * FROM user WHERE (email='"+uemail+"')";
	//	var query1= "INSERT INTO "+name+"about(name,city,currently,dob) VALUES('"+uname+"','"+city+"','"+current+"','"+dob+"')";
		console.log(query);
		//console.log(query1);
		
		connection.query(query,function(err,result){
			if(err)
				{
				console.log("ERROR:"+err.message);
				callback("No such user present",results);
				}
			else
				{
				if(result.length!==0)
				
				{
					console.log("DATA : "+JSON.stringify(result));
					var query1="INSERT INTO "+email+"friendrequest(email,name) VALUES ('"+uemail+"','"+result[0].firstname+"')";
					connection.query(query1,function(err,result){
						if(err)
							{
							console.log("ERROR:"+err.message);
							callback("No such user present",result);
							}
						else
							{
							if(result.length!==0)
							
							{
								
								console.log("DATA : "+JSON.stringify(result));
								callback(err, result);
							}
							else
							{
								callback("Invalid Group Name", result);
							}
							}
						
					});	
				}
				else
				{
					callback("Invalid Group Name", result);
				}
				}
			
		});
		
		pool.returnConnection(connection);
	}
	
	exports.friendrespond=function(callback,email,val,uemail,uname)
	{
		console.log(email);
		console.log(val);
		var connection=pool.getConnection();
		var query="SELECT * FROM user WHERE (email='"+email+"')";
		if(val=="yes")
			{
		connection.query(query,function(err,results){
			if(err)
				{
				console.log("ERROR:"+err.message);
				}
			else
			{
			if(results.length!==0)
			
			{
				var query1="INSERT INTO "+uemail+"friends(email,name) VALUES ('"+email+"','"+results[0].firstname+"')";
				connection.query(query1,function(err,results){
					if(err)
						{
						console.log("ERROR:"+err.message);
						}
					else
					{
					if(results.length!==0)
					
					{
						var query3="INSERT INTO "+email+"friends(email,name) VALUES ('"+uemail+"','"+uname+"')";
						
						connection.query(query3,function(err,results){
							if(err)
								{
								console.log("ERROR:"+err.message);
								}
							else
							{
							if(results.length!==0)
							
							{
								var query2="DELETE FROM "+uemail+"friendrequest WHERE (email='"+email+"')";
								connection.query(query2,function(err,results){
									if(err)
										{
										console.log("ERROR:"+err.message);
										}
									else
									{
									if(results.length!==0)
									
									{
										console.log(JSON.stringify(results));
										callback(err,results);
									}
							}
								});

							}
					}
						});
		
				}
					}
				});
				
			}
	}
		});}
		else{
			var query2="DELETE FROM "+uemail+"friendrequest WHERE (email='"+email+"')";
			connection.query(query2,function(err,results){
				if(err)
					{
					console.log("ERROR:"+err.message);
					}
				else
				{
				if(results.length!==0)
				
				{
					console.log(JSON.stringify(results));
					callback(err,results);
				}
		}
			});
			}
		pool.returnConnection(connection);
	}
	
	