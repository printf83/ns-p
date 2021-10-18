"use strict";const ns = {}; //to keep ns plugins

Array.prototype.removeEmpty = function () {
	return this.filter(Boolean);
};

Array.prototype.combine = function (delimeter) {
	return this.removeEmpty().join(delimeter);
};

String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
};
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.a = function (...arg) {
		if (arg) {
			if (arg.length === 2 && typeof arg[0] === "string" && typeof arg[1] === "string") {
				return ns.a({
					label: arg[0],
					href: arg[1],
				});
			} else if (arg.length === 2 && typeof arg[0] === "string" && ns.core.isFunction(arg[1])) {
				return ns.a({
					label: arg[0],
					onclick: arg[1],
				});
			} else if (arg.length === 1 && typeof arg[0] === "string") {
				return ns.a({
					label: arg[0],
				});
			} else if (arg.length === 1 && typeof arg[0] === "object") {
				var opt = arg[0];

				opt = $.extend(
					{},
					{
						id: null,
						style: null,
						class: null,
						color: null,
						onclick: null,
						href: "javascript:void(0)",
						icon: null,
						label: null,
						elems: null,
						// title: null,
						tooltip: null,
						// tooltipplace: null,
					},
					opt
				);

				if (opt.title) {
					console.warn("A has title");
				}

				return ns.tooltip(opt.tooltip, {
					ns:1,
					tag: "a",
					class: [opt.color ? `link-${opt.color}` : null, opt.class ? opt.class : null],
					attr: {
						id: opt.id,
						href: opt.href ? opt.href : null,
						onclick: opt.onclick ? opt.onclick : null,
					},
					style: opt.style,
					elems: opt.elems
						? opt.elems
						: [
								opt.icon ? ns.icon(opt.icon) : null,
								opt.label
									? {
											tag: "span",
											class: opt.icon ? "ms-2" : null,
											elems: opt.label,
									  }
									: null,
						  ].removeEmpty(),
				});
			} else {
				console.error("Unsupported argument");
			}
		} else {
			console.error("Unsupported argument");
		}
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.accordion = function (opt) {
		opt = $.extend(
			{},
			{
				id: null,
				flush: false,
				autoclose: true,
				item: null,
			},
			opt
		);

		if (Array.isArray(opt.item)) {
			opt.id = opt.id ? opt.id : ns.core.UUID();

			//check if any item active
			var activeitem = opt.item.find((obj) => {
				return obj.active === true;
			});

			if (!activeitem) {
				opt.item[0].active = true;
			}

			return ns.div(
				["accordion", opt.flush ? "accordion-flush" : null],
				{ id: opt.id },
				opt.item.map(function (x, ix) {
					x = $.extend(
						{},
						{
							id: null,
							label: null,
							icon: null,
							active: false,
							elems: null,
						},
						x
					);

					x.id = x.id ? x.id : ns.core.UUID();
					return ns.div("accordion-item", [
						ns.div({
							tag: "h2",
							class: "accordion-header",
							attr: { id: `${x.id}-head` },
							elems: {
								tag: "button",
								class: ["accordion-button", x.active ? null : "collapsed"],
								attr: {
									type: "button",
									"data-bs-toggle": "collapse",
									"data-bs-target": `#${x.id}-body`,
									"aria-expanded": x.active ? "true" : "false",
									"aria-controls": `${x.id}-body`,
								},
								elems:
									x.label || x.icon
										? [
												x.icon ? ns.icon(x.icon) : null,
												x.icon
													? { tag: "span", class: "ms-2", elems: x.label }
													: x.label,
										  ]
										: null,
							},
						}),
						ns.div(
							["accordion-collapse", "collapse", x.active ? "show" : null],
							{
								id: `${x.id}-body`,
								"aria-labelledby": `${x.id}-head`,
								"data-bs-parent": opt.autoclose ? `#${opt.id}` : null,
							},
							ns.div("accordion-body", x.elems)
						),
					]);
				})
			);
		} else {
			return null;
		}
	};
})(ns);
//simple ajax
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	const options = {
		name: null,
		sender: null,
		data: null,
		dataType: null,
		cache: true,
		contentType: "application/json",
	};

	const optionsmultipart = {
		url: "",
		obj: null,
		sender: null,
		progress: null,
	};

	var fn = {
		ajax: function (opt) {
			opt = $.extend({}, options, opt);

			return new Promise((res, rej) => {
				$.ajax(`./api/${opt.name}`, {
					async: true,
					cache: opt.cache,
					type: opt.type,
					dataType: opt.data ? opt.dataType : null,
					contentType: opt.data ? opt.contentType : null,
					data: opt.data ? JSON.stringify(opt.data) : null,
					success: (data) => {
						res(data);
					},
					error: (err) => {
						rej(err.responseText ? err.responseText : err.statusText ? err.statusText : "Error");
					},
				});
			});
		},
		ajaxMultipart(opt) {
			opt = $.extend({}, optionsmultipart, opt);

			return new Promise((res, rej) => {
				var data = new FormData();

				var index = 0;
				for (var x = 0; x < opt.obj.length; x++) {
					for (var y = 0; y < $(opt.obj[x]).length; y++) {
						for (var z = 0; z < $(opt.obj[x])[y].files.length; z++) {
							data.append("file", $(opt.obj[x])[y].files[z]);
							index = index + 1;
						}
					}
				}

				$.ajax({
					xhr: () => {
						var xhr = new window.XMLHttpRequest();

						//upload
						xhr.upload.addEventListener(
							"progress",
							function (evt) {
								if (evt.lengthComputable) {
									if (typeof opt.progress === "function") {
										var percentComplete = parseInt((evt.loaded / evt.total) * 100, 10);
										opt.progress(percentComplete);
									}
								}
							},
							false
						);

						return xhr;
					},
					url: "./api/file",
					data: data,
					async: opt.async,
					cache: opt.cache,
					contentType: false,
					processData: false,
					type: "POST",
					success: (data) => {
						res(data);
					},
					error: (err) => {
						rej(err.responseText ? err.responseText : err.statusText ? err.statusText : "Error");
					},
				});
			});
		},
		ajaxDownload: function (opt) {
			return new Promise((res, rej) => {
				try {
					window.location = `./api/${opt.name}?q=${JSON.stringify(opt.data)}`;
					res(true);
				} catch (ex) {
					rej(ex);
				}
			});
		},
	};

	ns.api = {
		get: (opt) => {
			opt = $.extend({}, { type: "GET" }, opt);
			return fn.ajax(opt);
		},
		post: (opt) => {
			opt = $.extend({}, { type: "POST" }, opt);
			return fn.ajax(opt);
		},
		put: (opt) => {
			opt = $.extend({}, { type: "PUT" }, opt);
			return fn.ajax(opt);
		},
		delete: (opt) => {
			opt = $.extend({}, { type: "DELETE" }, opt);
			return fn.ajax(opt);
		},
		upload: (opt) => {
			return fn.ajaxMultipart(opt);
		},
		download: (opt) => {
			opt = $.extend({}, { type: "GET" }, opt);
			return fn.ajaxDownload(opt);
		},
		option: (opt) => {
			opt = $.extend(
				{},
				{
					db: null,
					sender: null,
					emptylabel: null,
					fieldkey: "_id",
					fieldname: "name",
				},
				opt
			);

			return new Promise((res, rej) => {
				if (opt.db) {
					ns.api
						.post({
							sender: opt.sender,
							name: `list/${opt.db}`,
							data: { field: { [opt.fieldkey]: 1, [opt.fieldname]: 1 }, sort: { [opt.fieldname]: 1 } },
						})
						.then((result) => {
							var tmp = result.data
								? result.data.map((i) => {
										return {
											value: i[opt.fieldkey],
											label: i[opt.fieldname],
										};
								  })
								: [];

							if (opt.emptylabel !== null) {
								tmp.unshift({ value: "", label: opt.emptylabel });
							}

							res(tmp);
						})
						.catch((err) => {
							rej(err);
						});
				} else {
					rej("Database name required");
				}
			});
		},
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	var alertmsg = function (...arg) {
		if (arg && arg.length > 0) {
			var msg = null;
			var icon = null;

			if (arg.length === 1) {
				msg = arg[0];
			} else if (arg.length > 1) {
				icon = arg[0];
				msg = arg[1];
			}

			if (icon) {
				var si = ns.sIcon(icon);
				if (si) {
					return {
						color: si.color,
						textcolor: si.textcolor,
						elems: ns.div("row g-0", [
							ns.div(
								"col-auto align-self-start me-3",
								ns.icon({
									icon: si.icon,
									size: "lg",
								})
							),
							ns.div("col align-self-center", msg),
						]),
					};
				} else {
					return {
						textcolor: null,
						color: icon,
						elems: msg,
					};
				}
			} else {
				return {
					textcolor: null,
					color: null,
					elems: msg,
				};
			}
		}
	};

	ns.alert = {
		container: function (...arg) {
			if (arg && arg.length === 2) {
				var i = alertmsg(arg[0], arg[1]);
				return ns.alert.container({
					color: i?.color,
					elems: i?.elems,
				});
			} else if (arg && arg.length === 1 && typeof arg === "object") {
				var opt = $.extend(
					{},
					{
						id: null,
						class: null,
						dismissible: false,
						animation: true,
						color: null,
						elems: null,
					},
					arg[0]
				);

				//generate id
				opt.id = opt.id ? opt.id : ns.core.UUID();

				return ns.div(
					[
						"alert",
						opt.color ? `alert-${opt.color}` : null,
						opt.dismissible ? "alert-dismissible show" : null,
						opt.animation && opt.dismissible ? "fade" : null,
						opt.class,
					],
					{ id: opt.id, role: "alert" },
					[
						ns.div(Array.isArray(opt.elems) ? opt.elems : [opt.elems]),
						opt.dismissible
							? {
									tag: "button",
									class: "btn-close",
									attr: { "data-bs-dismiss": "alert", "aria-label": "Close" },
							  }
							: null,
					]
				);
			} else {
				console.error("Unsupported argument");
			}
		},
		link: function (text, url) {
			return {
				tag: "a",
				class: "alert-link",
				attr: {
					href: url ? url : "javascript:void",
				},
				elems: text,
			};
		},
		header: function (text) {
			return {
				tag: "h4",
				class: "heading",
				elems: text,
			};
		},
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.badge = function (opt) {
		if (typeof opt === "object") {
			opt = $.extend(
				{},
				{
					id: null,
					class: null,
					label: null,
					pill: false,
					notification: false,
					color: "secondary",
					border: null,
					darktext: false,
					asst: null,
					tooltip: null,
					tooltipplace: null,
				},
				opt
			);

			return {
				tag: "span",
				class: [
					"badge",
					opt.class ? opt.class : null,
					opt.color ? `bg-${opt.color}` : null,
					opt.darktext ? "text-dark" : null,
					opt.pill ? "rounded-pill" : null,
					opt.notification ? "position-absolute top-0 start-100 translate-middle" : null,
					opt.notification && !opt.label ? "p-2" : null,
					opt.border ? `border border-${opt.border}` : null,
					opt.label ? null : "rounded-circle",
				],
				attr: { id: opt.id },
				elems: [opt.label ? opt.label.toString() : "", opt.asst ? { tag: "span", class: "visually-hidden", elems: opt.asst } : null],
			};
		} else {
			return ns.badge({
				label: opt,
			});
		}
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.breadcrumb = function (opt) {
		if (typeof opt === "object") {
			opt = $.extend(
				{},
				{
					id: null,
					class: null,
					item: null,
					divider:
						"url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);" /** "''","'/'", "'>'" */,
				},
				opt
			);

			//gen id
			opt.id = opt.id ? opt.id : ns.core.UUID();

			var li = null;

			if (opt.item) {
				if (!Array.isArray(opt.item)) {
					opt.item = [opt.item];
				}

				li = opt.item.map(function (i, ix) {
					if (typeof i !== "object") {
						i = {
							label: i,
						};
					}

					i = $.extend(
						{},
						{
							href: null,
							label: null,
							active: false,
						},
						i
					);

					return {
						tag: "li",
						class: ["breadcrumb-item", i.active ? "active" : null],
						attr: { "aria-current": i.active ? "page" : null },
						elems: i.active
							? i.label
							: {
									tag: "a",
									attr: { href: i.href ? i.href : "javascript:void(0)", onclick: i.onclick },
									elems: i.label,
							  },
					};
				});
			}

			return {
				tag: "nav",
				class: opt.class,
				attr: {
					id: opt.id,
					"aria-label": "breadcrumb",
					style: opt.divider ? `--bs-breadcrumb-divider: ${opt.divider};` : null,
				},
				elems: {
					tag: "ol",
					class: "breadcrumb",
					elems: li,
				},
			};
		} else {
			return ns.breadcrumb({
				items: opt,
			});
		}
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.btngroup = function (opt) {
		if (Array.isArray(opt) || typeof opt === "string") {
			return ns.btngroup({ elems: opt });
		} else {
			opt = $.extend(
				{},
				{
					class: null,
					label: null,
					elems: null,
					vertical: false,
					weight: null,
				},
				opt
			);

			return ns.div(
				[
					opt.vertical ? "btn-group-vertical" : "btn-group",
					opt.weight ? `btn-group-${opt.weight}` : null,
					opt.class ? opt.class : null,
				],
				{ role: "group", "aria-label": opt.label ? opt.label : null },
				opt.elems
			);
		}
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.btntoolbar = function (opt) {
		if (Array.isArray(opt) || typeof opt === "string") {
			return ns.btntoolbar({ elems: opt });
		} else {
			opt = $.extend(
				{},
				{
					class: null,
					label: null,
					gap: 2,
					elems: null,
				},
				opt
			);

			return ns.div(
				["btn-toolbar", opt.gap ? `gap-${opt.gap}` : null, opt.class],
				{ role: "toolbar", "aria-label": opt.label ? opt.label : null },
				opt.elems
			);
		}
	};
})(ns);
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
						//remove empty array
						elems = elems.removeEmpty();
						if (elems.length > 0) {
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
						}

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
								elems.addEventListener(
									attrKey.startsWith("on") ? attrKey.substr(2) : attrKey,
									function (event) {
										attr[attrKey](event.currentTarget, event);
									}
								);
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
					if (style[styleKey] && style[styleKey] !== null) {
						// console.info(`${styleKey}:${style[styleKey]}`);
						elems.style[styleKey] = style[styleKey];
					}
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
		html: function (elems, debug) {
			var t = document.createElement("div");

			if (debug) console.time("ns.build");

			t = fn.build(t, elems);

			if (debug) console.timeEnd("ns.build");

			return t.innerHTML;
		},
		obj: function (elems, debug) {
			//create temporary container
			var t = document.createElement("div");

			//insert element to temp container
			if (debug) console.time("ns.obj");

			t = fn.build(t, elems);

			if (debug) console.timeEnd("ns.obj");

			//return child inside container

			return t.childNodes;
		},
		append: function (container, elems, debug) {
			//var t = document.createElement("div");

			//insert element to temp container
			if (debug) console.time("ns.append");

			if (Array.isArray(container)) {
				container[0] = fn.build(container[0], elems);
			} else {
				container = fn.build(container, elems);
			}

			if (debug) console.timeEnd("ns.append");

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
		prepend: function (container, elems, debug) {
			if (debug) console.time("ns.prepend");

			var t = ns.build.obj(elems);

			if (debug) console.timeEnd("ns.prepend");

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
		replace: function (container, elems, debug) {
			if (debug) console.time("ns.replace");

			var t = ns.build.obj(elems);

			if (debug) console.timeEnd("ns.replace");

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
		init: function (container, debug) {
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
			if (debug) console.time("ns.init");

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

			if (debug) console.timeEnd("ns.init");
		},
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.button = function (opt) {
		if (opt) {
			if (typeof opt === "string") {
				return ns.button({
					label: opt,
				});
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						name: null,
						class: null,
						style: null,
						label: null,
						labelshow: null,
						nowarp: false,
						value: null,
						checked: false,
						disabled: false,
						size: null,
						weight: null,
						onclick: null,
						href: null,
						icon: null,
						largeicon: false,
						outline: false,
						border: true,
						rounded: true,
						color: null,
						textcolor: null,
						type: "button",
						data: null,
						badge: null,
						relativeposition: false,
						asst: null,
						hascontainer: true,
						tooltip: null,
					},
					opt
				);

				if (opt.option) {
					console.warn("Button has option");
				}

				//generate id
				opt.id = opt.id ? opt.id : ns.core.UUID();

				var res = [];

				//create icon
				if (opt.icon) {
					res.push({
						tag: opt.largeicon ? "span" : null,
						class: opt.largeicon ? ["d-md-block h4-md", opt.label ? "mb-0" : null].combine(" ") : null,
						elems: ns.icon(opt.icon),
					});
				}

				//create span for label
				if (opt.label) {
					res.push(
						ns.span(
							[
								opt.icon && !opt.largeicon ? "ms-2" : null,
								opt.icon && opt.largeicon ? "ms-2 ms-md-0" : null,
								(opt.option && !opt.segmenttoggle) || opt.badge ? "me-2" : null,
								opt.labelshow ? `d-none d-${opt.labelshow}-inline` : null,
							],
							opt.label
						)
					);
				}

				//asst
				if (opt.asst) {
					res.push({ tag: "span", class: "visually-hidden", elems: opt.asst });
				}

				//badge
				if (opt.badge) {
					res.push(ns.badge(opt.badge));
				}

				//wrap in button.btn

				if (opt.type === "checkbox" || opt.type === "radio") {
					res = [
						{
							tag: "input",
							class: "btn-check",
							attr: {
								id: opt.id,
								autocomplete: "off",
								type: opt.type,
								name: opt.name,
								checked: opt.checked ? "" : null,
								disabled: !opt.href ? opt.disabled : null,
								"aria-disabled": opt.href && opt.disabled ? "true" : null,
							},
						},
						opt.label || opt.icon
							? ns.tooltip(opt.tooltip, {
									tag: "label",
									class: [
										"btn",
										opt.nowarp ? "text-nowarp" : null,
										// opt.active ? "active" : null,
										opt.rounded ? null : "rounded-0",
										opt.border ? null : "border-0",
										opt.outline ? `btn-outline-${opt.color}` : null,
										opt.color && !opt.outline ? `btn-${opt.color}` : null,
										opt.textcolor ? `text-${opt.textcolor}` : null,
										opt.class ? opt.class : null,
										opt.size ? `btn-${opt.size}` : null,
										opt.weight ? `btn-${opt.weight}` : null,
										opt.href && opt.disabled ? "disabled" : null,
									],
									data: opt.data,
									attr: {
										for: opt.id,
									},
									style: opt.style,
									elems: res.slice(),
							  })
							: null,
					]; //todo:
				} else {
					if (opt.segmenttoggle) {
						res = [
							ns.tooltip(opt.tooltip, {
								tag: opt.href ? "a" : "button",
								class: [
									"btn",
									opt.nowarp ? "text-nowarp" : null,
									// opt.active ? "active" : null,
									opt.rounded ? null : "rounded-0",
									opt.border ? null : "border-0",
									opt.outline ? `btn-outline-${opt.color}` : null,
									opt.color && !opt.outline ? `btn-${opt.color}` : null,
									opt.textcolor ? `text-${opt.textcolor}` : null,
									opt.class ? opt.class : null,
									opt.size ? `btn-${opt.size}` : null,
									opt.weight ? `btn-${opt.weight}` : null,
									opt.href && opt.disabled ? "disabled" : null,
								],
								data: opt.data,
								attr: {
									type: opt.type,
									disabled: !opt.href ? opt.disabled : null,
									"aria-disabled": opt.href && opt.disabled ? "true" : null,
									// title: opt.tooltip ? opt.tooltip : null,
									href: opt.href,
								},
								style: opt.style,
								elems: res.slice(),
							}),
							{
								tag: "button",
								class: [
									"btn",
									opt.nowarp ? "text-nowarp" : null,
									// opt.active ? "active" : null,
									opt.rounded ? null : "rounded-0",
									opt.border ? null : "border-0",
									// opt.option && (opt.optionarrow === null || opt.optionarrow === true) ? "dropdown-toggle dropdown-toggle-split" : null,
									opt.outline ? `btn-outline-${opt.color}` : null,
									opt.color && !opt.outline ? `btn-${opt.color}` : null,
									opt.textcolor ? `text-${opt.textcolor}` : null,
									opt.class ? opt.class : null,
									opt.size ? `btn-${opt.size}` : null,
									opt.weight ? `btn-${opt.weight}` : null,
									opt.relativeposition ? "position-relative" : null,
								],
								data: opt.data,
								attr: {
									id: opt.id,
									name: opt.name,
									type: opt.type,
									disabled: opt.disabled,
									onclick: opt.onclick,
								},
								style: opt.style,
								elems: {
									tag: "span",
									class: "visually-hidden",
									elems: "Toggle Dropdown",
								},
							},
						];
					} else {
						res = [
							ns.tooltip(opt.tooltip, {
								// ns: 1,
								tag: opt.href ? "a" : "button",
								class: [
									"btn",
									opt.nowarp ? "text-nowarp" : null,
									// opt.active ? "active" : null,
									opt.rounded ? null : "rounded-0",
									opt.border ? null : "border-0",
									// opt.option && (opt.optionarrow === null || opt.optionarrow === true) ? "dropdown-toggle" : null,
									opt.outline ? `btn-outline-${opt.color}` : null,
									opt.color && !opt.outline ? `btn-${opt.color}` : null,
									opt.textcolor ? `text-${opt.textcolor}` : null,
									opt.class ? opt.class : null,
									opt.size ? `btn-${opt.size}` : null,
									opt.weight ? `btn-${opt.weight}` : null,
									opt.relativeposition ? "position-relative" : null,
									opt.href && opt.disabled ? "disabled" : null,
								],
								data: opt.data,
								attr: {
									id: opt.id,
									name: opt.name,
									type: opt.type,
									disabled: !opt.href ? opt.disabled : null,
									"aria-disabled": opt.href && opt.disabled ? "true" : null,
									onclick: opt.onclick,
									href: opt.href,
								},
								elems: res.slice(),
							}),
						];
					}
				}

				if (res && typeof res === "object") {
					if (Array.isArray(res)) {
						if (res.length === 1) {
							return res[0];
						} else {
							// console.log(res);
							// console.warn(`btn #${opt.id} has many element`);
							return {
								// ns: 1,
								elems: res,
							};
						}
					} else {
						return res;
					}
				} else {
					// console.log(res);
					// console.warn(`btn #${opt.id} has many element`);
					return {
						// ns: 1,
						elems: res,
					};
				}
			}
		}
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.card = {
		container: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.card.container({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						class: null,
						style: null,
						elems: null,
						align: null, //left,right,center
						color: null,
						textcolor: null,
						bordercolor: null,
						border: true,
					},
					opt
				);

				return ns.div(
					[
						"card",
						opt.class,
						opt.align ? `text-${opt.align}` : null,
						opt.color ? `bg-${opt.color}` : null,
						opt.textcolor ? `text-${opt.textcolor}` : null,
						opt.bordercolor ? `border-${opt.bordercolor}` : null,
						!opt.border ? "border-0" : null,
					],
					null,
					opt.style,
					opt.elems
				);
			}
		},
		header: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.card.header({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						elems: null,
						color: null,
						textcolor: null,
						bordercolor: null,
					},
					opt
				);

				return ns.div(
					[
						"card-header",
						opt.class,
						opt.color ? `bg-${opt.color}` : null,
						opt.textcolor ? `text-${opt.textcolor}` : null,
						opt.bordercolor ? `border-${opt.bordercolor}` : null,
					],
					opt.elems
				);
			}
		},
		body: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.card.body({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						elems: null,
						textcolor: null,
					},
					opt
				);

				return ns.div(
					["card-body", opt.textcolor ? `text-${opt.textcolor}` : null, opt.class],
					opt.elems
				);
			}
		},
		footer: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.card.footer({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						muted: true,
						color: null,
						textcolor: null,
						bordercolor: null,
						elems: null,
					},
					opt
				);

				return ns.div(
					[
						"card-footer",
						opt.class,
						opt.muted ? "text-muted" : null,
						opt.color ? `bg-${opt.color}` : null,
						opt.textcolor ? `text-${opt.textcolor}` : null,
						opt.bordercolor ? `border-${opt.bordercolor}` : null,
					],
					opt.elems
				);
			}
		},
		group: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.card.group({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						elems: null,
						textcolor: null,
					},
					opt
				);

				return ns.div(
					["card-group", opt.textcolor ? `text-${opt.textcolor}` : null, opt.class],
					opt.elems
				);
			}
		},

		title: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.card.title({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						elems: null,
						textcolor: null,
					},
					opt
				);

				return {
					tag: "h5",
					class: [
						"card-title",
						opt.textcolor ? `text-${opt.textcolor}` : null,
						opt.class,
					],
					elems: opt.elems,
				};
			}
		},

		subtitle: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.card.subtitle({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						elems: null,
						muted: true,
						textcolor: null,
					},
					opt
				);

				return {
					tag: "h6",
					class: [
						"card-subtitle mb-2",
						opt.class,
						opt.textcolor ? `text-${opt.textcolor}` : null,
						opt.muted ? "text-muted" : null,
					],
					elems: opt.elems,
				};
			}
		},

		link: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.card.subtitle({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						elems: null,
						href: "javascript:void(0)",
						onclick: null,
					},
					opt
				);

				return {
					tag: "a",
					class: ["card-link", opt.class],
					attr: {
						href: opt.href ? opt.href : null,
						onclick: opt.onclick ? opt.onclick : null,
					},
					elems: opt.elems,
				};
			}
		},

		text: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.card.text({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						elems: null,
						textcolor: null,
					},
					opt
				);

				return {
					tag: "p",
					class: ["card-text", opt.textcolor ? `text-${opt.textcolor}` : null, opt.class],
					elems: opt.elems,
				};
			}
		},

		textsmall: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.card.textsmall({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						muted: true,
						elems: null,
						textcolor: null,
					},
					opt
				);

				return {
					tag: "p",
					class: [
						"card-text",
						opt.muted ? "text-muted" : null,
						opt.textcolor ? `text-${opt.textcolor}` : null,
						opt.class,
					],
					elems: {
						tag: "small",
						elems: opt.elems,
					},
				};
			}
		},

		img: function (opt) {
			if (typeof opt === "string") {
				return ns.card.img({ src: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						placement: "top", //top|bottom|full|left|right
						src: null,
						alt: null,
					},
					opt
				);

				return {
					tag: "img",
					class: [
						opt.class,
						opt.placement === "full" ? "card-img" : null,
						opt.placement === "top" ? "card-img-top" : null,
						opt.placement === "bottom" ? "card-img-bottom" : null,
						opt.placement === "left" ? "img-fluid rounded-start" : null,
						opt.placement === "right" ? "img-fluid rounded-end" : null,
					],
					attr: { src: opt.src ? opt.src : null, alt: opt.alt ? opt.alt : null },
				};
			}
		},

		imgoverlay: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.card.imgoverlay({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						elems: null,
						textcolor: null,
					},
					opt
				);

				return ns.div(
					["card-img-overlay", opt.textcolor ? `text-${opt.textcolor}` : null, opt.class],
					opt.elems
				);
			}
		},

		horizontal: function (opt) {
			opt = $.extend(
				{},
				{
					size: "col-md-4",
					left: null,
					right: null,
					textcolor: null,
					gap: "0",
				},
				opt
			);

			return ns.div(
				[
					"row",
					opt.textcolor ? `text-${opt.textcolor}` : null,
					opt.gap ? `g-${opt.gap}` : null,
				],
				[ns.div(opt.size, opt.left), ns.div("col", opt.right)]
			);
		},
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.carousel = function (opt) {
		if (typeof opt === "string") {
			return ns.carousel([opt]);
		} else if (Array.isArray(opt)) {
			return ns.carousel({
				item: opt,
			});
		} else {
			opt = $.extend(
				{},
				{
					id: null,
					class: null,
					style: null,
					control: false,
					touch: true,
					slide: true,
					fade: false,
					indicators: false,
					dark: false,
					item: null,
				},
				opt
			);

			if (opt.item && opt.item.length > 0) {
				opt.id = opt.id || ns.core.UUID();

				return ns.div(
					[
						"carousel",
						opt.slide ? "slide" : null,
						opt.fade ? "carousel-fade" : null,
						opt.dark ? "carousel-dark" : null,
						opt.class,
					],
					{
						id: opt.id,
						"data-bs-ride": "carousel",
						"data-bs-touch": !opt.touch ? "false" : null,
						"data-bs-interval": !opt.touch ? "false" : null,
					},
					opt.style,
					[
						opt.indicators
							? ns.div(
									"carousel-indicators",
									opt.item.map(function (i, ix) {
										if (typeof i === "string") {
											i = {
												src: i,
											};
										}

										i = $.extend(
											{},
											{
												class: null,
												src: null,
												alt: null,
												caption: null,
												text: null,
												interval: 0,
											},
											i
										);

										return {
											tag: "button",
											class: [ix === 0 ? "active" : null].removeEmpty(),
											attr: {
												type: "button",
												"aria-current": ix === 0 ? "true" : null,
												"aria-label": i.caption
													? i.caption
													: i.alt
													? i.alt
													: `Slide ${ix + 1}`,
												"data-bs-slide-to": `${ix}`,
												"data-bs-target": `${opt.id}`,
											},
										};
									})
							  )
							: null,
						ns.div(
							"carousel-inner",
							opt.item.map(function (i, ix) {
								if (typeof i === "string") {
									i = {
										src: i,
									};
								}

								i = $.extend(
									{},
									{
										class: null,
										src: null,
										alt: null,
										caption: null,
										text: null,
										interval: 0,
									},
									i
								);

								return ns.div(
									["carousel-item", ix === 0 ? "active" : null],
									{
										"data-bs-interval":
											i.interval && opt.touch ? i.interval : null,
									},
									[
										{
											tag: "img",
											class: ["d-block w-100", i.class],
											attr: {
												alt: i.alt ? i.alt : i.caption ? i.caption : null,
												src: i.src,
											},
										},
										i.caption || i.text
											? ns.div(
													"carousel-caption d-none d-md-block",
													[
														i.caption
															? { tag: "h5", elems: i.caption }
															: null,
														i.text ? { tag: "p", elems: i.text } : null,
													].removeEmpty()
											  )
											: null,
									]
								);
							})
						),

						opt.control
							? {
									tag: "button",
									class: "carousel-control-prev",
									attr: {
										type: "button",
										"data-bs-target": `#${opt.id}`,
										"data-bs-slide": "prev",
									},
									elems: [
										{
											tag: "span",
											class: "carousel-control-prev-icon",
											attr: { "aria-hidden": "true" },
										},
										{
											tag: "span",
											class: "visually-hidden",
											elems: "Previous",
										},
									],
							  }
							: null,
						opt.control
							? {
									tag: "button",
									class: "carousel-control-next",
									attr: {
										type: "button",
										"data-bs-target": `#${opt.id}`,
										"data-bs-slide": "next",
									},
									elems: [
										{
											tag: "span",
											class: "carousel-control-next-icon",
											attr: { "aria-hidden": "true" },
										},
										{ tag: "span", class: "visually-hidden", elems: "Next" },
									],
							  }
							: null,
					]
				);
			}
		}
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.close = function (opt) {
		opt = $.extend(
			{},
			{
				id: null,
				class: null,
				white: false,
				disabled: false,
			},
			opt
		);

		return {
			tag: "button",
			class: ["btn-close", opt.white ? "btn-close-white" : null, opt.class],
			data: opt.data,
			attr: {
				id: opt.id,
				type: "button",
				disabled: opt.disabled ? "" : null,
				"aria-label": "Close",
			},
		};
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.collapse = {
		toggle: function (opt) {
			opt = $.extend(
				{},
				{
					target: null,
					active: false,

					id: null,
					label: null,
					icon: null,
					class: null,

					color: null,
					textcolor: null,
					outline: false,
					disabled: false,
					nowarp: false,
					rounded: true,
					border: true,
					size: null,
					weight: null,
				},
				opt
			);

			if (opt.target) {
				return {
					tag: "button",
					class: [
						"btn",
						opt.nowarp ? "text-nowarp" : null,
						opt.rounded ? null : "rounded-0",
						opt.border ? null : "border-0",
						opt.outline ? `btn-outline-${opt.color}` : null,
						opt.color && !opt.outline ? `btn-${opt.color}` : null,
						opt.textcolor ? `text-${opt.textcolor}` : null,
						opt.class ? opt.class : null,
						opt.size ? `btn-${opt.size}` : null,
						opt.weight ? `btn-${opt.weight}` : null,
					],
					attr: {
						id: opt.id,
						type: "button",
						disabled: opt.disabled ? "" : null,
						"aria-controls": opt.target,
						"aria-expanded": opt.active ? "true" : "false",
						"data-bs-target": opt.target,
						"data-bs-toggle": "collapse",
					},
					elems: [
						opt.icon ? ns.icon(opt.icon) : null,
						opt.label
							? {
									tag: "span",
									class: opt.icon ? "ms-2" : null,
									elems: opt.label,
							  }
							: null,
					],
				};
			} else {
				console.error("ns.collapse.toggle target not provided");
			}
		},
		container: function (opt) {
			if (opt) {
				if (Array.isArray(opt)) {
					return ns.collapse.container({
						elems: opt,
					});
				} else if (typeof opt === "object") {
					opt = $.extend(
						{},
						{
							id: null,
							class: null,
							elems: null,
						},
						opt
					);

					//generate id
					opt.id = opt.id ? opt.id : ns.core.UUID();

					return ns.div(["collapse", opt.class], { id: opt.id }, opt.elems);
				} else {
					console.error("Unsupported argument");
				}
			} else {
				console.error("Unsupported argument");
			}
		},
	};
})(ns);
//container generator
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {
	ns.cont = {
		singlecolumn: function (elems) {
			return ns.div(
				"container-fluid p-0",
				ns.div(
					"row row-cols-1 g-2",
					Array.isArray(elems)
						? elems.map(function (i) {
								return ns.div("col", i);
						  })
						: ns.div("col", elems)
				)
			);
		},
		stack: function (elems) {
			return ns.div(
				"container-fluid p-0",
				ns.div(
					"row row-cols-auto g-2",
					Array.isArray(elems)
						? elems.map(function (i) {
								return ns.div("col", i);
						  })
						: ns.div("col", elems)
				)
			);
		},
	};
})(ns);
//core function that used on other js file
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {
	ns.core = {
		errorHandler: function (err) {
			if (err) {
				console.error(err);
			}
		},
		copyToClipboard: function (str, msg) {
			navigator.clipboard.writeText(str);
			ns.toast("/", msg ? msg : "Copied to clipboard");
		},
		theme: function (theme) {
			var elem = document.getElementById("nstheme");
			if (theme) {
				elem.href = `https://cdn.jsdelivr.net/npm/bootswatch@5.1.1/dist/${theme}/bootstrap.min.css`;
				elem.removeAttribute("disabled");
			} else {
				elem.setAttribute("disabled", "disabled");
			}
		},
		// themeEditor: function () {
		// 	ns.dlg
		// 		.inputbox(
		// 			ns.input({
		// 				type: "select",
		// 				name: "value",
		// 				tooltip: {
		// 					type: "popover",
		// 					msg: "Hello World",
		// 				},
		// 				option: [
		// 					{ value: "", label: "Please choose one" },
		// 					{ value: "cerulean", label: "cerulean (L|G)" },
		// 					{ value: "cosmo", label: "cosmo (L|S)" },
		// 					{ value: "cyborg", label: "cyborg (D|S)" },
		// 					{ value: "darkly", label: "❤️ darkly (D|S)" },
		// 					{ value: "flatly", label: "flatly (L|S)" },
		// 					{ value: "journal", label: "journal (L|S)" },
		// 					{ value: "litera", label: "❤️ litera (L|S)" },
		// 					{ value: "lumen", label: "❤️❤️ lumen (L|S)" },
		// 					{ value: "lux", label: "lux (L|S)" },
		// 					{ value: "materia", label: "materia (L|G)" },
		// 					{ value: "minty", label: "minty (L|S)" },
		// 					{ value: "morph", label: "❤️ morph (L|G)" },
		// 					{ value: "pulse", label: "pulse (L|S)" },
		// 					{ value: "quartz", label: "❤️❤️❤️ quartz (D|G)" },
		// 					{ value: "sandstone", label: "sandstone (L|S)" },
		// 					{ value: "simplex", label: "simplex (L|G)" },
		// 					{ value: "sketchy", label: "❤️ sketchy (L|S)" },
		// 					{ value: "slate", label: "slate (D|G)" },
		// 					{ value: "solar", label: "solar (D|S)" },
		// 					{ value: "spacelab", label: "spacelab (L|G)" },
		// 					{ value: "superhero", label: "superhero (D|S)" },
		// 					{ value: "united", label: "united (L|S)" },
		// 					{ value: "vapor", label: "vapor (D|G)" },
		// 					{ value: "yeti", label: "❤️ yeti (L|S)" },
		// 					{ value: "zephyr", label: "❤️ zephyr (L|S)" },
		// 				],
		// 			}),
		// 			"Choose Theme",
		// 			"okaycancel"
		// 		)
		// 		.then((theme) => {
		// 			if (theme) {
		// 				ns.core.theme(theme.value);
		// 			} else {
		// 				return Promise.reject();
		// 			}
		// 		}, ns.core.errorHandler);
		// },
		multipleClassSupport: function (val, format) {
			//example
			//ns.core.multipleClassSupport(["lg","sm","md"],"text-$1")
			return val
				? Array.isArray(val)
					? val
							.map(function (i) {
								return format.replace("$1", i);
							})
							.join(" ")
					: format.replace("$1", val)
				: null;
		},
		isFunction: function (fn) {
			//return fn && {}.toString.call(fn) === "[object Function]";
			return fn instanceof Function;
		},
		createEnum: function (values) {
			const enumObject = {};

			if (Array.isArray(values)) {
				for (const val of values) {
					if (typeof val === "string") {
						enumObject[ns.core.camelCase(val)] = val;
					} else if (typeof val === "object") {
						if (val.hasPropety("key")) {
							if (val.hasPropety("value")) {
								enumObject[ns.core.camelCase(val.key)] = val.value;
							} else {
								enumObject[ns.core.camelCase(val.key)] = val;
							}
						}
					} else {
						enumObject[`_${ns.core.camelCase(val)}`] = val;
					}
				}
			} else if (typeof values === "object") {
				Object.keys(values).forEach((key) => {
					enumObject[ns.core.camelCase(key)] = value[key];
				});
			}

			return Object.freeze(enumObject);
		},
		camelCase: function (str) {
			return str.toLowerCase().replace(/-(.)/g, function (match, group1) {
				return group1.toUpperCase();
			});
		},
		isHTML: function (str) {
			if (typeof str === "string") {
				return /<\/?[a-z][\s\S]*>/i.test(str);
			}
		},
		/**
		 *
		 * example 1 : g = groupBy(pets, pet => pet.type); g.get("Dog");
		 * example 2 : g = groupBy(numbers, x => (x % 2 === 1 ? odd : even)); g.get(odd);
		 */
		groupBy: function (list, keyGetter) {
			const map = new Map();
			list.forEach((item) => {
				const key = keyGetter(item);
				const collection = map.get(key);
				if (!collection) {
					map.set(key, [item]);
				} else {
					collection.push(item);
				}
			});
			return map;
		},
		dataChangeOnly: function (oldData, newData) {
			var tmpData = {};

			if (newData) {
				Object.keys(newData).forEach((attrKey) => {
					if (newData[attrKey] != oldData[attrKey]) {
						tmpData[attrKey] = newData[attrKey];
					}
				});
			}

			return tmpData;
		},
		UUID: function () {
			// UUID format "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
			// nsUUID format "el-xxxxxxxxxxxx" ;)
			return "el_xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
				var r = (Math.random() * 16) | 0,
					v = c === "x" ? r : (r & 0x3) | 0x8;
				return v.toString(16);
			});
		},
		parseBool: function (d) {
			if (d) {
				switch (d.toLowerCase().trim()) {
					case "true":
					case "yes":
					case "1":
						return true;
					case "false":
					case "no":
					case "0":
					case null:
						return false;
					default:
						return Boolean(d);
				}
			} else {
				return false;
			}
		},
		rndBetween: function (min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		},
		pad: function (num, width, z) {
			z = z || "0";
			num = num + "";
			return num.length >= width ? num : new Array(width - num.length + 1).join(z) + num;
		},
		entityMap: {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#39;",
			"/": "&#x2F;",
			"`": "&#x60;",
			"=": "&#x3D;",
		},
		escapeHTML: function (string) {
			return String(string).replace(/[&<>"'`=\/]/g, function (s) {
				return ns.core.entityMap[s];
			});
		},
		highlight: function (sender, timeout) {
			if (sender) {
				$(sender).addClass("ns-highlight");
				setTimeout(
					function (sender) {
						$(sender).removeClass("ns-highlight");
					},
					timeout ? timeout : 12000,
					sender
				);

				ns.core.focus(sender);
			}
		},
		focus: function (sender) {
			var navbarheight = $("#navbar").outerHeight();
			navbarheight = navbarheight || 0;
			console.log("Navbar height : " + navbarheight);
			$([document.documentElement, document.body]).animate(
				{
					scrollTop: $(sender).offset().top + navbarheight - 50,
				},
				300
			);
			// document.body.scrollTop = sender.offsetTop;
		},
		// validate: function (container) {
		// 	var listofcontrol = $(container).find("[name]").get();
		// 	if (listofcontrol) {
		// 		$.each(listofcontrol, function (index, ctl) {
		// 			if ($(ctl).attr("required")) {
		// 				if (!ns.core.getvalue(ctl)) {
		// 					$(ctl).addClass("is-invalid").removeClass("is-valid");
		// 				} else {
		// 					$(ctl).removeClass("is-invalid").addClass("is-valid");
		// 				}
		// 			}
		// 		});
		// 	}

		// 	var invalidctl = $(container).find(".is-invalid");
		// 	if (invalidctl && invalidctl.length > 0) {
		// 		return false;
		// 	} else {
		// 		return true;
		// 	}
		// },
		getvalue: function (elem) {
			//get value from elemen with name attribute and return object {name1:value1,name2:value2}
			switch ($(elem).attr("type")) {
				case "checkbox":
				case "radio":
					return $(elem).is(":checked") ? $(elem).val() : null;
					break;
				case "range":
				case "number":
					if ($(elem).attr("step") === "any") {
						return parseFloat($(elem).val());
					} else {
						return parseInt($(elem).val(), 10);
					}
					break;
				case "date":
					let vdate = $(elem).val();
					return vdate ? moment(vdate, "YYYY-MM-DD").format("YYYY-MM-DD") : null;
					break;
				case "datetime-local":
					let vdatetime = $(elem).val();
					return vdatetime ? moment(vdatetime, "YYYY-MM-DDTHH:mm").format("YYYY-MM-DDTHH:mm") : null;
					break;
				case "time":
					let vtime = $(elem).val();
					return vtime ? moment(vtime, "HH:mm").format("HH:mm") : null;
					break;
				case "month":
					let vmonth = $(elem).val();
					return vmonth ? moment(vmonth, "YYYY-MM").format("YYYY-MM") : null;
					break;
				case "week":
					let vweek = $(elem).val();
					return vweek ? moment(vweek, "YYYY-Www").format("YYYY-Www") : null;
					break;
				default:
					let vval = $(elem).val();
					return vval ? vval : null;
			}
		},
	};
})(ns);
//control generator
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {})(ns);
//global data manager
//author: printf83@gmail.com (c) 2020 - 2021
var ns_global_data = {};

