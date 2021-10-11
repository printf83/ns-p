//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.toc = function (opt) {
		if (Array.isArray(opt)) {
			return ns.toc({
				elems: opt,
			});
		} else {
			opt = $.extend(
				{},
				{
					id: null,
					class: null,
					label: null,
					elems: null,
				},
				opt
			);

			if (opt.elems) {
				return {
					tag: "div",
					class: ["text-muted ns-toc", opt.class],
					attr: { id: opt.id },
					elems: [
						{ tag: "h6", elems: opt.label ? opt.label : "Table of content" },
						{ tag: "hr", class: "mx-1" },
						{
							tag: "ul",
							class: "list-unstyled small",
							elems: opt.elems.map(function (i) {
								return {
									tag: "li",
									class: [i.level === 1 ? "ps-3" : null, "mx-1"],
									elems: {
										tag: "a",
										class: "text-muted",
										attr: { onclick: i.onclick, href: "javascript:void(0)" },
										elems: i.label,
									},
								};
							}),
						},
					],
				};
			}
		}
	};
})(ns);
