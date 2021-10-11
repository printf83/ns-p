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
					tag: "a",
					id: opt.id,
					class: [opt.color ? `link-${opt.color}` : null, opt.class ? opt.class : null],
					attr: {
						href: opt.href ? opt.href : null,
						onclick: opt.onclick ? opt.onclick : null,
						// title: opt.tooltip ? opt.tooltip : opt.title ? opt.title : null,
						// "data-bs-toggle": opt.tooltip ? "tooltip" : null,
						// "data-bs-placement": opt.tooltip ? (opt.tooltipplace ? opt.tooltipplace : "top") : null,
						// "data-bs-html": opt.tooltip && ns.core.isHTML(opt.tooltip) ? "true" : null,
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
