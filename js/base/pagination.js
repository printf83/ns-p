//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	var fn = {
		paginationchange: function (skip, sender) {
			var id = $(sender).closest(".ns-list-page").attr("id");
			if (id) {
				var opt = ns.data.get(id);
				if (opt) {
					opt.skip = skip;
					ns.data.set(id, opt);

					if (ns.core.isFunction(opt.onchange)) {
						opt.onchange(skip, sender);
					}

					ns.build.replace($(sender).closest(".ns-list-page").get(), ns.pagination(opt));
				}
			}
		},
	};

	ns.pagination = function (opt) {
		opt = $.extend(
			{},
			{
				id: null,
				total: 0,
				skip: 0,
				limit: 0,
				max: 5,
				align: "center", //start|end|center(default)
				overflow: true,
				onchange: null,
				showfirstlast: true,
				shownextprev: true,
			},
			opt
		);

		var curpage = opt.skip / opt.limit + 1;
		var btncount = parseInt(opt.total / opt.limit, 10) + (opt.total % opt.limit > 0 ? 1 : 0);

		//generate id
		opt.id = opt.id ? opt.id : ns.core.UUID();

		if (opt.total > opt.limit) {
			var li = [];

			//first
			if (opt.showfirstlast) {
				li.push({
					tag: "li",
					class: ["page-item", curpage > 1 ? null : "disabled"].combine(" "),
					elems: {
						tag: "a",
						class: "page-link",
						attr: {
							"aria-label": "First Page",
							href: "javascript:void(0)",
							onclick: function (sender) {
								fn.paginationchange(0, sender);
							},
						},
						elems: ns.icon("angle-double-left"),
					},
				});
			}

			//prev
			if (opt.shownextprev) {
				li.push({
					tag: "li",
					class: ["page-item", curpage > 1 ? null : "disabled"].combine(" "),
					elems: {
						tag: "a",
						class: "page-link",
						attr: {
							"aria-label": "Previous Page",
							href: "javascript:void(0)",
							onclick: function (sender) {
								fn.paginationchange((curpage - 2) * opt.limit, sender);
							},
						},
						elems: ns.icon("angle-left"),
					},
				});
			}

			//page
			var x = 1;
			var y = btncount;
			var c = curpage;
			if (opt.max > btncount) {
				opt.max = btncount;
			}

			if (opt.max < 3) {
				opt.max = 3;
			}

			if (opt.max % 2 === 0) {
				opt.max = opt.max + 1;
			}

			//limit button
			if (y > opt.max) {
				//example for 10

				//x,2,3,4,5
				//1,x,3,4,5
				//1,2,x,4,5

				//2,3,x,5,6
				//3,4,x,6,7
				//4,5,x,7,8
				//5,6,x,8,9
				//6,7,x,9,10

				//6,7,8,x,10
				//6,7,8,9,x
				var md = parseInt(opt.max / 2, 10) + 1;

				x = c - md + 1;
				y = c + md - 1;

				if (x < 1) {
					x = 1;
					y = opt.max;
				}

				if (y > btncount) {
					y = btncount;
					x = y - opt.max + 1;
				}

				if (x < 1) {
					x = 1;
				}
			}

			//build middle button
			for (x; x <= y; x++) {
				li.push({
					tag: "li",
					class: ["page-item", x === c ? "active" : null].combine(" "),
					elems: {
						tag: "a",
						class: "page-link",
						attr: {
							"aria-label": "Page " + x.toString(),
							href: "javascript:void(0)",
							onclick: function (sender) {
								var xnum = parseInt($(sender).text(), 10);
								fn.paginationchange((xnum - 1) * opt.limit, sender);
							},
						},
						elems: x.toString(),
					},
				});
			}

			//next
			if (opt.shownextprev) {
				li.push({
					tag: "li",
					class: ["page-item", curpage < btncount ? null : "disabled"].combine(" "),
					elems: {
						tag: "a",
						class: "page-link",
						attr: {
							"aria-label": "Next Page",
							href: "javascript:void(0)",
							onclick: function (sender) {
								fn.paginationchange(curpage * opt.limit, sender);
							},
						},
						elems: ns.icon("angle-right"),
					},
				});
			}

			//last
			if (opt.showfirstlast) {
				li.push({
					tag: "li",
					class: ["page-item", curpage < btncount ? null : "disabled"].combine(" "),
					elems: {
						tag: "a",
						class: "page-link",
						attr: {
							"aria-label": "Last Page",
							href: "javascript:void(0)",
							onclick: function (sender) {
								fn.paginationchange((btncount - 1) * opt.limit, sender);
							},
						},
						elems: ns.icon("angle-double-right"),
					},
				});
			}

			//save in memory
			ns.data.set(opt.id, opt);

			return {
				tag: "div",
				attr: { id: opt.id },
				class: ["d-flex", "p-1", "ns-list-page", opt.align ? "justify-content-" + opt.align : null, opt.overflow ? "overflow-auto" : null].combine(" "),
				elems: ns.cont.ul(["pagination", opt.overflow ? "mx-5" : null].combine(" "), li),
			};
		} else {
			return null;
		}
	};
})(ns);
