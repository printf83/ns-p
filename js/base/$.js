const ns = {}; //to keep ns plugins

Array.prototype.removeEmpty = function () {
	return this.filter(Boolean);
};

Array.prototype.combine = function (delimeter) {
	return this.removeEmpty().join(delimeter);
};

String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

// /**
//  * Super simple JQUERY plugin by Hamzah
//  * base on 1 : http://youmightnotneedjquery.com
//  * base on 2 : https://gomakethings.com/how-to-create-your-own-vanilla-js-dom-manipulation-library-like-jquery/
//  */

// var $ = (function () {
// 	("use strict");

// 	/**
// 	 * Create the constructor
// 	 * @param {String} selector The selector to use
// 	 */
// 	var nsObject = function (selector) {
// 		if (!selector) return;
// 		if (selector === "document") {
// 			this.nsElems = [document];
// 		} else if (selector === "window") {
// 			this.nsElems = [window];
// 		} else {
// 			if (typeof selector === "string") {
// 				this.nsElems = document.querySelectorAll(selector);
// 			} else if (typeof selector === "object") {
// 				if (Array.isArray(selector)) {
// 					this.nsElems = selector;
// 				} else {
// 					this.nsElems = [selector];
// 				}
// 			} else {
// 				console.log("Unknow selector type : " + typeof selector);
// 			}
// 		}
// 	};
// 	// var Constructor = function (selector) {
// 	// 	if (!selector) return;

// 	// 	if (selector === "document") {
// 	// 		this.nsElems = [document];
// 	// 	} else if (selector === "window") {
// 	// 		this.nsElems = [window];
// 	// 	} else {
// 	// 		if (typeof selector === "string") {
// 	// 			this.nsElems = document.querySelectorAll(selector);
// 	// 		} else {
// 	// 			if (selector.length > 0) {
// 	// 				this.nsElems = selector;
// 	// 			} else {
// 	// 				return;
// 	// 			}
// 	// 		}
// 	// 	}
// 	// };

// 	nsObject.prototype.fn = nsObject.prototype;

// 	nsObject.prototype.ready = function (callback) {
// 		if (this.readyState != "loading") {
// 			callback();
// 		} else {
// 			this.addEventListener("DOMContentLoaded", callback);
// 		}
// 	};

// 	/**
// 	 * Run a callback on each item
// 	 * @param  {Function} callback The callback function to run
// 	 * usage : $(el).each(function(item,index){});
// 	 */
// 	nsObject.prototype.each = function (callback) {
// 		if (!callback || typeof callback !== "function") return;
// 		for (var i = 0; i < this.nsElems.length; i++) {
// 			callback(this.nsElems[i], i);
// 		}
// 		return this;
// 	};

// 	nsObject.prototype.toArray = function () {
// 		return this.nsElems;
// 	};

// 	nsObject.prototype.get = function () {
// 		if (this.nsElems && this.nsElems.length === 1) {
// 			return this.nsElems[0];
// 		} else {
// 			return this.nsElems;
// 		}
// 	};

// 	nsObject.prototype.after = function (target) {
// 		target.insertAdjacentElement("afterend", this.nsElems[0]);
// 		return this;
// 	};

// 	nsObject.prototype.before = function (target) {
// 		target.insertAdjacentElement("beforebegin", this.nsElems[0]);
// 		return this;
// 	};

// 	nsObject.prototype.append = function (elem) {
// 		if (typeof elem === "string") {
// 			this.each(function (item) {
// 				item.insertAdjacentHTML("beforeend", elem);
// 			});
// 		} else {
// 			this.each(function (item) {
// 				item.appendChild(elem);
// 			});
// 		}
// 		return this;
// 	};

// 	nsObject.prototype.prepend = function (elem) {
// 		this.each(function (item) {
// 			item.insertBefore(elem, item.firstChild);
// 		});
// 		return this;
// 	};

// 	nsObject.prototype.remove = function () {
// 		this.each(function (item) {
// 			item.parentNode.removeChild(item);
// 		});
// 	};