(function (ns) {
	ns.data = {
		set: function (key, value) {
			ns_global_data[key] = value;
		},
		get: function (key) {
			return ns_global_data[key];
		},
		clear: function (key) {
			if (key) {
				if (fn_data.isexist(key)) {
					delete ns_global_data[key];
				}
			} else {
				ns_global_data = {};
			}
		},
		isexist: function (key) {
			if (ns_global_data[key]) {
				return true;
			}

			return false;
		},
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {})(ns);
//generate and show dialog modal
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {
	const DELETETEXT = "delete";

	const BTNCAPTION = [
		{ key: "okay", value: ["Okay"] },
		{ key: "close", value: ["Close"] },
		{ key: "cancel", value: ["Cancel"] },
		{ key: "okayonly", value: ["Okay"] },
		{ key: "closeonly", value: ["Close"] },
		{ key: "cancelonly", value: ["Cancel"] },

		{ key: "savechangesclose", value: ["Save changes", "Close"] },
		{ key: "understandclose", value: ["Understand", "Close"] },
		{ key: "sendmessageclose", value: ["Send message", "Close"] },
		//

		{ key: "searchcancel", value: ["Search", "Cancel"] },
		{ key: "sortcancel", value: ["Sort", "Cancel"] },
		{ key: "yesno", value: ["Yes", "No"] },
		{ key: "yescancel", value: ["Yes", "Cancel"] },
		{ key: "yesclose", value: ["Yes", "Close"] },
		{ key: "yescontinueno", value: ["Yes, continue", "No"] },
		{
			key: "yescontinuecancel",
			value: ["Yes, continue", "Cancel"],
		},
		{
			key: "yescontinueclose",
			value: ["Yes, continue", "Close"],
		},
		{ key: "yessaveno", value: ["Yes, save", "No"] },
		{ key: "yessavecancel", value: ["Yes, save", "Cancel"] },
		{ key: "yessaveclose", value: ["Yes, save", "Close"] },
		{ key: "yesdeleteno", value: ["Yes, delete", "No"] },
		{
			key: "yesdeletecancel",
			value: ["Yes, delete", "Cancel"],
		},
		{ key: "yesdeleteclose", value: ["Yes, delete", "Close"] }, //no YES

		{ key: "continueno", value: ["Continue", "No"] },
		{
			key: "continuecancel",
			value: ["Continue", "Cancel"],
		},
		{
			key: "continueclose",
			value: ["Continue", "Close"],
		},
		{ key: "saveno", value: ["Save", "No"] },
		{ key: "savecancel", value: ["Save", "Cancel"] },
		{ key: "saveclose", value: ["Save", "Close"] },
		{ key: "deleteno", value: ["Delete", "No"] },
		{
			key: "deletecancel",
			value: ["Delete", "Cancel"],
		},
		{ key: "deleteclose", value: ["Delete", "Close"] },

		{ key: "okaycancel", value: ["Okay", "Cancel"] }, //end no YES
		{ key: "okayclose", value: ["Okay", "Close"] },
		{
			key: "okaycontinuecancel",
			value: ["Okay, Continue", "Cancel"],
		},
		{
			key: "okaycontinueclose",
			value: ["Okay, Continue", "Close"],
		},
		{ key: "okaysavecancel", value: ["Okay, save", "Cancel"] },
		{ key: "okaysaveclose", value: ["Okay, save", "Close"] },
		{
			key: "okaydeletecancel",
			value: ["Okay, Delete", "Cancel"],
		},
		{
			key: "okaydeleteclose",
			value: ["Okay, Delete", "Close"],
		},
		{ key: "yesnocancel", value: ["Yes", "No", "Cancel"] },
		{ key: "yesnoclose", value: ["Yes", "No", "Close"] },
		{
			key: "yescontinuenocancel",
			value: ["Yes, continue", "No", "Cancel"],
		},
		{
			key: "yescontinuenoclose",
			value: ["Yes, continue", "No", "Close"],
		},
		{
			key: "yessavenocancel",
			value: ["Yes, save", "No", "Cancel"],
		},
		{
			key: "yessavenoclose",
			value: ["Yes, save", "No", "Close"],
		},
		{
			key: "yesdeletenocancel",
			value: ["Yes, delete", "No", "Cancel"],
		},
		{
			key: "yesdeletenoclose",
			value: ["Yes, delete", "No", "Close"],
		},
		//no YES
		{
			key: "continuenocancel",
			value: ["Continue", "No", "Cancel"],
		},
		{
			key: "continuenoclose",
			value: ["Continue", "No", "Close"],
		},
		{
			key: "savenocancel",
			value: ["Save", "No", "Cancel"],
		},
		{
			key: "savenoclose",
			value: ["Save", "No", "Close"],
		},
		{
			key: "deletenocancel",
			value: ["Delete", "No", "Cancel"],
		},
		{
			key: "deletenoclose",
			value: ["Delete", "No", "Close"],
		},
	];

	var fn = {
		build: function (opt) {
			/**
			 * static : true|false
			 * elems : {elems:[]}
			 * title: string
			 * icon:string|{icon:string}
			 * footer:{elems:[]}
			 * footerstyle:"full"|null (removed)
			 * button:[ns.button()]
			 * show:true|false
			 * animate:true|false
			 * scrollable:true|false
			 * center:true|false
			 * size:xl|lg|sm|null
			 * fullscreen:false|true
			 * hastab:false|true
			 * focus:true|false
			 *  */
			opt = $.extend(
				{},
				{
					id: null,
					class: null,
					static: true,
					elems: null,
					title: null,
					icon: null,
					footer: null,
					button: null,
					show: false,
					animate: true,
					scrollable: true,
					center: true,
					size: null,
					fullscreen: false,
					hastab: false,
					focus: true,
				},
				opt
			);

			//support opt.button : string or [ns.button]
			if (typeof opt.button === "string") {
				opt.button = fn.dlgbtn(opt.button);
				if (opt.button) {
					return fn.build(opt);
				} else {
					opt.button = [];
					return fn.build(opt);
				}
			} else {
				if (Array.isArray(opt.button)) {
					//generate id
					opt.id = opt.id ? opt.id : ns.core.UUID();

					var resHead = [];
					var resBody = [];
					var resFooter = [];
					var resControl = [];
					var resButton = [];

					//gen header
					if (opt.title || opt.icon) {
						//icon
						if (opt.icon) {
							if (typeof opt.icon === "string") {
								resHead.push({
									elems: ns.icon({
										icon: opt.icon,
										class: "me-2",
									}),
								});
							} else {
								resHead.push({
									elems: ns.icon(opt.icon),
								});
							}
						}

						//title
						if (opt.title) {
							resHead.push({
								tag: "span",
								class: "text-capitalize",
								elems: opt.title,
							});
						}

						//wrap icon and title in div.modal-title
						if (opt.title || opt.icon) {
							resHead = [
								{
									tag: "h5",
									class: "modal-title",
									elems: resHead.slice(),
								},
							];
						}

						//close button on title head
						//if (!opt.static) {
						resHead.push({
							tag: "button",
							class: "btn-close",
							attr: {
								type: "button",
								"data-bs-dismiss": "modal",
							},
						});
						//}

						//wrap in div.modal-header
						resHead = [ns.div("modal-header", resHead.slice())];
					}

					//gen body
					//elems is optional
					resBody.push(ns.div(["modal-body", opt.hastab ? "p-0" : null], opt.elems));

					//android style button
					//gen footer
					//gen control part
					var hasFooterCtl = false;
					if (opt.footer) {
						hasFooterCtl = true;
						resControl.push(ns.div("footer-ctl float-start", opt.footer));
					}

					//gen footer button
					var hasButton = false;
					if (opt.button && opt.button.length > 0 && opt.button[0] !== null) {
						hasButton = true;
						//must ARRAY {name,color}

						opt.button.forEach((item, index) => {
							item.id = item.id ? item.id : `${opt.id}-btn-${index}`;
							item.color = item.color ? item.color : index === 0 ? "primary" : "text-secondary";
							item.class = "ms-3 btn-modal";
							//push button to front
							//RTL style
							resButton.unshift({
								elems: ns.button(item),
							});
						});

						//need to wrap resButton into div.justify-content-end to push button to the right
						resButton = [ns.div("justify-content-end", resButton.slice())];
					}

					//mix footer and button
					//if (opt.footer && opt.button) {
					//put in container if footer and button provided
					resFooter.push(
						ns.div(
							"container-fluid g-0 p-0",
							ns.div("row align-items-center", [ns.div("col", resControl), ns.div("col-auto", resButton)])
						)
					);

					//wrap footer to div.modal-footer
					resFooter = ns.div("modal-footer", resFooter.slice());

					//combine header,body,footer to div.modal > div.modal-dialog > div.content
					var res = [];

					res = res.concat(resHead);
					res = res.concat(resBody);

					if (hasButton || hasFooterCtl) {
						res = res.concat(resFooter);
					}

					res = ns.div(
						["modal", opt.animate ? "fade" : null, opt.show ? "show" : null],
						{
							id: opt.id,
							tabindex: "-1",
							"data-bs-backdrop": opt.static ? "static" : null,
							"data-bs-keyboard": opt.static ? "false" : null,
							"data-bs-focus": opt.focus ? "true" : null,
						},
						ns.div(
							[
								"modal-dialog",
								opt.scrollable ? "modal-dialog-scrollable" : null,
								opt.center ? "modal-dialog-centered" : null,
								opt.size ? `modal-${opt.size}` : null,
								opt.fullscreen
									? typeof opt.fullscreen === "string"
										? `modal-fullscreen-${opt.fullscreen}`
										: "modal-fullscreen"
									: null,
							],
							ns.div("modal-content", res.slice())
						)
					);

					return res;
				} else {
					opt.button = [opt.button];
					return fn.build(opt);
				}
			}
		},
		show: function (elem, ...arg) {
			if (elem) {
				if (typeof elem === "string") {
					fn.show($(elem)[0], ...arg);
				} else {
					var backdrop = $(elem).attr("data-bs-backdrop");
					var keyboard = $(elem).attr("data-bs-keyboard");
					var focus = $(elem).attr("data-bs-focus");

					var mdl = new bootstrap.Modal(elem, {
						backdrop: backdrop === "static" ? "static" : true,
						keyboard: keyboard === "true" ? true : false,
						focus: focus === "true" ? true : false,
					});

					//set function for each button in footer
					//button modal has .btn-modal coz, footer control also can have button
					var btnmodal = [].slice.call(elem.querySelectorAll(".btn-modal")).reverse(); //$(elem).find(".btn-modal").get().reverse();

					btnmodal.forEach((item, index) => {
						$(item).on("click", function () {
							if (arg && index <= arg.length && ns.core.isFunction(arg[index])) {
								if (arg[index](elem)) {
									fn.hide(elem);
								}
							} else {
								fn.hide(elem);
							}
						});
					});

					//hide previous modal
					var allModal = $(".modal");
					if (allModal && allModal.length > 1) {
						var prevModal = allModal[allModal.length - 2];
						$(prevModal).removeClass("show");
						if ($(prevModal).attr("data-bs-backdrop") === "static") {
							$(prevModal).next(".modal-backdrop").removeClass("show");
						}
					}

					//add event to destroy modal after hidden
					$(elem).on("hidden.bs.modal", function (event) {
						//show back prevModal
						var allModal = $(".modal");
						if (allModal && allModal.length > 1) {
							var prevModal = allModal[allModal.length - 2];
							$(prevModal).addClass("show");
							if ($(prevModal).attr("data-bs-backdrop") === "static") {
								$(prevModal).next(".modal-backdrop").addClass("show");
							}
						}

						setTimeout(
							function (elem) {
								fn.destroy(elem);
							},
							3000,
							elem
						);
					});

					//add event to init control in modal
					$(elem).on("shown.bs.modal", function (event) {
						ns.build.init(this);
						$(this).modal("handleUpdate");
					});

					//show modal
					mdl.show();
				}
			}
		},
		hide: function (elem) {
			if (elem) {
				if (typeof elem === "string") {
					fn.hide($(elem)[0]);
				} else {
					var mdl = bootstrap.Modal.getInstance(elem);
					if (mdl) {
						mdl.hide();
					}
				}
			}
		},
		destroy: function (elem) {
			if (elem) {
				if (typeof elem === "string") {
					fn.destroy($(elem)[0]);
				} else {
					var mdl = bootstrap.Modal.getInstance(elem);
					if (mdl) {
						try {
							$(mdl).destroy();
						} catch {}

						$(elem).remove();
					}
				}
			}
		},
		getvalue: function (container) {
			var ctl = $(container).find("[name]").get(); //.get() to get real DOM array
			if (ctl && ctl.length > 0) {
				var e = {};

				ctl.forEach((item) => {
					//update for get checkbox and radio value
					let type = $(item).attr("type");
					let value = ns.core.getvalue(item);
					let name = $(item).attr("name");

					if (type === "radio") {
						if (typeof e[name] === "undefined") {
							e[name] = null;
						}

						if (value) {
							e[name] = value;
						}
					} else if (type === "checkbox") {
						if (typeof e[name] === "undefined") {
							e[name] = [];
						}

						if (value) {
							e[name].push(value);
						}
					} else {
						e[name] = value;
					}
				});

				return e;
			} else {
				return null;
			}
		},
		validate: function (container, validation) {
			if (validation) {
				return validation(contaier);
			} else {
				return ns.validate(container);
			}
		},
		//return label for dlg button base on shortcut text (example: okayonly,yesno,okaycancel,yesnocancel,continuenocancel)
		dlgbtn: function (btn) {
			if (btn) {
				var found = BTNCAPTION.find((o) => o.key === btn.toLowerCase());
				if (found) {
					return found.value.map(function (item) {
						if (item.toLowerCase().indexOf(DELETETEXT) > -1) {
							return {
								label: item,
								color: "danger",
							};
						} else {
							return {
								label: item,
							};
						}
					});
				} else {
					console.error(`Unknow button : ${btn}`);
				}
			}

			return null;
		},
		dlgmsg: function (...arg) {
			if (arg && arg.length > 0) {
				var msg = null;
				var icon = null;

				if (arg.length === 1) {
					msg = arg[0];
				} else if (arg.length > 1) {
					icon = arg[0];
					msg = arg[1];
				}

				if (icon) {
					return {
						elems: ns.div("row g-0", [
							ns.div(
								"col-auto align-self-start pt-1 me-3",
								ns.icon({
									icon: icon,
									size: "3x",
								})
							),
							ns.div("col align-self-center", msg),
						]),
					};
				} else {
					return msg;
				}
			}
		},
	};

	ns.dlg = {
		/**
		 *
		 * example:
		 * ns.dlg.msgbox("i","msg").then().catch()
		 * ns.dlg.msgbox("i","msg","okayonly").then().catch()
		 */
		msgbox: function (icon, msg, button) {
			return new Promise((res, rej) => {
				try {
					button = button ? button : "okayonly";
					var id = ns.core.UUID();

					ns.build.append(
						document.body,
						fn.build({
							id: id,
							title: document.title,
							button: button,
							elems: fn.dlgmsg(icon, msg),
						})
					);

					fn.show(
						`#${id}`,
						function () {
							res();
							return true;
						},
						function () {
							try {
								rej();
							} catch (ex) {}
							return true;
						},
						function () {
							try {
								rej();
							} catch (ex) {}
							return true;
						}
					);
				} catch (err) {
					rej(err);
				}
			});
		},
		/**
		 *
		 * example:
		 * ns.dlg.confirmbox("i","msg").then().catch()
		 * ns.dlg.confirmbox("i","msg","okaycancel").then().catch()
		 */
		confirmbox: function (icon, msg, button) {
			return new Promise((res, rej) => {
				try {
					button = button ? button : "yesnocancel";
					var id = ns.core.UUID();

					ns.build.append(
						document.body,
						fn.build({
							id: id,
							title: document.title,
							button: button,
							elems: fn.dlgmsg(icon, msg),
						})
					);

					fn.show(
						`#${id}`,
						function (container) {
							res(container);
							return true;
						},
						function () {
							try {
								rej();
							} catch (ex) {}
							return true;
						},
						function () {
							try {
								rej();
							} catch (ex) {}
							return true;
						}
					);
				} catch (err) {
					rej(err);
				}
			});
		},
		/**
		 *
		 * example:
		 * ns.dlg.inputbox("text","msg").then(data).catch()
		 * ns.dlg.inputbox("tel","msg","okaycancel").then(data).catch()
		 * ns.dlg.inputbox(ns.input(),"msg").then(data).catch()
		 * ns.dlg.inputbox(ns.input(),"msg","okaycancel").then(data).catch()
		 */
		inputbox: function (type, msg, button, validation) {
			return new Promise((res, rej) => {
				try {
					button = button ? button : "okaycancel";
					var id = ns.core.UUID();

					var ctl = [];

					//msg
					if (msg) {
						ctl.push({
							tag: "p",
							elems: msg,
						});
					}

					//ctl
					if (typeof type === "string") {
						ctl.push(ns.input({ type: type, name: "value" }));
					} else {
						if (Array.isArray(type)) {
							//combine multiple control into res
							ctl = ctl.concat(type);
						} else {
							//just put one elem into res
							ctl.push(type);
						}
					}

					//put in modal
					ns.build.append(
						document.body,
						fn.build({
							id: id,
							title: document.title,
							button: button,
							elems: {
								elems: ctl,
							},
						})
					);

					$(`#${id}`).on("shown.bs.modal", function (event) {
						var container = event.target;
						var inputLast = $(container).find(".modal-body").find("[name]:last");
						if (inputLast) {
							$(inputLast).on("keyup", function (event) {
								if (event.keyCode === 13) {
									$(container).find(".modal-footer").find(".btn:last").click();
								}
							});
						}

						var inputFirst = $(container).find(".modal-body").find("[name]:first");
						if (inputFirst) {
							$(inputFirst).focus();
						}
					});

					fn.show(
						`#${id}`,
						function (container) {
							fn.validate(container, validation)
								.then(() => {
									var data = fn.getvalue(container);
									if (data) {
										if (!data.dlg) {
											data.dlg = `#${$(container).attr("id")}`;
										} else {
											console.warn(
												"ns.dlg has input with name dlg that should be used to send container"
											);
										}
									} else {
										data = {};
										data.dlg = `#${$(container).attr("id")}`;
									}

									fn.hide(`#${$(container).attr("id")}`);
									res(data);
								})
								.catch(() => {
									rej();
								});

							return false;

							// if (fn.validate(container)) {
							// 	var data = fn.getvalue(container);

							// 	if (data) {
							// 		if (!data.dlg) {
							// 			data.dlg = `#${$(container).attr("id")}`;
							// 		} else {
							// 			console.warn(
							// 				"ns.dlg has input with name dlg that should be used to send container"
							// 			);
							// 		}
							// 	} else {
							// 		data = {};
							// 		data.dlg = `#${$(container).attr("id")}`;
							// 	}

							// 	res(data);
							// 	return true;
							// } else {
							// 	return false;
							// }
						},
						function () {
							try {
								rej();
							} catch (ex) {}
							return true;
						},
						function () {
							try {
								rej();
							} catch (ex) {}
							return true;
						}
					);
				} catch (err) {
					rej(err);
				}
			});
		},
		/**
		 *
		 * example:
		 * ns.dlg.box({id:"",button:"okaycancel",onshow:function(){}}).then(data).catch()
		 */
		box: function (opt) {
			return new Promise((res, rej) => {
				try {
					opt = $.extend(
						{},
						{
							id: null,
							title: null,
							button: null,
							onshow: null,
							fullscreen: false,
							validation: null,
						},
						opt
					);
					opt.id = opt.id ? opt.id : ns.core.UUID();

					//put in modal
					ns.build.append(document.body, fn.build(opt));

					//setup onshow dlg
					$(`#${opt.id}`).on("shown.bs.modal", function (event) {
						var container = event.target;
						var inputLast = $(container).find(".modal-body").find("[name]:last");
						if (inputLast) {
							$(inputLast).on("keyup", function (event) {
								if (event.keyCode === 13) {
									$(container).find(".modal-footer").find(".btn:last").click();
								}
							});
						}

						var inputFirst = $(container).find(".modal-body").find("[name]:first");
						if (inputFirst) {
							$(inputFirst).focus();
						}

						if (ns.core.isFunction(opt.onshow)) {
							opt.onshow($(`#${opt.id}`));
						}
					});

					//show modal
					fn.show(
						`#${opt.id}`,
						function (container) {
							fn.validate(container, opt.validation)
								.then(() => {
									var data = fn.getvalue(container);
									if (data) {
										if (!data.dlg) {
											data.dlg = `#${$(container).attr("id")}`;
										} else {
											console.warn(
												"ns.dlg has input with name dlg that should be used to send container"
											);
										}
									} else {
										data = {};
										data.dlg = `#${$(container).attr("id")}`;
									}

									fn.hide(`#${$(container).attr("id")}`);
									res(data);
								})
								.catch(() => {
									rej();
								});

							return false;

							// if (fn.validate(container)) {
							// 	var data = fn.getvalue(container);

							// 	if (data) {
							// 		if (!data.dlg) {
							// 			data.dlg = `#${$(container).attr("id")}`;
							// 		} else {
							// 			console.warn(
							// 				"ns.dlg has input with name dlg that should be used to send container"
							// 			);
							// 		}
							// 	} else {
							// 		data = {};
							// 		data.dlg = `#${$(container).attr("id")}`;
							// 	}

							// 	res(data);

							// 	return true;
							// } else {
							// 	return false;
							// }
						},
						function () {
							try {
								rej();
							} catch (ex) {}

							return true;
						},
						function () {
							try {
								rej();
							} catch (ex) {}
							return true;
						}
					);
				} catch (err) {
					rej(err);
				}
			});
		},
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.dropdown = function (opt) {
		opt = $.extend(
			{},
			{
				id: null,
				name: null,
				class: null,
				style: null,

				label: null,
				labelshow: null,

				value: null,
				checked: false,
				disabled: false,

				nowarp: false,
				weight: null,
				outline: false,
				border: true,
				rounded: true,
				color: null,
				textcolor: null,
				dark: false,

				onclick: null,
				href: null,
				icon: null,
				largeicon: false,

				option: null,
				arrow: "down", //down|null|left|right|up
				aligment: null, //end|start|md-end|xl-end|sm-start
				autoclose: true, //true|false|inside|outside
				type: "button",
				data: null,
				offset: null, //"20,30"
				reference: null, //parent

				navlink: false,
				container: "dropdown", //null|btn-group|nav-item|dropdown
				segmenttoggle: false,
			},
			opt
		);

		//generate id
		opt.id = opt.id ? opt.id : ns.core.UUID();

		if (opt.navlink) {
			opt.container = "nav-item";
			opt.href = opt.href || "javascript:void(0)";
		}

		if (opt.segmenttoggle && opt.container === "dropdown") {
			opt.container = "btn-group";
		}

		var main = {
			tag: opt.href ? "a" : "button",
			class: [
				!opt.navlink ? "btn" : "nav-link",
				!opt.segmenttoggle ? "dropdown-toggle" : null,
				opt.color ? (opt.outline ? `btn-outline-${opt.color}` : `btn-${opt.color}`) : null,
				opt.textcolor ? `text-${opt.textcolor}` : null,
				opt.weight ? `btn-${opt.weight}` : null,
				opt.class,
			],
			attr: {
				id: !opt.segmenttoggle ? opt.id : null,
				"data-bs-toggle": !opt.segmenttoggle ? "dropdown" : null,
				"data-bs-reference": !opt.segmenttoggle ? opt.reference : null,
				"data-bs-offset": !opt.segmenttoggle ? opt.offset : null,
				"data-bs-auto-close": !opt.segmenttoggle ? (opt.autoclose ? opt.autoclose : "false") : null,
				"aria-expanded": !opt.segmenttoggle ? "false" : null,
				href: opt.href,
			},
			elems: [
				opt.icon
					? {
							tag: opt.largeicon ? "span" : null,
							class: opt.largeicon ? ["d-md-block h4-md", opt.label ? "mb-0" : null].combine(" ") : null,
							elems: ns.icon(opt.icon),
					  }
					: null,
				opt.label
					? ns.span(
							[
								opt.icon && !opt.largeicon ? "ms-2" : null,
								opt.icon && opt.largeicon ? "ms-2 ms-md-0" : null,
								opt.option && !opt.segmenttoggle ? "me-2" : null,
								opt.labelshow ? `d-none d-${opt.labelshow}-inline` : null,
							],
							opt.label
					  )
					: null,
			],
		};

		var toggle = opt.segmenttoggle
			? {
					tag: opt.href ? "a" : "button",
					class: [
						"dropdown-toggle dropdown-toggle-split btn",
						opt.color ? (opt.outline ? `btn-outline-${opt.color}` : `btn-${opt.color}`) : null,
						opt.textcolor ? `text-${opt.textcolor}` : null,
						opt.weight ? `btn-${opt.weight}` : null,
						opt.class,
					],
					attr: {
						id: opt.id,
						"data-bs-toggle": "dropdown",
						"data-bs-reference": opt.reference,
						"aria-expanded": "false",
						"data-bs-offset": opt.offset,
						"data-bs-auto-close": opt.autoclose ? opt.autoclose : "false",
					},
					elems: {
						tag: "span",
						class: "visually-hidden",
						elems: "Toggle Dropdown",
					},
			  }
			: null;

		var menu = ns.div(
			[
				"dropdown-menu",
				opt.dark ? "dropdown-menu-dark" : null,
				ns.core.multipleClassSupport(opt.aligment, "dropdown-menu-$1"),
			],
			{ "aria-labelledby": opt.id },
			ns.ddoption(opt.option, opt.value)
		);

		if (opt.arrow === "start" && opt.segmenttoggle) {
			return {
				ns: 1,
				tag: opt.container ? (opt.container === "nav-item" ? "li" : "div") : null,
				class: [opt.segmenttoggle ? opt.container : null, opt.arrow ? `drop${opt.arrow}` : null],
				elems: [ns.btngroup([toggle, menu].removeEmpty()), main],
			};
		} else {
			return {
				ns: 1,
				tag: opt.container ? (opt.container === "nav-item" ? "li" : "div") : null,
				class: [opt.container, opt.arrow ? `drop${opt.arrow}` : null],
				elems: [main, toggle, menu].removeEmpty(),
			};
		}
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	var fn = {};

	ns.example = function (opt) {
		opt = $.extend(
			{},
			{
				id: null,
				title: null,
				msg: null,
				label: null,
				class: null,
				pclass: null,
				anchor: true,
				// cstart: 18,
				// cend: 6,
				code: null,
				dark: false,
				sample: null,
				beautify: function (str) {
					var opt = {
						preserve_newlines: true,
						max_preserve_newlines: 180,
						keep_array_indentation: false,
						brace_style: "collapse,preserve-inline",
					};

					//js_beautify need to add into html page
					// <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.0/beautify.min.js"></script>
					// <script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js?autorun=false&style=sunburst"></script>
					return js_beautify(str, opt);
				},
				container: ns.cont.singlecolumn,
			},
			opt
		);

		opt.id = opt.id ? opt.id : ns.core.UUID();

		var el = [];

		if (opt.title) {
			el.push({
				tag: opt.code ? "h3" : opt.anchor ? "h2" : "h1",
				class: ["pt-3", !opt.anchor ? "fs-1" : null],
				attr: { id: opt.id },
				elems: [
					{
						tag: "span",
						elems: opt.title,
					},
					opt.anchor
						? {
								tag: "a",
								class: "anchorjs-link ps-2",
								attr: {
									"aria-label": "Anchor",
									"data-anchorjs-icon": "#",
									href: "javascript:void(0)",
									onclick: "ns.core.focus($(this).parent())",
								},
						  }
						: null,
				],
			});
		}

		if (opt.msg) {
			if (!Array.isArray(opt.msg)) {
				opt.msg = [opt.msg];
			}

			$.each(opt.msg, function (ix, i) {
				if (typeof i === "string") {
					el.push({
						tag: "p",
						class: opt.anchor ? null : "fw-lighter fs-5",
						elems: i,
					});
				} else {
					el.push(i);
				}
			});
		}

		if (opt.code) {
			var samplecode = [];
			if (opt.sample) {
				Object.keys(opt.sample).forEach((sampleKey) => {
					var sampleid = ns.core.UUID();
					var strSampleCode = opt.sample[sampleKey].toString(); //"(" + opt.sample[sampleKey] + ")();";
					// strSampleCode = strSampleCode.substring(opt.cstart, strSampleCode.length - opt.cend);

					// if (strSampleCode.startsWith("return")) {
					// 	strSampleCode = strSampleCode.substring(7, strSampleCode.length);
					// }

					// console.log(strSampleCode);
					samplecode.push(
						ns.div(
							"d-flex justify-content-start py-1 px-3 flex-wrap bg-light",
							{
								"data-bs-toggle": "collapse",
								"aria-expanded": "false",
								"aria-controls": sampleid,
								"data-bs-target": `#${sampleid}`,
								role: "button",
							},
							[
								{
									tag: "code",
									class: "d-flex align-items-center",
									elems: `${sampleKey}()`,
								},
							]
						)
					);

					samplecode.push(
						ns.div("collapse card-body ns-code bg-light pt-0", { id: sampleid }, [
							{
								tag: "code",
								class: "overflow-auto d-block",
								elems: {
									tag: "pre",
									attr: { lang: "js" },
									class: "prettyprint lang-js linenums",
									elems: opt.beautify(strSampleCode),
								},
							},
						])
					);
				});
			}

			var strCode = opt.code.toString(); //"(" + opt.code + ")();";
			// strCode = strCode.substring(opt.cstart, strCode.length - opt.cend);

			// if (strCode.startsWith("return")) {
			// 	strCode = strCode.substring(7, strCode.length);
			// }

			el.push(
				ns.div(
					"card border-0",
					[
						ns.div(
							[
								opt.class ? opt.class : null,
								"card-body ns-example border rounded-top",
								opt.dark ? "bg-dark" : null,
								opt.pclass ? opt.pclass : null,
							],
							opt.label
								? ns.button({
										label: opt.label,
										color: "primary",
										onclick: function (sender) {
											opt.code();
										},
								  })
								: opt.container(opt.code())
						),
						opt.sample
							? {
									elems: samplecode,
							  }
							: null,
						ns.div("d-flex justify-content-between py-1 px-3 flex-wrap bg-light", [
							{ tag: "code", class: "d-flex align-items-center", elems: "code()" },
							{
								tag: "button",
								class: "btn-clipboard btn btn-outline-primary btn-sm", //"btn-clipboard btn btn-outline-primary btn-sm end-0 me-3 position-absolute"
								elems: "Copy",
								attr: {
									role: "button",
									onclick: function (sender) {
										ns.core.copyToClipboard(strCode, "Code copied to clipboard");
									},
								},
							},
						]),
						ns.div("card-body ns-code bg-light rounded-bottom pt-0", [
							{
								tag: "code",
								class: "overflow-auto d-block",
								elems: {
									tag: "pre",
									attr: { lang: "js" },
									class: "prettyprint lang-js linenums",
									elems: opt.beautify(strCode),
								},
							},
						]),
					].removeEmpty()
				)
			);
		}

		return ns.div("mb-5 ns-example", { id: !opt.title ? opt.id : null }, el);
	};
})(ns);
//file contorl (upload,download,view,save)
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {
	ns.file = {
		fn: {
			onview: function (sender) {
				var container = $(sender).closest(".file-upload-controller");
				var ctl = $(container).find("input[type='hidden']");
				var data = $(ctl).val();

				if (data) {
					//need to convert id,id,id to Array
					if (data.indexOf(",") > -1) {
						ns.file.view(data.split(","), sender);
					} else {
						ns.file.view(data, sender);
					}
				}
			},
			onchange: function (sender) {
				var container = $(sender).closest(".file-upload-controller");
				var ctl = $(container).find("input[type='hidden']");
				var id = $(ctl).attr("id");
				var value = $(ctl).val();

				var btnview = $(`#${id}-view`);
				var btndelete = $(`#${id}-delete`);

				if (value) {
					$(btnview)
						.removeAttr("disabled")
						.removeClass("disabled btn-secondary")
						.addClass("btn-success");
					$(btndelete)
						.removeAttr("disabled")
						.removeClass("disabled btn-secondary")
						.addClass("btn-danger");
				} else {
					$(btnview)
						.prop("disabled", true)
						.addClass("disabled btn-secondary")
						.removeClass("btn-success");
					$(btndelete)
						.prop("disabled", true)
						.addClass("disabled btn-secondary")
						.removeClass("btn-danger");
				}
			},
			ondelete: function (sender) {
				var container = $(sender).closest(".file-upload-controller");
				var ctl = $(container).find("input[type='hidden']");

				$(ctl).val("");
				$(ctl).trigger("change");
			},
			onupload: function (sender) {
				var container = $(sender).closest(".file-upload-controller");
				var ctl = $(container).find("input[type='hidden']");

				var accept = $(ctl).attr("data-ns-accept");
				var multiple = $(ctl).attr("data-ns-multiple");

				accept = accept
					? accept
					: "image/gif,image/bmp,image/x-windows-bmp,image/jpeg,image/png,application/pdf,application/zip,application/json,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/html";
				multiple = multiple ? ns.core.parseBool(multiple) : false;

				ns.file
					.upload({
						multiple: multiple,
					})
					.then((data) => {
						$(ctl).val(data);
						$(ctl).trigger("change");
					}, ns.core.errorHandler);
			},
		},
		ctl: function (opt) {
			//create control to handle file
			//[preview|delete|upload] if has value
			//[upload] if no value

			//create hidden input that keep value and name
			//show button base on value (3 button or one button)
			//this control should has option like ns.input()

			opt = $.extend(
				{},
				{
					id: null,
					name: null,
					class: null,
					label: null,
					readonly: false,
					disabled: false,
					multiple: false,
					size: "col-12",
					value: null,
					onchange: null,
					valid: null,
					invalid: null,
					accept: "image/gif,image/bmp,image/x-windows-bmp,image/jpeg,image/png,application/pdf,application/zip,application/json,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/html",
				},
				opt
			);

			//generate id
			opt.id = opt.id ? opt.id : ns.core.UUID();

			//generate label
			var lbl = [];
			if (opt.label) {
				lbl.push({
					tag: "label",
					class: "form-label",
					attr: { for: opt.id },
					elems: opt.label,
				});
			}

			//generate control
			var ctl = [];

			//create main control to handle value
			ctl.push({
				tag: "input",
				class: [opt.class],
				attr: {
					id: opt.id,
					name: opt.name,
					type: "hidden",
					readonly: opt.readonly,
					disabled: opt.disabled,
					value: opt.value,
					onchange: [
						"ns.file.fn.onchange(this);",
						opt.onchange ? opt.onchange : null,
					].combine(""),
					"data-ns-accept": opt.accept,
					"data-ns-multiple": opt.multiple,
				},
				elems: null,
			});

			//add button base on value
			ctl.push(
				ns.div(
					"row",
					ns.btngroup([
						ns.button({
							id: `${opt.id}-view`,
							label: "View",
							icon: "eye",
							color: opt.value ? "success" : "secondary",
							class: "w-100",
							disabled: opt.value ? false : true,
							onclick: "ns.file.fn.onview(this)",
						}),

						ns.button({
							id: `${opt.id}-delete`,
							icon: "times",
							color: opt.value ? "danger" : "secondary",
							class: "w-0",
							disabled: opt.disabled
								? true
								: opt.readonly
								? true
								: opt.value
								? false
								: true,
							onclick: "ns.file.fn.ondelete(this)",
						}),

						ns.button({
							id: `${opt.id}-upload`,
							icon: "upload",
							color: "primary",
							class: "w-0",
							disabled: opt.disabled ? true : opt.readonly ? true : false,
							onclick: "ns.file.fn.onupload(this)",
						}),
					])
				)
			);

			//valid message
			if (opt.valid) {
				ctl.push(ns.div("valid-feedback", opt.valid));
			}

			//invalid message
			if (opt.invalid) {
				ctl.push(ns.div("invalid-feedback", opt.invalid));
			}

			var res = [];
			if (opt.size) {
				res = [ns.div(opt.size, lbl.concat(ctl))];
			} else {
				res = lbl.concat(ctl);
			}

			//return fn.gen(res);
			return ns.div("file-upload-controller", res);
		},
		upload: function (opt) {
			return new Promise((res, rej) => {
				var id = ns.core.UUID();

				opt = $.extend(
					{},
					{
						accept: "image/gif,image/bmp,image/x-windows-bmp,image/jpeg,image/png,application/pdf,application/zip,application/json,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/html",
						multiple: false,
						cancelafter: 180000, //3minute
					},
					opt
				);

				ns.build.append(document.body, {
					tag: "input",
					attr: {
						id: id,
						type: "file",
						multiple: opt.multiple,
						accept: opt.accept ? opt.accept : null,
					},
					style: { display: "none" },
				});

				$(`#${id}`).change(function () {
					//add class to mark upload in progress
					$(this).addClass("upload-in-progress");

					ns.api
						.upload({
							obj: $(`#${id}`),
							progress: function (percent) {},
						})
						.then((data) => {
							res(data);
							$(`#${id}`).remove();
						})
						.catch((err) => {
							rej(err);
						});
				});

				$(`#${id}`).trigger("click");

				//set timer to remove uploader if noting in progress in opt.cancelafter
				if (opt.cancelafter > 0) {
					setTimeout(
						function (id) {
							if (!$(id).hasClass("upload-in-progress")) {
								//var cancelafterinminute = +parseFloat(opt.cancelafter / 60000).toFixed(1);
								// ns.toast(
								// 	"!",
								// 	[
								// 		"Upload canceled after no response for ",
								// 		cancelafterinminute,
								// 		" minute",
								// 		cancelafterinminute > 1 ? "s" : null,
								// 	].combine("")
								// );
								$(id).remove();
							}
						},
						opt.cancelafter,
						`#${id}`
					);
				}
			});
		},
		save: function (fileId) {
			return new Promise((res, rej) => {
				if (fileId) {
					if (typeof fileId === "string") {
						ns.file
							.save([fileId])
							.then((data) => {
								res(data);
							})
							.catch((err) => {
								rej(err);
							});
					} else {
						ns.api
							.put({
								name: `file/${fileId.combine(",")}`,
							})
							.then((data) => {
								res(data);
							})
							.catch((err) => {
								rej(err);
							});
					}
				} else {
					rej();
				}
			});
		},
		delete: function (fileId) {
			return new Promise((res, rej) => {
				if (fileId) {
					if (typeof fileId === "string") {
						ns.file
							.delete([fileId])
							.then((data) => {
								res(data);
							})
							.catch((err) => {
								rej(err);
							});
					} else {
						ns.api
							.delete({
								name: `file/${fileId.combine(",")}`,
							})
							.then((data) => {
								res(data);
							})
							.catch((err) => {
								rej(err);
							});
					}
				} else {
					rej();
				}
			});
		},
		info: function (fileId) {
			return new Promise((res, rej) => {
				if (fileId) {
					if (typeof fileId === "string") {
						ns.file
							.info([fileId])
							.then((data) => {
								res(data);
							})
							.catch((err) => {
								rej(err);
							});
					} else {
						ns.api
							.get({
								name: `file-info/${fileId.combine(",")}`,
							})
							.then((data) => {
								res(data);
							})
							.catch((err) => {
								rej(err);
							});
					}
				} else {
					rej();
				}
			});
		},
		download: function (fileId, fileName) {
			var id = ns.core.UUID();

			ns.build.append(document.body, {
				tag: "a",
				attr: {
					id: id,
					href: `api/file/${fileId}`,
					download: fileName ? fileName : null,
					hidden: true,
				},
			});

			$(`#${id}`)[0].click();
			setTimeout(
				function (id) {
					$(`#${id}`).remove();
				},
				300,
				id
			);
		},
		view: function (fileId, sender) {
			if (fileId) {
				if (typeof fileId === "string") {
					return ns.file.view([fileId], sender);
				} else {
					//get file information
					ns.loading
						.start(sender)
						.then(() => {
							return ns.file.info(fileId);
						})
						.then((data) => {
							ns.loading.stop(sender);
							if (data) {
								if (data.length === 1) {
									//if only one file
									//preview : "image/gif,image/bmp,image/x-windows-bmp,image/jpeg,image/png,
									//download : application / pdf, application / zip, application / json, application / vnd.openxmlformats - officedocument.spreadsheetml.sheet, application / vnd.openxmlformats - officedocument.wordprocessingml.document, text / plain, text / html";
									switch (data[0].mimetype) {
										case "image/png":
										case "image/jpeg":
										case "image/gif":
										case "image/bmp":
										case "image/x-windows-bmp":
											//if picture. do preview

											ns.dlg.box({
												title: null,
												button: null,
												static: false,
												size: "lg",
												elems: ns.div([
													{
														tag: "img",
														class: "img-fluid mx-auto d-block rounded btn p-0",
														attr: {
															"data-ns-src": `api/file/${data[0].id}`,
															onclick: `ns.file.download('${data[0].id}','${data[0].filename}');`,
														},
													},
												]),
											});

											break;

										default:
											//if other. do download
											ns.file.download(data[0].id, data[0].filename);

											break;
									}
								} else {
									//if multiple file
									//change size base on img count
									var thumbnailsize = 12;
									switch (data.length) {
										case 1:
											thumbnailsize = 12;
											break;
										case 2:
											thumbnailsize = 6;
											break;
										case 3:
											thumbnailsize = 4;
											break;
										default:
											thumbnailsize = 3;
									}

									//create preview base on file type
									var prv = [];

									data.forEach((item) => {
										switch (item.mimetype) {
											case "image/png":
											case "image/jpeg":
											case "image/gif":
											case "image/bmp":
											case "image/x-windows-bmp":
												//if picture. do preview
												prv.push(
													ns.div(
														`col-${thumbnailsize}`,
														ns.div(
															"btn border p-1",
															{
																onclick: `ns.file.download('${data[0].id}','${data[0].filename}');`,
															},
															{
																tag: "img",
																class: "img-fluid mx-auto d-block rounded",
																attr: {
																	"data-ns-src": `api/file/${item.id}`,
																},
															}
														)
													)
												);
												break;

											default:
												prv.push(
													ns.div(
														`d-flex align-items-stretch col-${thumbnailsize}`,
														ns.div(
															"btn border p-1 d-flex justify-content-center w-100",
															{
																onclick: `ns.file.download('${data[0].id}','${data[0].filename}');`,
															},
															ns.span(
																"align-self-center",
																ns.icon({
																	icon: "download",
																	size: "2x",
																})
															)
														)
													)
												);
												break;
										}
									});

									ns.dlg.box({
										title: null,
										button: null,
										static: false,
										size: "lg",
										elems: ns.div(
											"container p-0",
											ns.div("d-flex justify-content-center row g-3", prv)
										),
									});
								}
							}
						})
						.catch((err) => {
							ns.loading.stop(sender);
						});
				}
			}
		},
	};
})(ns);
//icon generator
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {
	const ico = [
		{
			key: "i",
			icon: "info-circle",
			color: "primary",
			textcolor: "white",
		},
		{
			key: "!-danger",
			icon: "exclamation-triangle",
			color: "danger",
			textcolor: "white",
		},
		{
			key: "!!",
			icon: "exclamation-triangle",
			color: "danger",
			textcolor: "white",
		},
		{
			key: "!",
			icon: "exclamation-triangle",
			color: "warning",
			textcolor: null,
		},
		{
			key: "?",
			icon: "question-circle",
			color: "success",
			textcolor: "white",
		},
		{
			key: "-",
			icon: "minus-circle",
			color: "danger",
			textcolor: "white",
		},
		{
			key: "x",
			icon: "times-circle",
			color: "danger",
			textcolor: "white",
		},
		{
			key: "/",
			icon: "check-circle",
			color: "success",
			textcolor: "white",
		},
		{
			key: "save",
			icon: "save",
			color: "success",
			textcolor: "white",
		},
		{
			key: "delete",
			icon: "trash",
			color: "danger",
			textcolor: "white",
		},
		{
			key: "lock",
			icon: "lock",
			color: "warning",
			textcolor: null,
		},
		{
			key: "shield",
			icon: "shield-alt",
			color: "danger",
			textcolor: "white",
		},
		{
			key: "logout",
			icon: "door-open",
			color: "secondary",
			textcolor: null,
		},
	];

	ns.sIcon = function (icon) {
		if (icon) {
			var found = ico.find((o) => o.key === icon);
			if (found) {
				return found;
			}
		}

		return null;
	};

	/**
	 * icon     : sting without fa-
	 * style    : fas|fab
	 * fixwidth : true|false
	 * size     : xs|sm|lg|2x|...|10x
	 * rotate   : 90|180|270|horizontal|vertical|both
	 * spin     : true|false
	 * color	: bootstrapColor
	 * class	: string|["string"]
	 *
	 * usage:
	 * ns.icon(stringicon)
	 * ns.icon("home")
	 * ns.icon({icon:"home"})
	 */

	ns.icon = function (opt) {
		if (opt) {
			//change ns.icon(string) to ns.icon({icon:string})
			if (typeof opt === "string") {
				return ns.icon({
					icon: opt,
				});
			} else {
				if (opt.hasOwnProperty("ns")) {
					//console.log("Its spinner");
					return opt;
				} else {
					//shortcut icon
					var si = ns.sIcon(opt.icon);
					if (si) {
						opt.icon = si.icon;
						opt.color = si.color;
					}

					if (opt.icon === "favicon") {
						return {
							tag: "img",
							class: "favicon",
							attr: { src: "./img/favicon.ico" },
						};
					} else {
						opt = $.extend(
							{},
							{
								icon: null,
								class: null,
								style: "fas",
								fixwidth: true,
								size: null,
								rotate: null,
								stack: 0,
								spin: false,
								color: null,
								elems: null,
							},
							opt
						);

						//generate tag
						var cls = [];

						//size
						if (opt.size) {
							cls.push(`fa-${opt.size}`);
						}

						//class
						if (opt.class) {
							if (Array.isArray(opt.class)) {
								cls.push(opt.class.combine(" "));
							} else {
								cls.push(opt.class);
							}
						}

						//stack
						if (opt.stack > 0) {
							cls.push(`fa-stack-${opt.stack}x`);

							if (opt.stack === 1) {
								cls.push("fa-inverse");
							}
						}

						//color
						if (opt.color) {
							cls.push(`text-${opt.color}`);
						}

						//fix width
						if (opt.fixwidth) {
							cls.push("fa-fw");
						}

						//rotate
						if (opt.rotate) {
							switch (opt.rotate) {
								case 90:
								case 180:
								case 270:
									cls.push(`fa-rotate-${opt.rotate}`);
								case "horizontal":
								case "vertical":
								case "both":
									cls.push(`fa-flip-${opt.rotate}`);
							}
						}

						//spin
						if (opt.spin) {
							cls.push("fa-spin");
						}

						//stack icon
						if ((opt.icon === null, opt.elems && Array.isArray(opt.elems) && opt.elems.length === 2)) {
							cls.push("fa-stack");
							return {
								ns: 1,
								tag: "span",
								class: cls,
								elems: opt.elems.map((i, xi) => {
									var stack = opt.elems.length - xi;
									i.stack = stack;
									return ns.icon(i);
								}),
							};
						} else {
							cls.push(opt.style);
							cls.push(`fa-${opt.icon}`);

							return {
								ns: 1,
								tag: "i",
								class: cls,
								elems: opt.elems,
							};
						}
					}
				}
			}
		}
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.img = function (opt) {
		if (opt) {
			if (typeof opt === "string") {
				return ns.img({ src: opt });
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						class: null,
						src: null,
						alt: null,
						width: null,
						height: null,
						fluid: false,
						thumbnail: false,
						caption: null,
						captionclass: null,
					},
					opt
				);

				var img = {
					tag: "img",
					class: [
						opt.fluid ? "img-fluid" : null,
						opt.thumbnail ? "img-thumbnail" : null,
						!opt.fluid && !opt.thumbnail ? "d-inline-block align-text-top" : null,
						opt.class ? opt.class : null,
					].combine(" "),
					attr: {
						src: opt.src ? opt.src : null,
						alt: opt.alt ? opt.alt : null,
						width: opt.width ? opt.width : null,
						height: opt.height ? opt.height : null,
					},
				};

				if (opt.caption) {
					return {
						tag: "figure",
						class: "figure",
						elems: [img, { tag: "figcaption", class: ["figure-caption", opt.captionclass], elems: opt.caption }],
					};
				} else {
					return img;
				}
			}
		}
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	var fn = {
		numctlclick: function (sender, step) {
			var cont = $(sender).parent();
			var ctl = $(cont).find("input[type='number']");
			var val = parseInt($(ctl).val(), 10);
			var min = $(ctl).attr("min");
			var max = $(ctl).attr("max");

			min = min ? parseInt(min, 10) : Number.MIN_VALUE;
			max = max ? parseInt(max, 10) : Number.MAX_VALUE;

			if (val + step >= min && val + step <= max) {
				$(ctl).val(val + step);
			} else if (val + step > max) {
				$(ctl).val(max);
			} else if (val + step < min) {
				$(ctl).val(min);
			}
		},
	};
	ns.input = function (opt) {
		opt = $.extend(
			{},
			{
				id: null,
				name: null,
				class: null,
				label: null,
				labelsize: null, //sm-2
				ctlsize: null, //if null col-auto if labelsize is set
				hiddenlabel: null,
				nowarp: false,
				floatinglabel: false, //only for form-control
				btncheck: false, //only for radio and checkbox
				type: "text",
				placeholder: null,
				min: 0,
				max: 0,
				step: 0,
				rows: 0,
				plaintext: false, //only if readonly true
				readonly: false,
				disabled: false,
				multiple: false,
				size: null,
				style: null,
				weight: null, //sm|md|lg
				value: null,
				checked: false, //true|false
				inline: false,
				onchange: null,
				onclick: null,
				onfocus: null,
				onblur: null,
				required: false,
				valid: null,
				invalid: null,
				before: null,
				beforetype: "text",
				after: null,
				aftertype: "text",
				option: null,
				data: null,
				numctl: false,
				addctl: null,
				tooltip: null,
				flexcontainer: false,
				hascontainer: true,
			},
			opt
		);

		//generate id
		opt.id = opt.id ? opt.id : ns.core.UUID();

		//floating label not works with some input
		if (opt.floatinglabel) {
			if (["checkbox", "radio", "switch", "file"].indexOf(opt.type) > -1 || opt.readonly) {
				opt.floatinglabel = false;
			} else {
				if (opt.label && !opt.placeholder) {
					opt.placeholder = opt.label;
				}
			}
		}

		//generate label
		var lbl = [];
		if (!opt.floatinglabel && opt.label && ["checkbox", "radio", "switch"].indexOf(opt.type) === -1) {
			lbl.push({
				tag: "label",
				class: [, opt.labelsize ? `col-form-label col-${opt.labelsize}` : "form-label"],
				attr: { for: opt.id },
				elems: opt.label,
			});
		}

		//generate control
		var ctl = [];

		//add before element
		if (opt.before) {
			if (opt.beforetype === "text") {
				// if (!opt.before.hasOwnProperty("ns")) {
				ctl.push({
					tag: "span",
					class: "input-group-text",
					elems: opt.before,
				});
			} else {
				ctl = ctl.concat(opt.before);
			}
		} else {
			//check if before element isnot set
			//and numctl is true
			//and type is number
			if (opt.type === "number" && opt.numctl === true) {
				ctl.push(
					ns.button({
						label: ns.icon("minus"),
						color: "primary",
						onclick: function (sender) {
							fn.numctlclick(sender, -opt.step ? -opt.step : 1);
						},
					})
				);
			}
		}

		var mainctl = [];
		//generate main ctl
		switch (opt.type) {
			case "switch":
			case "checkbox":
			case "radio":
				mainctl.push(
					ns.tooltip(opt.tooltip, {
						tag: "input",
						class: [opt.btncheck ? "btn-check" : "form-check-input", opt.class],
						attr: {
							id: opt.id,
							"aria-label": opt.hiddenlabel ? opt.hiddenlabel : null,
							name: opt.name,
							type: opt.type === "switch" ? "checkbox" : opt.type,
							placeholder: opt.placeholder,
							min: opt.min,
							max: opt.max,
							step: opt.step,
							readonly: opt.readonly ? "" : null,
							disabled: opt.disabled ? "" : null,
							required: opt.required ? "required" : null,
							value: opt.value,
							checked: opt.checked ? "checked" : null,
							autocomplete: opt.btncheck ? "off" : null,
							list: dtlistId,
							onchange: opt.onchange,
							onclick: opt.onclick,
							onfocus: opt.onfocus,
							onblur: opt.onblur,
						},
						style: opt.style,
						elems: null,
					})
				);

				if (opt.label) {
					mainctl.push({
						tag: "label",
						class: opt.btncheck
							? ["btn", opt.color ? `btn-${opt.color}` : "btn-primary"]
							: "form-check-label",
						attr: { for: opt.id },
						elems: opt.label,
					});
				}

				break;
			case "textarea":
				mainctl.push(
					ns.tooltip(opt.tooltip, {
						tag: "textarea",
						class: [
							opt.plaintext && opt.readonly ? "form-control-plaintext" : "form-control",
							opt.weight &&
							!(
								opt.before ||
								opt.after ||
								opt.addctl !== null ||
								(opt.type === "number" && opt.numctl === true)
							)
								? `form-control-${opt.weight}`
								: null,
							opt.label && opt.floatinglabel
								? [
										opt.before || opt.after ? "rounded-0" : null,
										opt.before ? "rounded-end" : null,
										opt.after ? "rounded-start" : null,
								  ].combine(" ")
								: null,
							opt.class,
						],
						attr: {
							id: opt.id,
							"aria-label": opt.hiddenlabel ? opt.hiddenlabel : null,
							name: opt.name,
							placeholder: opt.placeholder,
							readonly: opt.readonly ? "" : null,
							disabled: opt.disabled ? "" : null,
							required: opt.required ? "required" : null,
							rows: opt.rows,
							onchange: opt.onchange,
							onclick: opt.onclick,
							onfocus: opt.onfocus,
							onblur: opt.onblur,
						},
						style: opt.style,
						elems: opt.value,
					})
				);
				break;
			case "select":
				mainctl.push(
					ns.tooltip(opt.tooltip, {
						tag: "select",
						class: [
							opt.plaintext && opt.readonly ? "form-select-plaintext" : "form-select",
							opt.weight &&
							!(
								opt.before ||
								opt.after ||
								opt.addctl !== null ||
								(opt.type === "number" && opt.numctl === true)
							)
								? `form-select-${opt.weight}`
								: null,
							opt.label && opt.floatinglabel
								? [
										opt.before || opt.after ? "rounded-0" : null,
										opt.before ? "rounded-end" : null,
										opt.after ? "rounded-start" : null,
								  ].combine(" ")
								: null,
							opt.class,
						],
						data: opt.data,
						attr: {
							id: opt.id,
							"aria-label": opt.hiddenlabel ? opt.hiddenlabel : null,
							name: opt.name,
							placeholder: opt.placeholder,
							readonly: opt.readonly ? "" : null,
							disabled: opt.disabled ? "" : null,
							required: opt.required ? "required" : null,
							multiple: opt.multiple,
							size: opt.rows,
							onchange: opt.onchange,
							onclick: opt.onclick,
							onfocus: opt.onfocus,
							onblur: opt.onblur,
						},
						style: opt.style,
						elems: ns.option(opt.option, opt.value),
					})
				);
				break;
			case "datalist":
				mainctl.push({
					tag: "datalist",
					attr: { id: opt.id },
					elems: ns.option(opt.option),
				});
				break;
			default:
				//datalist id standby if option provided
				var dtlistId = opt.option ? ns.core.UUID() : null;

				//create control
				mainctl.push(
					ns.tooltip(opt.tooltip, {
						tag: "input",
						class: [
							opt.type !== "range" &&
							opt.type !== "button" &&
							opt.type !== "submit" &&
							opt.type !== "reset"
								? [
										opt.plaintext && opt.readonly ? "form-control-plaintext" : "form-control",
										,
										opt.weight &&
										!(
											opt.before ||
											opt.after ||
											opt.addctl !== null ||
											(opt.type === "number" && opt.numctl === true)
										)
											? `form-control-${opt.weight}`
											: null,
								  ].combine(" ")
								: opt.type !== "button" && opt.type !== "submit" && opt.type !== "reset"
								? "form-range"
								: null,
							opt.type === "color"
								? ["form-control-color", opt.floatinglabel ? "w-100" : null].combine(" ")
								: null,
							opt.label && opt.floatinglabel
								? [
										opt.before || opt.after || opt.numctl ? "rounded-0" : null,
										opt.before ? "rounded-end" : null,
										opt.after ? "rounded-start" : null,
								  ].combine(" ")
								: opt.label && opt.numctl
								? "rounded-0"
								: null,
							opt.class,
						],
						data: opt.data,
						attr: {
							id: opt.id,
							"aria-label": opt.hiddenlabel ? opt.hiddenlabel : null,
							name: opt.name,
							type: opt.type,
							role:
								opt.type === "button" && opt.type === "submit" && opt.type === "reset"
									? "button"
									: null,
							placeholder: opt.placeholder,
							min: opt.min,
							max: opt.max,
							step: opt.step,
							readonly: opt.readonly ? "" : null,
							disabled: opt.disabled ? "" : null,
							required: opt.required ? "required" : null,
							value:
								["date", "datetime", "month", "datetime-local", "time", "week"].indexOf(opt.value) > -1
									? moment(opt.value)
									: opt.value,
							list: dtlistId,
							onchange: opt.onchange,
							onclick: opt.onclick,
							onfocus: opt.onfocus,
							onblur: opt.onblur,
						},
						style: opt.style,
						elems: null,
					})
				);

				//generate datalist for input
				if (opt.option) {
					mainctl.push({
						tag: "datalist",
						attr: { id: dtlistId },
						elems: ns.option(opt.option),
					});
				}
		}

		//put label for floating label
		if (opt.floatinglabel && opt.label) {
			mainctl.push({
				tag: "label",
				attr: { for: opt.id },
				elems: opt.label,
			});

			ctl.push(ns.div("form-floating flex-grow-1", mainctl));
		} else {
			ctl = ctl.concat(mainctl);
		}

		//add after element
		if (opt.after) {
			if (opt.aftertype === "text") {
				// if (!opt.after.hasOwnProperty("ns")) {
				ctl.push({
					tag: "span",
					class: "input-group-text",
					elems: opt.after,
				});
			} else {
				ctl = ctl.concat(opt.after);
			}
		} else {
			//check if before element isnot set
			//and numctl is true
			//and type is number
			if (opt.type === "number" && opt.numctl === true) {
				ctl.push(
					ns.button({
						label: ns.icon("plus"),
						color: "primary",
						onclick: function (sender) {
							fn.numctlclick(sender, opt.step ? opt.step : 1);
						},
					})
				);
			} else if (opt.addctl !== null) {
				ctl.push(
					ns.button({
						label: ns.icon("plus"),
						color: "primary",
						onclick: opt.addctl,
					})
				);
			}
		}

		//valid message
		if (opt.valid) {
			ctl.push(ns.div("valid-feedback", opt.valid));
		}

		//invalid message
		if (opt.invalid) {
			ctl.push(ns.div("invalid-feedback", opt.invalid));
		}

		//input ctl in div.col-auto if labelsize is set
		if (opt.labelsize) {
			ctl = [ns.div(opt.ctlsize ? `col-${opt.ctlsize}` : "col-auto", ctl)];
		}

		//put ctl in div.input-group if has before/after
		if (opt.before || opt.after || opt.addctl !== null || (opt.type === "number" && opt.numctl === true)) {
			if (opt.flexcontainer) {
				ctl = [
					ns.div({
						ns: 0,
						class: ["d-flex", opt.class],
						elems: ctl,
					}),
				];
			} else {
				ctl = [
					ns.div(
						[
							"input-group",
							opt.nowarp ? "flex-nowarp" : null,
							opt.weight ? `input-group-${opt.weight}` : null,
							opt.valid || opt.invalid ? "has-validation" : null,
						],
						ctl
					),
				];
			}
		}

		//put ctl in div.form-check if checkbox/radio/switch
		if (["checkbox", "radio", "switch"].indexOf(opt.type) > -1) {
			if (opt.flexcontainer) {
				ctl = [
					ns.div({
						ns: 0,
						class: ["d-flex", opt.class],
						elems: ctl,
					}),
				];
			} else {
				ctl = [
					ns.div(
						[
							opt.label && opt.btncheck ? null : "form-check",
							opt.label && opt.inline ? "form-check-inline" : null,
							opt.type === "switch" ? " form-switch" : null,
							opt.valid || opt.invalid ? "has-validation" : null,
						],
						ctl
					),
				];
			}
		}

		var res = [];
		if (opt.size || opt.type === "hidden") {
			res = [ns.div([opt.size, opt.type === "hidden" ? "d-none" : null].combine(" "), lbl.concat(ctl))];
		} else {
			res = lbl.concat(ctl);
		}

		if (res && typeof res === "object") {
			if (Array.isArray(res)) {
				if (res.length === 1) {
					return res[0];
				} else {
					// console.log(res);
					// console.warn(`input #${opt.id} has many element`);
					return {
						elems: res,
					};
				}
			} else {
				return res;
			}
		} else {
			console.log(res);
			console.warn(`input #${opt.id} has many element`);
			return {
				elems: res,
			};
		}
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.inputgroup = {
		container: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.inputgroup.container({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						label: null,
						class: null,
						elems: null,
						nowrap: false,
					},
					opt
				);

				return [
					opt.label
						? {
								tag: "label",
								attr: {
									for: opt.id ? opt.id : null,
									class: "form-label",
									elems: opt.label,
								},
						  }
						: null,
					ns.div(
						["input-group", opt.nowrap ? "flex-nowrap" : null, opt.class],
						opt.elems
					),
				].removeEmpty();
			}
		},
		text: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.inputgroup.text({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						class: null,
						elems: null,
					},
					opt
				);

				return ns.div(["input-group-text", opt.class], { id: opt.id }, opt.elems);
			}
		},
	};
})(ns);
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
// 			return [].slice.call(this.nsElems)[0];
// 		} else {
// 			return [].slice.call(this.nsElems);
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
// 	array.forEach(function (item, index) {
// 		callback(index, item);
// 	});
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
//main list controller
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {
	var fn = {
		options: {
			base: {
				container: null,
				id: ns.core.UUID(),
				dbname: "",
				control: null,
				listprocessor: function (list) {
					return new Promise((res, rej) => {
						if (list && list.length > 0) {
							res([
								{
									group: null,
									items: list.map((i) => {
										return {
											key: i._id,
											label: i.name,
										};
									}),
								},
							]);
						} else {
							res(null);
						}
					});
				},
				onpagechange: function (skip, sender) {
					console.warn("Unhandle onpagechange");
				},
			},
			query: {
				filter: null,
				sort: null,
				field: { __v: 0, state: 0 },
				limit: 10,
				skip: 0,
			},
			item: {
				key: null,
				label: null,
				sub: null,
				control: null,
				controlstyle: "btn-group", //btn-group|dropdown|null
				icon: null,
				picture: null,
				checked: false,
				key: null,
				onclick: null,
			},
			group: {
				key: null,
				label: null,
				icon: null,
				bigicon: false,
				picture: null,
				key: null,
				elems: null,
			},
		},
		db: function (id, query, sender) {
			var opt = ns.data.get(id);

			return new Promise((res, rej) => {
				var total = null;
				ns.api
					.post({
						sender: sender,
						name: `list/${opt.dbname}`,
						data: query,
					})
					.then((result) => {
						total = result.total;
						return opt.listprocessor(result.data);
					})
					.then((data) => {
						res({
							total: total,
							data: data,
						});
					})
					.catch((err) => {
						rej(err);
					});
			});
		},
		clear: function (id) {
			var container = $(`#${id}`);
			if (container && container.length > 0) {
				$(container).find(".list-group").remove();
				$(container).find(".ns-list-header").remove();
				$(container).find(".ns-list-page").remove();
				$(container).find(".list-group-item").remove();
			}
		},
		build: {
			page: function (opt) {
				if (opt.total > 0) {
					return ns.pagination({
						limit: opt.limit,
						skip: opt.skip,
						total: opt.total,
						max: 5,
						onchange: function (skip, sender) {
							ns.list.fn.onPageChange(skip, sender);
						},
					});
				} else {
					return null;
				}
			},
			item: function (opt) {
				opt = $.extend({}, fn.options.item, opt);

				var res = [];

				//create label
				if (opt.label) {
					res.push(ns.div("ns-item-label me-2", opt.label));
				}

				//create sub label
				if (opt.sub) {
					res.push(
						ns.div([
							{
								tag: "small",
								class: "text-muted me-2 ns-item-sub",
								elems: Array.isArray(opt.sub) ? opt.sub.combine(" | ") : opt.sub,
							},
						])
					);
				}

				//wrap in div
				res = [ns.div(res.slice())];

				//create icon
				if (opt.icon) {
					res.unshift(
						ns.div(
							"ns-item-icon",
							ns.icon({
								size: "lg",
								elems: [{ icon: "circle" }, { icon: opt.icon }],
							})
						)
					);
				}

				//create picture
				if (opt.picture) {
					res.unshift(
						ns.div(
							"ns-item-picture",
							ns.div([
								{
									tag: "img",
									attr: {
										"data-ns-src": `api/file/${opt.picture}`,
									},
								},
							])
						)
					);
				}

				//create check tag
				res.unshift(
					ns.div(
						"ns-item-check",
						ns.icon({
							size: "lg",
							elems: [{ icon: "circle" }, { icon: "check" }],
						})
					)
				);

				//wrap in div
				res = [ns.div(res.slice())];

				//put control
				if (opt.control && Array.isArray(opt.control)) {
					if (opt.controlstyle === "btn-group") {
						res.push(
							ns.div(
								"ns-item-control",
								{ onclick: "ns.list.fn.preventBubble(event)" },
								ns.btngroup(opt.control.map((item) => ns.button(item)))
							)
						);
					} else if (opt.controlstyle === "dropdown") {
						res.push(
							ns.div(
								"ns-item-control",
								{ onclick: "ns.list.fn.preventBubble(event)" },
								ns.button({
									option: opt.control,
								})
							)
						);
					} else {
						res.push(
							ns.div(
								"ns-item-control",
								{ onclick: "ns.list.fn.preventBubble(event)" },
								opt.control
							)
						);
					}
				}

				return ns.div(
					[
						"list-group-item",
						"list-group-item-action",
						opt.checked ? "ns-checked" : null,
					],
					{
						"data-key": opt.key,
						"data-ns-onclick":
							opt.onclick && typeof opt.onclick === "string" ? opt.onclick : null,
						onclick: "ns.list.fn.itemOnClick(this,event)",
					},
					res
				);
			},
			group: function (opt) {
				opt = $.extend({}, fn.options.group, opt);

				var res = [];

				//create label
				if (opt.label) {
					res.push({
						tag: "h5",
						class: "ns-item-label",
						elems: opt.label,
					});
				}

				//create icon
				if (opt.icon) {
					if (opt.bigicon) {
						res.unshift(
							ns.div(
								"display-1",
								ns.icon({
									size: "lg",
									icon: opt.icon,
								})
							)
						);
					} else {
						res.unshift(
							ns.div(
								"ns-item-icon",
								ns.icon({
									size: "lg",
									elems: [{ icon: "circle" }, { icon: opt.icon }],
								})
							)
						);
					}
				}

				//create picture
				if (opt.picture) {
					res.unshift(
						ns.div(
							"ns-item-picture",
							ns.div([
								{
									tag: "img",
									attr: {
										"data-ns-src": `api/file/${opt.picture}`,
									},
								},
							])
						)
					);
				}

				if (res && res.length > 0) {
					return [
						ns.div("ns-list-header", { "data-key": opt.key }, res),
						ns.div(
							"list-group ns-list-group",
							{ "data-ns-group-key": opt.key },
							opt.elems
						),
					];
				} else {
					return [
						ns.div("list-group ns-list-group", { "data-ns-group-key": "" }, opt.elems),
					];
				}
			},
			list: function (id, query) {
				query = $.extend({}, fn.options.query, query);

				return new Promise((res, rej) => {
					fn.db(id, query)
						.then((data) => {
							//process list
							var li = [];

							if (data.data && data.data.length > 0) {
								//generate li
								$.each(data.data, (x, i) => {
									li.push.apply(
										li,
										fn.build.group({
											label: i.group,
											elems: i.items.map((item) => {
												return fn.build.item(item);
											}),
										})
									);
								});
							} else {
								li.push.apply(li, fn.build.group({ label: "No Data" }));
							}

							res({
								page: fn.build.page({
									total: data.total,
									skip: query.skip,
									limit: query.limit,
								}),
								li: { elems: li },
							});
						})
						.catch((err) => {
							rej(err);
						});
				});
			},
			container: function (id, query) {
				return new Promise((res, rej) => {
					query = $.extend({}, fn.options.query, query);

					fn.build
						.list(id, query)
						.then((data) => {
							var opt = ns.data.get(id);
							$(opt.container).empty();
							ns.build.append(
								opt.container,
								ns.div("ns-list-container ns-mode-normal", { id: id }, [
									opt.control,
									data.li,
									data.page,
								])
							);

							ns.build.init(opt.container);
							res();
						})
						.catch((err) => {
							rej(err);
						});
				});
			},
		},
		getChecked: function (sender) {
			var listcontainer = $(sender).closest(".ns-list-container");
			var itemchecked = $(listcontainer).find(".ns-checked");
			if (itemchecked && itemchecked.length > 0) {
				return $(itemchecked)
					.get()
					.map((i) => {
						return {
							key: $(i).attr("data-key"),
							title: $(i).find(".ns-label").text(),
						};
					});
			} else {
				return null;
			}
		},
	};

	var fnpublic = {
		preventBubble: function (event) {
			event.stopPropagation();
		},
		itemOnClick: function (sender, event) {
			event.stopPropagation();

			var container = $(sender).closest(".ns-list-container");

			if (container && container.length > 0 && $(container).hasClass("ns-mode-check")) {
				//check mode
				if ($(sender).hasClass("ns-checked")) {
					$(sender).removeClass("ns-checked");
				} else {
					$(sender).addClass("ns-checked");
				}
			} else {
				//normal mode
				var fnonclick = $(sender).attr("data-ns-onclick");
				if (fnonclick) {
					window[fnonclick](sender, event);
				}
			}
		},
		onPageChange: function (skip, sender) {
			var container = $(sender).closest(".ns-list-container");
			var id = $(container).attr("id");
			var opt = ns.data.get(id);
			opt.onpagechange(skip, sender);
		},
		mode: {
			normal: function (sender) {
				var container = $(sender).closest(".ns-list-container");
				if (container && container.length > 0) {
					//animation
					$(container)
						.find(".ns-list-control.ns-mode-check")
						.removeClass("ns-fadeslidein")
						.addClass("ns-fadeslideout");

					setTimeout(
						function (container) {
							$(container).removeClass("ns-mode-check").addClass("ns-mode-normal");
						},
						500,
						container
					);

					$(container)
						.find(".ns-list-control.ns-mode-normal")
						.removeClass("ns-fadeslideout")
						.addClass("ns-fadeslidein");
				}
			},
			check: function (sender) {
				var container = $(sender).closest(".ns-list-container");
				if (container && container.length > 0) {
					//animation
					$(container)
						.find(".ns-list-control.ns-mode-check")
						.removeClass("ns-fadeslideout")
						.addClass("ns-fadeslidein");

					setTimeout(
						function (container) {
							$(container).removeClass("ns-mode-normal").addClass("ns-mode-check");
						},
						500,
						container
					);

					$(container)
						.find(".ns-list-control.ns-mode-normal")
						.removeClass("ns-fadeslidein")
						.addClass("ns-fadeslideout");
				}
			},
		},
		check: function (sender) {
			var container = $(sender).closest(".ns-list-container");
			if (container && container.length > 0) {
				let items = $(container).find(".list-group-item");
				let checked = $(container).find(".list-group-item.ns-checked");

				if (checked.length === items.length) {
					$(items).removeClass("ns-checked");
				} else {
					$(items).addClass("ns-checked");
				}
			}
		},
	};

	ns.list = {
		fn: fnpublic,

		checked: function (sender) {
			return fn.getChecked(sender);
		},
		refresh: function (id, query) {
			return new Promise((res, rej) => {
				fn.build
					.list(id, query)
					.then((data) => {
						fn.clear(id);
						var container = $(`#${id}`)[0];
						ns.build.append(container, [data.li, data.page]);
						ns.build.init(container);
						res();
					})
					.catch((err) => {
						rej(err);
					});
			});
		},
		build: function (opt, query) {
			opt = $.extend({}, fn.options.base, opt);

			//validate required data
			if (opt.dbname) {
				if (opt.container) {
					//keep opt in memory
					ns.data.set(opt.id, opt);
					fn.build.container(opt.id, query).then(() => {
						ns.build.init(opt.container);
					});
				} else {
					console.error("ns.list opt required container");
				}
			} else {
				console.error("ns.list opt required dbname");
			}
		},
		query: function (sender, query) {
			ns.query(sender, query);
		},
		excel: function (sender, query) {
			var id = $(sender).closest(".ns-list-container").attr("id");
			var opt = ns.data.get(id);

			ns.api
				.download({
					sender: sender,
					name: `excel/${opt.dbname}`,
					data: query,
				})
				.catch((err) => {
					rej(err);
				});
		},
	};
})(ns);
//main list controller (listctl)
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {
	var fn = {};

	ns.listctl = function (opt) {
		opt = $.extend(
			{},
			{
				class: null,
				icon: null,
				title: null,
				menu: null,
				fixed: false,
				main: null,
				check: null,
				query: null,
				excel: null,
			},
			opt
		);

		if (
			opt.main ||
			opt.check ||
			typeof opt.excel === "string" ||
			typeof opt.query === "string" ||
			ns.core.isFunction(opt.query) ||
			ns.core.isFunction(opt.excel)
		) {
			var tmp = {};
			var rtn = [];

			//build title
			var ctltitle = null;
			if (opt.title || opt.menu) {
				ctltitle = ns.div(
					"d-flex justify-content-center me-md-2 me-0 mb-2 w-sm-100 w-md-auto",
					[
						opt.menu
							? opt.option
								? ns.dropdown({
										icon: opt.icon,
										color: "primary",
										onclick:
											opt.menu && typeof opt.menu === "string"
												? opt.menu
												: null,
										option:
											opt.menu &&
											typeof opt.menu !== "string" &&
											Array.isArray(opt.menu)
												? opt.menu
												: null,
										optionarrow: false,
										label: opt.title,
										// labelshow: "md",
								  })
								: ns.button({
										icon: opt.icon,
										color: "primary",
										onclick:
											opt.menu && typeof opt.menu === "string"
												? opt.menu
												: null,
										label: opt.title,
										// labelshow: "md",
								  })
							: {
									tag: "h5",
									class: "m-0 ps-2",
									elems: opt.title,
							  },
					]
				);
			}

			//build main
			var ctlmain1 = null;
			if (opt.main) {
				if (!Array(opt.main)) {
					opt.main = [opt.main];
				}

				ctlmain1 = ns.btngroup({
					class: "ms-2",
					elems: opt.main.map(function (i) {
						if (i.option) {
							return ns.dropdown(i);
						} else {
							return ns.button(i);
						}
					}),
				});
			}

			var ctlmain2 = null;
			if (
				opt.check ||
				typeof opt.excel === "string" ||
				typeof opt.query === "string" ||
				ns.core.isFunction(opt.excel) ||
				ns.core.isFunction(opt.query)
			) {
				ctlmain2 = ns.btngroup({
					class: "ms-2",
					elems: [
						opt.check
							? ns.button({
									icon: "tasks",
									color: "primary",
									onclick: "ns.list.fn.mode.check(this)",
							  })
							: null,
						ns.core.isFunction(opt.excel) || typeof opt.excel === "string"
							? ns.button({
									icon: "file-excel",
									color: "primary",
									onclick: opt.excel,
							  })
							: null,
						ns.core.isFunction(opt.query) || typeof opt.query === "string"
							? ns.button({
									icon: "cog",
									color: "primary",
									onclick: opt.query,
							  })
							: null,
					].removeEmpty(),
				});
			}

			if (ctlmain1 || ctlmain2 || ctltitle) {
				tmp.normal = [];

				if (ctltitle) {
					tmp.normal.push(ctltitle);
				}

				tmp.normal.push(ns.div("mx-auto d-none d-md-flex mb-2", null));

				if (ctlmain1 || ctlmain2) {
					var ctlmain = ns.div("mb-2", [
						ctlmain1 ? ctlmain1 : null,
						ctlmain2 ? ctlmain2 : null,
					]);
					tmp.normal.push(ctlmain);
				}
			}

			//build check
			if (opt.check) {
				var ctlcheck = [];

				ctlcheck.push(
					ns.button({
						icon: "check-double",
						color: "primary",
						label: "All",
						onclick: "ns.list.fn.check(this)",
					})
				);

				$.each(opt.check, function (index, item) {
					ctlcheck.push(ns.button(item));
				});

				tmp.check = [
					ctltitle ? ctltitle : null,
					ns.div("mx-auto d-none d-md-flex mb-2", null),
					ns.div("mb-2", [
						ns.button({
							icon: "chevron-left",
							color: "primary",
							onclick: "ns.list.fn.mode.normal(this)",
						}),
						ctlcheck ? ns.btngroup({ class: "ms-2", elems: ctlcheck }) : null,
					]),
				].removeEmpty();
			} else {
				tmp.check = null;
			}

			//generate container
			if (tmp.normal) {
				rtn.push(
					ns.div(
						[
							"ns-list-control",
							"ns-mode-normal",
							"btn-toolbar",
							"justify-content-center",
							"justify-content-between-md",
							opt.fixed ? "position-fixed top-0" : null,
							opt.class,
						],
						{ role: "toolbar" },
						tmp.normal
					)
				);
			}

			if (tmp.check) {
				rtn.push(
					ns.div(
						[
							"ns-list-control",
							"ns-mode-check",
							"btn-toolbar",
							"justify-content-center",
							"justify-content-between-md",
							opt.fixed ? "position-fixed top-0" : null,
							opt.class,
						],
						{ role: "toolbar" },
						tmp.check
					)
				);
			}

			if (rtn && rtn.length > 0) {
				return {
					elems: rtn,
				};
			} else {
				return null;
			}
		} else {
			return null;
		}
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.listgroup = {
		container: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.listgroup.container({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						type: "ul",
						class: null,
						flush: false,
						numbered: false,
						horizontal: null,
						elems: null,
						label: null,
						id: null,
					},
					opt
				);

				//process horizontal
				if (opt.horizontal) {
					if (Array.isArray(opt.horizontal)) {
						$.each(opt.horizontal, function (i) {
							if (opt.horizontal[i] === true) {
								opt.horizontal[i] = "horizontal";
							} else if (opt.horizontal[i] !== "horizontal") {
								opt.horizontal[i] = `horizontal-${opt.horizontal[i]}`;
							}
						});
					} else {
						if (opt.horizontal === true) {
							opt.horizontal = "horizontal";
						} else if (opt.horizontal !== "horizontal") {
							opt.horizontal = `horizontal-${opt.horizontal}`;
						}
					}
				}

				if (opt.label) {
					opt.id = opt.id || ns.core.UUID();

					return [
						{
							tag: "label",
							class: "form-label",
							attr: { for: opt.id },
							elems: opt.label,
						},
						{
							tag: opt.type === "ul" && opt.numbered ? "ol" : opt.type,
							class: [
								"list-group",
								opt.class,
								opt.flush ? "list-group-flush" : null,
								opt.numbered ? "list-group-numbered" : null,
								ns.core.multipleClassSupport(opt.horizontal, "list-group-$1"),
							],
							attr: { id: opt.id },
							elems: opt.elems,
						},
					];
				} else {
					return {
						tag: opt.type === "ul" && opt.numbered ? "ol" : opt.type,
						class: [
							"list-group",
							opt.class,
							opt.flush ? "list-group-flush" : null,
							opt.numbered ? "list-group-numbered" : null,
							ns.core.multipleClassSupport(opt.horizontal, "list-group-$1"),
						],
						elems: opt.elems,
					};
				}
			}
		},
		item: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.listgroup.item({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						flush: false,
						elems: null,
						active: false,
						disabled: false,
						color: null,
						action: false,
						href: null,
						onclick: null,

						check: null, //null|checkbox|radio|switch
						value: null, //if check
						name: null, //if check
						id: null, //if check
					},
					opt
				);

				if (opt.check) {
					return {
						tag: "label",
						class: [
							"list-group-item",
							opt.check === "switch" ? "form-switch" : null,
							opt.disabled ? "disabled" : null,
							opt.action ? "list-group-item-action" : null,
							opt.color ? `list-group-item-${opt.color}` : null,
							opt.class,
						],
						attr: {
							onclick: opt.onclick,
							disabled: !opt.href && opt.disabled ? "" : null,
						},
						elems: [
							{
								tag: "input",
								class: ["form-check-input", "me-2", opt.check === "switch" ? "ms-0" : null],
								attr: {
									type: opt.check === "switch" ? "checkbox" : opt.check,
									value: opt.value,
									name: opt.name,
									id: opt.id,
									checked: opt.active ? "" : null,
								},
							},
							opt.elems,
						],
					};
				} else {
					return {
						tag: opt.href ? "a" : ns.core.isFunction(opt.onclick) ? "button" : "li",
						class: [
							"list-group-item",
							opt.active ? "active" : null,
							opt.disabled ? "disabled" : null,
							opt.action ? "list-group-item-action" : null,
							opt.color ? `list-group-item-${opt.color}` : null,
							opt.class,
						],
						attr: {
							href: opt.href,
							onclick: opt.onclick,
							disabled: !opt.href && opt.disabled ? "" : null,
							tabindex: opt.href && opt.disabled ? "-1" : null,
							"aria-disabled": opt.href && opt.disabled ? "true" : null,
						},
						elems: opt.elems,
					};
				}
			}
		},
	};
})(ns);
//loading controller
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {
	ns.loading = {
		start: function (elem) {
			return new Promise((res, rej) => {
				if (elem) {
					if ($(elem).hasClass("page-link")) {
						elem = $(elem).parent();
					}

					if (!$(elem).hasClass("loading")) {
						$(elem).addClass("loading");
						$(elem).addClass("disabled");
						$(elem).attr("disabled", "disabled");

						if ($(elem).attr("type") === "button") {
							var ctlicon = $(elem).find(".fas.fa-fw")[0];
							if (ctlicon) {
								$(ctlicon).attr("ns-old-class", $(ctlicon).attr("class"));
								$(ctlicon).attr("class", "fas fa-fw fa-circle-notch fa-spin");
							}
						}

						res();
					}
				} else {
					res();
				}
			});
		},
		stop: function (elem) {
			return new Promise((res, rej) => {
				if (elem) {
					if ($(elem).hasClass("page-link")) {
						elem = $(elem).parent();
					}

					if ($(elem).hasClass("loading")) {
						$(elem).removeClass("loading");
						$(elem).removeClass("disabled");
						$(elem).removeAttr("disabled");

						if ($(elem).attr("type") === "button") {
							var ctlicon = $(elem).find("[ns-old-class]")[0];
							if (ctlicon) {
								$(ctlicon).attr("class", $(ctlicon).attr("ns-old-class"));
								$(ctlicon).removeAttr("ns-old-class");
							}
						}

						res();
					}
				} else {
					res();
				}
			});
		},
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.menu = {
		item: function (opt) {
			if (opt && Array.isArray(opt)) {
				return {
					tag: "ul",
					class: "btn-toggle-nav",
					elems: opt.map(function (item) {
						if (typeof item === "string") {
							item = {
								label: item,
							};
						}

						item = $.extend(
							{},
							{
								label: null,
								icon: null,
								onclick: null,
								href: "javascript:void(0)",
								active: false,
							},
							item
						);

						return {
							tag: "li",
							elems: ns.div(
								["d-inline-block", item.active ? "active" : null],
								{
									onclick: item.onclick ? item.onclick : null,
									role: "button",
								},
								[
									ns.icon(item.icon),
									{
										tag: "span",
										class: [item.icon ? "ms-2" : null],
										elems: item.label,
									},
								]
							),
						};
					}),
				};
			} else {
				console.error("Unsupported argument");
			}
		},
		container: function (opt) {
			if (opt) {
				// if (typeof opt === "object" && opt.hasOwnProperty("item") && opt.item && Array.isArray(opt.item)) {
				opt = $.extend(
					{},
					{
						id: null,
						title: null,
						active: false,
						class: null,
						item: null,
					},
					opt
				);

				//generate id
				opt.id = opt.id ? opt.id : ns.core.UUID();

				return {
					elems: [
						ns.div([
							ns.div(
								["btn-toggle", opt.active ? "collapsed" : null],
								{
									"data-bs-toggle": "collapse",
									"data-bs-target": `#${opt.id}`,
									"aria-expanded": opt.active ? "true" : "false",
									role: "button",
								},
								{
									tag: "span",
									class: "ms-2",
									elems: opt.title,
								}
							),
						]),
						ns.div(["collapse", opt.active ? "show" : null, opt.class], { id: opt.id }, opt.item),
					],
				};
				// } else {
				// 	console.error("Unsupported argument");
				// }
			} else {
				console.error("Unsupported argument");
			}
		},
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.nav = function (opt) {
		/**
		 * ns.nav({
		 * 	style:tab|pill|none,
		 * 	align:left(null)|right|center|fill|vertical|vertical-right,
		 *  flush:true|false
		 * })
		 */
		if (opt) {
			if (typeof opt === "string") {
				return opt;
			} else {
				/**
				 * if direct set elems (using default nav configuration)
				 * example : ns.nav(["tab1","tab2","tab3"])
				 */

				if (!opt.elems) {
					opt = {
						elems: opt.slice(),
					};
				}

				opt = $.extend(
					{},
					{
						id: null,
						style: null, //null|tab|pill
						align: null,
						size: null, //need to set for vertical.only used if has body
						animate: true,
						border: true,
						rounded: true,
						flush: false,
						elems: [],
					},
					opt
				);

				//generate id
				opt.id = opt.id ? opt.id : ns.core.UUID();

				if (Array.isArray(opt.elems)) {
					//make sure one elems is active, if no active, set first as active
					var activeIndex = -1;
					opt.elems.forEach((item, index) => {
						if (activeIndex === -1) {
							if (item.active) {
								activeIndex = index;
							}
						}
					});

					if (activeIndex === -1 && typeof opt.elems[0] === "object") {
						opt.elems[0].active = true;
					}

					//start make item
					var resHeader = [];
					var resBody = [];

					var defOption = {
						id: null,
						label: null,
						icon: null,
						disable: false,
						active: false,
						option: null,
						elems: null,
					};

					opt.elems.forEach((item, index) => {
						//create header
						var itmHeader = [];
						if (typeof item === "string") {
							if (index === 0) {
								item = { label: item, active: true };
							} else {
								item = { label: item };
							}
						}

						item = $.extend({}, defOption, item);

						//create id for tab elems
						item.id = item.id
							? item.id
							: item.elems && item.elems.length > 0
							? ns.core.UUID()
							: null;

						//<li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Active</a></li>
						if (item.icon) {
							if (typeof item.icon === "string") {
								itmHeader.push({
									elems: ns.icon({
										icon: item.icon,
										class: "me-2",
									}),
								});
							} else {
								itmHeader.push({
									elems: ns.icon(item.icon),
								});
							}
						}

						//tab head label
						if (item.label) {
							itmHeader.push({
								elems: [
									{
										tag: "span",
										elems: item.label,
									},
								],
							});
						}

						//wrap label and icon
						itmHeader = [
							{
								tag: "a",
								class: [
									"nav-link",
									item.option ? "dropdown-toggle" : null,
									item.active ? "active" : null,
									item.disabled ? "disabled" : null,
								],
								attr: {
									href: `#${item.id}-body`,
									id: `${item.id}-head`,
									"data-bs-toggle": item.option
										? "dropdown"
										: opt.style === "tab"
										? "tab"
										: opt.style === "pill"
										? "pill"
										: "tab",
									"data-ns-hasbody": item.elems ? "true" : null,
									role: item.option ? "button" : null,
								},
								elems: itmHeader.slice(),
							},
						];

						//build option if provided
						if (item.option) {
							itmHeader.push({
								tag: "ul",
								class: "dropdown-menu",
								elems: ns.ddoption(item.option),
							});
						}

						//wrap in li
						itmHeader = {
							tag: "li",
							class: ["nav-item", item.option ? "dropdown" : null],
							attr: {
								role: "presentation",
							},
							elems: itmHeader.slice(),
						};

						//combine header in resHeder
						resHeader = resHeader.concat(itmHeader);

						//create body
						if (item.elems) {
							var itmBody = ns.div(
								[
									"tab-pane",
									opt.animate ? "fade" : null,
									item.active ? "active show" : null,
								],
								{
									id: `${item.id}-body`,
									role: "tabpanel",
								},
								item.elems
							);

							resBody = resBody.concat(itmBody);
						}
					});

					//wrap item in ul.nav
					resHeader = {
						tag: "ul",
						class: [
							"nav",
							//card-header-tabs if has body (will wrap in card)
							resBody && resBody.length > 0
								? opt.style === "tab"
									? "card-" +
									  (opt.align === "vertical-right" ? "footer" : "header") +
									  "-tabs"
									: opt.style === "pill"
									? "card-" +
									  (opt.align === "vertical-right" ? "footer" : "header") +
									  "-pills"
									: "card-" +
									  (opt.align === "vertical-right" ? "footer" : "header") +
									  "-tabs"
								: null,
							opt.column ? "flex-column mb-auto" : null,
							opt.flush ? "nav-flush" : null,
							opt.style === "tab"
								? "nav-tabs"
								: opt.style === "pill"
								? "nav-pills"
								: null,
							opt.align === "right"
								? "justify-content-end"
								: opt.align === "center"
								? "justify-content-center"
								: opt.align === "vertical" || opt.align === "vertical-right"
								? "flex-column mb-auto"
								: opt.align === "fill"
								? "nav-fill"
								: null,
						],
						attr: {
							id: `${opt.id}-head`,
							role: "tablist",
						},
						elems: resHeader.slice(),
					};

					if (resBody && resBody.length > 0) {
						resBody = ns.div("tab-content", { id: `${opt.id}-body` }, resBody.slice());
					} else {
						resBody = null;
					}

					if (resBody) {
						var hb = [];
						//put in container if size is set
						if (opt.size) {
							if (opt.align === "vertical-right") {
								hb = ns.div("row g-0", [
									ns.div("col", ns.div("card-body", resBody)),
									ns.div(
										[opt.size, "card-footer border-0 p-2"],
										ns.div(Array.isArray(resHeader) ? resHeader : [resHeader])
									),
								]);
							} else {
								hb = ns.div("row g-0", [
									ns.div(
										[opt.size, "card-header border-0"],
										ns.div(Array.isArray(resHeader) ? resHeader : [resHeader])
									),
									ns.div("col", ns.div("card-body", resBody)),
								]);
							}
						} else {
							hb = [ns.div("card-header", resHeader), ns.div("card-body", resBody)];
						}

						//wrap in card if has body
						return ns.div(
							[
								"card p-0", //need p-0 to make sure no one change this padding
								opt.rounded ? null : "rounded-0",
								opt.border ? null : "border-0",
							],
							hb
						);
					} else {
						return resHeader;
					}
				} else {
					opt.elems = [opt.elems];
					return ns.nav(opt);
				}
			}
		}
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.navbar = {
		container: function (opt) {
			if (Array.isArray(opt)) {
				return ns.navbar.container({
					elems: opt,
				});
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						class: null,
						containerfluid: true,
						containerclass: null,
						expand: null, //sm|md|lg|xl|xxl|null|''
						light: "light", //light|dark
						color: null, //danger|primary|dark|warning|...
						position: null, //fixed-top|fixed-bottom|sticky-top|null
						style: null,
						elems: [],
					},
					opt
				);

				return {
					tag: "nav",
					class: [
						"navbar",
						opt.expand || opt.expand === ""
							? opt.expand === ""
								? "navbar-expand"
								: `navbar-expand-${opt.expand}`
							: null,
						opt.light ? `navbar-${opt.light}` : null,
						opt.color ? `bg-${opt.color}` : null,
						opt.class ? opt.class : null,
						opt.position ? opt.position : null,
					],
					style: opt.style ? opt.style : null,
					elems: ns.div(
						[
							opt.containerfluid === true
								? "container-fluid"
								: opt.containerfluid === false
								? "container"
								: ns.core.multipleClassSupport(opt.containerfluid, "container-$1"),
							opt.containerclass ? opt.containerclass : null,
						],
						opt.elems
					),
				};
			}
		},
		brand: function (opt) {
			if (typeof opt === "string") {
				return ns.navbar.brand({
					label: opt,
				});
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						class: null,
						href: null,
						onclick: null,
						label: null,
						icon: null,
						img: null,
					},
					opt
				);

				if (opt.heading) {
					console.warn("ns.navbar.brand has heading");
				}

				var lbl = [
					opt.img
						? {
								tag: "img",
								attr: {
									src: opt.img,
									width: 30,
									height: 24,
									alt: "",
								},
						  }
						: null,
					opt.icon ? ns.icon(opt.icon) : null,
					opt.label && (opt.img || opt.icon)
						? {
								tag: "span",
								class: "ms-2",
								elems: opt.label,
						  }
						: opt.label,
				].removeEmpty();

				if (!opt.href) {
					return {
						tag: "span",
						class: ["navbar-brand", "mb-0", "h1", opt.class],
						attr: { id: opt.id ? opt.id : null, onclick: opt.onclick },
						elems: lbl,
					};
				} else {
					return {
						tag: "a",
						class: ["navbar-brand", opt.class],
						attr: {
							href: opt.href ? opt.href : "javascript:void(0)",
							id: opt.id ? opt.id : null,
							onclick: opt.onclick,
						},
						elems: lbl,
					};
				}
			}
		},
		toggler: function (opt) {
			if (typeof opt === "string") {
				return ns.navbar.toggler({
					id: opt,
				});
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						class: null,
						icon: ns.icon("bars"),
						toggle: "collapse", //collapse|offcanvas
					},
					opt
				);

				return {
					tag: "button",
					class: ["navbar-toggler", opt.class],
					attr: {
						type: "button",
						"data-bs-toggle": opt.toggle ? opt.toggle : null,
						"data-bs-target": opt.id ? `#${opt.id}` : null,
						"aria-controls": opt.id ? opt.id : null,
						"aria-expanded": "false",
						"aria-label": "Toggle navigation",
					},
					elems: opt.icon,
				};
			}
		},
		formcontainer: function (opt) {
			if (Array.isArray(opt)) {
				return ns.navbar.formcontainer({
					elems: opt,
				});
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						class: null,
						elems: null,
					},
					opt
				);

				return {
					tag: "form",
					class: ["d-flex", opt.class],
					attr: { id: opt.id ? opt.id : null },
					elems: opt.elems,
				};
			}
		},
		collapsecontainer: function (opt) {
			if (Array.isArray(opt)) {
				return ns.navbar.collapsecontainer({
					elems: opt,
				});
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						class: null,
						elems: null,
					},
					opt
				);

				return ns.div(
					["collapse", "navbar-collapse", opt.class],
					{
						id: opt.id,
					},
					opt.elems
				);
			}
		},
		offcanvascontainer: function (opt) {
			if (Array.isArray(opt)) {
				return ns.navbar.offcanvascontainer({
					elems: opt,
				});
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						title: null,
						class: null,
						elems: null,
					},
					opt
				);

				return ns.div(
					["offcanvas", "offcanvas-end", opt.class],
					{
						id: opt.id ? opt.id : null,
						tabindex: "-1",
						"aria-labelledby": opt.id ? `${opt.id}-label` : null,
					},
					[
						ns.div("offcanvas-header", [
							{
								tag: "h5",
								class: "offcanvas-title",
								attr: { id: opt.id ? `${opt.id}-label` : null },
								elems: opt.title,
							},
							{
								tag: "button",
								class: "btn-close text-reset",
								attr: {
									type: "button",
									"data-bs-dismiss": "offcanvas",
									"aria-label": "Close",
								},
							},
						]),
						ns.div("offcanvas-body", opt.elems),
					]
				);
			}
		},
		itemcontainer: function (opt) {
			if (Array.isArray(opt)) {
				return ns.navbar.itemcontainer({
					elems: opt,
				});
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						class: null,
						scroll: null,
						mxauto: true,
						parenttype: null, //collapse|offcanvas|null
						elems: null,
					},
					opt
				);

				return ns.div(
					[
						"navbar-nav",
						opt.mxauto ? "me-auto" : null,
						opt.parenttype === "collapse" ? "mb-2 mb-lg-0" : null,
						opt.parenttype === "offcanvas"
							? "justify-content-end flex-grow-1 pe-3"
							: null,
						opt.class,
						opt.scroll ? "navbar-nav-scroll" : null,
					],
					{ style: opt.scroll ? `--bs-scroll-height: ${opt.scroll};` : null },
					opt.elems
				);
			}
		},
		item: function (opt) {
			if (typeof opt === "string") {
				return ns.navbar.item({
					label: opt,
				});
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						class: null,
						option: null,
						href: "javascript:void(0)",
						onclick: null,
						icon: null,
						largeicon: false,
						label: null,
						labelshow: null,
						active: false,
						disabled: false,
					},
					opt
				);

				if (opt.option && opt.id === null) {
					opt.id = ns.core.UUID();
				}

				return ns.div(
					[
						"nav-item d-flex align-content-center flex-wrap",
						opt.option ? "dropdown" : null,
					],
					{
						id: opt.id && opt.option === null ? opt.id : null,
						onclick: opt.onclick ? opt.onclick : null,
					},
					[
						{
							tag: "a",
							class: [
								"nav-link text-md-center",
								opt.active ? "active" : null,
								opt.disabled ? "disabled" : null,
								opt.option ? "dropdown-toggle" : null,
							],
							attr: {
								"aria-current": opt.active ? "page" : null,
								href: opt.href ? opt.href : null,
								id: opt.id ? opt.id : null,
								role: "button",
								"data-bs-toggle": opt.option ? "dropdown" : null,
								"aria-expanded": opt.option ? "false" : null,
							},
							elems: [
								{
									tag: opt.largeicon ? "span" : null,
									class: opt.largeicon
										? ["d-md-block h4-md", opt.label ? "mb-0" : null].combine(
												" "
										  )
										: null,
									elems: opt.icon ? ns.icon(opt.icon) : null,
								},
								ns.span(
									[
										opt.icon && !opt.largeicon ? "ms-2" : null,
										opt.icon && opt.largeicon ? "ms-2 ms-md-0" : null,
										opt.option ? "me-2" : null,
										opt.labelshow ? `d-none d-${opt.labelshow}-inline` : null,
									],
									opt.label
								),
							].removeEmpty(),
						},
						opt.option
							? {
									tag: "ul",
									class: "dropdown-menu w-100 w-md-auto",
									attr: { "aria-labelledby": opt.id ? opt.id : null },
									elems: ns.ddoption(opt.option),
							  }
							: null,
					]
				);
			}
		},
		text: function (text) {
			return ns.span("navbar-text", text);
		},
	};
})(ns);
//loading controller
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {
	var fn = {
		build: function (opt) {
			opt = $.extend(
				{},
				{
					id: null,
					class: null,
					color: null,
					textcolor: null,
					placement: "start",
					close: true,
					title: null,
					scroll: true,
					backdrop: false,
					elems: null,
					padding: null,
					margin: null,
				},
				opt
			);

			opt.id = opt.id ? opt.id : ns.core.UUID();

			var header = null;
			if (opt.close || opt.title) {
				header = ns.div("offcanvas-header", [
					opt.title
						? {
								tag: "h5",
								class: "offcanvas-title",
								attr: {
									id: `${opt.id}-label`,
								},
								elems: opt.title,
						  }
						: null,
					opt.close
						? {
								tag: "button",
								class: "btn-close text-reset",
								attr: {
									"data-bs-dismiss": "offcanvas",
									"aria-label": "Close",
								},
						  }
						: null,
				]);
			}

			var body = null;

			if (opt.elems) {
				body = ns.div(["offcanvas-body", opt.padding ? `p-${opt.padding}` : null].combine(" "), opt.elems);
			}

			return ns.div(
				[
					"offcanvas",
					opt.placement ? `offcanvas-${opt.placement}` : null,
					opt.margin ? `m-0 m-md-${opt.margin}` : null,
					opt.class ? opt.class : null,
					opt.color ? `bg-${opt.color}` : null,
					opt.textcolor ? `text-${opt.textcolor}` : null,
				],
				{
					id: opt.id,
					"aria-labelledby": `${opt.id}-label`,
					"data-bs-scroll": opt.scroll ? "true" : "false",
					"data-bs-backdrop": opt.backdrop ? "true" : "false",
					tabindex: "-1",
				},
				[header, body]
			);
		},
		destroy: function (elem) {
			if (elem) {
				if (typeof elem === "string") {
					fn.destroy($(elem)[0]);
				} else {
					var oc = bootstrap.Offcanvas.getInstance(elem);
					if (oc) {
						try {
							$(oc).destroy();
						} catch {}

						$(elem).remove();
					}
				}
			}
		},
		show: function (id) {
			var elem = $(`#${id}`)[0];
			var oc = new bootstrap.Offcanvas($(`#${id}`)[0]);

			$(elem).on("hidden.bs.offcanvas", function (event) {
				setTimeout(
					function (elem) {
						fn.destroy(elem);
					},
					3000,
					elem
				);
			});

			oc.show();
		},
	};
	ns.offcanvas = function (opt) {
		opt.id = opt.id || ns.core.UUID();
		ns.build.append(document.body, fn.build(opt));
		fn.show(opt.id);
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.option = function (opt, selected) {
		if (opt) {
			if (typeof opt === "string") {
				return opt;
			} else {
				/**
				 * opt = [ "opt1","opt2","opt3" ]
				 * opt = [{ value:"opt1",label:"Option 1" },{ value:"opt2",label:"Option 2" },{ value:"opt3",label:"Option 3" }]
				 * opt = [{ label:"Group 1", elems:["","",""] },{ value:"opt2",label:"Option 2" },{ value:"opt3",label:"Option 3" }]
				 */

				if (!selected || Array.isArray(selected)) {
					var res = [];
					opt.forEach((item) => {
						if (typeof item === "string") {
							res.push({
								tag: "option",
								attr: {
									value: item,
									selected: selected && selected.length > 0 ? (selected.indexOf(item) > -1 ? "selected" : null) : null,
								},
								elems: item,
							});
						} else {
							if (item.value || item.value === null || item.value === "") {
								res.push({
									tag: "option",
									attr: {
										value: item.value,
										selected: selected && selected.length > 0 ? (selected.indexOf(item.value) > -1 ? "selected" : null) : null,
									},
									elems: item.label ? item.label : null,
								});
							} else if (item.label && item.option) {
								res.push({
									tag: "optgroup",
									attr: { label: item.label },
									elems: ns.option(item.option, selected),
								});
							}
						}
					});
					return res;
				} else {
					return ns.option(opt, [selected]);
				}
			}
		}
	};

	ns.ddoption = function (opt, selected) {
		if (opt) {
			var res = [];
			opt.forEach((item) => {
				if (typeof item === "string") {
					var label = item;
					item = {};
					item.label = label;
				}

				item = $.extend(
					{},
					{
						elems: null,
						label: null,
						value: null,
						icon: null,
						disabled: false,
						active: false,
						href: null,
						onclick: null,
						interactive: true,
					},
					item
				);

				if (item.value === "-") {
					if (item.label) {
						res.push({
							tag: "li",
							elems: {
								tag: "h6",
								class: "dropdown-header",
								elems: item.label,
							},
						});
					} else {
						res.push({
							tag: "li",
							elems: {
								tag: "hr",
								class: "dropdown-divider",
							},
						});
					}
				} else {
					if (item.elems) {
						res.push({
							tag: "li",
							elems: ns.div(Array.isArray(item.elems) ? item.elems : [item.elems]),
						});
					} else {
						if (selected && !item.active) {
							if (Array.isArray(selected)) {
								if (selected.indexOf(item.value) > -1) {
									active = true;
								}
							} else {
								if (selected === item.value) {
									active = true;
								}
							}
						}

						res.push({
							tag: "li",
							elems: {
								tag: item.href ? "a" : item.interactive ? "button" : "span",
								class: [
									item.interactive ? "dropdown-item" : "dropdown-item-text",
									item.disabled ? "disabled" : null,
									item.active ? "active" : null,
								].combine(" "),
								attr: {
									href: item.href,
									onclick: item.onclick,
									type: !item.href && item.interactive ? "button" : null,
								},
								elems: [
									item.icon ? ns.icon(item.icon) : null,
									item.label || item.value
										? {
												tag: "span",
												class: item.icon ? "ms-2" : null,
												elems: item.label ? item.label : item.value,
										  }
										: null,
								].removeEmpty(),
							},
						});
					}
				}
			});

			return res;
		}
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	var fn = {
		paginationchange: function (skip, sender) {
			var id = $(sender).closest(".ns-list-page").attr("id");
			if (id) {
				var opt = ns.data.get(id);
				if (opt) {
					opt.skip = skip;
					ns.data.set(id, opt);

					if (ns.core.isFunction(opt.onchange)) {
						opt.onchange(skip, sender);
					}

					ns.build.replace($(sender).closest(".ns-list-page").get(), ns.pagination(opt), true);
				}
			}
		},
	};

	ns.pagination = function (opt) {
		opt = $.extend(
			{},
			{
				id: null,
				total: 0,
				skip: 0,
				limit: 0,
				max: 5,
				weight: null,
				align: "center", //start|end|center(default)
				overflow: true,
				onchange: null,
				showfirstlast: true,
				shownextprev: true,
				firstlabel: null,
				lastlabel: null,
				nextlabel: null,
				prevlabel: null,
			},
			opt
		);

		var curpage = opt.skip / opt.limit + 1;
		var btncount = parseInt(opt.total / opt.limit, 10) + (opt.total % opt.limit > 0 ? 1 : 0);

		//generate id
		opt.id = opt.id ? opt.id : ns.core.UUID();

		if (opt.total > opt.limit) {
			var li = [];

			//first
			if (opt.showfirstlast) {
				li.push({
					tag: "li",
					class: ["page-item", curpage > 1 ? null : "disabled"].combine(" "),
					elems: {
						tag: "a",
						class: "page-link",
						attr: {
							tabindex: curpage > 1 ? null : "-1",
							"aria-disabled": curpage > 1 ? null : true,
							"aria-label": "First Page",
							href: "javascript:void(0)",
							onclick: function (sender) {
								fn.paginationchange(0, sender);
							},
						},
						elems: opt.firstlabel ? opt.firstlabel : ns.icon("angle-double-left"),
					},
				});
			}

			//prev
			if (opt.shownextprev) {
				li.push({
					tag: "li",
					class: ["page-item", curpage > 1 ? null : "disabled"].combine(" "),
					elems: {
						tag: "a",
						class: "page-link",
						attr: {
							tabindex: curpage > 1 ? null : "-1",
							"aria-disabled": curpage > 1 ? null : true,
							"aria-label": "Previous Page",
							href: "javascript:void(0)",
							onclick: function (sender) {
								fn.paginationchange((curpage - 2) * opt.limit, sender);
							},
						},
						elems: opt.prevlabel ? opt.prevlabel : ns.icon("angle-left"),
					},
				});
			}

			//page
			var x = 1;
			var y = btncount;
			var c = curpage;
			if (opt.max > btncount) {
				opt.max = btncount;
			}

			if (opt.max < 3) {
				opt.max = 3;
			}

			if (opt.max % 2 === 0) {
				opt.max = opt.max + 1;
			}

			//limit button
			if (y > opt.max) {
				//example for 10

				//x,2,3,4,5
				//1,x,3,4,5
				//1,2,x,4,5

				//2,3,x,5,6
				//3,4,x,6,7
				//4,5,x,7,8
				//5,6,x,8,9
				//6,7,x,9,10

				//6,7,8,x,10
				//6,7,8,9,x
				var md = parseInt(opt.max / 2, 10) + 1;

				x = c - md + 1;
				y = c + md - 1;

				if (x < 1) {
					x = 1;
					y = opt.max;
				}

				if (y > btncount) {
					y = btncount;
					x = y - opt.max + 1;
				}

				if (x < 1) {
					x = 1;
				}
			}

			//build middle button
			for (x; x <= y; x++) {
				li.push({
					tag: "li",
					class: ["page-item", x === c ? "active" : null].combine(" "),
					elems: {
						tag: "a",
						class: "page-link",
						attr: {
							"aria-label": "Page " + x.toString(),
							href: "javascript:void(0)",
							onclick: function (sender) {
								var xnum = parseInt($(sender).text(), 10);
								fn.paginationchange((xnum - 1) * opt.limit, sender);
							},
						},
						elems: x.toString(),
					},
				});
			}

			//next
			if (opt.shownextprev) {
				li.push({
					tag: "li",
					class: ["page-item", curpage < btncount ? null : "disabled"].combine(" "),
					elems: {
						tag: "a",
						class: "page-link",
						attr: {
							tabindex: curpage < btncount ? null : "-1",
							"aria-disabled": curpage < btncount ? null : true,
							"aria-label": "Next Page",
							href: "javascript:void(0)",
							onclick: function (sender) {
								fn.paginationchange(curpage * opt.limit, sender);
							},
						},
						elems: opt.nextlabel ? opt.nextlabel : ns.icon("angle-right"),
					},
				});
			}

			//last
			if (opt.showfirstlast) {
				li.push({
					tag: "li",
					class: ["page-item", curpage < btncount ? null : "disabled"].combine(" "),
					elems: {
						tag: "a",
						class: "page-link",
						attr: {
							tabindex: curpage < btncount ? null : "-1",
							"aria-disabled": curpage < btncount ? null : true,
							"aria-label": "Last Page",
							href: "javascript:void(0)",
							onclick: function (sender) {
								fn.paginationchange((btncount - 1) * opt.limit, sender);
							},
						},
						elems: opt.lastlabel ? opt.lastlabel : ns.icon("angle-double-right"),
					},
				});
			}

			//save in memory
			ns.data.set(opt.id, opt);

			return ns.div(
				[
					"d-flex",
					"p-1",
					"ns-list-page",
					opt.align ? "justify-content-" + opt.align : null,
					opt.overflow ? "overflow-auto" : null,
				],
				{ id: opt.id },
				{
					tag: "ul",
					class: [
						"pagination",
						opt.weight ? `pagination-${opt.weight}` : null,
						opt.overflow ? "mx-5" : null,
					].combine(" "),
					elems: li,
				}
			);
		} else {
			return null;
		}
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	var fn = {
		container: function (opt) {
			if (Array.isArray(opt)) {
				//ns.progress.container(array)
				return fn.container({
					bar: opt,
				});
			} else if (typeof opt === "number") {
				//ns.progress.container(number)
				return fn.container({
					bar: [opt],
				});
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						class: null,
						data: null,
						tooltip: null,
						bar: null,
					},
					opt
				);

				return ns.tooltip(
					opt.tooltip,
					ns.div(
						["progress", opt.class],
						{ id: opt.id },
						{
							height: opt.height > 0 ? `${opt.height}px` : null,
						},
						Array.isArray(opt.bar)
							? opt.bar.map(function (i) {
									return fn.bar(i);
							  })
							: fn.bar(opt.bar)
					)
				);
			}
		},
		bar: function (opt) {
			if (typeof opt === "number") {
				return fn.bar({ value: opt });
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						class: null,
						data: null,
						tooltip: null,
						label: false,
						stripe: false,
						animate: false,
						min: 0,
						max: 100,
						value: 0,
					},
					opt
				);

				if (opt.value > opt.max) {
					opt.value = opt.max;
				}

				if (opt.value < opt.min) {
					opt.value = opt.min;
				}

				var percent =
					opt.max - opt.min > 0
						? parseInt((opt.value / (opt.max - opt.min)) * 100, 10)
						: 0;

				return ns.tooltip(
					opt.tooltip,
					ns.div({
						class: [
							"progress-bar",
							opt.class ? opt.class : null,
							opt.color ? `bg-${opt.color}` : null,
							opt.stripe
								? [
										"progress-bar-striped",
										opt.animate ? "progress-bar-animated" : null,
								  ].combine(" ")
								: null,
						],
						data: opt.data,
						attr: {
							id: opt.id ? opt.id : null,
							role: "progressbar",
						},
						style: {
							width: `${percent}%`,
						},
						elems: opt.label ? `${percent}%` : "&nbsp;",
					})
				);
			}
		},
	};

	ns.progress = fn.container;
})(ns);
//query editor for list (update)
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {
	var fn = {
		isPrototypeExists: function (obj, prototypeName) {
			if (obj) {
				if (typeof obj === "object") {
					try {
						if (typeof obj[prototypeName] !== "undefined") {
							return true;
						}
					} catch (ex) {
						return false;
					}
				}
			}

			return false;
		},
		filter: {
			opr: function (useopricon, itemtype) {
				var rtn = null;
				if (itemtype) {
					//set operator base on frm value
					switch (itemtype) {
						case "text":
						case "tel":
						case "email":
							rtn = [
								{ value: "$eq", label: useopricon ? "&#xf52c;" : "Equal" },
								{
									value: "$ne",
									label: useopricon ? "&#xf53e;" : "Not Equal",
								},
								{ value: "$eqlike", label: useopricon ? "&#xf52c; &#xf069;" : "Like" },
								{ value: "$nelike", label: useopricon ? "&#xf53e; &#xf069;" : "Not Like" },
							];

							break;
						case "select":
						case "check":
							rtn = [
								{ value: "$eq", label: useopricon ? "&#xf52c;" : "Equal" },
								{
									value: "$ne",
									label: useopricon ? "&#xf53e;" : "Not Equal",
								},
							];
							break;
						case "date":
						case "number":
							rtn = [
								{ value: "$eq", label: useopricon ? "&#xf52c;" : "Equal" },
								{
									value: "$ne",
									label: useopricon ? "&#xf53e;" : "Not Equal",
								},
								{
									value: "$gte",
									label: useopricon ? "&#xf532;" : "More Than",
								},
								{
									value: "$lte",
									label: useopricon ? "&#xf537;" : "Less Than",
								},
							];
							break;

						default:
							console.error("Unhandle query.fn.filter.opr itemtype : " + itemtype);
					}
				}

				return rtn;
			},
			item: function (useopricon, field, f, o, v) {
				//set default value for f
				if (!f) {
					f = field[0].value;
				}

				//generate from opt
				var from_opt = field.map(function (item) {
					return {
						value: item.value,
						label: item.label,
					};
				});

				//gen sel.from
				var sel_from = ns.input({
					type: "select",
					name: "from",
					onchange: function (sender) {
						fn.filter.change(sender, useopricon);
					}, //"fn.filter.change(this," + (useopricon ? "true" : "false") + ")",
					option: from_opt,
					value: f,
					size: "",
				});

				//gen opr option
				var opr_opt = null;

				var item = field.find((obj) => {
					return obj.value === f;
				});

				//generate opr option base on itemtype
				opr_opt = fn.filter.opr(useopricon, item ? item.type : null);

				//set o value
				o = o ? o : opr_opt ? opr_opt[0].value : null;

				//set real opr value base on value
				if (o && o === "$regex") {
					//update opr value base on regex

					//like : { $regex: VALUETOFIND, $options: "i" };
					//notlike : { $regex: "^((?!" + VALUETOFIND + ").)*$", $options: "i" };
					if (v.startsWith("^((?!")) {
						o = "$nelike";
						v = v.substring(5, v.length - 5);
					} else {
						o = "$eqlike";
						v = v;
					}
				} else if (o && o === "$exists") {
					if (v) {
						o = "$ne";
					} else {
						o = "$eq";
					}

					v = "";
				}

				//gen sel.opr base on from value
				var sel_opr = ns.input({
					class: [useopricon ? "font-fa" : null].combine(" "),
					type: "select",
					name: "opr",
					option: opr_opt,
					value: o,
					size: useopricon ? "col-4 col-lg-3 px-2" : "col-sm-5 col-md-4 col-lg-3 px-2",
				});

				return ns.div("d-flex", [
					ns.div("container p-0", [
						ns.div(
							"row g-2",
							ns.div("d-flex", [
								sel_from,
								sel_opr,
								ns.button({
									color: "danger",
									icon: "trash",
									onclick: function (sender) {
										fn.filter.remove(sender);
									}, //"fn.filter.remove(this)",
								}),
							])
						),
						ns.div("row mt-2", [
							ns.input({
								type: item && item.type ? item.type : "text",
								name: "value",
								value: v,
								size: "col-12",
								placeholder: item.placeholder ? item.placeholder : null,
								option: item && item.option ? item.option : null,
							}),
						]),
					]),
				]);
			},
			add: function (sender, animate) {
				var id = $(sender).closest(".modal[id]").attr("id");
				var opt = ns.data.get(`${id}-data`);
				//var cont = $(sender).closest(".modal[id]").find(".ns-filter-rule").find(".row");

				ns.build.prepend(
					$(sender).closest(".item")[0],
					ns.div(["item col-12", animate ? "ns-fadeslidein" : null].combine(" "), fn.filter.item(opt.useopricon, opt.field, null, null, null))
				);

				setTimeout(
					function (sender) {
						$(sender).closest(".container").find(".ns-fadeslidein").removeClass("ns-fadeslidein");
					},
					500,
					sender
				);
			},
			change: function (sender, useopricon) {
				var id = $(sender).closest(".modal[id]").attr("id");
				var opt = ns.data.get(`${id}-data`);

				var opr = $(sender).closest(".item").find("select[name='opr']");
				var val = $(sender).closest(".item").find("[name='value']");
				var frm = $(sender).val();
				var item = opt.field.find((obj) => {
					return obj.value === frm;
				});

				//generate opr option base on itemtype
				var opr_opt = fn.filter.opr(opt.useopricon, item ? item.type : null);

				ns.build.replace(
					$(opr).parent(),
					ns.input({
						class: [opt.useopricon ? "font-fa" : null].combine(" "),
						type: "select",
						name: "opr",
						size: useopricon ? "col-4 col-lg-3 px-2" : "col-sm-5 col-md-4 col-lg-3 px-2",
						value: $(opr).val(),
						option: opr_opt,
					})
				);

				//set val from frm value
				ns.build.replace(
					val,
					ns.input({
						type: item && item.type ? item.type : "text",
						name: "value",
						size: "",
						placeholder: item.placeholder ? item.placeholder : null,
						value: ns.core.getvalue(val),
						option: item && item.option ? item.option : null,
					})
				);
			},
			remove: function (sender) {
				$(sender).closest(".item").addClass("ns-fadeslideout");
				setTimeout(
					function (sender) {
						$(sender).closest(".item").remove();
					},
					500,
					sender
				);
			},
		},
		sort: {
			opr: function (useopricon, itemtype) {
				var rtn = null;
				if (itemtype) {
					//set operator base on frm value
					if (useopricon) {
						switch (itemtype) {
							case "text":
							case "email":
							case "select":
								rtn = [
									{ value: 1, label: "&#xf15d;" },
									{ value: -1, label: "&#xf15e;" },
								];
								break;
							case "tel":
							case "check":
								rtn = [
									{ value: 1, label: "&#xf884;" },
									{ value: -1, label: "&#xf885;" },
								];
								break;
							case "date":
							case "number":
								rtn = [
									{ value: 1, label: "&#xf162;" },
									{ value: -1, label: "&#xf163;" },
								];
								break;
							default:
								console.error("Unhandle query.fn.sort.opr itemtype : " + itemtype);
						}
					} else {
						rtn = [
							{ value: 1, label: "Ascending" },
							{ value: -1, label: "Descending" },
						];
					}
				}

				return rtn;
			},
			item: function (useopricon, field, f, o) {
				//set default value for f
				if (!f) {
					f = field[0].value;
				}

				//generate from opt
				var from_opt = field.map(function (item) {
					return {
						value: item.value,
						label: item.label,
					};
				});

				//gen sel.from
				var sel_from = ns.input({
					type: "select",
					name: "from",
					onchange: function (sender) {
						fn.sort.change(sender, useopricon);
					}, //"fn.sort.change(this," + (useopricon ? "true" : "false") + ")",
					option: from_opt,
					value: f,
					size: "",
				});

				//gen opr option
				var opr_opt = null;

				var item = field.find((obj) => {
					return obj.value === f;
				});

				//generate opr option base on itemtype
				opr_opt = fn.sort.opr(useopricon, item ? item.type : null);

				//gen sel.opr base on from value
				var sel_opr = ns.input({
					class: [useopricon ? "font-fa" : null].combine(" "),
					type: "select",
					name: "opr",
					option: opr_opt,
					value: o ? o : opr_opt ? opr_opt[0].value : null,
					size: useopricon ? "col-4 col-lg-3 px-2" : "col-sm-5 col-md-4 col-lg-3 px-2",
				});

				return ns.div("d-flex", [
					sel_from,
					sel_opr,
					ns.button({
						color: "danger",
						icon: "trash",
						onclick: function (sender) {
							fn.sort.remove(sender);
						}, //"fn.sort.remove(this)",
					}),
				]);
			},
			add: function (sender, animate) {
				var id = $(sender).closest(".modal[id]").attr("id");
				var opt = ns.data.get(`${id}-data`);
				//var cont = $(sender).closest(".modal[id]").find(".ns-sort-rule").find(".row");

				ns.build.prepend(
					$(sender).closest(".item")[0],
					ns.div(["item col-12", animate ? "ns-fadeslidein" : null].combine(" "), fn.sort.item(opt.useopricon, opt.field, null, null))
				);

				setTimeout(
					function (sender) {
						$(sender).closest(".container").find(".ns-fadeslidein").removeClass("ns-fadeslidein");
					},
					500,
					sender
				);
			},
			change: function (sender, useopricon) {
				var id = $(sender).closest(".modal[id]").attr("id");
				var opt = ns.data.get(`${id}-data`);

				var opr = $(sender).parent().find("select[name='opr']");
				var frm = $(sender).val();
				var item = opt.field.find((obj) => {
					return obj.value === frm;
				});

				//generate opr option base on itemtype
				var opr_opt = fn.sort.opr(opt.useopricon, item ? item.type : null);

				ns.build.replace(
					$(opr).parent(),
					ns.input({
						class: [opt.useopricon ? "font-fa" : null].combine(" "),
						type: "select",
						name: "opr",
						size: useopricon ? "col-4 col-lg-3 px-2" : "col-sm-5 col-md-4 col-lg-3 px-2",
						value: $(opr).val(),
						option: opr_opt,
					})
				);
			},
			remove: function (sender) {
				$(sender).closest(".item").addClass("ns-fadeslideout");
				setTimeout(
					function (sender) {
						$(sender).closest(".item").remove();
					},
					500,
					sender
				);
			},
		},
		get: function (container) {
			//console.log(container);
			//collect filter rule
			var q_filter = null;

			var filter_container = $(container).find(".ns-filter-rule");
			var filter_item = $(filter_container).find("select[name='from']");

			if (filter_item && filter_item.length > 0) {
				//get filter item and put in array
				var t_filter = [];
				$.each(filter_item, function (index, selfrom) {
					var selopr = $(selfrom).closest(".item").find("select[name='opr']");
					var oprval = $(selopr).val();
					var inputval = $(selfrom).closest(".item").find("[name='value']");

					if (oprval === "$eqlike" || oprval === "$nelike") {
						if (oprval === "$eqlike") {
							oprval = "$eq";
							inputval = { $regex: $(inputval).val(), $options: "i" };
						} else {
							oprval = "$ne";
							inputval = { $regex: "^((?!" + $(inputval).val() + ").)*$", $options: "i" };
						}
					} else {
						inputval = ns.core.getvalue(inputval);
						if (inputval === null) {
							if (oprval === "$eq") {
								inputval = { $exists: false, $eq: null };
							} else if (oprval === "$ne") {
								inputval = { $exists: true, $ne: null };
							}
						}
					}

					t_filter.push({
						f: $(selfrom).val(),
						o: oprval,
						v: inputval,
					});
				});

				//sort filter item
				t_filter.sort((a, b) => (a.f > b.f ? 1 : b.f > a.f ? -1 : 0));

				//put in u_filter
				var u_filter = [];
				var l_filter = null;

				t_filter.forEach((i) => {
					if (l_filter === null || l_filter != i.f) {
						//mongodb not support field:{opr:{regex:value}}
						if (fn.isPrototypeExists(i.v, "$regex") || fn.isPrototypeExists(i.v, "$exists")) {
							//change to field:{regex}
							u_filter.push([
								{
									[i.f]: i.v,
								},
							]);
						} else {
							//change to field:{opr:value}
							u_filter.push([
								{
									[i.f]: { [i.o]: i.v },
								},
							]);
						}
					} else {
						//mongodb not support field:{opr:{regex:value}}
						if (fn.isPrototypeExists(i.v, "$regex") || fn.isPrototypeExists(i.v, "$exists")) {
							//change to field:{regex}
							u_filter[u_filter.length - 1].push({
								[i.f]: i.v,
							});
						} else {
							//change to field:{opr:value}
							u_filter[u_filter.length - 1].push({
								[i.f]: { [i.o]: i.v },
							});
						}
					}

					l_filter = i.f;
				});

				//combine u_filter
				q_filter = {
					["$and"]: [],
				};

				u_filter.forEach((i) => {
					if (i.length === 1) {
						q_filter["$and"].push(i[0]);
					} else {
						var v_filter = [];
						i.forEach((j) => {
							v_filter.push(j);
						});

						q_filter["$and"].push({
							["$or"]: v_filter,
						});
					}
				});
			}

			//collect sort rule
			var q_sort = null;
			var sort_container = $(container).find(".ns-sort-rule");
			var sort_item = $(sort_container).find("select[name='from']");

			if (sort_item && sort_item.length > 0) {
				q_sort = {};
				$.each(sort_item, function (index, selfrom) {
					var selopr = $(selfrom).closest(".item").find("select[name='opr']");
					q_sort[$(selfrom).val()] = parseInt($(selopr).val(), 10);
				});
			}

			//collect field rule
			var q_field = null;
			var field_container = $(container).find(".ns-field-rule");
			var field_item = $(field_container).find("input[name]");

			if (field_item && field_item.length > 0) {
				q_field = {};
				$.each(field_item, function (index, inputfield) {
					if (!ns.core.getvalue(inputfield)) {
						q_field[$(inputfield).attr("name")] = 0;
					}
				});
			}

			//limit & sort
			var t_limit = ns.core.getvalue($(container).find("input[name='limit']"));
			var t_skip = (ns.core.getvalue($(container).find("input[name='step']")) - 1) * t_limit;

			//return collected data
			return {
				filter: q_filter,
				sort: q_sort,
				field: q_field,
				limit: t_limit,
				skip: t_skip,
			};
		},
	};

	ns.query = function (sender, opt) {
		opt = $.extend(
			{},
			{
				callback: null, //functionname need to call when update
				onshow: null,
				data: {
					// current filter state
					// filter: [{name:{$eq:"a"}}],
					// sort: {name:1},
					// limit: 20,
					// skip: 0,
					filter: null,
					sort: null,
					limit: 10,
					skip: 0,
					field: { __v: 0 },
				},
				limit: {
					min: 1,
					max: 100,
					step: 5,
				},
				skip: {
					min: 1,
					max: 100,
					step: 1,
				},
				field: [
					//required by sort and search
					//if no item type, no sort and no search
					{ value: "_id", label: "ID", type: "text" },
				],
				useopricon: false, // use TEXT in operator select box
			},
			opt
		);

		//generate id for dialog
		var id = ns.core.UUID();

		//keep data in global
		ns.data.set(`${id}-data`, opt);

		//gen filter list
		var filter_list = [];

		//populate opt.data.filter into filter list
		if (opt.data.filter) {
			/* 
				$and:[
					{$or:[]},
					{name:{$eq:value}}
				]
				*/

			// $and:[] is mandatory
			if (opt.data.filter["$and"]) {
				//process each $and item
				opt.data.filter["$and"].forEach((i) => {
					//$and item
					if (i["$or"]) {
						i["$or"].forEach((j) => {
							var f2_name = Object.keys(j)[0];
							var f2_info = j[f2_name];
							var f2_opr = Object.keys(f2_info)[0];
							var f2_value = f2_info[f2_opr];

							filter_list.push(ns.div("item col-12", fn.filter.item(opt.useopricon, opt.field, f2_name, f2_opr, f2_value)));
						});
					} else {
						var f1_name = Object.keys(i)[0];
						var f1_info = i[f1_name];
						var f1_opr = Object.keys(f1_info)[0];
						var f1_value = f1_info[f1_opr];

						filter_list.push(ns.div("item col-12", fn.filter.item(opt.useopricon, opt.field, f1_name, f1_opr, f1_value)));
					}
				});
			}
		}

		//add filter button
		filter_list.push(
			ns.div(
				"item col-12",
				ns.button({
					icon: "plus",
					color: "primary",
					class: "col-12",
					label: "Add New Filter Rule",
					onclick: function (sender) {
						fn.filter.add(sender, true);
					}, //"fn.filter.add(this," + (opt.useopricon ? "true" : "false") + ")",
				})
			)
		);

		//gen sort list
		var sort_list = [];

		//populate opt.data.sort into sort list
		if (opt.data.sort) {
			Object.keys(opt.data.sort).forEach((attrKey) => {
				if (opt.data.sort[attrKey]) {
					sort_list.push(ns.div("item col-12", fn.sort.item(opt.useopricon, opt.field, attrKey, opt.data.sort[attrKey])));
				}
			});
		}

		//add sort button
		sort_list.push(
			ns.div(
				"item col-12",
				ns.button({
					icon: "plus",
					color: "primary",
					class: "col-12",
					label: "Add New Sort Rule",
					onclick: function (sender) {
						fn.sort.add(sender, true);
					}, //"fn.sort.add(this," + (opt.useopricon ? "true" : "false") + ")",
				})
			)
		);

		//gen field list
		var field_list = [];

		//__v
		field_list.push(
			ns.input({
				type: "checkbox",
				label: "Version",
				name: "__v",
				size: "col-6",
				checked: opt.data && fn.isPrototypeExists(opt.data.field, "__v") && opt.data.field["__v"] === 0 ? false : true,
			})
		);

		//other field
		$.each(opt.field, function (index, item) {
			field_list.push(
				ns.input({
					type: "checkbox",
					label: item.label,
					name: item.value,
					size: "col-6",
					checked: opt.data && fn.isPrototypeExists(opt.data.field, item.value) && opt.data.field[item.value] === 0 ? false : true,
				})
			);
		});

		ns.dlg
			.box({
				title: "Query",
				id: id,
				hastab: true,
				onshow: function (container) {
					if (typeof opt.onshow === "function") {
						opt.onshow(container);
					}
				},
				elems: ns.nav({
					border: false,
					rounded: false,
					align: "center",
					style: "pill",
					elems: [
						{
							label: "Filter",
							icon: "filter",
							elems: [ns.div("container ns-filter-rule p-0", ns.div("row g-2", filter_list))],
						},
						{
							label: "Sort",
							icon: "sort",
							elems: [ns.div("container ns-sort-rule p-0", ns.div("row g-2", sort_list))],
						},
						{
							label: "Fields",
							icon: "tasks",
							elems: [ns.div("container ns-field-rule p-0", ns.div("row g-2", field_list))],
						},
						{
							label: "Page",
							icon: "list-ol",
							elems: [
								ns.div(
									"container ns-page-rule p-0",
									ns.div("row g-2", [
										ns.input({
											type: "number",
											name: "limit",
											min: opt.limit.min,
											max: opt.limit.max,
											step: opt.limit.step,
											value: opt.data.limit,
											numctl: true,
											size: "col-6",
											label: "Record per Page",
										}),
										ns.input({
											type: "number",
											name: "step",
											min: opt.skip.min,
											max: opt.skip.max,
											step: opt.skip.step,
											value: opt.data.skip / opt.data.limit + 1,
											numctl: true,
											size: "col-6",
											label: "Current Page",
										}),
									])
								),
							],
						},
					],
				}),
				button: "okaycancel",
			})
			.then((data) => {
				opt.callback(sender, fn.get(data.dlg));
			})
			.catch((err) => {});
	};
})(ns);
//generate random data
//author: printf83@gmail.com (c) 2020 - 2021

