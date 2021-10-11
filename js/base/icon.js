//icon generator
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {
	const ico = [
		{
			key: "i",
			icon: "info-circle",
			bgcolor: "primary",
			textcolor: "white",
		},
		{
			key: "!-danger",
			icon: "exclamation-triangle",
			bgcolor: "danger",
			textcolor: "white",
		},
		{
			key: "!!",
			icon: "exclamation-triangle",
			bgcolor: "danger",
			textcolor: "white",
		},
		{
			key: "!",
			icon: "exclamation-triangle",
			bgcolor: "warning",
			textcolor: null,
		},
		{
			key: "?",
			icon: "question-circle",
			bgcolor: "success",
			textcolor: "white",
		},
		{
			key: "-",
			icon: "minus-circle",
			bgcolor: "danger",
			textcolor: "white",
		},
		{
			key: "x",
			icon: "times-circle",
			bgcolor: "danger",
			textcolor: "white",
		},
		{
			key: "/",
			icon: "check-circle",
			bgcolor: "success",
			textcolor: "white",
		},
		{
			key: "save",
			icon: "save",
			bgcolor: "success",
			textcolor: "white",
		},
		{
			key: "delete",
			icon: "trash",
			bgcolor: "danger",
			textcolor: "white",
		},
		{
			key: "lock",
			icon: "lock",
			bgcolor: "warning",
			textcolor: null,
		},
		{
			key: "shield",
			icon: "shield-alt",
			bgcolor: "danger",
			textcolor: "white",
		},
		{
			key: "logout",
			icon: "door-open",
			bgcolor: "secondary",
			textcolor: null,
		},
	];

	ns.sIcon = function (icon) {
		if (icon) {
			var found = ico.find((o) => o.key === icon);
			if (found) {
				return found;
			}
		}

		return null;
	};

	/**
	 * icon     : sting without fa-
	 * style    : fas|fab
	 * fixwidth : true|false
	 * size     : xs|sm|lg|2x|...|10x
	 * rotate   : 90|180|270|horizontal|vertical|both
	 * spin     : true|false
	 * color	: bootstrapColor
	 * class	: string|["string"]
	 *
	 * usage:
	 * ns.icon(stringicon)
	 * ns.icon("home")
	 * ns.icon({icon:"home"})
	 */

	ns.icon = function (opt) {
		if (opt) {
			//change ns.icon(string) to ns.icon({icon:string})
			if (typeof opt === "string") {
				return ns.icon({
					icon: opt,
				});
			} else {
				//shortcut icon
				var si = ns.sIcon(opt.icon);
				if (si) {
					opt.icon = si.icon;
					opt.color = si.bgcolor;
				}

				if (opt.icon === "favicon") {
					return {
						tag: "img",
						class: "favicon",
						attr: { src: "./img/favicon.ico" },
					};
				} else {
					opt = $.extend(
						{},
						{
							icon: null,
							class: null,
							style: "fas",
							fixwidth: true,
							size: null,
							rotate: null,
							stack: 0,
							spin: false,
							color: null,
							elems: null,
						},
						opt
					);

					//generate tag
					var cls = [];

					//size
					if (opt.size) {
						cls.push(`fa-${opt.size}`);
					}

					//class
					if (opt.class) {
						if (Array.isArray(opt.class)) {
							cls.push(opt.class.combine(" "));
						} else {
							cls.push(opt.class);
						}
					}

					//stack
					if (opt.stack > 0) {
						cls.push(`fa-stack-${opt.stack}x`);

						if (opt.stack === 1) {
							cls.push("fa-inverse");
						}
					}

					//color
					if (opt.color) {
						cls.push(`text-${opt.color}`);
					}

					//fix width
					if (opt.fixwidth) {
						cls.push("fa-fw");
					}

					//rotate
					if (opt.rotate) {
						switch (opt.rotate) {
							case 90:
							case 180:
							case 270:
								cls.push(`fa-rotate-${opt.rotate}`);
							case "horizontal":
							case "vertical":
							case "both":
								cls.push(`fa-flip-${opt.rotate}`);
						}
					}

					//spin
					if (opt.spin) {
						cls.push("fa-spin");
					}

					//stack icon
					if ((opt.icon === null, opt.elems && Array.isArray(opt.elems) && opt.elems.length === 2)) {
						cls.push("fa-stack");
						return {
							tag: "span",
							class: cls,
							elems: opt.elems.map((i, xi) => {
								var stack = opt.elems.length - xi;
								i.stack = stack;
								return ns.icon(i);
							}),
						};
					} else {
						cls.push(opt.style);
						cls.push(`fa-${opt.icon}`);

						return {
							tag: "i",
							class: cls,
							elems: opt.elems,
						};
					}
				}
			}
		}
	};
})(ns);
