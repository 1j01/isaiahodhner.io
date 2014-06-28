
window.onload = function(){
	
	var links = document.getElementsByTagName("a");
	for(var i = 0; i < links.length; i += 1){
		if(location.origin === "file://"){
			var local_href = links[i].getAttribute("data-local");
			if(local_href){
				links[i].setAttribute("href", local_href);
			}
		}
		var href = links[i].getAttribute("href");
		var epmatch = /(@.*$)/.exec(href);
		if(epmatch){
			var email_provider = (epmatch||[])[1];
			var contact = links[i];
			var magic = document.getElementById("magic");
			var id = document.getElementById("name");
			var my_name = id.innerHTML;
			var reveal = function(){
				magic.innerHTML = "email";
				id.innerHTML = my_name.replace(" ", "") + email_provider;
				contact.onclick = hide;
				return false;
			};
			var hide = function(){
				magic.innerHTML = "name";
				id.innerHTML = my_name;
				contact.onclick = reveal;
				return false;
			};
			hide();
		}
	}
	
	var textures = document.getElementById("textures");
	
	if(textures){
		
		textures.style.transition =
		textures.style.webkitTransition =
		textures.style.mozTransition =
			"background 0.2s ease-in-out";
		
		var tiles = textures.children;
		for(var i = 0; i < tiles.length; i += 1){ (function(tile, i){
			var img = tile.children[0];
			if(img && img.src){
				
				tile.onmouseenter = function(){
					textures.style.backgroundImage = 'url("'+img.src+'")';
				};
				tile.onmouseleave = function(){
					//textures.style.backgroundImage = "";
				};
				
				tile.style.transition =
				tile.style.webkitTransition =
				tile.style.mozTransition =
					"opacity 0.5s ease-in-out";
				
			}
		})(tiles[i], i); }
		
	}
	
};
