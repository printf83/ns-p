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

					return {
						tag: "div",
						attr: { id: opt.id },
						class: ["collapse", opt.class],
						elems: opt.elems,
					};
				} else {
					console.error("Unsupported argument");
				}
			} else {
				console.error("Unsupported argument");
			}
		},
	};
})(ns);
