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
							elems: {
								tag: "div",
								elems: item.elems,
							},
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
