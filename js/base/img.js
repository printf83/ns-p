//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.img = function (opt) {
		if (opt) {
			if (typeof opt === "string") {
				return ns.img({ src: opt });
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						class: null,
						src: null,
						alt: null,
						width: null,
						height: null,
						fluid: false,
						thumbnail: false,
						caption: null,
						captionclass: null,
					},
					opt
				);

				var img = {
					tag: "img",
					class: [
						opt.fluid ? "img-fluid" : null,
						opt.thumbnail ? "img-thumbnail" : null,
						!opt.fluid && !opt.thumbnail ? "d-inline-block align-text-top" : null,
						opt.class ? opt.class : null,
					].combine(" "),
					attr: {
						src: opt.src ? opt.src : null,
						alt: opt.alt ? opt.alt : null,
						width: opt.width ? opt.width : null,
						height: opt.height ? opt.height : null,
					},
				};

				if (opt.caption) {
					return {
						tag: "figure",
						class: "figure",
						elems: [img, { tag: "figcaption", class: ["figure-caption", opt.captionclass], elems: opt.caption }],
					};
				} else {
					return img;
				}
			}
		}
	};
})(ns);
