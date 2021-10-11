//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.breadcrumb = function (opt) {
		if (typeof opt === "object") {
			opt = $.extend(
				{},
				{
					id: null,
					class: null,
					item: null,
					divider:
						"url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);" /** "''","'/'", "'>'" */,
				},
				opt
			);

			//gen id
			opt.id = opt.id ? opt.id : ns.core.UUID();

			var li = null;

			if (opt.item) {
				if (!Array.isArray(opt.item)) {
					opt.item = [opt.item];
				}

				li = opt.item.map(function (i, ix) {
					if (typeof i !== "object") {
						i = {
							label: i,
						};
					}

					i = $.extend(
						{},
						{
							href: null,
							label: null,
							active: false,
						},
						i
					);

					return {
						tag: "li",
						class: ["breadcrumb-item", i.active ? "active" : null],
						attr: { "aria-current": i.active ? "page" : null },
						elems: i.active
							? i.label
							: {
									tag: "a",
									attr: { href: i.href ? i.href : "javascript:void(0)", onclick: i.onclick },
									elems: i.label,
							  },
					};
				});
			}

			return {
				tag: "nav",
				class: opt.class,
				attr: {
					id: opt.id,
					"aria-label": "breadcrumb",
					style: opt.divider ? `--bs-breadcrumb-divider: ${opt.divider};` : null,
				},
				elems: {
					tag: "ol",
					class: "breadcrumb",
					elems: li,
				},
			};
		} else {
			return ns.breadcrumb({
				items: opt,
			});
		}
	};
})(ns);
