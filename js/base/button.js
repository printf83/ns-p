//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.button = function (opt) {
		if (opt) {
			if (typeof opt === "string") {
				return ns.button({
					label: opt,
				});
			} else {
				opt = $.extend(
					{},
					{
						id: null,
						name: null,
						class: null,
						style: null,
						label: null,
						labelshow: null,
						nowarp: false,
						value: null,
						checked: false,
						disabled: false,
						size: null,
						weight: null,
						onclick: null,
						href: null,
						icon: null,
						largeicon: false,
						outline: false,
						border: true,
						rounded: true,
						color: null,
						textcolor: null,
						type: "button",
						data: null,
						badge: null,
						relativeposition: false,
						asst: null,
						hascontainer: true,
						tooltip: null,
					},
					opt
				);

				if (opt.option) {
					console.warn("Button has option");
				}

				//generate id
				opt.id = opt.id ? opt.id : ns.core.UUID();

				var res = [];

				//create icon
				if (opt.icon) {
					res.push({
						tag: opt.largeicon ? "span" : null,
						class: opt.largeicon ? ["d-md-block h4-md", opt.label ? "mb-0" : null].combine(" ") : null,
						elems: ns.icon(opt.icon),
					});
				}

				//create span for label
				if (opt.label) {
					res.push({
						tag: "span",
						class: [
							opt.icon && !opt.largeicon ? "ms-2" : null,
							opt.icon && opt.largeicon ? "ms-2 ms-md-0" : null,
							(opt.option && !opt.segmenttoggle) || opt.badge ? "me-2" : null,
							opt.labelshow ? `d-none d-${opt.labelshow}-inline` : null,
						].removeEmpty(),
						elems: opt.label,
					});
				}

				//asst
				if (opt.asst) {
					res.push({ tag: "span", class: "visually-hidden", elems: opt.asst });
				}

				//badge
				if (opt.badge) {
					res.push(ns.badge(opt.badge));
				}

				// //bux fix tooltip and option use same attr (data-bs-toggle)
				// if (opt.option && (opt.tooltip || opt.toggle)) {
				// 	opt.tooltip = null;
				// 	opt.toggle = false;
				// }

				//wrap in button.btn

				if (opt.type === "checkbox" || opt.type === "radio") {
					res = [
						{
							tag: "input",
							class: "btn-check",
							attr: {
								id: opt.id,
								autocomplete: "off",
								type: opt.type,
								name: opt.name,
								checked: opt.checked ? "" : null,
								disabled: !opt.href ? opt.disabled : null,
								"aria-disabled": opt.href && opt.disabled ? "true" : null,
							},
						},
						opt.label || opt.icon
							? ns.tooltip(opt.tooltip, {
									tag: "label",
									class: [
										"btn",
										opt.nowarp ? "text-nowarp" : null,
										// opt.active ? "active" : null,
										opt.rounded ? null : "rounded-0",
										opt.border ? null : "border-0",
										opt.outline ? `btn-outline-${opt.color}` : null,
										opt.color && !opt.outline ? `btn-${opt.color}` : null,
										opt.textcolor ? `text-${opt.textcolor}` : null,
										opt.class ? opt.class : null,
										opt.size ? `btn-${opt.size}` : null,
										opt.weight ? `btn-${opt.weight}` : null,
										opt.href && opt.disabled ? "disabled" : null,
									],
									data: opt.data,
									attr: {
										for: opt.id,
										// title: opt.tooltip ? opt.tooltip : null,
									},
									style: opt.style,
									elems: res.slice(),
							  })
							: null,
					]; //todo:
				} else {
					if (opt.segmenttoggle) {
						res = [
							ns.tooltip(opt.tooltip, {
								tag: opt.href ? "a" : "button",
								class: [
									"btn",
									opt.nowarp ? "text-nowarp" : null,
									// opt.active ? "active" : null,
									opt.rounded ? null : "rounded-0",
									opt.border ? null : "border-0",
									opt.outline ? `btn-outline-${opt.color}` : null,
									opt.color && !opt.outline ? `btn-${opt.color}` : null,
									opt.textcolor ? `text-${opt.textcolor}` : null,
									opt.class ? opt.class : null,
									opt.size ? `btn-${opt.size}` : null,
									opt.weight ? `btn-${opt.weight}` : null,
									opt.href && opt.disabled ? "disabled" : null,
								],
								data: opt.data,
								attr: {
									type: opt.type,
									disabled: !opt.href ? opt.disabled : null,
									"aria-disabled": opt.href && opt.disabled ? "true" : null,
									// title: opt.tooltip ? opt.tooltip : null,
									href: opt.href,
								},
								style: opt.style,
								elems: res.slice(),
							}),
							{
								tag: "button",
								class: [
									"btn",
									opt.nowarp ? "text-nowarp" : null,
									// opt.active ? "active" : null,
									opt.rounded ? null : "rounded-0",
									opt.border ? null : "border-0",
									// opt.option && (opt.optionarrow === null || opt.optionarrow === true) ? "dropdown-toggle dropdown-toggle-split" : null,
									opt.outline ? `btn-outline-${opt.color}` : null,
									opt.color && !opt.outline ? `btn-${opt.color}` : null,
									opt.textcolor ? `text-${opt.textcolor}` : null,
									opt.class ? opt.class : null,
									opt.size ? `btn-${opt.size}` : null,
									opt.weight ? `btn-${opt.weight}` : null,
									opt.relativeposition ? "position-relative" : null,
								],
								data: opt.data,
								attr: {
									id: opt.id,
									name: opt.name,
									type: opt.type,
									disabled: opt.disabled,
									onclick: opt.onclick,
									// "data-bs-toggle": opt.option ? "dropdown" : opt.tooltip ? "tooltip" : opt.toggle ? "button" : null,
									// "data-bs-placement": opt.tooltip ? (opt.tooltipplace ? opt.tooltipplace : "top") : null,
									// "data-bs-html": opt.tooltip && ns.core.isHTML(opt.tooltip) ? "true" : null,
									// "data-bs-dismiss": opt.dismiss ? opt.dismiss : null,
								},
								style: opt.style,
								elems: {
									tag: "span",
									class: "visually-hidden",
									elems: "Toggle Dropdown",
								},
							},
						];
					} else {
						res = [
							ns.tooltip(opt.tooltip, {
								tag: opt.href ? "a" : "button",
								class: [
									"btn",
									opt.nowarp ? "text-nowarp" : null,
									// opt.active ? "active" : null,
									opt.rounded ? null : "rounded-0",
									opt.border ? null : "border-0",
									// opt.option && (opt.optionarrow === null || opt.optionarrow === true) ? "dropdown-toggle" : null,
									opt.outline ? `btn-outline-${opt.color}` : null,
									opt.color && !opt.outline ? `btn-${opt.color}` : null,
									opt.textcolor ? `text-${opt.textcolor}` : null,
									opt.class ? opt.class : null,
									opt.size ? `btn-${opt.size}` : null,
									opt.weight ? `btn-${opt.weight}` : null,
									opt.relativeposition ? "position-relative" : null,
									opt.href && opt.disabled ? "disabled" : null,
								],
								data: opt.data,
								attr: {
									id: opt.id,
									name: opt.name,
									type: opt.type,
									disabled: !opt.href ? opt.disabled : null,
									"aria-disabled": opt.href && opt.disabled ? "true" : null,
									onclick: opt.onclick,
									href: opt.href,
									// title: opt.tooltip ? opt.tooltip : null,
									// "data-bs-toggle": opt.option ? "dropdown" : opt.tooltip ? "tooltip" : opt.toggle ? "button" : null,
									// "data-bs-placement": opt.tooltip ? (opt.tooltipplace ? opt.tooltipplace : "top") : null,
									// "data-bs-html": opt.tooltip && ns.core.isHTML(opt.tooltip) ? "true" : null,
									// "data-bs-dismiss": opt.dismiss ? opt.dismiss : null,
								},
								elems: res.slice(),
							}),
						];
					}
				}

				//if option provided, create ul.dropdown-menu with option
				// if (opt.option) {
				// 	res.push({
				// 		tag: "ul",
				// 		class: "dropdown-menu",
				// 		elems: ns.ddoption(opt.option, opt.value),
				// 	});

				// 	//add div.dropdown container
				// 	if (opt.hascontainer) {
				// 		res = {
				// 			tag: "div",
				// 			class: "dropdown",
				// 			elems: res.slice(),
				// 		};
				// 	}
				// }

				if (res && typeof res === "object") {
					if (Array.isArray(res)) {
						if (res.length === 1) {
							return res[0];
						} else {
							// console.log(res);
							// console.warn(`btn #${opt.id} has many element`);
							return {
								elems: res,
							};
						}
					} else {
						return res;
					}
				} else {
					// console.log(res);
					// console.warn(`btn #${opt.id} has many element`);
					return {
						elems: res,
					};
				}
			}
		}
	};
})(ns);

