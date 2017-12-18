(function (angular){
var app = angular.module("app",['ngStorage']);

app.controller("loginCtrl", ['$scope', '$http', '$localStorage', '$window',
function loginCtrl($scope, $http, $localStorage, $window){
	$scope.logged = false;
	$scope.regular = false;
	$scope.expand = false;
	$scope.addingNewSub = false;
	$scope.admin = false;
	$scope.following = false;
	$scope.showProf = false;
	$scope.settings = false;
	$scope.user = $localStorage.currentUser;
	$scope.onHome=false;
	$scope.adminOrMod = false;
	if($scope.user === undefined){	
		console.log("undefined")
		$scope.logged = false;
		$scope.regular = true;
		
	}else{
		$scope.logged=true;
	
		if($scope.user.type === "regular"){
			$scope.regular = true;
			
		}else if($scope.user.type === "admin"){
			$scope.admin = true;
			$scope.adminOrMod = true;
		
		}else{
		$scope.moderator = true;
		$scope.adminOrMod = true;
	}
		
	}

	
	$scope.login = function(username, pass){
		var user=
			{
			    "pass": pass,
			    "username": username
			    
			};
		$http({
			  method: 'POST',
			  url: 'http://localhost/aaa/service',
			  data: user
			}).then(function successCallback(response) {
				 var currentUser = response.data;
				
				 	if(currentUser){
				 		$localStorage.currentUser = currentUser;
				 		$scope.user = $localStorage.currentUser;
				 		$scope.followedSubs = $scope.user.following;
				 		
				 	}
				 	 window.location.replace('/aaa/start/index.html');
				 	
				 	for(var i = 0; i < $scope.subForumi.length; i++){
						$scope.isFollowed($scope.subForumi[i].name);
					}
				 
					//alert($scope.followedSubs.length);
			}, function errorCallback(response) {
            	alert("jebiga");
            });
	/*	if($scope.user!=undefined){
		if($scope.user.following === null || $scope.user.following === undefined){
			$scope.following = false;
			alert("jede govn");
		}
		else {
			$scope.following = true;
			
			$scope.followedSubs = [];
			
			alert("user prati: " + $scope.user.following.length + " foruma ima: " + $scope.subForumi.length );
			if($scope.user.following.length>0){
				for(var i = 0; i < $scope.user.following; i++){
					for(var j = 0; j < $scope.subForumi.length; j++){
						alert($scope.subForumi.length );
						if($scope.user.following === $scope.subForumi[j].name){
							$scope.followedSubs.push($scope.subForumi[j]);
						}
					}
						
				}

			}
		}
		}*/
		
	}

	var getallusers = function(){
		$http({
			  method: 'GET',
			  url: 'http://localhost/aaa/allusers'
				 
			}).then(function successCallback(response) {
				$scope.allUsers = response.data;
			  }, function errorCallback(response) {
				  console.log("Greska kod GET allusers");
			  });
		
	}
	getallusers();
	
	$scope.logout = function() {
        // uklonimo korisnika iz lokalnog skladišta
    	var temp = $localStorage.currentUser;
    	alert("logoooouuuut");
        delete $localStorage.currentUser;
        window.location.replace('/aaa/start/index.html');
	
  
    }
	$scope.registrationCalled = function() {
		window.location.replace('/aaa/start/register.html');
	}
	$scope.loginCalled = function() {
		window.location.replace('/aaa/start/login.html');
	}
	$scope.register = function(username,pass,fname,lname,phone,email){
		var user=
		  {
				"email": email,
			    "firstname": fname,
			    "lastname": lname,
			    "pass": pass,
			    "phone": phone,
			    "username": username,
			    "type": "regular",
			    "likes": 0,
			    "dislikes": 0
		  };
		$http({
			  method: 'POST',
			  url: 'http://localhost/aaa/register',
			  data: user
			}).then(function successCallback(response) {
				 var currentUser = response.data.user;
				
				 $localStorage.currentUser = currentUser;
				 if(currentUser != null){
					 window.location.replace('/aaa/start/index.html');
					 $scope.user = $localStorage.currentUser;
				 	}
				 else{
					 alert("Username is already taken.");
					 $localStorage.currentUser = undefined;
					 window.location.reload();
				 }
			}, function errorCallback(response) {
            	alert("jebiga");
            });
	}
	$scope.back = function(){
		 window.location.replace('/aaa/start/index.html');
	}
	
	$scope.newSub = function(){
		$scope.deletetop = false;
		$scope.addingNewSub = true;
		$scope.editingTop = false;
		$scope.addingtopic = false;
		$scope.editingSub = false;
		$scope.deletesf = false;
		$scope.editmod = false;
		$scope.showProf = false;
		$scope.changingForum = false;
		$scope.newComment = false;
		$scope.settings = false;
		$scope.editComment = false;
		$scope.showSearch = false;
		var x = document.getElementById('td2');
		var xx = document.getElementById('th2');
		var y = document.getElementById('th1');
	    if (x.style.display === 'none') {
	        x.style.display = 'block';
	        xx.style.width = "30%";
	        y.style.width = "70%";
	    } 
	    
		var a = document.getElementById('newSubF');
		if($scope.addingNewSub){
			if (a.style.display === 'none') {
				a.style.display = 'block';
	       
	    	} 
		}
		
	}
	$scope.cancelNewSF = function(){
		$scope.addingNewSub = false;
		var x = document.getElementById('td2');
		var xx = document.getElementById('th2');
		var y = document.getElementById('th1');
		x.style.display = 'none';
	    y.style.width = '100%';
	    xx.style.width = "0%";
	}
	var getSubForumi = function() {
		// console.log("Trazi subove");
			$http({
				  method: 'GET',
				  url: 'http://localhost/aaa/subs'
					 
				}).then(function successCallback(response) {
					$scope.subForumi = response.data;
					getAllTopics();
			 		getSavedTopics();
			 		getRecommended();
			 		
					$scope.followedSubs = [];
					if($scope.user!=undefined){
						if($scope.user.following === null || $scope.user.following === undefined){
							$scope.following = false;
					
						}
						else {
							$scope.following = true;
							//alert("user prati: " + $scope.user.following.length + " foruma ima: " + $scope.subForumi.length );
							if($scope.user.following.length>0){
								for(var i = 0; i < $scope.user.following.length; i++){
									for(var j = 0; j < $scope.subForumi.length; j++){
									
										if($scope.user.following[i] === $scope.subForumi[j].name){
											$scope.followedSubs.push($scope.subForumi[j]);
										}
									}
										
								}

							}
							$scope.temp = $scope.followedSubs;
						}
						alert("user prati: " + $scope.followedSubs.length);
					}else{
						$scope.followedSubs = $scope.subForumi;
					}
					
				  }, function errorCallback(response) {
					  console.log("Greska kod GET subForums");
				  });
			
		}
	getSubForumi();
	
	
		
	$scope.goToSubForum = function(sub){
		
		for (var i = 0; i < $scope.subForumi.length; i++) {

		    if ($scope.subForumi[i].name === sub.name) {
		    	$scope.subF =  $scope.subForumi[i];
		    	
		    	break;
		    }
		  }		
		
		var sfname = $scope.subF.name.replace(" ","_");
		
		$window.location.href = 'http://localhost/aaa/start/subForum.html?subForum=' + sfname;
		getTopics();
		alert($scope.topics.length);
	}
	
	$scope.expandTopics = function(){
		if($scope.expand)
			$scope.expand=false;
		else
			$scope.expand=true;
	}
	
	
	$scope.subOptions = function(name){
	
		
		var x = document.getElementById(name);
	    if (x.style.display === 'none') {
	        x.style.display = 'block';
	    } else {
	        x.style.display = 'none';
	    }
	
	}
	var getTopics = function(){
	
				$scope.topics=$scope.subF.topics;
	}
	
	$scope.newSubForum = function(sfname,sfdesc,sfrules){
		var selected = [];
		var optionsToSelect = $scope.allUsers;
		var select = document.getElementById( 'selectMods' );
		var map = {};
		for ( var i = 0, l = $scope.allUsers.length, o; i < l; i++ )
		{
		  o = select.options[i];
	
		  for(var j = 0; j < $scope.allUsers.length; j++){
			  
			  if ( $scope.allUsers[j].username === o.text && o.selected)
			  	{
				  selected.push(o.text);
				  if($scope.allUsers[j].type==="regular"){
					  $scope.allUsers[j].type = "moderator";
					  map[$scope.allUsers[j].username] = "moderator";
					  }
			  	}
		  }
		  
		  $http({
				method:'POST',
				url: "http://localhost/aaa/changeutype",
				data: map
				}).then(function successCallback(response){
					console.log("uspesan update tipova");

				}, function errorCallback(response){
					console.log("Nesto je lose kod update tipova");
					
				});
		}
		
		var rulesarray = sfrules.split(',');
		
		var newSub =
		  {
				"description": sfdesc,
			    "name": sfname,
			    "rules": rulesarray,
			    "moderators": selected,
			    "mainModerator": $scope.user.username
			    
		  };
		$http({
			  method: 'POST',
			  url: 'http://localhost/aaa/newsub',
			  data: newSub,
			  headers: {
				   'Content-Type': "application/json"
				 }
			}).then(function successCallback(response) {
					 window.location.reload();
			}, function errorCallback(response) {
          	alert("jebiga");
          });
		
	}
	$scope.editingSub = false;
	$scope.editSub = function(sub){
		$scope.subForEdit = sub;
		$scope.deletetop = false;
		$scope.editingSub = true;
		$scope.addingNewSub = false;
		$scope.addingtopic = false;
		$scope.deletesf = false;
		$scope.editmod = false;
		$scope.showProf = false;
		$scope.changingForum = false;
		$scope.newComment = false;
		$scope.settings = false;
		$scope.editComment = false;
		$scope.showSearch = false;
		var x = document.getElementById('td2');
		var xx = document.getElementById('th2');
		var y = document.getElementById('th1');
	    if (x.style.display === 'none') {
	        x.style.display = 'block';
	        xx.style.width = "30%";
	        y.style.width = "70%";
	    } 
	}	
	
	$scope.editSubForum = function(sfeditdesc,sfeditrules){
		
		var selected = [];
		var optionsToSelect = $scope.allUsers;
	/*	var select = document.getElementById( 'selectModsEdit' );

		for ( var i = 0, l = $scope.allUsers.length, o; i < l; i++ )
		{
		  o = select.options[i];
	
		  for(var j = 0; j < $scope.allUsers.length; j++){
			  
			  if ( $scope.allUsers[j].username === o.text && o.selected)
			  	{
				  selected.push(o.text);
			  	}
		  }
		
		}*/
		var rulesarray = [];
		if(sfeditrules != undefined)
			rulesarray = sfeditrules.split(',');
		alert(rulesarray);
		if(sfeditdesc!="")
			$scope.subForEdit.description = sfeditdesc;
		if(rulesarray.length >= 1)
			$scope.subForEdit.rules = rulesarray;
	//	$scope.subForEdit.moderators = selected;
		
		$http({
			method:'POST',
			url: "http://localhost/aaa/editsub",
			data: $scope.subForEdit
			}).then(function successCallback(response){
				location.reload();
				$scope.subForEdit = undefined;
				$scope.editingSub = false;

			}, function errorCallback(response){
				console.log("Nesto je lose kod edita teme ");
				
			})
		
	}
	
	$scope.cancelEditSF = function(){
		var x = document.getElementById('td2');
		var xx = document.getElementById('th2');
		var y = document.getElementById('th1');
		x.style.display = 'none';
	    y.style.width = '100%';
	    xx.style.width = "0%";
	}
	
	
		$scope.addingtopic = false;
		
		$scope.newTopic = function(sub){
			
			$scope.subForEdit = sub;
			
			$scope.addingtopic = true;
			$scope.editingTop = false;
			$scope.addingNewSub = false;
			$scope.editingSub = false;
			$scope.deletesf = false;
			$scope.editmod = false;
			$scope.showProf = false;
			$scope.changingForum = false;
			$scope.newComment = false;
			$scope.settings = false;
			$scope.deletetop = false;
			$scope.editComment = false;
			$scope.showSearch = false;
			var x = document.getElementById('td2');
			var xx = document.getElementById('th2');
			var y = document.getElementById('th1');
		    if (x.style.display === 'none') {
		        x.style.display = 'block';
		        xx.style.width = "30%";
		        y.style.width = "70%";
		    } 



		    
		  
		}	
		
		window.inputType = function(){
		    if (document.getElementById("topImg").selected) {
	            document.getElementById("ifImage").style.display = "block";
	            document.getElementById("ifLinkOrText").style.display = "none";
	        } else {
	            document.getElementById("ifImage").style.display = "none";
	            document.getElementById("ifLinkOrText").style.display = "block";
	        }
		}
		$scope.cancelNewTopic = function(){
			$scope.addingtopic = false;
			var x = document.getElementById('td2');
			var xx = document.getElementById('th2');
			var y = document.getElementById('th1');
			x.style.display = 'none';
		    y.style.width = '100%';
		    xx.style.width = "0%";
		}
		
		$scope.addTopic = function(tname, tcontent){
			
			var unique = true;
			for(var i = 0; i < $scope.subForEdit.topics; i++){			
				if($scope.subForEdit.topics[i].name === tname){
						unique = false;
						alert("postoji tema!");
						break;
				}
			}
			if(unique){
				var sel = document.getElementById('topicTypes').value;
				if(sel==="text" || sel==="link"){
				var date="";
				var likes = [];
				var dislikes = [];
				var newtop = {
						"name": tname,
						"content": tcontent,
						"parentForum": $scope.subForEdit.name,
						"author": $localStorage.currentUser.username,
						"type": sel,
						"dateOfCreation": date,
						"likedBy": likes,
						"dislikedBy": dislikes
				}
				$http({
					method:'POST',
					url: "http://localhost/aaa/newtopic",
					data: newtop
					}).then(function successCallback(response){
						location.reload();
						$scope.subForEdit = undefined;
						$scope.addingtopic = false;
	
					}, function errorCallback(response){
						console.log("Nesto je lose kod edita teme ");
						
					})
				}else{
					//uploadFile();
					/*
					var date="";
					var likes = [];
					var dislikes = [];
					var newtop = {
							"name": tname,
							"content": output,
							"parentForum": $scope.subForEdit.name,
							"author": $localStorage.currentUser.username,
							"type": sel.value,
							"dateOfCreation": date,
							"likedBy": likes,
							"dislikedBy": dislikes
					}
					$http({
						method:'POST',
						url: "http://localhost/aaa/newtopic",
						data: newtop
						}).then(function successCallback(response){
							location.reload();
							$scope.subForEdit = undefined;
							$scope.addingtopic = false;
		
						}, function errorCallback(response){
							console.log("Nesto je lose kod edita teme ");
							
						})/*/
				}
			}
			
		}
		$scope.topFile = undefined;
		 var uploadFile = function(){
			 var f = document.getElementById('fileToUpload');
		        var file = f.value;
		        console.log('file is ' );
		        console.dir(file);
		        var uploadUrl = "http://localhost/aaa/file"
		        uploadFileToUrl(file, uploadUrl);
		    };
		    
		   var uploadFileToUrl = function(file, uploadUrl){
			   var fd = new FormData();
				for(var key in file)
					fd.append(key, file[key]);
				$http.post(uploadUrl, fd, {
					transformRequest: angular.indentity,
					headers: { 'Content-Type': undefined }
				}).then(function successCallback(response){
		        location.reload();
		        }, function errorCallback(response){
		        	alert("greska kod uploada fila")
		        });
		    }
		    
		$scope.subOptions2 = function(name){
			
			var x = document.getElementById(name + " topics");
		    if (x.style.display === 'none') {
		        x.style.display = 'block';
		    } else {
		        x.style.display = 'none';
		    }
		
		}
		
		$scope.deletesf = false;
		
		$scope.deleteSub = function(sub){
			$scope.subForEdit = sub;
			$scope.deletetop = false;
			$scope.deletesf = true;
			$scope.editingTop = false;
			$scope.addingNewSub = false;
			$scope.addingtopic = false;
			$scope.editingSub = false;
			$scope.editmod = false;
			$scope.showProf = false;
			$scope.changingForum = false;
			$scope.newComment = false;
			$scope.settings = false;
			$scope.editComment = false;
			$scope.showSearch = false;
			var x = document.getElementById('td2');
			var xx = document.getElementById('th2');
			var y = document.getElementById('th1');
		    if (x.style.display === 'none') {
		        x.style.display = 'block';
		        xx.style.width = "30%";
		        y.style.width = "70%";
		    } 
		}	
		
		
	$scope.deleteSF = function(){
		alert($scope.subForEdit.name);
		$http({
			method:'POST',
			url: "http://localhost/aaa/deletesub" ,
			data: $scope.subForEdit.name
		}).then(function successCallback(response){
				var idx = -1;
				idx = $scope.user.following.indexOf($scope.subForEdit.name);
				if(idx!=-1)
					$scope.user.following.splice(idx,1);
				$scope.subForEdit = undefined;
				$scope.deletesf = false;
				location.reload();
			}, function errorCallback(response){
				console.log("Nesto je lose kod brisanja teme ");
				
			});
			
			
	}	
	
	$scope.cancelDeleteSF = function(){
		$scope.deletesf = false;
		var x = document.getElementById('td2');
		var xx = document.getElementById('th2');
		var y = document.getElementById('th1');
		x.style.display = 'none';
	    y.style.width = '100%';
	    xx.style.width = "0%";
	}
	
	$scope.editmod = false;
	
	$scope.editMods = function(sub){
		$scope.subForEdit = sub;
		listUsers();
		$scope.editmod = true;
		$scope.editingTop = false;
		$scope.addingNewSub = false;
		$scope.addingtopic = false;
		$scope.editingSub = false;
		$scope.deletesf = false;
		$scope.showProf = false;
		$scope.changingForum = false;
		$scope.newComment = false;
		$scope.settings = false;
		$scope.deletetop = false;
		$scope.editComment = false;
		$scope.showSearch = false;
		var x = document.getElementById('td2');
		var xx = document.getElementById('th2');
		var y = document.getElementById('th1');
	    if (x.style.display === 'none') {
	        x.style.display = 'block';
	        xx.style.width = "30%";
	        y.style.width = "70%";
	    } 
	    
	}	
		
	var listUsers = function(){
		var main = $scope.subForEdit.mainModerator;
		
		$scope.optionsToSelect = $scope.allUsers;

		var index =-1;
		for(var i = 0; i < $scope.optionsToSelect.length; i++){

			if($scope.optionsToSelect[i].username === main)
				index = i;
		}

		if (index > -1) {
			$scope.optionsToSelect.splice(index, 1);

		}

	}
	
	$scope.cancelEditMods = function(){
		$scope.editmod = false;
		var x = document.getElementById('td2');
		var xx = document.getElementById('th2');
		var y = document.getElementById('th1');
		x.style.display = 'none';
	    y.style.width = '100%';
	    xx.style.width = "0%";
	}
	
	$scope.saveEditMods = function(){
		
			var selected = [];
			var optionsToSelect = $scope.allUsers;
			var select = document.getElementById( 'mods' );
			var map = {};
			for ( var i = 0, l = $scope.allUsers.length, o; i < l; i++ )
			{
			  o = select.options[i];
		
			  for(var j = 0; j < $scope.allUsers.length; j++){
				  
				  if ( $scope.allUsers[j].username === o.text && o.selected)
				  	{
					  selected.push(o.text);
					  if($scope.allUsers[j].type==="regular"){
						  $scope.allUsers[j].type = "moderator";
						  map[$scope.allUsers[j].username] = "moderator";
						  }
				  	}
			  }
			
			}
			 $http({
					method:'POST',
					url: "http://localhost/aaa/changeutype",
					data: map
					}).then(function successCallback(response){
						console.log("uspesan update tipova");

					}, function errorCallback(response){
						console.log("Nesto je lose kod update tipova");
						
					});
			
	
			$scope.subForEdit.moderators = selected;
	
			$http({
				method:'POST',
				url: "http://localhost/aaa/editsub",
				data: $scope.subForEdit
				}).then(function successCallback(response){
					location.reload();
					$scope.subForEdit = undefined;
					$scope.editingSub = false;

				}, function errorCallback(response){
					console.log("Nesto je lose kod edita teme ");
					
				})
		
		}
	
		$scope.followSF = function(sub){
			
			if($scope.user.following === null || $scope.user.following === undefined){
				alert("ne pprati nista jos");
				$scope.user.following = [];
				$scope.user.following.push(sub.name);
			}else if($scope.user.following.length===0){
				$scope.user.following.push(sub.name);				
			}else{
				var idx = -1;
				for(var i = 0; i < $scope.user.following.length; i++){
					
					if($scope.user.following[i] === sub.name){
						idx = i;
						break;
					}
				}
				if(idx != -1){
					$scope.user.following.splice(idx,1);
					alert("otpratio: "+ sub.name);
				}
					
				else{
					$scope.user.following.push(sub.name);
					alert("sada prati: "+ sub.name);
				}
					
			}
			
			
			$http({
				method:'POST',
				url: "http://localhost/aaa/followsub",
				data: $scope.user
				}).then(function successCallback(response){
					location.reload();
				}, function errorCallback(response){
					console.log("Nesto je lose kod followa teme ");
					
				})
		}
	
		$scope.topOptions = function(name){
			
			var x = document.getElementById(name);
		    if (x.style.display === 'none') {
		        x.style.display = 'block';
		    } else {
		        x.style.display = 'none';
		    }
		
		}
	
		$scope.subOptionsFollowing = function(name){
			
			var x = document.getElementById(name + " following");
		    if (x.style.display === 'none') {
		        x.style.display = 'block';
		    } else {
		        x.style.display = 'none';
		    }
		
		}
		$scope.subOptionsFollowing2 = function(name){
			
			var x = document.getElementById(name + " followingtopics");
		    if (x.style.display === 'none') {
		        x.style.display = 'block';
		    } else {
		        x.style.display = 'none';
		    }
		
		}
		
		$scope.addTopicFollowing = function(tname, tcontent){
			
			var unique = true;
			for(var i = 0; i < $scope.subForEdit.topics; i++){			
				if($scope.subForEdit.topics[i].name === tname){
						unique = false;
						alert("postoji tema!");
						break;
				}
			}
			if(unique){
			var sel = document.getElementById('topicTypesFollowing');
			var likes=[];
			var dislikes = [];
			var date="";
			var newtop = {
					"name": tname,
					"content": tcontent,
					"parentForum": $scope.subForEdit.name,
					"author": $localStorage.currentUser.name,
					"type": sel.value,
					"date": date,
					"likedBy": likes,
					"dislikedBy": dislikes
					
			};
			$http({
				method:'POST',
				url: "http://localhost/aaa/newtopic",
				data: newtop
				}).then(function successCallback(response){
					location.reload();
					$scope.subForEdit = undefined;
					$scope.addingtopic = false;

				}, function errorCallback(response){
					console.log("Nesto je lose kod edita teme ");
					
				})
			}
		}
		
		$scope.saveEditModsFollowing = function(){
			
			var selected = [];
			var optionsToSelect = $scope.allUsers;
			var select = document.getElementById( 'modsFollowing' );
			var map = {};
			for ( var i = 0, l = $scope.allUsers.length, o; i < l; i++ )
			{
			  o = select.options[i];
		
			  for(var j = 0; j < $scope.allUsers.length; j++){
				  
				  if ( $scope.allUsers[j].username === o.text && o.selected)
				  	{
					  selected.push(o.text);
					  if($scope.allUsers[j].type==="regular"){
						  $scope.allUsers[j].type = "moderator";
						  map[$scope.allUsers[j].username] = "moderator";
						  }
				  	}
			  }
			
			}
			  $http({
					method:'POST',
					url: "http://localhost/aaa/changeutype",
					data: map
					}).then(function successCallback(response){
						console.log("uspesan update tipova");

					}, function errorCallback(response){
						console.log("Nesto je lose kod update tipova");
						
					});
	
			$scope.subForEdit.moderators = selected;
	
			$http({
				method:'POST',
				url: "http://localhost/aaa/subforumedit",
				data: $scope.subForEdit
				}).then(function successCallback(response){
					location.reload();
					$scope.subForEdit = undefined;
					$scope.editingSub = false;

				}, function errorCallback(response){
					console.log("Nesto je lose kod edita teme ");
					
				})
		
		}
		
		$scope.showAll = function(){
			$scope.onHome=true;
			$scope.followedSubs = $scope.subForumi;
		}
		$scope.showFollowed = function(){
			$scope.onHome=false;
			$scope.followedSubs = $scope.temp;
		}
		
		$scope.profileShow = function(){

			$scope.showProf = true;
			$scope.editingTop = false;
			$scope.addingNewSub = false;
			$scope.addingtopic = false;
			$scope.editingSub = false;
			$scope.deletesf = false;
			$scope.editmod = false;
			$scope.changingForum = false;
			$scope.newComment = false;
			$scope.settings = false;
			$scope.deletetop = false;
			$scope.editComment = false;
			$scope.showSearch = false;
			$scope.settings = false;
			var x = document.getElementById('td2');
			var xx = document.getElementById('th2');
			var y = document.getElementById('th1');
		    if (x.style.display === 'none') {
		        x.style.display = 'block';
		        xx.style.width = "30%";
		        y.style.width = "70%";
		    } 


			
		}
		$scope.closeProfile = function(){
			$scope.showProf = false;

			var x = document.getElementById('td2');
			var xx = document.getElementById('th2');
			var y = document.getElementById('th1');
			x.style.display = 'none';
		    y.style.width = '100%';
		    xx.style.width = "0%";
		}
		
		$scope.saveTop = function(top){
			if($scope.user.savedTopics === null || $scope.user.savedTopics === undefined){
				alert("ne pprati nista jos");
				$scope.user.savedTopics = [];
				$scope.user.savedTopics.push(top.id);
			}else if($scope.user.savedTopics.length===0){
				$scope.user.savedTopics.push(top.id);				
			}else{
				var idx = -1;
				for(var i = 0; i < $scope.user.savedTopics.length; i++){
					
					if($scope.user.savedTopics[i] === top.id){
						idx = i;
						break;
					}
				}
				if(idx != -1){
					$scope.user.savedTopics.splice(idx,1);
					alert("ne cuva: "+ top.name);
				}
					
				else{
					$scope.user.savedTopics.push(top.id);
					alert("sacuvao: "+ top.name);
				}
					
			}
			
			
			$http({
				method:'POST',
				url: "http://localhost/aaa/savetop",
				data: $scope.user
				}).then(function successCallback(response){
					location.reload();
				}, function errorCallback(response){
					console.log("Nesto je lose kod save teme ");
					
				});
		}
		
		var getAllTopics = function(){
			$scope.allTopics=[];
			
			if($scope.user!=undefined){
					for(var i = 0; i < $scope.subForumi.length; i++){
						if($scope.subForumi[i].topics!=null || $scope.subForumi[i].topics!=undefined){
							if($scope.subForumi[i].topics.length>0){
								for(var j = 0; j < $scope.subForumi[i].topics.length; j++){
									$scope.allTopics.push($scope.subForumi[i].topics[j]);
								}
							}
						}
					}
				}
			
			alert("all toppics: " + $scope.allTopics.length);
		}
		
		var getSavedTopics = function(){
			$scope.savedTops = [];
			
			if($scope.user!=undefined){
				if($scope.user.savedTopics!=null && $scope.user.savedTopics!=undefined){
					if($scope.user.savedTopics.length>0 && $scope.allTopics.length>0){
						for(var i = 0; i < $scope.user.savedTopics.length; i++){
							for(var j = 0; j < $scope.allTopics.length; j++){
								if($scope.user.savedTopics[i] === $scope.allTopics[j].id){
									$scope.savedTops.push($scope.allTopics[j]);
								}
							}
						}
					}
				}
			}
			alert("sacuvanih tema: " + $scope.savedTops.length);
		}

		
		$scope.cancelEditTopic = function(){
			$scope.editingTop = false;
			var x = document.getElementById('td2');
			var xx = document.getElementById('th2');
			var y = document.getElementById('th1');
			x.style.display = 'none';
		    y.style.width = '100%';
		    xx.style.width = "0%";
		}
		$scope.editingTop = false;
		
		$scope.editTop = function(top){
			$scope.topicForEdit = top;
			$scope.newComment = false;
			$scope.settings = false;
			$scope.editingTop = true;
			$scope.addingNewSub = false;
			$scope.addingtopic = false;
			$scope.editingSub = false;
			$scope.deletesf = false;
			$scope.editmod = false;
			$scope.showProf = false;
			$scope.changingForum = false;
			$scope.deletetop = false;
			$scope.editComment = false;
			$scope.showSearch = false;
			var x = document.getElementById('td2');
			var xx = document.getElementById('th2');
			var y = document.getElementById('th1');
		    if (x.style.display === 'none') {
		        x.style.display = 'block';
		        xx.style.width = "30%";
		        y.style.width = "70%";
		    } 
		}
		
		$scope.saveEditedTopic = function(steditcontent,steditdate){
			
			var sel = document.getElementById('topicEditTypes');
			if($scope.topicForEdit.type!=sel.value)
				$scope.topicForEdit.type = sel.value;
			alert($scope.topicForEdit.type);
			if(steditdate!="" && steditdate!=undefined){
				$scope.topicForEdit.dateOfCreation = steditdate;
			}
			if(steditcontent!="" && steditcontent!=undefined){
				$scope.topicForEdit.content = steditcontent;
			}
			
			$http({
				method:'POST',
				url: "http://localhost/aaa/edittop",
				data: $scope.topicForEdit
				}).then(function successCallback(response){
					location.reload();
				}, function errorCallback(response){
					console.log("Nesto je lose kod edita teme ");
					
				});
			
		}
		
		$scope.cancelChangingForum = function(){
			$scope.changingForum = false;
			var x = document.getElementById('td2');
			var xx = document.getElementById('th2');
			var y = document.getElementById('th1');
			x.style.display = 'none';
		    y.style.width = '100%';
		    xx.style.width = "0%";
		}
		
		
		$scope.changingForum = false;
		
		$scope.changeForum = function(top){
			$scope.topicForEdit = top;
			$scope.newComment = false;
			$scope.changingForum = true;
			$scope.settings = false;
			$scope.addingNewSub = false;
			$scope.addingtopic = false;
			$scope.editingSub = false;
			$scope.deletesf = false;
			$scope.editmod = false;
			$scope.showProf = false;
			$scope.editingTop = false;
			$scope.deletetop = false;
			$scope.editComment = false;
			$scope.showSearch = false;
			var x = document.getElementById('td2');
			var xx = document.getElementById('th2');
			var y = document.getElementById('th1');
		    if (x.style.display === 'none') {
		        x.style.display = 'block';
		        xx.style.width = "30%";
		        y.style.width = "70%";
		    } 
		}
		
		
		$scope.saveChangedForum = function(){
			
			var sel = document.getElementById('topicForums');
			alert(sel.value);
			if($scope.topicForEdit.parentForum!=sel.value){
				alert("usao u if")
				var old = $scope.topicForEdit.parentForum;
				$scope.topicForEdit.parentForum = sel.value
				
				alert("stari forum: " + old + "novi forum: " + $scope.topicForEdit.parentForum);
				$http({
					method:'POST',
					url: "http://localhost/aaa/newtopic",
					data: $scope.topicForEdit
					}).then(function successCallback(response){
						
						alert("uspesna izmena")

					}, function errorCallback(response){
						console.log("Nesto je lose kod edita teme ");
						
					})
				}
			
				
				for(var i = 0; i < $scope.subForumi.length; i++){
					if($scope.subForumi[i].name === old){
					 
						$scope.subForEdit = $scope.subForumi[i];
						alert("nasao stari sub: " + $scope.subForEdit)
						break;
					}else
						$scope.subForEdit = undefined;
				}
				if($scope.subForEdit!=undefined){
					alert("nije undefined sub for editing")
					var toRemove = $scope.subForEdit.topics.indexOf($scope.topicForEdit);
					alert("uklonio: " + $scope.topicForEdit.name)
					$scope.subForEdit.topics.splice(toRemove,1);
					$http({
						method:'POST',
						url: "http://localhost/aaa/editsub",
						data: $scope.subForEdit
						}).then(function successCallback(response){
							
							$scope.subForEdit = undefined;
							$scope.editingSub = false;
							$scope.topicForEdit = undefined;
							$scope.addingtopic = false;
							location.reload();
						}, function errorCallback(response){
							console.log("Nesto je lose kod edita teme 2 ");
							
						})
					
				
				}
			}
		
		$scope.newComment = false;
		$scope.addingComment = function(top){
			$scope.newComment = true;
			$scope.settings = false;
			$scope.newComComment = false;
			$scope.showProf = false;
			$scope.editingTop = false;
			$scope.addingNewSub = false;
			$scope.addingtopic = false;
			$scope.editingSub = false;
			$scope.deletesf = false;
			$scope.editmod = false;
			$scope.changingForum = false;
			$scope.deletetop = false;
			$scope.editComment = false;
			$scope.showSearch = false;
			$scope.topicForEdit = top;
			var x = document.getElementById('td2');
			var xx = document.getElementById('th2');
			var y = document.getElementById('th1');
		    if (x.style.display === 'none') {
		        x.style.display = 'block';
		        xx.style.width = "30%";
		        y.style.width = "70%";
		    } 
			
		}
		$scope.cancelNewComment = function(){
			$scope.newComment = false;
			$scope.newComComment = false;
			var x = document.getElementById('td2');
			var xx = document.getElementById('th2');
			var y = document.getElementById('th1');
			x.style.display = 'none';
		    y.style.width = '100%';
		    xx.style.width = "0%";
		}
		
		$scope.saveComment = function(comcontent){
			var date = "";
			var likes = [];
			var dislikes = [];
			var childCommentIds = [];
			if($scope.newComComment){
				var com = {
						"content": comcontent,
						"author": $localStorage.currentUser.username,
						"topicId": $scope.commentForEdit.id,
						"dateOfCreation": date,
						"deleted": false,
						"likedBy": likes,
						"dislikedBy": dislikes, 
						"childCommentIds": likes,
						
					};
				
				
			}else{
				var com = {
						"content": comcontent,
						"author": $localStorage.currentUser.username,
						"topicId": $scope.topicForEdit.id,
						"dateOfCreation": date,
						"deleted": false,
						"likedBy": likes,
						"dislikedBy": dislikes, 
						"childCommentIds": likes,
						
					};
			}
			$http({
				method:'POST',
				url: "http://localhost/aaa/newcomment",
				data: com
				}).then(function successCallback(response){
					$scope.topicForEdit=undefined;
					$scope.commentForEdit=undefined;
					alert("uspesna izmena")
					location.reload();
				}, function errorCallback(response){
					console.log("Nesto je lose kod dodavanja commenta");
					
				})
			
		
		}
		
		$scope.showComments = function(top){
			
			
			var x = document.getElementById(top.id + " comments");
		    if (x.style.display === 'none') {
		        x.style.display = 'block';
		    } else {
		        x.style.display = 'none';
		    }
		    
		    $scope.comments = top.comments;
		    
		
		}
		
		
		$scope.deletetop = false;
		
		$scope.checkDeleteTop = function(top){
			$scope.deletetop = true;
			$scope.newComment = false;
			$scope.settings = false;
			$scope.showProf = false;
			$scope.editingTop = false;
			$scope.addingNewSub = false;
			$scope.addingtopic = false;
			$scope.editingSub = false;
			$scope.deletesf = false;
			$scope.editmod = false;
			$scope.changingForum = false;
			$scope.showSearch = false;
			$scope.topicForEdit = top;
			var x = document.getElementById('td2');
			var xx = document.getElementById('th2');
			var y = document.getElementById('th1');
		    if (x.style.display === 'none') {
		        x.style.display = 'block';
		        xx.style.width = "30%";
		        y.style.width = "70%";
		    } 
		}
		
		$scope.cancelDeleteTop = function(){
			$scope.deletetop = false;
			var x = document.getElementById('td2');
			var y = document.getElementById('th1');
			x.style.display = 'none';
	        y.style.width = '100%';
		}
		$scope.deleteTopic = function(){
			for (var i = 0; i < $scope.subForumi.length; i++) {

			    if ($scope.subForumi[i].name === $scope.topicForEdit.parentForum) {
			    	$scope.subForEdit =  $scope.subForumi[i];
			    	
			    	break;
			    }
			  }	
			var idx = $scope.subForEdit.topics.indexOf($scope.topicForEdit);
			$scope.subForEdit.topics.splice(idx,1);
			
			
			$http({
				method:'POST',
				url: "http://localhost/aaa/editsub",
				data: $scope.subForEdit
				}).then(function successCallback(response){
					location.reload();
					$scope.subForEdit = undefined;
					$scope.deletetop = false;

				}, function errorCallback(response){
					console.log("Nesto je lose kod edita teme ");
					
				})
				
		}
		$scope.editComment = false;
		
		$scope.editCom = function(com, top, sub){
			$scope.subForEdit = sub;
			$scope.editComment = true;
			$scope.deletetop = false;
			$scope.newComment = false;
			$scope.settings = false;
			$scope.showProf = false;
			$scope.editingTop = false;
			$scope.addingNewSub = false;
			$scope.addingtopic = false;
			$scope.editingSub = false;
			$scope.deletesf = false;
			$scope.editmod = false;
			$scope.changingForum = false;
			$scope.showSearch = false;
			$scope.topicForEdit = top;
			$scope.commentForEdit = com;
			var x = document.getElementById('td2');
			var xx = document.getElementById('th2');
			var y = document.getElementById('th1');
		    if (x.style.display === 'none') {
		        x.style.display = 'block';
		        xx.style.width = "30%";
		        y.style.width = "70%";
		    } 
		}
		
		$scope.saveEditComment = function(comNewContent){
		
	
			if(comNewContent!=null && comNewContent!=undefined){
				$scope.commentForEdit.content = comNewContent;
				if($scope.subForEdit.moderators.indexOf($scope.commentForEdit.author)!=-1 || $scope.user.username===$scope.commentForEdit.author)
					$scope.commentForEdit.edited = false;
				else
					$scope.commentForEdit.edited = true;

			}
			var toDelete = document.getElementById("deleteComCBx").checked;

			if(toDelete){
				$scope.commentForEdit.deleted=true;
				if($scope.moderators.indexOf($scope.commentForEdit.author)!=-1 || $scope.user.username===$scope.commentForEdit.author)
					$scope.commentForEdit.edited = false;
				else
					$scope.commentForEdit.edited = true;
			}else
				$scope.commentForEdit.deleted = false;
			
			
			$http({
				method:'POST',
				url: "http://localhost/aaa/likecom",
				data: $scope.commentForEdit
				}).then(function successCallback(response){
					location.reload();
				}, function errorCallback(response){
					console.log("Nesto je lose kod edita teme ");
					
				});
			
		}
		
		$scope.cancelEditComment = function(){
			$scope.editComment = false;
			var x = document.getElementById('td2');
			var xx = document.getElementById('th2');
			var y = document.getElementById('th1');
			x.style.display = 'none';
		    y.style.width = '100%';
		    xx.style.width = "0%";
		}
		
		$scope.saveComm = function(com){
			if($scope.user.savedComments === null || $scope.user.savedComments === undefined){
				alert("ne pprati nista jos od komentara");
				$scope.user.savedComments = [];
				$scope.user.savedComments.push(com);
			}else if($scope.user.savedComments.length===0){
				$scope.user.savedComments.push(com);				
			}else{
				var idx = -1;
				for(var i = 0; i < $scope.user.savedComments.length; i++){
					
					if($scope.user.savedComments[i].id === com.id){
						idx = i;
						break;
					}
				}
				if(idx != -1){
					$scope.user.savedComments.splice(idx,1);
					alert("ne cuva vise: "+ com.content);
				}
					
				else{
					$scope.user.savedComments.push(com);
					alert("sacuvao: "+ com.content);
				}
					
			}
			
			
			$http({
				method:'POST',
				url: "http://localhost/aaa/savetop",
				data: $scope.user
				}).then(function successCallback(response){
					location.reload();
				}, function errorCallback(response){
					console.log("Nesto je lose kod save teme ");
					
				});
		}
		
		$scope.navigateToTopic = function(top){
			var name = top.name;

			var x = document.getElementById(top.parentForum + " topics");
		    if (x.style.display === 'none') {
		        x.style.display = 'block';
		    } 
			window.location = "#name";
		}
		
		$scope.navigateToSub = function(sub){
			var name = sub.name;
			window.location = "#name";
		}
		
		var searchComms = function(){
			for(var i = 0; i < $scope.commList.length; i++){
				if($scope.commList[i].id === 	$scope.commentForEdit.topicId){
					$scope.topicComment = $scope.commList[i];
					$scope.found = true;
				}
			}
		}

		$scope.navigateToCom = function(com){
			$scope.commentForEdit = com;
			var id = com.id;
			var top = undefined;
			$scope.found = false;
			
			for(var i = 0; i < $scope.allTopics.length; i++){
				if($scope.allTopics[i].id===com.topicId){
					top = $scope.allTopics[i];
					break;
				}else if($scope.allTopics[i].comments!=null && $scope.allTopics[i].comments!=undefined){
					if($scope.allTopics[i].comments.length>0){
						$scope.commList = $scope.allTopics[i].comments;
						searchComms();
						if($scope.found){
							top = $scope.allTopics[i];
							break;
						}
					}
				}
			}
			if(top!=undefined){
				var x = document.getElementById(top.parentForum + " topics");
			    if (x.style.display === 'none') {
			        x.style.display = 'block';
			    } 
			}
			
			
			window.location = "#id";
		}
		
		$scope.likeCom = function(top,com){
			
			$scope.commentForEdit = com;
			alert($scope.commentForEdit.content)
			
			
			
			var idx = $scope.commentForEdit.likedBy.indexOf($scope.user.username);

			if(idx===-1){
				if($scope.commentForEdit.dislikedBy.indexOf($scope.user.username)===-1){
					$scope.commentForEdit.likedBy.push($scope.user.username);
					$scope.user.likes = $scope.user.likes+1;
				}else{
					var didx = $scope.commentForEdit.dislikedBy.indexOf($scope.user.username);
					$scope.commentForEdit.dislikedBy.splice(didx,1);
					$scope.user.dislikes = $scope.user.dislikes-1;
					$scope.commentForEdit.likedBy.push($scope.user.username);
					$scope.user.likes = $scope.user.likes+1;
				}
				
			}else{
				$scope.commentForEdit.likedBy.splice(idx,1);
				$scope.user.likes = $scope.user.likes-1;
			}
			
			
			$http({
				method:'POST',
				url: "http://localhost/aaa/likecom",
				data: $scope.commentForEdit
				}).then(function successCallback(response){
					$scope.topicForEdit=undefined;
					$scope.commentForEdit=undefined;
					alert("uspesna izmena")
					location.reload();
				}, function errorCallback(response){
					console.log("Nesto je lose kod dodavanja commenta");
					
				})
		}
		
		$scope.dislikeCom = function(top,com){
			
			$scope.commentForEdit = com;
			alert($scope.commentForEdit.content)
		
			var idx = $scope.commentForEdit.dislikedBy.indexOf($scope.user.username);

			if(idx===-1){
				if($scope.commentForEdit.likedBy.indexOf($scope.user.username)===-1){
					$scope.commentForEdit.dislikedBy.push($scope.user.username);
					$scope.user.dislikes = $scope.user.dislikes+1;
				}else{
					var didx = $scope.commentForEdit.likedBy.indexOf($scope.user.username);
					$scope.commentForEdit.likedBy.splice(didx,1);
					$scope.user.likes = $scope.user.likes-1;
					$scope.commentForEdit.dislikedBy.push($scope.user.username);
					$scope.user.dislikes = $scope.user.dislikes+1;
				}
				
			}else{
				$scope.commentForEdit.dislikedBy.splice(idx,1);
				$scope.user.dislikes = $scope.user.dislikes-1;
			}
			
			
			$http({
				method:'POST',
				url: "http://localhost/aaa/likecom",
				data: $scope.commentForEdit
				}).then(function successCallback(response){
					$scope.topicForEdit=undefined;
					$scope.commentForEdit=undefined;
					alert("uspesna izmena")
					location.reload();
				}, function errorCallback(response){
					console.log("Nesto je lose kod dodavanja commenta");
					
				})
		}
		
		var save = function(){
			$http({
				method:'POST',
				url: "http://localhost/aaa/edittop",
				data: $scope.topicForEdit
				}).then(function successCallback(response){
					location.reload();
				}, function errorCallback(response){
					console.log("Nesto je lose kod edita teme ");
					
				});
		}
		
		
		$scope.likeTop = function(top){
			$scope.topicForEdit = top;
			
			var idx = $scope.topicForEdit.likedBy.indexOf($scope.user.username);

			if(idx===-1){
				if($scope.topicForEdit.dislikedBy.indexOf($scope.user.username)===-1){
					$scope.topicForEdit.likedBy.push($scope.user.username);
					$scope.user.likes = $scope.user.likes+1;
				}else{
					var didx = $scope.topicForEdit.dislikedBy.indexOf($scope.user.username);
					$scope.topicForEdit.dislikedBy.splice(didx,1);
					$scope.user.dislikes = $scope.user.dislikes-1;
					$scope.topicForEdit.likedBy.push($scope.user.username);
					$scope.user.likes = $scope.user.likes+1;
				}
				
			}else{
				$scope.topicForEdit.likedBy.splice(idx,1);
				$scope.user.likes = $scope.user.likes-1;
			}
			
			$http({
				method:'POST',
				url: "http://localhost/aaa/savetop",
				data: $scope.user
				}).then(function successCallback(response){
					console.log("sacuvani like usera");
					
					save();

					
				}, function errorCallback(response){
					console.log("Nesto je lose kod cuvanja like komentara");
					
				});
		}
		
		$scope.dislikeTop = function(top){
			$scope.topicForEdit = top;

			var idx = $scope.topicForEdit.dislikedBy.indexOf($scope.user.username);

			if(idx===-1){
				if($scope.topicForEdit.likedBy.indexOf($scope.user.username)===-1){
					$scope.topicForEdit.dislikedBy.push($scope.user.username);
					$scope.user.dislikes = $scope.user.dislikes+1;
				}else{
					var didx = $scope.topicForEdit.likedBy.indexOf($scope.user.username);
					$scope.topicForEdit.likedBy.splice(didx,1);
					$scope.user.likes = $scope.user.likes-1;
					$scope.topicForEdit.dislikedBy.push($scope.user.username);
					$scope.user.dislikes = $scope.user.dislikes+1;
				}
				
			}else{
				$scope.topicForEdit.dislikedBy.splice(idx,1);
				$scope.user.dislikes = $scope.user.dislikes-1;
			}
			
			$http({
				method:'POST',
				url: "http://localhost/aaa/savetop",
				data: $scope.user
				}).then(function successCallback(response){
					console.log("sacuvani like usera");

					save();

					
				}, function errorCallback(response){
					console.log("Nesto je lose kod cuvanja like komentara");
					
				});
		}
		document.getElementById('searchBar').onkeypress = function(e){
		    if (!e) e = window.event;
		    var keyCode = e.keyCode || e.which;
		    if (keyCode == '13'){
		    	var entry = document.getElementById('searchBar').value;
		    	var obj = {};
		    	obj.value=entry;
		    	$http({
					method:'POST',
					url: "http://localhost/aaa/search",
					data: obj
					}).then(function successCallback(response){
						console.log("uspesan search");
						 $scope.searchResults = response.data;
						 $scope.foundTopics =  $scope.searchResults.topics;
						 $scope.foundUsers =  $scope.searchResults.users;
						 $scope.foundSF =  $scope.searchResults.subForums;
						 	$scope.showSearch = true;
						 	$scope.deletetop = false;
							$scope.addingNewSub = false;
							$scope.editingTop = false;
							$scope.addingNewSub = false;
							$scope.addingtopic = false;
							$scope.editingSub = false;
							$scope.deletesf = false;
							$scope.editmod = false;
							$scope.showProf = false;
							$scope.changingForum = false;
							$scope.newComment = false;
							$scope.settings = false;
							$scope.editComment = false;
							
						 var a = document.getElementById("searchRez");
						 if($scope.showSearch){
						    if (a.style.display === 'none') {
						        a.style.display = 'block';
						    } 
						 }
						 var x = document.getElementById('td2');
							var xx = document.getElementById('th2');
							var y = document.getElementById('th1');
						    if (x.style.display === 'none') {
						        x.style.display = 'block';
						        xx.style.width = "30%";
						        y.style.width = "70%";
						    } 
						    
					}, function errorCallback(response){
						console.log("Nesto je lose kod seearcha");
						
					});
		    }
		  }
		
		$scope.closeSearch = function(){
			$scope.showSearch = false;
			 var a = document.getElementById("searchRez");
			    a.style.display = 'none';

			    var x = document.getElementById('td2');
				var xx = document.getElementById('th2');
				var y = document.getElementById('th1');
				x.style.display = 'none';
			    y.style.width = '100%';
			    xx.style.width = "0%";
		}
		
		$scope.recommendedTopics = [];
		var getRecommended = function(){
			var totalLikes = 0;
			for(var i = 0; i < $scope.allTopics.length; i++){
				totalLikes+=$scope.allTopics[i].likedBy.length;
			}
			var average = totalLikes/$scope.allTopics.length;
			for(var j = 0; j < $scope.allTopics.length; j++){
				if($scope.allTopics[j].likedBy.length>=average)
					$scope.recommendedTopics.push($scope.allTopics[j]);
				
			}
		}
		$scope.newComment = false;
		$scope.newComComment = false;
		$scope.addingComment = function(com){
			$scope.newComment = true;
			$scope.newComComment = true;
			$scope.settings = false;
			$scope.showProf = false;
			$scope.editingTop = false;
			$scope.addingNewSub = false;
			$scope.addingtopic = false;
			$scope.editingSub = false;
			$scope.deletesf = false;
			$scope.editmod = false;
			$scope.changingForum = false;
			$scope.deletetop = false;
			$scope.editComment = false;
			$scope.showSearch = false;
			$scope.commentForEdit = com;
			var x = document.getElementById('td2');
			var xx = document.getElementById('th2');
			var y = document.getElementById('th1');
		    if (x.style.display === 'none') {
		        x.style.display = 'block';
		        xx.style.width = "30%";
		        y.style.width = "70%";
		    } 
			
		}
		
		$scope.showComComments = function(com){
			
			
			var x = document.getElementById(com.id + " comments");
			var y = document.getElementById("hideWhenExpanded");
			if(x!=null && x!=undefined){
				if (x.style.display === 'none') {
			        x.style.display = 'block';
			        y.style.display = 'none';
			    } else {
			        x.style.display = 'none';
			        y.style.display = 'block';
			    }
			    
				 $scope.comAllcomments = com.childCommentIds;
			
			}
		    
		
		}
		$scope.loadChildComments = function(c){
			 $scope.comAllcomments = c.childCommentIds;
		}
		$scope.settings = false;
		$scope.settingsTab = function(){
			$scope.newComment = false;
			$scope.newComComment = true;
			$scope.showProf = false;
			$scope.editingTop = false;
			$scope.addingNewSub = false;
			$scope.addingtopic = false;
			$scope.editingSub = false;
			$scope.deletesf = false;
			$scope.editmod = false;
			$scope.changingForum = false;
			$scope.deletetop = false;
			$scope.editComment = false;
			$scope.showSearch = false;
			$scope.settings = true;
	
			var x = document.getElementById('td2');
			var xx = document.getElementById('th2');
			var y = document.getElementById('th1');
		    if (x.style.display === 'none') {
		        x.style.display = 'block';
		        xx.style.width = "30%";
		        y.style.width = "70%";
		        
		    }
		}
		$scope.changeTypeCancel = function(){
		
			var x = document.getElementById('td2');
			var xx = document.getElementById('th2');
			var y = document.getElementById('th1');
					x.style.display = 'none';
				    y.style.width = '100%';
				    xx.style.width = "0%";
				    $scope.settings = false;
	
		}
		$scope.changeType = function(){
			var map = {};
			var user = document.getElementById("usersToChange");
			var type = document.getElementById("userTypes");
			var nijeMod = true;
			for(var i = 0; i < $scope.subForumi.length; i++){
				if($scope.subForumi[i].mainModerator === user.value)
					nijeMod = false;	
			}
			
			
			if(nijeMod || type.value==="admin"){
			 $http({
					method:'POST',
					url: "http://localhost/aaa/changeutype",
					data: map
					}).then(function successCallback(response){
						console.log("uspesan update tipova");
						location.reload();
					}, function errorCallback(response){
						console.log("Nesto je lose kod update tipova");
						
					});
			}else{
				alert("Cannot change user's type.")
			}
		}
		
		
}])
})(angular);