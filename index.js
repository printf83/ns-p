"use strict";
const ex = {};
(function (ex) {
	var textindex = -1;
	var textdb = [
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elit massa, elementum vel metus id, congue sollicitudin lectus. Praesent ultricies felis eget nisl volutpat gravida. In eleifend iaculis viverra. Proin ut gravida elit, id posuere velit. Nulla congue enim at odio eleifend accumsan. Curabitur felis quam, feugiat in tincidunt ac, pulvinar eu diam. Nullam non erat orci. Sed gravida, ante sed vestibulum accumsan, elit metus feugiat ex, in gravida dolor nunc fermentum magna.",
		"Nam tempor maximus ante vel malesuada. Vivamus nibh neque, cursus finibus risus vel, porttitor accumsan lacus. Nulla facilisi. Sed sit amet sagittis magna, id cursus est. Quisque convallis vel magna quis vestibulum. Curabitur placerat diam odio, in tincidunt felis viverra ac. Aenean quis ante diam. Sed sit amet lectus rutrum tortor feugiat auctor. Fusce euismod est nec posuere accumsan. Donec sodales cursus maximus. Nulla tincidunt quam quis lacus suscipit, ut lobortis erat fringilla. Praesent id diam nec metus mollis maximus. Nam vestibulum lectus quis velit dictum ornare. Phasellus vitae accumsan nisl, sed aliquet nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
		"Donec vehicula elit vel purus euismod, et aliquet nisl molestie. Phasellus at porttitor neque. Donec et orci mi. Nulla a laoreet tortor. Cras ac massa ipsum. Suspendisse mi diam, sodales nec felis sit amet, ullamcorper aliquet tellus. In vitae urna ipsum. Donec cursus rutrum magna. Quisque sed nisi a lacus accumsan mollis.",
		"Cras felis orci, feugiat ac volutpat non, porttitor at leo. Mauris sit amet eros tincidunt, cursus felis sit amet, molestie erat. Cras rutrum mi sed nunc tempor, id viverra metus aliquet. Sed aliquet scelerisque rutrum. Donec blandit ante et mauris scelerisque, congue venenatis tortor vehicula. Sed ornare ipsum sed cursus euismod. Aenean placerat nibh nisi, ac pretium nulla aliquet vitae. Mauris vel mauris urna. Morbi ultrices enim tellus, quis volutpat velit feugiat vitae. Vivamus hendrerit consequat rhoncus. In at efficitur lectus, vel volutpat massa. Donec consectetur scelerisque lacinia. Sed tristique risus ac mi efficitur consequat.",
		"Phasellus quis feugiat magna. Fusce placerat, metus eget tempor placerat, velit neque aliquam turpis, vel gravida ex leo sit amet diam. Aenean facilisis vulputate metus, ac dapibus felis vulputate non. Sed vehicula ante nec odio dapibus, id convallis libero auctor. Vivamus facilisis sed tellus a mattis. Donec bibendum imperdiet dui eget porttitor. Nam aliquam mi a nunc luctus rutrum.",
	];

	var text = function (tag) {
		textindex++;
		if (textindex >= textdb.length) {
			textindex = 0;
		}
		if (tag) {
			return { tag: tag, elems: textdb[textindex] };
		} else {
			return textdb[textindex];
		}
	};

	var imgurlindex = 0;
	var imgurl = function (width, height) {
		return `https://picsum.photos/seed/${++imgurlindex}/${width ? width : 800}/${height ? height : 400}.webp`;
	};

	ex.sample = {
		text: text,
		imgurl: imgurl,

		offcanvasbody: function () {
			return ns.div([
				"Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.",
				ns.dropdown({
					label: "Drowdown button",
					color: "secondary",
					option: [
						{ href: "javascript:void(0);", label: "Action" },
						{ href: "javascript:void(0);", label: "Another action" },
						{ href: "javascript:void(0);", label: "Something else here" },
						{ value: "-" },
						{ href: "javascript:void(0);", label: "Separated link" },
					],
				}),
			]);
		},

		tab: function () {
			return [
				{ label: "First", elems: "This is first tab. " + text() },
				{ label: "Second", elems: "This is second tab. " + text() },
				{ label: "Third", elems: "This is third tab. " + text() },
				{ label: "Disabled", disabled: true, elems: "This is last tab. " + text() },
			];
		},

		optionitem: function () {
			return [
				{ value: "", label: "Open this select menu", selected: true },
				{ value: "1", label: "One" },
				{ value: "2", label: "Two" },
				{ value: "3", label: "Three" },
			];
		},

		dropdowntab: function () {
			return [
				{ label: "First", elems: "This is first tab. " + text() },
				{
					label: "Second",
					elems: "This is second tab. " + text(),
					option: [
						{ href: "javascript:void(0);", label: "Action" },
						{ href: "javascript:void(0);", label: "Another action" },
						{ value: "-", label: "" },
						{ href: "javascript:void(0);", label: "Something else here" },
					],
				},
				{ label: "Third", elems: "This is third tab. " + text() },
				{ label: "Disabled", disabled: true, elems: "This is last tab. " + text() },
			];
		},

		dlgFn: function (recipient) {
			ns.dlg
				.box({
					title: "Modal title",
					elems: ns.cont.singlecolumn([
						ns.input({
							type: "text",
							name: "recipient",
							label: "Recipient:",
							value: recipient,
						}),
						ns.input({
							type: "textarea",
							name: "message",
							label: "Message:",
							value: "",
						}),
					]),
					button: "sendmessageclose",
				})
				.then((data) => {
					ns.toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`);
				})
				.catch((err) => {});
		},

		dlgFirstModal: function () {
			ns.dlg.box({
				title: "Modal 1",
				elems: "Show a second modal and close this one with the button below.",
				button: [{ label: "Show second modal", onclick: "ex.sample.dlgSecondModal()" }],
			});
		},

		dlgSecondModal: function () {
			ns.dlg.box({
				title: "Modal 2",
				elems: "Close this modal and show the first with the button below.",
				button: [{ label: "Show first modal", onclick: "ex.sample.dlgFirstModal()" }],
			});
		},

		dlgFullscreenFn: function (fullscreen) {
			ns.dlg.box({
				fullscreen: fullscreen,
				title: "Modal title",
				elems: `Dialog with {{fullscreen : <b>${fullscreen}</b>}} option`,
				button: "okayonly",
			});
		},

		dlgSizeFn: function (size) {
			ns.dlg.box({
				size: size,
				title: "Modal title",
				elems: `Dialog with {{size : <b>${size}</b>}} option`,
				button: "okayonly",
			});
		},

		listgroupitem: function () {
			return [
				ns.listgroup.item("An item"),
				ns.listgroup.item("A second item"),
				ns.listgroup.item("A third item"),
				ns.listgroup.item("A fourth item"),
				ns.listgroup.item("And a fifth one"),
			];
		},

		listgroupitemcustomcontent: function () {
			return {
				class: "d-flex justify-content-between align-items-start",
				elems: [
					ns.div("ms-2 me-auto", [ns.div("fw-bold", "Subheading"), "Cras justo odio"]),
					ns.badge({
						pill: true,
						color: "primary",
						label: "14",
					}),
				],
			};
		},

		listgroupitem3: function () {
			return [
				ns.listgroup.item("An item"),
				ns.listgroup.item("A second item"),
				ns.listgroup.item("A third item"),
			];
		},

		fnClick: function (sender) {
			ns.toast("i", `${$(sender).text()} is clicked`);
		},

		dropdownitem: function () {
			return [
				{ href: "javascript:void(0);", label: "Action" },
				{ href: "javascript:void(0);", label: "Another action" },
				{ href: "javascript:void(0);", label: "Something else here" },
				{ value: "-" },
				{ href: "javascript:void(0);", label: "Separated link" },
			];
		},

		card: function () {
			return [
				ns.card.container({
					elems: [
						ns.card.img({
							placement: "top",
							src: imgurl(),
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
							src: imgurl(),
						}),
						ns.card.body([
							ns.card.title("Card Title"),
							ns.card.text(
								"This card has supporting text below as a natural lead-in to additional content."
							),
						]),
					],
				}),
				ns.card.container({
					elems: [
						ns.card.img({
							placement: "top",
							src: imgurl(),
						}),
						ns.card.body([
							ns.card.title("Card Title"),
							ns.card.text(
								"This card has supporting text below as a natural lead-in to additional content."
							),
						]),
					],
				}),
				ns.card.container({
					elems: [
						ns.card.img({
							placement: "top",
							src: imgurl(),
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
		},

		cardwithfooter: function () {
			return [
				ns.card.container({
					elems: [
						ns.card.img({
							placement: "top",
							src: imgurl(),
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
							src: imgurl(),
						}),
						ns.card.body([
							ns.card.title("Card Title"),
							ns.card.text(
								"This card has supporting text below as a natural lead-in to additional content."
							),
						]),
						ns.card.footer("Last updated 3 mins ago"),
					],
				}),
				ns.card.container({
					elems: [
						ns.card.img({
							placement: "top",
							src: imgurl(),
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
		},

		cardh100: function () {
			return [
				ns.card.container({
					class: "h-100",
					elems: [
						ns.card.img({
							placement: "top",
							src: imgurl(),
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
							src: imgurl(),
						}),
						ns.card.body([
							ns.card.title("Card Title"),
							ns.card.text(
								"This card has supporting text below as a natural lead-in to additional content."
							),
						]),
					],
				}),
				ns.card.container({
					class: "h-100",
					elems: [
						ns.card.img({
							placement: "top",
							src: imgurl(),
						}),
						ns.card.body([
							ns.card.title("Card Title"),
							ns.card.text(
								"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
							),
						]),
					],
				}),
			];
		},

		cardwithfooterh100: function () {
			return [
				ns.card.container({
					class: "h-100",
					elems: [
						ns.card.img({
							placement: "top",
							src: imgurl(),
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
							src: imgurl(),
						}),
						ns.card.body([
							ns.card.title("Card Title"),
							ns.card.text(
								"This card has supporting text below as a natural lead-in to additional content."
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
							src: imgurl(),
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
		},

		navbaritem: function (id, title) {
			return [
				ns.navbar.toggler({
					id: id,
					toggle: "collapse",
				}),

				ns.navbar.brand({
					label: title ? title : "Navbar",
				}),

				ns.navbar.collapsecontainer({
					id: id,
					elems: [
						ns.navbar.itemcontainer({
							parenttype: "collapse",
							elems: [
								ns.navbar.item({ label: "Home", active: true }),
								ns.navbar.item("Link"),
								ns.navbar.item({
									label: "Dropdown",
									option: ex.sample.dropdownitem(),
								}),
								ns.navbar.item({ label: "Disabled", disabled: true }),
							],
						}),
						ns.navbar.formcontainer([
							ns.input({
								type: "search",
								placeholder: "Search",
								hiddenlabel: "Search",
								class: "me-2",
							}),
							ns.button({ label: "Search", color: "success", outline: true }),
						]),
					],
				}),
			];
		},
	};
})(ex);

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

var e_img = [
	//$.img
	ns.example({
		title: "Example Image",
		msg: "This is an example to create image",
		container: ns.cont.stack,
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
		container: ns.cont.stack,
		code: function () {
			return [
				ns.a("Default"),
				ns.a({ color: "primary", label: "Primary" }),
				ns.a({ color: "secondary", label: "Secondary" }),
				ns.a({ color: "success", label: "Success", icon: "/" }),
				ns.a({
					color: "danger",
					label: "Danger",
					icon: { icon: "fire", spin: true, color: "warning" },
				}),
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
							{
								label: "Test",
								icon: "address-book",
								onclick: "window.location='ctl_test.html'",
							},
							{
								label: "Home",
								icon: "award",
								onclick: "window.location='index.html'",
							},
							{
								label: "Example",
								icon: "baby",
								onclick: "window.location='example.html'",
								active: true,
							},
							{
								label: "Change Theme",
								icon: "swatchbook",
								onclick: "ns.core.themeEditor()",
							},
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
							{
								label: "Test",
								icon: "address-book",
								onclick: "window.location='ctl_test.html'",
							},
							{
								label: "Home",
								icon: "award",
								onclick: "window.location='index.html'",
							},
							{
								label: "Example",
								icon: "baby",
								onclick: "window.location='example.html'",
								active: true,
							},
							{
								label: "Change Theme",
								icon: "swatchbook",
								onclick: "ns.core.themeEditor()",
							},
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

var e_introduction = [
	ns.div("text-center display-1", "Hello World"),
	ns.div("text-center display-5", [
		ns.icon({ style: "fab", icon: "bootstrap" }),
		ns.icon("swatchbook"),
		ns.icon({ style: "fab", icon: "font-awesome-flag" }),
		ns.icon({ style: "fab", icon: "node-js" }),
		ns.icon("leaf"),
	]),
	ns.div("text-center mt-5", "This is an alpha version. Don't used it. Build Bootstrap 5 using Javascript :)"),
	ns.div("text-center", [
		ns.a("Download base.js", "js/base.min.js"),
		" | ",
		ns.a("Github", "https://github.com/printf83/ns-p"),
	]),
];

var e_gutter = [
	ns.example({
		title: "Gutters",
		msg: "Gutters are the padding between your columns, used to responsively space and align content in the Bootstrap grid system.",
		anchor: false,
	}),

	ns.example({
		title: "How they work",
		msg: ns.ul([
			ns.li(
				"<b>Gutters are the gaps between column content, created by horizontal {{padding}}.</b> We set {{padding-right}} and {{padding-left}} on each column, and use negative margin to offset that at the start and end of each row to align content."
			),
			ns.li(
				"<b>Gutters start at {{1.5rem }}({{24px}}) wide.</b> This allows us to match our grid to the <a href='https://getbootstrap.com/docs/5.0/utilities/spacing/'>padding and margin spacers</a> scale."
			),
			ns.li(
				"<b>Gutters can be responsively adjusted.</b> Use breakpoint-specific gutter classes to modify horizontal gutters, vertical gutters, and all gutters."
			),
		]),
	}),

	ns.example({
		title: "Horizontal gutters",
		msg: "{{.gx-*}} classes can be used to control the horizontal gutter widths. The {{.container}} or {{.container-fluid}} parent may need to be adjusted if larger gutters are used too to avoid unwanted overflow, using a matching padding utility. For example, in the following example we’ve increased the padding with {{.px-4}}:",
		container: function (elems) {
			return elems;
		},
		code: function () {
			return ns.div(
				"container px-4",
				ns.div("row gx-5", Array(2).fill(ns.div("col", ns.div("p-3 border bg-light", "Custom column padding"))))
			);
		},
	}),

	ns.example({
		msg: "An alternative solution is to add a wrapper around the {{.row}} with the {{.overflow-hidden}} class:",
		container: function (elems) {
			return elems;
		},
		code: function () {
			return ns.div("container overflow-hidden", [
				ns.div(
					"row gx-5",
					ns.div(
						"row gx-5",
						Array(2).fill(ns.div("col", ns.div("p-3 border bg-light", "Custom column padding")))
					)
				),
			]);
		},
	}),

	ns.example({
		title: "Vertical gutters",
		msg: "{{.gy-*}} classes can be used to control the vertical gutter widths. Like the horizontal gutters, the vertical gutters can cause some overflow below the {{.row}} at the end of a page. If this occurs, you add a wrapper around {{.row}} with the {{.overflow-hidden}} class:",
		container: function (elems) {
			return elems;
		},
		code: function () {
			return ns.div("container overflow-hidden", [
				ns.div(
					"row gy-5",
					Array(4).fill(ns.div("col-6", ns.div("p-3 border bg-light", "Custom column padding")))
				),
			]);
		},
	}),

	ns.example({
		title: "Horizontal & vertical gutters",
		msg: "{{.g-*}} classes can be used to control the horizontal gutter widths, for the following example we use a smaller gutter width, so there won’t be a need to add the {{.overflow-hidden}} wrapper class.",
		container: function (elems) {
			return elems;
		},
		code: function () {
			return ns.div("container", [
				ns.div(
					"row g-2",
					Array(4).fill(ns.div("col-6", ns.div("p-3 border bg-light", "Custom column padding")))
				),
			]);
		},
	}),

	ns.example({
		title: "Row columns gutters",
		msg: "Gutter classes can also be added to <a href='https://getbootstrap.com/docs/5.0/layout/grid/#row-columns'>row columns</a>. In the following example, we use responsive row columns and responsive gutter classes.",
		container: function (elems) {
			return elems;
		},
		code: function () {
			return ns.div("container", [
				ns.div(
					"row row-cols-2 row-cols-lg-5 g-2 g-lg-3",
					Array(10).fill(ns.div("col-6", ns.div("p-3 border bg-light", "Row column")))
				),
			]);
		},
	}),

	ns.example({
		title: "No gutters",
		msg: [
			"The gutters between columns in our predefined grid classes can be removed with {{.g-0}}. This removes the negative {{margins}} from {{.row}} and the horizontal {{padding}} from all immediate children columns.",
			"<b>Need an edge-to-edge design?</b> Drop the parent {{.container}} or {{.container-fluid.}}",
			"In practice, here’s how it looks. Note you can continue to use this with all other predefined grid classes (including column widths, responsive tiers, reorders, and more).",
		],
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col",
		code: function () {
			return ns.div("row g-0", [
				ns.div("col-sm-6 col-md-8", ".col-sm-6 .col-md-8"),
				ns.div("col-6 col-md-4", ".col-6 .col-md-4"),
			]);
		},
	}),
];

var e_column = [
	ns.example({
		title: "Columns",
		msg: "Learn how to modify columns with a handful of options for alignment, ordering, and offsetting thanks to our flexbox grid system. Plus, see how to use column classes to manage widths of non-grid elements.",
		anchor: false,
	}),

	ns.example({
		msg: ns.alert.container({
			color: "primary",
			elems: "<b>Heads up!</b> Be sure to <a href='https://getbootstrap.com/docs/5.1/layout/grid/'>read the Grid page</a> first before diving into how to modify and customize your grid columns.",
		}),
	}),

	ns.example({
		title: "How they work",
		msg: ns.ul([
			ns.li(
				"<b>Columns build on the grid’s flexbox architecture.</b> Flexbox means we have options for changing individual columns and modifying groups of columns at the row level. You choose how columns grow, shrink, or otherwise change."
			),
			ns.li(
				"<b>When building grid layouts, all content goes in columns.</b> The hierarchy of Bootstrap’s grid goes from container to row to column to your content. On rare occasions, you may combine content and column, but be aware there can be unintended consequences."
			),
			ns.li(
				"<b>Bootstrap includes predefined classes for creating fast, responsive layouts.</b> With six breakpoints and a dozen columns at each grid tier, we have dozens of classes already built for you to create your desired layouts. This can be disabled via Sass if you wish."
			),
		]),
	}),

	ns.example({
		title: "Alignment",
		msg: "Use flexbox alignment utilities to vertically and horizontally align columns.",
	}),

	ns.example({
		title: "Vertical alignment",
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col ns-higlight-row px-1",
		code: function () {
			return ns.div(
				"container",
				["row align-items-start", "row align-items-center", "row align-items-end"].map(function (i) {
					return ns.div({
						class: i,
						style: { minHeight: "10rem" },
						elems: Array(3).fill(ns.div("col", "One of three columns")),
					});
				})
			);
		},
	}),

	ns.example({
		title: "Vertical alignment",
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col ns-higlight-row px-1",
		code: function () {
			return ns.div("container", [
				ns.div("row", null, { minHeight: "10rem" }, [
					ns.div("col align-self-start", "One of three columns"),
					ns.div("col align-self-center", "One of three columns"),
					ns.div("col align-self-end", "One of three columns"),
				]),
			]);
		},
	}),

	ns.example({
		title: "Horizontal alignment",
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-1",
		code: function () {
			return ns.div(
				"container",
				[
					"row justify-content-start",
					"row justify-content-center",
					"row justify-content-end",
					"row justify-content-around",
					"row justify-content-between",
					"row justify-content-evenly",
				].map(function (i) {
					return ns.div(i, Array(2).fill(ns.div("col-4", "One of two columns")));
				})
			);
		},
	}),

	ns.example({
		title: "Column wrapping",
		msg: "If more than 12 columns are placed within a single row, each group of extra columns will, as one unit, wrap onto a new line.",
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-1",
		code: function () {
			return ns.div("container", [
				ns.div("row", [
					ns.div("col-9", ".col-9"),
					ns.div(
						"col-4",
						".col-4 : Since 9 + 4 = 13 &gt; 12, this 4-column-wide div gets wrapped onto a new line as one contiguous unit."
					),
					ns.div("col-6", ".col-6 : Subsequent columns continue along the new line."),
				]),
			]);
		},
	}),

	ns.example({
		title: "Column breaks",
		msg: "Breaking columns to a new line in flexbox requires a small hack: add an element with width: 100% wherever you want to wrap your columns to a new line. Normally this is accomplished with multiple .rows, but not every implementation method can account for this.",
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-1",
		code: function () {
			return ns.div("container", [
				ns.div("row", [
					ns.div("col-6 col-sm-3", ".col-6 .col-sm-3"),
					ns.div("col-6 col-sm-3", ".col-6 .col-sm-3"),
					ns.span("w-100", null),
					ns.div("col-6 col-sm-3", ".col-6 .col-sm-3"),
					ns.div("col-6 col-sm-3", ".col-6 .col-sm-3"),
				]),
			]);
		},
	}),

	ns.example({
		msg: "You may also apply this break at specific breakpoints with our responsive display utilities.",
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-1",
		code: function () {
			return ns.div("container", [
				ns.div("row", [
					ns.div("col-6 col-sm-3", ".col-6 .col-sm-3"),
					ns.div("col-6 col-sm-3", ".col-6 .col-sm-3"),
					ns.span("w-100 d-none d-md-block", null),
					ns.div("col-6 col-sm-3", ".col-6 .col-sm-3"),
					ns.div("col-6 col-sm-3", ".col-6 .col-sm-3"),
				]),
			]);
		},
	}),

	ns.example({
		title: "Reordering",
	}),

	ns.example({
		title: "Order classes",
		msg: "Use {{.order-}} classes for controlling the <b>visual order</b> of your content. These classes are responsive, so you can set the {{order}} by breakpoint (e.g., {{.order-1.order-md-2}}). Includes support for 1 through 5 across all six grid tiers.",
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-1",
		code: function () {
			return ns.div("container", [
				ns.div("row", [
					ns.div("col", "First in DOM, no order applied"),
					ns.div("col order-5", "Second in DOM, with a larger order"),
					ns.div("col order-1", "Third in DOM, with an order of 1"),
				]),
			]);
		},
	}),

	ns.example({
		title: "Offsetting columns",
		msg: "You can offset grid columns in two ways: our responsive {{.offset-}} grid classes and our margin utilities. Grid classes are sized to match columns while margins are more useful for quick layouts where the width of the offset is variable.",
	}),

	ns.example({
		title: "Offset classes",
		msg: "Move columns to the right using {{.offset-md-*}} classes. These classes increase the left margin of a column by {{*}} columns. For example, {{.offset-md-4}} moves {{.col-md-4}} over four columns.",
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-1",
		code: function () {
			return ns.div("container", [
				ns.div("row", [
					ns.div("col-md-4", ".col-md-4"),
					ns.div("col-md-4 offset-md-4", ".col-md-4 .offset-md-4"),
				]),
				ns.div("row", [
					ns.div("col-md-3 offset-md-3", ".col-md-3 .offset-md-3"),
					ns.div("col-md-3 offset-md-3", ".col-md-3 .offset-md-3"),
				]),
				ns.div("row", [ns.div("col-md-6 offset-md-3", ".col-md-6 .offset-md-3")]),
			]);
		},
	}),

	ns.example({
		msg: "In addition to column clearing at responsive breakpoints, you may need to reset offsets. See this in action in the grid example.",
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-1",
		code: function () {
			return ns.div("container", [
				ns.div("row", [
					ns.div("col-sm-5 col-md-6", ".col-sm-5 .col-md-6"),
					ns.div(
						"col-sm-5 offset-sm-2 col-md-6 offset-md-0",
						".col-sm-5 .offset-sm-2 .col-md-6 .offset-md-0"
					),
				]),
				ns.div("row", [
					ns.div("col-sm-6 col-md-5 col-lg-6", ".col-sm-6 .col-md-5 .col-lg-6"),
					ns.div(
						"col-sm-6 col-md-5 offset-md-2 col-lg-6 offset-lg-0",
						".col-sm-6 .col-md-5 .offset-md-2 .col-lg-6 .offset-lg-0"
					),
				]),
			]);
		},
	}),

	ns.example({
		title: "Margin utilities",
		msg: "With the move to flexbox in v4, you can use margin utilities like .me-auto to force sibling columns away from one another.",
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-1",
		code: function () {
			return ns.div("container", [
				ns.div("row", [ns.div("col-md-4", ".col-md-4"), ns.div("col-md-4 ms-auto", ".col-md-4 .ms-auto")]),
				ns.div("row", [
					ns.div("col-md-4 ms-auto", ".col-md-4 .ms-auto"),
					ns.div("col-md-4 ms-auto", ".col-md-4 .ms-auto"),
				]),
				ns.div("row", [ns.div("col-auto ms-auto", ".col-auto .ms-auto"), ns.div("col-auto", ".col-auto")]),
			]);
		},
	}),

	ns.example({
		title: "Standalone column classes",
		msg: "The .col-* classes can also be used outside a .row to give an element a specific width. Whenever column classes are used as non direct children of a row, the paddings are omitted.",
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-3",
		code: function () {
			return [
				ns.div("col-3 bg-light p-3 border", "  .col-3: width of 25%"),
				ns.div("col-sm-9 bg-light p-3 border", " .col-sm-9: width of 75% above sm breakpoint"),
			];
		},
	}),

	ns.example({
		msg: "The classes can be used together with utilities to create responsive floated images. Make sure to wrap the content in a .clearfix wrapper to clear the float if the text is shorter.",
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-3",
		code: function () {
			return ns.div("clearfix", [
				ns.img({ src: ex.sample.imgurl(200, 200), class: "col-md-6 float-md-end mb-3 ms-md-3" }),
				ns.p(ex.sample.text()),
				ns.p(ex.sample.text()),
				ns.p(ex.sample.text()),
			]);
		},
	}),
];

var e_grid = [
	ns.example({
		title: "Grid system",
		msg: "Use our powerful mobile-first flexbox grid to build layouts of all shapes and sizes thanks to a twelve column system, six default responsive tiers, Sass variables and mixins, and dozens of predefined classes.",
		anchor: false,
	}),

	ns.example({
		title: "Example",
		msg: [
			"Bootstrap’s grid system uses a series of containers, rows, and columns to layout and align content. It’s built with flexbox and is fully responsive. Below is an example and an in-depth explanation for how the grid system comes together.",
			ns.alert.container(
				"primary",
				"New to or unfamiliar with flexbox? Read this CSS Tricks flexbox guide for background, terminology, guidelines, and code snippets."
			),
		],
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-1",
		code: function () {
			return ns.div(
				"container",
				ns.div("row", [ns.div("col", "Column"), ns.div("col", "Column"), ns.div("col", "Column")])
			);
		},
	}),

	ns.example({
		title: "Equal-width",
		msg: "For example, here are two grid layouts that apply to every device and viewport, from xs to xxl. Add any number of unit-less classes for each breakpoint you need and every column will be the same width.",
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-1",
		code: function () {
			return ns.div("container", [
				ns.div("row", [ns.div("col", "1 of 2"), ns.div("col", "2 of 2")]),
				ns.div("row", [ns.div("col", "1 of 3"), ns.div("col", "2 of 3"), ns.div("col", "3 of 3")]),
			]);
		},
	}),

	ns.example({
		title: "Setting one column width",
		msg: "Auto-layout for flexbox grid columns also means you can set the width of one column and have the sibling columns automatically resize around it. You may use predefined grid classes (as shown below), grid mixins, or inline widths. Note that the other columns will resize no matter the width of the center column.",
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-1",
		code: function () {
			return ns.div("container", [
				ns.div("row", [ns.div("col", "1 of 3"), ns.div("col-6", "2 of 3 (wider)"), ns.div("col", "3 of 3")]),
				ns.div("row", [ns.div("col", "1 of 3"), ns.div("col-5", "2 of 3 (wider)"), ns.div("col", "3 of 3")]),
			]);
		},
	}),

	ns.example({
		title: "Variable width content",
		msg: "Use col-{breakpoint}-auto classes to size columns based on the natural width of their content.",
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-1",
		code: function () {
			return ns.div("container", [
				ns.div("row justify-content-md-center", [
					ns.div("col col-lg-2", "1 of 3"),
					ns.div("col-md-auto", "Variable width content"),
					ns.div("col col-lg-2", "3 of 3"),
				]),
				ns.div("row", [
					ns.div("col", "1 of 3"),
					ns.div("col-md-auto", "Variable width content"),
					ns.div("col col-lg-2", "3 of 3"),
				]),
			]);
		},
	}),

	ns.example({
		title: "All breakpoints",
		msg: "For grids that are the same from the smallest of devices to the largest, use the .col and .col-* classes. Specify a numbered class when you need a particularly sized column; otherwise, feel free to stick to .col.",
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-1",
		code: function () {
			return ns.div("container", [
				ns.div("row", [ns.div("col", "col"), ns.div("col", "col"), ns.div("col", "col"), ns.div("col", "col")]),
				ns.div("row", [ns.div("col-8", "col-8"), ns.div("col-4", "col-4")]),
			]);
		},
	}),

	ns.example({
		title: "Stacked to horizontal",
		msg: "Using a single set of .col-sm-* classes, you can create a basic grid system that starts out stacked and becomes horizontal at the small breakpoint (sm).",
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-1",
		code: function () {
			return ns.div("container", [
				ns.div("row", [ns.div("col-sm-8", "col-sm-8"), ns.div("col-sm-4", "col-sm-4")]),
				ns.div("row", [
					ns.div("col-sm", "col-sm"),
					ns.div("col-sm", "col-sm"),
					ns.div("col-sm", "col-sm"),
					ns.div("col-sm", "col-sm"),
				]),
			]);
		},
	}),

	ns.example({
		title: "Mix and match",
		msg: "Don’t want your columns to simply stack in some grid tiers? Use a combination of different classes for each tier as needed. See the example below for a better idea of how it all works.",
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-1",
		code: function () {
			return ns.div("container", [
				//Stack the columns on mobile by making one full-width and the other half-width
				ns.div("row", [ns.div("col-md-8", "col-md-8"), ns.div("col-6 col-md-4", "col-6 col-md-4")]),
				//Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop
				ns.div("row", [
					ns.div("col-6 col-md-4", "col-6 col-md-4"),
					ns.div("col-6 col-md-4", "col-6 col-md-4"),
					ns.div("col-6 col-md-4", "col-6 col-md-4"),
				]),
				//Columns are always 50% wide, on mobile and desktop
				ns.div("row", [ns.div("col-6", "col-6"), ns.div("col-6", "col-6")]),
			]);
		},
	}),

	ns.example({
		title: "Row columns",
		msg: [
			"Use the responsive .row-cols-* classes to quickly set the number of columns that best render your content and layout. Whereas normal .col-* classes apply to the individual columns (e.g., .col-md-4), the row columns classes are set on the parent .row as a shortcut. With .row-cols-auto you can give the columns their natural width.",
			"Use these row columns classes to quickly create basic grid layouts or to control your card layouts.",
		],
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-1",
		code: function () {
			return ns.div("container", [
				ns.div("row row-cols-2", [
					ns.div("col", "Column"),
					ns.div("col", "Column"),
					ns.div("col", "Column"),
					ns.div("col", "Column"),
				]),
			]);
		},
	}),

	ns.example({
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-1",
		code: function () {
			return ns.div("container", [
				ns.div("row row-cols-3", [
					ns.div("col", "Column"),
					ns.div("col", "Column"),
					ns.div("col", "Column"),
					ns.div("col", "Column"),
				]),
			]);
		},
	}),

	ns.example({
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-1",
		code: function () {
			return ns.div("container", [
				ns.div("row row-cols-auto", [
					ns.div("col", "Column"),
					ns.div("col", "Column"),
					ns.div("col", "Column"),
					ns.div("col", "Column"),
				]),
			]);
		},
	}),

	ns.example({
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-1",
		code: function () {
			return ns.div("container", [
				ns.div("row row-cols-4", [
					ns.div("col", "Column"),
					ns.div("col", "Column"),
					ns.div("col", "Column"),
					ns.div("col", "Column"),
				]),
			]);
		},
	}),

	ns.example({
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-1",
		code: function () {
			return ns.div("container", [
				ns.div("row row-cols-4", [
					ns.div("col", "Column"),
					ns.div("col", "Column"),
					ns.div("col-6", "Column"),
					ns.div("col", "Column"),
				]),
			]);
		},
	}),

	ns.example({
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-1",
		code: function () {
			return ns.div("container", [
				ns.div("row row-cols-1 row-cols-sm-2 row-cols-md-4", [
					ns.div("col", "Column"),
					ns.div("col", "Column"),
					ns.div("col", "Column"),
					ns.div("col", "Column"),
				]),
			]);
		},
	}),

	ns.example({
		title: "Nesting",
		msg: "To nest your content with the default grid, add a new .row and set of .col-sm-* columns within an existing .col-sm-* column. Nested rows should include a set of columns that add up to 12 or fewer (it is not required that you use all 12 available columns).",
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-col px-1",
		code: function () {
			return ns.div("container", [
				ns.div("row", [
					ns.div("col-sm-3", "Level 1: col-sm-3"),
					ns.div(
						"col-sm-9",
						ns.div("row", [
							ns.div("col-8 col-sm-6", "Level 2: col-8 col-sm-6"),
							ns.div("col-4 col-sm-6", "Level 2: col-4 col-sm-6"),
						])
					),
				]),
			]);
		},
	}),
];

var e_container = [
	ns.example({
		title: "Containers",
		msg: "Containers are a fundamental building block of Bootstrap that contain, pad, and align your content within a given device or viewport.",
		anchor: false,
	}),

	ns.example({
		title: "How they work",
		msg: [
			"Containers are the most basic layout element in Bootstrap and are <b>required when using Bootstrap default grid system</b>. Containers are used to contain, pad, and (sometimes) center the content within them. While containers can be nested, most layouts do not require a nested container.",
			"Bootstrap comes with three different containers:",
			ns.ul([
				ns.li("{{.container}}, which sets a {{max-width}} at each responsive breakpoint"),
				ns.li("{{.container-fluid}}, which is {{width: 100%}} at all breakpoints"),
				ns.li("{{.container-{breakpoint&#125;}} which is {{width: 100%}} until the specified breakpoint"),
			]),
			"The table below illustrates how each container’s {{max-width}} compares to the original {{.container}} and {{.container-fluid}} across each breakpoint.",
			"See them in action and compare them in our <a href='https://getbootstrap.com/docs/5.1/examples/grid/#containers'>Grid example</a>.",
			ns.table({ bolderheadborder: true }, [
				[
					"",
					"<b>Extra small</b><br/>&lt;576px",
					"<b>Small</b><br/>≥576px",
					"<b>Medium</b><br/>≥768px",
					"<b>Large</b><br/>≥992px",
					"<b>X-Large</b><br/>≥1200px",
					"<b>XX-Large</b><br/>≥1400px",
				],
				["{{.container}}", "100%", "540px", "720px", "960px", "1140px", "1320px"],
				["{{.container-sm}}", "100%", "540px", "720px", "960px", "1140px", "1320px"],
				["{{.container-md}}", "100%", "100%", "720px", "960px", "1140px", "1320px"],
				["{{.container-lg}}", "100%", "100%", "100%", "960px", "1140px", "1320px"],
				["{{.container-xl}}", "100%", "100%", "100%", "100%", "1140px", "1320px"],
				["{{.container-xxl}}", "100%", "100%", "100%", "100%", "100%", "1320px"],
				["{{.container-fluid}}", "100%", "100%", "100%", "100%", "100%", "100%"],
			]),
		],
	}),

	ns.example({
		title: "Default container",
		msg: "Bootstrap default .container class is a responsive, fixed-width container, meaning its max-width changes at each breakpoint.",
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-container",
		code: function () {
			return ns.div("container", "Content here");
		},
	}),

	ns.example({
		title: "Responsive containers",
		msg: "Responsive containers allow you to specify a class that is 100% wide until the specified breakpoint is reached, after which we apply max-widths for each of the higher breakpoints. For example, .container-sm is 100% wide to start until the sm breakpoint is reached, where it will scale up with md, lg, xl, and xxl.",
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-container",
		code: function () {
			return [
				ns.div("container-sm", "100% wide until small breakpoint"),
				ns.div("container-md", "100% wide until medium breakpoint"),
				ns.div("container-lg", "100% wide until large breakpoint"),
				ns.div("container-xl", "100% wide until extra large breakpoint"),
				ns.div("container-xxl", "100% wide until extra extra large breakpoint"),
			];
		},
	}),

	ns.example({
		title: "Fluid containers",
		msg: "Use .container-fluid for a full width container, spanning the entire width of the viewport.",
		container: function (elems) {
			return elems;
		},
		pclass: "ns-higlight-container",
		code: function () {
			return ns.div("container-fluid", "Content here");
		},
	}),
];

var e_icon = [
	ns.example({
		title: "Icons",
		msg: "Guidance and suggestions for using external icon libraries with Bootstrap.",
		anchor: false,
	}),

	ns.example({
		msg: [
			"While Bootstrap doesn’t include an icon set by default, we do have our own comprehensive icon library called Bootstrap Icons. Feel free to use them or any other icon set in your project. We’ve included details for Bootstrap Icons and other preferred icon sets below.",
			"While most icon sets include multiple file formats, we prefer SVG implementations for their improved accessibility and vector support.",
		],
	}),

	ns.example({
		title: "Favicon",
		container: ns.cont.stack,
		code: function () {
			return ns.icon("favicon");
		},
	}),

	ns.example({
		title: "Base icon",
		container: ns.cont.stack,
		code: function () {
			return ["i", "!-danger", "!!", "!", "?", "-", "x", "/", "save", "delete", "lock", "shield", "logout"].map(
				function (i) {
					return ns.icon(i);
				}
			);
		},
	}),

	ns.example({
		title: "Fontawesome icon",
		container: ns.cont.stack,
		code: function () {
			return [
				"address-book",
				"arrow-alt-circle-down",
				"bell",
				"calendar-alt",
				"chart-bar",
				"check-circle",
				"clipboard",
				"clock",
				"credit-card",
				"file-image",
				"hand-peace",
				"kiss-wink-heart",
				"star",
			].map(function (i) {
				return ns.icon(i);
			});
		},
	}),

	ns.example({
		title: "Fontawesome brand icon",
		container: ns.cont.stack,
		code: function () {
			return [
				"github",
				"css3",
				"html5",
				"js-square",
				"node-js",
				"font-awesome",
				"bootstrap",
				"edge",
				"firefox",
				"chrome",
			].map(function (i) {
				return ns.icon({ style: "fab", icon: i });
			});
		},
	}),

	ns.example({
		title: "Color",
		code: function () {
			return ns.icon({ style: "fab", icon: "node-js", color: "success" });
		},
	}),

	ns.example({
		title: "Fixwidth",
		container: ns.cont.stack,
		code: function () {
			return [
				ns.icon({
					style: "fab",
					icon: "node-js",
					fixwidth: true,
					class: "border p-3",
					size: "lg",
				}),
				ns.icon({
					style: "fab",
					icon: "node-js",
					fixwidth: false,
					class: "border p-3",
					size: "lg",
				}),
			];
		},
	}),

	ns.example({
		title: "Size",
		container: ns.cont.stack,
		code: function () {
			return ["xs", "sm", null, "lg", "2x", "3x", "4x"].map(function (i) {
				return ns.icon({ style: "fab", icon: "node-js", size: i });
			});
		},
	}),

	ns.example({
		title: "Rotate",
		container: ns.cont.stack,
		code: function () {
			return [
				ns.icon({ style: "fab", icon: "node-js", rotate: 90 }),
				ns.icon({ style: "fab", icon: "node-js", rotate: 180 }),
				ns.icon({ style: "fab", icon: "node-js", rotate: 270 }),
				ns.icon({ style: "fab", icon: "node-js", rotate: "horizontal" }),
				ns.icon({ style: "fab", icon: "node-js", rotate: "vertical" }),
				ns.icon({ style: "fab", icon: "node-js", rotate: "both" }),
			];
		},
	}),

	ns.example({
		title: "Spin",
		container: ns.cont.stack,
		code: function () {
			return [
				ns.icon({ style: "fab", icon: "node-js", spin: true }),
				ns.icon({ icon: "spinner", spin: true }),
				ns.icon({ icon: "circle-notch", spin: true }),
				ns.icon({ icon: "slash", spin: true }),
				ns.icon({ icon: "fan", spin: true }),
				ns.icon({ icon: "crosshairs", spin: true }),
				ns.icon({ icon: "sync", spin: true }),
				ns.icon({ icon: "cog", spin: true }),
				ns.icon({ icon: "compact-disc", spin: true }),
				ns.icon({ icon: "compass", spin: true }),
				ns.icon({ icon: "wrench", spin: true }),
				ns.icon({ icon: "snowflake", spin: true }),
			];
		},
	}),

	ns.example({
		title: "Using with another object",
	}),

	ns.example({
		title: "Button",
		container: ns.cont.stack,
		code: function () {
			return [
				ns.button({ label: "Button", color: "primary", icon: "fire" }),
				ns.button({
					label: "Button",
					color: "warning",
					icon: {
						color: "danger",
						icon: "fire",
					},
				}),
				ns.button({
					label: "Button",
					color: "success",
					icon: ns.icon({
						color: "warning",
						icon: "fire",
					}),
				}),
			];
		},
	}),

	ns.example({
		title: "Textbox",
		container: ns.cont.stack,
		code: function () {
			return [
				ns.input({ type: "text", before: ns.icon("fire") }),
				ns.input({
					type: "text",
					before: ns.icon({
						color: "danger",
						icon: "fire",
					}),
				}),
			];
		},
	}),

	ns.example({
		title: "Dropdown & item",
		container: ns.cont.stack,
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
		code: function () {
			return ns.dropdown({
				label: "Dropdown",
				color: "primary",
				icon: "fire",
				option: [
					{ href: "javascript:void(0);", label: "Copy", icon: "copy" },
					{ href: "javascript:void(0);", label: "Cut", icon: "cut" },
					{ href: "javascript:void(0);", label: "Paste", icon: "paste" },
					{ value: "-" },
					{ href: "javascript:void(0);", label: "Setting", icon: "sliders-h" },
				],
			});
		},
	}),

	ns.example({
		title: "Navbar",
		container: ns.cont.stack,
		code: function () {
			return ns.navbar.container({
				expand: "lg",
				elems: [
					ns.navbar.brand({
						label: "Navbar",
						icon: { icon: "fire", color: "danger" },
						href: "javascript:void(0);",
					}),
				],
			});
		},
	}),

	ns.example({
		title: "Nav tab",
		sample: { "ex.sample.text": ex.sample.text },
		code: function () {
			return ns.nav({
				style: "tab",
				elems: [
					{ icon: "fire", label: "First", elems: "This is first tab. " + ex.sample.text() },
					{ label: "Second", elems: "This is second tab. " + ex.sample.text() },
					{ label: "Third", elems: "This is third tab. " + ex.sample.text() },
					{ label: "Disabled", disabled: true, elems: "This is last tab. " + ex.sample.text() },
				],
			});
		},
	}),
];

var e_tooltip = [
	ns.example({
		title: "Tooltips",
		msg: "Documentation and examples for adding custom Bootstrap tooltips with CSS and JavaScript using CSS3 for animations and data-bs-attributes for local title storage.",
		anchor: false,
	}),

	ns.example({
		title: "Four direction",
		container: ns.cont.stack,
		code: function () {
			return [
				ns.button({
					label: "Tooltip on top",
					color: "secondary",
					tooltip: {
						type: "tooltip",
						msg: "Top tooltip",
						placement: "top",
					},
				}),

				ns.button({
					label: "Tooltip on left",
					color: "secondary",
					tooltip: {
						type: "tooltip",
						msg: "Left tooltip",
						placement: "left",
					},
				}),

				ns.button({
					label: "Tooltip on right",
					color: "secondary",
					tooltip: {
						type: "tooltip",
						msg: "Right tooltip",
						placement: "right",
					},
				}),

				ns.button({
					label: "Tooltip on bottom",
					color: "secondary",
					tooltip: {
						type: "tooltip",
						msg: "Bottom tooltip",
						placement: "bottom",
					},
				}),

				ns.button({
					label: "Tooltip with HTML",
					color: "secondary",
					tooltip: {
						type: "tooltip",
						msg: "<em>Tooltip</em> <u>with</u> <b>HTML</b>",
						placement: "right",
					},
				}),
			];
		},
	}),

	ns.example({
		title: "Disabled elements",
		msg: [
			"Elements with the disabled attribute aren’t interactive, meaning users cannot hover or click them to trigger a tooltip (or popover). As a workaround, you’ll want to trigger the popover from a wrapper {{div}} or {{span}}, ideally made keyboard-focusable using {{tabindex='0'}}.",
		],
		code: function () {
			return ns.tooltip(
				{
					type: "tooltip",
					msg: "And here's some amazing content. It's very engaging. Right?",
					placement: "right",
				},
				{
					tag: "span",
					class: "d-inline-block",
					attr: { tabindex: "0" },
					elems: ns.button({
						label: "Dismissible tooltip",
						color: "primary",
						disabled: true,
					}),
				}
			);
		},
	}),
];

var e_toast = [
	ns.example({
		title: "Toasts",
		msg: "Push notifications to your visitors with a toast, a lightweight and easily customizable alert message.",
		anchor: false,
	}),

	ns.example({
		title: "Basic",
		label: "Show toast",
		code: function () {
			ns.toast({
				icon: { icon: "fire", color: "primary" },
				title: "Toast header",
				msg: "Hello, world! This is a toast message.",
			});
		},
	}),

	ns.example({
		title: "Base icon",
		container: ns.cont.stack,
		code: function () {
			return [
				ns.button({
					color: "primary",
					label: "primary",
					onclick: function () {
						ns.toast("i", "Example primary toast");
					},
				}),
				ns.button({
					color: "warning",
					label: "Warning",
					onclick: function () {
						ns.toast("!", "Example warning toast");
					},
				}),

				ns.button({
					color: "success",
					label: "Success",
					onclick: function () {
						ns.toast("/", "Example success toast");
					},
				}),

				ns.button({
					color: "danger",
					label: "Danger",
					onclick: function () {
						ns.toast("x", "Example danger toast");
					},
				}),
			];
		},
	}),

	ns.example({
		title: "Color",
		container: ns.cont.stack,
		code: function () {
			return [
				ns.button({
					color: "primary",
					label: "primary",
					onclick: function () {
						ns.toast({
							color: "primary",
							textcolor: "light",
							msg: "Example primary toast",
						});
					},
				}),
				ns.button({
					color: "warning",
					label: "Warning",
					onclick: function () {
						ns.toast({
							color: "warning",
							textcolor: "dark",
							msg: "Example warning toast",
						});
					},
				}),

				ns.button({
					color: "success",
					label: "Success",
					onclick: function () {
						ns.toast({
							color: "success",
							textcolor: "light",
							msg: "Example success toast",
						});
					},
				}),

				ns.button({
					color: "danger",
					label: "Danger",
					onclick: function () {
						ns.toast({
							color: "danger",
							textcolor: "light",
							msg: "Example danger toast",
						});
					},
				}),
			];
		},
	}),

	ns.example({
		title: "Position",
		container: ns.cont.stack,
		code: function () {
			return [
				{ label: "Top left", position: "top-0 start-0" },
				{ label: "Top center", position: "top-0 start-50 translate-middle-x" },
				{ label: "Top right", position: "top-0 end-0" },

				{ label: "Middle left", position: "top-50 start-0 translate-middle-y" },
				{ label: "Middle center", position: "top-50 start-50 translate-middle" },
				{ label: "Middle right", position: "top-50 end-0 translate-middle-y" },

				{ label: "Bottom left", position: "bottom-0 start-0" },
				{ label: "Bottom center", position: "bottom-0 start-50 translate-middle-x" },
				{ label: "Bottom right", position: "bottom-0 end-0" },
			].map(function (i) {
				return ns.button({
					color: "primary",
					label: i.label,
					onclick: function () {
						ns.toast({ position: i.position, icon: "i", msg: `${i.label} toast.` });
					},
				});
			});
		},
	}),

	ns.example({
		title: "Disable autoclose",
		label: "Show toast",
		code: function () {
			ns.toast({
				autohide: false,
				color: "warning",
				icon: { icon: "fire", color: "danger" },
				title: "Toast header",
				msg: "Hello, world! This is a toast message.",
			});
		},
	}),

	ns.example({
		title: "Delay autoclose",
		label: "Show toast",
		code: function () {
			ns.toast({
				delay: 10000,
				color: "primary",
				textcolor: "light",
				icon: { icon: "fire", color: "info" },
				title: "Toast header",
				msg: "This toast will close in 10 seconds.",
			});
		},
	}),
];

var e_spinner = [
	ns.example({
		title: "Spinners",
		msg: "Indicate the loading state of a component or page with Bootstrap spinners, built entirely with HTML, CSS, and JavaScript.",
		anchor: false,
	}),

	ns.example({
		title: "Border spinner",
		code: function () {
			return ns.spinner();
		},
	}),

	ns.example({
		title: "Colors",
		container: ns.cont.stack,
		code: function () {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(function (i) {
				return ns.spinner({ color: i });
			});
		},
	}),

	ns.example({
		title: "Growing spinner",
		code: function () {
			return ns.spinner({ grow: true });
		},
	}),

	ns.example({
		title: "Colors",
		container: ns.cont.stack,
		code: function () {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(function (i) {
				return ns.spinner({ grow: true, color: i });
			});
		},
	}),

	ns.example({
		title: "Aligment",
	}),

	ns.example({
		title: "Margin",
		code: function () {
			return ns.spinner({ class: "m-5" });
		},
	}),

	ns.example({
		title: "Placement",
	}),

	ns.example({
		title: "Flex",
		code: function () {
			return ns.div("d-flex justify-content-between", ns.spinner());
		},
	}),

	ns.example({
		code: function () {
			return ns.div("d-flex justify-content-between", [
				{ tag: "strong", elems: "Loading..." },
				ns.spinner({ label: "" }),
			]);
		},
	}),

	ns.example({
		title: "Floats",
		code: function () {
			return ns.div("clearfix", ns.spinner());
		},
	}),

	ns.example({
		title: "Text align",
		code: function () {
			return ns.div("text-center", ns.spinner());
		},
	}),

	ns.example({
		title: "Size",
		container: ns.cont.stack,
		code: function () {
			return [ns.spinner({ weight: "sm" }), ns.spinner({ grow: true, weight: "sm" })];
		},
	}),

	ns.example({
		container: ns.cont.stack,
		code: function () {
			return [
				ns.spinner({ style: { width: "3rem", height: "3rem" } }),
				ns.spinner({ grow: true, style: { width: "3rem", height: "3rem" } }),
			];
		},
	}),

	// ns.example({
	// 	title: "Button",
	// 	container: ns.cont.stack,
	// 	code: function () {
	// 		return [
	// 			ns.button({
	// 				disabled: true,
	// 				class: "loading",
	// 				color: "primary",
	// 				icon: { icon: "circle-notch", spin: true },
	// 			}),
	// 			ns.button({
	// 				disabled: true,
	// 				class: "loading",
	// 				color: "primary",
	// 				icon: { icon: "circle-notch", spin: true },
	// 				label: "Loading...",
	// 			}),
	// 		];
	// 	},
	// }),

	ns.example({
		title: "Button",
		container: ns.cont.stack,
		code: function () {
			return [
				ns.button({
					disabled: true,
					color: "primary",
					icon: ns.spinner({ weight: "sm" }),
				}),
				ns.button({
					disabled: true,
					color: "primary",
					icon: ns.spinner({ weight: "sm" }),
					label: "Loading...",
				}),
			];
		},
	}),

	ns.example({
		title: "Button",
		container: ns.cont.stack,
		code: function () {
			return [
				ns.button({
					disabled: true,
					color: "primary",
					icon: ns.spinner({ grow: true, weight: "sm" }),
				}),
				ns.button({
					disabled: true,
					color: "primary",
					icon: ns.spinner({ grow: true, weight: "sm" }),
					label: "Loading...",
				}),
			];
		},
	}),
];

var e_progress = [
	ns.example({
		title: "Progress",
		msg: "Documentation and examples for using Bootstrap custom progress bars featuring support for stacked bars, animated backgrounds, and text labels.",
		anchor: false,
	}),

	ns.example({
		title: "Example",
		code: function () {
			return [ns.progress(0), ns.progress(25), ns.progress(50), ns.progress(75), ns.progress(100)];
		},
	}),

	ns.example({
		title: "Label",
		code: function () {
			return ns.progress([{ label: true, value: 25 }]);
		},
	}),

	ns.example({
		title: "Min & max",
		code: function () {
			return ns.progress([{ label: true, value: 154, min: 75, max: 300 }]);
		},
	}),

	ns.example({
		title: "Color",
		code: function () {
			return [
				ns.progress([{ color: "success", value: 25 }]),
				ns.progress([{ color: "info", value: 35 }]),
				ns.progress([{ color: "warning", value: 55 }]),
				ns.progress([{ color: "danger", value: 75 }]),
			];
		},
	}),

	ns.example({
		title: "Height",
		code: function () {
			return [ns.progress({ height: 1, bar: [25] }), ns.progress({ height: 20, bar: [75] })];
		},
	}),

	ns.example({
		title: "Multiple bars",
		code: function () {
			return ns.progress([
				{ color: "primary", value: 15 },
				{ color: "secondary", value: 30 },
				{ color: "info", value: 20 },
			]);
		},
	}),

	ns.example({
		title: "Striped",
		code: function () {
			return [
				ns.progress([{ stripe: true, color: "primary", value: 10 }]),
				ns.progress([{ stripe: true, color: "success", value: 25 }]),
				ns.progress([{ stripe: true, color: "info", value: 50 }]),
				ns.progress([{ stripe: true, color: "warning", value: 75 }]),
				ns.progress([{ stripe: true, color: "danger", value: 100 }]),
			];
		},
	}),

	ns.example({
		title: "Animated",
		code: function () {
			return ns.progress([{ stripe: true, animate: true, color: "primary", value: 50 }]);
		},
	}),

	ns.example({
		title: "Kitchen Sink",
		code: function () {
			return ns.progress({
				height: 30,
				id: ns.core.UUID(),
				bar: [
					{ label: true, color: "success", value: 15 },
					{
						stripe: true,
						color: "warning",
						value: 30,
						tooltip: { type: "tooltip", msg: "Tooltip over progress bar is supported" },
					},
					{ label: true, stripe: true, animate: true, color: "danger", value: 99 },
				],
			});
		},
	}),
];

var e_popover = [
	ns.example({
		title: "Popover",
		msg: "Documentation and examples for adding Bootstrap popovers, like those found in iOS, to any element on your site.",
		anchor: false,
	}),

	ns.example({
		title: "Popover",
		code: function () {
			return ns.button({
				label: "Click to toggle popover",
				weight: "lg",
				color: "danger",
				tooltip: {
					type: "popover",
					title: "Popover title",
					msg: "And here's some amazing content. It's very engaging. Right?",
					placement: "right",
					trigger: null,
				},
			});
		},
	}),

	ns.example({
		title: "Four direction",
		container: ns.cont.stack,
		code: function () {
			return [
				ns.button({
					label: "Popover on top",
					color: "secondary",
					tooltip: {
						type: "popover",
						msg: "Top popover",
						placement: "top",
						trigger: null,
					},
				}),

				ns.button({
					label: "Popover on left",
					color: "secondary",
					tooltip: {
						type: "popover",
						msg: "Left popover",
						placement: "left",
						trigger: null,
					},
				}),

				ns.button({
					label: "Popover on right",
					color: "secondary",
					tooltip: {
						type: "popover",
						msg: "Right popover",
						placement: "right",
						trigger: null,
					},
				}),

				ns.button({
					label: "Popover on bottom",
					color: "secondary",
					tooltip: {
						type: "popover",
						msg: "Bottom popover",
						placement: "bottom",
						trigger: null,
					},
				}),
			];
		},
	}),

	ns.example({
		title: "Dismiss on next click",
		code: function () {
			return ns.button({
				label: "Dismissible popover",
				weight: "lg",
				color: "danger",
				tooltip: {
					type: "popover",
					title: "Popover title",
					msg: "And here's some amazing content. It's very engaging. Right?",
					placement: "right",
					trigger: "focus", //set dismiss on focus another element
				},
			});
		},
	}),

	ns.example({
		title: "Disabled elements",
		msg: [
			"Elements with the disabled attribute aren’t interactive, meaning users cannot hover or click them to trigger a popover (or tooltip). As a workaround, you’ll want to trigger the popover from a wrapper {{div}} or {{span}}, ideally made keyboard-focusable using {{tabindex='0'}}.",
			"For disabled popover triggers, you may also prefer {{trigger:'hover focus'}} on {{ns.tooltip}} option so that the popover appears as immediate visual feedback to your users as they may not expect to click on a disabled element.",
		],
		code: function () {
			return ns.tooltip(
				{
					type: "popover",
					title: "Popover title",
					msg: "And here's some amazing content. It's very engaging. Right?",
					placement: "right",
					trigger: "focus hover", //set dismiss on focus or hover another element
				},
				{
					tag: "span",
					class: "d-inline-block",
					attr: { tabindex: "0" },
					elems: ns.button({
						label: "Dismissible popover",
						color: "primary",
						disabled: true,
					}),
				}
			);
		},
	}),
];

var e_paging = [
	ns.example({
		title: "Pagination",
		msg: "Documentation and examples for showing pagination to indicate a series of related content exists across multiple pages.",
		anchor: false,
	}),

	ns.example({
		title: "Example",
		code: function () {
			return ns.pagination({
				limit: 10, // limit record in one page
				skip: 20, // record number to show
				total: 1260, // total record
				max: 3, // max number show in control
				onchange: function (skip, sender) {
					//function called when skip change
					ns.toast("i", `Skip changed to ${skip}`);
				},
			});
		},
	}),

	ns.example({
		title: "Show 5 button ",
		code: function () {
			return ns.pagination({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 5,
				onchange: function (skip, sender) {
					ns.toast("i", `Skip changed to ${skip}`);
				},
			});
		},
	}),

	ns.example({
		title: "Change icon ",
		code: function () {
			return ns.pagination({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				firstlabel: "1st",
				lastlabel: "lst",
				nextlabel: "nxt",
				prevlabel: "prv",
				onchange: function (skip, sender) {
					ns.toast("i", `Skip changed to ${skip}`);
				},
			});
		},
	}),

	ns.example({
		title: "Hide first and last control",
		code: function () {
			return ns.pagination({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				showfirstlast: false,
				onchange: function (skip, sender) {
					ns.toast("i", `Skip changed to ${skip}`);
				},
			});
		},
	}),

	ns.example({
		title: "Hide next and prev control",
		code: function () {
			return ns.pagination({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				shownextprev: false,
				onchange: function (skip, sender) {
					ns.toast("i", `Skip changed to ${skip}`);
				},
			});
		},
	}),

	ns.example({
		title: "Size",
	}),

	ns.example({
		title: "Large",
		code: function () {
			return ns.pagination({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				weight: "lg",
				onchange: function (skip, sender) {
					ns.toast("i", `Skip changed to ${skip}`);
				},
			});
		},
	}),

	ns.example({
		title: "Small",
		code: function () {
			return ns.pagination({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				weight: "sm",
				onchange: function (skip, sender) {
					ns.toast("i", `Skip changed to ${skip}`);
				},
			});
		},
	}),

	ns.example({
		title: "Aligment",
	}),

	ns.example({
		title: "Start",
		code: function () {
			return ns.pagination({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				align: "start",
				onchange: function (skip, sender) {
					ns.toast("i", `Skip changed to ${skip}`);
				},
			});
		},
	}),

	ns.example({
		title: "End",
		code: function () {
			return ns.pagination({
				limit: 10,
				skip: 60,
				total: 1260,
				max: 3,
				align: "end",
				onchange: function (skip, sender) {
					ns.toast("i", `Skip changed to ${skip}`);
				},
			});
		},
	}),
];

var e_offcanvas = [
	ns.example({
		title: "Offcanvas",
		msg: "Build hidden sidebars into your project for navigation, shopping carts, and more with a few classes and our JavaScript plugin.",
		anchor: false,
	}),

	ns.example({
		title: "Offcanvas",
		label: "Show offcanvas",
		sample: { "ex.sample.offcanvasbody": ex.sample.offcanvasbody },
		code: function () {
			ns.offcanvas({
				close: true,
				backdrop: true,
				color: "light",
				title: "Offcanvas",
				elems: ex.sample.offcanvasbody(),
			});
		},
	}),

	ns.example({
		title: "Placement",
	}),

	ns.example({
		title: "Top",
		label: "Show top offcanvas",
		sample: { "ex.sample.offcanvasbody": ex.sample.offcanvasbody },
		code: function () {
			ns.offcanvas({
				close: true,
				backdrop: true,
				placement: "top",
				color: "light",
				title: "Offcanvas",
				elems: ex.sample.offcanvasbody(),
			});
		},
	}),

	ns.example({
		title: "Bottom",
		label: "Show bottom offcanvas",
		sample: { "ex.sample.offcanvasbody": ex.sample.offcanvasbody },
		code: function () {
			ns.offcanvas({
				close: true,
				backdrop: true,
				placement: "bottom",
				color: "light",
				title: "Offcanvas",
				elems: ex.sample.offcanvasbody(),
			});
		},
	}),

	ns.example({
		title: "End",
		label: "Show end offcanvas",
		sample: { "ex.sample.offcanvasbody": ex.sample.offcanvasbody },
		code: function () {
			ns.offcanvas({
				close: true,
				backdrop: true,
				placement: "end",
				color: "light",
				title: "Offcanvas",
				elems: ex.sample.offcanvasbody(),
			});
		},
	}),

	ns.example({
		title: "Backdrop",
		container: ns.cont.stack,
		sample: { "ex.sample.offcanvasbody": ex.sample.offcanvasbody },
		code: function () {
			return [
				ns.button({
					label: "Enable body scrolling",
					color: "primary",
					onclick: function () {
						ns.offcanvas({
							close: true,
							scroll: true,
							backdrop: false,
							color: "light",
							title: "Offcanvas",
							elems: ex.sample.offcanvasbody(),
						});
					},
				}),

				ns.button({
					label: "Enable backdrop",
					color: "primary",
					onclick: function () {
						ns.offcanvas({
							close: true,
							scroll: false,
							backdrop: true,
							color: "light",
							title: "Offcanvas",
							elems: ex.sample.offcanvasbody(),
						});
					},
				}),

				ns.button({
					label: "Enable both scrolling & backdrop",
					color: "primary",
					onclick: function () {
						ns.offcanvas({
							close: true,
							backdrop: true,
							scroll: true,
							color: "light",
							title: "Offcanvas",
							elems: ex.sample.offcanvasbody(),
						});
					},
				}),
			];
		},
	}),
];

var e_navbar = [
	ns.example({
		title: "Navbar",
		msg: "Documentation and examples for Bootstrap’s powerful, responsive navigation header, the navbar. Includes support for branding, navigation, and more, including support for our collapse plugin.",
		anchor: false,
	}),

	ns.example({
		title: "Supported content",
		sample: { "ex.sample.navbaritem": ex.sample.navbaritem },
		code: function () {
			var id = ns.core.UUID();
			return ns.navbar.container({
				expand: "lg",
				color: "light",
				elems: ex.sample.navbaritem(),
			});
		},
	}),

	ns.example({
		title: "Brand",
	}),

	ns.example({
		title: "Text",
		msg: "Add your text within an element with the {{ns.navbar.brand}}.",
		code: function () {
			return [
				ns.navbar.container({
					expand: "lg",
					color: "light",
					elems: [
						ns.navbar.brand({
							label: "Navbar",
							href: "javascript:void(0);",
						}),
					],
				}),

				ns.navbar.container({
					expand: "lg",
					color: "light",
					elems: [
						ns.navbar.brand({
							label: "Navbar",
						}),
					],
				}),
			];
		},
	}),

	ns.example({
		title: "Icon",
		code: function () {
			return ns.navbar.container({
				expand: "lg",
				color: "light",
				elems: [
					ns.navbar.brand({
						icon: { icon: "fire", color: "danger" },
						href: "javascript:void(0);",
					}),
				],
			});
		},
	}),

	ns.example({
		title: "Icon and text",
		code: function () {
			return ns.navbar.container({
				expand: "lg",
				color: "light",
				elems: [
					ns.navbar.brand({
						icon: { icon: "fire", color: "danger" },
						label: "Navbar",
						href: "javascript:void(0);",
					}),
				],
			});
		},
	}),

	ns.example({
		title: "Nav",
	}),

	ns.example({
		title: "Nav item",
		code: function () {
			var id = ns.core.UUID();
			return ns.navbar.container({
				expand: "lg",
				color: "light",
				elems: [
					ns.navbar.toggler({
						id: id, //this id must same with ns.navbar.collapsecontainer id
						toggle: "collapse",
					}),

					ns.navbar.brand({
						label: "Navbar",
					}),

					ns.navbar.collapsecontainer({
						id: id, //this id must same with ns.navbar.toggler id
						elems: [
							ns.navbar.itemcontainer({
								parenttype: "collapse",
								elems: [
									ns.navbar.item({
										label: "Home",
										href: "javascript:void(0);",
										active: true,
									}),
									ns.navbar.item({
										label: "Features",
										href: "javascript:void(0);",
									}),
									ns.navbar.item({
										label: "Pricing",
										href: "javascript:void(0);",
									}),
									ns.navbar.item({
										label: "Disabled",
										href: "javascript:void(0);",
										disabled: true,
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
		title: "Nav item dropdown",
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
		code: function () {
			var id = ns.core.UUID();
			return ns.navbar.container({
				expand: "lg",
				color: "light",
				elems: [
					ns.navbar.toggler({
						id: id, //this id must same with ns.navbar.collapsecontainer id
						toggle: "collapse",
					}),

					ns.navbar.brand({
						label: "Navbar",
					}),

					ns.navbar.collapsecontainer({
						id: id, //this id must same with ns.navbar.toggler id
						elems: [
							ns.navbar.itemcontainer({
								parenttype: "collapse",
								elems: [
									ns.navbar.item({
										label: "Home",
										href: "javascript:void(0);",
										active: true,
									}),
									ns.navbar.item({
										label: "Features",
										href: "javascript:void(0);",
									}),
									ns.navbar.item({
										label: "Pricing",
										option: ex.sample.dropdownitem(),
									}),
									ns.navbar.item({
										label: "Disabled",
										href: "javascript:void(0);",
										disabled: true,
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
		title: "Nav with form",
		code: function () {
			return ns.navbar.container({
				expand: "lg",
				color: "light",
				elems: [
					ns.navbar.formcontainer([
						ns.input({
							type: "search",
							placeholder: "Search",
							hiddenlabel: "Search",
							class: "me-2",
						}),
						ns.button({ label: "Search", color: "success", outline: true }),
					]),
				],
			});
		},
	}),

	ns.example({
		title: "Nav with form and header",
		code: function () {
			return ns.navbar.container({
				expand: "lg",
				color: "light",
				elems: [
					ns.navbar.brand({
						label: "Navbar",
					}),

					ns.navbar.formcontainer([
						ns.input({
							type: "search",
							placeholder: "Search",
							hiddenlabel: "Search",
							class: "me-2",
						}),
						ns.button({ label: "Search", color: "success", outline: true }),
					]),
				],
			});
		},
	}),

	ns.example({
		title: "Nav with input group",
		code: function () {
			return ns.navbar.container({
				expand: "lg",
				color: "light",
				elems: [
					ns.input({
						type: "text",
						before: "@",
						placeholder: "Username",
					}),
				],
			});
		},
	}),

	ns.example({
		title: "Nav with button",
		code: function () {
			return ns.navbar.container({
				expand: "lg",
				color: "light",
				containerclass: "justify-content-start gap-2",
				elems: [
					ns.button({
						label: "Main button",
						color: "success",
						outline: true,
						weight: "lg",
					}),
					ns.button({
						label: "Small button",
						color: "secondary",
						outline: true,
						weight: "sm",
					}),
				],
			});
		},
	}),

	ns.example({
		title: "Nav with text",
		code: function () {
			return ns.navbar.container({
				expand: "lg",
				color: "light",
				elems: [ns.navbar.text("Navbar text with an inline element")],
			});
		},
	}),

	ns.example({
		title: "Mix and match",
		code: function () {
			var id = ns.core.UUID();
			return ns.navbar.container({
				expand: "lg",
				color: "light",
				elems: [
					ns.navbar.brand({
						label: "Navbar w/ text",
					}),

					ns.navbar.toggler({
						id: id, //this id must same with ns.navbar.collapsecontainer id
						toggle: "collapse",
					}),

					ns.navbar.collapsecontainer({
						id: id, //this id must same with ns.navbar.toggler id
						elems: [
							ns.navbar.itemcontainer({
								parenttype: "collapse",
								elems: [
									ns.navbar.item({
										label: "Home",
										href: "javascript:void(0);",
										active: true,
									}),
									ns.navbar.item({
										label: "Features",
										href: "javascript:void(0);",
									}),
									ns.navbar.item({
										label: "Pricing",
										href: "javascript:void(0);",
									}),
								],
							}),
							ns.navbar.text("Navbar text with an inline element"),
						],
					}),
				],
			});
		},
	}),

	ns.example({
		title: "Color schemes",
		sample: { "ex.sample.navbaritem": ex.sample.navbaritem },
		code: function () {
			var id1 = ns.core.UUID();
			var id2 = ns.core.UUID();
			var id3 = ns.core.UUID();

			return [
				ns.navbar.container({
					expand: "lg",
					color: "dark",
					light: "dark",
					elems: ex.sample.navbaritem(id1),
				}),
				ns.navbar.container({
					expand: "lg",
					color: "primary",
					light: "dark",
					elems: ex.sample.navbaritem(id2),
				}),
				ns.navbar.container({
					expand: "lg",
					style: { backgroundColor: "#e3f2fd" },
					elems: ex.sample.navbaritem(id3),
				}),
			];
		},
	}),

	ns.example({
		title: "Container",
	}),

	ns.example({
		title: "Inside container",
		code: function () {
			return ns.div(
				"container",
				ns.navbar.container({
					expand: "lg",
					color: "light",
					elems: [
						ns.navbar.brand({
							label: "Navbar",
							href: "javascript:void(0);",
						}),
					],
				})
			);
		},
	}),

	ns.example({
		title: "Change container fluid",
		code: function () {
			return ns.navbar.container({
				expand: "lg",
				color: "light",
				containerfluid: "md",
				elems: [
					ns.navbar.brand({
						label: "Navbar",
						href: "javascript:void(0);",
					}),
				],
			});
		},
	}),

	ns.example({
		title: "Position",
		code: function () {
			return ns.navbar.container({
				expand: "lg",
				color: "light",
				position: null, //fixed-top|fixed-bottom|sticky-top|null
				elems: [
					ns.navbar.brand({
						label: "Navbar",
						href: "javascript:void(0);",
					}),
				],
			});
		},
	}),

	ns.example({
		title: "Scrolling",
		msg: [
			"Add {{scroll:'height'}} option to a {{ns.navbar.itemcontainer}} to enable vertical scrolling within the toggleable contents of a collapsed navbar. At larger viewports when the navbar is expanded, content will appear as it does in a default navbar.",
			"Please note that this behavior comes with a potential drawback of overflow—when setting overflow-y: auto (required to scroll the content here), overflow-x is the equivalent of auto, which will crop some horizontal content.",
			"Here’s an example navbar using {{scroll:'height'}}, with some extra margin utilities for optimum spacing.",
		],
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
		code: function () {
			var id = ns.core.UUID();
			return ns.navbar.container({
				expand: "lg",
				color: "light",
				elems: [
					ns.navbar.toggler({
						id: id,
						toggle: "collapse",
					}),

					ns.navbar.brand({
						label: "Navbar",
					}),

					ns.navbar.collapsecontainer({
						id: id,
						elems: [
							ns.navbar.itemcontainer({
								parenttype: "collapse",
								scroll: "100px", //set scroll height here
								elems: [
									ns.navbar.item({ label: "Home", active: true }),
									ns.navbar.item("Link"),
									ns.navbar.item({
										label: "Dropdown",
										option: ex.sample.dropdownitem(),
									}),
									ns.navbar.item({ label: "Disabled", disabled: true }),
								],
							}),
							ns.navbar.formcontainer([
								ns.input({
									type: "search",
									placeholder: "Search",
									hiddenlabel: "Search",
									class: "me-2",
								}),
								ns.button({ label: "Search", color: "success", outline: true }),
							]),
						],
					}),
				],
			});
		},
	}),

	ns.example({
		title: "Responsive behaviors",
		msg: [
			"{{ns.navbar.container}} can use {{ns.navbar.toggler}}, {{ns.navbar.collapsecontainer}}, and add {{expand:'sm|md|lg|xl|xxl'}} option into {{ns.navbar.container}} to determine when their content collapses behind a button. In combination with other option, you can easily choose when to show or hide particular elements.",
			"For {{ns.navbar.container}} that never collapse, add the {{expand:''}} option on the {{ns.navbar.container}}. For {{ns.navbar.container}} that always collapse, don’t add any .navbar-expand class.",
		],
		sample: { "ex.sample.navbaritem": ex.sample.navbaritem },
		code: function () {
			var id1 = ns.core.UUID();
			var id2 = ns.core.UUID();
			var id3 = ns.core.UUID();
			return [
				ns.navbar.container({
					expand: "lg",
					color: "light",
					elems: ex.sample.navbaritem(id1, "lg"),
				}),
				ns.navbar.container({
					expand: "",
					color: "light",
					elems: ex.sample.navbaritem(id2, '""'),
				}),
				ns.navbar.container({
					expand: null,
					color: "light",
					elems: ex.sample.navbaritem(id3, "null"),
				}),
			];
		},
	}),

	ns.example({
		title: "Toggler",
		msg: [
			"Navbar togglers are left-aligned by default, but should they follow a sibling element like a .navbar-brand, they’ll automatically be aligned to the far right. Reversing your markup will reverse the placement of the toggler. Below are examples of different toggle styles.",
			"With no .navbar-brand shown at the smallest breakpoint",
		],
		code: function () {
			var id1 = ns.core.UUID();
			var id2 = ns.core.UUID();
			var id3 = ns.core.UUID();
			return [
				ns.navbar.container({
					expand: "lg",
					color: "light",
					elems: [
						ns.navbar.toggler({
							id: id1,
							toggle: "collapse",
						}),

						ns.navbar.collapsecontainer({
							id: id1,
							elems: [
								ns.navbar.brand({
									//brand inside collapsecontainer
									label: "Hidden brand",
								}),
								ns.navbar.itemcontainer({
									parenttype: "collapse",
									elems: [
										ns.navbar.item({ label: "Home", active: true }),
										ns.navbar.item("Link"),
										ns.navbar.item({ label: "Disabled", disabled: true }),
									],
								}),
								ns.navbar.formcontainer([
									ns.input({
										type: "search",
										placeholder: "Search",
										hiddenlabel: "Search",
										class: "me-2",
									}),
									ns.button({ label: "Search", color: "success", outline: true }),
								]),
							],
						}),
					],
				}),
				ns.navbar.container({
					expand: "lg",
					color: "light",
					elems: [
						ns.navbar.brand({
							//brand before toggle
							label: "Navbar",
						}),

						ns.navbar.toggler({
							id: id2,
							toggle: "collapse",
						}),

						ns.navbar.collapsecontainer({
							id: id2,
							elems: [
								ns.navbar.itemcontainer({
									parenttype: "collapse",
									elems: [
										ns.navbar.item({ label: "Home", active: true }),
										ns.navbar.item("Link"),
										ns.navbar.item({ label: "Disabled", disabled: true }),
									],
								}),
								ns.navbar.formcontainer([
									ns.input({
										type: "search",
										placeholder: "Search",
										hiddenlabel: "Search",
										class: "me-2",
									}),
									ns.button({ label: "Search", color: "success", outline: true }),
								]),
							],
						}),
					],
				}),
				ns.navbar.container({
					expand: "lg",
					color: "light",
					elems: [
						ns.navbar.toggler({
							id: id3,
							toggle: "collapse",
						}),

						ns.navbar.brand({
							//brand after toggle
							label: "Navbar",
						}),

						ns.navbar.collapsecontainer({
							id: id3,
							elems: [
								ns.navbar.itemcontainer({
									parenttype: "collapse",
									elems: [
										ns.navbar.item({ label: "Home", active: true }),
										ns.navbar.item("Link"),
										ns.navbar.item({ label: "Disabled", disabled: true }),
									],
								}),
								ns.navbar.formcontainer([
									ns.input({
										type: "search",
										placeholder: "Search",
										hiddenlabel: "Search",
										class: "me-2",
									}),
									ns.button({ label: "Search", color: "success", outline: true }),
								]),
							],
						}),
					],
				}),
			];
		},
	}),

	ns.example({
		title: "External content",
		code: function () {
			var id = ns.core.UUID();
			return [
				//collapsecontainer outside container
				ns.navbar.collapsecontainer({
					id: id,
					elems: ns.div("p-2", [
						{ tag: "h5", elems: "Collapsed content" },
						{
							tag: "span",
							class: "text-muted",
							elems: "Toggleable via the navbar brand.",
						},
					]),
				}),

				ns.navbar.container({
					expand: null,
					color: "light",
					elems: [
						ns.navbar.brand({
							label: "Navbar",
							href: "javascript:void(0);",
						}),
						ns.navbar.toggler({
							id: id,
							toggle: "collapse",
						}),
					],
				}),
			];
		},
	}),
];

var e_tab = [
	ns.example({
		title: "Navs and tabs",
		msg: "Documentation and examples for how to use Bootstrap’s included navigation components.",
		anchor: false,
	}),

	ns.example({
		title: "Base nav",
		sample: { "ex.sample.tab": ex.sample.tab },
		code: function () {
			return ns.nav({
				style: null,
				elems: ex.sample.tab(),
			});
		},
	}),

	ns.example({
		title: "Nav tab",
		sample: { "ex.sample.tab": ex.sample.tab },
		code: function () {
			return ns.nav({
				style: "tab",
				elems: ex.sample.tab(),
			});
		},
	}),

	ns.example({
		title: "Nav pill",
		sample: { "ex.sample.tab": ex.sample.tab },
		code: function () {
			return ns.nav({
				style: "pill",
				elems: ex.sample.tab(),
			});
		},
	}),

	ns.example({
		title: "Horizontal center alignment",
		sample: { "ex.sample.tab": ex.sample.tab },
		code: function () {
			return ns.nav({
				style: "pill",
				align: "center",
				elems: ex.sample.tab(),
			});
		},
	}),

	ns.example({
		title: "Horizontal right alignment",
		sample: { "ex.sample.tab": ex.sample.tab },
		code: function () {
			return ns.nav({
				style: "pill",
				align: "right",
				elems: ex.sample.tab(),
			});
		},
	}),

	ns.example({
		title: "Vertical left",
		sample: { "ex.sample.tab": ex.sample.tab },
		code: function () {
			return ns.nav({
				style: "pill",
				align: "vertical",
				size: "col-sm-12 col-md-6 col-lg-4",
				elems: ex.sample.tab(),
			});
		},
	}),

	ns.example({
		title: "Vertical right",
		sample: { "ex.sample.tab": ex.sample.tab },
		code: function () {
			return ns.nav({
				style: "pill",
				align: "vertical-right",
				size: "col-sm-12 col-md-6 col-lg-4",
				elems: ex.sample.tab(),
			});
		},
	}),

	ns.example({
		title: "Fill",
		sample: { "ex.sample.tab": ex.sample.tab },
		code: function () {
			return ns.nav({
				style: "pill",
				align: "fill",
				elems: ex.sample.tab(),
			});
		},
	}),

	ns.example({
		title: "Dropdown tab",
		sample: { "ex.sample.dropdowntab": ex.sample.dropdowntab },
		code: function () {
			return ns.nav({
				style: "tab",
				elems: ex.sample.dropdowntab(),
			});
		},
	}),

	ns.example({
		title: "Dropdown pill",
		sample: { "ex.sample.dropdowntab": ex.sample.dropdowntab },
		code: function () {
			return ns.nav({
				style: "pill",
				elems: ex.sample.dropdowntab(),
			});
		},
	}),

	ns.example({
		title: "Nav tab in dialog",
		label: "Show nav tab in dialog",
		sample: { "ex.sample.dropdowntab": ex.sample.dropdowntab },
		code: function () {
			return ns.dlg.box({
				title: "Modal title",
				hastab: true, //!important
				elems: ns.nav({
					style: "tab",
					border: false, //!important
					rounded: false, //!important
					elems: ex.sample.dropdowntab(),
				}),
				button: "understandclose",
			});
		},
	}),

	ns.example({
		title: "Tab nav pill in dialog",
		label: "Show nav pill in dialog",
		sample: { "ex.sample.dropdowntab": ex.sample.dropdowntab },
		code: function () {
			return ns.dlg.box({
				title: "Modal title",
				hastab: true, //!important
				elems: ns.nav({
					style: "pill",
					border: false, //!important
					rounded: false, //!important
					elems: ex.sample.dropdowntab(),
				}),
				button: "understandclose",
			});
		},
	}),
];

var e_dlg = [
	ns.example({
		title: "Modals",
		msg: "Use Bootstrap’s JavaScript modal plugin to add dialogs to your site for lightboxes, user notifications, or completely custom content.",
		anchor: false,
	}),

	ns.example({
		title: "Simple dialog box",
		container: ns.cont.stack,
		code: function () {
			return [
				ns.button({
					label: "Info",
					color: "primary",
					onclick: function () {
						ns.dlg.msgbox("i", "This is example msgbox").then(() => {
							ns.toast("i", "After user click <b>Okay</b> button");
						});
					},
				}),
				ns.button({
					label: "Question",
					color: "success",
					onclick: function () {
						ns.dlg.msgbox("?", "This is example msgbox").then(() => {
							ns.toast("?", "After user click <b>Okay</b> button");
						});
					},
				}),
				ns.button({
					label: "Warning",
					color: "warning",
					onclick: function () {
						ns.dlg.msgbox("!", "This is example msgbox").then(() => {
							ns.toast("!", "After user click <b>Okay</b> button");
						});
					},
				}),
				ns.button({
					label: "Error",
					color: "danger",
					onclick: function () {
						ns.dlg.msgbox("x", "This is example msgbox").then(() => {
							ns.toast("x", "After user click <b>Okay</b> button");
						});
					},
				}),
			];
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
					ns.cont.singlecolumn([
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
							label: "Sex",
							type: "div",
							elems: [
								ns.listgroup.item({
									check: "radio",
									name: "sex",
									value: "s",
									elems: "Secret",
									active: true,
								}),
								ns.listgroup.item({
									check: "radio",
									name: "sex",
									value: "m",
									elems: "Male",
								}),
								ns.listgroup.item({
									check: "radio",
									name: "sex",
									value: "f",
									elems: "Female",
								}),
							],
						}),
						ns.listgroup.container({
							label: "Interest",
							type: "div",
							elems: [
								ns.listgroup.item({
									check: "checkbox",
									name: "interest",
									value: "sports",
									elems: "Sports",
								}),
								ns.listgroup.item({
									check: "checkbox",
									name: "interest",
									value: "business",
									elems: "Business",
								}),
								ns.listgroup.item({
									check: "checkbox",
									name: "interest",
									value: "social",
									elems: "Social",
								}),
								ns.listgroup.item({
									check: "checkbox",
									name: "interest",
									value: "internet",
									elems: "Internet",
								}),
							],
						}),
						ns.input({
							label: "Country",
							required: true,
							invalid: "Please choose country",
							name: "country",
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
						color: "success",
						textcolor: "light",
						icon: "dove",
						title: "Result",
						msg: `${JSON.stringify(d)}`,
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
		sample: { "ex.sample.text": ex.sample.text },
		code: function () {
			ns.dlg
				.box({
					title: "Modal title",
					elems: [
						ex.sample.text("p"),
						ex.sample.text("p"),
						ex.sample.text("p"),
						ex.sample.text("p"),
						ex.sample.text("p"),
					],
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
		sample: { "ex.sample.text": ex.sample.text },
		code: function () {
			ns.dlg
				.box({
					title: "Modal title",
					elems: [
						ex.sample.text("p"),
						ex.sample.text("p"),
						ex.sample.text("p"),
						ex.sample.text("p"),
						ex.sample.text("p"),
					],
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
								ns.a({
									href: "javascript:void(0);",
									label: "This link",
									tooltip: { type: "tooltip", msg: "Tooltip" },
								}),
								" and ",
								ns.a({
									href: "javascript:void(0);",
									label: "that link",
									tooltip: { type: "tooltip", msg: "Tooltip" },
								}),
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
					elems: `todo : ns.grid`,
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
		container: ns.cont.stack,
		sample: { "ex.sample.dlgFn": ex.sample.dlgFn },
		code: function () {
			return [
				ns.button({
					label: "Message for @mdo",
					color: "primary",
					onclick: "ex.sample.dlgFn('@mdo');",
				}),
				ns.button({
					label: "Message for @fat",
					color: "primary",
					onclick: "ex.sample.dlgFn('@fat');",
				}),
				ns.button({
					label: "Message for @getbootstrap",
					color: "primary",
					onclick: "ex.sample.dlgFn('@getbootstrap');",
				}),
			];
		},
	}),

	ns.example({
		title: "Toggle between modals",
		label: "Show first modal",
		sample: {
			"ex.sample.dlgFirstModal": ex.sample.dlgFirstModal,
			"ex.sample.dlgSecondModal": ex.sample.dlgSecondModal,
		},
		code: function () {
			var dlgFirstModal = function () {
				ns.dlg.box({
					title: "Modal 1",
					elems: "Show a second modal and close this one with the button below.",
					button: [{ label: "Show second modal", onclick: "ex.sample.dlgSecondModal()" }],
				});
			};

			var dlgSecondModal = function () {
				ns.dlg.box({
					title: "Modal 2",
					elems: "Close this modal and show the first with the button below.",
					button: [{ label: "Show first modal", onclick: "ex.sample.dlgFirstModal()" }],
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
		container: ns.cont.stack,
		sample: { "ex.sample.dlgSizeFn": ex.sample.dlgSizeFn },
		code: function () {
			return [
				ns.button({
					label: "Extra large modal",
					color: "primary",
					onclick: "ex.sample.dlgSizeFn('xl')",
				}),
				ns.button({
					label: "Large modal",
					color: "primary",
					onclick: "ex.sample.dlgSizeFn('lg')",
				}),
				ns.button({
					label: "Small modal",
					color: "primary",
					onclick: "ex.sample.dlgSizeFn('sm')",
				}),
			];
		},
	}),

	ns.example({
		title: "Fullscreen Modal",
		container: ns.cont.stack,
		sample: { "ex.sample.dlgFullscreenFn": ex.sample.dlgFullscreenFn },
		code: function () {
			return [
				ns.button({
					label: "Full screen",
					color: "primary",
					onclick: "ex.sample.dlgFullscreenFn(true)",
				}),
				ns.button({
					label: "Full screen below sm",
					color: "primary",
					onclick: "ex.sample.dlgFullscreenFn('sm-down')",
				}),
				ns.button({
					label: "Full screen below md",
					color: "primary",
					onclick: "ex.sample.dlgFullscreenFn('md-down')",
				}),
				ns.button({
					label: "Full screen below lg",
					color: "primary",
					onclick: "ex.sample.dlgFullscreenFn('lg-down')",
				}),
				ns.button({
					label: "Full screen below xl",
					color: "primary",
					onclick: "ex.sample.dlgFullscreenFn('xl-down')",
				}),
				ns.button({
					label: "Full screen below xxl",
					color: "primary",
					onclick: "ex.sample.dlgFullscreenFn('xxl-down')",
				}),
			];
		},
	}),
];

var e_listgroup = [
	ns.example({
		title: "List group",
		msg: "List groups are a flexible and powerful component for displaying a series of content. Modify and extend them to support just about any content within.",
		anchor: false,
	}),

	ns.example({
		title: "Basic example",
		sample: { "ex.sample.listgroupitem": ex.sample.listgroupitem },
		code: function () {
			return ns.listgroup.container(ex.sample.listgroupitem());
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
					ns.listgroup.item({
						href: "javascript:void(0)",
						elems: "A disabled item",
						disabled: true,
					}),
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
					ns.listgroup.item({
						onclick: "fnClick(this);",
						elems: "A disabled item",
						disabled: true,
					}),
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
		sample: { "ex.sample.listgroupitem": ex.sample.listgroupitem },
		code: function () {
			return ns.listgroup.container({
				flush: true,
				elems: ex.sample.listgroupitem(),
			});
		},
	}),

	ns.example({
		title: "Numbered",
		sample: { "ex.sample.listgroupitem": ex.sample.listgroupitem },
		code: function () {
			return ns.listgroup.container({
				numbered: true,
				elems: ex.sample.listgroupitem(),
			});
		},
	}),

	ns.example({
		title: "Numbered custom content",
		sample: { "ex.sample.listgroupitemcustomcontent": ex.sample.listgroupitemcustomcontent },
		code: function () {
			return ns.listgroup.container({
				numbered: true,
				elems: [
					ns.listgroup.item(ex.sample.listgroupitemcustomcontent()),
					ns.listgroup.item(ex.sample.listgroupitemcustomcontent()),
					ns.listgroup.item(ex.sample.listgroupitemcustomcontent()),
				],
			});
		},
	}),

	ns.example({
		title: "Numbered custom content",
		sample: { "ex.sample.listgroupitem3": ex.sample.listgroupitem3 },
		code: function () {
			return [
				ns.listgroup.container({
					horizontal: true,
					elems: ex.sample.listgroupitem3(),
				}),

				ns.listgroup.container({
					horizontal: "sm",
					elems: ex.sample.listgroupitem3(),
				}),

				ns.listgroup.container({
					horizontal: "md",
					elems: ex.sample.listgroupitem3(),
				}),

				ns.listgroup.container({
					horizontal: "lg",
					elems: ex.sample.listgroupitem3(),
				}),

				ns.listgroup.container({
					horizontal: "xl",
					elems: ex.sample.listgroupitem3(),
				}),

				ns.listgroup.container({
					horizontal: "xxl",
					elems: ex.sample.listgroupitem3(),
				}),

				ns.listgroup.container({
					horizontal: ["md", "xxl"],
					elems: ex.sample.listgroupitem3(),
				}),
			];
		},
	}),

	ns.example({
		title: "Contextual classes",
		code: function () {
			return ns.listgroup.container([
				ns.listgroup.item({ color: "primary", elems: `A simple primary list group item` }),
			]);
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
				elems: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(function (
					i
				) {
					return ns.listgroup.item({
						action: true,
						href: "javascript:void(0);",
						color: i,
						elems: `A simple ${i} list group item`,
					});
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
						ns.div("d-flex w-100 justify-content-between", [
							{ tag: "h5", class: "mb-1", elems: title },
							{
								tag: "small",
								class: !active ? "text-muted" : null,
								elems: `${days} days ago`,
							},
						]),
						{
							tag: "p",
							class: "mb-1",
							elems: "Some placeholder content in a paragraph.",
						},
						{
							tag: "small",
							class: !active ? "text-muted" : null,
							elems: `And some${!active ? " muted" : ""} small print.`,
						},
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
					ns.listgroup.item({
						check: "checkbox",
						value: "2",
						elems: "Second checkbox",
						active: true,
					}),
					ns.listgroup.item({
						check: "checkbox",
						value: "3",
						elems: "Third checkbox",
						disabled: true,
					}),
					ns.listgroup.item({
						check: "checkbox",
						value: "4",
						elems: "Fourth checkbox",
						color: "primary",
					}),
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
					ns.listgroup.item({
						check: "radio",
						name: "g10",
						value: "1",
						elems: "First radio",
					}),
					ns.listgroup.item({
						check: "radio",
						name: "g10",
						value: "2",
						elems: "Second radio",
						active: true,
					}),
					ns.listgroup.item({
						check: "radio",
						name: "g10",
						value: "3",
						elems: "Third radio",
						disabled: true,
					}),
					ns.listgroup.item({
						check: "radio",
						name: "g10",
						value: "4",
						elems: "Fourth radio",
						color: "primary",
					}),
					ns.listgroup.item({
						check: "radio",
						name: "g10",
						value: "5",
						elems: "Fifth radio",
					}),
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
					ns.listgroup.item({
						check: "switch",
						value: "2",
						elems: "Second switch",
						active: true,
					}),
					ns.listgroup.item({
						check: "switch",
						value: "3",
						elems: "Third switch",
						disabled: true,
					}),
					ns.listgroup.item({
						check: "switch",
						value: "4",
						elems: "Fourth switch",
						color: "primary",
					}),
					ns.listgroup.item({ check: "switch", value: "5", elems: "Fifth switch" }),
				],
			});
		},
	}),
];

var e_dropdown = [
	ns.example({
		title: "Dropdowns",
		msg: "Toggle contextual overlays for displaying lists of links and more with the Bootstrap dropdown plugin.",
		anchor: false,
	}),

	ns.example({
		title: "Single button",
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
		code: function () {
			return ns.dropdown({
				label: "Drowdown button",
				color: "secondary",
				option: ex.sample.dropdownitem(),
			});
		},
	}),

	ns.example({
		title: "Dropdown link",
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
		code: function () {
			return ns.dropdown({
				label: "Drowdown link",
				color: "secondary",
				href: "javascript:void(0);",
				option: ex.sample.dropdownitem(),
			});
		},
	}),

	ns.example({
		title: "Color",
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
		code: function () {
			return ns.dropdown({
				label: "Drowdown",
				color: "primary",
				option: ex.sample.dropdownitem(),
			});
		},
	}),

	ns.example({
		title: "Color varian",
		container: ns.cont.stack,
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
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
					option: ex.sample.dropdownitem(),
				});
			});
		},
	}),

	ns.example({
		title: "Split button",
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
		code: function () {
			return ns.dropdown({
				label: "Drowdown",
				color: "primary",
				segmenttoggle: true,
				option: ex.sample.dropdownitem(),
			});
		},
	}),

	ns.example({
		title: "Split button color variant",
		container: ns.cont.stack,
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
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
					option: ex.sample.dropdownitem(),
				});
			});
		},
	}),

	ns.example({
		title: "Large size",
		container: ns.cont.stack,
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
		code: function () {
			return [
				ns.dropdown({
					label: "Large dropdown",
					color: "secondary",
					weight: "lg",
					option: ex.sample.dropdownitem(),
				}),
				ns.dropdown({
					label: "Large split dropdown",
					color: "secondary",
					weight: "lg",
					segmenttoggle: true,
					option: ex.sample.dropdownitem(),
				}),
			];
		},
	}),

	ns.example({
		title: "Small size",
		container: ns.cont.stack,
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
		code: function () {
			return [
				ns.dropdown({
					label: "Small dropdown",
					color: "secondary",
					weight: "sm",
					option: ex.sample.dropdownitem(),
				}),
				ns.dropdown({
					label: "Small split dropdown",
					color: "secondary",
					weight: "sm",
					segmenttoggle: true,
					option: ex.sample.dropdownitem(),
				}),
			];
		},
	}),

	ns.example({
		title: "Dark dropdown",
		container: ns.cont.stack,
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
		code: function () {
			return ns.dropdown({
				label: "Dark dropdown",
				color: "secondary",
				dark: true,
				option: ex.sample.dropdownitem(),
			});
		},
	}),

	ns.example({
		title: "Dropdown in navbar",
		dark: true,
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
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
										option: ex.sample.dropdownitem(),
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
		container: ns.cont.stack,
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
		code: function () {
			return [
				ns.dropdown({
					label: "Dropup",
					color: "secondary",
					arrow: "up",
					option: ex.sample.dropdownitem(),
				}),
				ns.dropdown({
					label: "Split dropup",
					color: "secondary",
					arrow: "up",
					segmenttoggle: true,
					option: ex.sample.dropdownitem(),
				}),
			];
		},
	}),

	ns.example({
		title: "Dropend",
		container: ns.cont.stack,
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
		code: function () {
			return [
				ns.dropdown({
					label: "Dropend",
					color: "secondary",
					arrow: "end",
					option: ex.sample.dropdownitem(),
				}),
				ns.dropdown({
					label: "Split dropend",
					color: "secondary",
					arrow: "end",
					segmenttoggle: true,
					option: ex.sample.dropdownitem(),
				}),
			];
		},
	}),

	ns.example({
		title: "Dropstart",
		container: ns.cont.stack,
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
		code: function () {
			return [
				ns.dropdown({
					label: "Dropstart",
					color: "secondary",
					arrow: "start",
					option: ex.sample.dropdownitem(),
				}),
				ns.dropdown({
					label: "Split dropstart",
					color: "secondary",
					arrow: "start",
					segmenttoggle: true,
					option: ex.sample.dropdownitem(),
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
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
		code: function () {
			return ns.dropdown({
				label: "Right-aligned menu example",
				color: "secondary",
				aligment: "end",
				option: ex.sample.dropdownitem(),
			});
		},
	}),

	ns.example({
		title: "Responsive alignment",
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
		code: function () {
			return ns.dropdown({
				label: "Right-aligned, left-aligned lg",
				color: "secondary",
				aligment: ["end", "lg-start"],
				option: ex.sample.dropdownitem(),
			});
		},
	}),

	ns.example({
		title: "Alignment options",
		container: ns.cont.stack,
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
		code: function () {
			return [
				ns.dropdown({
					label: "Dropdown",
					color: "secondary",
					option: ex.sample.dropdownitem(),
				}),
				ns.dropdown({
					label: "Right-aligned menu",
					color: "secondary",
					aligment: "end",
					option: ex.sample.dropdownitem(),
				}),
				ns.dropdown({
					label: "Left-aligned, right-aligned lg",
					color: "secondary",
					aligment: ["start", "lg-end"],
					option: ex.sample.dropdownitem(),
				}),
				ns.dropdown({
					label: "Right-aligned, left-aligned lg",
					color: "secondary",
					aligment: ["end", "lg-start"],
					option: ex.sample.dropdownitem(),
				}),
				ns.dropdown({
					label: "Dropstart",
					color: "secondary",
					arrow: "start",
					option: ex.sample.dropdownitem(),
				}),
				ns.dropdown({
					label: "Dropend",
					color: "secondary",
					arrow: "end",
					option: ex.sample.dropdownitem(),
				}),
				ns.dropdown({
					label: "Dropup",
					color: "secondary",
					arrow: "up",
					option: ex.sample.dropdownitem(),
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
							elems: ns.div("text-muted p-4", null, { width: "200px" }, [
								ns.p("Some example text that's free-flowing within the dropdown menu."),
								ns.p("mb-0", "And this is more example text."),
							]),
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
							elems: ns.div("p-3 row row-cols-1 g-3", [
								ns.input({
									size: "col",
									type: "email",
									label: "Email address",
									placeholder: "email@example.com",
								}),
								ns.input({
									size: "col",
									type: "password",
									label: "Password",
									placeholder: "Password",
								}),
								ns.input({ size: "col", type: "checkbox", label: "Remember me" }),
								ns.div(
									"col",
									ns.button({
										type: "submit",
										color: "primary",
										label: "Sign in",
									})
								),
							]),
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
		container: ns.cont.stack,
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
		code: function () {
			return [
				ns.dropdown({
					label: "Offset",
					color: "secondary",
					offset: "20,30",
					option: ex.sample.dropdownitem(),
				}),
				ns.dropdown({
					label: "Reference",
					color: "secondary",
					reference: "parent",
					segmenttoggle: true,
					option: ex.sample.dropdownitem(),
				}),
			];
		},
	}),

	ns.example({
		title: "Auto close behavior",
		container: ns.cont.stack,
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
		code: function () {
			return [
				ns.dropdown({
					label: "Default dropdown",
					color: "secondary",
					option: ex.sample.dropdownitem(),
				}),
				ns.dropdown({
					label: "Clickable outside",
					color: "secondary",
					autoclose: "outside",
					option: ex.sample.dropdownitem(),
				}),
				ns.dropdown({
					label: "Clickable inside",
					color: "secondary",
					autoclose: "inside",
					option: ex.sample.dropdownitem(),
				}),
				ns.dropdown({
					label: "Manual close",
					color: "secondary",
					autoclose: false,
					option: ex.sample.dropdownitem(),
				}),
			];
		},
	}),
];

var e_collapse = [
	ns.example({
		title: "Collapse",
		msg: "Toggle the visibility of content across your project with a few classes and our JavaScript plugins.",
		anchor: false,
	}),

	ns.example({
		title: "Example",
		container: ns.cont.stack,
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
		container: ns.cont.stack,
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
		title: "Close button",
		msg: "A generic close button for dismissing content like modals and alerts.",
		anchor: false,
	}),

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
		container: ns.cont.stack,
		code: function () {
			return [ns.close({ white: true }), ns.close({ white: true, disabled: true })];
		},
	}),
];

var e_carosel = [
	ns.example({
		title: "Carousel",
		msg: "A slideshow component for cycling through elements—images or slides of text—like a carousel.",
		anchor: false,
	}),

	ns.example({
		title: "Slide only",
		sample: { "ex.sample.imgurl": ex.sample.imgurl },
		code: function () {
			return ns.carousel({
				item: [
					ex.sample.imgurl(),
					ex.sample.imgurl(),
					ex.sample.imgurl(),
					ex.sample.imgurl(),
					ex.sample.imgurl(),
					ex.sample.imgurl(),
				],
			});
		},
	}),

	ns.example({
		title: "With control",
		sample: { "ex.sample.imgurl": ex.sample.imgurl },
		code: function () {
			return ns.carousel({
				control: true,
				item: [
					ex.sample.imgurl(),
					ex.sample.imgurl(),
					ex.sample.imgurl(),
					ex.sample.imgurl(),
					ex.sample.imgurl(),
					ex.sample.imgurl(),
				],
			});
		},
	}),

	ns.example({
		title: "With indicator",
		sample: { "ex.sample.imgurl": ex.sample.imgurl },
		code: function () {
			return ns.carousel({
				control: true,
				indicators: true,
				item: [
					ex.sample.imgurl(),
					ex.sample.imgurl(),
					ex.sample.imgurl(),
					ex.sample.imgurl(),
					ex.sample.imgurl(),
					ex.sample.imgurl(),
				],
			});
		},
	}),

	ns.example({
		title: "With caption",
		sample: { "ex.sample.imgurl": ex.sample.imgurl },
		code: function () {
			return ns.carousel({
				control: true,
				indicators: true,
				item: [
					{
						caption: "Title #1",
						text: "This is text for image no #1",
						src: ex.sample.imgurl(),
					},
					{
						caption: "Title #2",
						text: "This is text for image no #2",
						src: ex.sample.imgurl(),
					},
					{
						caption: "Title #3",
						text: "This is text for image no #3",
						src: ex.sample.imgurl(),
					},
					{
						caption: "Title #4",
						text: "This is text for image no #4",
						src: ex.sample.imgurl(),
					},
					{
						caption: "Title #5",
						text: "This is text for image no #5",
						src: ex.sample.imgurl(),
					},
					{
						caption: "Title #6",
						text: "This is text for image no #6",
						src: ex.sample.imgurl(),
					},
				],
			});
		},
	}),

	ns.example({
		title: "Crossfade",
		sample: { "ex.sample.imgurl": ex.sample.imgurl },
		code: function () {
			return ns.carousel({
				control: true,
				fade: true,
				item: [
					ex.sample.imgurl(),
					ex.sample.imgurl(),
					ex.sample.imgurl(),
					ex.sample.imgurl(),
					ex.sample.imgurl(),
					ex.sample.imgurl(),
				],
			});
		},
	}),

	ns.example({
		title: "Individual interval",
		sample: { "ex.sample.imgurl": ex.sample.imgurl },
		code: function () {
			return ns.carousel({
				control: true,
				indicators: true,
				item: [
					{ interval: 10000, src: ex.sample.imgurl() },
					{ interval: 2000, src: ex.sample.imgurl() },
					{ interval: 5000, src: ex.sample.imgurl() },
					{ interval: 1000, src: ex.sample.imgurl() },
					{ interval: 3000, src: ex.sample.imgurl() },
					{ interval: 7500, src: ex.sample.imgurl() },
				],
			});
		},
	}),

	ns.example({
		title: "Disable touch swiping",
		sample: { "ex.sample.imgurl": ex.sample.imgurl },
		code: function () {
			return ns.carousel({
				control: true,
				touch: false,
				item: [
					ex.sample.imgurl(),
					ex.sample.imgurl(),
					ex.sample.imgurl(),
					ex.sample.imgurl(),
					ex.sample.imgurl(),
					ex.sample.imgurl(),
				],
			});
		},
	}),

	ns.example({
		title: "Dark variant",
		sample: { "ex.sample.imgurl": ex.sample.imgurl },
		code: function () {
			return ns.carousel({
				control: true,
				indicators: true,
				dark: true,
				item: [
					{
						caption: "Title #1",
						text: "This is text for image no #1",
						src: ex.sample.imgurl(),
					},
					{
						caption: "Title #2",
						text: "This is text for image no #2",
						src: ex.sample.imgurl(),
					},
					{
						caption: "Title #3",
						text: "This is text for image no #3",
						src: ex.sample.imgurl(),
					},
					{
						caption: "Title #4",
						text: "This is text for image no #4",
						src: ex.sample.imgurl(),
					},
					{
						caption: "Title #5",
						text: "This is text for image no #5",
						src: ex.sample.imgurl(),
					},
					{
						caption: "Title #6",
						text: "This is text for image no #6",
						src: ex.sample.imgurl(),
					},
				],
			});
		},
	}),
];

var e_card = [
	ns.example({
		title: "Cards",
		msg: "Bootstrap’s cards provide a flexible and extensible content container with multiple variants and options.",
		anchor: false,
	}),

	ns.example({
		title: "Example",
		sample: { "ex.sample.imgurl": ex.sample.imgurl },
		code: function () {
			return ns.card.container({
				style: { width: "18rem" },
				elems: [
					ns.card.img({
						placement: "top",
						src: ex.sample.imgurl(),
					}),
					ns.card.body([
						ns.card.title("Card Title"),
						ns.card.text(
							"Some quick example text to build on the card title and make up the bulk of the card's content."
						),
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
						ns.card.text(
							"Some quick example text to build on the card title and make up the bulk of the card's content."
						),
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
		sample: { "ex.sample.imgurl": ex.sample.imgurl },
		code: function () {
			return ns.card.container({
				style: { width: "18rem" },
				elems: [
					ns.card.img({
						placement: "top",
						src: ex.sample.imgurl(),
					}),
					ns.card.body([
						ns.card.text(
							"Some quick example text to build on the card title and make up the bulk of the card's content."
						),
					]),
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
					elems: [
						ns.listgroup.item("An item"),
						ns.listgroup.item("A second item"),
						ns.listgroup.item("A third item"),
					],
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
						elems: [
							ns.listgroup.item("An item"),
							ns.listgroup.item("A second item"),
							ns.listgroup.item("A third item"),
						],
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
						elems: [
							ns.listgroup.item("An item"),
							ns.listgroup.item("A second item"),
							ns.listgroup.item("A third item"),
						],
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
		sample: { "ex.sample.imgurl": ex.sample.imgurl },
		code: function () {
			return ns.card.container({
				style: { width: "18rem" },
				elems: [
					ns.card.img({
						placement: "top",
						src: ex.sample.imgurl(),
					}),
					ns.card.body([
						ns.card.title("Card Title"),
						ns.card.text(
							"Some quick example text to build on the card title and make up the bulk of the card's content."
						),
					]),
					ns.listgroup.container({
						flush: true,
						elems: [
							ns.listgroup.item("An item"),
							ns.listgroup.item("A second item"),
							ns.listgroup.item("A third item"),
						],
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
			return ns.div("row", [
				ns.div(
					"col-sm-6",
					ns.card.container({
						elems: [
							ns.card.body([
								ns.card.title("Special title treatment"),
								ns.card.text("With supporting text below as a natural lead-in to additional content."),
								ns.button({ label: "Go somewhere", color: "primary" }),
							]),
						],
					})
				),
				ns.div(
					"col-sm-6",
					ns.card.container({
						elems: [
							ns.card.body([
								ns.card.title("Special title treatment"),
								ns.card.text("With supporting text below as a natural lead-in to additional content."),
								ns.button({ label: "Go somewhere", color: "primary" }),
							]),
						],
					})
				),
			]);
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
		container: ns.cont.stack,
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
		sample: { "ex.sample.text": ex.sample.text },
		code: function () {
			return ns.nav({
				style: "tab",
				elems: [
					{
						label: "First",
						active: true,
						elems: ["<b>This is the first item's tab body.</b> ", ex.sample.text()].join(""),
					},
					{
						label: "Second",
						elems: ["<b>This is the second item's tab body.</b> ", ex.sample.text()].join(""),
					},
					{
						label: "Third",
						elems: ["<b>This is the third item's tab body.</b> ", ex.sample.text()].join(""),
					},
				],
			});
		},
	}),

	ns.example({
		title: "Pill style tab",
		sample: { "ex.sample.text": ex.sample.text },
		code: function () {
			return ns.nav({
				style: "pill",
				elems: [
					{
						label: "First",
						active: true,
						elems: ["<b>This is the first item's tab body.</b> ", ex.sample.text()].join(""),
					},
					{
						label: "Second",
						elems: ["<b>This is the second item's tab body.</b> ", ex.sample.text()].join(""),
					},
					{
						label: "Third",
						elems: ["<b>This is the third item's tab body.</b> ", ex.sample.text()].join(""),
					},
				],
			});
		},
	}),

	ns.example({
		title: "Images",
		container: ns.cont.stack,
		sample: { "ex.sample.imgurl": ex.sample.imgurl },
		code: function () {
			return [
				ns.card.container({
					elems: [
						ns.card.img({
							placement: "top",
							src: ex.sample.imgurl(),
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
							src: ex.sample.imgurl(),
						}),
					],
				}),
			];
		},
	}),

	ns.example({
		title: "Image overlays",
		sample: { "ex.sample.imgurl": ex.sample.imgurl },
		code: function () {
			return ns.card.container({
				textcolor: "light",
				elems: [
					ns.card.img({
						src: ex.sample.imgurl(),
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
		sample: { "ex.sample.imgurl": ex.sample.imgurl },
		code: function () {
			return ns.card.container({
				elems: [
					ns.card.horizontal({
						size: "col-4",
						left: [
							ns.card.img({
								placement: "top",
								src: ex.sample.imgurl(400, 800),
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
		container: ns.cont.stack,
		code: function () {
			return ns.card.container({
				color: "primary",
				textcolor: "light",
				style: { width: "18rem" },
				elems: [
					ns.card.header("Header"),
					ns.card.body([
						ns.card.title(`Primary card title`),
						ns.card.text(
							"Some quick example text to build on the card title and make up the bulk of the card's content."
						),
					]),
				],
			});
		},
	}),

	ns.example({
		title: "Example background and color",
		container: ns.cont.stack,
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
							ns.card.text(
								"Some quick example text to build on the card title and make up the bulk of the card's content."
							),
						]),
					],
				});
			});
		},
	}),

	ns.example({
		title: "Border color",
		container: ns.cont.stack,
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
							ns.card.text(
								"Some quick example text to build on the card title and make up the bulk of the card's content."
							),
						],
					}),
				],
			});
		},
	}),

	ns.example({
		title: "Example border color",
		container: ns.cont.stack,
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
								ns.card.text(
									"Some quick example text to build on the card title and make up the bulk of the card's content."
								),
							],
						}),
					],
				});
			});
		},
	}),

	ns.example({
		title: "Mixins utilities",
		container: ns.cont.stack,
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
							ns.card.text(
								"Some quick example text to build on the card title and make up the bulk of the card's content."
							),
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
		container: ns.cont.stack,
		sample: { "ex.sample.imgurl": ex.sample.imgurl, "ex.sample.card": ex.sample.card },
		code: function () {
			return ns.card.group([
				ns.card.container({
					elems: [
						ns.card.img({
							placement: "top",
							src: ex.sample.imgurl(),
						}),
						ns.card.body([
							ns.card.title("Card Title"),
							ns.card.text(
								"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
							),
						]),
					],
				}),
				ex.sample.card()[1],
				ex.sample.card()[2],
			]);
		},
	}),

	ns.example({
		title: "Card groups with footer",
		container: ns.cont.stack,
		sample: {
			"ex.sample.imgurl": ex.sample.imgurl,
			"ex.sample.cardwithfooter": ex.sample.cardwithfooter,
		},
		code: function () {
			return ns.card.group([
				ns.card.container({
					elems: [
						ns.card.img({
							placement: "top",
							src: ex.sample.imgurl(),
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
				ex.sample.cardwithfooter()[1],
				ex.sample.cardwithfooter()[2],
			]);
		},
	}),

	ns.example({
		title: "Card grid using {{row-cols-md-2}}",
		sample: { "ex.sample.card": ex.sample.card },
		code: function () {
			return ns.div("row row-cols-1 row-cols-md-2 g-4", [
				ns.div("col", ex.sample.card()[0]),
				ns.div("col", ex.sample.card()[1]),
				ns.div("col", ex.sample.card()[2]),
				ns.div("col", ex.sample.card()[3]),
			]);
		},
	}),

	ns.example({
		title: "Card grid using {{row-cols-md-3}}",
		sample: { "ex.sample.card": ex.sample.card },
		code: function () {
			return ns.div("row row-cols-1 row-cols-md-3 g-4", [
				ns.div("col", ex.sample.card()[0]),
				ns.div("col", ex.sample.card()[1]),
				ns.div("col", ex.sample.card()[2]),
				ns.div("col", ex.sample.card()[3]),
			]);
		},
	}),

	ns.example({
		title: "Card grid with {{h-100}} class",
		sample: { "ex.sample.imgurl": ex.sample.imgurl, "ex.sample.cardh100": ex.sample.cardh100 },
		code: function () {
			return ns.div("row row-cols-1 row-cols-md-3 g-4", [
				ns.div(
					"col",
					ns.card.container({
						class: "h-100",
						elems: [
							ns.card.img({
								placement: "top",
								src: ex.sample.imgurl(),
							}),
							ns.card.body([
								ns.card.title("Card Title"),
								ns.card.text(
									"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
								),
							]),
						],
					})
				),
				ns.div("col", ex.sample.cardh100()[0]),
				ns.div("col", ex.sample.cardh100()[1]),
				ns.div("col", ex.sample.cardh100()[2]),
			]);
		},
	}),

	ns.example({
		title: "Card grid with {{h-100}} class",
		sample: {
			"ex.sample.imgurl": ex.sample.imgurl,
			"ex.sample.cardwithfooterh100": ex.sample.cardwithfooterh100,
		},
		code: function () {
			return ns.div("row row-cols-1 row-cols-md-3 g-4", [
				ns.div(
					"col",
					ns.card.container({
						class: "h-100",
						elems: [
							ns.card.img({
								placement: "top",
								src: ex.sample.imgurl(),
							}),
							ns.card.body([
								ns.card.title("Card Title"),
								ns.card.text(
									"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
								),
							]),
							ns.card.footer("Last updated 3 mins ago"),
						],
					})
				),
				ns.div("col", ex.sample.cardwithfooterh100()[0]),
				ns.div("col", ex.sample.cardwithfooterh100()[1]),
				ns.div("col", ex.sample.cardwithfooterh100()[2]),
			]);
		},
	}),
];

var e_btngroup = [
	ns.example({
		title: "Button group",
		msg: "Group a series of buttons together on a single line or stack them in a vertical column.",
		anchor: false,
	}),

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
				ns.button({
					href: "javascript:void(0);",
					label: "Active link",
					color: "primary",
					active: true,
				}),
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
					ns.button({
						type: "checkbox",
						outline: true,
						label: "Middle",
						color: "primary",
					}),
					ns.button({
						type: "checkbox",
						outline: true,
						label: "Right",
						color: "primary",
					}),
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
					ns.button({
						name: "g6",
						type: "radio",
						outline: true,
						label: "Left",
						color: "primary",
					}),
					ns.button({
						name: "g6",
						type: "radio",
						outline: true,
						label: "Middle",
						color: "primary",
					}),
					ns.button({
						name: "g6",
						type: "radio",
						outline: true,
						label: "Right",
						color: "primary",
					}),
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
					ns.button({
						name: "g9",
						type: "radio",
						outline: true,
						label: "Radio 1",
						color: "danger",
						checked: true,
					}),
					ns.button({
						name: "g9",
						type: "radio",
						outline: true,
						label: "Radio 2",
						color: "danger",
					}),
					ns.button({
						name: "g9",
						type: "radio",
						outline: true,
						label: "Radio 3",
						color: "danger",
					}),
				],
			});
		},
	}),
];

var e_btn = [
	ns.example({
		title: "Buttons",
		msg: "Use Bootstrap’s custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.",
		anchor: false,
	}),

	ns.example({
		title: "Examples",
		container: ns.cont.stack,
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
		container: ns.cont.stack,
		code: function () {
			return [
				ns.button({
					label: "Disable text wrapping button",
					color: "primary",
					nowarp: true,
				}),
			];
		},
	}),

	ns.example({
		title: "Button tags",
		container: ns.cont.stack,
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
		container: ns.cont.stack,
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
		container: ns.cont.stack,
		code: function () {
			return [
				ns.button({ weight: "lg", label: "Large button", color: "primary" }),
				ns.button({ weight: "lg", label: "Large button", color: "secondary" }),
			];
		},
	}),

	ns.example({
		title: "Small Size",
		container: ns.cont.stack,
		code: function () {
			return [
				ns.button({ weight: "sm", label: "Small button", color: "primary" }),
				ns.button({ weight: "sm", label: "Small button", color: "secondary" }),
			];
		},
	}),

	ns.example({
		title: "Disabled state",
		container: ns.cont.stack,
		code: function () {
			return [
				ns.button({
					weight: "lg",
					disabled: true,
					label: "Primary button",
					color: "primary",
				}),
				ns.button({ weight: "lg", disabled: true, label: "Button", color: "secondary" }),
			];
		},
	}),

	ns.example({
		title: "Disabled button link state",
		container: ns.cont.stack,
		code: function () {
			return [
				ns.button({
					weight: "lg",
					disabled: true,
					label: "Primary link",
					color: "primary",
					href: "javascript:void(0);",
				}),
				ns.button({
					weight: "lg",
					disabled: true,
					label: "Link",
					color: "secondary",
					href: "javascript:void(0);",
				}),
			];
		},
	}),

	ns.example({
		title: "Block buttons",
		code: function () {
			return ns.div("d-grid gap-2", [
				ns.button({ label: "Button", color: "primary" }),
				ns.button({ label: "Button", color: "primary" }),
				ns.button({ label: "Button", color: "primary" }),
			]);
		},
	}),

	ns.example({
		title: "Block buttons md",
		code: function () {
			return ns.div("d-grid gap-2 d-md-block", [
				ns.button({ label: "Button", color: "primary" }),
				ns.button({ label: "Button", color: "primary" }),
				ns.button({ label: "Button", color: "primary" }),
			]);
		},
	}),

	ns.example({
		title: "Centered in horizontal",
		code: function () {
			return ns.div("d-grid gap-2 col-6 mx-auto", [
				ns.button({ label: "Button", color: "primary" }),
				ns.button({ label: "Button", color: "primary" }),
				ns.button({ label: "Button", color: "primary" }),
			]);
		},
	}),

	ns.example({
		title: "Right align",
		code: function () {
			return ns.div("d-grid gap-2 d-md-flex justify-content-md-end", [
				ns.button({ label: "Button", color: "primary" }),
				ns.button({ label: "Button", color: "primary" }),
				ns.button({ label: "Button", color: "primary" }),
			]);
		},
	}),

	ns.example({
		title: "Toggle state button",
		container: ns.cont.stack,
		code: function () {
			return [
				ns.button({ toggle: true, label: "Toggle button", color: "primary" }),
				ns.button({
					toggle: true,
					label: "Active toggle button",
					color: "primary",
					active: true,
				}),
				ns.button({
					toggle: true,
					label: "Disabled toggle button",
					color: "primary",
					disabled: true,
				}),
			];
		},
	}),

	ns.example({
		title: "Toggle state link",
		container: ns.cont.stack,
		code: function () {
			return [
				ns.button({
					toggle: true,
					href: "javascript:void(0)",
					label: "Toggle link",
					color: "primary",
				}),
				ns.button({
					toggle: true,
					href: "javascript:void(0)",
					label: "Active toggle link",
					color: "primary",
					active: true,
				}),
				ns.button({
					toggle: true,
					href: "javascript:void(0)",
					label: "Disabled toggle link",
					color: "primary",
					disabled: true,
				}),
			];
		},
	}),
];

var e_breadcrumb = [
	ns.example({
		title: "Breadcrumb",
		msg: "Indicate the current page’s location within a navigational hierarchy that automatically adds separators via CSS.",
		anchor: false,
	}),

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
			return ns.breadcrumb({
				divider: "'>'",
				item: [
					{ label: "Home", href: "javascript:void(0);" },
					{ label: "Library", href: "javascript:void(0);" },
					{ label: "Data", active: true, href: "javascript:void(0);" },
				],
			});
		},
	}),

	ns.example({
		title: "Divider URL",
		code: function () {
			return ns.breadcrumb({
				divider: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E")`,
				item: [
					{ label: "Home", href: "javascript:void(0);" },
					{ label: "Library", href: "javascript:void(0);" },
					{ label: "Data", active: true, href: "javascript:void(0);" },
				],
			});
		},
	}),

	ns.example({
		title: "Divider None",
		code: function () {
			return ns.breadcrumb({
				divider: "''",
				item: [
					{ label: "Home", href: "javascript:void(0);" },
					{ label: "Library", href: "javascript:void(0);" },
					{ label: "Data", active: true, href: "javascript:void(0);" },
				],
			});
		},
	}),
];