// //author: printf83@gmail.com (c) 2020 - 2021
// (function (ns) {
// 	ns.button = function (opt) {
// 		if (opt) {
// 			if (typeof opt === "string") {
// 				return ns.button({
// 					label: opt,
// 				});
// 			} else {
// 				opt = $.extend(
// 					{},
// 					{
// 						id: null,
// 						name: null,
// 						class: null,
// 						style: null,
// 						label: null,
// 						labelshow: null,
// 						nowarp: false,
// 						value: null,
// 						checked: false,
// 						disabled: false,
// 						size: null,
// 						weight: null,
// 						active: false,
// 						toggle: false,
// 						onclick: null,
// 						href: null,
// 						icon: null,
// 						largeicon: false,
// 						option: null,
// 						optionarrow: null,
// 						outline: false,
// 						border: true,
// 						rounded: true,
// 						color: null,
// 						textcolor: null,
// 						dismiss: null,
// 						type: "button",
// 						data: null,
// 						tooltip: null,
// 						tooltipplace: null,
// 						badge: null,
// 						relativeposition: false,
// 						asst: null,
// 						hascontainer: true,
// 						segmenttoggle: false,
// 					},
// 					opt
// 				);

// 				//generate id
// 				opt.id = opt.id ? opt.id : ns.core.UUID();

