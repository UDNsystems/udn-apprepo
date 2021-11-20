function getLSData(iframe) {
	return new Promise(resolve => {
		iframe.contentWindow.postMessage({
				event: 'getFullLS'
		},"*")
		let oldMSG = window.onmessage;
		window.onmessage = function(ev) {
			if (ev.data.event === 'getFullLS') {
				window.onmessage = oldMSG;
				resolve(ev.data.data);
			}
		}
	});
}
function remoteLS(src) {
	return new Promise(resolve => {
		let iframe_temp = document.createElement('iframe');
		iframe_temp.src = src;
		iframe_temp.hidden = true;
		document.body.appendChild(iframe_temp);
		
		iframe_temp.onload = async function() {
			
			let cache = await getLSData(iframe_temp);
			console.log('got data')
			let obj = {
				cache, 
				iframe_temp,
				setItem(key, value) {
					this.iframe_temp.contentWindow.postMessage({
						event: 'setLS',
						key,
						value
					},"*");
					this.cache[key] = value;

					return this;
				},
				removeItem(key) {
					this.iframe_temp.contentWindow.postMessage({
						event: 'delLS',
						key
					},"*");
					delete this.cache[key];
					return this;
				},
				getItem(key) {
					return this.cache[key];
				},
				end() {
					delete this.cache;
					setTimeout(() => {
						this.iframe_temp.remove();
					},1000)
					return this;
				}
			}
			let internalNames = ["cache", "iframe_temp", "setItem", "getItem","removeItem","end"]
			let proxyObj = new Proxy(obj, {
				set(target, name, value) {
					if (internalNames.includes(name)) return false;
					target[name] = value;
					target.setItem(name, value);
					return value;
				},
				get(target, name) {
					if (internalNames.includes(name)) return target[name];
					return target.getItem(name);
				},
				deleteProperty(target, prop) {
					if (internalNames.includes(prop)) return false;
					if (prop in target) {
						target.removeItem(prop);
						return true;
					}
				}
			})
			resolve(proxyObj);
		}
	})
	
}