var e_badge = [
	ns.example({
		title: "Badges",
		msg: "Documentation and examples for badges, our small count and labeling component.",
		anchor: false,
	}),

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
			return ns.button({
				label: "Inbox",
				color: "primary",
				relativeposition: true,
				badge: {
					label: "99+",
					color: "danger",
					notification: true,
					pill: true,
				},
			});
		},
	}),

	ns.example({
		title: "Notification",
		code: function () {
			return ns.button({
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
			});
		},
	}),

	ns.example({
		title: "Background color",
		container: ns.cont.stack,
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
		container: ns.cont.stack,
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
		title: "Alert",
		msg: "Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.",
		anchor: false,
	}),

	ns.example({
		title: "Example",
		code: function () {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(function (i) {
				return ns.alert.container(i, `A simple ${i} alert—check it out!`);
			});
		},
	}),

	ns.example({
		title: "Link color",
		code: function () {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(function (i) {
				return ns.alert.container({
					color: i,
					elems: [
						`A simple ${i} alert with `,
						ns.alert.link("an example link", "javascript:void(0);"),
						`. Give it a click if you like.`,
					],
				});
			});
		},
	}),

	ns.example({
		title: "Additional content",
		code: function () {
			return ns.alert.container({
				color: "success",
				elems: [
					ns.alert.header("Well done!"),
					{
						tag: "p",
						elems: "Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.",
					},
					{ tag: "hr", elems: "" },
					{
						tag: "p",
						class: "mb-0",
						elems: "Whenever you need to, be sure to use margin utilities to keep things nice and tidy.",
					},
				],
			});
		},
	}),

	ns.example({
		title: "Icons",
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
		code: function () {
			return ns.alert.container({
				dismissible: true,
				color: "warning",
				elems: "<strong>Holy guacamole!</strong> You should check in on some of those fields below.",
			});
		},
	}),
];