// 				var res = [];

// 				//create icon
// 				if (opt.icon) {
// 					res.push({
// 						tag: opt.largeicon ? "span" : null,
// 						class: opt.largeicon ? ["d-md-block h4-md", opt.label ? "mb-0" : null].combine(" ") : null,
// 						elems: ns.icon(opt.icon),
// 					});
// 				}

// 				//create span for label
// 				if (opt.label) {
// 					res.push({
// 						tag: "span",
// 						class: [
// 							opt.icon && !opt.largeicon ? "ms-2" : null,
// 							opt.icon && opt.largeicon ? "ms-2 ms-md-0" : null,
// 							(opt.option && !opt.segmenttoggle) || opt.badge ? "me-2" : null,
// 							opt.labelshow ? `d-none d-${opt.labelshow}-inline` : null,
// 						].removeEmpty(),
// 						elems: opt.label,
// 					});
// 				}

// 				//asst
// 				if (opt.asst) {
// 					res.push({ tag: "span", class: "visually-hidden", elems: opt.asst });
// 				}

// 				//badge
// 				if (opt.badge) {
// 					res.push(ns.badge(opt.badge));
// 				}

// 				//bux fix tooltip and option use same attr (data-bs-toggle)
// 				if (opt.option && (opt.tooltip || opt.toggle)) {
// 					opt.tooltip = null;
// 					opt.toggle = false;
// 				}

// 				//wrap in button.btn