// 	nsObject.prototype.empty = function () {
// 		this.each(function (item) {
// 			while (item.firstChild) {
// 				item.removeChild(item.firstChild);
// 			}
// 		});

// 		return this;
// 	};

// 	nsObject.prototype.parent = function () {
// 		return new nsObject(this.nsElems[0].parentNode);
// 	};

// 	nsObject.prototype.children = function () {
// 		return new nsObject(this.nsElems[0].children);
// 	};

// 	nsObject.prototype.clone = function () {
// 		return new nsObject(this.nsElems[0].cloneNode(true));
// 	};

// 	nsObject.prototype.find = function (selector) {
// 		return new nsObject(this.nsElems[0].querySelectorAll(selector));
// 	};

// 	nsObject.prototype.filter = function (filterFn) {
// 		return new nsObject(Array.prototype.filter.call(this.nsElems[0], filterFn));
// 	};

// 	nsObject.prototype.attr = function (attr, val) {
// 		if (val) {
// 			this.nsElems[0].setAttribute(attr, val);
// 			return this;
// 		} else {
// 			return this.nsElems[0].getAttribute(attr);
// 		}
// 	};

// 	nsObject.prototype.removeAttr = function (attr) {
// 		this.nsElems[0].removeAttribute(attr);
// 		return this;
// 	};

// 	nsObject.prototype.position = function (relativeViewport) {
// 		if (relativeViewport) {
// 			return this.nsElems[0].getBoundingClientRect;
// 		} else {
// 			return {
// 				left: this.nsElems[0].offsetLeft,
// 				top: this.nsElems[0].offsetRight,
// 			};
// 		}
// 	};

// 	nsObject.prototype.offset = function () {
// 		var rect = this.nsElems[0].getBoundingClientRect();

// 		return {
// 			top: rect.top + document.body.scrollTop,
// 			left: rect.left + document.body.scrollLeft,
// 		};
// 	};

// 	nsObject.prototype.offsetParent = function () {
// 		return this.nsElems[0].offsetParent || this;
// 	};

// 	nsObject.prototype.outerHeight = function (withMargin) {
// 		if (withMargin) {
// 			var style = getComputedStyle(this.nsElems[0]);
// 			return this.nsElems[0].offsetHeight + parseInt(style.marginTop) + parseInt(style.marginBottom);
// 		} else {
// 			return this.nsElems[0].offsetHeight;
// 		}
// 	};

// 	nsObject.prototype.outerWidth = function (withMargin) {
// 		if (withMargin) {
// 			var style = getComputedStyle(this.nsElems[0]);
// 			return this.nsElems[0].offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight);
// 		} else {
// 			return this.nsElems[0].offsetWidth;
// 		}
// 	};

// 	nsObject.prototype.height = function (val) {
// 		if (val) {
// 			if (typeof val === "function") val = val();
// 			if (typeof val === "string") this.style.height = val;
// 			else this.nsElems[0].style.height = val + "px";

// 			return this;
// 		} else {
// 			return parseFloat(getComputedStyle(this.nsElems[0], null).height.replace("px", ""));
// 		}
// 	};

// 	nsObject.prototype.width = function (val) {
// 		if (val) {
// 			if (typeof val === "function") val = val();
// 			if (typeof val === "string") this.nsElems[0].style.width = val;
// 			else this.nsElems[0].style.width = val + "px";

// 			return this;
// 		} else {
// 			return parseFloat(getComputedStyle(this.nsElems[0], null).width.replace("px", ""));
// 		}
// 	};

// 	nsObject.prototype.hide = function () {
// 		this.each(function (item) {
// 			item.style.display = "none";
// 		});
// 		return this;
// 	};

// 	nsObject.prototype.show = function () {
// 		this.each(function (item) {
// 			item.style.display = "";
// 		});
// 		return this;
// 	};

// 	nsObject.prototype.css = function (cssName, value) {
// 		if (value) {
// 			this.each(function (item) {
// 				item.style[cssName] = value;
// 			});
// 			return this;
// 		} else {
// 			return getComputedStyle(this.nsElems[0])[cssName];
// 		}
// 	};

