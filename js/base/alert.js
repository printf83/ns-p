//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	var alertmsg = function (...arg) {
		if (arg && arg.length > 0) {
			var msg = null;
			var icon = null;

			if (arg.length === 1) {
				msg = arg[0];
			} else if (arg.length > 1) {
				icon = arg[0];
				msg = arg[1];
			}

			if (icon) {
				var si = ns.sIcon(icon);
				if (si) {
					return {
						bgcolor: si.bgcolor,
						textcolor: si.textcolor,
						elems: {
							tag: "div",
							class: "row g-0",
							elems: [
								{
									tag: "div",
									class: "col-auto align-self-start me-3",
									elems: ns.icon({
										icon: si.icon,
										size: "lg",
									}),
								},
								{
									tag: "div",
									class: "col align-self-center",
									elems: msg,
								},
							],
						},
					};
				} else {
					return {
						textcolor: null,
						bgcolor: icon,
						elems: msg,
					};
				}
			} else {
				return {
					textcolor: null,
					bgcolor: null,
					elems: msg,
				};
			}
		}
	};

	ns.alert = {
		container: function (...arg) {
			if (arg && arg.length === 2) {
				var i = alertmsg(arg[0], arg[1]);
				return ns.alert.container({
					color: i?.bgcolor,
					elems: i?.elems,
				});
			} else if (arg && arg.length === 1 && typeof arg === "object") {
				var opt = $.extend(
					{},
					{
						id: null,
						class: null,
						dismissible: false,
						animation: true,
						color: null,
						elems: null,
					},
					arg[0]
				);

				//generate id
				opt.id = opt.id ? opt.id : ns.core.UUID();

				return {
					tag: "div",
					attr: { id: opt.id, role: "alert" },
					class: [
						"alert",
						opt.color ? `alert-${opt.color}` : null,
						opt.dismissible ? "alert-dismissible show" : null,
						opt.animation && opt.dismissible ? "fade" : null,
						opt.class,
					].combine(" "),
					elems: [
						{
							tag: "div",
							elems: opt.elems,
						},
						opt.dismissible
							? {
									tag: "button",
									class: "btn-close",
									attr: { "data-bs-dismiss": "alert", "aria-label": "Close" },
							  }
							: null,
					].removeEmpty(),
				};
			} else {
				console.error("Unsupported argument");
			}
		},
		link: function (text, url) {
			return {
				tag: "a",
				class: "alert-link",
				attr: {
					href: url ? url : "javascript:void",
				},
				elems: text,
			};
		},
		header: function (text) {
			return {
				tag: "h4",
				class: "heading",
				elems: text,
			};
		},
	};
})(ns);
