//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.btngroup = function (opt) {
		if (Array.isArray(opt) || typeof opt === "string") {
			return ns.btngroup({ elems: opt });
		} else {
			opt = $.extend(
				{},
				{
					class: null,
					label: null,
					elems: null,
					vertical: false,
					weight: null,
				},
				opt
			);

			return {
				tag: "div",
				class: [opt.vertical ? "btn-group-vertical" : "btn-group", opt.weight ? `btn-group-${opt.weight}` : null, opt.class],
				attr: { role: "group", "aria-label": opt.label ? opt.label : null },
				elems: opt.elems,
			};
		}
	};
})(ns);
