//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.close = function (opt) {
		opt = $.extend(
			{},
			{
				id: null,
				class: null,
				white: false,
				disabled: false,
			},
			opt
		);

		return {
			tag: "button",
			class: ["btn-close", opt.white ? "btn-close-white" : null, opt.class],
			data: opt.data,
			attr: {
				id: opt.id,
				type: "button",
				disabled: opt.disabled ? "" : null,
				"aria-label": "Close",
			},
		};
	};
})(ns);