(function ($) {
	var tname_b = [
		"Ben",
		"Sammie",
		"Darryl",
		"Mohammad",
		"Felton",
		"Neville",
		"Ward",
		"Len",
		"Ethan",
		"Fredric",
		"Chang",
		"Ira",
		"Robby",
		"Austin",
		"Cletus",
		"Everette",
		"Freeman",
		"Byron",
		"Ismael",
		"Lino",
		"Hobert",
		"Odell",
		"Valentin",
		"Gil",
		"Van",
		"Sydney",
		"Hipolito",
		"Arnold",
		"Donte",
		"Drew",
		"Dewayne",
		"Mike",
		"Brent",
		"Carlos",
		"Bennett",
		"Mario",
		"Chet",
		"Davis",
		"Ramon",
		"Efrain",
		"Rayford",
		"Fred",
		"Emmitt",
		"Willian",
		"Marcelo",
		"Cornell",
		"Gustavo",
		"Scotty",
		"Pete",
		"Edward",
		"Jean",
		"Albert",
		"Carlo",
		"Joel",
		"Rolf",
		"Chadwick",
		"Rashad",
		"Kareem",
		"Seymour",
		"Marion",
		"Andre",
		"Quinton",
		"Marty",
		"Jarrod",
		"Allan",
		"Cedrick",
		"Heath",
		"Ned",
		"Harrison",
		"Matt",
		"Loyd",
		"Jefferson",
		"Fidel",
		"Len",
		"Brandon",
		"Curt",
		"Johnie",
		"Pasquale",
		"Francisco",
		"Drew",
		"Roberto",
		"Micah",
		"Carrol",
		"Fritz",
		"Vince",
		"Chance",
		"Simon",
		"Dane",
		"Randell",
		"Weldon",
		"Milton",
		"Gail",
		"Patricia",
		"Wilson",
		"Edgar",
		"Darrel",
		"Anderson",
		"Sandy",
		"Armand",
		"Mikel",
		"Burton",
		"Bernardo",
		"Neal",
		"Tracy",
		"Vern",
		"Barry",
		"James",
		"Brain",
		"Sergio",
		"Gregorio",
		"Sean",
		"Rupert",
		"Alejandro",
		"Kasey",
		"Marcellus",
		"Arnold",
		"Garland",
		"Clement",
		"Lloyd",
		"August",
		"Raleigh",
		"Art",
		"Otto",
		"Robbie",
		"Chadwick",
		"Hugo",
		"Odell",
		"Darrin",
		"Hershel",
		"Mohammed",
		"Gerry",
		"Ramiro",
		"Cristobal",
		"Ambrose",
		"Wilson",
		"Eugenio",
		"Wes",
		"Olen",
		"Dewey",
		"Cordell",
		"Lorenzo",
		"Prince",
		"Darrell",
		"Hayden",
		"Jerold",
		"Jordan",
		"Juan",
		"Jesse",
		"Thanh",
		"Aldo",
		"Alexander",
		"Bill",
		"Robin",
		"Dalton",
		"Terrance",
		"Cordell",
		"Quinton",
		"Raleigh",
		"Dallas",
		"Bert",
		"Titus",
		"Demarcus",
		"Brady",
		"Elvis",
		"Truman",
		"Hugh",
		"Sid",
		"Amos",
		"Jamel",
		"Tomas",
		"Rocco",
		"Gus",
		"Bradford",
		"Jarod",
		"Percy",
		"Horacio",
		"Robert",
		"Oren",
		"Bret",
		"Wilton",
		"Oscar",
		"Antonio",
		"Gregg",
		"Wilfredo",
		"Armand",
		"Barrett",
		"Everette",
		"Isaac",
		"Hershel",
		"Reginald",
		"Frank",
		"Kory",
		"Jeff",
		"Herschel",
		"Zachariah",
		"Charlie",
		"Ty",
		"Berry",
		"Connie",
		"Rickie",
	];

	var tname_g = [
		"Marjory",
		"Ok",
		"Hillary",
		"Helene",
		"Vinita",
		"Evelyne",
		"Shemika",
		"Larisa",
		"Vicenta",
		"Adelia",
		"Alline",
		"Annamaria",
		"Nicolle",
		"Iva",
		"Niesha",
		"Therese",
		"Janell",
		"Kerri",
		"Sasha",
		"Shawna",
		"Leighann",
		"Alexandra",
		"Lashandra",
		"Tammera",
		"Jeanette",
		"Maura",
		"Signe",
		"Bonnie",
		"Cassie",
		"Sherita",
		"Liberty",
		"Hannah",
		"Micha",
		"Charlyn",
		"Irmgard",
		"Elisabeth",
		"Rossana",
		"Tobie",
		"Lisbeth",
		"Keitha",
		"Yasmin",
		"Letha",
		"Kathi",
		"Janine",
		"Fernanda",
		"Marianela",
		"Mora",
		"Angelina",
		"Sophie",
		"Patrice",
		"Patria",
		"Maricela",
		"Shenita",
		"Yuette",
		"Rosetta",
		"Herma",
		"Kandra",
		"Voncile",
		"Terese",
		"Emely",
		"Flora",
		"Lynne",
		"Karole",
		"Regina",
		"Elfriede",
		"Delaine",
		"Hanh",
		"Candice",
		"Alysa",
		"Vi",
		"Tai",
		"Yukiko",
		"Noelle",
		"Marketta",
		"Tonia",
		"Lacey",
		"Maxine",
		"Venice",
		"Ashleigh",
		"Alice",
		"Lynell",
		"Danna",
		"Josephine",
		"Maye",
		"Keturah",
		"Lyn",
		"Lucina",
		"Georgina",
		"Verlie",
		"Idell",
		"Katherin",
		"Ela",
		"Luna",
		"Li",
		"Arlena",
		"Marylyn",
		"Lenita",
		"Manuela",
		"Allena",
		"Adah",
	];

	var t_email = ["@gmail.com", "@yahoo.com", "@live.com", "@outlook.com", "@aol.com", "@tm.com.my", "@kdn.gov.my"];

	$.rdata = {
		name: () => {
			if (ns.core.rndBetween(1, 100) > 50) {
				var fName = ns.core.rndBetween(0, tname_b.length - 1);
				var lName = ns.core.rndBetween(0, tname_b.length - 1);
				while (fName === lName) {
					fName = ns.core.rndBetween(0, tname_b.length - 1);
				}

				return [tname_b[fName], tname_b[lName]].join(" ");
			} else {
				var fName = ns.core.rndBetween(0, tname_g.length - 1);
				var lName = ns.core.rndBetween(0, tname_b.length - 1);

				return [tname_g[fName], tname_b[lName]].join(" ");
			}
		},
		email: (name) => {
			if (!name) {
				name = $.rdata.name();
			}

			var tname = name.split(" ");
			var tdiv = ns.core.rndBetween(0, 3);
			var temail = ns.core.rndBetween(0, t_email.length - 1);
			var tnum = ns.core.rndBetween(0, 100) > 50 ? ns.core.rndBetween(1, 9999) : "";
			var tdivcode = ["_", ".", "", "-"];
			return tname.join(tdivcode[tdiv]).toLowerCase() + tnum + t_email[temail];
		},
		phone: () => {
			return [
				"0",
				"1",
				ns.core.rndBetween(0, 9),
				ns.core.rndBetween(1, 9),
				ns.core.rndBetween(0, 9),
				ns.core.rndBetween(0, 9),
				ns.core.rndBetween(0, 9),
				ns.core.rndBetween(0, 9),
				ns.core.rndBetween(0, 9),
				ns.core.rndBetween(0, 9),
			].join("");
		},
		dob: () => {
			return [ns.core.rndBetween(1965, 2019), ns.core.pad(ns.core.rndBetween(1, 12), 2), ns.core.pad(ns.core.rndBetween(1, 28), 2)].join("-");
		},
		opt: (list) => {
			if (list && list.length > 0) {
				return list[ns.core.rndBetween(0, list.length - 1)].value;
			}
			return null;
		},
	};
})($);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.spinner = function (opt) {
		opt = $.extend(
			{},
			{
				id: null,
				class: null,
				color: null,
				weight: null,
				style: null,
				grow: false,
				elems: null,
				label: "Loading...",
			},
			opt
		);

		return ns.div(
			[
				`spinner-${opt.grow ? "grow" : "border"}`,
				opt.color ? `text-${opt.color}` : null,
				opt.class,
				opt.weight ? `spinner-${opt.grow ? "grow" : "border"}-${opt.weight}` : null,
			],
			{ role: "status", id: opt.id, "aria-label": opt.label === "" ? "true" : null },
			opt.style,
			opt.label === ""
				? null
				: {
						tag: "span",
						class: "visually-hidden",
						elems: opt.label,
				  }
		);
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	var fn = {
		table: {
			tr: function (i) {
				if (typeof i === "object") {
					i = $.extend(
						{},
						{
							id: null,
							class: null,
							color: null,
							elems: null,
						},
						i
					);

					return {
						tag: "tr",
						class: [i.class ? i.class : null, i.color ? `table-${i.color}` : null],
						elems: i.elems ? i.elems : null,
					};
				} else {
					return {
						tag: "tr",
						elems: i,
					};
				}
			},
			td: function (i) {
				if (typeof i === "object") {
					i = $.extend(
						{},
						{
							type: "td",
							scope: null,
							id: null,
							class: null,
							colspan: null,
							rowspan: null,
							elems: null,
						},
						i
					);

					return {
						tag: i.type,
						class: i.class ? i.class : null,
						attr: {
							scope: i.scope,
							colspan: i.colspan ? i.colspan : null,
							rowspan: i.rowspan ? i.rowspan : null,
						},
						elems: i.elems ? i.elems : "&nbsp;",
					};
				} else {
					return {
						tag: "td",
						elems: i ? i : "&nbsp;",
					};
				}
			},
		},
	};

	ns.table = function (...arg) {
		if (arg) {
			var opt = null;
			var a = null;

			if (arg.length === 2) {
				opt = arg[0];
				a = arg[1];
			} else if (arg.length === 1) {
				a = arg[0];
			}

			opt = $.extend(
				{},
				{
					id: null,
					class: null,
					headclass: null,
					bodyclass: null,
					footerclass: null,
					color: null,
					striped: false,
					align: null, //middle|top|bottom
					rownumber: false,
					responsive: true,
					hover: false,
					border: null, //null|"bordered"|"none"
					bordercolor: null,
					caption: null,
					captiontop: false,
					header: true,
					footer: false,
				},
				opt
			);

			if (Array.isArray(a)) {
				var thead = null;

				if (opt.header) {
					var th = [];

					//generate header
					th = a[0].map(function (i) {
						if (typeof i === "object") {
							i = $.extend(
								{},
								{
									id: null,
									type: "th",
									scope: "col",
									class: null,
									colspan: null,
									rowspan: null,
									elems: null,
								},
								i
							);

							return fn.table.td(i);
						} else {
							return fn.table.td({
								type: "th",
								scope: "col",
								elems: i,
							});
						}
					});

					//put row number
					if (opt.rownumber) {
						th.unshift(
							fn.table.td({
								type: "th",
								scope: "col",
								elems: "#",
							})
						);
					}

					//put in th
					thead = {
						tag: "thead",
						class: opt.headclass ? opt.headclass : null,
						elems: fn.table.tr({
							elems: th,
						}),
					};
				}

				//generate body;
				var tb = [];
				var x = opt.header ? 1 : 0;
				var len = a.length - (opt.footer ? 1 : 0);
				for (x; x < len; x++) {
					var td = [];

					if (opt.rownumber) {
						td.push(
							fn.table.td({
								type: "th",
								scope: "row",
								elems: x.toString(),
							})
						);
					}

					$.each(a[x], function (index, i) {
						td.push(fn.table.td(i));
					});

					tb.push(
						fn.table.tr({
							elems: td,
						})
					);
				}

				var tbody = {
					tag: "tbody",
					class: opt.bodyclass ? opt.bodyclass : null,
					elems: tb,
				};

				var tfoot = null;
				if (opt.footer) {
					var tf = [];

					if (opt.rownumber) {
						tf.push(
							fn.table.td({
								type: "th",
								scope: "row",
								elems: null,
							})
						);
					}

					$.each(a[len - 1], function (index, i) {
						tf.push(fn.table.td(i));
					});

					tfoot = {
						tag: "tfoot",
						class: opt.footerclass ? opt.footerclass : null,
						elems: fn.table.tr({
							elems: tf,
						}),
					};
				}

				var tbl = {
					tag: "table",
					class: [
						"table",
						opt.class ? opt.class : null,
						opt.color ? `table-${opt.color}` : null,
						opt.striped ? "table-striped" : null,
						opt.hover ? "table-hover" : null,
						opt.align ? `align-${opt.align}` : null,
						opt.border
							? opt.border === "none"
								? "table-borderless"
								: opt.border === "borderd"
								? "table-bordered"
								: null
							: null,
						opt.bordercolor ? `border-${opt.bordercolor}` : null,
						opt.captiontop ? "caption-top" : null,
						opt.size ? `table-${opt.size}` : null,
					],
					elems: [
						opt.caption
							? {
									tag: "caption",
									elems: opt.caption,
							  }
							: null,
						thead,
						tbody,
						tfoot,
					].removeEmpty(),
				};

				if (opt.responsive) {
					return ns.div(
						[typeof opt.responsive === "string" ? `tbl-responsive-${opt.responsive}` : "table-responsive"],
						tbl
					);
				} else {
					return tbl;
				}
			}
		}
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	/**
	 * * = tag
	 * ns.*(class,elems)
	 * ns.*(class,attr,elems)
	 * ns.*(class,attr,style,elems)
	 * ns.*(obj:{tag,id,style,attr,data,class,elems})
	 */
	ns.div = function (...arg) {
		return ns.tag("div", ...arg);
	};

	ns.p = function (...arg) {
		return ns.tag("p", ...arg);
	};

	ns.span = function (...arg) {
		return ns.tag("span", ...arg);
	};

	ns.ol = function (...arg) {
		return ns.tag("ol", ...arg);
	};

	ns.ul = function (...arg) {
		return ns.tag("ul", ...arg);
	};

	ns.li = function (...arg) {
		return ns.tag("li", ...arg);
	};

	/**
	 *
	 * ns.tag(class,elems)
	 * ns.tag(class,attr,elems)
	 * ns.tag(class,attr,style,elems)
	 * ns.tag(obj:{tag,id,style,attr,data,class,elems})
	 */
	ns.tag = function (tag, ...arg) {
		if (tag && arg) {
			if (arg.length === 4) {
				return ns.tag(tag, {
					class: arg[0],
					attr: arg[1],
					style: arg[2],
					elems: arg[3],
				});
			} else if (arg.length === 3) {
				return ns.tag(tag, {
					class: arg[0],
					attr: arg[1],
					elems: arg[2],
				});
			} else if (arg.length === 2) {
				return ns.tag(tag, {
					class: arg[0],
					elems: arg[1],
				});
			} else if ((arg.length === 1 && typeof arg[0] === "string") || Array.isArray(arg[0])) {
				return ns.tag(tag, {
					elems: arg[0],
				});
			} else if (arg.length === 1 && typeof arg[0] === "object") {
				var opt = arg[0];

				opt = $.extend(
					{},
					{
						tag: tag,
						id: null,
						style: null,
						attr: null,
						data: null,
						class: null,
						elems: null,
					},
					opt
				);

				if (opt.hasOwnProperty("ns") && opt.ns === 0) {
					//no ns tag provided for checkbox/radio/swithc with flexcontainer (inputgroup with check/radio/swithc)
					return {
						tag: opt.tag,
						id: opt.id,
						class: opt.class ? (Array.isArray(opt.class) ? opt.class.combine(" ") : opt.class) : null,
						style: opt.style,
						data: opt.data,
						attr: opt.attr,
						elems: opt.elems ? (Array.isArray(opt.elems) ? opt.elems.removeEmpty() : opt.elems) : null,
					};
				} else {
					return {
						ns: 1,
						tag: opt.tag,
						id: opt.id,
						class: opt.class ? (Array.isArray(opt.class) ? opt.class.combine(" ") : opt.class) : null,
						style: opt.style,
						data: opt.data,
						attr: opt.attr,
						elems: opt.elems ? (Array.isArray(opt.elems) ? opt.elems.removeEmpty() : opt.elems) : null,
					};
				}
			} else {
				console.error("Unsupported arg.length"); // + arg.length);
			}
		} else {
			console.error("Unsupported tag and arg.length");
		}
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {})(ns);
//build and show toast msg
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {
	var fn = {
		build: function (opt) {
			opt = $.extend(
				{},
				{
					id: null,
					class: null,
					animate: true,
					title: null,
					icon: null,
					msg: null,
					autohide: true,
					delay: 5000,
					color: null,
					textcolor: null,
					date: new Date(),
				},
				opt
			);

			//generate id
			opt.id = opt.id ? opt.id : ns.core.UUID();

			var res = [];

			//create icon
			if (opt.icon) {
				if (typeof opt.icon === "string") {
					res.push(ns.icon({ icon: opt.icon, size: "lg", class: "me-2" }));
				} else {
					res.push(ns.icon(opt.icon));
				}
			}

			//create strong for title
			if (opt.title) {
				res.push({
					tag: "strong",
					class: ["me-auto", opt.icon ? "ms-2" : null],
					elems: opt.title,
				});
			}

			//create timer
			if ((opt.title || opt.icon) && !opt.autoclose) {
				if (!opt.title) {
					res.push({
						tag: "strong",
						class: "me-auto",
						elems: "&nbsp;",
					});
				}

				res.push({
					tag: "small",
					class: "text-muted timer",
					attr: { "data-ns-time": opt.date, id: `${opt.id}-timer` },
					elems: "Just now",
				});
			}

			//create close button
			if (opt.title || opt.icon) {
				//<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
				res.push({
					tag: "button",
					class: "btn-close",
					attr: { type: "button", "data-bs-dismiss": "toast" },
				});
			}

			//wrap in div.toast-header
			if (opt.title || opt.icon) {
				res = [ns.div("toast-header", res.slice())];
			}

			//append body
			res.push(ns.div("toast-body", opt.msg));

			return ns.div(
				[
					"toast",
					opt.class ? opt.class : null,
					opt.color ? [`bg-${opt.color}`, opt.textcolor ? `text-${opt.textcolor}` : null].combine(" ") : null,
				],
				{
					id: opt.id,
					"data-bs-animation": opt.animate ? "true" : null,
					"data-bs-autohide": opt.autohide ? "true" : "false",
					"data-bs-delay": opt.delay ? opt.delay : null,
				},
				res
			);
		},
		timer: function (elem) {
			//set "justtime timer"
			if (elem) {
				var t1 = new Date();
				var t2 = new Date($(elem).attr("data-ns-time"));

				if (t1 > t2) {
					var diff = t1.getTime() - t2.getTime();
					var sec = parseInt(diff / 1000, 10);

					var nextcheck = 1000;
					if (sec < 1) {
						nextcheck = 1000;
						$(elem).html(`Just now`);
					} else if (sec >= 1 && sec < 60) {
						//second
						nextcheck = 1000;
						$(elem).html(`${sec} second${sec > 1 ? "s" : ""} ago`);
					} else if (sec >= 60 && sec < 3600) {
						//minute
						nextcheck = 60000;
						let t = parseInt(sec / 60, 10);
						$(elem).html(`${t} minute${t > 1 ? "s" : ""} ago`);
					} else if (sec >= 3600 && sec < 86400) {
						//hour
						nextcheck = 3600000;
						let t = parseInt(sec / 3600, 10);
						$(elem).html(`${t} hour${t > 1 ? "s" : ""} ago`);
					} else {
						//do not on timer
						nextcheck = -1;
						let t = parseInt(sec / 86400, 10);
						$(elem).html(`${t} day${t > 1 ? "s" : ""} ago`);
					}

					if (nextcheck > 0) {
						setTimeout(
							function (elem) {
								fn.timer(elem);
							},
							nextcheck,
							elem
						);
					}
				}
			}
		},
		show: function (elem) {
			new bootstrap.Toast(elem);
			var tst = bootstrap.Toast.getInstance(elem);
			if (tst) {
				//autoremove after hide
				$(elem).on("hidden.bs.toast", function () {
					setTimeout(
						function (elem) {
							fn.destroy(elem);
						},
						1000,
						elem
					);
				});

				fn.timer($(elem).find("[data-ns-time]")[0]);

				tst.show();
			}
		},
		hide: function (elem) {
			var tst = bootstrap.Toast.getInstance(elem);
			if (tst) {
				tst.hide();
			}
		},
		destroy: function (elem) {
			var tst = bootstrap.Toast.getInstance(elem);
			if (tst) {
				try {
					$(tst).destroy();
				} catch {}

				$(elem).remove();
			}
		},
		toastmsg: function (...arg) {
			if (arg && arg.length > 0) {
				var msg = null;
				var icon = null;

				if (arg.length === 1) {
					msg = arg[0];
				} else if (arg.length > 1) {
					icon = arg[0];
					msg = arg[1];
				}

				if (icon) {
					var si = ns.sIcon(icon);

					return {
						color: si ? si.color : null,
						textcolor: si ? si.textcolor : null,
						elems: ns.div("row g-0", [
							ns.div(
								"col-auto align-self-start me-3",
								ns.icon({
									icon: si ? si.icon : icon,
									size: "lg",
								})
							),
							ns.div("col align-self-center", msg),
						]),
					};
				} else {
					return {
						textcolor: null,
						color: null,
						elems: msg,
					};
				}
			}
		},
	};

	ns.toast = function (...arg) {
		if (arg && arg.length > 0) {
			if (arg.length === 2 && typeof arg[0] === "string" && typeof arg[1] === "string") {
				var t = fn.toastmsg(arg[0], arg[1]);
				if (t) {
					return ns.toast({
						msg: t.elems,
						color: t.color,
						textcolor: t.textcolor,
					});
				}
			} else if (arg.length === 1 && typeof arg[0] === "object") {
				var opt = arg[0];
				opt = $.extend(
					{},
					{
						id: null,
						msg: null,
						color: true,
						textcolor: null,
						delay: null,
						position: "top-0 end-0",
					},
					opt
				);

				opt.id = opt.id || ns.core.UUID();

				//document.querySelector(".toast-container");
				var containerquery = [
					".toast-container",
					opt.position ? "." + opt.position.split(" ").join(".") : null,
				].combine("");
				//console.log(containerquery);
				var container = $(containerquery).get();

				//generate container
				if (!container || container.length === 0) {
					ns.build.append(
						document.body,
						ns.div(
							"position-relative",
							{ "aria-live": "polite", "aria-atomic": "true" },
							{ zIndex: "1031" },
							ns.div(["toast-container position-fixed p-3", opt.position], null)
						)
					);
					//document.querySelector(containerquery);
					container = $(containerquery).get();
				}

				//put toast into container
				ns.build.append(container, fn.build(opt));

				//show toast
				fn.show(document.getElementById(opt.id));
			} else {
				console.error("Unsupported argument");
			}
		}
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.toc = function (opt) {
		if (Array.isArray(opt)) {
			return ns.toc({
				elems: opt,
			});
		} else {
			opt = $.extend(
				{},
				{
					id: null,
					class: null,
					label: null,
					elems: null,
				},
				opt
			);

			if (opt.elems) {
				return ns.div(["text-muted ns-toc", opt.class], { id: opt.id }, [
					{ tag: "h6", elems: opt.label ? opt.label : "Table of content" },
					{ tag: "hr", class: "mx-1" },
					{
						tag: "ul",
						class: "list-unstyled small",
						elems: opt.elems.map(function (i) {
							return {
								tag: "li",
								class: [i.level === 1 ? null : "fw-bold", "mx-1", "text-truncate"],
								elems: {
									tag: "a",
									class: "text-muted",
									attr: {
										onclick: i.onclick,
										href: i.href ? i.href : "javascript:void(0)",
									},
									elems: i.label,
								},
							};
						}),
					},
				]);
			}
		}
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.tooltip = function (opt, obj) {
		if (typeof opt === "string") {
			var msgTemp = opt;
			opt = {};
			opt.msg = msgTemp;
		}

		opt = $.extend(
			{},
			{
				title: null,
				msg: null,
				type: null, //null|tooltip|popover
				placement: "top", //top|left|bottom|right
				trigger: "focus", //focus|null|focus hover
			},
			opt
		);

		if (opt.msg) {
			if (obj) {
				if (!obj.attr) {
					obj.attr = {};
				}

				if (opt.type === "popover") {
					if (opt.title) {
						obj.attr["title"] = opt.title;
					}
				} else {
					obj.attr["title"] = opt.msg;
				}

				//console.log("title : " + JSON.stringify(obj.attr.title));

				if (opt.type) {
					obj.attr["data-bs-toggle"] = opt.type;

					if (opt.type === "popover") {
						obj.attr["data-bs-content"] = opt.msg;

						if (opt.trigger) {
							obj.attr["data-bs-trigger"] = opt.trigger;
						}
					}

					if (opt.placement) {
						obj.attr["data-bs-placement"] = opt.placement;
					}

					if (ns.core.isHTML(opt.msg)) {
						obj.attr["data-bs-html"] = "true";
					}
				}
			}
		}

		return obj;
	};
})(ns);
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	var fn = {};

	ns.validate = function (container) {
		return new Promise((res, rej) => {
			var listofcontrol = $(container).find("[name]").get();
			if (listofcontrol) {
				$(container).removeClass("was-validated");
				$.each(listofcontrol, function (index, ctl) {
					//remove invalid and valid feedback
					// $(ctl).closest(".col").find(".valid-feedback").remove();
					// $(ctl).closest(".col").find(".invalid-feedback").remove();

					//check required
					if ($(ctl).attr("required")) {
						if (!ns.core.getvalue(ctl)) {
							$(ctl).addClass("is-invalid").removeClass("is-valid");

							// //add validation message
							// var ctltitle = $(ctl).closest(".col").find("label").text();
							// ctltitle = ctltitle.toLowerCase() || "value";
							// $(ctl)
							// 	.parent()
							// 	.append(
							// 		ns.build.html(ns.div("invalid-feedback", `Please provide a valid ${ctltitle}`))
							// 	);
						} else {
							$(ctl).addClass("is-valid").removeClass("is-invalid");
						}
					}
				});
				$(container).addClass("was-validated");
			}

			var invalidctl = $(container).find(".is-invalid");
			if (invalidctl && invalidctl.length > 0) {
				rej();
			} else {
				res();
			}
		});
	};
})(ns);
