"use strict";

var lipsumindex = -1;
var lipsumdb = [
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elit massa, elementum vel metus id, congue sollicitudin lectus. Praesent ultricies felis eget nisl volutpat gravida. In eleifend iaculis viverra. Proin ut gravida elit, id posuere velit. Nulla congue enim at odio eleifend accumsan. Curabitur felis quam, feugiat in tincidunt ac, pulvinar eu diam. Nullam non erat orci. Sed gravida, ante sed vestibulum accumsan, elit metus feugiat ex, in gravida dolor nunc fermentum magna.",
	"Nam tempor maximus ante vel malesuada. Vivamus nibh neque, cursus finibus risus vel, porttitor accumsan lacus. Nulla facilisi. Sed sit amet sagittis magna, id cursus est. Quisque convallis vel magna quis vestibulum. Curabitur placerat diam odio, in tincidunt felis viverra ac. Aenean quis ante diam. Sed sit amet lectus rutrum tortor feugiat auctor. Fusce euismod est nec posuere accumsan. Donec sodales cursus maximus. Nulla tincidunt quam quis lacus suscipit, ut lobortis erat fringilla. Praesent id diam nec metus mollis maximus. Nam vestibulum lectus quis velit dictum ornare. Phasellus vitae accumsan nisl, sed aliquet nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
	"Donec vehicula elit vel purus euismod, et aliquet nisl molestie. Phasellus at porttitor neque. Donec et orci mi. Nulla a laoreet tortor. Cras ac massa ipsum. Suspendisse mi diam, sodales nec felis sit amet, ullamcorper aliquet tellus. In vitae urna ipsum. Donec cursus rutrum magna. Quisque sed nisi a lacus accumsan mollis.",
	"Cras felis orci, feugiat ac volutpat non, porttitor at leo. Mauris sit amet eros tincidunt, cursus felis sit amet, molestie erat. Cras rutrum mi sed nunc tempor, id viverra metus aliquet. Sed aliquet scelerisque rutrum. Donec blandit ante et mauris scelerisque, congue venenatis tortor vehicula. Sed ornare ipsum sed cursus euismod. Aenean placerat nibh nisi, ac pretium nulla aliquet vitae. Mauris vel mauris urna. Morbi ultrices enim tellus, quis volutpat velit feugiat vitae. Vivamus hendrerit consequat rhoncus. In at efficitur lectus, vel volutpat massa. Donec consectetur scelerisque lacinia. Sed tristique risus ac mi efficitur consequat.",
	"Phasellus quis feugiat magna. Fusce placerat, metus eget tempor placerat, velit neque aliquam turpis, vel gravida ex leo sit amet diam. Aenean facilisis vulputate metus, ac dapibus felis vulputate non. Sed vehicula ante nec odio dapibus, id convallis libero auctor. Vivamus facilisis sed tellus a mattis. Donec bibendum imperdiet dui eget porttitor. Nam aliquam mi a nunc luctus rutrum.",
];

var lipsum = function (tag) {
	lipsumindex++;
	if (lipsumindex >= lipsumdb.length) {
		lipsumindex = 0;
	}
	if (tag) {
		return { tag: tag, elems: lipsumdb[lipsumindex] };
	} else {
		return lipsumdb[lipsumindex];
	}
};

var picsumimgurlindex = 300;
var picsumimgurl = function (width, height) {
	picsumimgurlindex++;
	return `https://picsum.photos/seed/${picsumimgurlindex}/${width ? width : 800}/${height ? height : 400}.webp`;
};

var fluidcontainer = function (elems) {
	return {
		tag: "div",
		class: "container-fluid p-0",
		elems: elems,
	};
};

var formcontainer = function (elems) {
	return {
		tag: "div",
		class: "container-fluid p-0",
		elems: {
			tag: "div",
			class: "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3",
			elems: elems,
		},
	};
};

var singleformcontainer = function (elems) {
	return {
		tag: "div",
		class: "container-fluid p-0",
		elems: {
			tag: "div",
			class: "row row-cols-1 g-3",
			elems: elems,
		},
	};
};

var stackcontainer = function (elems) {
	return {
		tag: "div",
		class: "container-fluid p-0",
		elems: {
			tag: "div",
			class: "row row-cols-auto g-2 align-items-center",
			elems: elems,
		},
	};
};

var itemcontainer = function (elems) {
	return {
		tag: "div",
		class: "col",
		elems: elems,
	};
};

var rowcontainer = function (elems) {
	return {
		tag: "div",
		class: "row g-2",
		elems: elems,
	};
};

var singleitemcontainer = function (elems) {
	return {
		tag: "div",
		class: "py-1",
		elems: elems,
	};
};

var e_paging = [
	//paging
	ns.example({
		title: "Paging",
		code: function () {
			return ns.pagination({
				limit: 10,
				skip: 20,
				total: 1260,
				max: 3,
				onchange: null,
			});
		},
	}),
];

var e_offcanvas = [
	//offcanvas
	ns.example({
		title: "Offcanvas",
		code: function () {
			return [
				ns.offcanvasbtn({ id: "exampleCanvas", class: "btn btn-primary", icon: "fire", label: "Show Canvas" }),
				ns.offcanvas({
					id: "exampleCanvas",
					close: true,
					backdrop: true,
					bgcolor: "light",
					textcolor: "primary",
					title: "Offcanvas",
					elems: {
						tag: "div",
						elems: [
							ns.menu.container({
								title: "Category 1",
								active: true,
								item: ns.menu.item([
									{ label: "Test", icon: "address-book", onclick: "window.location='ctl_test.html'", active: true },
									{ label: "Home", icon: "award", onclick: "window.location='index.html'" },
									{ label: "Example", icon: "baby", onclick: "window.location='example.html'" },
									{ label: "Change Theme", icon: "swatchbook", onclick: "ns.core.themeEditor()" },
								]),
							}),
							ns.menu.container({
								title: "Category 2",
								item: ns.menu.item([
									{ label: "Bath", icon: "bath" },
									{ label: "Scale", icon: "balance-scale" },
									{ label: "Birthday", icon: "birthday-cake" },
									{ label: "Book", icon: "book" },
								]),
							}),
							ns.menu.container({
								title: "Category 3",
								item: ns.menu.item([
									{ label: "Bus", icon: "bus-alt" },
									{ label: "Coffee", icon: "coffee" },
									{ label: "Download", icon: "cloud-download-alt" },
									{ label: "Setting", icon: "cogs" },
								]),
							}),
							{
								tag: "hr",
								class: "m-1",
							},
							ns.menu.container({
								title: "Animal",
								item: ns.menu.item([
									{ label: "Dragon", icon: "dragon" },
									{ label: "Crow", icon: "crow" },
									{ label: "Fish", icon: "fish" },
									{ label: "Dove", icon: "dove" },
									{ label: "Frog", icon: "frog" },
									{ label: "Cat", icon: "cat" },
									{ label: "Hippo", icon: "hippo" },
									{ label: "Spider", icon: "spider" },
								]),
							}),
						],
					},
				}),
			];
		},
	}),
];

var e_table = [
	//table
	ns.example({
		title: "Table",
		code: function () {
			return ns.table({ hover: true, rownumber: true }, [
				["First", "Last", "Handle"],
				["Mark", "Otto", "@mdo"],
				["Jacob", "Thornto", "@fat"],
				["Larry the Bird", "", "@twitter"],
			]);
		},
	}),

	//table
	ns.example({
		title: "Table",
		code: function () {
			return ns.table({ hover: true }, [
				["Option", "Type", "Description"],
				[
					"<code>property</code>",
					"<b>Required</b>",
					"Name of the property, this can be a string or an array of strings (e.g., horizontal paddings or margins).",
				],
				[
					"<code>values</code>",
					"<b>Required</b>",
					"List of values, or a map if you don’t want the class name to be the same as the value. If null is used as map key, it isn’t compiled.",
				],
				[
					"<code>class</code>",
					"Optional",
					"Variable for the class name if you don’t want it to be the same as the property. In case you don’t provide the class key and property key is an array of strings, the class name will be the first element of the property array.",
				],
			]);
		},
	}),
];

var e_listctl = [
	//list control toolbar
	ns.example({
		title: "List Control",
		code: function () {
			return ns.listctl({
				icon: "fire",
				title: "Page Title",
				menu: [
					{ icon: "plus", label: "Test", href: "ctl_test.html" },
					{ icon: "home", label: "Index", href: "index.html", active: true },
					{ icon: "fire", label: "Example", href: "example.html" },
					{ icon: "trash-alt", label: "Trash", href: "about.html" },
				],
				main: [
					{
						icon: "plus",
						color: "primary",
						label: "Add",
						labelshow: "md",
						onclick: function (sender) {
							ns.toast("i", "Call add function");
						},
					},
				],
				check: [
					{
						icon: "trash",
						color: "danger",
						onclick: function (sender) {
							ns.toast("i", "Call multiple delete function");
						},
					},
				],
				excel: function (sender) {
					//ns.list.excel(sender, {});
					ns.toast("i", "Call excel processpr from ns.list.excel");
				},
				query: function (sender) {
					//ns.list.query(sender, {});
					ns.toast("i", "Call query processpr from ns.list.query");
				},
			});
		},
	}),
];

var e_icon = [
	//ns.icon
	ns.example({
		title: "Example Icon",
		container: stackcontainer,
		item: itemcontainer,
		msg: [
			"This is an example to create {{icon}}. All icon from {{fontawesome}} are supported. The {{ns.icon}} will generate the {{i}} tag",
			ns.table([
				["Option", "Type", "Description"],
				["{{icon}}", "String (Required)", "Code of icon used by {{fontawesome}}"],
				["{{class}}", "String", "Addtional class you like to add to this icon"],
				["{{style}}", "fas|fab", "fas|fab"],
				["{{fixwidth}}", "true|false", "Will add class {{fa-fw}} if value is {{true}}"],
				["{{size}}", "sm|md|lg", "Will add class {{fa-fw}} if value is {{true}}"],
				["{{rotate}}", "sm|md|lg", "Will add class {{fa-fw}} if value is {{true}}"],
				["{{spin}}", "sm|md|lg", "Will add class {{fa-fw}} if value is {{true}}"],
				["{{color}}", "sm|md|lg", "Will add class {{fa-fw}} if value is {{true}}"],
				["{{stack}}", "sm|md|lg", "Will add class {{fa-fw}} if value is {{true}}"],
				["{{elems}}", "sm|md|lg", "Will add class {{fa-fw}} if value is {{true}}"],
			]),
		],
		code: function () {
			return [
				ns.icon("favicon"),
				ns.icon("!!"),
				ns.icon("!"),
				ns.icon("/"),
				ns.icon("i"),
				ns.icon("home"),
				ns.icon({ icon: "fire", color: "danger" }),
				ns.icon({ icon: "dove", color: "info", size: "lg", spin: true }),
				ns.icon({
					size: "lg",
					elems: [
						{ icon: "circle", color: "danger" },
						{ icon: "stop", color: "warning" },
					],
				}),
			];
		},
	}),
];

var e_img = [
	//$.img
	ns.example({
		title: "Example Image",
		msg: "This is an example to create image",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.img("./img/favicon-32x32.png"),
				ns.img({
					src: "./img/favicon-32x32.png",
					alt: "Alt Text",
					class: "d-inline-block align-text-top border-info border rounded p-2",
				}),
				ns.img({
					src: "./img/favicon-32x32.png",
					width: 16,
					height: 16,
				}),
			];
		},
	}),
];

var e_link = [
	//$.a
	ns.example({
		title: "Link",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.a("Default"),
				ns.a({ color: "primary", label: "Primary" }),
				ns.a({ color: "secondary", label: "Secondary" }),
				ns.a({ color: "success", label: "Success", icon: "/" }),
				ns.a({ color: "danger", label: "Danger", icon: { icon: "fire", spin: true, color: "warning" } }),
				ns.a({ color: "warning", label: "Warning" }),
				ns.a({ color: "info", label: "Info" }),
				ns.a({ color: "light", label: "Light" }),
				ns.a({ color: "dark", label: "Dark" }),
			];
		},
	}),
];

var e_menu = [
	//colapes
	ns.example({
		title: "Menu",
		code: function () {
			return ns.card.container({
				color: "light",
				textcolor: "dark",
				elems: ns.card.body([
					ns.menu.container({
						title: "Category 1",
						active: true,
						item: ns.menu.item([
							{ label: "Test", icon: "address-book", onclick: "window.location='ctl_test.html'" },
							{ label: "Home", icon: "award", onclick: "window.location='index.html'" },
							{ label: "Example", icon: "baby", onclick: "window.location='example.html'", active: true },
							{ label: "Change Theme", icon: "swatchbook", onclick: "ns.core.themeEditor()" },
						]),
					}),
					ns.menu.container({
						title: "Category 2",
						item: ns.menu.item([
							{ label: "Bath", icon: "bath" },
							{ label: "Scale", icon: "balance-scale" },
							{ label: "Birthday", icon: "birthday-cake" },
							{ label: "Book", icon: "book" },
						]),
					}),
					ns.menu.container({
						title: "Category 3",
						item: ns.menu.item([
							{ label: "Bus", icon: "bus-alt" },
							{ label: "Coffee", icon: "coffee" },
							{ label: "Download", icon: "cloud-download-alt" },
							{ label: "Setting", icon: "cogs" },
						]),
					}),
					{
						tag: "hr",
						class: "m-1",
					},
					ns.menu.container({
						title: "Animal",
						item: ns.menu.item([
							{ label: "Dragon", icon: "dragon" },
							{ label: "Crow", icon: "crow" },
							{ label: "Fish", icon: "fish" },
							{ label: "Dove", icon: "dove" },
							{ label: "Frog", icon: "frog" },
							{ label: "Cat", icon: "cat" },
							{ label: "Hippo", icon: "hippo" },
							{ label: "Spider", icon: "spider" },
						]),
					}),
				]),
			});
		},
	}),

	//colapes
	ns.example({
		title: "Collapes (dark)",
		code: function () {
			return ns.card.container({
				color: "dark",
				textcolor: "light",
				elems: ns.card.body([
					ns.menu.container({
						title: "Category 1",
						active: true,
						item: ns.menu.item([
							{ label: "Test", icon: "address-book", onclick: "window.location='ctl_test.html'" },
							{ label: "Home", icon: "award", onclick: "window.location='index.html'" },
							{ label: "Example", icon: "baby", onclick: "window.location='example.html'", active: true },
							{ label: "Change Theme", icon: "swatchbook", onclick: "ns.core.themeEditor()" },
						]),
					}),
					ns.menu.container({
						title: "Category 2",
						item: ns.menu.item([
							{ label: "Bath", icon: "bath" },
							{ label: "Scale", icon: "balance-scale" },
							{ label: "Birthday", icon: "birthday-cake" },
							{ label: "Book", icon: "book" },
						]),
					}),
					ns.menu.container({
						title: "Category 3",
						item: ns.menu.item([
							{ label: "Bus", icon: "bus-alt" },
							{ label: "Coffee", icon: "coffee" },
							{ label: "Download", icon: "cloud-download-alt" },
							{ label: "Setting", icon: "cogs" },
						]),
					}),
					{
						tag: "hr",
						class: "m-1",
					},
					ns.menu.container({
						title: "Animal",
						item: ns.menu.item([
							{ label: "Dragon", icon: "dragon" },
							{ label: "Crow", icon: "crow" },
							{ label: "Fish", icon: "fish" },
							{ label: "Dove", icon: "dove" },
							{ label: "Frog", icon: "frog" },
							{ label: "Cat", icon: "cat" },
							{ label: "Hippo", icon: "hippo" },
							{ label: "Spider", icon: "spider" },
						]),
					}),
				]),
			});
		},
	}),
];

