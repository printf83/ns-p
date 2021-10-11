//build and show toast msg
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {
	var fn = {
		build: function (opt) {
			opt = $.extend(
				{},
				{
					id: null,
					class: null,
					animate: true,
					title: null,
					icon: null,
					message: null,
					autohide: true,
					delay: 5000,
					bgcolor: null,
					textcolor: null,
				},
				opt
			);

			//generate id
			opt.id = opt.id ? opt.id : ns.core.UUID();

			var res = [];

			//create icon
			if (opt.icon) {
				if (typeof opt.icon === "string") {
					res.push(ns.icon({ icon: opt.icon, size: "lg", class: "me-2" }));
				} else {
					res.push(ns.icon(opt.icon));
				}
			}

			//create strong for title
			if (opt.title) {
				res.push({
					tag: "strong",
					class: "me-auto",
					elems: opt.title,
				});
			}

			//create timer
			if ((opt.title || opt.icon) && !opt.autoclose) {
				if (!opt.title) {
					res.push({
						tag: "strong",
						class: "me-auto",
						elems: "&nbsp;",
					});
				}

				res.push({
					tag: "small",
					class: "text-muted timer",
					attr: { "data-ns-time": Date.now() },
					elems: "Just now",
				});
			}

			//create close button
			if (opt.title || opt.icon) {
				//<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
				res.push({
					tag: "button",
					class: "btn-close",
					attr: { type: "button", "data-bs-dismiss": "toast" },
				});
			}

			//wrap in div.toast-header
			if (opt.title || opt.icon) {
				res = [
					{
						tag: "div",
						class: "toast-header",
						elems: res.slice(),
					},
				];
			}

			//append body
			res.push({
				tag: "div",
				class: "toast-body",
				elems: opt.message,
			});

			return {
				tag: "div",
				attr: {
					id: opt.id,
					"data-bs-animation": opt.animate ? "true" : null,
					"data-bs-autohide": opt.autohide ? "true" : null,
					"data-bs-delay": opt.delay ? opt.delay : null,
				},
				class: [
					"toast",
					opt.class ? opt.class : null,
					opt.bgcolor ? [`bg-${opt.bgcolor}`, opt.textcolor ? `text-${opt.textcolor}` : null].combine(" ") : null,
				],
				elems: res,
			};
		},
		show: function (elem) {
			// if (elem) {
			// 	if (typeof elem === "string") {
			// 		//allow selector
			// 		fn.show($(elem).get()[0]);
			// 	} else {
			// 		var animation = $(elem).attr("data-bs-animation");
			// 		var autohide = $(elem).attr("data-bs-autohide");
			// 		var delay = $(elem).attr("data-bs-delay");
			// 		if (delay) {
			// 			delay = parseInt(delay);
			// 		}

			// 		var tst = new bootstrap.Toast(elem, {
			// 			animation: animation === "true" ? true : false,
			// 		});

			// 		//add event to destroy toast after hidden
			// 		$(elem).on("hidden.bs.toast", function (event) {
			// 			setTimeout(
			// 				function (elem) {
			// 					fn.destroy(elem);
			// 				},
			// 				1000,
			// 				elem
			// 			);
			// 		});

			// 		//show toast
			// 		tst.show();

			// 		if (autohide === "true") {
			// 			setTimeout(
			// 				function (elem) {
			// 					fn.hide(elem);
			// 				},
			// 				delay,
			// 				elem
			// 			);
			// 		}
			// 	}
			// }
			new bootstrap.Toast(elem);
			var tst = bootstrap.Toast.getInstance(elem);
			if (tst) {
				//autoremove after hide
				$(elem).on("hidden.bs.toast", function () {
					setTimeout(
						function (elem) {
							fn.destroy(elem);
						},
						1000,
						elem
					);
				});

				tst.show();
			}
		},
		hide: function (elem) {
			var tst = bootstrap.Toast.getInstance(elem);
			if (tst) {
				tst.hide();
			}
		},
		destroy: function (elem) {
			var tst = bootstrap.Toast.getInstance(elem);
			if (tst) {
				try {
					$(tst).destroy();
				} catch {}

				$(elem).remove();
			}
		},
		toastmsg: function (...arg) {
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

					return {
						bgcolor: si ? si.bgcolor : null,
						textcolor: si ? si.textcolor : null,
						elems: {
							tag: "div",
							class: "row g-0",
							elems: [
								{
									tag: "div",
									class: "col-auto align-self-start me-3",
									elems: ns.icon({
										icon: si ? si.icon : icon,
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
						bgcolor: null,
						elems: msg,
					};
				}
			}
		},
	};

	ns.toast = function (...arg) {
		if (arg && arg.length > 0) {
			if (arg.length === 2 && typeof arg[0] === "string" && typeof arg[1] === "string") {
				var t = fn.toastmsg(arg[0], arg[1]);
				if (t) {
					return ns.toast({
						message: t.elems,
						bgcolor: t.bgcolor,
						textcolor: t.textcolor,
					});
				}
			} else if (arg.length === 1 && typeof arg[0] === "object") {
				var obj = arg[0];
				obj = $.extend(
					{},
					{
						id: null,
						message: null,
						bgcolor: true,
						textcolor: null,
						delay: null,
					},
					obj
				);

				obj.id = obj.id || ns.core.UUID();

				var container = $(".toast-container").get();

				//generate container
				if (container && container.length === 0) {
					ns.build.append(document.body, {
						tag: "div",
						class: "position-relative",
						attr: { "aria-live": "polite", "aria-atomic": "true" },
						style: { zIndex: "1031" },
						elems: {
							tag: "div",
							class: "toast-container position-fixed top-0 end-0 p-3",
						},
					});
					container = $(".toast-container").get();
				}

				//put toast into container
				ns.build.append(container[0], fn.build(obj));

				//show toast
				fn.show($(`#${obj.id}`)[0]);
			} else {
				console.error("Unsupported argument");
			}
		}
	};
})(ns);
