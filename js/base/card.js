//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.card = {
		container: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.card.container({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						class: null,
						style: null,
						elems: null,
						align: null, //left,right,center
						color: null,
						textcolor: null,
						bordercolor: null,
						border: true,
					},
					opt
				);

				return {
					tag: "div",
					class: [
						"card",
						opt.class,
						opt.align ? `text-${opt.align}` : null,
						opt.color ? `bg-${opt.color}` : null,
						opt.textcolor ? `text-${opt.textcolor}` : null,
						opt.bordercolor ? `border-${opt.bordercolor}` : null,
						!opt.border ? "border-0" : null,
					],
					style: opt.style,
					elems: opt.elems,
				};
			}
		},
		header: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.card.header({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						elems: null,
						color: null,
						textcolor: null,
						bordercolor: null,
					},
					opt
				);

				return {
					tag: "div",
					class: [
						"card-header",
						opt.class,
						opt.color ? `bg-${opt.color}` : null,
						opt.textcolor ? `text-${opt.textcolor}` : null,
						opt.bordercolor ? `border-${opt.bordercolor}` : null,
					],
					elems: opt.elems,
				};
			}
		},
		body: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.card.body({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						elems: null,
						textcolor: null,
					},
					opt
				);

				return {
					tag: "div",
					class: ["card-body", opt.textcolor ? `text-${opt.textcolor}` : null, opt.class],
					elems: opt.elems,
				};
			}
		},
		footer: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.card.footer({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						muted: true,
						color: null,
						textcolor: null,
						bordercolor: null,
						elems: null,
					},
					opt
				);

				return {
					tag: "div",
					class: [
						"card-footer",
						opt.class,
						opt.muted ? "text-muted" : null,
						opt.color ? `bg-${opt.color}` : null,
						opt.textcolor ? `text-${opt.textcolor}` : null,
						opt.bordercolor ? `border-${opt.bordercolor}` : null,
					],
					elems: opt.elems,
				};
			}
		},
		group: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.card.group({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						elems: null,
						textcolor: null,
					},
					opt
				);

				return {
					tag: "div",
					class: ["card-group", opt.textcolor ? `text-${opt.textcolor}` : null, opt.class],
					elems: opt.elems,
				};
			}
		},

		title: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.card.title({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						elems: null,
						textcolor: null,
					},
					opt
				);

				return {
					tag: "h5",
					class: ["card-title", opt.textcolor ? `text-${opt.textcolor}` : null, opt.class],
					elems: opt.elems,
				};
			}
		},

		subtitle: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.card.subtitle({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						elems: null,
						muted: true,
						textcolor: null,
					},
					opt
				);

				return {
					tag: "h6",
					class: ["card-subtitle mb-2", opt.class, opt.textcolor ? `text-${opt.textcolor}` : null, opt.muted ? "text-muted" : null],
					elems: opt.elems,
				};
			}
		},

		link: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.card.subtitle({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						elems: null,
						href: "javascript:void(0)",
						onclick: null,
					},
					opt
				);

				return {
					tag: "a",
					class: ["card-link", opt.class],
					attr: {
						href: opt.href ? opt.href : null,
						onclick: opt.onclick ? opt.onclick : null,
					},
					elems: opt.elems,
				};
			}
		},

		text: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.card.text({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						elems: null,
						textcolor: null,
					},
					opt
				);

				return {
					tag: "p",
					class: ["card-text", opt.textcolor ? `text-${opt.textcolor}` : null, opt.class],
					elems: opt.elems,
				};
			}
		},

		textsmall: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.card.textsmall({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						muted: true,
						elems: null,
						textcolor: null,
					},
					opt
				);

				return {
					tag: "p",
					class: ["card-text", opt.muted ? "text-muted" : null, opt.textcolor ? `text-${opt.textcolor}` : null, opt.class],
					elems: {
						tag: "small",
						elems: opt.elems,
					},
				};
			}
		},

		img: function (opt) {
			if (typeof opt === "string") {
				return ns.card.img({ src: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						placement: "top", //top|bottom|full|left|right
						src: null,
						alt: null,
					},
					opt
				);

				return {
					tag: "img",
					class: [
						opt.class,
						opt.placement === "full" ? "card-img" : null,
						opt.placement === "top" ? "card-img-top" : null,
						opt.placement === "bottom" ? "card-img-bottom" : null,
						opt.placement === "left" ? "img-fluid rounded-start" : null,
						opt.placement === "right" ? "img-fluid rounded-end" : null,
					],
					attr: { src: opt.src ? opt.src : null, alt: opt.alt ? opt.alt : null },
				};
			}
		},

		imgoverlay: function (opt) {
			if (Array.isArray(opt) || typeof opt === "string") {
				return ns.card.imgoverlay({ elems: opt });
			} else {
				opt = $.extend(
					{},
					{
						class: null,
						elems: null,
						textcolor: null,
					},
					opt
				);

				return {
					tag: "div",
					class: ["card-img-overlay", opt.textcolor ? `text-${opt.textcolor}` : null, opt.class],
					elems: opt.elems,
				};
			}
		},

		horizontal: function (opt) {
			opt = $.extend(
				{},
				{
					size: "col-md-4",
					left: null,
					right: null,
					textcolor: null,
					gap: "0",
				},
				opt
			);

			return {
				tag: "div",
				class: ["row", opt.textcolor ? `text-${opt.textcolor}` : null, opt.gap ? `g-${opt.gap}` : null],
				elems: [
					{
						tag: "div",
						class: opt.size,
						elems: opt.left,
					},
					{
						tag: "div",
						class: "col",
						elems: opt.right,
					},
				],
			};
		},
	};
})(ns);