var e_navbar = [
	//navbar
	ns.example({
		title: "Navbar",
		code: function () {
			var id = ns.core.UUID();
			return ns.navbar.container({
				expand: "lg",
				color: "light",
				light: "light",
				elems: [
					ns.navbar.toggler({
						id,
						toggle: "collapse",
					}),

					ns.navbar.brand({
						label: "Navbar",
						icon: {
							icon: "fire",
							color: "danger",
						},
					}),

					ns.navbar.collapsecontainer({
						id: id,
						elems: [
							ns.navbar.itemcontainer({
								parenttype: "collapse",
								elems: [
									ns.navbar.item({ label: "Theme", largeicon: true, icon: "home", active: true, onclick: "ns.core.themeEditor()" }),
									ns.navbar.item("Link"),
									ns.navbar.item({
										label: "Dropdown",
										option: [
											{ value: "", label: "Action" },
											{ value: "", label: "Another action" },
											{ value: "-", label: "" },
											{ value: "", label: "Something else here" },
										],
									}),
									ns.navbar.item({ label: "Disabled", disabled: true }),
								],
							}),
							ns.navbar.formcontainer([
								ns.input({ type: "search", placeholder: "Search", hiddenlabel: "Search", class: "me-2" }),
								ns.button({ label: "Search", color: "success", outline: true }),
							]),
						],
					}),
				],
			});
		},
	}),

	//navbar
	ns.example({
		title: "Navbar",
		code: function () {
			var id = ns.core.UUID();
			return ns.navbar.container({
				expand: "lg",
				color: "dark",
				light: "dark",
				elems: [
					ns.navbar.brand({
						label: "Navbar",
						icon: {
							icon: "fire",
							color: "danger",
						},
					}),

					ns.navbar.toggler({
						id,
						toggle: "collapse",
					}),

					ns.navbar.collapsecontainer({
						id: id,
						elems: [
							ns.navbar.itemcontainer({
								parenttype: "collapse",
								elems: [
									ns.navbar.item({ label: "Theme", largeicon: true, icon: "home", active: true, onclick: "ns.core.themeEditor()" }),
									ns.navbar.item("Link"),
									ns.navbar.item({
										label: "Dropdown",
										option: [
											{ value: "", label: "Action" },
											{ value: "", label: "Another action" },
											{ value: "-", label: "" },
											{ value: "", label: "Something else here" },
										],
									}),
									ns.navbar.item({ label: "Disabled", disabled: true }),
								],
							}),
							ns.navbar.formcontainer([
								ns.input({ type: "search", placeholder: "Search", hiddenlabel: "Search", class: "me-2" }),
								ns.button({ label: "Search", color: "success", outline: true }),
							]),
						],
					}),
				],
			});
		},
	}),
];

//sample tab [start]
var sampletab = [
	{ label: "First", elems: "This is first tab. " + lipsum() },
	{ label: "Second", elems: "This is second tab. " + lipsum() },
	{ label: "Third", elems: "This is third tab. " + lipsum() },
	{ label: "Disabled", disabled: true, elems: "This is last tab. " + lipsum() },
];

var sampledropdowntab = [
	{ label: "First", elems: "This is first tab. " + lipsum() },
	{
		label: "Second",
		elems: "This is second tab. " + lipsum(),
		option: [
			{ href: "javascript:void(0);", label: "Action" },
			{ href: "javascript:void(0);", label: "Another action" },
			{ value: "-", label: "" },
			{ href: "javascript:void(0);", label: "Something else here" },
		],
	},
	{ label: "Third", elems: "This is third tab. " + lipsum() },
	{ label: "Disabled", disabled: true, elems: "This is last tab. " + lipsum() },
];
//sample tab [end]

var e_tab = [
	ns.example({
		title: "Base nav",
		code: function () {
			return ns.nav({
				style: null,
				elems: [
					//sample tab
					{ label: "First", elems: "This is first tab. " + lipsum() },
					{ label: "Second", elems: "This is second tab. " + lipsum() },
					{ label: "Third", elems: "This is third tab. " + lipsum() },
					{ label: "Disabled", disabled: true, elems: "This is last tab. " + lipsum() },
				],
			});
		},
	}),

	ns.example({
		title: "Nav tab",
		code: function () {
			return ns.nav({
				style: "tab",
				elems: sampletab,
			});
		},
	}),

	ns.example({
		title: "Nav pill",
		code: function () {
			return ns.nav({
				style: "pill",
				elems: sampletab,
			});
		},
	}),

	ns.example({
		title: "Horizontal center alignment",
		code: function () {
			return ns.nav({
				style: "pill",
				align: "center",
				elems: sampletab,
			});
		},
	}),

	ns.example({
		title: "Horizontal right alignment",
		code: function () {
			return ns.nav({
				style: "pill",
				align: "right",
				elems: sampletab,
			});
		},
	}),

	ns.example({
		title: "Vertical left",
		code: function () {
			return ns.nav({
				style: "pill",
				align: "vertical",
				size: "col-sm-12 col-md-6 col-lg-4",
				elems: sampletab,
			});
		},
	}),

	ns.example({
		title: "Vertical right",
		code: function () {
			return ns.nav({
				style: "pill",
				align: "vertical-right",
				size: "col-sm-12 col-md-6 col-lg-4",
				elems: sampletab,
			});
		},
	}),

	ns.example({
		title: "Fill",
		code: function () {
			return ns.nav({
				style: "pill",
				align: "fill",
				elems: sampletab,
			});
		},
	}),

	ns.example({
		title: "Dropdown tab",
		code: function () {
			return ns.nav({
				style: "tab",
				elems: [
					//sampledropdowntab
					{ label: "First", elems: "This is first tab. " + lipsum() },
					{
						label: "Second",
						elems: "This is second tab. " + lipsum(),
						option: [
							{ href: "javascript:void(0);", label: "Action" },
							{ href: "javascript:void(0);", label: "Another action" },
							{ value: "-", label: "" },
							{ href: "javascript:void(0);", label: "Something else here" },
						],
					},
					{ label: "Third", elems: "This is third tab. " + lipsum() },
					{ label: "Disabled", disabled: true, elems: "This is last tab. " + lipsum() },
				],
			});
		},
	}),

	ns.example({
		title: "Dropdown pill",
		code: function () {
			return ns.nav({
				style: "pill",
				elems: sampledropdowntab,
			});
		},
	}),

	ns.example({
		title: "Nav tab in dialog",
		label: "Show nav tab in dialog",
		code: function () {
			return ns.dlg.box({
				title: "Modal title",
				hastab: true, //!important
				elems: ns.nav({
					style: "tab",
					border: false, //!important
					rounded: false, //!important
					elems: sampledropdowntab,
				}),
				button: "understandclose",
			});
		},
	}),

	ns.example({
		title: "Tab nav pill in dialog",
		label: "Show nav pill in dialog",
		code: function () {
			return ns.dlg.box({
				title: "Modal title",
				hastab: true, //!important
				elems: ns.nav({
					style: "pill",
					border: false, //!important
					rounded: false, //!important
					elems: sampledropdowntab,
				}),
				button: "understandclose",
			});
		},
	}),
];