var e_accordion = [
	ns.example({
		title: "Accordion",
		msg: "Build vertically collapsing accordions in combination with our Collapse JavaScript plugin.",
		anchor: false,
	}),

	ns.example({
		title: "Example",
		msg: "Click the accordions below to expand/collapse the accordion content.",
		sample: { "ex.sample.text": ex.sample.text },
		code: function () {
			return ns.accordion({
				item: [
					{
						label: "Accordion Item 1",
						elems: ["<b>This is the first item's accordion body.</b> ", ex.sample.text()].join(""),
					},
					{
						label: "Accordion Item 2",
						elems: ["<b>This is the second item's accordion body.</b> ", ex.sample.text()].join(""),
					},
					{
						label: "Accordion Item 3",
						elems: ["<b>This is the third item's accordion body.</b> ", ex.sample.text()].join(""),
					},
				],
			});
		},
	}),

	ns.example({
		title: "Flush",
		msg: "Set {{flush:true}} to remove the default background-color, some borders, and some rounded corners to render accordions edge-to-edge with their parent container.",
		sample: { "ex.sample.text": ex.sample.text },
		code: function () {
			return ns.accordion({
				flush: true,
				item: [
					{
						label: "Accordion Item 1",
						elems: ["<b>This is the first item's accordion body.</b> ", ex.sample.text()].join(""),
					},
					{
						label: "Accordion Item 2",
						elems: ["<b>This is the second item's accordion body.</b> ", ex.sample.text()].join(""),
					},
					{
						label: "Accordion Item 3",
						elems: ["<b>This is the third item's accordion body.</b> ", ex.sample.text()].join(""),
					},
				],
			});
		},
	}),

	ns.example({
		title: "Always open",
		msg: "Set {{autoclose:false}} to make accordion items stay open when another item is opened.",
		sample: { "ex.sample.text": ex.sample.text },
		code: function () {
			return ns.accordion({
				autoclose: false,
				item: [
					{
						label: "Accordion Item 1",
						elems: ["<b>This is the first item's accordion body.</b> ", ex.sample.text()].join(""),
					},
					{
						label: "Accordion Item 2",
						elems: ["<b>This is the second item's accordion body.</b> ", ex.sample.text()].join(""),
					},
					{
						label: "Accordion Item 3",
						elems: ["<b>This is the third item's accordion body.</b> ", ex.sample.text()].join(""),
					},
				],
			});
		},
	}),
];

