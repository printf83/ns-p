//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	var fn = {
		numctlclick: function (sender, step) {
			var cont = $(sender).parent();
			var ctl = $(cont).find("input[type='number']");
			var val = parseInt($(ctl).val(), 10);
			var min = $(ctl).attr("min");
			var max = $(ctl).attr("max");

			min = min ? parseInt(min, 10) : Number.MIN_VALUE;
			max = max ? parseInt(max, 10) : Number.MAX_VALUE;

			if (val + step >= min && val + step <= max) {
				$(ctl).val(val + step);
			} else if (val + step > max) {
				$(ctl).val(max);
			} else if (val + step < min) {
				$(ctl).val(min);
			}
		},
	};
	ns.input = function (opt) {
		opt = $.extend(
			{},
			{
				id: null,
				name: null,
				class: null,
				label: null,
				labelsize: null, //sm-2
				ctlsize: null, //if null col-auto if labelsize is set
				hiddenlabel: null,
				nowarp: false,
				floatinglabel: false, //only for form-control
				btncheck: false, //only for radio and checkbox
				type: "text",
				placeholder: null,
				min: 0,
				max: 0,
				step: 0,
				rows: 0,
				plaintext: false, //only if readonly true
				readonly: false,
				disabled: false,
				multiple: false,
				size: null,
				style: null,
				weight: null, //sm|md|lg
				value: null,
				checked: false, //true|false
				inline: false,
				onchange: null,
				onclick: null,
				onfocus: null,
				onblur: null,
				required: false,
				valid: null,
				invalid: null,
				before: null,
				beforetype: "text",
				after: null,
				aftertype: "text",
				option: null,
				data: null,
				numctl: false,
				addctl: null,
				tooltip: null,
				// tooltipplace: null,
				flexcontainer: false,
				hascontainer: true,
			},
			opt
		);

		//generate id
		opt.id = opt.id ? opt.id : ns.core.UUID();

		//floating label not works with some input
		if (opt.floatinglabel) {
			if (["checkbox", "radio", "switch", "file"].indexOf(opt.type) > -1 || opt.readonly) {
				opt.floatinglabel = false;
			} else {
				if (opt.label && !opt.placeholder) {
					opt.placeholder = opt.label;
				}
			}
		}

		//generate label
		var lbl = [];
		if (!opt.floatinglabel && opt.label && ["checkbox", "radio", "switch"].indexOf(opt.type) === -1) {
			lbl.push({
				tag: "label",
				class: [, opt.labelsize ? `col-form-label col-${opt.labelsize}` : "form-label"],
				attr: { for: opt.id },
				elems: opt.label,
			});
		}

		//generate control
		var ctl = [];

		//add before element
		if (opt.before) {
			if (opt.beforetype === "text") {
				ctl.push({
					tag: "span",
					class: "input-group-text",
					elems: opt.before,
				});
			} else {
				ctl = ctl.concat(opt.before);
			}
		} else {
			//check if before element isnot set
			//and numctl is true
			//and type is number
			if (opt.type === "number" && opt.numctl === true) {
				ctl.push(
					ns.button({
						label: ns.icon("minus"),
						color: "primary",
						onclick: function (sender) {
							fn.numctlclick(sender, -opt.step ? -opt.step : 1);
						},
					})
				);
			}
		}

		var mainctl = [];
		//generate main ctl
		switch (opt.type) {
			case "switch":
			case "checkbox":
			case "radio":
				mainctl.push(
					ns.tooltip(opt.tooltip, {
						tag: "input",
						class: [opt.btncheck ? "btn-check" : "form-check-input", opt.class],
						attr: {
							id: opt.id,
							"aria-label": opt.hiddenlabel ? opt.hiddenlabel : null,
							name: opt.name,
							type: opt.type === "switch" ? "checkbox" : opt.type,
							placeholder: opt.placeholder,
							min: opt.min,
							max: opt.max,
							step: opt.step,
							readonly: opt.readonly ? "" : null,
							disabled: opt.disabled ? "" : null,
							required: opt.required ? "required" : null,
							// title: opt.tooltip ? opt.tooltip : null,
							// "data-bs-toggle": opt.tooltip ? "tooltip" : null,
							// "data-bs-placement": opt.tooltip ? (opt.tooltipplace ? opt.tooltipplace : "top") : null,
							// "data-bs-html": opt.tooltip && ns.core.isHTML(opt.tooltip) ? "true" : null,
							value: opt.value,
							checked: opt.checked ? "checked" : null,
							autocomplete: opt.btncheck ? "off" : null,
							list: dtlistId,
							onchange: opt.onchange,
							onclick: opt.onclick,
							onfocus: opt.onfocus,
							onblur: opt.onblur,
						},
						style: opt.style,
						elems: null,
					})
				);

				if (opt.label) {
					mainctl.push({
						tag: "label",
						class: opt.btncheck ? ["btn", opt.color ? `btn-${opt.color}` : "btn-primary"] : "form-check-label",
						attr: { for: opt.id },
						elems: opt.label,
					});
				}

				break;
			case "textarea":
				mainctl.push(
					ns.tooltip(opt.tooltip, {
						tag: "textarea",
						class: [
							opt.plaintext && opt.readonly ? "form-control-plaintext" : "form-control",
							opt.weight && !(opt.before || opt.after || opt.addctl !== null || (opt.type === "number" && opt.numctl === true))
								? `form-control-${opt.weight}`
								: null,
							opt.label && opt.floatinglabel
								? [opt.before || opt.after ? "rounded-0" : null, opt.before ? "rounded-end" : null, opt.after ? "rounded-start" : null].combine(
										" "
								  )
								: null,
							opt.class,
						],
						attr: {
							id: opt.id,
							"aria-label": opt.hiddenlabel ? opt.hiddenlabel : null,
							name: opt.name,
							placeholder: opt.placeholder,
							readonly: opt.readonly ? "" : null,
							disabled: opt.disabled ? "" : null,
							required: opt.required ? "required" : null,
							// title: opt.tooltip ? opt.tooltip : null,
							// "data-bs-toggle": opt.tooltip ? "tooltip" : null,
							// "data-bs-placement": opt.tooltip ? (opt.tooltipplace ? opt.tooltipplace : "top") : null,
							// "data-bs-html": opt.tooltip && ns.core.isHTML(opt.tooltip) ? "true" : null,
							rows: opt.rows,
							onchange: opt.onchange,
							onclick: opt.onclick,
							onfocus: opt.onfocus,
							onblur: opt.onblur,
						},
						style: opt.style,
						elems: opt.value,
					})
				);
				break;
			case "select":
				mainctl.push(
					ns.tooltip(opt.tooltip, {
						tag: "select",
						class: [
							opt.plaintext && opt.readonly ? "form-select-plaintext" : "form-select",
							opt.weight && !(opt.before || opt.after || opt.addctl !== null || (opt.type === "number" && opt.numctl === true))
								? `form-select-${opt.weight}`
								: null,
							opt.label && opt.floatinglabel
								? [opt.before || opt.after ? "rounded-0" : null, opt.before ? "rounded-end" : null, opt.after ? "rounded-start" : null].combine(
										" "
								  )
								: null,
							opt.class,
						],
						data: opt.data,
						attr: {
							id: opt.id,
							"aria-label": opt.hiddenlabel ? opt.hiddenlabel : null,
							name: opt.name,
							placeholder: opt.placeholder,
							readonly: opt.readonly ? "" : null,
							disabled: opt.disabled ? "" : null,
							required: opt.required ? "required" : null,
							// title: opt.tooltip ? opt.tooltip : null,
							// "data-bs-toggle": opt.tooltip ? "tooltip" : null,
							// "data-bs-placement": opt.tooltip ? (opt.tooltipplace ? opt.tooltipplace : "top") : null,
							// "data-bs-html": opt.tooltip && ns.core.isHTML(opt.tooltip) ? "true" : null,
							multiple: opt.multiple,
							size: opt.rows,
							onchange: opt.onchange,
							onclick: opt.onclick,
							onfocus: opt.onfocus,
							onblur: opt.onblur,
						},
						style: opt.style,
						elems: ns.option(opt.option, opt.value),
					})
				);
				break;
			case "datalist":
				mainctl.push({
					tag: "datalist",
					attr: { id: opt.id },
					elems: ns.option(opt.option),
				});
				break;
			default:
				//datalist id standby if option provided
				var dtlistId = opt.option ? ns.core.UUID() : null;

				//create control
				mainctl.push(
					ns.tooltip(opt.tooltip, {
						tag: "input",
						class: [
							opt.type !== "range" && opt.type !== "button" && opt.type !== "submit" && opt.type !== "reset"
								? [
										opt.plaintext && opt.readonly ? "form-control-plaintext" : "form-control",
										,
										opt.weight && !(opt.before || opt.after || opt.addctl !== null || (opt.type === "number" && opt.numctl === true))
											? `form-control-${opt.weight}`
											: null,
								  ].combine(" ")
								: opt.type !== "button" && opt.type !== "submit" && opt.type !== "reset"
								? "form-range"
								: null,
							opt.type === "color" ? ["form-control-color", opt.floatinglabel ? "w-100" : null].combine(" ") : null,
							opt.label && opt.floatinglabel
								? [
										opt.before || opt.after || opt.numctl ? "rounded-0" : null,
										opt.before ? "rounded-end" : null,
										opt.after ? "rounded-start" : null,
								  ].combine(" ")
								: opt.label && opt.numctl
								? "rounded-0"
								: null,
							opt.class,
						],
						data: opt.data,
						attr: {
							id: opt.id,
							"aria-label": opt.hiddenlabel ? opt.hiddenlabel : null,
							name: opt.name,
							type: opt.type,
							role: opt.type === "button" && opt.type === "submit" && opt.type === "reset" ? "button" : null,
							placeholder: opt.placeholder,
							min: opt.min,
							max: opt.max,
							step: opt.step,
							readonly: opt.readonly ? "" : null,
							disabled: opt.disabled ? "" : null,
							required: opt.required ? "required" : null,
							// title: opt.tooltip ? opt.tooltip : null,
							// "data-bs-toggle": opt.tooltip ? "tooltip" : null,
							// "data-bs-placement": opt.tooltip ? (opt.tooltipplace ? opt.tooltipplace : "top") : null,
							// "data-bs-html": opt.tooltip && ns.core.isHTML(opt.tooltip) ? "true" : null,
							value: ["date", "datetime", "month", "datetime-local", "time", "week"].indexOf(opt.value) > -1 ? moment(opt.value) : opt.value,
							list: dtlistId,
							onchange: opt.onchange,
							onclick: opt.onclick,
							onfocus: opt.onfocus,
							onblur: opt.onblur,
						},
						style: opt.style,
						elems: null,
					})
				);

				//generate datalist for input
				if (opt.option) {
					mainctl.push({
						tag: "datalist",
						attr: { id: dtlistId },
						elems: ns.option(opt.option),
					});
				}
		}

		//put label for floating label
		if (opt.floatinglabel && opt.label) {
			mainctl.push({
				tag: "label",
				attr: { for: opt.id },
				elems: opt.label,
			});

			ctl.push({
				tag: "div",
				class: "form-floating flex-grow-1",
				elems: mainctl,
			});
		} else {
			ctl = ctl.concat(mainctl);
		}

		//add after element
		if (opt.after) {
			if (opt.aftertype === "text") {
				ctl.push({
					tag: "span",
					class: "input-group-text",
					elems: opt.after,
				});
			} else {
				ctl = ctl.concat(opt.after);
			}
		} else {
			//check if before element isnot set
			//and numctl is true
			//and type is number
			if (opt.type === "number" && opt.numctl === true) {
				ctl.push(
					ns.button({
						label: ns.icon("plus"),
						color: "primary",
						onclick: function (sender) {
							fn.numctlclick(sender, opt.step ? opt.step : 1);
						},
					})
				);
			} else if (opt.addctl !== null) {
				ctl.push(
					ns.button({
						label: ns.icon("plus"),
						color: "primary",
						onclick: opt.addctl,
					})
				);
			}
		}

		//valid message
		if (opt.valid) {
			ctl.push({
				tag: "div",
				class: "valid-feedback",
				elems: opt.valid,
			});
		}

		//invalid message
		if (opt.invalid) {
			ctl.push({
				tag: "div",
				class: "invalid-feedback",
				elems: opt.invalid,
			});
		}

		//input ctl in div.col-auto if labelsize is set
		if (opt.labelsize) {
			ctl = [
				{
					tag: "div",
					class: opt.ctlsize ? `col-${opt.ctlsize}` : "col-auto",
					elems: ctl,
				},
			];
		}

		//put ctl in div.input-group if has before/after
		if (opt.before || opt.after || opt.addctl !== null || (opt.type === "number" && opt.numctl === true)) {
			if (opt.flexcontainer) {
				ctl = [
					{
						tag: "div",
						class: ["d-flex", opt.class],
						elems: ctl,
					},
				];
			} else {
				ctl = [
					{
						tag: "div",
						class: [
							"input-group",
							opt.nowarp ? "flex-nowarp" : null,
							opt.weight ? `input-group-${opt.weight}` : null,
							opt.valid || opt.invalid ? "has-validation" : null,
						],
						elems: ctl,
					},
				];
			}
		}

		//put ctl in div.form-check if checkbox/radio/switch
		if (["checkbox", "radio", "switch"].indexOf(opt.type) > -1) {
			if (opt.flexcontainer) {
				ctl = [
					{
						tag: "div",
						class: ["d-flex", opt.class],
						elems: ctl,
					},
				];
			} else {
				ctl = [
					{
						tag: "div",
						class: [
							opt.label && opt.btncheck ? null : "form-check",
							opt.label && opt.inline ? "form-check-inline" : null,
							opt.type === "switch" ? " form-switch" : null,
							opt.valid || opt.invalid ? "has-validation" : null,
						],
						elems: ctl,
					},
				];
			}
		}

		var res = [];
		if (opt.size || opt.type === "hidden") {
			res = [
				{
					tag: "div",
					class: [opt.size, opt.type === "hidden" ? "d-none" : null].combine(" "),
					elems: lbl.concat(ctl),
				},
			];
		} else {
			res = lbl.concat(ctl);
		}

		//return fn.gen(res);
		// return {
		// 	elems: res,
		// };
		if (res && typeof res === "object") {
			if (Array.isArray(res)) {
				if (res.length === 1) {
					return res[0];
				} else {
					// console.log(res);
					// console.warn(`input #${opt.id} has many element`);
					return {
						elems: res,
					};
				}
			} else {
				return res;
			}
		} else {
			console.log(res);
			console.warn(`input #${opt.id} has many element`);
			return {
				elems: res,
			};
		}
	};
})(ns);