// 	nsObject.prototype.html = function (htmlString) {
// 		if (htmlString) {
// 			this.each(function (item) {
// 				item.innerHTML = htmlString;
// 			});
// 			return this;
// 		} else {
// 			return this.nsElems[0].innerHTML;
// 		}
// 	};

// 	nsObject.prototype.outerHtml = function (htmlString) {
// 		if (htmlString) {
// 			this.each(function (item) {
// 				item.outerHTML = htmlString;
// 			});
// 			return this;
// 		} else {
// 			return this.nsElems[0].outerHTML;
// 		}
// 	};

// 	nsObject.prototype.replaceWith = function (htmlString) {
// 		this.each(function (item) {
// 			item.outerHTML = htmlString;
// 		});
// 		return this;
// 	};

// 	nsObject.prototype.text = function (val) {
// 		if (val) {
// 			this.each(function (item) {
// 				item.textContent = val;
// 			});
// 			return this;
// 		} else {
// 			return this.nsElems[0].textContent;
// 		}
// 	};

// 	nsObject.prototype.addClass = function (className) {
// 		this.each(function (item) {
// 			item.classList.add(className);
// 		});
// 		return this;
// 	};

// 	nsObject.prototype.removeClass = function (className) {
// 		this.each(function (item) {
// 			item.classList.remove(className);
// 		});
// 		return this;
// 	};

// 	nsObject.prototype.hasClass = function (className) {
// 		return this.nsElems[0].classList.contains(className);
// 	};

// 	nsObject.prototype.toggleClass = function (className) {
// 		this.each(function (item) {
// 			item.classList.toggle(className);
// 		});
// 		return this;
// 	};

// 	nsObject.prototype.index = function () {
// 		if (!this) return -1;
// 		var i = 0;
// 		do {
// 			i++;
// 		} while (this.nsElems[0] === this.nsElems[0].previousElementSibling);
// 		return i;
// 	};

// 	nsObject.prototype.is = function (selector) {
// 		if (typeof selector === "string") {
// 			var matchesFn;

// 			// find vendor prefix
// 			["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"].some(function (fn) {
// 				if (typeof document.body[fn] == "function") {
// 					matchesFn = fn;
// 					return true;
// 				}
// 				return false;
// 			});

// 			return this.nsElems[0][matchesFn](selector);
// 			// return (this.elems[0].matches || this.elems[0].matchesSelector || this.elems[0].msMatchesSelector || this.elems[0].mozMatchesSelector || this.elems[0].webkitMatchesSelector || this.elems[0].oMatchesSelector).call(
// 			// 	this.elems[0],
// 			// 	selector
// 			// );
// 		} else {
// 			return this.nsElems[0] === selector;
// 		}
// 	};

// 	nsObject.prototype.next = function () {
// 		return new nsObject(this.nsElems[0].nextElementSibling);
// 	};

// 	nsObject.prototype.prev = function () {
// 		return new nsObject(this.nsElems[0].previousElementSibling);
// 	};

// 	nsObject.prototype.closest = function (selector) {
// 		var matchesFn;

// 		// find vendor prefix
// 		["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"].some(function (fn) {
// 			if (typeof document.body[fn] == "function") {
// 				matchesFn = fn;
// 				return true;
// 			}
// 			return false;
// 		});

// 		var el = this.nsElems[0];

// 		// traverse parents
// 		while (el) {
// 			if (el[matchesFn](selector)) {
// 				return new nsObject(el);
// 			} else {
// 				el = el.parentNode;
// 			}
// 		}

// 		return null;
// 	};

// 	nsObject.prototype.trigger = function (eventName, data) {
// 		//need to update this using https://www.w3schools.com/jsref/event_createevent.asp