//sample [start]
var dlgFn = function (reipient) {
	ns.dlg
		.box({
			title: "Modal title",
			elems: ns.cont.singlecolumnform([
				ns.input({ type: "text", name: "reipient", label: "Recipient:", value: reipient }),
				ns.input({ type: "textarea", name: "message", label: "Message:", value: "" }),
			]),
			button: "sendmessageclose",
		})
		.then((data) => {
			ns.toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`);
		})
		.catch((err) => {});
};

var dlgFirstModal = function () {
	ns.dlg.box({
		title: "Modal 1",
		elems: "Show a second modal and close this one with the button below.",
		button: [{ label: "Show second modal", onclick: "dlgSecondModal()" }],
	});
};

var dlgSecondModal = function () {
	ns.dlg.box({
		title: "Modal 2",
		elems: "Close this modal and show the first with the button below.",
		button: [{ label: "Show first modal", onclick: "dlgFirstModal()" }],
	});
};

var dlgFullscreenFn = function (fullscreen) {
	ns.dlg.box({
		fullscreen: fullscreen,
		title: "Modal title",
		elems: `Dialog with {{fullscreen : <b>${fullscreen}</b>}} option`,
		button: "okayonly",
	});
};

var dlgSizeFn = function (size) {
	ns.dlg.box({
		size: size,
		title: "Modal title",
		elems: `Dialog with {{size : <b>${size}</b>}} option`,
		button: "okayonly",
	});
};
//sample [end]

var e_dlg = [
	ns.example({
		title: "Message box",
		label: "Show simple msgbox",
		code: function () {
			ns.dlg.msgbox("i", "This is example msgbox").then(() => {
				ns.toast("i", "After user click <b>Okay</b> button");
			});
		},
	}),

	ns.example({
		title: "Input box",
		msg: "Input box with single input",
		label: "Show simple inputbox",
		code: function () {
			ns.dlg.inputbox("text", "Type anything").then((d) => {
				if (d?.value) {
					ns.toast("/", `You type <b>${d.value}</b> in inputbox`);
				} else {
					ns.toast("x", `You not type anything in inputbox`);
				}
			});
		},
	}),

	ns.example({
		title: "Inputbox with multiple input",
		msg: "First agrument can handle type {{[ns.input()]}}.",
		label: "Show multiple input inputbox",
		code: function () {
			ns.dlg
				.inputbox(
					ns.cont.singlecolumnform([
						ns.input({
							label: "Name",
							required: true,
							invalid: "Please provide name",
							name: "name",
							type: "text",
						}),
						ns.input({
							label: "Age",
							required: true,
							invalid: "Please provide age",
							name: "age",
							type: "number",
							min: 13,
							max: 100,
							after: "Years old",
						}),
						ns.listgroup.container({
							type: "div",
							elems: [
								ns.listgroup.item({ check: "radio", name: "sex", value: "s", elems: "Secret", active: true }),
								ns.listgroup.item({ check: "radio", name: "sex", value: "m", elems: "Male" }),
								ns.listgroup.item({ check: "radio", name: "sex", value: "f", elems: "Female" }),
							],
						}),
						ns.input({
							label: "Country",
							required: true,
							invalid: "Please choose country",
							name: "input",
							type: "select",
							option: [
								{ value: "", label: "" },
								{ value: "my", label: "Malaysia" },
								{ value: "in", label: "Indonesia" },
								{ value: "sg", label: "Singapore" },
							],
						}),
					])
				)
				.then((d) => {
					ns.toast({
						delay: 10000,
						bgcolor: "success",
						textcolor: "light",
						icon: "dove",
						title: "Result",
						message: `${JSON.stringify(d)}`,
					});
				});
		},
	}),

	ns.example({
		title: "Confirmbox",
		label: "Show simple confirmbox",
		code: function () {
			ns.dlg
				.confirmbox("?", "This is example msgbox with <b>yesno</b> button", "yesno")
				.then((d) => {
					ns.toast("/", `"Yes" button pressed`);
				})
				.catch((err) => {
					ns.toast("x", `"No" button pressed`);
				});
		},
	}),

	ns.example({
		title: "Example",
		label: "Show modal dialog",
		code: function () {
			ns.dlg
				.box({
					title: "Modal title",
					elems: "Modal body text goes here.",
					button: "savechangesclose",
					static: false, //by default static backdrop is on
				})
				.then((data) => {
					ns.toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`);
				})
				.catch((err) => {});
		},
	}),

	ns.example({
		title: "Static backdrop",
		label: "Show modal dialog",
		code: function () {
			ns.dlg
				.box({
					title: "Modal title",
					elems: "I will not close if you click outside me. Don't even try to press escape key.",
					button: "understandclose",
					static: true,
				})
				.then((data) => {
					ns.toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`);
				})
				.catch((err) => {});
		},
	}),

	ns.example({
		title: "Scrolling long content",
		label: "Show modal dialog",
		code: function () {
			ns.dlg
				.box({
					title: "Modal title",
					elems: [lipsum("p"), lipsum("p"), lipsum("p"), lipsum("p"), lipsum("p")],
					button: "understandclose",
					center: false,
					scrollable: true,
				})
				.then((data) => {
					ns.toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`);
				})
				.catch((err) => {});
		},
	}),

	ns.example({
		title: "Vertically centered",
		label: "Show modal dialog",
		code: function () {
			ns.dlg
				.box({
					title: "Modal title",
					elems: "This is a vertically centered modal.",
					button: "savechangesclose",
					center: true,
				})
				.then((data) => {
					ns.toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`);
				})
				.catch((err) => {});
		},
	}),

	ns.example({
		title: "Vertically centered scrollable dialog",
		label: "Show modal dialog",
		code: function () {
			ns.dlg
				.box({
					title: "Modal title",
					elems: [lipsum("p"), lipsum("p"), lipsum("p"), lipsum("p"), lipsum("p")],
					button: "savechangesclose",
					center: true,
					scrollable: true,
				})
				.then((data) => {
					ns.toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`);
				})
				.catch((err) => {});
		},
	}),

	ns.example({
		title: "Tooltips and popovers",
		label: "Show modal dialog",
		code: function () {
			ns.dlg
				.box({
					title: "Modal title",
					elems: [
						{
							tag: "h5",
							elems: "Popover in a modal",
						},
						{
							tag: "p",
							elems: [
								"This ",
								ns.button({
									color: "secondary",
									label: "button",
									tooltip: {
										type: "popover",
										placement: "right",
										title: "Popover title",
										msg: "Popover body content is set in this attribute.",
									},
								}),
								" triggers a popover on click.",
							],
						},
						{ tag: "hr" },
						{
							tag: "h5",
							elems: "Tooltips in a modal",
						},
						{
							tag: "p",
							elems: [
								ns.a({ href: "javascript:void(0);", label: "This link", tooltip: { type: "tooltip", msg: "Tooltip" } }),
								" and ",
								ns.a({ href: "javascript:void(0);", label: "that link", tooltip: { type: "tooltip", msg: "Tooltip" } }),
								" have tooltips on hover.",
							],
						},
					],
					button: "savechangesclose",
				})
				.then((data) => {
					ns.toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`);
				})
				.catch((err) => {});
		},
	}),

	ns.example({
		title: "Using the grid",
		label: "Show modal dialog",
		code: function () {
			ns.dlg
				.box({
					title: "Modal title",
					elems: `todo : ns.cont.grid`,
					button: "savechangesclose",
				})
				.then((data) => {
					ns.toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`);
				})
				.catch((err) => {});
		},
	}),

	ns.example({
		title: "Varying modal content",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			var dlgFn = function (reipient) {
				ns.dlg
					.box({
						title: "Modal title",
						elems: ns.cont.singlecolumnform([
							ns.input({ type: "text", name: "reipient", label: "Recipient:", value: reipient }),
							ns.input({ type: "textarea", name: "message", label: "Message:", value: "" }),
						]),
						button: "sendmessageclose",
					})
					.then((data) => {
						ns.toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`);
					})
					.catch((err) => {});
			};

			return [
				ns.button({ label: "Message for @mdo", color: "primary", onclick: "dlgFn('@mdo');" }),
				ns.button({ label: "Message for @fat", color: "primary", onclick: "dlgFn('@fat');" }),
				ns.button({ label: "Message for @getbootstrap", color: "primary", onclick: "dlgFn('@getbootstrap');" }),
			];
		},
	}),

	ns.example({
		title: "Toggle between modals",
		label: "Show first modal",
		code: function () {
			var dlgFirstModal = function () {
				ns.dlg.box({
					title: "Modal 1",
					elems: "Show a second modal and close this one with the button below.",
					button: [{ label: "Show second modal", onclick: "dlgSecondModal()" }],
				});
			};

			var dlgSecondModal = function () {
				ns.dlg.box({
					title: "Modal 2",
					elems: "Close this modal and show the first with the button below.",
					button: [{ label: "Show first modal", onclick: "dlgFirstModal()" }],
				});
			};

			dlgFirstModal();
		},
	}),

	ns.example({
		title: "Remove animation",
		label: "Show simple dialog",
		code: function () {
			ns.dlg.box({
				animate: false,
				title: "Modal title",
				elems: "Dialog without fade effect",
				button: "okayonly",
			});
		},
	}),

	ns.example({
		title: "Optional sizes",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			var dlgSizeFn = function (size) {
				ns.dlg.box({
					size: size,
					title: "Modal title",
					elems: `Dialog with {{size : <b>${size}</b>}} option`,
					button: "okayonly",
				});
			};

			return [
				ns.button({ label: "Extra large modal", color: "primary", onclick: "dlgSizeFn('xl')" }),
				ns.button({ label: "Large modal", color: "primary", onclick: "dlgSizeFn('lg')" }),
				ns.button({ label: "Small modal", color: "primary", onclick: "dlgSizeFn('sm')" }),
			];
		},
	}),

	ns.example({
		title: "Fullscreen Modal",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			var dlgFullscreenFn = function (fullscreen) {
				ns.dlg.box({
					fullscreen: fullscreen,
					title: "Modal title",
					elems: `Dialog with {{fullscreen : <b>${fullscreen}</b>}} option`,
					button: "okayonly",
				});
			};

			return [
				ns.button({ label: "Full screen", color: "primary", onclick: "dlgFullscreenFn(true)" }),
				ns.button({ label: "Full screen below sm", color: "primary", onclick: "dlgFullscreenFn('sm-down')" }),
				ns.button({ label: "Full screen below md", color: "primary", onclick: "dlgFullscreenFn('md-down')" }),
				ns.button({ label: "Full screen below lg", color: "primary", onclick: "dlgFullscreenFn('lg-down')" }),
				ns.button({ label: "Full screen below xl", color: "primary", onclick: "dlgFullscreenFn('xl-down')" }),
				ns.button({ label: "Full screen below xxl", color: "primary", onclick: "dlgFullscreenFn('xxl-down')" }),
			];
		},
	}),

	// ns.example({
	// 	title: "Dialogbox",
	// 	label: "Show dialog box",
	// 	close: true,
	// 	code: function () {
	// 		ns.dlg
	// 			.box({
	// 				title: "Title",
	// 				elems: [ns.input({ type: "text", name: "txt1", label: "Text #1" }), ns.input({ type: "number", name: "int2", label: "Number #2" })],
	// 				footer: ns.input({ type: "switch", label: "Hello", name: "hello" }),
	// 				button: "okayonly",
	// 			})
	// 			.then((data) => {
	// 				ns.dlg.msgbox("i", `Result from dialog is <code>${JSON.stringify(data)}</code>`);
	// 			})
	// 			.catch((err) => {});
	// 	},
	// }),
];

//listgroup sample [start]
var simplelistgroupitem = [
	ns.listgroup.item("An item"),
	ns.listgroup.item("A second item"),
	ns.listgroup.item("A third item"),
	ns.listgroup.item("A fourth item"),
	ns.listgroup.item("And a fifth one"),
];

var simplelistgroupitemcustomcontent = {
	class: "d-flex justify-content-between align-items-start",
	elems: [
		{
			tag: "div",
			class: "ms-2 me-auto",
			elems: [{ tag: "div", class: "fw-bold", elems: "Subheading" }, "Cras justo odio"],
		},
		ns.badge({
			pill: true,
			color: "primary",
			label: "14",
		}),
	],
};

var samplelistgroupitem3 = [ns.listgroup.item("An item"), ns.listgroup.item("A second item"), ns.listgroup.item("A third item")];

var fnClick = function (sender) {
	ns.toast("i", `${$(sender).text()} is clicked`);
};
//listgroup sample [end]

var e_listgroup = [
	ns.example({
		title: "Basic example",
		code: function () {
			return ns.listgroup.container([
				//simplelistgroupitem
				ns.listgroup.item("An item"),
				ns.listgroup.item("A second item"),
				ns.listgroup.item("A third item"),
				ns.listgroup.item("A fourth item"),
				ns.listgroup.item("And a fifth one"),
			]);
		},
	}),

	ns.example({
		title: "Active items",
		code: function () {
			return ns.listgroup.container([
				ns.listgroup.item({ elems: "An active item", active: true }),
				ns.listgroup.item("A second item"),
				ns.listgroup.item("A third item"),
				ns.listgroup.item("A fourth item"),
				ns.listgroup.item("And a fifth one"),
			]);
		},
	}),

	ns.example({
		title: "Disabled items",
		code: function () {
			return ns.listgroup.container([
				ns.listgroup.item({ elems: "A disabled item", disabled: true }),
				ns.listgroup.item("A second item"),
				ns.listgroup.item("A third item"),
				ns.listgroup.item("A fourth item"),
				ns.listgroup.item("And a fifth one"),
			]);
		},
	}),

	ns.example({
		title: "List group of links",
		code: function () {
			return ns.listgroup.container({
				type: "div",
				elems: [
					ns.listgroup.item({ href: "javascript:void(0)", elems: "A disabled item", disabled: true }),
					ns.listgroup.item({ href: "javascript:void(0)", elems: "A second item" }),
					ns.listgroup.item({ href: "javascript:void(0)", elems: "A third item" }),
					ns.listgroup.item({ href: "javascript:void(0)", elems: "A fourth item" }),
					ns.listgroup.item({ href: "javascript:void(0)", elems: "And a fifth one" }),
				],
			});
		},
	}),

	ns.example({
		title: "List group of buttons",
		code: function () {
			return ns.listgroup.container({
				type: "div",
				elems: [
					ns.listgroup.item({ onclick: "fnClick(this);", elems: "A disabled item", disabled: true }),
					ns.listgroup.item({ onclick: "fnClick(this);", elems: "A second item" }),
					ns.listgroup.item({ onclick: "fnClick(this);", elems: "A third item" }),
					ns.listgroup.item({ onclick: "fnClick(this);", elems: "A fourth item" }),
					ns.listgroup.item({ onclick: "fnClick(this);", elems: "And a fifth one" }),
				],
			});
		},
	}),

	ns.example({
		title: "Flush",
		code: function () {
			return ns.listgroup.container({
				flush: true,
				elems: simplelistgroupitem,
			});
		},
	}),

	ns.example({
		title: "Numbered",
		code: function () {
			return ns.listgroup.container({
				numbered: true,
				elems: simplelistgroupitem,
			});
		},
	}),

	ns.example({
		title: "Numbered custom content",
		code: function () {
			return ns.listgroup.container({
				numbered: true,
				elems: [
					ns.listgroup.item({
						//simplelistgroupitemcustomcontent
						class: "d-flex justify-content-between align-items-start",
						elems: [
							{
								tag: "div",
								class: "ms-2 me-auto",
								elems: [{ tag: "div", class: "fw-bold", elems: "Subheading" }, "Cras justo odio"],
							},
							ns.badge({
								pill: true,
								color: "primary",
								label: "14",
							}),
						],
					}),
					ns.listgroup.item(simplelistgroupitemcustomcontent),
					ns.listgroup.item(simplelistgroupitemcustomcontent),
				],
			});
		},
	}),

	ns.example({
		title: "Numbered custom content",
		container: singleformcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.listgroup.container({
					horizontal: true,
					elems: [
						//samplelistgroupitem3
						ns.listgroup.item("An item"),
						ns.listgroup.item("A second item"),
						ns.listgroup.item("A third item"),
					],
				}),

				ns.listgroup.container({
					horizontal: "sm",
					elems: samplelistgroupitem3,
				}),

				ns.listgroup.container({
					horizontal: "md",
					elems: samplelistgroupitem3,
				}),

				ns.listgroup.container({
					horizontal: "lg",
					elems: samplelistgroupitem3,
				}),

				ns.listgroup.container({
					horizontal: "xl",
					elems: samplelistgroupitem3,
				}),

				ns.listgroup.container({
					horizontal: "xxl",
					elems: samplelistgroupitem3,
				}),

				ns.listgroup.container({
					horizontal: ["md", "xxl"],
					elems: samplelistgroupitem3,
				}),
			];
		},
	}),

	ns.example({
		title: "Contextual classes",
		code: function () {
			return ns.listgroup.container([ns.listgroup.item({ color: "primary", elems: `A simple primary list group item` })]);
		},
	}),

	ns.example({
		title: "Contextual classes example",
		code: function () {
			return ns.listgroup.container(
				["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(function (i) {
					return ns.listgroup.item({ color: i, elems: `A simple ${i} list group item` });
				})
			);
		},
	}),

	ns.example({
		title: "Contextual classes with action example",
		code: function () {
			return ns.listgroup.container({
				type: "div",
				elems: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(function (i) {
					return ns.listgroup.item({ action: true, href: "javascript:void(0);", color: i, elems: `A simple ${i} list group item` });
				}),
			});
		},
	}),

	ns.example({
		title: "With badge",
		code: function () {
			let itemfn = function (text, badge) {
				return ns.listgroup.item({
					class: "d-flex justify-content-between align-items-start",
					elems: [
						text,
						ns.badge({
							pill: true,
							color: "primary",
							label: badge,
						}),
					],
				});
			};

			return ns.listgroup.container({
				elems: [itemfn("A list item", 14), itemfn("A second list item", 2), itemfn("A third list item", 1)],
			});
		},
	}),

	ns.example({
		title: "Custom content",
		code: function () {
			let itemfn = function (title, active, days) {
				return ns.listgroup.item({
					href: "javascript:void(0)",
					action: true,
					active: active,
					elems: [
						{
							tag: "div",
							class: "d-flex w-100 justify-content-between",
							elems: [
								{ tag: "h5", class: "mb-1", elems: title },
								{ tag: "small", class: !active ? "text-muted" : null, elems: `${days} days ago` },
							],
						},
						{ tag: "p", class: "mb-1", elems: "Some placeholder content in a paragraph." },
						{ tag: "small", class: !active ? "text-muted" : null, elems: `And some${!active ? " muted" : ""} small print.` },
					],
				});
			};

			return ns.listgroup.container({
				type: "div",
				elems: [
					itemfn("List group item heading 1", true, 1),
					itemfn("List group item heading 2", false, 3),
					itemfn("List group item heading 3", false, 7),
				],
			});
		},
	}),

	ns.example({
		title: "Checkboxes",
		code: function () {
			return ns.listgroup.container({
				type: "div",
				elems: [
					ns.listgroup.item({ check: "checkbox", value: "1", elems: "First checkbox" }),
					ns.listgroup.item({ check: "checkbox", value: "2", elems: "Second checkbox", active: true }),
					ns.listgroup.item({ check: "checkbox", value: "3", elems: "Third checkbox", disabled: true }),
					ns.listgroup.item({ check: "checkbox", value: "4", elems: "Fourth checkbox", color: "primary" }),
					ns.listgroup.item({ check: "checkbox", value: "5", elems: "Fifth checkbox" }),
				],
			});
		},
	}),

	ns.example({
		title: "Radio",
		code: function () {
			return ns.listgroup.container({
				type: "div",
				elems: [
					ns.listgroup.item({ check: "radio", name: "g10", value: "1", elems: "First radio" }),
					ns.listgroup.item({ check: "radio", name: "g10", value: "2", elems: "Second radio", active: true }),
					ns.listgroup.item({ check: "radio", name: "g10", value: "3", elems: "Third radio", disabled: true }),
					ns.listgroup.item({ check: "radio", name: "g10", value: "4", elems: "Fourth radio", color: "primary" }),
					ns.listgroup.item({ check: "radio", name: "g10", value: "5", elems: "Fifth radio" }),
				],
			});
		},
	}),

	ns.example({
		title: "Switch",
		code: function () {
			return ns.listgroup.container({
				type: "div",
				elems: [
					ns.listgroup.item({ check: "switch", value: "1", elems: "First switch" }),
					ns.listgroup.item({ check: "switch", value: "2", elems: "Second switch", active: true }),
					ns.listgroup.item({ check: "switch", value: "3", elems: "Third switch", disabled: true }),
					ns.listgroup.item({ check: "switch", value: "4", elems: "Fourth switch", color: "primary" }),
					ns.listgroup.item({ check: "switch", value: "5", elems: "Fifth switch" }),
				],
			});
		},
	}),
];

//sample option [start]
var simpledropdownitem = [
	{ href: "javascript:void(0);", label: "Action" },
	{ href: "javascript:void(0);", label: "Another action" },
	{ href: "javascript:void(0);", label: "Something else here" },
	{ value: "-" },
	{ href: "javascript:void(0);", label: "Separated link" },
];
//sample option [end]

var e_dropdown = [
	ns.example({
		title: "Single button",
		code: function () {
			return ns.dropdown({
				label: "Drowdown button",
				color: "secondary",
				option: [
					//simpledrowdownitem
					{ href: "javascript:void(0);", label: "Action" },
					{ href: "javascript:void(0);", label: "Another action" },
					{ href: "javascript:void(0);", label: "Something else here" },
					{ value: "-" },
					{ href: "javascript:void(0);", label: "Separated link" },
				],
			});
		},
	}),

	ns.example({
		title: "Dropdown link",
		code: function () {
			return ns.dropdown({
				label: "Drowdown link",
				color: "secondary",
				href: "javascript:void(0);",
				option: simpledropdownitem,
			});
		},
	}),

	ns.example({
		title: "Color",
		code: function () {
			return ns.dropdown({
				label: "Drowdown",
				color: "primary",
				option: simpledropdownitem,
			});
		},
	}),

	ns.example({
		title: "Color varian",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				{ color: "primary", textcolor: "light" },
				{ color: "secondary", textcolor: "light" },
				{ color: "success", textcolor: "light" },
				{ color: "danger", textcolor: "light" },
				{ color: "warning", textcolor: "dark" },
				{ color: "info", textcolor: "dark" },
				{ color: "light", textcolor: "dark" },
				{ color: "dark", textcolor: "light" },
			].map(function (i) {
				return ns.dropdown({
					label: i.color.capitalize(),
					color: i.color,
					textcolor: i.textcolor,
					option: simpledropdownitem,
				});
			});
		},
	}),

	ns.example({
		title: "Split button",
		code: function () {
			return ns.dropdown({
				label: "Drowdown",
				color: "primary",
				segmenttoggle: true,
				option: simpledropdownitem,
			});
		},
	}),

	ns.example({
		title: "Split button color variant",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				{ color: "primary", textcolor: "light" },
				{ color: "secondary", textcolor: "light" },
				{ color: "success", textcolor: "light" },
				{ color: "danger", textcolor: "light" },
				{ color: "warning", textcolor: "dark" },
				{ color: "info", textcolor: "dark" },
				{ color: "light", textcolor: "dark" },
				{ color: "dark", textcolor: "light" },
			].map(function (i) {
				return ns.dropdown({
					label: i.color.capitalize(),
					color: i.color,
					textcolor: i.textcolor,
					segmenttoggle: true,
					option: simpledropdownitem,
				});
			});
		},
	}),

	ns.example({
		title: "Large size",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.dropdown({
					label: "Large dropdown",
					color: "secondary",
					weight: "lg",
					option: simpledropdownitem,
				}),
				ns.dropdown({
					label: "Large split dropdown",
					color: "secondary",
					weight: "lg",
					segmenttoggle: true,
					option: simpledropdownitem,
				}),
			];
		},
	}),

	ns.example({
		title: "Small size",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.dropdown({
					label: "Small dropdown",
					color: "secondary",
					weight: "sm",
					option: simpledropdownitem,
				}),
				ns.dropdown({
					label: "Small split dropdown",
					color: "secondary",
					weight: "sm",
					segmenttoggle: true,
					option: simpledropdownitem,
				}),
			];
		},
	}),

	ns.example({
		title: "Dark dropdown",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return ns.dropdown({
				label: "Dark dropdown",
				color: "secondary",
				dark: true,
				option: simpledropdownitem,
			});
		},
	}),

	ns.example({
		title: "Dropdown in navbar",
		dark: true,
		code: function () {
			var id = ns.core.UUID();
			return ns.navbar.container({
				expand: "lg",
				color: "dark",
				light: "dark",
				href: "javascript:void(0);",
				elems: [
					ns.navbar.toggler({
						id,
						toggle: "collapse",
					}),

					ns.navbar.brand({
						label: "Navbar",
					}),

					ns.navbar.collapsecontainer({
						id,
						elems: [
							ns.navbar.itemcontainer({
								parenttype: "collapse",
								elems: [
									ns.dropdown({
										label: "Dropdown",
										navlink: true,
										dark: true,
										option: simpledropdownitem,
									}),
								],
							}),
						],
					}),
				],
			});
		},
	}),

	ns.example({
		title: "Dropup",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.dropdown({
					label: "Dropup",
					color: "secondary",
					arrow: "up",
					option: simpledropdownitem,
				}),
				ns.dropdown({
					label: "Split dropup",
					color: "secondary",
					arrow: "up",
					segmenttoggle: true,
					option: simpledropdownitem,
				}),
			];
		},
	}),

	ns.example({
		title: "Dropend",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.dropdown({
					label: "Dropend",
					color: "secondary",
					arrow: "end",
					option: simpledropdownitem,
				}),
				ns.dropdown({
					label: "Split dropend",
					color: "secondary",
					arrow: "end",
					segmenttoggle: true,
					option: simpledropdownitem,
				}),
			];
		},
	}),

	ns.example({
		title: "Dropstart",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.dropdown({
					label: "Dropstart",
					color: "secondary",
					arrow: "start",
					option: simpledropdownitem,
				}),
				ns.dropdown({
					label: "Split dropstart",
					color: "secondary",
					arrow: "start",
					segmenttoggle: true,
					option: simpledropdownitem,
				}),
			];
		},
	}),

	ns.example({
		title: "Menu item",
		code: function () {
			return ns.dropdown({
				label: "Drowdown",
				color: "secondary",
				option: [
					{ value: "1", label: "Action" },
					{ value: "2", label: "Another action" },
					{ value: "3", label: "Something else here" },
					{ value: "-" },
					{ value: "4", label: "Separated link" },
				],
			});
		},
	}),

	ns.example({
		title: "Non-interactive dropdown item",
		code: function () {
			return ns.dropdown({
				label: "Drowdown",
				color: "secondary",
				option: [
					{ interactive: false, label: "Dropdown item text" },
					{ href: "javascript:void(0);", label: "Another" },
					{ href: "javascript:void(0);", label: "Another action" },
					{ href: "javascript:void(0);", label: "Something else here" },
				],
			});
		},
	}),

	ns.example({
		title: "Active dropdown item",
		code: function () {
			return ns.dropdown({
				label: "Drowdown",
				color: "secondary",
				option: [
					{ href: "javascript:void(0);", label: "Regular link" },
					{ href: "javascript:void(0);", label: "Active link", active: true },
					{ href: "javascript:void(0);", label: "Another link" },
				],
			});
		},
	}),

	ns.example({
		title: "Disabled dropdown item",
		code: function () {
			return ns.dropdown({
				label: "Drowdown",
				color: "secondary",
				option: [
					{ href: "javascript:void(0);", label: "Regular link" },
					{ href: "javascript:void(0);", label: "Disabled link", disabled: true },
					{ href: "javascript:void(0);", label: "Another link" },
				],
			});
		},
	}),

	ns.example({
		title: "Menu Aligment",
		code: function () {
			return ns.dropdown({
				label: "Right-aligned menu example",
				color: "secondary",
				aligment: "end",
				option: simpledropdownitem,
			});
		},
	}),

	ns.example({
		title: "Responsive alignment",
		code: function () {
			return ns.dropdown({
				label: "Right-aligned, left-aligned lg",
				color: "secondary",
				aligment: ["end", "lg-start"],
				option: simpledropdownitem,
			});
		},
	}),

	ns.example({
		title: "Alignment options",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.dropdown({
					label: "Dropdown",
					color: "secondary",
					option: simpledropdownitem,
				}),
				ns.dropdown({
					label: "Right-aligned menu",
					color: "secondary",
					aligment: "end",
					option: simpledropdownitem,
				}),
				ns.dropdown({
					label: "Left-aligned, right-aligned lg",
					color: "secondary",
					aligment: ["start", "lg-end"],
					option: simpledropdownitem,
				}),
				ns.dropdown({
					label: "Right-aligned, left-aligned lg",
					color: "secondary",
					aligment: ["end", "lg-start"],
					option: simpledropdownitem,
				}),
				ns.dropdown({
					label: "Dropstart",
					color: "secondary",
					arrow: "start",
					option: simpledropdownitem,
				}),
				ns.dropdown({
					label: "Dropend",
					color: "secondary",
					arrow: "end",
					option: simpledropdownitem,
				}),
				ns.dropdown({
					label: "Dropup",
					color: "secondary",
					arrow: "up",
					option: simpledropdownitem,
				}),
			];
		},
	}),

	ns.example({
		title: "Headers",
		code: function () {
			return [
				ns.dropdown({
					label: "Dropdown",
					color: "secondary",
					option: [
						{ value: "-", label: "Dropdown header" },
						{ href: "javascript:void(0);", label: "Action" },
						{ href: "javascript:void(0);", label: "Another action" },
					],
				}),
			];
		},
	}),

	ns.example({
		title: "Divider",
		code: function () {
			return [
				ns.dropdown({
					label: "Dropdown",
					color: "secondary",
					option: [
						{ href: "javascript:void(0);", label: "Action" },
						{ href: "javascript:void(0);", label: "Another action" },
						{ href: "javascript:void(0);", label: "Something else here" },
						{ value: "-" },
						{ href: "javascript:void(0);", label: "Separated link" },
					],
				}),
			];
		},
	}),

	ns.example({
		title: "Text",
		code: function () {
			return [
				ns.dropdown({
					label: "Dropdown",
					color: "secondary",
					option: [
						{
							elems: {
								tag: "div",
								class: "text-muted p-4",
								style: { width: "200px" },
								elems: [
									{
										tag: "p",
										elems: "Some example text that's free-flowing within the dropdown menu.",
									},
									{
										tag: "p",
										class: "mb-0",
										elems: "And this is more example text.",
									},
								],
							},
						},
					],
				}),
			];
		},
	}),

	ns.example({
		title: "Form",
		code: function () {
			return [
				ns.dropdown({
					label: "Dropdown",
					color: "secondary",
					autoclose: "outside",
					option: [
						{
							elems: {
								tag: "div",
								class: "p-3 row row-cols-1 g-3",
								elems: [
									ns.input({ size: "col", type: "email", label: "Email address", placeholder: "email@example.com" }),
									ns.input({ size: "col", type: "password", label: "Password", placeholder: "Password" }),
									ns.input({ size: "col", type: "checkbox", label: "Remember me" }),
									{
										tag: "div",
										class: "col",
										elems: ns.button({ type: "submit", color: "primary", label: "Sign in" }),
									},
								],
							},
						},
						{ value: "-" },
						{ href: "javascript:void(0)", label: "New around here? Sign up" },
						{ href: "javascript:void(0)", label: "Forgot password?" },
					],
				}),
			];
		},
	}),

	ns.example({
		title: "Dropdown options",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.dropdown({
					label: "Offset",
					color: "secondary",
					offset: "20,30",
					option: simpledropdownitem,
				}),
				ns.dropdown({
					label: "Reference",
					color: "secondary",
					reference: "parent",
					segmenttoggle: true,
					option: simpledropdownitem,
				}),
			];
		},
	}),

	ns.example({
		title: "Auto close behavior",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.dropdown({
					label: "Default dropdown",
					color: "secondary",
					option: simpledropdownitem,
				}),
				ns.dropdown({
					label: "Clickable outside",
					color: "secondary",
					autoclose: "outside",
					option: simpledropdownitem,
				}),
				ns.dropdown({
					label: "Clickable inside",
					color: "secondary",
					autoclose: "inside",
					option: simpledropdownitem,
				}),
				ns.dropdown({
					label: "Manual close",
					color: "secondary",
					autoclose: false,
					option: simpledropdownitem,
				}),
			];
		},
	}),
];

var e_collapse = [
	ns.example({
		title: "Example",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			var id = ns.core.UUID();
			return [
				ns.collapse.toggle({
					label: "Toggle button",
					color: "primary",
					target: `#${id}`,
				}),
				ns.collapse.toggle({
					label: "Toggle with icon",
					color: "warning",
					icon: { icon: "fire", color: "danger" },
					target: `#${id}`,
				}),
				ns.collapse.container({
					id: id,
					elems: ns.card.container([
						ns.card.body(
							"Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger."
						),
					]),
				}),
			];
		},
	}),

	ns.example({
		title: "Multiple targets",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			var id1 = ns.core.UUID();
			var id2 = ns.core.UUID();
			var shareid = ns.core.UUID();

			return [
				ns.collapse.toggle({
					label: "Toggle first element",
					color: "primary",
					target: `#${id1}`,
				}),
				ns.collapse.toggle({
					label: "Toggle second element",
					color: "primary",
					target: `#${id2}`,
				}),
				ns.collapse.toggle({
					label: "Toggle both element",
					color: "primary",
					target: `.${shareid}`,
				}),
				ns.collapse.container({
					id: id1,
					class: shareid,
					elems: ns.card.container([
						ns.card.body(
							"Some placeholder content for the first collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger."
						),
					]),
				}),
				ns.collapse.container({
					id: id2,
					class: shareid,
					elems: ns.card.container([
						ns.card.body(
							"Some placeholder content for the second collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger."
						),
					]),
				}),
			];
		},
	}),
];

