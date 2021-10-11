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