var e_input = [
	ns.example({
		title: "Form controls",
		msg: "Give textual form controls like {{&lt;input&gt;}}s and {{&lt;textarea&gt;}}s an upgrade with custom styles, sizing, focus states, and more.",
		anchor: false,
	}),

	ns.example({
		title: "Example",
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
			return ns.input({
				readonly: true,
				type: "text",
				placeholder: "Readonly input here...",
			});
		},
	}),

	ns.example({
		title: "Readonly plain text",
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
		container: ns.cont.stack,
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
		container: ns.cont.formcontainer,
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
		container: ns.cont.formcontainer,
		code: function () {
			return ns.input({ label: "Color picker", type: "color" });
		},
	}),

	ns.example({
		title: "Datalist",
		code: function () {
			return ns.input({
				label: "Datalist example",
				type: "text",
				option: ["San Francisco", "New York", "Seattle", "Los Angeles", "Chicago"],
			});
		},
	}),
];

var e_select = [
	ns.example({
		title: "Select",
		msg: "Customize the native {{&lt;select&gt;}}s with custom CSS that changes the element’s initial appearance.",
		anchor: false,
	}),

	ns.example({
		title: "Default",
		sample: { "ex.sample.optionitem": ex.sample.optionitem },
		code: function () {
			return ns.input({
				hiddenlabel: "Default select example",
				type: "select",
				option: ex.sample.optionitem(),
			});
		},
	}),

	ns.example({
		title: "Sizing",
		sample: { "ex.sample.optionitem": ex.sample.optionitem },
		code: function () {
			return [
				ns.input({
					weight: "lg",
					hiddenlabel: "Large select example",
					type: "select",
					option: ex.sample.optionitem(),
				}),
				ns.input({
					weight: "sm",
					hiddenlabel: "Small select example",
					type: "select",
					option: ex.sample.optionitem(),
				}),
			];
		},
	}),

	ns.example({
		title: "Multiple",
		sample: { "ex.sample.optionitem": ex.sample.optionitem },
		code: function () {
			return ns.input({
				multiple: true,
				hiddenlabel: "Multiple select example",
				type: "select",
				option: ex.sample.optionitem(),
			});
		},
	}),

	ns.example({
		title: "Size",
		sample: { "ex.sample.optionitem": ex.sample.optionitem },
		code: function () {
			return ns.input({
				size: 3,
				hiddenlabel: "Size 3 select example",
				type: "select",
				option: ex.sample.optionitem(),
			});
		},
	}),

	ns.example({
		title: "Disabled",
		sample: { "ex.sample.optionitem": ex.sample.optionitem },
		code: function () {
			return ns.input({
				disabled: true,
				hiddenlabel: "Disabled select example",
				type: "select",
				option: ex.sample.optionitem(),
			});
		},
	}),
];