var e_close = [
	ns.example({
		title: "Example",
		code: function () {
			return ns.close();
		},
	}),

	ns.example({
		title: "Disabled state",
		code: function () {
			return ns.close({ disabled: true });
		},
	}),

	ns.example({
		title: "White variant",
		dark: true,
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [ns.close({ white: true }), ns.close({ white: true, disabled: true })];
		},
	}),
];

var e_carosel = [
	ns.example({
		title: "Slide only",
		code: function () {
			return ns.carousel({
				item: [picsumimgurl(), picsumimgurl(), picsumimgurl(), picsumimgurl(), picsumimgurl(), picsumimgurl()],
			});
		},
	}),

	ns.example({
		title: "With control",
		code: function () {
			return ns.carousel({
				control: true,
				item: [picsumimgurl(), picsumimgurl(), picsumimgurl(), picsumimgurl(), picsumimgurl(), picsumimgurl()],
			});
		},
	}),

	ns.example({
		title: "With indicator",
		code: function () {
			return ns.carousel({
				control: true,
				indicators: true,
				item: [picsumimgurl(), picsumimgurl(), picsumimgurl(), picsumimgurl(), picsumimgurl(), picsumimgurl()],
			});
		},
	}),

	ns.example({
		title: "With caption",
		code: function () {
			return ns.carousel({
				control: true,
				indicators: true,
				item: [
					{ caption: "Title #1", text: "This is text for image no #1", src: picsumimgurl() },
					{ caption: "Title #2", text: "This is text for image no #2", src: picsumimgurl() },
					{ caption: "Title #3", text: "This is text for image no #3", src: picsumimgurl() },
					{ caption: "Title #4", text: "This is text for image no #4", src: picsumimgurl() },
					{ caption: "Title #5", text: "This is text for image no #5", src: picsumimgurl() },
					{ caption: "Title #6", text: "This is text for image no #6", src: picsumimgurl() },
				],
			});
		},
	}),

	ns.example({
		title: "Crossfade",
		code: function () {
			return ns.carousel({
				control: true,
				fade: true,
				item: [picsumimgurl(), picsumimgurl(), picsumimgurl(), picsumimgurl(), picsumimgurl(), picsumimgurl()],
			});
		},
	}),

	ns.example({
		title: "Individual interval",
		code: function () {
			return ns.carousel({
				control: true,
				indicators: true,
				item: [
					{ interval: 10000, src: picsumimgurl() },
					{ interval: 2000, src: picsumimgurl() },
					{ interval: 5000, src: picsumimgurl() },
					{ interval: 1000, src: picsumimgurl() },
					{ interval: 3000, src: picsumimgurl() },
					{ interval: 7500, src: picsumimgurl() },
				],
			});
		},
	}),

	ns.example({
		title: "Disable touch swiping",
		code: function () {
			return ns.carousel({
				control: true,
				touch: false,
				item: [picsumimgurl(), picsumimgurl(), picsumimgurl(), picsumimgurl(), picsumimgurl(), picsumimgurl()],
			});
		},
	}),

	ns.example({
		title: "Dark variant",
		code: function () {
			return ns.carousel({
				control: true,
				indicators: true,
				dark: true,
				item: [
					{ caption: "Title #1", text: "This is text for image no #1", src: picsumimgurl() },
					{ caption: "Title #2", text: "This is text for image no #2", src: picsumimgurl() },
					{ caption: "Title #3", text: "This is text for image no #3", src: picsumimgurl() },
					{ caption: "Title #4", text: "This is text for image no #4", src: picsumimgurl() },
					{ caption: "Title #5", text: "This is text for image no #5", src: picsumimgurl() },
					{ caption: "Title #6", text: "This is text for image no #6", src: picsumimgurl() },
				],
			});
		},
	}),
];

//sample card [start]
var samplecard = [
	ns.card.container({
		elems: [
			ns.card.img({
				placement: "top",
				src: picsumimgurl(),
			}),
			ns.card.body([
				ns.card.title("Card Title"),
				ns.card.text(
					"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
				),
			]),
		],
	}),
	ns.card.container({
		elems: [
			ns.card.img({
				placement: "top",
				src: picsumimgurl(),
			}),
			ns.card.body([ns.card.title("Card Title"), ns.card.text("This card has supporting text below as a natural lead-in to additional content.")]),
		],
	}),
	ns.card.container({
		elems: [
			ns.card.img({
				placement: "top",
				src: picsumimgurl(),
			}),
			ns.card.body([ns.card.title("Card Title"), ns.card.text("This card has supporting text below as a natural lead-in to additional content.")]),
		],
	}),
	ns.card.container({
		elems: [
			ns.card.img({
				placement: "top",
				src: picsumimgurl(),
			}),
			ns.card.body([
				ns.card.title("Card Title"),
				ns.card.text(
					"This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action."
				),
			]),
		],
	}),
];

var samplecardwithfooter = [
	ns.card.container({
		elems: [
			ns.card.img({
				placement: "top",
				src: picsumimgurl(),
			}),
			ns.card.body([
				ns.card.title("Card Title"),
				ns.card.text(
					"This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action."
				),
			]),
			ns.card.footer("Last updated 3 mins ago"),
		],
	}),
	ns.card.container({
		elems: [
			ns.card.img({
				placement: "top",
				src: picsumimgurl(),
			}),
			ns.card.body([ns.card.title("Card Title"), ns.card.text("This card has supporting text below as a natural lead-in to additional content.")]),
			ns.card.footer("Last updated 3 mins ago"),
		],
	}),
	ns.card.container({
		elems: [
			ns.card.img({
				placement: "top",
				src: picsumimgurl(),
			}),
			ns.card.body([
				ns.card.title("Card Title"),
				ns.card.text(
					"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
				),
			]),
			ns.card.footer("Last updated 3 mins ago"),
		],
	}),
];

var samplecardh100 = [
	ns.card.container({
		class: "h-100",
		elems: [
			ns.card.img({
				placement: "top",
				src: picsumimgurl(),
			}),
			ns.card.body([
				ns.card.title("Card Title"),
				ns.card.text(
					"This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action."
				),
			]),
		],
	}),
	ns.card.container({
		class: "h-100",
		elems: [
			ns.card.img({
				placement: "top",
				src: picsumimgurl(),
			}),
			ns.card.body([ns.card.title("Card Title"), ns.card.text("This card has supporting text below as a natural lead-in to additional content.")]),
		],
	}),
	ns.card.container({
		class: "h-100",
		elems: [
			ns.card.img({
				placement: "top",
				src: picsumimgurl(),
			}),
			ns.card.body([ns.card.title("Card Title")]),
			ns.card.text("This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."),
		],
	}),
];

var samplecardwithfooterh100 = [
	ns.card.container({
		class: "h-100",
		elems: [
			ns.card.img({
				placement: "top",
				src: picsumimgurl(),
			}),
			ns.card.body([
				ns.card.title("Card Title"),
				ns.card.text(
					"This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action."
				),
			]),
			ns.card.footer("Last updated 3 mins ago"),
		],
	}),
	ns.card.container({
		class: "h-100",
		elems: [
			ns.card.img({
				placement: "top",
				src: picsumimgurl(),
			}),
			ns.card.body([ns.card.title("Card Title"), ns.card.text("This card has supporting text below as a natural lead-in to additional content.")]),
			ns.card.footer("Last updated 3 mins ago"),
		],
	}),
	ns.card.container({
		class: "h-100",
		elems: [
			ns.card.img({
				placement: "top",
				src: picsumimgurl(),
			}),
			ns.card.body([
				ns.card.title("Card Title"),
				ns.card.text(
					"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
				),
			]),
			ns.card.footer("Last updated 3 mins ago"),
		],
	}),
];
//sample card [end]

