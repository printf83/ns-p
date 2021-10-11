//simple bootstrap v5 builder
//this function help create bootstrap 5 html template using only js
//example : {tag:"div",attr:{},class:[],style:{},data:{},elems:[]}
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {
	/**
	 * ns.build.obj([])
	 */
	var fn = {
		codeprocess: function (str) {
			if (str) {
				str = str.replace(/({{).+?(}})/gi, "<code>$&</code>");
				str = str.replace(/{{/gi, "");
				str = str.replace(/}}/gi, "");
			}
			return str;
		},
		//create html from option provided using createElement DOM
		build: function (container, elems) {
			if (elems) {
				if (typeof elems === "string") {
					container.innerHTML = container.innerHTML + fn.codeprocess(elems);
					return container;
				} else {
					if (Array.isArray(elems) && elems.length > 0) {
						elems.forEach((item) => {
							if (item) {
								if (typeof item === "string") {
									container.innerHTML = container.innerHTML + fn.codeprocess(item);
								} else {
									if (item.tag) {
										var el = document.createElement(item.tag);
										el = fn.attr(el, item.id, item.attr, item.class, item.style, item.data);

										if (item.elems) {
											el = fn.build(el, item.elems);
										}

										container.appendChild(el);
									} else {
										if (item.elems) {
											container = fn.build(container, item.elems);
										}
									}
								}
							}
						});

						return container;
					} else {
						//to support if not array
						return fn.build(container, [elems]);
					}
				}
			} else {
				return container;
			}
		},

		//generate attr for html element
		attr: function (elems, id, attr, className, style, data) {
			//id
			if (id) {
				elems.setAttribute("id", id);
			}

			//attr
			if (attr) {
				Object.keys(attr).forEach((attrKey) => {
					if ((attr[attrKey] || attr[attrKey] === "") && attr[attrKey] !== null) {
						if (ns.core.isFunction(attr[attrKey])) {
							if (attrKey.startsWith("on")) {
								//{click:function} will go here
								elems.addEventListener(attrKey.startsWith("on") ? attrKey.substr(2) : attrKey, function (event) {
									attr[attrKey](event.currentTarget, event);
								});
							} else {
								elems.setAttribute(attrKey, attr[attrKey]);
							}
						} else {
							//{onclick:functionName} will go here
							elems.setAttribute(attrKey, attr[attrKey]);
						}
					}
				});
			}

			//className
			if (className && className !== null) {
				if (Array.isArray(className)) {
					var classTemp = className.combine(" ");
					if (classTemp) {
						elems.classList = classTemp;
					}
				} else {
					elems.classList = className;
				}
			}

			//style
			if (style) {
				Object.keys(style).forEach((styleKey) => {
					//console.info(`${styleKey}:${style[styleKey]}`);
					if (style[styleKey]) elems.style[styleKey] = style[styleKey];
				});
			}

			//data
			if (data) {
				Object.keys(data).forEach((dataKey) => {
					if (data[dataKey]) elems.setAttribute(`data-${dataKey}`, data[dataKey]);
				});
			}

			return elems;
		},
	};

	ns.build = {
		html: function (elems) {
			var t = document.createElement("div");

			console.time("ns.build");
			t = fn.build(t, elems);
			console.timeEnd("ns.build");

			return t.innerHTML;
		},
		obj: function (elems) {
			//create temporary container
			var t = document.createElement("div");

			//insert element to temp container
			console.time("ns.obj");
			t = fn.build(t, elems);
			console.timeEnd("ns.obj");

			//return child inside container

			return t.childNodes;
		},
		append: function (container, elems) {
			//var t = document.createElement("div");

			//insert element to temp container
			console.time("ns.append");
			if (Array.isArray(container)) {
				container[0] = fn.build(container[0], elems);
			} else {
				container = fn.build(container, elems);
			}

			console.timeEnd("ns.append");

			return container;
			// direct append element to container
			// if (Array.isArray(container)) {
			// 	container[0].appendChild(t.childNodes);
			// 	return container[0];
			// 	//return fn.build(container[0], elems);
			// } else {
			// 	container.get().appendChild(t.childNodes);
			// 	return container;
			// 	//return fn.build(container, elems);
			// }
		},
		prepend: function (container, elems) {
			console.time("ns.prepend");
			var t = ns.build.obj(elems);
			console.timeEnd("ns.prepend");

			if (t && t.length > 0) {
				if (Array.isArray(container)) {
					//ONE container must be replaced by only ONE new container
					return $(t[0]).insertBefore(container[0]);
				} else {
					//ONE container must be replaced by only ONE new container
					return $(t[0]).insertBefore(container);
				}
			} else {
				return container;
			}
		},
		replace: function (container, elems) {
			console.time("ns.replace");
			var t = ns.build.obj(elems);
			console.timeEnd("ns.replace");

			if (t && t.length > 0) {
				if (Array.isArray(container)) {
					//ONE container must be replaced by only ONE new container
					return container[0].replaceWith(t[0]);
				} else {
					//ONE container must be replaced by only ONE new container
					return container.replaceWith(t[0]);
				}
			} else {
				return container;
			}
		},
		init: function (container) {
			//** Some bootstrap element need this */

			// $(container)
			// 	.find(".nav-link[data-ns-hasbody]")
			// 	.get()
			// 	.forEach((item) => {
			// 		$(item).removeAttr("data-ns-hasbody");

			// 		new bootstrap.Tab(item);
			// 		$(item).on("click", function (event) {
			// 			event.preventDefault();
			// 			bootstrap.Tab.getInstance(item).show();
			// 		});
			// 	});

			//img
			$(container)
				.find("img[data-ns-src]")
				.get()
				.forEach((item) => {
					$(item).attr("src", $(item).attr("data-ns-src"));
					$(item).removeAttr("data-ns-src");
				});

			//tooltip
			$(container)
				.find('[data-bs-toggle="tooltip"]')
				.get()
				.forEach((item) => {
					new bootstrap.Tooltip(item);
				});

			//popover
			$(container)
				.find('[data-bs-toggle="popover"]')
				.get()
				.forEach((item) => {
					new bootstrap.Popover(item);
				});
		},
	};
})(ns);