// 		switch (eventName) {
// 			case ("abort",
// 			"afterprint",
// 			"beforeprint",
// 			"beforeunload",
// 			"canplay",
// 			"canplaythrough",
// 			"change",
// 			"error",
// 			"fullscreenchange",
// 			"fullscreenerror",
// 			"input",
// 			"invalid",
// 			"load",
// 			"loadeddata",
// 			"loadedmetadata",
// 			"message",
// 			"offline",
// 			"online",
// 			"open",
// 			"pause",
// 			"play",
// 			"playing",
// 			"progress",
// 			"ratechange",
// 			"resize",
// 			"reset",
// 			"scroll",
// 			"search",
// 			"seeked",
// 			"seeking",
// 			"select",
// 			"show",
// 			"stalled",
// 			"submit",
// 			"suspend",
// 			"timeupdate",
// 			"toggle",
// 			"unload",
// 			"waiting"):
// 				var event = document.createEvent("HTMLEvents");
// 				event.initEvent(eventName, true, false);
// 				this.each(function (item) {
// 					item.dispatchEvent(event);
// 				});
// 				break;
// 			case ("altKey",
// 			"button",
// 			"buttons",
// 			"clientX",
// 			"clientY",
// 			"ctrlKey",
// 			"getModifierState()",
// 			"metaKey",
// 			"movementX",
// 			"movementY",
// 			"offsetX",
// 			"offsetY",
// 			"pageX",
// 			"pageY",
// 			"region",
// 			"relatedTarget",
// 			"screenX",
// 			"screenY",
// 			"shiftKey",
// 			"which"):
// 				var event = document.createEvent("MouseEvent");
// 				event.initMouseEvent(eventName, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
// 				this.each(function (item) {
// 					item.dispatchEvent(event);
// 				});
// 				break;
// 			// case ("altKey",
// 			// "charCode",
// 			// "code",
// 			// "ctrlKey",
// 			// "getModifierState",
// 			// "isComposing",
// 			// "key",
// 			// "keyCode",
// 			// "location",
// 			// "metaKey",
// 			// "repeat",
// 			// "shiftKey",
// 			// "which"):
// 			// 	var event = document.createEvent("KeyboardEvent");
// 			// 	event.initKeyboardEvent(eventName, true, false);
// 			// 	this.dispatchEvent(event);
// 			// 	break;
// 			default:
// 				if (window.CustomEvent && typeof window.CustomEvent === "function") {
// 					var event = new CustomEvent(eventName, data);
// 				} else {
// 					var event = document.createEvent("CustomEvent");
// 					event.initCustomEvent(eventName, true, true, data);
// 				}

// 				this.each(function (item) {
// 					item.dispatchEvent(event);
// 				});
// 		}
// 		return this;
// 	};

// 	nsObject.prototype.on = function (eventName, handler) {
// 		this.each(function (item) {
// 			item.addEventListener(eventName, handler);
// 		});
// 		return this;
// 	};

// 	nsObject.prototype.off = function (eventName, handler) {
// 		this.each(function (item) {
// 			item.removeEventListener(eventName, handler);
// 		});
// 		return this;
// 	};

// 	/**
// 	 * Instantiate a new constructor
// 	 */
// 	var instantiate = function (selector) {
// 		if (typeof selector === "object" && selector.nsElems) {
// 			return selector;
// 		} else {
// 			return new nsObject(selector);
// 		}
// 		// if (typeof selector === nsObject) {
// 		// 	return selector;
// 		// } else {
// 		// 	console.log("Selector type is : " + typeof selector);
// 		//return new nsObject(selector);
// 		// }
// 	};

// 	/**
// 	 * Return the constructor instantiation
// 	 */
// 	return instantiate;
// })();

// /**
//  * UTIL function
//  */

// /**
//  * usage:$.each(array,function(item,index){});
//  * @param {*} array
//  * @param {*} callback
//  */
// $.each = function (array, callback) {
// 	array.forEach(callback);
// };

// $.proxy = function (fn, context) {
// 	fn.bind(context);
// };

// $.inArray = function (item, array) {
// 	return array.indexOf(item) > -1;
// };

// $.isArray = function (array) {
// 	return Array.isArray(array);
// };

// /**
//  * usage : $.map(array, function(value, index){});
//  */
// $.map = function (array, fn) {
// 	return array.map(fn);
// };

