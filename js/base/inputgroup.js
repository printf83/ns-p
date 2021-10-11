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
					{
						tag: "div",
						class: ["input-group", opt.nowrap ? "flex-nowrap" : null, opt.class],
						elems: opt.elems,
					},
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

				return {
					tag: "div",
					class: ["input-group-text", opt.class],
					attr: { id: opt.id },
					elems: opt.elems,
				};
			}
		},
	};
})(ns);