var e_radio = [
	ns.example({
		title: "Checks and radios",
		msg: "Create consistent cross-browser and cross-device checkboxes and radios with our completely rewritten checks component.",
		anchor: false,
	}),

	ns.example({
		title: "Checks",
		code: function () {
			return [
				ns.input({ label: "Default checkbox", type: "checkbox" }),
				ns.input({ label: "Checked checkbox", type: "checkbox", checked: true }),
			];
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
				ns.input({
					label: "Disabled checked checkbox",
					type: "checkbox",
					checked: true,
					disabled: true,
				}),
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
				ns.input({
					name: "g2",
					label: "Disabled checked radio",
					type: "radio",
					checked: true,
					disabled: true,
				}),
			];
		},
	}),

	ns.example({
		title: "Switch",
		code: function () {
			return [
				ns.input({ label: "Default switch checkbox input", type: "switch" }),
				ns.input({ label: "Checked switch checkbox input", type: "switch", checked: true }),
				ns.input({
					label: "Disabled switch checkbox input",
					type: "switch",
					disabled: true,
				}),
				ns.input({
					label: "Disabled checked switch checkbox input",
					type: "switch",
					checked: true,
					disabled: true,
				}),
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
				ns.input({
					name: "g4",
					label: "Disabled checked radio",
					type: "radio",
					checked: true,
					disabled: true,
				}),
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
				ns.input({
					name: "g5",
					label: "3 (disabled)",
					type: "radio",
					disabled: true,
					inline: true,
				}),
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
			return ns.button({
				type: "checkbox",
				checked: true,
				label: "Checked",
				color: "primary",
			});
		},
	}),

	ns.example({
		title: "Checkbox toggle button disabled",
		code: function () {
			return ns.button({
				type: "checkbox",
				disabled: true,
				label: "Disabled",
				color: "primary",
			});
		},
	}),

	ns.example({
		title: "Radio toggle buttons",
		container: ns.cont.stack,
		code: function () {
			return [
				ns.button({
					type: "radio",
					name: "g7",
					label: "Checked",
					checked: true,
					color: "secondary",
				}),
				ns.button({ type: "radio", name: "g7", label: "Radio", color: "secondary" }),
				ns.button({
					type: "radio",
					name: "g7",
					label: "Disabled",
					disabled: true,
					color: "secondary",
				}),
				ns.button({ type: "radio", name: "g7", label: "Radio", color: "secondary" }),
			];
		},
	}),

	ns.example({
		title: "Outlined styles",
		container: ns.cont.stack,
		code: function () {
			return [
				ns.button({
					type: "checkbox",
					outline: true,
					label: "Single toggle",
					color: "primary",
				}),
				ns.button({
					type: "checkbox",
					outline: true,
					label: "Checked",
					checked: true,
					color: "secondary",
				}),
				ns.button({
					type: "radio",
					outline: true,
					name: "g8",
					label: "Checked success radio",
					checked: true,
					color: "success",
				}),
				ns.button({
					type: "radio",
					outline: true,
					name: "g8",
					label: "Danger radio",
					color: "danger",
				}),
			];
		},
	}),
];

