//container generator
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {
	ns.cont = {
		singlecolumnform: function (elems) {
			return {
				tag: "div",
				class: "container-fluid p-0",
				elems: {
					tag: "div",
					class: "row row-cols-1 g-3",
					elems: elems.map(function (i) {
						return {
							tag: "div",
							class: "col",
							elems: i,
						};
					}),
				},
			};
		},
		stack: function (elems) {
			return {
				tag: "div",
				class: "container-fluid p-0",
				elems: {
					tag: "div",
					class: "row row-cols-auto g-3",
					elems: elems.map(function (i) {
						return {
							tag: "div",
							class: "col",
							elems: i,
						};
					}),
				},
			};
		},

		div: function (className, elems) {
			if (className && typeof className === "string") {
				return ns.cont.tag({
					tag: "div",
					class: className,
					elems: elems,
				});
			} else {
				return ns.cont.tag({
					tag: "div",
					elems: className,
				});
			}
		},
		ul: function (className, elems) {
			if (className && typeof className === "string") {
				return ns.cont.tag({
					tag: "ul",
					class: className,
					elems: elems,
				});
			} else {
				return ns.cont.tag({
					tag: "ul",
					elems: className,
				});
			}
		},
		ol: function (className, elems) {
			if (className && typeof className === "string") {
				return ns.cont.tag({
					tag: "ol",
					class: className,
					elems: elems,
				});
			} else {
				return ns.cont.tag({
					tag: "ol",
					elems: className,
				});
			}
		},
		li: function (className, elems) {
			if (className && typeof className === "string") {
				return ns.cont.tag({
					tag: "li",
					class: className,
					elems: elems,
				});
			} else {
				return ns.cont.tag({
					tag: "li",
					elems: className,
				});
			}
		},
		listgroup: function (className, elems) {
			if (className && typeof className === "string") {
				return ns.cont.ul(["list-group", className].combine(" "), elems);
			} else {
				return ns.cont.ul("list-group", className);
			}
		},
		listitem: function (className, elems) {
			if (className && typeof className === "string") {
				return ns.cont.ul(["list-group-item", className].combine(" "), elems);
			} else {
				return ns.cont.ul("list-group-item", className);
			}
		},
		mxauto: function (className, elems) {
			if (className && typeof className === "string") {
				return ns.cont.div(["mx-auto", className].combine(" "), elems);
			} else {
				return ns.cont.div("mx-auto", className);
			}
		},
		btngroup: function (className, elems) {
			if (className && typeof className === "string") {
				return {
					tag: "div",
					class: ["btn-group", className].combine(" "),
					attr: { role: "group" },
					elems: elems,
				};
			} else {
				return {
					tag: "div",
					class: "btn-group",
					attr: { role: "group" },
					elems: className,
				};
			}
		},
		btngroupvertical: function (className, elems) {
			if (className && typeof className === "string") {
				return {
					tag: "div",
					class: ["btn-group-vertical", className].combine(" "),
					attr: { role: "group" },
					elems: elems,
				};
			} else {
				return {
					tag: "div",
					class: "btn-group-vertical",
					attr: { role: "group" },
					elems: className,
				};
			}
		},
		inputgroup: function (className, elems) {
			if (className && typeof className === "string") {
				return ns.cont.div(["input-group", className].combine(" "), elems);
			} else {
				return ns.cont.div("input-group", className);
			}
		},
		grid: function (className, elems) {
			return {
				tag: "div",
				class: "container",
				elems: {
					tag: "div",
					class: ["row", className].combine(" "),
					elems: elems.map((i, ix) => {
						return {
							tag: "div",
							class: "col",
							elems: i,
						};
					}),
				},
			};
		},
		flex: function (opt, elems) {
			if (typeof opt === "string") {
				return ns.cont.flex(
					{
						class: opt,
					},
					elems
				);
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						elems: null,
					},
					opt
				);

				return {
					tag: "div",
					class: opt.class ? opt.class : "d-flex",
					elems: elems,
				};
			}
		},
		tag: function (opt) {
			opt = $.extend(
				{},
				{
					tag: "div",
					id: null,
					name: null,
					class: null,
					onclick: null,
					href: null,
					attr: null,
					data: null,
					elems: null,
				},
				opt
			);

			//if tag is "a" and href is empty then required href to set
			if (opt.tag === "a" && !opt.href) {
				opt.href = "javascript:void(0);";
			}

			//standby opt.attr if name,id,onclick,href provided and opt.attr is empty
			if (!opt.attr) {
				if (opt.name || opt.id || opt.onclick || opt.href) {
					opt.attr = {};
				}
			}

			//move name,id,onclick,href into opt.attr
			["name", "id", "onclick", "href"].forEach((attr) => {
				if (opt[attr]) {
					opt.attr[attr] = opt[attr];
					delete opt[attr];
				}
			});

			return {
				tag: opt.tag,
				class: opt.class,
				attr: opt.attr,
				elems: opt.elems,
			};
		},
	};
})(ns);
