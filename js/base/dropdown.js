//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.dropdown = function (opt) {
		opt = $.extend(
			{},
			{
				id: null,
				name: null,
				class: null,
				style: null,

				label: null,
				labelshow: null,

				value: null,
				checked: false,
				disabled: false,

				nowarp: false,
				weight: null,
				outline: false,
				border: true,
				rounded: true,
				color: null,
				textcolor: null,
				dark: false,

				onclick: null,
				href: null,
				icon: null,
				largeicon: false,

				option: null,
				arrow: "down", //down|null|left|right|up
				aligment: null, //end|start|md-end|xl-end|sm-start
				autoclose: true, //true|false|inside|outside
				type: "button",
				data: null,
				offset: null, //"20,30"
				reference: null, //parent

				navlink: false,
				container: "dropdown", //null|btn-group|nav-item|dropdown
				segmenttoggle: false,
			},
			opt
		);

		//generate id
		opt.id = opt.id ? opt.id : ns.core.UUID();

		if (opt.navlink) {
			opt.container = "nav-item";
			opt.href = opt.href || "javascript:void(0)";
		}

		if (opt.segmenttoggle && opt.container === "dropdown") {
			opt.container = "btn-group";
		}

		var main = {
			tag: opt.href ? "a" : "button",
			class: [
				!opt.navlink ? "btn" : "nav-link",
				!opt.segmenttoggle ? "dropdown-toggle" : null,
				opt.color ? (opt.outline ? `btn-outline-${opt.color}` : `btn-${opt.color}`) : null,
				opt.textcolor ? `text-${opt.textcolor}` : null,
				opt.weight ? `btn-${opt.weight}` : null,
				opt.class,
			],
			attr: {
				id: !opt.segmenttoggle ? opt.id : null,
				"data-bs-toggle": !opt.segmenttoggle ? "dropdown" : null,
				"data-bs-reference": !opt.segmenttoggle ? opt.reference : null,
				"data-bs-offset": !opt.segmenttoggle ? opt.offset : null,
				"data-bs-auto-close": !opt.segmenttoggle ? (opt.autoclose ? opt.autoclose : "false") : null,
				"aria-expanded": !opt.segmenttoggle ? "false" : null,
				href: opt.href,
			},
			elems: [
				opt.icon
					? {
							tag: opt.largeicon ? "span" : null,
							class: opt.largeicon ? ["d-md-block h4-md", opt.label ? "mb-0" : null].combine(" ") : null,
							elems: ns.icon(opt.icon),
					  }
					: null,
				opt.label
					? {
							tag: "span",
							class: [
								opt.icon && !opt.largeicon ? "ms-2" : null,
								opt.icon && opt.largeicon ? "ms-2 ms-md-0" : null,
								opt.option && !opt.segmenttoggle ? "me-2" : null,
								opt.labelshow ? `d-none d-${opt.labelshow}-inline` : null,
							].removeEmpty(),
							elems: opt.label,
					  }
					: null,
			],
		};

		var toggle = opt.segmenttoggle
			? {
					tag: opt.href ? "a" : "button",
					class: [
						"dropdown-toggle dropdown-toggle-split btn",
						opt.color ? (opt.outline ? `btn-outline-${opt.color}` : `btn-${opt.color}`) : null,
						opt.textcolor ? `text-${opt.textcolor}` : null,
						opt.weight ? `btn-${opt.weight}` : null,
						opt.class,
					],
					attr: {
						id: opt.id,
						"data-bs-toggle": "dropdown",
						"data-bs-reference": opt.reference,
						"aria-expanded": "false",
						"data-bs-offset": opt.offset,
						"data-bs-auto-close": opt.autoclose ? opt.autoclose : "false",
					},
					elems: {
						tag: "span",
						class: "visually-hidden",
						elems: "Toggle Dropdown",
					},
			  }
			: null;

		var menu = {
			tag: "div",
			class: [
				"dropdown-menu",
				opt.dark ? "dropdown-menu-dark" : null,
				ns.core.multipleClassSupport(opt.aligment, "dropdown-menu-$1"),
				// opt.aligment //multiple aligment support
				// 	? Array.isArray(opt.aligment)
				// 		? opt.aligment
				// 				.map(function (i) {
				// 					return `dropdown-menu-${i}`;
				// 				})
				// 				.join(" ")
				// 		: `dropdown-menu-${opt.aligment}`
				// 	: null,
			],
			attr: { "aria-labelledby": opt.id },
			elems: ns.ddoption(opt.option, opt.value),
		};

		if (opt.arrow === "start" && opt.segmenttoggle) {
			return {
				tag: opt.container ? (opt.container === "nav-item" ? "li" : "div") : null,
				class: [opt.segmenttoggle ? opt.container : null, opt.arrow ? `drop${opt.arrow}` : null],
				elems: [ns.btngroup([toggle, menu].removeEmpty()), main],
			};
		} else {
			return {
				tag: opt.container ? (opt.container === "nav-item" ? "li" : "div") : null,
				class: [opt.container, opt.arrow ? `drop${opt.arrow}` : null],
				elems: [main, toggle, menu].removeEmpty(),
			};
		}
	};
})(ns);