var e_range = [
	ns.example({
		title: "Range",
		msg: "Use our custom range inputs for consistent cross-browser styling and built-in customization.",
		anchor: false,
	}),

	ns.example({
		title: "Example Range",
		code: function () {
			return ns.input({
				label: "Simple Range",
				type: "range",
				value: 50,
			});
		},
	}),

	ns.example({
		title: "Disable",
		code: function () {
			return ns.input({
				label: "Disable Range",
				type: "range",
				disabled: true,
				value: 50,
			});
		},
	}),

	ns.example({
		title: "Min and max",
		code: function () {
			return ns.input({
				label: "Example Range",
				type: "range",
				value: 2.5,
				min: 0,
				max: 5,
			});
		},
	}),

	ns.example({
		title: "Step",
		code: function () {
			return ns.input({
				label: "Example Range",
				type: "range",
				value: 2.5,
				min: 0,
				max: 5,
				step: 0.5,
			});
		},
	}),
];

var e_inputgroup = [
	ns.example({
		title: "Input group",
		msg: "Easily extend form controls by adding text, buttons, or button groups on either side of textual inputs, custom selects, and custom file inputs.",
		anchor: false,
	}),

	ns.example({
		title: "Basic example",
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
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
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
						option: ex.sample.dropdownitem(),
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
						option: ex.sample.dropdownitem(),
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
						option: ex.sample.dropdownitem(),
					}),
					aftertype: "dropdown",
					after: ns.dropdown({
						outline: true,
						color: "secondary",
						label: "Dropdown",
						container: null,
						option: ex.sample.dropdownitem(),
					}),
				}),
			];
		},
	}),

	ns.example({
		title: "Segmented buttons",
		sample: { "ex.sample.dropdownitem": ex.sample.dropdownitem },
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
						option: ex.sample.dropdownitem(),
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
						option: ex.sample.dropdownitem(),
					}),
				}),
			];
		},
	}),

	ns.example({
		title: "Segmented buttons",
		sample: { "ex.sample.optionitem": ex.sample.optionitem },
		code: function () {
			return [
				ns.input({
					type: "select",
					before: "Options",
					option: ex.sample.optionitem(),
				}),

				ns.input({
					type: "select",
					after: "Options",
					option: ex.sample.optionitem(),
				}),

				ns.input({
					type: "select",
					beforetype: "button",
					before: ns.button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
					option: ex.sample.optionitem(),
				}),

				ns.input({
					type: "select",
					aftertype: "button",
					after: ns.button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
					option: ex.sample.optionitem(),
				}),
			];
		},
	}),

	ns.example({
		title: "Custom file input",
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
		title: "Floating labels",
		msg: "Create beautifully simple form labels that float over your input fields.",
		anchor: false,
	}),

	ns.example({
		title: "Example",
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
		code: function () {
			return ns.input({
				type: "email",
				label: "Email address",
				floatinglabel: true,
				value: "user@example.com",
			});
		},
	}),

	ns.example({
		title: "Validation",
		code: function () {
			return ns.input({
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
						ns.validate($(sender).closest(".card-body"));
					},
				}),
			});
		},
	}),

	ns.example({
		title: "Textareas",
		code: function () {
			return ns.input({
				type: "textarea",
				label: "Comments",
				floatinglabel: true,
			});
		},
	}),

	ns.example({
		title: "Textareas With Height Setting",
		code: function () {
			return ns.input({
				type: "textarea",
				label: "Comments",
				style: { height: "100px" },
				floatinglabel: true,
			});
		},
	}),

	ns.example({
		title: "Select",
		sample: { "ex.sample.optionitem": ex.sample.optionitem },
		code: function () {
			return ns.input({
				label: "Works with selects",
				type: "select",
				floatinglabel: true,
				option: ex.sample.optionitem(),
			});
		},
	}),
];