// 				if (opt.type === "checkbox" || opt.type === "radio") {
// 					res = [
// 						{
// 							tag: "input",
// 							class: "btn-check",
// 							attr: {
// 								id: opt.id,
// 								autocomplete: "off",
// 								type: opt.type,
// 								name: opt.name,
// 								checked: opt.checked ? "" : null,
// 								disabled: !opt.href ? opt.disabled : null,
// 								"aria-disabled": opt.href && opt.disabled ? "true" : null,
// 							},
// 						},
// 						opt.label || opt.icon
// 							? {
// 									tag: "label",
// 									class: [
// 										"btn",
// 										opt.nowarp ? "text-nowarp" : null,
// 										opt.active ? "active" : null,
// 										opt.rounded ? null : "rounded-0",
// 										opt.border ? null : "border-0",
// 										opt.outline ? `btn-outline-${opt.color}` : null,
// 										opt.color && !opt.outline ? `btn-${opt.color}` : null,
// 										opt.textcolor ? `text-${opt.textcolor}` : null,
// 										opt.class ? opt.class : null,
// 										opt.size ? `btn-${opt.size}` : null,
// 										opt.weight ? `btn-${opt.weight}` : null,
// 										opt.href && opt.disabled ? "disabled" : null,
// 									],
// 									data: opt.data,
// 									attr: {
// 										for: opt.id,
// 										title: opt.tooltip ? opt.tooltip : null,
// 									},
// 									style: opt.style,
// 									elems: res.slice(),
// 							  }
// 							: null,
// 					]; //todo:
// 				} else {
// 					if (opt.segmenttoggle) {
// 						res = [
// 							{
// 								tag: opt.href ? "a" : "button",
// 								class: [
// 									"btn",
// 									opt.nowarp ? "text-nowarp" : null,
// 									opt.active ? "active" : null,
// 									opt.rounded ? null : "rounded-0",
// 									opt.border ? null : "border-0",
// 									opt.outline ? `btn-outline-${opt.color}` : null,
// 									opt.color && !opt.outline ? `btn-${opt.color}` : null,
// 									opt.textcolor ? `text-${opt.textcolor}` : null,
// 									opt.class ? opt.class : null,
// 									opt.size ? `btn-${opt.size}` : null,
// 									opt.weight ? `btn-${opt.weight}` : null,
// 									opt.href && opt.disabled ? "disabled" : null,
// 								],
// 								data: opt.data,
// 								attr: {
// 									type: opt.type,
// 									disabled: !opt.href ? opt.disabled : null,
// 									"aria-disabled": opt.href && opt.disabled ? "true" : null,
// 									title: opt.tooltip ? opt.tooltip : null,
// 									href: opt.href,
// 								},
// 								style: opt.style,
// 								elems: res.slice(),
// 							},
// 							{
// 								tag: "button",
// 								class: [
// 									"btn",
// 									opt.nowarp ? "text-nowarp" : null,
// 									opt.active ? "active" : null,
// 									opt.rounded ? null : "rounded-0",
// 									opt.border ? null : "border-0",
// 									opt.option && (opt.optionarrow === null || opt.optionarrow === true) ? "dropdown-toggle dropdown-toggle-split" : null,
// 									opt.outline ? `btn-outline-${opt.color}` : null,
// 									opt.color && !opt.outline ? `btn-${opt.color}` : null,
// 									opt.textcolor ? `text-${opt.textcolor}` : null,
// 									opt.class ? opt.class : null,
// 									opt.size ? `btn-${opt.size}` : null,
// 									opt.weight ? `btn-${opt.weight}` : null,
// 									opt.relativeposition ? "position-relative" : null,
// 								],
// 								data: opt.data,
// 								attr: {
// 									id: opt.id,
// 									name: opt.name,
// 									type: opt.type,
// 									disabled: opt.disabled,
// 									onclick: opt.onclick,
// 									"data-bs-toggle": opt.option ? "dropdown" : opt.tooltip ? "tooltip" : opt.toggle ? "button" : null,
// 									"data-bs-placement": opt.tooltip ? (opt.tooltipplace ? opt.tooltipplace : "top") : null,
// 									"data-bs-html": opt.tooltip && ns.core.isHTML(opt.tooltip) ? "true" : null,
// 									"data-bs-dismiss": opt.dismiss ? opt.dismiss : null,
// 								},
// 								style: opt.style,
// 								elems: {
// 									tag: "span",
// 									class: "visually-hidden",
// 									elems: "Toggle Dropdown",
// 								},
// 							},
// 						];
// 					} else {
// 						res = [
// 							{
// 								tag: opt.href ? "a" : "button",
// 								class: [
// 									"btn",
// 									opt.nowarp ? "text-nowarp" : null,
// 									opt.active ? "active" : null,
// 									opt.rounded ? null : "rounded-0",
// 									opt.border ? null : "border-0",
// 									opt.option && (opt.optionarrow === null || opt.optionarrow === true) ? "dropdown-toggle" : null,
// 									opt.outline ? `btn-outline-${opt.color}` : null,
// 									opt.color && !opt.outline ? `btn-${opt.color}` : null,
// 									opt.textcolor ? `text-${opt.textcolor}` : null,
// 									opt.class ? opt.class : null,
// 									opt.size ? `btn-${opt.size}` : null,
// 									opt.weight ? `btn-${opt.weight}` : null,
// 									opt.relativeposition ? "position-relative" : null,
// 									opt.href && opt.disabled ? "disabled" : null,
// 								],
// 								data: opt.data,
// 								attr: {
// 									id: opt.id,
// 									name: opt.name,
// 									type: opt.type,
// 									disabled: !opt.href ? opt.disabled : null,
// 									"aria-disabled": opt.href && opt.disabled ? "true" : null,
// 									onclick: opt.onclick,
// 									href: opt.href,
// 									title: opt.tooltip ? opt.tooltip : null,
// 									"data-bs-toggle": opt.option ? "dropdown" : opt.tooltip ? "tooltip" : opt.toggle ? "button" : null,
// 									"data-bs-placement": opt.tooltip ? (opt.tooltipplace ? opt.tooltipplace : "top") : null,
// 									"data-bs-html": opt.tooltip && ns.core.isHTML(opt.tooltip) ? "true" : null,
// 									"data-bs-dismiss": opt.dismiss ? opt.dismiss : null,
// 								},
// 								elems: res.slice(),
// 							},
// 						];
// 					}
// 				}

// 				//if option provided, create ul.dropdown-menu with option
// 				if (opt.option) {
// 					res.push({
// 						tag: "ul",
// 						class: "dropdown-menu",
// 						elems: ns.ddoption(opt.option, opt.value),
// 					});

// 					//add div.dropdown container
// 					if (opt.hascontainer) {
// 						res = {
// 							tag: "div",
// 							class: "dropdown",
// 							elems: res.slice(),
// 						};
// 					}
// 				}

// 				if (res && typeof res === "object") {
// 					if (Array.isArray(res)) {
// 						if (res.length === 1) {
// 							return res[0];
// 						} else {
// 							// console.log(res);
// 							// console.warn(`btn #${opt.id} has many element`);
// 							return {
// 								elems: res,
// 							};
// 						}
// 					} else {
// 						return res;
// 					}
// 				} else {
// 					// console.log(res);
// 					// console.warn(`btn #${opt.id} has many element`);
// 					return {
// 						elems: res,
// 					};
// 				}
// 			}
// 		}
// 	};
// })(ns);
