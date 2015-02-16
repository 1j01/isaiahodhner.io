
links = document.getElementsByTagName("a")
for link in links
	
	if location.protocol is "file:"
		local_href = link.getAttribute("data-local")
		link.setAttribute("href", local_href) if local_href
	
	href = link.getAttribute("href")
	
	email_provider_match = /(@.*$)/.exec(href)
	if email_provider_match
		email_provider = email_provider_match[1]
		contact = link
		magic = document.getElementById("magic")
		id = document.getElementById("name")
		my_name = id.innerHTML
		
		reveal = ->
			magic.innerHTML = "email"
			id.innerHTML = my_name.replace(" ", "") + email_provider
			contact.onclick = hide
			return false
		
		hide = ->
			magic.innerHTML = "name"
			id.innerHTML = my_name
			contact.onclick = reveal
			return false
		
		hide()
