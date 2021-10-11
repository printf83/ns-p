//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.container = function (...arg) {
		if (arg) {
			if (arg.length === 3 && typeof arg[0] === "string" && typeof arg[1] === "string") {
				return ns.container({
					tag: arg[0],
					class: arg[1],
					elems: arg[2],
				});
			} else if (arg.length === 2 && typeof arg[0] === "string") {
				return ns.container({
					tag: "div",
					class: arg[0],
					elems: arg[1],
				});
			} else if (arg.length === 1 && typeof arg[0] === "object") {
				var opt = arg[0];

				opt = $.extend(
					{},
					{
						tag: "div",
						style: null,
						attr: null,
						class: null,
						elems: null,
					},
					opt
				);

				return {
					tag: opt.tag,
					class: opt.class,
					style: opt.style,
					attr: opt.attr,
					elems: opt.elems,
				};
			} else {
				console.error("Unsupported argument");
			}
		} else {
			console.error("Unsupported argument");
		}
	};
})(ns);