var menu = [
	[{ label: "Introduction", onclick: "showexample(this,'e_introduction')" }],
	[
		{ label: "Containers", onclick: "showexample(this,'e_container')" },
		{ label: "Grid", onclick: "showexample(this,'e_grid')" },
		{ label: "Columns", onclick: "showexample(this,'e_column')" },
		{ label: "Gutter", onclick: "showexample(this,'e_gutter')" },
	],
	[
		{ label: "Form control", onclick: "showexample(this,'e_input')" },
		{ label: "Select", onclick: "showexample(this,'e_select')" },
		{ label: "Check &amp; radios", onclick: "showexample(this,'e_radio')" },
		{ label: "Range", onclick: "showexample(this,'e_range')" },
		{ label: "Input group", onclick: "showexample(this,'e_inputgroup')" },
		{ label: "Floating label", onclick: "showexample(this,'e_floatinglabel')" },
	],
	[
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
		{ label: "Navbar", onclick: "showexample(this,'e_navbar')" },
		{ label: "Offcanvas", onclick: "showexample(this,'e_offcanvas')" },
		{ label: "Paging", onclick: "showexample(this,'e_paging')" },
		{ label: "Popover", onclick: "showexample(this,'e_popover')" },
		{ label: "Progress", onclick: "showexample(this,'e_progress')" },
		{ label: "Spinners", onclick: "showexample(this,'e_spinner')" },
		{ label: "Toast", onclick: "showexample(this,'e_toast')" },
		{ label: "Tooltips", onclick: "showexample(this,'e_tooltip')" },

		// { label: "Icon", onclick: "showexample(this,'e_icon')" },
		// { label: "Image", onclick: "showexample(this,'e_img')" },
		// { label: "Link", onclick: "showexample(this,'e_link')" },
		// { label: "List", onclick: "showexample(this,'e_listctl')" },
		// { label: "Table", onclick: "showexample(this,'e_table')" },
	],
	[{ label: "Icon", onclick: "showexample(this,'e_icon')" }],
	[
		{ label: "Home", icon: "home", onclick: "window.location='index.html'" },
		{ label: "List query test", icon: "flask", onclick: "window.location='list_query_test.html'" },
	],
	[
		{ onclick: "changeTheme(this,null);", label: "Default", active: true },
		{ onclick: "changeTheme(this,'cerulean');", label: "Cerulean (L|G)" },
		{ onclick: "changeTheme(this,'cosmo');", label: "Cosmo (L|S)" },
		{ onclick: "changeTheme(this,'cyborg');", label: "Cyborg (D|S)" },
		{ onclick: "changeTheme(this,'darkly');", label: "Darkly (D|S)" },
		{ onclick: "changeTheme(this,'flatly');", label: "Flatly (L|S)" },
		{ onclick: "changeTheme(this,'journal');", label: "Journal (L|S)" },
		{ onclick: "changeTheme(this,'litera');", label: "Litera (L|S)" },
		{ onclick: "changeTheme(this,'lumen');", label: "Lumen (L|S)" },
		{ onclick: "changeTheme(this,'lux');", label: "Lux (L|S)" },
		{ onclick: "changeTheme(this,'materia');", label: "Materia (L|G)" },
		{ onclick: "changeTheme(this,'minty');", label: "Minty (L|S)" },
		{ onclick: "changeTheme(this,'morph');", label: "Morph (L|G)" },
		{ onclick: "changeTheme(this,'pulse');", label: "Pulse (L|S)" },
		{ onclick: "changeTheme(this,'quartz');", label: "Quartz (D|G)" },
		{ onclick: "changeTheme(this,'sandstone');", label: "Sandstone (L|S)" },
		{ onclick: "changeTheme(this,'simplex');", label: "Simplex (L|G)" },
		{ onclick: "changeTheme(this,'sketchy');", label: "Sketchy (L|S)" },
		{ onclick: "changeTheme(this,'slate');", label: "Slate (D|G)" },
		{ onclick: "changeTheme(this,'solar');", label: "Solar (D|S)" },
		{ onclick: "changeTheme(this,'spacelab');", label: "Spacelab (L|G)" },
		{ onclick: "changeTheme(this,'superhero');", label: "Superhero (D|S)" },
		{ onclick: "changeTheme(this,'united');", label: "United (L|S)" },
		{ onclick: "changeTheme(this,'vapor');", label: "Vapor (D|G)" },
		{ onclick: "changeTheme(this,'yeti');", label: "Yeti (L|S)" },
		{ onclick: "changeTheme(this,'zephyr');", label: "Zephyr (L|S)" },
	],
];