var e_card = [
	ns.example({
		title: "Example",
		code: function () {
			return ns.card.container({
				style: { width: "18rem" },
				elems: [
					ns.card.img({
						placement: "top",
						src: picsumimgurl(),
					}),
					ns.card.body([
						ns.card.title("Card Title"),
						ns.card.text("Some quick example text to build on the card title and make up the bulk of the card's content."),
						ns.button({ label: "Go somewhere", color: "primary" }),
					]),
				],
			});
		},
	}),

	ns.example({
		title: "Body",
		msg: "The building block of a card is the {{ns.card.body}}. Use it whenever you need a padded section within a card.",
		code: function () {
			return ns.card.container([ns.card.body("This is some text within a card body.")]);
		},
	}),

	ns.example({
		title: "Titles, text, and links",
		msg: [
			"Card titles are used by adding {{ns.card.title}}. In the same way, links are added and placed next to each other by adding {{ns.card.link}}.",
			"Subtitles are used by adding a {{ns.card.subtitle}}. If the {{ns.card.title}} and the {{ns.card.subtitle}} items are placed in a {{ns.card.body}} item, the card title and subtitle are aligned nicely.",
		],
		code: function () {
			return ns.card.container({
				style: { width: "18rem" },
				elems: [
					ns.card.body([
						ns.card.title("Card title"),
						ns.card.subtitle("Card subtitle"),
						ns.card.text("Some quick example text to build on the card title and make up the bulk of the card's content."),
						//ns.a example
						ns.a({
							class: "card-link",
							elems: "Link 1",
						}),
						//ns.card.link example
						ns.card.link({
							href: "javascript:void(0)",
							elems: "Link 2",
						}),
					]),
				],
			});
		},
	}),

	ns.example({
		title: "Images",
		msg: '{{placement: "top"}} places an {{ns.card.img}} to the top of the card. With {{ns.card.text}}, text can be added to the card. Text within {{ns.card.text}} can also be styled with the standard HTML tags.',
		code: function () {
			return ns.card.container({
				style: { width: "18rem" },
				elems: [
					ns.card.img({
						placement: "top",
						src: picsumimgurl(),
					}),
					ns.card.body([ns.card.text("Some quick example text to build on the card title and make up the bulk of the card's content.")]),
				],
			});
		},
	}),

	ns.example({
		title: "List groups",
		msg: "Create lists of content in a card with a flush list group.",
		code: function () {
			return ns.card.container({
				style: { width: "18rem" },
				elems: ns.listgroup.container({
					flush: true,
					elems: [ns.listgroup.item("An item"), ns.listgroup.item("A second item"), ns.listgroup.item("A third item")],
				}),
			});
		},
	}),

	ns.example({
		title: "List groups with card header",
		code: function () {
			return ns.card.container({
				style: { width: "18rem" },
				elems: [
					ns.card.header("Feature"),
					ns.listgroup.container({
						flush: true,
						elems: [ns.listgroup.item("An item"), ns.listgroup.item("A second item"), ns.listgroup.item("A third item")],
					}),
				],
			});
		},
	}),

	ns.example({
		title: "List groups with card footer",
		code: function () {
			return ns.card.container({
				style: { width: "18rem" },
				elems: [
					ns.listgroup.container({
						flush: true,
						elems: [ns.listgroup.item("An item"), ns.listgroup.item("A second item"), ns.listgroup.item("A third item")],
					}),
					ns.card.footer({
						muted: false,
						elems: "Card footer",
					}),
				],
			});
		},
	}),

	ns.example({
		title: "Kitchen Sink",
		msg: "Mix and match multiple content types to create the card you need, or throw everything in there. Shown below are image styles, blocks, text styles, and a list group—all wrapped in a fixed-width card.",
		code: function () {
			return ns.card.container({
				style: { width: "18rem" },
				elems: [
					ns.card.img({
						placement: "top",
						src: picsumimgurl(),
					}),
					ns.card.body([
						ns.card.title("Card Title"),
						ns.card.text("Some quick example text to build on the card title and make up the bulk of the card's content."),
					]),
					ns.listgroup.container({
						flush: true,
						elems: [ns.listgroup.item("An item"), ns.listgroup.item("A second item"), ns.listgroup.item("A third item")],
					}),
					ns.card.body([
						//ns.a example
						ns.a({
							class: "card-link",
							elems: "Link 1",
						}),
						//ns.card.link example
						ns.card.link({
							href: "javascript:void(0)",
							elems: "Link 2",
						}),
					]),
				],
			});
		},
	}),

	ns.example({
		title: "Header and footer",
		msg: "Add an optional header and/or footer within a card.",
		code: function () {
			return ns.card.container({
				elems: [
					ns.card.header("Feature"),
					ns.card.body([
						ns.card.title("Special title treatment"),
						ns.card.text("With supporting text below as a natural lead-in to additional content."),
						ns.button({ label: "Go somewhere", color: "primary" }),
					]),
				],
			});
		},
	}),

	ns.example({
		title: "Header with {{h*}} class",
		msg: 'Card headers can be styled by adding {{class: "h*"}} elements into {{ns.card.header}}.',
		code: function () {
			return ns.card.container({
				elems: [
					ns.card.header({
						class: "h5",
						elems: "Feature",
					}),
					ns.card.body([
						ns.card.title("Special title treatment"),
						ns.card.text("With supporting text below as a natural lead-in to additional content."),
						ns.button({ label: "Go somewhere", color: "primary" }),
					]),
				],
			});
		},
	}),

	ns.example({
		title: "Quote",
		code: function () {
			return ns.card.container({
				elems: [
					ns.card.header("Quote"),
					ns.card.body([
						{
							tag: "blockquote",
							class: "mb-0",
							elems: [
								{
									tag: "p",
									elems: "A well-known quote, contained in a blockquote element.",
								},
								{
									tag: "footer",
									class: "blockquote-footer",
									elems: [
										"Someone famous in",
										{
											tag: "cite",
											attr: { title: "Source Title" },
											elems: "Source Title",
										},
									],
								},
							],
						},
					]),
				],
			});
		},
	}),

	ns.example({
		title: "Align center card text",
		code: function () {
			return ns.card.container({
				align: "center",
				elems: [
					ns.card.header("Feature"),
					ns.card.body([
						ns.card.title("Special title treatment"),
						ns.card.text("With supporting text below as a natural lead-in to additional content."),
						ns.button({ label: "Go somewhere", color: "primary" }),
					]),
					ns.card.footer("2 days ago"),
				],
			});
		},
	}),

	ns.example({
		title: "Sizing",
		msg: "Cards assume no specific width to start, so they’ll be 100% wide unless otherwise stated. You can change this as needed with custom CSS, grid classes, grid Sass mixins, or utilities.",
	}),

	ns.example({
		title: "Using grid markup",
		msg: "Using the grid, wrap cards in columns and rows as needed.",
		code: function () {
			return {
				tag: "div",
				class: "row",
				elems: [
					{
						tag: "div",
						class: "col-sm-6",
						elems: ns.card.container({
							elems: [
								ns.card.body([
									ns.card.title("Special title treatment"),
									ns.card.text("With supporting text below as a natural lead-in to additional content."),
									ns.button({ label: "Go somewhere", color: "primary" }),
								]),
							],
						}),
					},
					{
						tag: "div",
						class: "col-sm-6",
						elems: ns.card.container({
							elems: [
								ns.card.body([
									ns.card.title("Special title treatment"),
									ns.card.text("With supporting text below as a natural lead-in to additional content."),
									ns.button({ label: "Go somewhere", color: "primary" }),
								]),
							],
						}),
					},
				],
			};
		},
	}),

	ns.example({
		title: "Using utilities",
		msg: "Use our handful of available sizing utilities to quickly set a card’s width.",
		code: function () {
			return [
				ns.card.container({
					class: "w-75 mb-3",
					elems: [
						ns.card.body([
							ns.card.title("Special title treatment"),
							ns.card.text("With supporting text below as a natural lead-in to additional content."),
							ns.button({ label: "Button", color: "primary" }),
						]),
					],
				}),
				ns.card.container({
					class: "w-50",
					elems: [
						ns.card.body([
							ns.card.title("Special title treatment"),
							ns.card.text("With supporting text below as a natural lead-in to additional content."),
							ns.button({ label: "Button", color: "primary" }),
						]),
					],
				}),
			];
		},
	}),

	ns.example({
		title: "Using custom CSS",
		msg: "Use custom CSS in your stylesheets or as inline styles to set a width.",
		code: function () {
			return [
				ns.card.container({
					style: { width: "18rem" },
					elems: [
						ns.card.body([
							ns.card.title("Special title treatment"),
							ns.card.text("With supporting text below as a natural lead-in to additional content."),
							ns.button({ label: "Go somewhere", color: "primary" }),
						]),
					],
				}),
			];
		},
	}),

	ns.example({
		title: "Text alignment",
		msg: 'You can quickly change the text alignment of any card—in its entirety or specific parts—with {{align:"null|center|end"}}.',
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.card.container({
					style: { width: "18rem" },
					elems: [
						ns.card.body([
							ns.card.title("Special title treatment"),
							ns.card.text("With supporting text below as a natural lead-in to additional content."),
							ns.button({ label: "Go somewhere", color: "primary" }),
						]),
					],
				}),
				ns.card.container({
					align: "center",
					style: { width: "18rem" },
					elems: [
						ns.card.body([
							ns.card.title("Special title treatment"),
							ns.card.text("With supporting text below as a natural lead-in to additional content."),
							ns.button({ label: "Go somewhere", color: "primary" }),
						]),
					],
				}),
				ns.card.container({
					align: "end",
					style: { width: "18rem" },
					elems: [
						ns.card.body([
							ns.card.title("Special title treatment"),
							ns.card.text("With supporting text below as a natural lead-in to additional content."),
							ns.button({ label: "Go somewhere", color: "primary" }),
						]),
					],
				}),
			];
		},
	}),

	ns.example({
		title: "Tab in card",
		msg: "{{ns.nav}} is working navbar in card",
		code: function () {
			return ns.nav({
				style: "tab",
				elems: [
					{ label: "First", active: true, elems: ["<b>This is the first item's tab body.</b> ", lipsum()].join("") },
					{ label: "Second", elems: ["<b>This is the second item's tab body.</b> ", lipsum()].join("") },
					{ label: "Third", elems: ["<b>This is the third item's tab body.</b> ", lipsum()].join("") },
				],
			});
		},
	}),

	ns.example({
		title: "Pill style tab",
		code: function () {
			return ns.nav({
				style: "pill",
				elems: [
					{ label: "First", active: true, elems: ["<b>This is the first item's tab body.</b> ", lipsum()].join("") },
					{ label: "Second", elems: ["<b>This is the second item's tab body.</b> ", lipsum()].join("") },
					{ label: "Third", elems: ["<b>This is the third item's tab body.</b> ", lipsum()].join("") },
				],
			});
		},
	}),

	ns.example({
		title: "Images",
		container: formcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.card.container({
					elems: [
						ns.card.img({
							placement: "top",
							src: picsumimgurl(),
						}),
						ns.card.body([
							ns.card.title("Card Title"),
							ns.card.text(
								"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
							),
							ns.card.textsmall("Last updated 3 mins ago"),
						]),
					],
				}),
				ns.card.container({
					elems: [
						ns.card.body([
							ns.card.title("Card Title"),
							ns.card.text(
								"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
							),
							ns.card.textsmall("Last updated 3 mins ago"),
						]),
						ns.card.img({
							placement: "bottom",
							src: picsumimgurl(),
						}),
					],
				}),
			];
		},
	}),

	ns.example({
		title: "Image overlays",
		code: function () {
			return ns.card.container({
				textcolor: "light",
				elems: [
					ns.card.img({
						src: picsumimgurl(),
					}),
					ns.card.imgoverlay([
						ns.card.title("Card Title"),
						ns.card.text(
							"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
						),
						ns.card.text("Last updated 3 mins ago"),
					]),
				],
			});
		},
	}),

	ns.example({
		title: "Horizontal",
		code: function () {
			return ns.card.container({
				elems: [
					ns.card.horizontal({
						size: "col-4",
						left: [
							ns.card.img({
								placement: "top",
								src: picsumimgurl(400, 400),
							}),
						],
						right: [
							ns.card.body([
								ns.card.title("Card Title"),
								ns.card.text(
									"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
								),
								ns.card.textsmall("Last updated 3 mins ago"),
							]),
						],
					}),
				],
			});
		},
	}),

	ns.example({
		title: "Card styles",
		msg: "Cards include various options for customizing their backgrounds, borders, and color.",
	}),

	ns.example({
		title: "Background and color",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return ns.card.container({
				color: "primary",
				textcolor: "light",
				style: { width: "18rem" },
				elems: [
					ns.card.header("Header"),
					ns.card.body([
						ns.card.title(`Primary card title`),
						ns.card.text("Some quick example text to build on the card title and make up the bulk of the card's content."),
					]),
				],
			});
		},
	}),

	ns.example({
		title: "Example background and color",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				{ color: "primary", textcolor: "light" },
				{ color: "secondary", textcolor: "light" },
				{ color: "success", textcolor: "light" },
				{ color: "danger", textcolor: "light" },
				{ color: "warning", textcolor: "dark" },
				{ color: "info", textcolor: "dark" },
				{ color: "light", textcolor: "dark" },
				{ color: "dark", textcolor: "light" },
			].map(function (i) {
				return ns.card.container({
					color: i.color,
					textcolor: i.textcolor,
					style: { width: "18rem" },
					elems: [
						ns.card.header("Header"),
						ns.card.body([
							ns.card.title(`${i.color.capitalize()} card title`),
							ns.card.text("Some quick example text to build on the card title and make up the bulk of the card's content."),
						]),
					],
				});
			});
		},
	}),

	ns.example({
		title: "Border color",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return ns.card.container({
				bordercolor: "primary",
				style: { width: "18rem" },
				elems: [
					ns.card.header("Header"),
					ns.card.body({
						textcolor: "primary",
						elems: [
							ns.card.title(`Primary card title`),
							ns.card.text("Some quick example text to build on the card title and make up the bulk of the card's content."),
						],
					}),
				],
			});
		},
	}),

	ns.example({
		title: "Example border color",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				{ color: "primary", textcolor: "primary" },
				{ color: "secondary", textcolor: "secondary" },
				{ color: "success", textcolor: "success" },
				{ color: "danger", textcolor: "danger" },
				{ color: "warning" },
				{ color: "info" },
				{ color: "light" },
				{ color: "dark", textcolor: "dark" },
			].map(function (i) {
				return ns.card.container({
					bordercolor: i.color,
					style: { width: "18rem" },
					elems: [
						ns.card.header("Header"),
						ns.card.body({
							textcolor: i.textcolor,
							elems: [
								ns.card.title(`${i.color.capitalize()} card title`),
								ns.card.text("Some quick example text to build on the card title and make up the bulk of the card's content."),
							],
						}),
					],
				});
			});
		},
	}),

	ns.example({
		title: "Mixins utilities",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return ns.card.container({
				bordercolor: "success",
				style: { width: "18rem" },
				elems: [
					ns.card.header({
						color: "transparent",
						bordercolor: "success",
						elems: "Header",
					}),
					ns.card.body({
						textcolor: "success",
						elems: [
							ns.card.title(`Success card title`),
							ns.card.text("Some quick example text to build on the card title and make up the bulk of the card's content."),
						],
					}),
					ns.card.footer({
						color: "transparent",
						bordercolor: "success",
						elems: "Footer",
					}),
				],
			});
		},
	}),

	ns.example({
		title: "Card groups",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return ns.card.group([
				ns.card.container({
					elems: [
						ns.card.img({
							placement: "top",
							src: picsumimgurl(),
						}),
						ns.card.body([
							ns.card.title("Card Title"),
							ns.card.text(
								"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
							),
						]),
					],
				}),
				samplecard[1],
				samplecard[2],
			]);
		},
	}),

	ns.example({
		title: "Card groups with footer",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return ns.card.group([
				ns.card.container({
					elems: [
						ns.card.img({
							placement: "top",
							src: picsumimgurl(),
						}),
						ns.card.body([
							ns.card.title("Card Title"),
							ns.card.text(
								"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
							),
						]),
						ns.card.footer("Last updated 3 mins ago"),
					],
				}),
				samplecardwithfooter[1],
				samplecardwithfooter[2],
			]);
		},
	}),

	ns.example({
		title: "Card grid using {{row-cols-md-2}}",
		code: function () {
			return {
				tag: "div",
				class: "row row-cols-1 row-cols-md-2 g-4",
				elems: [
					{
						tag: "div",
						class: "col",
						elems: samplecard[0],
					},
					{
						tag: "div",
						class: "col",
						elems: samplecard[1],
					},
					{
						tag: "div",
						class: "col",
						elems: samplecard[2],
					},
					{
						tag: "div",
						class: "col",
						elems: samplecard[3],
					},
				],
			};
		},
	}),

	ns.example({
		title: "Card grid using {{row-cols-md-3}}",
		code: function () {
			return {
				tag: "div",
				class: "row row-cols-1 row-cols-md-3 g-4",
				elems: [
					{
						tag: "div",
						class: "col",
						elems: samplecard[0],
					},
					{
						tag: "div",
						class: "col",
						elems: samplecard[1],
					},
					{
						tag: "div",
						class: "col",
						elems: samplecard[2],
					},
					{
						tag: "div",
						class: "col",
						elems: samplecard[3],
					},
				],
			};
		},
	}),

	ns.example({
		title: "Card grid with {{h-100}} class",
		code: function () {
			return {
				tag: "div",
				class: "row row-cols-1 row-cols-md-3 g-4",
				elems: [
					{
						tag: "div",
						class: "col",
						elems: ns.card.container({
							class: "h-100",
							elems: [
								ns.card.img({
									placement: "top",
									src: picsumimgurl(),
								}),
								ns.card.body([
									ns.card.title("Card Title"),
									ns.card.text(
										"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
									),
								]),
							],
						}),
					},
					{
						tag: "div",
						class: "col",
						elems: samplecardh100[0],
					},
					{
						tag: "div",
						class: "col",
						elems: samplecardh100[1],
					},
					{
						tag: "div",
						class: "col",
						elems: samplecardh100[2],
					},
				],
			};
		},
	}),

	ns.example({
		title: "Card grid with {{h-100}} class",
		code: function () {
			return {
				tag: "div",
				class: "row row-cols-1 row-cols-md-3 g-4",
				elems: [
					{
						tag: "div",
						class: "col",
						elems: ns.card.container({
							class: "h-100",
							elems: [
								ns.card.img({
									placement: "top",
									src: picsumimgurl(),
								}),
								ns.card.body([
									ns.card.title("Card Title"),
									ns.card.text(
										"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
									),
								]),
								ns.card.footer("Last updated 3 mins ago"),
							],
						}),
					},
					{
						tag: "div",
						class: "col",
						elems: samplecardwithfooterh100[0],
					},
					{
						tag: "div",
						class: "col",
						elems: samplecardwithfooterh100[1],
					},
					{
						tag: "div",
						class: "col",
						elems: samplecardwithfooterh100[2],
					},
				],
			};
		},
	}),
];

