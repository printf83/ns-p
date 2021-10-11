//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.example = function (opt) {
		opt = $.extend(
			{},
			{
				id: null,
				title: null,
				msg: null,
				label: null,
				class: null,
				cstart: 18,
				cend: 6,
				code: null,
				dark: false,
				beautify: function (str) {
					var opt = {
						preserve_newlines: true,
						max_preserve_newlines: 180,
						keep_array_indentation: false,
						brace_style: "collapse,preserve-inline",
					};

					//js_beautify need to add into html page
					// <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.0/beautify.min.js"></script>
					// <script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js?autorun=false&style=sunburst"></script>
					return js_beautify(str, opt);
				},
				container: function (elems) {
					return elems;
				},
				item: function (elems) {
					return elems;
				},
			},
			opt
		);

		opt.id = opt.id ? opt.id : ns.core.UUID();

		var el = [];

		if (opt.title) {
			el.push({
				tag: opt.code ? "h4" : "h2",
				class: "pt-3",
				attr: { id: opt.id },
				elems: [
					{
						tag: "span",
						elems: opt.title,
					},
					{
						tag: "a",
						class: "anchorjs-link ps-2",
						attr: { "aria-label": "Anchor", "data-anchorjs-icon": "#", href: "javascript:void(0)", onclick: "ns.core.focus($(this).parent())" },
					},
				],
			});
		}

		if (opt.msg) {
			if (!Array.isArray(opt.msg)) {
				opt.msg = [opt.msg];
			}

			$.each(opt.msg, function (ix, i) {
				if (typeof i === "string") {
					el.push({
						tag: "p",
						elems: i,
					});
				} else {
					el.push(i);
				}
			});
		}

		if (opt.code) {
			var strCode = "(" + opt.code + ")();";
			strCode = strCode.substring(opt.cstart, strCode.length - opt.cend);

			if (strCode.startsWith("return")) {
				strCode = strCode.substring(7, strCode.length);
			}

			el.push({
				tag: "div",
				class: "card border-0",
				elems: [
					{
						tag: "div",
						class: [opt.class ? opt.class : null, "card-body ns-example border rounded-top", opt.dark ? "bg-dark" : null],
						elems: opt.label
							? ns.button({
									label: opt.label,
									color: "primary",
									onclick: function (sender) {
										opt.code();
									},
							  })
							: opt.container(
									Array.isArray(opt.code())
										? opt.code().map(function (i, ix) {
												return opt.item(i);
										  })
										: opt.item(opt.code())
							  ),
					},
					{
						tag: "div",
						class: "card-body ns-code bg-light rounded-bottom",
						elems: [
							{
								tag: "button",
								class: "btn-clipboard btn btn-outline-primary btn-sm end-0 me-3 position-absolute",
								elems: "Copy",
								attr: {
									onclick: function (sender) {
										ns.core.copyToClipboard(strCode, "Code copied to clipboard");
									},
								},
							},
							{
								tag: "code",
								class: "overflow-auto d-block",
								elems: {
									tag: "pre",
									attr: { lang: "js" },
									class: "prettyprint",
									elems: opt.beautify(strCode),
								},
							},
						],
					},
				],
			});
		}

		return {
			tag: "div",
			class: "mb-5 ns-example",
			attr: { id: !opt.title ? opt.id : null },
			elems: el,
		};
	};
})(ns);
