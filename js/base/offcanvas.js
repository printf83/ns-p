//loading controller
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {
	ns.offcanvasbtn = function (opt) {
		opt = $.extend(
			{},
			{
				id: null,
				class: null,
				label: null,
				icon: null,
			},
			opt
		);

		return {
			tag: "a",
			class: opt.class,
			attr: { "data-bs-toggle": "offcanvas", href: `#${opt.id}`, role: "button", "aria-controls": opt.id },
			elems: [opt.icon ? ns.icon(opt.icon) : null, opt.icon ? { tag: "span", class: "ms-2", elems: opt.label } : opt.label].removeEmpty(),
		};
	};

	ns.offcanvas = function (opt) {
		opt = $.extend(
			{},
			{
				id: null,
				class: null,
				bgcolor: null,
				textcolor: null,
				location: "start",
				close: true,
				title: null,
				scroll: true,
				backdrop: false,
				elems: null,
				padding: null,
				margin: null,
			},
			opt
		);

		opt.id = opt.id ? opt.id : ns.core.UUID();

		var header = null;
		if (opt.close || opt.title) {
			header = {
				tag: "div",
				class: "offcanvas-header",
				elems: [
					opt.title
						? {
								tag: "h5",
								class: "offcanvas-title",
								attr: {
									id: `${opt.id}-label`,
								},
								elems: opt.title,
						  }
						: null,
					opt.close
						? {
								tag: "button",
								class: "btn-close text-reset",
								attr: {
									"data-bs-dismiss": "offcanvas",
									"aria-label": "Close",
								},
						  }
						: null,
				].removeEmpty(),
			};
		}

		var body = null;

		if (opt.elems) {
			body = {
				tag: "div",
				class: ["offcanvas-body", opt.padding ? `p-${opt.padding}` : null].combine(" "),
				elems: opt.elems,
			};
		}

		return {
			tag: "div",
			class: [
				"offcanvas",
				opt.location ? `offcanvas-${opt.location}` : null,
				opt.margin ? `m-0 m-md-${opt.margin}` : null,
				opt.class ? opt.class : null,
				opt.bgcolor ? `bg-${opt.bgcolor}` : null,
				opt.textcolor ? `text-${opt.textcolor}` : null,
			].removeEmpty(),
			attr: {
				id: opt.id,
				"aria-labelledby": `${opt.id}-label`,
				"data-bs-scroll": opt.scroll ? "true" : "false",
				"data-bs-backdrop": opt.backdrop ? "true" : "false",
				tabindex: "-1",
			},

			elems: [header, body].removeEmpty(),
		};
	};
})(ns);