var e_btngroup = [
	ns.example({
		title: "Basic example",
		code: function () {
			return ns.btngroup({
				label: "Basic example",
				elems: [
					ns.button({ label: "Left", color: "primary" }),
					ns.button({ label: "Middle", color: "primary" }),
					ns.button({ label: "Right", color: "primary" }),
				],
			});
		},
	}),

	ns.example({
		title: "Link example",
		code: function () {
			return ns.btngroup([
				ns.button({ href: "javascript:void(0);", label: "Active link", color: "primary", active: true }),
				ns.button({ href: "javascript:void(0);", label: "Link", color: "primary" }),
				ns.button({ href: "javascript:void(0);", label: "Link", color: "primary" }),
			]);
		},
	}),

	ns.example({
		title: "Mixed styles",
		code: function () {
			return ns.btngroup({
				label: "Basic mixed styles example",
				elems: [
					ns.button({ label: "Left", color: "danger" }),
					ns.button({ label: "Middle", color: "warning" }),
					ns.button({ label: "Right", color: "success" }),
				],
			});
		},
	}),

	ns.example({
		title: "Outlined styles",
		code: function () {
			return ns.btngroup({
				label: "Basic outlined styles example",
				elems: [
					ns.button({ outline: true, label: "Left", color: "primary" }),
					ns.button({ outline: true, label: "Middle", color: "primary" }),
					ns.button({ outline: true, label: "Right", color: "primary" }),
				],
			});
		},
	}),

	ns.example({
		title: "Checkbox button styles",
		code: function () {
			return ns.btngroup({
				label: "Checkbox button styles example",
				elems: [
					ns.button({ type: "checkbox", outline: true, label: "Left", color: "primary" }),
					ns.button({ type: "checkbox", outline: true, label: "Middle", color: "primary" }),
					ns.button({ type: "checkbox", outline: true, label: "Right", color: "primary" }),
				],
			});
		},
	}),

	ns.example({
		title: "Radio button styles",
		code: function () {
			return ns.btngroup({
				label: "Radio button styles example",
				elems: [
					ns.button({ name: "g6", type: "radio", outline: true, label: "Left", color: "primary" }),
					ns.button({ name: "g6", type: "radio", outline: true, label: "Middle", color: "primary" }),
					ns.button({ name: "g6", type: "radio", outline: true, label: "Right", color: "primary" }),
				],
			});
		},
	}),

	ns.example({
		title: "Button toolbar",
		code: function () {
			return ns.btntoolbar({
				label: "Toolbar with button groups",
				elems: [
					ns.btngroup({
						label: "First group",
						elems: [
							ns.button({ label: "1", color: "primary" }),
							ns.button({ label: "2", color: "primary" }),
							ns.button({ label: "3", color: "primary" }),
							ns.button({ label: "4", color: "primary" }),
						],
					}),
					ns.btngroup({
						label: "Second group",
						elems: [
							ns.button({ label: "5", color: "secondary" }),
							ns.button({ label: "6", color: "secondary" }),
							ns.button({ label: "7", color: "secondary" }),
						],
					}),
					ns.btngroup({
						label: "Third group",
						elems: [ns.button({ label: "8", color: "info" })],
					}),
				],
			});
		},
	}),

	ns.example({
		title: "Mix toolbar",
		container: singleformcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.btntoolbar({
					label: "Toolbar with button groups",
					elems: [
						ns.btngroup({
							label: "First group",
							elems: [
								ns.button({ label: "1", color: "secondary", outline: true }),
								ns.button({ label: "2", color: "secondary", outline: true }),
								ns.button({ label: "3", color: "secondary", outline: true }),
								ns.button({ label: "4", color: "secondary", outline: true }),
							],
						}),
						ns.input({
							type: "text",
							placeholder: "Input group example",
							before: "@",
						}),
					],
				}),

				ns.btntoolbar({
					label: "Toolbar with button groups",
					class: "justify-content-between",
					elems: [
						ns.btngroup({
							label: "First group",
							elems: [
								ns.button({ label: "1", color: "secondary", outline: true }),
								ns.button({ label: "2", color: "secondary", outline: true }),
								ns.button({ label: "3", color: "secondary", outline: true }),
								ns.button({ label: "4", color: "secondary", outline: true }),
							],
						}),
						ns.input({
							type: "text",
							placeholder: "Input group example",
							before: "@",
						}),
					],
				}),
			];
		},
	}),

	ns.example({
		title: "Sizing",
		container: singleformcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.btngroup({
					weight: "lg",
					elems: [
						ns.button({ outline: true, label: "Left", color: "secondary" }),
						ns.button({ outline: true, label: "Middle", color: "secondary" }),
						ns.button({ outline: true, label: "Right", color: "secondary" }),
					],
				}),
				ns.btngroup({
					elems: [
						ns.button({ outline: true, label: "Left", color: "secondary" }),
						ns.button({ outline: true, label: "Middle", color: "secondary" }),
						ns.button({ outline: true, label: "Right", color: "secondary" }),
					],
				}),
				ns.btngroup({
					weight: "sm",
					elems: [
						ns.button({ outline: true, label: "Left", color: "secondary" }),
						ns.button({ outline: true, label: "Middle", color: "secondary" }),
						ns.button({ outline: true, label: "Right", color: "secondary" }),
					],
				}),
			];
		},
	}),

	ns.example({
		title: "Nesting",
		code: function () {
			return ns.btngroup({
				label: "Button group with nested dropdown",
				elems: [
					ns.button({ label: "1", color: "primary" }),
					ns.button({ label: "2", color: "primary" }),
					ns.dropdown({
						label: "Dropdown",
						color: "primary",
						container: "btn-group",
						option: [
							{ href: "javascript:void(0);", label: "Dropdown link" },
							{ href: "javascript:void(0);", label: "Dropdown link" },
						],
					}),
				],
			});
		},
	}),

	ns.example({
		title: "Vertical variation",
		code: function () {
			return ns.btngroup({
				vertical: true,
				elems: [
					ns.button({ label: "Button", color: "dark" }),
					ns.button({ label: "Button", color: "dark" }),
					ns.button({ label: "Button", color: "dark" }),
					ns.button({ label: "Button", color: "dark" }),
					ns.button({ label: "Button", color: "dark" }),
					ns.button({ label: "Button", color: "dark" }),
				],
			});
		},
	}),

	ns.example({
		title: "Vertical variation with dropdown",
		code: function () {
			return ns.btngroup({
				vertical: true,
				elems: [
					ns.button({ label: "Button", color: "primary" }),
					ns.button({ label: "Button", color: "primary" }),
					ns.dropdown({
						label: "Dropdown",
						color: "primary",
						container: "btn-group",
						option: [
							{ href: "javascript:void(0);", label: "Dropdown link" },
							{ href: "javascript:void(0);", label: "Dropdown link" },
						],
					}),
					ns.button({ label: "Button", color: "primary" }),
					ns.button({ label: "Button", color: "primary" }),
					ns.dropdown({
						label: "Dropdown",
						color: "primary",
						container: "btn-group",
						option: [
							{ href: "javascript:void(0);", label: "Dropdown link" },
							{ href: "javascript:void(0);", label: "Dropdown link" },
						],
					}),
					ns.dropdown({
						label: "Dropdown",
						color: "primary",
						container: "btn-group",
						option: [
							{ href: "javascript:void(0);", label: "Dropdown link" },
							{ href: "javascript:void(0);", label: "Dropdown link" },
						],
					}),
					ns.dropdown({
						label: "Dropdown",
						color: "primary",
						container: "btn-group",
						option: [
							{ href: "javascript:void(0);", label: "Dropdown link" },
							{ href: "javascript:void(0);", label: "Dropdown link" },
						],
					}),
				],
			});
		},
	}),

	ns.example({
		title: "Vertical variation with radio button",
		code: function () {
			return ns.btngroup({
				vertical: true,
				elems: [
					ns.button({ name: "g9", type: "radio", outline: true, label: "Radio 1", color: "danger", checked: true }),
					ns.button({ name: "g9", type: "radio", outline: true, label: "Radio 2", color: "danger" }),
					ns.button({ name: "g9", type: "radio", outline: true, label: "Radio 3", color: "danger" }),
				],
			});
		},
	}),
];

var e_btn = [
	ns.example({
		title: "Examples",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.button({ label: "Primary", color: "primary" }),
				ns.button({ label: "Secondary", color: "secondary" }),
				ns.button({ label: "Success", color: "success" }),
				ns.button({ label: "Danger", color: "danger" }),
				ns.button({ label: "Warning", color: "warning" }),
				ns.button({ label: "Info", color: "info" }),
				ns.button({ label: "Light", color: "light" }),
				ns.button({ label: "Dark", color: "dark" }),
				ns.button({ label: "Link", color: "link" }),
			];
		},
	}),

	ns.example({
		title: "Disable text wrapping",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [ns.button({ label: "Disable text wrapping button", color: "primary", nowarp: true })];
		},
	}),

	ns.example({
		title: "Button tags",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.button({ label: "Link", color: "primary", href: "javascript:void(0);" }),
				ns.button({ label: "Button", color: "primary" }),
				ns.input({
					class: "btn btn-primary",
					type: "button",
					value: "Input",
				}),
				ns.input({
					class: "btn btn-primary",
					type: "submit",
					value: "Submit",
				}),
				ns.input({
					class: "btn btn-primary",
					type: "reset",
					value: "Reset",
				}),
			];
		},
	}),

	ns.example({
		title: "Outline buttons",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.button({ outline: true, label: "Primary", color: "primary" }),
				ns.button({ outline: true, label: "Secondary", color: "secondary" }),
				ns.button({ outline: true, label: "Success", color: "success" }),
				ns.button({ outline: true, label: "Danger", color: "danger" }),
				ns.button({ outline: true, label: "Warning", color: "warning" }),
				ns.button({ outline: true, label: "Info", color: "info" }),
				ns.button({ outline: true, label: "Light", color: "light" }),
				ns.button({ outline: true, label: "Dark", color: "dark" }),
				ns.button({ outline: true, label: "Link", color: "link" }),
			];
		},
	}),

	ns.example({
		title: "Large Size",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.button({ weight: "lg", label: "Large button", color: "primary" }),
				ns.button({ weight: "lg", label: "Large button", color: "secondary" }),
			];
		},
	}),

	ns.example({
		title: "Small Size",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.button({ weight: "sm", label: "Small button", color: "primary" }),
				ns.button({ weight: "sm", label: "Small button", color: "secondary" }),
			];
		},
	}),

	ns.example({
		title: "Disabled state",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.button({ weight: "lg", disabled: true, label: "Primary button", color: "primary" }),
				ns.button({ weight: "lg", disabled: true, label: "Button", color: "secondary" }),
			];
		},
	}),

	ns.example({
		title: "Disabled button link state",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.button({ weight: "lg", disabled: true, label: "Primary link", color: "primary", href: "javascript:void(0);" }),
				ns.button({ weight: "lg", disabled: true, label: "Link", color: "secondary", href: "javascript:void(0);" }),
			];
		},
	}),

	ns.example({
		title: "Block buttons",
		code: function () {
			return {
				tag: "div",
				class: "d-grid gap-2",
				elems: [
					ns.button({ label: "Button", color: "primary" }),
					ns.button({ label: "Button", color: "primary" }),
					ns.button({ label: "Button", color: "primary" }),
				],
			};
		},
	}),

	ns.example({
		title: "Block buttons md",
		code: function () {
			return {
				tag: "div",
				class: "d-grid gap-2 d-md-block",
				elems: [
					ns.button({ label: "Button", color: "primary" }),
					ns.button({ label: "Button", color: "primary" }),
					ns.button({ label: "Button", color: "primary" }),
				],
			};
		},
	}),

	ns.example({
		title: "Centered in horizontal",
		code: function () {
			return {
				tag: "div",
				class: "d-grid gap-2 col-6 mx-auto",
				elems: [
					ns.button({ label: "Button", color: "primary" }),
					ns.button({ label: "Button", color: "primary" }),
					ns.button({ label: "Button", color: "primary" }),
				],
			};
		},
	}),

	ns.example({
		title: "Right align",
		code: function () {
			return {
				tag: "div",
				class: "d-grid gap-2 d-md-flex justify-content-md-end",
				elems: [
					ns.button({ label: "Button", color: "primary" }),
					ns.button({ label: "Button", color: "primary" }),
					ns.button({ label: "Button", color: "primary" }),
				],
			};
		},
	}),

	ns.example({
		title: "Toggle state button",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.button({ toggle: true, label: "Toggle button", color: "primary" }),
				ns.button({ toggle: true, label: "Active toggle button", color: "primary", active: true }),
				ns.button({ toggle: true, label: "Disabled toggle button", color: "primary", disabled: true }),
			];
		},
	}),

	ns.example({
		title: "Toggle state link",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.button({ toggle: true, href: "javascript:void(0)", label: "Toggle link", color: "primary" }),
				ns.button({ toggle: true, href: "javascript:void(0)", label: "Active toggle link", color: "primary", active: true }),
				ns.button({ toggle: true, href: "javascript:void(0)", label: "Disabled toggle link", color: "primary", disabled: true }),
			];
		},
	}),
];