// $.now = function () {
// 	return Date.now;
// };

// $.type = function (obj) {
// 	return Object.prototype.toString
// 		.call(obj)
// 		.replace(/^\[object (.+)\]$/, "$1")
// 		.toLowerCase();
// };

// $.parseHTML = function (htmlString) {
// 	var tmp = document.implementation.createHTMLDocument();
// 	tmp.body.innerHTML = str;
// 	return tmp.body.children;
// };

// $.parseJSON = function (string) {
// 	return JSON.parse(string);
// };

// /**
//  * usage : $(els).slice(begin, end);
//  * this should in constructor
//  */

// $.trim = function (string) {
// 	return string.trim;
// };

// /**
//  * Extend function
//  * usage : extend({},objA,objB)
//  */
// $.extend = function (out) {
// 	out = out || {};

// 	for (var i = 1; i < arguments.length; i++) {
// 		if (!arguments[i]) continue;

// 		for (var key in arguments[i]) {
// 			if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
// 		}
// 	}

// 	return out;
// };

// /**
//  * Deep Extend function
//  * usage : extend({},objA,objB)
//  */
// $.deepExtend = function (out) {
// 	out = out || {};

// 	for (var i = 1; i < arguments.length; i++) {
// 		var obj = arguments[i];

// 		if (!obj) continue;

// 		for (var key in obj) {
// 			if (obj.hasOwnProperty(key)) {
// 				if (typeof obj[key] === "object") {
// 					if (obj[key] instanceof Array == true) out[key] = obj[key].slice(0);
// 					else out[key] = $.deepExtend(out[key], obj[key]);
// 				} else out[key] = obj[key];
// 			}
// 		}
// 	}

// 	return out;
// };

// /**
//  * Ajax CORE function
//  * @param {Object} option The options {url,[data],type,success,error}
//  */
// $.ajax = function (url, options) {
// 	function calcProgressPercent(e) {
// 		if (e.lengthComputable) {
// 			return parseInt((e.loaded / e.total) * 100, 10);
// 		} else {
// 			return 0;
// 		}
// 	}

// 	const defOption = {
// 		url: url,
// 		data: null,
// 		type: "GET",
// 		progress: false,
// 		cache: false,
// 		error: function (code, msg) {},
// 		success: function (response) {},
// 		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
// 	};

// 	options = $.extend({}, defOption, options);

// 	var request = new XMLHttpRequest();

// 	if (options.progress) {
// 		//upload
// 		request.upload.addEventListener(
// 			"progress",
// 			function (e) {
// 				opt.progress(calcProgressPercent(e));
// 			},
// 			false
// 		);

// 		//download
// 		request.addEventListener(
// 			"progress",
// 			function (e) {
// 				opt.progress(calcProgressPercent(e));
// 			},
// 			false
// 		);
// 	}

// 	request.open(options.type, options.url, true);
// 	request.onload = function () {
// 		if (this.status >= 200 && this.status < 400) {
// 			// Success!
// 			options.success(JSON.parse(this.response));
// 		} else {
// 			// We reached our target server, but it returned an error
// 			options.error(this.status, this.response);
// 		}
// 	};

// 	request.onerror = function () {
// 		// There was a connection error of some sort
// 		options.error(200, "Connection error");
// 	};

// 	if (!options.cache) {
// 		request.setRequestHeader("Cache-Control", "no-cache");
// 	}

// 	if (options.contentType) {
// 		request.setRequestHeader("Content-Type", options.contentType);
// 	}

// 	if (options.data) {
// 		request.send(options.data);
// 	} else {
// 		request.send();
// 	}
// };

// /**
//  * Get JSON
//  * @param {String} url The url to get JSON
//  * @param {Function} callback The callback function to run
//  */
// $.getJSON = function (url, callback) {
// 	$.ajax({
// 		url: url,
// 		success: function (res) {
// 			callback(res);
// 		},
// 		error: function (code, msg) {
// 			callback(null, code, msg);
// 		},
// 	});
// };
