//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.tooltip = function (opt, obj) {
		if (typeof opt === "string") {
			var msgTemp = opt;
			opt = {};
			opt.msg = msgTemp;
		}

		opt = $.extend(
			{},
			{
				title: null,
				msg: null,
				type: null, //null|tooltip|popover
				placement: "top", //top|left|bottom|right
				trigger: "focus", //focus|
			},
			opt
		);

		if (opt.msg) {
			if (obj) {
				if (!obj.attr) {
					obj.attr = {};
				}

				if (opt.type === "popover") {
					if (opt.title) {
						obj.attr["title"] = opt.title;
					}
				} else {
					obj.attr["title"] = opt.msg;
				}

				console.log("title : " + JSON.stringify(obj.attr.title));

				if (opt.type) {
					obj.attr["data-bs-toggle"] = opt.type;

					if (opt.type === "popover") {
						obj.attr["data-bs-content"] = opt.msg;

						if (opt.trigger) {
							obj.attr["data-bs-trigger"] = opt.trigger;
						}
					}

					if (opt.placement) {
						obj.attr["data-bs-placement"] = opt.placement;
					}

					if (ns.core.isHTML(opt.msg)) {
						obj.attr["data-bs-html"] = "true";
					}
				}
			}
		}

		return obj;
	};
})(ns);
