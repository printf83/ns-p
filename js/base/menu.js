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
							elems: {
								tag: "div",
								class: ["d-inline-block", item.active ? "active" : null],
								attr: {
									onclick: item.onclick ? item.onclick : null,
									role: "button",
								},
								elems: [
									ns.icon(item.icon),
									{
										tag: "span",
										class: [item.icon ? "ms-2" : null],
										elems: item.label,
									},
								].removeEmpty(),
							},
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
						{
							tag: "div",
							elems: {
								tag: "div",
								class: ["btn-toggle", opt.active ? "collapsed" : null].combine(" "),
								attr: {
									"data-bs-toggle": "collapse",
									"data-bs-target": `#${opt.id}`,
									"aria-expanded": opt.active ? "true" : "false",
									role: "button",
								},
								elems: {
									tag: "span",
									class: "ms-2",
									elems: opt.title,
								},
							},
						},
						{
							tag: "div",
							attr: { id: opt.id },
							class: ["collapse", opt.active ? "show" : null, opt.class].combine(" "),
							elems: opt.item,
						},
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
