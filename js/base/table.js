//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	var fn = {
		table: {
			tr: function (i) {
				if (typeof i === "object") {
					i = $.extend(
						{},
						{
							id: null,
							class: null,
							color: null,
							elems: null,
						},
						i
					);

					return {
						tag: "tr",
						class: [i.class ? i.class : null, i.color ? `table-${i.color}` : null],
						elems: i.elems ? i.elems : null,
					};
				} else {
					return {
						tag: "tr",
						elems: i,
					};
				}
			},
			td: function (i) {
				if (typeof i === "object") {
					i = $.extend(
						{},
						{
							type: "td",
							scope: null,
							id: null,
							class: null,
							colspan: null,
							rowspan: null,
							elems: null,
						},
						i
					);

					return {
						tag: i.type,
						class: i.class ? i.class : null,
						attr: {
							scope: i.scope,
							colspan: i.colspan ? i.colspan : null,
							rowspan: i.rowspan ? i.rowspan : null,
						},
						elems: i.elems ? i.elems : "&nbsp;",
					};
				} else {
					return {
						tag: "td",
						elems: i ? i : "&nbsp;",
					};
				}
			},
		},
	};

	ns.table = function (...arg) {
		if (arg) {
			var opt = null;
			var a = null;

			if (arg.length === 2) {
				opt = arg[0];
				a = arg[1];
			} else if (arg.length === 1) {
				a = arg[0];
			}

			opt = $.extend(
				{},
				{
					id: null,
					class: null,
					headclass: null,
					bodyclass: null,
					footerclass: null,
					color: null,
					striped: false,
					align: null, //middle|top|bottom
					rownumber: false,
					responsive: true,
					hover: false,
					border: null, //null|"bordered"|"none"
					bordercolor: null,
					caption: null,
					captiontop: false,
					header: true,
					footer: false,
				},
				opt
			);

			if (Array.isArray(a)) {
				var thead = null;

				if (opt.header) {
					var th = [];

					//generate header
					th = a[0].map(function (i) {
						if (typeof i === "object") {
							i = $.extend(
								{},
								{
									id: null,
									type: "th",
									scope: "col",
									class: null,
									colspan: null,
									rowspan: null,
									elems: null,
								},
								i
							);

							return fn.table.td(i);
						} else {
							return fn.table.td({
								type: "th",
								scope: "col",
								elems: i,
							});
						}
					});

					//put row number
					if (opt.rownumber) {
						th.unshift(
							fn.table.td({
								type: "th",
								scope: "col",
								elems: "#",
							})
						);
					}

					//put in th
					thead = {
						tag: "thead",
						class: opt.headclass ? opt.headclass : null,
						elems: fn.table.tr({
							elems: th,
						}),
					};
				}

				//generate body;
				var tb = [];
				var x = opt.header ? 1 : 0;
				var len = a.length - (opt.footer ? 1 : 0);
				for (x; x < len; x++) {
					var td = [];

					if (opt.rownumber) {
						td.push(
							fn.table.td({
								type: "th",
								scope: "row",
								elems: x.toString(),
							})
						);
					}

					$.each(a[x], function (index, i) {
						td.push(fn.table.td(i));
					});

					tb.push(
						fn.table.tr({
							elems: td,
						})
					);
				}

				var tbody = {
					tag: "tbody",
					class: opt.bodyclass ? opt.bodyclass : null,
					elems: tb,
				};

				var tfoot = null;
				if (opt.footer) {
					var tf = [];

					if (opt.rownumber) {
						tf.push(
							fn.table.td({
								type: "th",
								scope: "row",
								elems: null,
							})
						);
					}

					$.each(a[len - 1], function (index, i) {
						tf.push(fn.table.td(i));
					});

					tfoot = {
						tag: "tfoot",
						class: opt.footerclass ? opt.footerclass : null,
						elems: fn.table.tr({
							elems: tf,
						}),
					};
				}

				var tbl = {
					tag: "table",
					class: [
						"table",
						opt.class ? opt.class : null,
						opt.color ? `table-${opt.color}` : null,
						opt.striped ? "table-striped" : null,
						opt.hover ? "table-hover" : null,
						opt.align ? `align-${opt.align}` : null,
						opt.border ? (opt.border === "none" ? "table-borderless" : opt.border === "borderd" ? "table-bordered" : null) : null,
						opt.bordercolor ? `border-${opt.bordercolor}` : null,
						opt.captiontop ? "caption-top" : null,
						opt.size ? `table-${opt.size}` : null,
					],
					elems: [
						opt.caption
							? {
									tag: "caption",
									elems: opt.caption,
							  }
							: null,
						thead,
						tbody,
						tfoot,
					].removeEmpty(),
				};

				if (opt.responsive) {
					return {
						tag: "div",
						class: [typeof opt.responsive === "string" ? `tbl-responsive-${opt.responsive}` : "table-responsive"],
						elems: tbl,
					};
				} else {
					return tbl;
				}
			}
		}
	};
})(ns);
