//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.badge = function (opt) {
		if (typeof opt === "object") {
			opt = $.extend(
				{},
				{
					id: null,
					class: null,
					label: null,
					pill: false,
					notification: false,
					color: "secondary",
					border: null,
					darktext: false,
					asst: null,
					tooltip: null,
					tooltipplace: null,
				},
				opt
			);

			return {
				tag: "span",
				class: [
					"badge",
					opt.class ? opt.class : null,
					opt.color ? `bg-${opt.color}` : null,
					opt.darktext ? "text-dark" : null,
					opt.pill ? "rounded-pill" : null,
					opt.notification ? "position-absolute top-0 start-100 translate-middle" : null,
					opt.notification && !opt.label ? "p-2" : null,
					opt.border ? `border border-${opt.border}` : null,
					opt.label ? null : "rounded-circle",
				],
				attr: { id: opt.id },
				elems: [opt.label ? opt.label.toString() : "", opt.asst ? { tag: "span", class: "visually-hidden", elems: opt.asst } : null],
			};
		} else {
			return ns.badge({
				label: opt,
			});
		}
	};
})(ns);
