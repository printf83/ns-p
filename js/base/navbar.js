//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.navbar = {
		container: function (opt) {
			if (Array.isArray(opt)) {
				return ns.navbar.container({
					elems: opt,
				});
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						class: null,
						containerfluid: true,
						containerclass: null,
						expand: "lg", //sm|md|lg|xl|xxl
						light: "light", //light|dark
						color: null, //danger|primary|dark|warning|...
						position: null, //fixed-top|fixed-bottom|sticky-top|null
						style: null,
						elems: [],
					},
					opt
				);

				return {
					tag: "nav",
					class: [
						"navbar",
						opt.expand ? `navbar-expand-${opt.expand}` : null,
						opt.light ? `navbar-${opt.light}` : null,
						opt.color ? `bg-${opt.color}` : null,
						opt.class ? opt.class : null,
						opt.position ? opt.position : null,
					],
					style: opt.style ? opt.style : null,
					elems: {
						tag: "div",
						class: [
							opt.containerfluid === true
								? "container-fluid"
								: opt.containerfluid === false
								? "container"
								: ns.core.multipleClassSupport(opt.containerfluid, "container-$1"),
							opt.containerclass ? opt.containerclass : null,
						],
						elems: opt.elems,
					},
				};
			}
		},
		brand: function (opt) {
			if (typeof opt === "string") {
				return ns.navbar.brand({
					label: opt,
				});
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						class: null,
						href: null,
						onclick: null,
						label: null,
						icon: null,
						img: null,
					},
					opt
				);

				if (opt.heading) {
					console.warn("ns.navbar.brand has heading");
				}

				var lbl = [
					opt.img
						? {
								tag: "img",
								attr: {
									src: opt.img,
									width: 30,
									height: 24,
									alt: "",
								},
						  }
						: null,
					opt.icon ? ns.icon(opt.icon) : null,
					opt.label && (opt.img || opt.icon)
						? {
								tag: "span",
								class: "ms-2",
								elems: opt.label,
						  }
						: opt.label,
				].removeEmpty();

				if (!opt.href) {
					return {
						tag: "span",
						class: ["navbar-brand", "mb-0", "h1", opt.class],
						attr: { id: opt.id ? opt.id : null, onclick: opt.onclick },
						elems: lbl,
					};
				} else {
					return {
						tag: "a",
						class: ["navbar-brand", opt.class],
						attr: { href: opt.href ? opt.href : "javascript:void(0)", id: opt.id ? opt.id : null, onclick: opt.onclick },
						elems: lbl,
					};
				}
			}
		},
		toggler: function (opt) {
			if (typeof opt === "string") {
				return ns.navbar.toggler({
					id: opt,
				});
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						class: null,
						icon: ns.icon("bars"),
						toggle: "collapse", //collapse|offcanvas
					},
					opt
				);

				return {
					tag: "button",
					class: ["navbar-toggler", opt.class],
					attr: {
						type: "button",
						"data-bs-toggle": opt.toggle ? opt.toggle : null,
						"data-bs-target": opt.id ? `#${opt.id}` : null,
						"aria-controls": opt.id ? opt.id : null,
						"aria-expanded": "false",
						"aria-label": "Toggle navigation",
					},
					elems: opt.icon,
				};
			}
		},
		formcontainer: function (opt) {
			if (Array.isArray(opt)) {
				return ns.navbar.formcontainer({
					elems: opt,
				});
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
					tag: "form",
					class: ["d-flex", opt.class],
					attr: { id: opt.id ? opt.id : null },
					elems: opt.elems,
				};
			}
		},
		collapsecontainer: function (opt) {
			if (Array.isArray(opt)) {
				return ns.navbar.collapsecontainer({
					elems: opt,
				});
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
					class: ["collapse", "navbar-collapse", opt.class],
					attr: {
						id: opt.id ? opt.id : null,
					},
					elems: opt.elems,
				};
			}
		},
		offcanvascontainer: function (opt) {
			if (Array.isArray(opt)) {
				return ns.navbar.offcanvascontainer({
					elems: opt,
				});
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						title: null,
						class: null,
						elems: null,
					},
					opt
				);

				return {
					tag: "div",
					class: ["offcanvas", "offcanvas-end", opt.class],
					attr: {
						id: opt.id ? opt.id : null,
						tabindex: "-1",
						"aria-labelledby": opt.id ? `${opt.id}-label` : null,
					},
					elems: [
						{
							tag: "div",
							class: "offcanvas-header",
							elems: [
								{
									tag: "h5",
									class: "offcanvas-title",
									attr: { id: opt.id ? `${opt.id}-label` : null },
									elems: opt.title,
								},
								{
									tag: "button",
									class: "btn-close text-reset",
									attr: { type: "button", "data-bs-dismiss": "offcanvas", "aria-label": "Close" },
								},
							],
						},
						{
							tag: "div",
							class: "offcanvas-body",
							elems: opt.elems,
						},
					],
				};
			}
		},
		itemcontainer: function (opt) {
			if (Array.isArray(opt)) {
				return ns.navbar.itemcontainer({
					elems: opt,
				});
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						class: null,
						scroll: null,
						mxauto: true,
						parenttype: null, //collapse|offcanvas|null
						elems: null,
					},
					opt
				);

				return {
					tag: "div",
					class: [
						"navbar-nav",
						opt.mxauto ? "me-auto" : null,
						opt.parenttype === "collapse" ? "mb-2 mb-lg-0" : null,
						opt.parenttype === "offcanvas" ? "justify-content-end flex-grow-1 pe-3" : null,
						opt.class,
						opt.scroll ? "navbar-nav-scroll" : null,
					],
					attr: { style: opt.scroll ? `--bs-scroll-height: ${opt.scroll};` : null },
					elems: opt.elems,
				};
			}
		},
		item: function (opt) {
			if (typeof opt === "string") {
				return ns.navbar.item({
					label: opt,
				});
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						class: null,
						option: null,
						href: "javascript:void(0)",
						onclick: null,
						icon: null,
						largeicon: false,
						label: null,
						labelshow: null,
						active: false,
						disabled: false,
					},
					opt
				);

				if (opt.option && opt.id === null) {
					opt.id = ns.core.UUID();
				}

				return {
					tag: "div",
					class: ["nav-item d-flex align-content-center flex-wrap", opt.option ? "dropdown" : null],
					attr: {
						id: opt.id && opt.option === null ? opt.id : null,
						onclick: opt.onclick ? opt.onclick : null,
					},
					elems: [
						{
							tag: "a",
							class: [
								"nav-link text-md-center",
								opt.active ? "active" : null,
								opt.disabled ? "disabled" : null,
								opt.option ? "dropdown-toggle" : null,
							],
							attr: {
								"aria-current": opt.active ? "page" : null,
								href: opt.href ? opt.href : null,
								id: opt.id ? opt.id : null,
								role: "button",
								"data-bs-toggle": opt.option ? "dropdown" : null,
								"aria-expanded": opt.option ? "false" : null,
							},
							elems: [
								{
									tag: opt.largeicon ? "span" : null,
									class: opt.largeicon ? ["d-md-block h4-md", opt.label ? "mb-0" : null].combine(" ") : null,
									elems: opt.icon ? ns.icon(opt.icon) : null,
								},
								{
									tag: "span",
									class: [
										opt.icon && !opt.largeicon ? "ms-2" : null,
										opt.icon && opt.largeicon ? "ms-2 ms-md-0" : null,
										opt.option ? "me-2" : null,
										opt.labelshow ? `d-none d-${opt.labelshow}-inline` : null,
									].removeEmpty(),
									elems: opt.label,
								},
							].removeEmpty(),
						},
						opt.option
							? {
									tag: "ul",
									class: "dropdown-menu w-100 w-md-auto",
									attr: { "aria-labelledby": opt.id ? opt.id : null },
									elems: ns.ddoption(opt.option),
							  }
							: null,
					].removeEmpty(),
				};
			}
		},
		text: function (text) {
			return {
				tag: "span",
				class: "navbar-text",
				elems: text,
			};
		},
	};
})(ns);