var e_breadcrumb = [
	ns.example({
		title: "Example",
		code: function () {
			return [
				ns.breadcrumb({
					item: [{ label: "Home", href: "javascript:void(0);", active: true }],
				}),
				ns.breadcrumb({
					item: [
						{ label: "Home", href: "javascript:void(0);" },
						{ label: "Library", href: "javascript:void(0);", active: true },
					],
				}),
				ns.breadcrumb({
					item: [
						{ label: "Home", href: "javascript:void(0);" },
						{ label: "Library", href: "javascript:void(0);" },
						{ label: "Data", active: true, href: "javascript:void(0);" },
					],
				}),
			];
		},
	}),

	ns.example({
		title: "Divider",
		code: function () {
			return [
				ns.breadcrumb({
					divider: "'>'",
					item: [
						{ label: "Home", href: "javascript:void(0);" },
						{ label: "Library", href: "javascript:void(0);" },
						{ label: "Data", active: true, href: "javascript:void(0);" },
					],
				}),
			];
		},
	}),

	ns.example({
		title: "Divider URL",
		code: function () {
			return [
				ns.breadcrumb({
					divider: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E")`,
					item: [
						{ label: "Home", href: "javascript:void(0);" },
						{ label: "Library", href: "javascript:void(0);" },
						{ label: "Data", active: true, href: "javascript:void(0);" },
					],
				}),
			];
		},
	}),

	ns.example({
		title: "Divider None",
		code: function () {
			return [
				ns.breadcrumb({
					divider: "''",
					item: [
						{ label: "Home", href: "javascript:void(0);" },
						{ label: "Library", href: "javascript:void(0);" },
						{ label: "Data", active: true, href: "javascript:void(0);" },
					],
				}),
			];
		},
	}),
];

var e_badge = [
	ns.example({
		title: "Example",
		code: function () {
			return [1, 2, 3, 4, 5, 6].map(function (i) {
				return {
					tag: "h" + i,
					elems: [
						{
							elems: `Example heading #${i} `,
						},
						ns.badge("New"),
					],
				};
			});
		},
	}),

	ns.example({
		title: "Buttons",
		code: function () {
			return ns.button({
				label: "Notifications",
				color: "primary",
				badge: "4",
			});
		},
	}),

	ns.example({
		title: "Positioned",
		code: function () {
			return [
				ns.button({
					label: "Inbox",
					color: "primary",
					relativeposition: true,
					badge: {
						label: "99+",
						color: "danger",
						notification: true,
						pill: true,
					},
				}),
			];
		},
	}),

	ns.example({
		title: "Notification",
		code: function () {
			return [
				ns.button({
					label: "Profile",
					color: "primary",
					relativeposition: true,
					badge: {
						border: "light",
						color: "danger",
						notification: true,
						asst: "New Message", //required
						pill: true,
					},
				}),
			];
		},
	}),

	ns.example({
		title: "Background color",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.badge({ color: "primary", label: "Primary" }),
				ns.badge({ color: "secondary", label: "Secondary" }),
				ns.badge({ color: "success", label: "Success" }),
				ns.badge({ color: "danger", label: "Danger" }),
				ns.badge({ color: "warning", label: "Warning" }),
				ns.badge({ color: "info", label: "Info" }),
				ns.badge({ color: "light", label: "Light", class: "text-dark" }),
				ns.badge({ color: "dark", label: "Dark" }),
			];
		},
	}),

	ns.example({
		title: "Pill badge",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.badge({ pill: true, color: "primary", label: "Primary" }),
				ns.badge({ pill: true, color: "secondary", label: "Secondary" }),
				ns.badge({ pill: true, color: "success", label: "Success" }),
				ns.badge({ pill: true, color: "danger", label: "Danger" }),
				ns.badge({ pill: true, color: "warning", label: "Warning" }),
				ns.badge({ pill: true, color: "info", label: "Info" }),
				ns.badge({ pill: true, color: "light", label: "Light", class: "text-dark" }),
				ns.badge({ pill: true, color: "dark", label: "Dark" }),
			];
		},
	}),
];

var e_alert = [
	ns.example({
		title: "Example",
		container: fluidcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.alert.container("primary", "A simple primary alert—check it out!"),
				ns.alert.container("secondary", "A simple secondary alert—check it out!"),
				ns.alert.container("success", "A simple success alert—check it out!"),
				ns.alert.container("danger", "A simple danger alert—check it out!"),
				ns.alert.container("warning", "A simple warning alert—check it out!"),
				ns.alert.container("info", "A simple info alert—check it out!"),
				ns.alert.container("light", "A simple light alert—check it out!"),
				ns.alert.container("dark", "A simple dark alert—check it out!"),
			];
		},
	}),

	ns.example({
		title: "Link color",
		container: fluidcontainer,
		item: itemcontainer,
		code: function () {
			var color = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"];
			return color.map(function (i) {
				return ns.alert.container({
					color: i,
					elems: [`A simple ${i} alert with `, ns.alert.link("an example link", "javascript:void(0);"), `. Give it a click if you like.`],
				});
			});
		},
	}),

	ns.example({
		title: "Additional content",
		container: fluidcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.alert.container({
					color: "success",
					elems: [
						ns.alert.header("Well done!"),
						{
							tag: "p",
							elems: "Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.",
						},
						{ tag: "hr", elems: "" },
						{ tag: "p", class: "mb-0", elems: "Whenever you need to, be sure to use margin utilities to keep things nice and tidy." },
					],
				}),
			];
		},
	}),

	ns.example({
		title: "Icons",
		container: fluidcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.alert.container("/", "An example alert with an icon"),
				ns.alert.container("i", "An example alert with an icon"),
				ns.alert.container("x", "An example alert with an icon"),
				ns.alert.container("-", "An example alert with an icon"),
				ns.alert.container("!", "An example alert with an icon"),
				ns.alert.container("!!", "An example alert with an icon"),
			];
		},
	}),

	ns.example({
		title: "Dismissing",
		container: fluidcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.alert.container({
					dismissible: true,
					color: "warning",
					elems: "<strong>Holy guacamole!</strong> You should check in on some of those fields below.",
				}),
			];
		},
	}),
];

var e_accordion = [
	ns.example({
		title: "Example",
		msg: "Click the accordions below to expand/collapse the accordion content.",
		code: function () {
			return ns.accordion({
				item: [
					{ label: "Accordion Item 1", elems: ["<b>This is the first item's accordion body.</b> ", lipsum()].join("") },
					{ label: "Accordion Item 2", elems: ["<b>This is the second item's accordion body.</b> ", lipsum()].join("") },
					{ label: "Accordion Item 3", elems: ["<b>This is the third item's accordion body.</b> ", lipsum()].join("") },
				],
			});
		},
	}),

	ns.example({
		title: "Flush",
		msg: "Set {{flush:true}} to remove the default background-color, some borders, and some rounded corners to render accordions edge-to-edge with their parent container.",
		code: function () {
			return ns.accordion({
				flush: true,
				item: [
					{ label: "Accordion Item 1", elems: ["<b>This is the first item's accordion body.</b> ", lipsum()].join("") },
					{ label: "Accordion Item 2", elems: ["<b>This is the second item's accordion body.</b> ", lipsum()].join("") },
					{ label: "Accordion Item 3", elems: ["<b>This is the third item's accordion body.</b> ", lipsum()].join("") },
				],
			});
		},
	}),

	ns.example({
		title: "Always open",
		msg: "Set {{autoclose:false}} to make accordion items stay open when another item is opened.",
		code: function () {
			return ns.accordion({
				autoclose: false,
				item: [
					{ label: "Accordion Item 1", elems: ["<b>This is the first item's accordion body.</b> ", lipsum()].join("") },
					{ label: "Accordion Item 2", elems: ["<b>This is the second item's accordion body.</b> ", lipsum()].join("") },
					{ label: "Accordion Item 3", elems: ["<b>This is the third item's accordion body.</b> ", lipsum()].join("") },
				],
			});
		},
	}),
];

var e_input = [
	ns.example({
		title: "Example",
		container: singleformcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.input({
					label: "Email address",
					type: "email",
					placeholder: "name@example.com",
				}),
				ns.input({
					label: "Example textarea",
					type: "textarea",
				}),
			];
		},
	}),

	ns.example({
		title: "Sizing",
		container: singleformcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.input({
					weight: "lg",
					type: "text",
					placeholder: 'weight:"lg"',
				}),
				ns.input({
					type: "text",
					placeholder: "Default input",
				}),
				ns.input({
					weight: "sm",
					type: "text",
					placeholder: 'weight:"sm"',
				}),
			];
		},
	}),

	ns.example({
		title: "Disabled",
		container: singleformcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.input({
					disabled: true,
					type: "text",
					placeholder: "Disabled input",
				}),
				ns.input({
					disabled: true,
					readonly: true,
					type: "text",
					placeholder: "Disabled readonly input",
				}),
			];
		},
	}),

	ns.example({
		title: "Readonly",
		code: function () {
			return [
				ns.input({
					readonly: true,
					type: "text",
					placeholder: "Readonly input here...",
				}),
			];
		},
	}),

	ns.example({
		title: "Readonly plain text",
		container: fluidcontainer,
		item: rowcontainer,
		code: function () {
			return [
				ns.input({
					label: "Email",
					labelsize: "sm-2",
					ctlsize: "sm-10",
					type: "email",
					readonly: true,
					plaintext: true,
					value: "name@example.com",
				}),
				ns.input({
					label: "Password",
					labelsize: "sm-2",
					ctlsize: "sm-10",
					type: "password",
				}),
			];
		},
	}),

	ns.example({
		title: "Readonly plain text (Stack)",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.input({
					hiddenlabel: "Email",
					type: "email",
					readonly: true,
					plaintext: true,
					value: "name@example.com",
				}),
				ns.input({
					hiddenlabel: "Password",
					placeholder: "Password",
					type: "password",
				}),
				ns.button({
					type: "submit",
					label: "Confirm identity",
					color: "primary",
				}),
			];
		},
	}),

	//ns.input
	ns.example({
		title: "File input",
		container: singleformcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.input({ label: "Default file input example", type: "file" }),
				ns.input({ label: "Multiple files input example", type: "file", multiple: true }),
				ns.input({ label: "Disabled file input example", type: "file", disabled: true }),
				ns.input({ label: "Small file input example", type: "file", weight: "sm" }),
				ns.input({ label: "Large file input example", type: "file", weight: "lg" }),
			];
		},
	}),

	ns.example({
		title: "File Input",
		msg: "This control is {{link}} to backend",
		container: formcontainer,
		item: itemcontainer,
		code: function () {
			return ns.file.ctl({
				label: "Picture",
				accepe: "image/gif,image/bmp,image/x-windows-bmp,image/jpeg,image/png",
				value: null,
				multiple: false,
			});
		},
	}),

	ns.example({
		title: "Color",
		code: function () {
			return [ns.input({ label: "Color picker", type: "color" })];
		},
	}),

	ns.example({
		title: "Datalist",
		code: function () {
			return [
				ns.input({
					label: "Datalist example",
					type: "text",
					option: ["San Francisco", "New York", "Seattle", "Los Angeles", "Chicago"],
				}),
			];
		},
	}),
];

var sampleoptionitem = [
	{ value: "", label: "Open this select menu", selected: true },
	{ value: "1", label: "One" },
	{ value: "2", label: "Two" },
	{ value: "3", label: "Three" },
];

var e_select = [
	ns.example({
		title: "Default",
		code: function () {
			return [
				ns.input({
					hiddenlabel: "Default select example",
					type: "select",
					option: [
						//sampleoptionitem
						{ value: "", label: "Open this select menu", selected: true },
						{ value: "1", label: "One" },
						{ value: "2", label: "Two" },
						{ value: "3", label: "Three" },
					],
				}),
			];
		},
	}),

	ns.example({
		title: "Sizing",
		item: singleitemcontainer,
		code: function () {
			return [
				ns.input({
					weight: "lg",
					hiddenlabel: "Large select example",
					type: "select",
					option: sampleoptionitem,
				}),
				ns.input({
					weight: "sm",
					hiddenlabel: "Small select example",
					type: "select",
					option: sampleoptionitem,
				}),
			];
		},
	}),

	ns.example({
		title: "Multiple",
		code: function () {
			return [
				ns.input({
					multiple: true,
					hiddenlabel: "Multiple select example",
					type: "select",
					option: sampleoptionitem,
				}),
			];
		},
	}),

	ns.example({
		title: "Size",
		code: function () {
			return [
				ns.input({
					size: 3,
					hiddenlabel: "Size 3 select example",
					type: "select",
					option: sampleoptionitem,
				}),
			];
		},
	}),

	ns.example({
		title: "Disabled",
		code: function () {
			return [
				ns.input({
					disabled: true,
					hiddenlabel: "Disabled select example",
					type: "select",
					option: sampleoptionitem,
				}),
			];
		},
	}),
];

var e_radio = [
	ns.example({
		title: "Checks",
		code: function () {
			return [ns.input({ label: "Default checkbox", type: "checkbox" }), ns.input({ label: "Checked checkbox", type: "checkbox", checked: true })];
		},
	}),

	ns.example({
		title: "Indeterminate",
		code: function () {
			return [ns.input({ label: "Indeterminate checkbox", type: "checkbox" })];
		},
	}),

	ns.example({
		title: "Disabled",
		code: function () {
			return [
				ns.input({ label: "Disabled checkbox", type: "checkbox", disabled: true }),
				ns.input({ label: "Disabled checked checkbox", type: "checkbox", checked: true, disabled: true }),
			];
		},
	}),

	ns.example({
		title: "Radio",
		code: function () {
			return [
				ns.input({ name: "g1", label: "Default radio", type: "radio" }),
				ns.input({ name: "g1", label: "Checked radio", type: "radio", checked: true }),
			];
		},
	}),

	ns.example({
		title: "Disabled",
		code: function () {
			return [
				ns.input({ name: "g2", label: "Disabled radio", type: "radio", disabled: true }),
				ns.input({ name: "g2", label: "Disabled checked radio", type: "radio", checked: true, disabled: true }),
			];
		},
	}),

	ns.example({
		title: "Switch",
		code: function () {
			return [
				ns.input({ label: "Default switch checkbox input", type: "switch" }),
				ns.input({ label: "Checked switch checkbox input", type: "switch", checked: true }),
				ns.input({ label: "Disabled switch checkbox input", type: "switch", disabled: true }),
				ns.input({ label: "Disabled checked switch checkbox input", type: "switch", checked: true, disabled: true }),
			];
		},
	}),

	ns.example({
		title: "Default (stacked)",
		code: function () {
			return [
				ns.input({ label: "Disabled checkbox", type: "checkbox", checked: true }),
				ns.input({ label: "Disabled checkbox", type: "checkbox", disabled: true }),
				ns.input({ name: "g3", label: "Default radio", type: "radio" }),
				ns.input({ name: "g3", label: "Second radio", type: "radio", checked: true }),
				ns.input({ name: "g3", label: "Disabled radio", type: "radio", disabled: true }),
			];
		},
	}),

	ns.example({
		title: "Disabled",
		code: function () {
			return [
				ns.input({ name: "g4", label: "Disabled radio", type: "radio", disabled: true }),
				ns.input({ name: "g4", label: "Disabled checked radio", type: "radio", checked: true, disabled: true }),
			];
		},
	}),

	ns.example({
		title: "Inline Check",
		code: function () {
			return [
				ns.input({ label: "1", type: "checkbox", inline: true }),
				ns.input({ label: "2", type: "checkbox", inline: true }),
				ns.input({ label: "3 (disabled)", type: "checkbox", disabled: true, inline: true }),
			];
		},
	}),

	ns.example({
		title: "Inline Radio",
		code: function () {
			return [
				ns.input({ name: "g5", label: "1", type: "radio", inline: true }),
				ns.input({ name: "g5", label: "2", type: "radio", inline: true }),
				ns.input({ name: "g5", label: "3 (disabled)", type: "radio", disabled: true, inline: true }),
			];
		},
	}),

	ns.example({
		title: "Without label",
		code: function () {
			return [ns.input({ type: "checkbox" }), ns.input({ name: "g6", type: "radio" })];
		},
	}),

	ns.example({
		title: "Checkbox toggle button",
		code: function () {
			return ns.button({ type: "checkbox", label: "Single toggle", color: "primary" });
		},
	}),

	ns.example({
		title: "Checkbox toggle button checked",
		code: function () {
			return ns.button({ type: "checkbox", checked: true, label: "Checked", color: "primary" });
		},
	}),

	ns.example({
		title: "Checkbox toggle button disabled",
		code: function () {
			return ns.button({ type: "checkbox", disabled: true, label: "Disabled", color: "primary" });
		},
	}),

	ns.example({
		title: "Radio toggle buttons",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.button({ type: "radio", name: "g7", label: "Checked", checked: true, color: "secondary" }),
				ns.button({ type: "radio", name: "g7", label: "Radio", color: "secondary" }),
				ns.button({ type: "radio", name: "g7", label: "Disabled", disabled: true, color: "secondary" }),
				ns.button({ type: "radio", name: "g7", label: "Radio", color: "secondary" }),
			];
		},
	}),

	ns.example({
		title: "Outlined styles",
		container: stackcontainer,
		item: itemcontainer,
		code: function () {
			return [
				ns.button({ type: "checkbox", outline: true, label: "Single toggle", color: "primary" }),
				ns.button({ type: "checkbox", outline: true, label: "Checked", checked: true, color: "secondary" }),
				ns.button({ type: "radio", outline: true, name: "g8", label: "Checked success radio", checked: true, color: "success" }),
				ns.button({ type: "radio", outline: true, name: "g8", label: "Danger radio", color: "danger" }),
			];
		},
	}),
];

