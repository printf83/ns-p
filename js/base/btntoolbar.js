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

			return {
				tag: "div",
				class: ["btn-toolbar", opt.gap ? `gap-${opt.gap}` : null, opt.class],
				attr: { role: "toolbar", "aria-label": opt.label ? opt.label : null },
				elems: opt.elems,
			};
		}
	};
})(ns);
