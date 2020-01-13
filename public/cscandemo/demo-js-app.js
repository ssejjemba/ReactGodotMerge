
window.addEventListener('load', () => {
	// Called 20 times per second
	window.setInterval(() => {
		
		if(gatewayToReact.hasEvent()) {		
			do {
				const event = gatewayToReact.popEvent();
				onEvent(event.name, event.data);
			}while(gatewayToReact.hasEvent());	
		
			gatewayToReact.clearEventsArray();
		}
		
	}, 50);
});

const onEvent = (eventName, eventData) => {
	switch(eventName) {
		case 'ready':
			createDemoEventButton();		
			break;
		case 'alert':
			alert(eventData);
			break;
		default:
			console.log("Unexpected event:", eventName, eventData)
	}
}

const createDemoEventButton = () => {
	const btn = document.createElement('button');
	btn.addEventListener('click', () => {
		console.log("Clicking...");
		gatewayToGodot.newEvent('js_event', 'This message comes from JS App');
	})
	
	btn.innerHTML = 'Call JS event';
	
	// I know, that I should do this via css, but it's just demo
	btn.style.position = 'fixed';
	btn.style.right = 0;
	btn.style.top = 0;
	btn.style.zIndex = 10;
	
	const body = document.querySelector('body')
	body.appendChild(btn)
}