function showexample(sender, arg) {
	var sAll = window.performance.now();

	if (sender) {
		$(".exmenu .active").removeClass("active");
		$(sender).addClass("active");
	} else {
		$(`.exmenu [onclick="showexample(this,'${arg}')"]`).addClass("active");
	}

	setTimeout(
		function (arg, sAll) {
			var root = document.getElementById("root");
			while (root.firstChild && root.removeChild(root.firstChild)); //$(root).empty();

			var sBuild = window.performance.now();
			ns.build.append(root, window[arg]);
			var eBuild = window.performance.now();
			ns.build.init(root);
			PR.prettyPrint();

			//build TOC
			var nextbar = document.getElementById("nextbar");
			while (nextbar.firstChild && nextbar.removeChild(nextbar.firstChild));

			var li = [];
			var anchor = [].slice.call(root.getElementsByClassName("anchorjs-link"));
			if (anchor && anchor.length > 0) {
				anchor.forEach(function (el) {
					let parent = el.parentElement;
					let id = parent.id;
					li.push({
						label: parent.innerText,
						onclick: `focusExample("${id}");`,
						level: parent.nodeName === "H3" ? 1 : 0,
					});
				});

				var sToc = window.performance.now();
				ns.build.append(
					nextbar,
					ns.toc({
						label: "On this page",
						elems: li,
					})
				);
			}

			var eToc = window.performance.now();

			var eAll = window.performance.now();

			var processtime = document.getElementById("processtime");
			while (processtime.firstChild && processtime.removeChild(processtime.firstChild));

			ns.build.append(processtime, [
				ns.div("d-block d-md-inline", `All : <b>${(eAll - sAll).toFixed(1)} ms</b>`),
				ns.span("d-none d-md-inline", " | "),
				ns.div(
					"d-block d-md-inline",
					`ns.build : <b>${(eBuild - sBuild + (sToc ? eToc - sToc : 0)).toFixed(1)} ms</b>`
				),
				ns.span("d-none d-md-inline", " | "),
			]);
		},
		1,
		arg,
		sAll
	);
}

function focusExample(id) {
	ns.core.focus(document.getElementById(id)); //ns.core.focus($(`#${id}`));
}

function changeTheme(sender, theme) {
	ns.core.theme(theme);
	$(".thememenu .active").removeClass("active");
	$(sender).addClass("active");
}

$(document).ready(() => {
	//list container
	var navbar = document.getElementById("navbar"); //$("#navbar").get();
	ns.build.append(
		navbar,
		ns.navbar.container({
			expand: "md",
			color: "primary",
			light: "dark",
			// position: "fixed-top",
			containerfluid: "lg",
			elems: [
				ns.navbar.toggler("sidebar"),
				ns.navbar.brand({
					label: "BS5 Js Builder",
					icon: "fire",
					href: "javascript:void(0);",
					onclick: function () {
						ns.core.focus(document.body);
					},
				}),
			],
		})
	);

	var sidebar = document.getElementById("sidebar"); //$("#sidebar").get();
	ns.build.append(sidebar, [
		ns.menu.container({
			title: "Getting started",
			class: "exmenu",
			item: ns.menu.item(menu[0]),
		}),
		ns.menu.container({
			active: true,
			title: "Layout",
			class: "exmenu",
			item: ns.menu.item(menu[1]),
		}),
		ns.menu.container({
			title: "Forms",
			class: "exmenu",
			item: ns.menu.item(menu[2]),
		}),
		ns.menu.container({
			title: "Components",
			class: "exmenu",
			item: ns.menu.item(menu[3]),
		}),
		ns.menu.container({
			title: "Extend",
			class: "exmenu",
			item: ns.menu.item(menu[4]),
		}),
		ns.menu.container({
			title: "Others",
			item: ns.menu.item(menu[menu.length - 2]),
		}),
		ns.menu.container({
			title: "Theme",
			class: "thememenu",
			item: ns.menu.item(menu[menu.length - 1]),
		}),
	]);

	showexample(null, "e_gutter");
});
