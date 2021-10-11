//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.nav = function (opt) {
		/**
		 * ns.nav({
		 * 	style:tab|pill|none,
		 * 	align:left(null)|right|center|fill|vertical|vertical-right,
		 *  flush:true|false
		 * })
		 */
		if (opt) {
			if (typeof opt === "string") {
				return opt;
			} else {
				/**
				 * if direct set elems (using default nav configuration)
				 * example : ns.nav(["tab1","tab2","tab3"])
				 */

				if (!opt.elems) {
					opt = {
						elems: opt.slice(),
					};
				}

				opt = $.extend(
					{},
					{
						id: null,
						style: null, //null|tab|pill
						align: null,
						size: null, //need to set for vertical.only used if has body
						animate: true,
						border: true,
						rounded: true,
						flush: false,
						elems: [],
					},
					opt
				);

				//generate id
				opt.id = opt.id ? opt.id : ns.core.UUID();

				if (Array.isArray(opt.elems)) {
					//make sure one elems is active, if no active, set first as active
					var activeIndex = -1;
					opt.elems.forEach((item, index) => {
						if (activeIndex === -1) {
							if (item.active) {
								activeIndex = index;
							}
						}
					});

					if (activeIndex === -1 && typeof opt.elems[0] === "object") {
						opt.elems[0].active = true;
					}

					//start make item
					var resHeader = [];
					var resBody = [];

					var defOption = {
						id: null,
						label: null,
						icon: null,
						disable: false,
						active: false,
						option: null,
						elems: null,
					};

					opt.elems.forEach((item, index) => {
						//create header
						var itmHeader = [];
						if (typeof item === "string") {
							if (index === 0) {
								item = { label: item, active: true };
							} else {
								item = { label: item };
							}
						}

						item = $.extend({}, defOption, item);

						//create id for tab elems
						item.id = item.id ? item.id : item.elems && item.elems.length > 0 ? ns.core.UUID() : null;

						//<li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Active</a></li>
						if (item.icon) {
							if (typeof item.icon === "string") {
								itmHeader.push({
									elems: ns.icon({
										icon: item.icon,
										class: "me-2",
									}),
								});
							} else {
								itmHeader.push({
									elems: ns.icon(item.icon),
								});
							}
						}

						//tab head label
						if (item.label) {
							itmHeader.push({
								elems: [
									{
										tag: "span",
										elems: item.label,
									},
								],
							});
						}

						//wrap label and icon
						itmHeader = [
							{
								tag: "a",
								class: ["nav-link", item.option ? "dropdown-toggle" : null, item.active ? "active" : null, item.disabled ? "disabled" : null],
								attr: {
									href: `#${item.id}-body`,
									id: `${item.id}-head`,
									"data-bs-toggle": item.option ? "dropdown" : opt.style === "tab" ? "tab" : opt.style === "pill" ? "pill" : "tab",
									"data-ns-hasbody": item.elems ? "true" : null,
									role: item.option ? "button" : null,
								},
								elems: itmHeader.slice(),
							},
						];

						//build option if provided
						if (item.option) {
							itmHeader.push({
								tag: "ul",
								class: "dropdown-menu",
								elems: ns.ddoption(item.option),
							});
						}

						//wrap in li
						itmHeader = {
							tag: "li",
							class: ["nav-item", item.option ? "dropdown" : null],
							attr: {
								role: "presentation",
							},
							elems: itmHeader.slice(),
						};

						//combine header in resHeder
						resHeader = resHeader.concat(itmHeader);

						//create body
						if (item.elems) {
							var itmBody = {
								tag: "div",
								class: ["tab-pane", opt.animate ? "fade" : null, item.active ? "active show" : null],
								attr: {
									id: `${item.id}-body`,
									role: "tabpanel",
								},
								elems: item.elems,
							};

							resBody = resBody.concat(itmBody);
						}
					});

					//wrap item in ul.nav
					resHeader = {
						tag: "ul",
						class: [
							"nav",
							//card-header-tabs if has body (will wrap in card)
							resBody && resBody.length > 0
								? opt.style === "tab"
									? "card-" + (opt.align === "vertical-right" ? "footer" : "header") + "-tabs"
									: opt.style === "pill"
									? "card-" + (opt.align === "vertical-right" ? "footer" : "header") + "-pills"
									: "card-" + (opt.align === "vertical-right" ? "footer" : "header") + "-tabs"
								: null,
							opt.column ? "flex-column mb-auto" : null,
							opt.flush ? "nav-flush" : null,
							opt.style === "tab" ? "nav-tabs" : opt.style === "pill" ? "nav-pills" : null,
							opt.align === "right"
								? "justify-content-end"
								: opt.align === "center"
								? "justify-content-center"
								: opt.align === "vertical" || opt.align === "vertical-right"
								? "flex-column mb-auto"
								: opt.align === "fill"
								? "nav-fill"
								: null,
						],
						attr: {
							id: `${opt.id}-head`,
							role: "tablist",
						},
						elems: resHeader.slice(),
					};

					if (resBody && resBody.length > 0) {
						resBody = {
							tag: "div",
							attr: { id: `${opt.id}-body` },
							class: "tab-content",
							elems: resBody.slice(),
						};
					} else {
						resBody = null;
					}

					if (resBody) {
						var hb = [];
						//put in container if size is set
						if (opt.size) {
							if (opt.align === "vertical-right") {
								hb = {
									tag: "div",
									class: "row g-0",
									elems: [
										{
											tag: "div",
											class: "col",
											elems: {
												tag: "div",
												class: "card-body",
												elems: resBody,
											},
										},
										// {
										// 	tag: "div",
										// 	class: "vr hidden-sm",
										// },
										{
											tag: "div",
											class: [opt.size, "card-footer border-0 p-2"],
											elems: {
												tag: "div",
												elems: resHeader,
											},
										},
									],
								};
							} else {
								hb = {
									tag: "div",
									class: "row g-0",
									elems: [
										{
											tag: "div",
											class: [opt.size, "card-header border-0"],
											elems: {
												tag: "div",
												elems: resHeader,
											},
										},
										// {
										// 	tag: "div",
										// 	class: "vr hidden-sm",
										// },
										{
											tag: "div",
											class: "col",
											elems: {
												tag: "div",
												class: "card-body",
												elems: resBody,
											},
										},
									],
								};
							}
						} else {
							hb = [
								{
									tag: "div",
									class: "card-header",
									elems: resHeader,
								},
								{
									tag: "div",
									class: "card-body",
									elems: resBody,
								},
							];
						}

						//wrap in card if has body
						return {
							tag: "div",
							class: [
								"card p-0", //need p-0 to make sure no one change this padding
								opt.rounded ? null : "rounded-0",
								opt.border ? null : "border-0",
							],
							elems: hb,
						};
					} else {
						return resHeader;
					}
				} else {
					opt.elems = [opt.elems];
					return ns.nav(opt);
				}
			}
		}
	};
})(ns);