var e_inputgroup = [
	ns.example({
		title: "Basic example",
		item: singleitemcontainer,
		code: function () {
			return [
				ns.input({
					type: "text",
					placeholder: "Username",
					before: "@",
				}),

				ns.input({
					type: "text",
					placeholder: "Recipient's username",
					after: "@example.com",
				}),

				ns.input({
					label: "Your vanity URL",
					type: "text",
					before: "https://example.com/users/",
				}),

				ns.input({
					hiddenlabel: "Amount (to the nearest dollar)",
					type: "number",
					before: "$",
					after: ".00",
				}),

				ns.inputgroup.container([
					ns.input({
						hiddenlabel: "Username",
						type: "text",
						placeholder: "Username",
					}),
					ns.inputgroup.text("@"),
					ns.input({
						hiddenlabel: "Server",
						type: "text",
						placeholder: "Server",
					}),
				]),

				ns.input({
					hiddenlabel: "With textarea",
					type: "textarea",
					before: "With textarea",
				}),
			];
		},
	}),

	ns.example({
		title: "Wrapping",
		item: singleitemcontainer,
		code: function () {
			return [
				ns.input({
					nowarp: true,
					placeholder: "Username",
					type: "text",
					before: "@",
				}),

				ns.inputgroup.container({
					nowrap: true,
					elems: [
						ns.inputgroup.text("@"),
						ns.input({
							placeholder: "Username",
							type: "text",
						}),
					],
				}),
			];
		},
	}),

	ns.example({
		title: "Sizing",
		item: singleitemcontainer,
		code: function () {
			return [
				ns.input({
					type: "text",
					before: "Small",
					weight: "sm",
				}),

				ns.input({
					type: "text",
					before: "Default",
				}),

				ns.input({
					type: "text",
					before: "Large",
					weight: "lg",
				}),
			];
		},
	}),

	ns.example({
		title: "Checkboxes and radios",
		item: singleitemcontainer,
		code: function () {
			return [
				ns.input({
					type: "text",
					before: ns.input({ type: "checkbox", flexcontainer: true, class: "mt-0" }),
				}),

				ns.input({
					type: "text",
					before: ns.input({ type: "radio", flexcontainer: true, class: "mt-0" }),
				}),
			];
		},
	}),

	ns.example({
		title: "Multiple inputs",
		item: singleitemcontainer,
		code: function () {
			return [
				ns.inputgroup.container([
					ns.inputgroup.text("First and last name"),
					ns.input({
						hiddenlabel: "First name",
						type: "text",
					}),
					ns.input({
						hiddenlabel: "Last name",
						type: "text",
					}),
				]),
			];
		},
	}),

	ns.example({
		title: "Multiple addons",
		item: singleitemcontainer,
		code: function () {
			return [
				ns.inputgroup.container([
					ns.inputgroup.text("$"),
					ns.inputgroup.text("0.00"),
					ns.input({
						hiddenlabel: "Dollar amount (with dot and two decimal places)",
						type: "number",
					}),
				]),

				ns.inputgroup.container([
					ns.input({
						hiddenlabel: "Dollar amount (with dot and two decimal places)",
						type: "number",
					}),
					ns.inputgroup.text("$"),
					ns.inputgroup.text("0.00"),
				]),
			];
		},
	}),

	ns.example({
		title: "Button addons",
		item: singleitemcontainer,
		code: function () {
			return [
				ns.input({
					hiddenlabel: "Example text with button addon",
					type: "text",
					beforetype: "button",
					before: ns.button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
				}),

				ns.input({
					placeholder: "Recipient's username",
					type: "text",
					aftertype: "button",
					after: ns.button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
				}),

				ns.inputgroup.container([
					ns.button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
					ns.button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
					ns.input({
						hiddenlabel: "Example text with button addon",
						type: "text",
					}),
				]),

				ns.inputgroup.container([
					ns.input({
						placeholder: "Recipient's username",
						type: "text",
					}),
					ns.button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
					ns.button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
				]),
			];
		},
	}),

	ns.example({
		title: "Buttons with dropdowns",
		item: singleitemcontainer,
		code: function () {
			return [
				ns.input({
					hiddenlabel: "Text input with dropdown button",
					type: "text",
					beforetype: "dropdown",
					before: ns.dropdown({
						outline: true,
						color: "secondary",
						label: "Dropdown",
						container: null,
						option: [
							//simpledropdownitem
							{ href: "javascript:void(0);", label: "Action" },
							{ href: "javascript:void(0);", label: "Another action" },
							{ value: "-" },
							{ href: "javascript:void(0);", label: "Something else here" },
						],
					}),
				}),

				ns.input({
					hiddenlabel: "Text input with dropdown button",
					type: "text",
					aftertype: "dropdown",
					after: ns.dropdown({
						outline: true,
						color: "secondary",
						label: "Dropdown",
						container: null,
						option: simpledropdownitem,
					}),
				}),

				ns.input({
					hiddenlabel: "Text input with dropdown button",
					type: "text",
					beforetype: "dropdown",
					before: ns.dropdown({
						outline: true,
						color: "secondary",
						label: "Dropdown",
						container: null,
						option: simpledropdownitem,
					}),
					aftertype: "dropdown",
					after: ns.dropdown({
						outline: true,
						color: "secondary",
						label: "Dropdown",
						container: null,
						option: simpledropdownitem,
					}),
				}),
			];
		},
	}),

	ns.example({
		title: "Segmented buttons",
		item: singleitemcontainer,
		code: function () {
			return [
				ns.input({
					hiddenlabel: "Text input with dropdown button",
					type: "text",
					beforetype: "dropdown",
					before: ns.dropdown({
						outline: true,
						color: "secondary",
						label: "Action",
						container: null,
						segmenttoggle: true,
						option: simpledropdownitem,
					}),
				}),

				ns.input({
					hiddenlabel: "Text input with dropdown button",
					type: "text",
					aftertype: "dropdown",
					after: ns.dropdown({
						outline: true,
						color: "secondary",
						label: "Action",
						container: null,
						segmenttoggle: true,
						option: simpledropdownitem,
					}),
				}),
			];
		},
	}),

	ns.example({
		title: "Segmented buttons",
		item: singleitemcontainer,
		code: function () {
			return [
				ns.input({
					type: "select",
					before: "Options",
					option: sampleoptionitem,
				}),

				ns.input({
					type: "select",
					after: "Options",
					option: sampleoptionitem,
				}),

				ns.input({
					type: "select",
					beforetype: "button",
					before: ns.button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
					option: sampleoptionitem,
				}),

				ns.input({
					type: "select",
					aftertype: "button",
					after: ns.button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
					option: sampleoptionitem,
				}),
			];
		},
	}),

	ns.example({
		title: "Custom file input",
		item: singleitemcontainer,
		code: function () {
			return [
				ns.input({
					type: "file",
					before: "Upload",
				}),

				ns.input({
					type: "file",
					after: "Upload",
				}),

				ns.input({
					type: "file",
					beforetype: "button",
					before: ns.button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
				}),

				ns.input({
					type: "file",
					aftertype: "button",
					after: ns.button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
				}),
			];
		},
	}),
];

var e_floatinglabel = [
	ns.example({
		title: "Example",
		item: singleitemcontainer,
		code: function () {
			return [
				ns.input({
					type: "email",
					label: "Email address",
					floatinglabel: true,
				}),

				ns.input({
					type: "password",
					label: "Password",
					floatinglabel: true,
				}),
			];
		},
	}),

	ns.example({
		title: "Value already defind",
		item: singleitemcontainer,
		code: function () {
			return [
				ns.input({
					type: "email",
					label: "Email address",
					floatinglabel: true,
					value: "user@example.com",
				}),
			];
		},
	}),

	ns.example({
		title: "Validation",
		item: singleitemcontainer,
		code: function () {
			return [
				ns.input({
					type: "email",
					name: "email",
					label: "Email address",
					floatinglabel: true,
					required: true,
					invalid: "Please provide email",
					aftertype: "button",
					after: ns.button({
						label: "Validate",
						color: "primary",
						onclick: function (sender) {
							ns.core.validate($(sender).closest(".card-body"));
						},
					}),
				}),
			];
		},
	}),

	ns.example({
		title: "Textareas",
		item: singleitemcontainer,
		code: function () {
			return [
				ns.input({
					type: "textarea",
					label: "Comments",
					floatinglabel: true,
				}),
			];
		},
	}),

	ns.example({
		title: "Textareas With Height Setting",
		item: singleitemcontainer,
		code: function () {
			return [
				ns.input({
					type: "textarea",
					label: "Comments",
					style: { height: "100px" },
					floatinglabel: true,
				}),
			];
		},
	}),

	ns.example({
		title: "Select",
		item: singleitemcontainer,
		code: function () {
			return [
				ns.input({
					label: "Works with selects",
					type: "select",
					floatinglabel: true,
					option: sampleoptionitem,
				}),
			];
		},
	}),
];

var e_range = [
	ns.example({
		title: "Example Range",
		code: function () {
			return [
				ns.input({
					label: "Simple Range",
					type: "range",
					value: 50,
				}),
			];
		},
	}),

	ns.example({
		title: "Disable",
		code: function () {
			return [
				ns.input({
					label: "Disable Range",
					type: "range",
					disabled: true,
					value: 50,
				}),
			];
		},
	}),

	ns.example({
		title: "Min and max",
		code: function () {
			return [
				ns.input({
					label: "Example Range",
					type: "range",
					value: 2.5,
					min: 0,
					max: 5,
				}),
			];
		},
	}),

	ns.example({
		title: "Step",
		code: function () {
			return [
				ns.input({
					label: "Example Range",
					type: "range",
					value: 2.5,
					min: 0,
					max: 5,
					step: 0.5,
				}),
			];
		},
	}),
];

var menu_c1 = [
	{ label: "Form control", onclick: "showexample(this,'e_input')" },
	{ label: "Select", onclick: "showexample(this,'e_select')" },
	{ label: "Check &amp; radios", onclick: "showexample(this,'e_radio')" },
	{ label: "Range", onclick: "showexample(this,'e_range')" },
	{ label: "Input group", onclick: "showexample(this,'e_inputgroup')" },
	{ label: "Floating label", onclick: "showexample(this,'e_floatinglabel')" },
];

var menu_c2 = [
	{ label: "Accordion", onclick: "showexample(this,'e_accordion')" },
	{ label: "Alert", onclick: "showexample(this,'e_alert')" },
	{ label: "Badge", onclick: "showexample(this,'e_badge')" },
	{ label: "Breadcrumb", onclick: "showexample(this,'e_breadcrumb')" },
	{ label: "Button", onclick: "showexample(this,'e_btn')" },
	{ label: "Button group", onclick: "showexample(this,'e_btngroup')" },
	{ label: "Card", onclick: "showexample(this,'e_card')" },
	{ label: "Carosel", onclick: "showexample(this,'e_carosel')" },
	{ label: "Close button", onclick: "showexample(this,'e_close')" },
	{ label: "Collapse", onclick: "showexample(this,'e_collapse')" },
	{ label: "Dropdown", onclick: "showexample(this,'e_dropdown')" },
	{ label: "List group", onclick: "showexample(this,'e_listgroup')" },
	{ label: "Modal", onclick: "showexample(this,'e_dlg')" },
	{ label: "Tab", onclick: "showexample(this,'e_tab')" },
	{ label: "Navbar", onclick: "showexample(this,'e_navbar')", active: true },

	{ label: "Icon", onclick: "showexample(this,'e_icon')" },
	{ label: "Image", onclick: "showexample(this,'e_img')" },
	{ label: "Link", onclick: "showexample(this,'e_link')" },

	{ label: "List", onclick: "showexample(this,'e_listctl')" },
	{ label: "Table", onclick: "showexample(this,'e_table')" },
	{ label: "Offcanvas", onclick: "showexample(this,'e_offcanvas')" },

	{ label: "Paging", onclick: "showexample(this,'e_paging')" },
];

function showexample(sender, arg) {
	if (sender) {
		var sidebar = $("#sidebar").get();
		$(sidebar).find(".active").removeClass("active");
		$(sender).addClass("active");
	}

	var root = $("#root").get();

	$(root).empty();
	ns.build.append(root, window[arg]);
	ns.build.init(root);
	PR.prettyPrint();
}

$(document).ready(() => {
	//list container
	var navbar = $("#navbar").get();
	var navbarid = ns.core.UUID();
	ns.build.append(
		navbar,
		ns.navbar.container({
			expand: "lg",
			color: "dark",
			light: "dark",
			position: "fixed-top",
			containerfluid: true,
			elems: [
				ns.navbar.toggler({
					id: "sidebar",
					toggle: "collapse",
				}),

				ns.navbar.brand({
					label: "NS",
					icon: {
						icon: "fire",
						color: "danger",
					},
				}),

				ns.navbar.toggler({
					id: navbarid,
					toggle: "collapse",
				}),

				ns.navbar.collapsecontainer({
					id: navbarid,
					elems: [
						ns.navbar.itemcontainer({
							parenttype: "collapse",
							elems: [
								ns.navbar.item({ label: "Home", icon: "address-book", href: "index.html" }),
								ns.navbar.item({ label: "Example", icon: "user", active: true, href: "example.html" }),
							],
						}),
						{ tag: "hr", class: "d-block-sm d-none-md" },
						ns.navbar.itemcontainer({
							mxauto: false,
							elems: [
								ns.navbar.item({
									label: "User",
									icon: "user",
									option: [
										{ href: "", label: "Profile", icon: "user-edit" },
										{ href: "", label: "Setting", icon: "user-cog" },
										{ onclick: "ns.core.themeEditor()", label: "Theme", icon: "swatchbook" },
										{ value: "-", label: "" },
										{ onclick: "", label: "Sign Out", icon: "sign-out-alt" },
									],
								}),
							],
						}),
					],
				}),
			],
		})
	);

	var sidebar = $("#sidebar").get();
	ns.build.append(sidebar, [
		ns.menu.container({
			title: "Forms",
			item: ns.menu.item(menu_c1),
		}),
		ns.menu.container({
			title: "Components",
			active: true,
			item: ns.menu.item(menu_c2),
		}),
		ns.menu.container({
			title: "Others",
			item: ns.menu.item([
				{ label: "Home", icon: "award", onclick: "window.location='index.html'" },
				{ label: "Example", icon: "baby", onclick: "window.location='example.html'", active: true },
				{ label: "Change Theme", icon: "swatchbook", onclick: "ns.core.themeEditor()" },
			]),
		}),
	]);

	showexample(null, "e_navbar");
});
