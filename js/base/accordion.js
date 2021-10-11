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

			return {
				tag: "div",
				attr: { id: opt.id },
				class: ["accordion", opt.flush ? "accordion-flush" : null].combine(" "),
				elems: opt.item.map(function (x, ix) {
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
					return {
						tag: "div",
						class: "accordion-item",
						elems: [
							{
								tag: "h2",
								class: "accordion-header",
								attr: { id: `${x.id}-head` },
								elems: {
									tag: "button",
									class: ["accordion-button", x.active ? null : "collapsed"].combine(" "),
									attr: {
										type: "button",
										"data-bs-toggle": "collapse",
										"data-bs-target": `#${x.id}-body`,
										"aria-expanded": x.active ? "true" : "false",
										"aria-controls": `${x.id}-body`,
									},
									elems:
										x.label || x.icon
											? [x.icon ? ns.icon(x.icon) : null, x.icon ? { tag: "span", class: "ms-2", elems: x.label } : x.label]
											: null,
								},
							},
							{
								tag: "div",
								class: ["accordion-collapse", "collapse", x.active ? "show" : null].combine(" "),
								attr: {
									id: `${x.id}-body`,
									"aria-labelledby": `${x.id}-head`,
									"data-bs-parent": opt.autoclose ? `#${opt.id}` : null,
								},
								elems: { tag: "div", class: "accordion-body", elems: x.elems },
							},
						],
					};
				}),
			};
		} else {
			return null;
		}
	};
})(ns);
