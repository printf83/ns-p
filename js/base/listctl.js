//main list controller (listctl)
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {
	var fn = {};

	ns.listctl = function (opt) {
		opt = $.extend(
			{},
			{
				class: null,
				icon: null,
				title: null,
				menu: null,
				fixed: false,
				main: null,
				check: null,
				query: null,
				excel: null,
			},
			opt
		);

		if (
			opt.main ||
			opt.check ||
			typeof opt.excel === "string" ||
			typeof opt.query === "string" ||
			ns.core.isFunction(opt.query) ||
			ns.core.isFunction(opt.excel)
		) {
			var tmp = {};
			var rtn = [];

			//build title
			var ctltitle = null;
			if (opt.title || opt.menu) {
				ctltitle = {
					tag: "div",
					class: "d-flex justify-content-center me-md-2 me-0 mb-2 w-sm-100 w-md-auto",
					elems: [
						opt.menu
							? opt.option
								? ns.dropdown({
										icon: opt.icon,
										color: "primary",
										onclick: opt.menu && typeof opt.menu === "string" ? opt.menu : null,
										option: opt.menu && typeof opt.menu !== "string" && Array.isArray(opt.menu) ? opt.menu : null,
										optionarrow: false,
										label: opt.title,
										// labelshow: "md",
								  })
								: ns.button({
										icon: opt.icon,
										color: "primary",
										onclick: opt.menu && typeof opt.menu === "string" ? opt.menu : null,
										label: opt.title,
										// labelshow: "md",
								  })
							: {
									tag: "h5",
									class: "m-0 ps-2",
									elems: opt.title,
							  },
					],
				};
			}

			//build main
			var ctlmain1 = null;
			if (opt.main) {
				if (!Array(opt.main)) {
					opt.main = [opt.main];
				}

				ctlmain1 = ns.cont.btngroup(
					opt.main.map(function (i) {
						if (i.option) {
							return ns.dropdown(i);
						} else {
							return ns.button(i);
						}
					})
				);
			}

			var ctlmain2 = null;
			if (opt.check || typeof opt.excel === "string" || typeof opt.query === "string" || ns.core.isFunction(opt.excel) || ns.core.isFunction(opt.query)) {
				ctlmain2 = ns.cont.btngroup(
					"ms-2",
					[
						opt.check
							? ns.button({
									icon: "tasks",
									color: "primary",
									onclick: "ns.list.fn.mode.check(this)",
							  })
							: null,
						ns.core.isFunction(opt.excel) || typeof opt.excel === "string"
							? ns.button({
									icon: "file-excel",
									color: "primary",
									onclick: opt.excel,
							  })
							: null,
						ns.core.isFunction(opt.query) || typeof opt.query === "string"
							? ns.button({
									icon: "cog",
									color: "primary",
									onclick: opt.query,
							  })
							: null,
					].removeEmpty()
				);
			}

			if (ctlmain1 || ctlmain2 || ctltitle) {
				tmp.normal = [];

				if (ctltitle) {
					tmp.normal.push(ctltitle);
				}

				tmp.normal.push(ns.cont.mxauto("d-none d-md-flex mb-2"));

				if (ctlmain1 || ctlmain2) {
					var ctlmain = {
						tag: "div",
						class: "mb-2",
						elems: [ctlmain1 ? ctlmain1 : null, ctlmain2 ? ctlmain2 : null].removeEmpty(),
					};
					tmp.normal.push(ctlmain);
				}
			}

			//build check
			if (opt.check) {
				var ctlcheck = [];

				ctlcheck.push(
					ns.button({
						icon: "check-double",
						color: "primary",
						label: "All",
						onclick: "ns.list.fn.check(this)",
					})
				);

				$.each(opt.check, function (index, item) {
					ctlcheck.push(ns.button(item));
				});

				tmp.check = [
					ctltitle ? ctltitle : null,
					ns.cont.mxauto("d-none d-md-flex mb-2"),
					{
						tag: "div",
						class: "mb-2",
						elems: [
							ns.button({
								icon: "chevron-left",
								color: "primary",
								onclick: "ns.list.fn.mode.normal(this)",
							}),
							ctlcheck ? ns.cont.btngroup("ms-2", ctlcheck) : null,
						].removeEmpty(),
					},
				].removeEmpty();
			} else {
				tmp.check = null;
			}

			//generate container
			if (tmp.normal) {
				rtn.push({
					tag: "div",
					class: [
						"ns-list-control",
						"ns-mode-normal",
						"btn-toolbar",
						"justify-content-center",
						"justify-content-between-md",
						opt.fixed ? "position-fixed top-0" : null,
						opt.class,
					],
					attr: { role: "toolbar" },
					elems: tmp.normal,
				});
			}

			if (tmp.check) {
				rtn.push({
					tag: "div",
					class: [
						"ns-list-control",
						"ns-mode-check",
						"btn-toolbar",
						"justify-content-center",
						"justify-content-between-md",
						opt.fixed ? "position-fixed top-0" : null,
						opt.class,
					],
					attr: { role: "toolbar" },
					elems: tmp.check,
				});
			}

			if (rtn && rtn.length > 0) {
				return {
					elems: rtn,
				};
			} else {
				return null;
			}
		} else {
			return null;
		}
	};
})(ns);
