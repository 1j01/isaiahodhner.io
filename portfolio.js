
window.onload = function(){
	
	var links = document.getElementsByTagName("a");
	for(var i = 0; i < links.length; i += 1){
		if(location.protocol === "file:"){
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
		var header = document.getElementsByTagName("header")[0];
		
		var canvas = document.createElement("canvas");
		var support = (
			canvas.getContext &&
			canvas.getBoundingClientRect &&
			window.requestAnimationFrame &&
			"pointerEvents" in canvas.style
		);
		var drawImageSafe = function(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh){
			ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
		};
		if(support){
			var ctx = canvas.getContext("2d");
			try{
				// Firefox and IE don't allow out-of-bound source dimensions, which I rely on
				ctx.drawImage(canvas, -50, 50, 50, 50, 50, 50, 50, 50);
			}catch(e){
				// This function isn't bullet-proof.
				drawImageSafe = function(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh){
					if(sx <= 0){
						sw += sx;
						sx = 0;
					}
					if(sy <= 0){
						sh += sy;
						sy = 0;
					}
					if(sx + sw > img.width){
						sw = Math.max(img.width - sx, 0);
					}
					if(sy + sh > img.height){
						sh = Math.max(img.height - sy, 0);
					}
					try {
						ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
					}catch(e){
						//console.log("Bad dimensions: ", sx, sy, sw, sh);
					}
				};
			}
		}
		if(support){
			
			var canvasToBecome = document.createElement("canvas");
			var ctxToBecome = canvasToBecome.getContext("2d");
			
			var tempCanvas = document.createElement("canvas");
			var tempCtx = tempCanvas.getContext("2d");
			
			document.body.appendChild(canvas);
			canvas.style.position = "fixed";
			canvas.style.left = "0";
			canvas.style.top = "0";
			canvas.style.pointerEvents = "none";
			
			var omgz = [];
			var scrollyness = 0;
			var updateDimensions = function(){
				if(canvas.width !== window.innerWidth){
					canvas.width = window.innerWidth;
					canvasToBecome.width = window.innerWidth;
				}
				if(canvas.height !== window.innerHeight){
					canvas.height = window.innerHeight;
					canvasToBecome.height = window.innerHeight;
				}
			};
			var splatter = function(img){
				
				updateDimensions();
				
				ctxToBecome.clearRect(0, 0, canvasToBecome.width, canvasToBecome.height);
				for(var x=0; x<canvasToBecome.width; x+=img.naturalWidth){
					for(var y=0; y<canvasToBecome.height; y+=img.naturalHeight){
						ctxToBecome.drawImage(img, x, y);
					}
				}
				
				omgz = [];
				for(var i=0; i<30; i++){
					var rect = img.getBoundingClientRect();
					var omg = {
						x: rect.left + rect.width * Math.random(),
						y: rect.top + rect.height * Math.random(),
						vx: (Math.random() * 2 - 1) * 59,
						vy: (Math.random() * 2 - 1) * 59,
						r: 50 + Math.random() * 50,
						life: 100 + Math.random() * 100,
						img: img,
					};
					omgz.push(omg);
				}
				
				animate();
			};
			window.onresize =
			document.body.onscroll = function(e){
				
				updateDimensions();
				
				scrollyness = 1;
				animate();
			};
			var animating = false;
			var animate = function(){
				animating = (omgz.length > 0) || (scrollyness > 0.05);
				if(!animating){
					return; // (without requesting another animation frame)
				}
				//ctx.fillStyle = "rgba(0, 100, 0, 0.05)";
				//ctx.fillRect(0,0,5000,5000);
				for(var i=omgz.length-1; i>=0; i--){
					var omg = omgz[i];
					omg.life -= 10;
					if(omg.life <= 0){
						omgz.splice(i, 1);
						continue;//as in, don't continue executing statements in this iteration
					}
					
					var rect = omg.img.getBoundingClientRect();
					var g = 2;
					if(x < rect.left) omg.vx += g;
					if(y < rect.top) omg.vy += g;
					if(x > rect.right) omg.vx -= g;
					if(y > rect.bottom) omg.vy -= g;
					
					var x = ~~(omg.x += omg.vx);
					var y = ~~(omg.y += omg.vy);
					var r = ~~(omg.r);
					
					//ctx.drawImage(omg.img, x+Math.random()*20, y+Math.random()*20, Math.random()*20, Math.random()*20);
					//ctx.drawImage(canvasToBecome, x-r, y-r, r+r, r+r, x-r, y-r, r+r, r+r);
					
					tempCanvas.width = r+r;
					tempCanvas.height = r+r;
					drawImageSafe(tempCtx, canvasToBecome, x-r, y-r, r+r, r+r, r-r, r-r, r+r, r+r);
					
					tempCtx.globalCompositeOperation = "destination-atop";
					tempCtx.beginPath();
					tempCtx.arc(r, r, r*0.9, 0, 2 * Math.PI);
					
					if("USE_GRADIENT"){
						var rdl = tempCtx.createRadialGradient(r, r, r*0.5, r, r, r*0.9);
						rdl.addColorStop(0, "rgba(0, 0, 0, 1)");
						rdl.addColorStop(1, "rgba(0, 0, 0, 0)");
						tempCtx.fillStyle = rdl;
					}else if("USE_SHADOW"){
						tempCtx.shadowBlur = r*0.1;
						tempCtx.shadowColor = "white";
						tempCtx.fillStyle = "white";
					}
					tempCtx.fill();
					
					tempCtx.globalCompositeOperation = "source-over";
					ctx.drawImage(tempCanvas, x-r, y-r);
					
					//ctx.globalCompositeOperation = "source-atop";
					//ctx.drawImage(canvasToBecome, 0, 0);
					ctx.globalCompositeOperation = "source-over";
					
				}
				
				
				//{{{
				ctx.globalCompositeOperation = "destination-out";
				
				scrollyness *= 0.9;
				if(scrollyness < 0.0001){
					scrollyness = 0;
				}else{
					ctx.fillStyle = "rgba(0, 0, 0, " + Math.min(scrollyness, 0.1) + ")";
					ctx.fillRect(0, 0, canvas.width, canvas.height);
				}
				
				var rect = header.getBoundingClientRect();
				for(var ah=0; ah<30; ah+=1){
					ctx.fillStyle = "rgba(0, 0, 0, " + (0.1-ah/450) + ")";
					ctx.fillRect(rect.left, rect.top + ah, rect.width, rect.height + ah);
				}
				
				ctx.globalCompositeOperation = "source-over";
				//}}}
				
				requestAnimationFrame(animate);
				
			};
		}
		
		
		var tiles = textures.children;
		for(var i = 0; i < tiles.length; i += 1){ (function(tile, i){
			var img = tile.children[0];
			if(img && img.src){
				
				tile.style.cursor = "pointer";
				
				if(support){
					var show = function(){
						splatter(img);
					};
				}else{
					var show = function(){
						textures.style.backgroundImage = 'url("'+img.src+'")';
					};
					textures.style.transition =
					textures.style.webkitTransition =
					textures.style.mozTransition =
						"background 0.2s ease-in-out";
				}
				
				tile.ontouchstart =
				tile.onmousedown =
				//tile.onmouseenter =
					show;
				
			}
		})(tiles[i], i); }
		
	}
	
};
