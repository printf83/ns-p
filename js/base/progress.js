//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.progress = function (opt) {
		opt = $.extend(
			{},
			{
				id: null,
				class: null,
				label: false,
				stripe: false,
				animate: false,
				background: null,
				min: 0,
				max: 100,
				value: 0,
				rows: 0,
				height: 0,
				data: null,
				tooltip: null,
				tooltipplace: null,
			},
			opt
		);

		var percent = opt.max - opt.min > 0 ? parseInt((opt.value / (opt.max - opt.min)) * 100, 10) : 0;

		return {
			tag: "div",
			class: "progress",
			attr: {
				title: opt.tooltip ? opt.tooltip : null,
				"data-bs-toggle": opt.tooltip ? "tooltip" : null,
				"data-bs-placement": opt.tooltip ? (opt.tooltipplace ? opt.tooltipplace : "top") : null,
				"data-bs-html": opt.tooltip && ns.core.isHTML(opt.tooltip) ? "true" : null,
			},
			style: {
				height: opt.height > 0 ? `${opt.height}px` : null,
			},
			elems: {
				tag: "div",
				class: [
					"progress-bar",
					opt.class ? opt.class : null,
					opt.color ? `bg-${opt.color}` : null,
					opt.stripe ? ["progress-bar-striped", opt.animate ? "progress-bar-animated" : null].combine(" ") : null,
				],
				data: opt.data,
				attr: {
					id: opt.id ? opt.id : null,
					role: "progressbar",
				},
				style: {
					width: `${percent} %`,
				},
				elems: opt.label ? `${percent} %` : "&nbsp;",
			},
		};
	};
})(ns);
