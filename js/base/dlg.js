//generate and show dialog modal
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {
	const DELETETEXT = "delete";

	const BTNCAPTION = [
		{ key: "okay", value: ["Okay"] },
		{ key: "close", value: ["Close"] },
		{ key: "cancel", value: ["Cancel"] },
		{ key: "okayonly", value: ["Okay"] },
		{ key: "closeonly", value: ["Close"] },
		{ key: "cancelonly", value: ["Cancel"] },

		{ key: "savechangesclose", value: ["Save changes", "Close"] },
		{ key: "understandclose", value: ["Understand", "Close"] },
		{ key: "sendmessageclose", value: ["Send message", "Close"] },
		//

		{ key: "searchcancel", value: ["Search", "Cancel"] },
		{ key: "sortcancel", value: ["Sort", "Cancel"] },
		{ key: "yesno", value: ["Yes", "No"] },
		{ key: "yescancel", value: ["Yes", "Cancel"] },
		{ key: "yesclose", value: ["Yes", "Close"] },
		{ key: "yescontinueno", value: ["Yes, continue", "No"] },
		{
			key: "yescontinuecancel",
			value: ["Yes, continue", "Cancel"],
		},
		{
			key: "yescontinueclose",
			value: ["Yes, continue", "Close"],
		},
		{ key: "yessaveno", value: ["Yes, save", "No"] },
		{ key: "yessavecancel", value: ["Yes, save", "Cancel"] },
		{ key: "yessaveclose", value: ["Yes, save", "Close"] },
		{ key: "yesdeleteno", value: ["Yes, delete", "No"] },
		{
			key: "yesdeletecancel",
			value: ["Yes, delete", "Cancel"],
		},
		{ key: "yesdeleteclose", value: ["Yes, delete", "Close"] }, //no YES

		{ key: "continueno", value: ["Continue", "No"] },
		{
			key: "continuecancel",
			value: ["Continue", "Cancel"],
		},
		{
			key: "continueclose",
			value: ["Continue", "Close"],
		},
		{ key: "saveno", value: ["Save", "No"] },
		{ key: "savecancel", value: ["Save", "Cancel"] },
		{ key: "saveclose", value: ["Save", "Close"] },
		{ key: "deleteno", value: ["Delete", "No"] },
		{
			key: "deletecancel",
			value: ["Delete", "Cancel"],
		},
		{ key: "deleteclose", value: ["Delete", "Close"] },

		{ key: "okaycancel", value: ["Okay", "Cancel"] }, //end no YES
		{ key: "okayclose", value: ["Okay", "Close"] },
		{
			key: "okaycontinuecancel",
			value: ["Okay, Continue", "Cancel"],
		},
		{
			key: "okaycontinueclose",
			value: ["Okay, Continue", "Close"],
		},
		{ key: "okaysavecancel", value: ["Okay, save", "Cancel"] },
		{ key: "okaysaveclose", value: ["Okay, save", "Close"] },
		{
			key: "okaydeletecancel",
			value: ["Okay, Delete", "Cancel"],
		},
		{
			key: "okaydeleteclose",
			value: ["Okay, Delete", "Close"],
		},
		{ key: "yesnocancel", value: ["Yes", "No", "Cancel"] },
		{ key: "yesnoclose", value: ["Yes", "No", "Close"] },
		{
			key: "yescontinuenocancel",
			value: ["Yes, continue", "No", "Cancel"],
		},
		{
			key: "yescontinuenoclose",
			value: ["Yes, continue", "No", "Close"],
		},
		{
			key: "yessavenocancel",
			value: ["Yes, save", "No", "Cancel"],
		},
		{
			key: "yessavenoclose",
			value: ["Yes, save", "No", "Close"],
		},
		{
			key: "yesdeletenocancel",
			value: ["Yes, delete", "No", "Cancel"],
		},
		{
			key: "yesdeletenoclose",
			value: ["Yes, delete", "No", "Close"],
		},
		//no YES
		{
			key: "continuenocancel",
			value: ["Continue", "No", "Cancel"],
		},
		{
			key: "continuenoclose",
			value: ["Continue", "No", "Close"],
		},
		{
			key: "savenocancel",
			value: ["Save", "No", "Cancel"],
		},
		{
			key: "savenoclose",
			value: ["Save", "No", "Close"],
		},
		{
			key: "deletenocancel",
			value: ["Delete", "No", "Cancel"],
		},
		{
			key: "deletenoclose",
			value: ["Delete", "No", "Close"],
		},
	];

	var fn = {
		build: function (opt) {
			/**
			 * static : true|false
			 * elems : {elems:[]}
			 * title: string
			 * icon:string|{icon:string}
			 * footer:{elems:[]}
			 * footerstyle:"full"|null (removed)
			 * button:[ns.button()]
			 * show:true|false
			 * animate:true|false
			 * scrollable:true|false
			 * center:true|false
			 * size:xl|lg|sm|null
			 * fullscreen:false|true
			 * hastab:false|true
			 * focus:true|false
			 *  */
			opt = $.extend(
				{},
				{
					id: null,
					class: null,
					static: true,
					elems: null,
					title: null,
					icon: null,
					footer: null,
					button: null,
					show: false,
					animate: true,
					scrollable: true,
					center: true,
					size: null,
					fullscreen: false,
					hastab: false,
					focus: true,
				},
				opt
			);

			//support opt.button : string or [ns.button]
			if (typeof opt.button === "string") {
				opt.button = fn.dlgbtn(opt.button);
				if (opt.button) {
					return fn.build(opt);
				} else {
					opt.button = [];
					return fn.build(opt);
				}
			} else {
				if (Array.isArray(opt.button)) {
					//generate id
					opt.id = opt.id ? opt.id : ns.core.UUID();

					var resHead = [];
					var resBody = [];
					var resFooter = [];
					var resControl = [];
					var resButton = [];

					//gen header
					if (opt.title || opt.icon) {
						//icon
						if (opt.icon) {
							if (typeof opt.icon === "string") {
								resHead.push({
									elems: ns.icon({
										icon: opt.icon,
										class: "me-2",
									}),
								});
							} else {
								resHead.push({
									elems: ns.icon(opt.icon),
								});
							}
						}

						//title
						if (opt.title) {
							resHead.push({
								tag: "span",
								class: "text-capitalize",
								elems: opt.title,
							});
						}

						//wrap icon and title in div.modal-title
						if (opt.title || opt.icon) {
							resHead = [
								{
									tag: "h5",
									class: "modal-title",
									elems: resHead.slice(),
								},
							];
						}

						//close button on title head
						//if (!opt.static) {
						resHead.push({
							tag: "button",
							class: "btn-close",
							attr: {
								type: "button",
								"data-bs-dismiss": "modal",
							},
						});
						//}

						//wrap in div.modal-header
						resHead = [
							{
								tag: "div",
								class: "modal-header",
								elems: resHead.slice(),
							},
						];
					}

					//gen body
					//elems is optional
					resBody.push({
						tag: "div",
						class: ["modal-body", opt.hastab ? "p-0" : null],
						elems: opt.elems,
					});

					//android style button
					//gen footer
					//gen control part
					var hasFooterCtl = false;
					if (opt.footer) {
						hasFooterCtl = true;
						resControl.push({
							tag: "div",
							class: "footer-ctl float-start",
							elems: opt.footer,
						});
					}

					//gen footer button
					var hasButton = false;
					if (opt.button && opt.button.length > 0 && opt.button[0] !== null) {
						hasButton = true;
						//must ARRAY {name,color}

						opt.button.forEach((item, index) => {
							item.id = item.id ? item.id : `${opt.id}-btn-${index}`;
							item.color = item.color ? item.color : index === 0 ? "primary" : "text-secondary";
							item.class = "ms-3 btn-modal";
							//push button to front
							//RTL style
							resButton.unshift({
								elems: ns.button(item),
							});
						});

						//need to wrap resButton into div.justify-content-end to push button to the right
						resButton = [
							{
								tag: "div",
								class: "justify-content-end",
								elems: resButton.slice(),
							},
						];
					}

					//mix footer and button
					//if (opt.footer && opt.button) {
					//put in container if footer and button provided
					resFooter.push({
						tag: "div",
						class: "container-fluid g-0 p-0",
						elems: {
							tag: "div",
							class: "row align-items-center",
							elems: [
								{
									tag: "div",
									class: "col",
									elems: resControl,
								},
								{
									tag: "div",
									class: "col-auto",
									elems: resButton,
								},
							],
						},
					});

					//wrap footer to div.modal-footer
					resFooter = {
						tag: "div",
						class: "modal-footer",
						elems: resFooter.slice(),
					};

					//combine header,body,footer to div.modal > div.modal-dialog > div.content
					var res = [];

					res = res.concat(resHead);
					res = res.concat(resBody);

					if (hasButton || hasFooterCtl) {
						res = res.concat(resFooter);
					}

					res = {
						tag: "div",
						class: ["modal", opt.animate ? "fade" : null, opt.show ? "show" : null],
						attr: {
							id: opt.id,
							tabindex: "-1",
							"data-bs-backdrop": opt.static ? "static" : null,
							"data-bs-keyboard": opt.static ? "false" : null,
							"data-bs-focus": opt.focus ? "true" : null,
						},
						elems: {
							tag: "div",
							class: [
								"modal-dialog",
								opt.scrollable ? "modal-dialog-scrollable" : null,
								opt.center ? "modal-dialog-centered" : null,
								opt.size ? `modal-${opt.size}` : null,
								opt.fullscreen ? (typeof opt.fullscreen === "string" ? `modal-fullscreen-${opt.fullscreen}` : "modal-fullscreen") : null,
							],
							elems: {
								tag: "div",
								class: "modal-content",
								elems: res.slice(),
							},
						},
					};

					return res;
				} else {
					opt.button = [opt.button];
					return fn.build(opt);
				}
			}
		},
		show: function (elem, ...arg) {
			if (elem) {
				if (typeof elem === "string") {
					fn.show($(elem)[0], ...arg);
				} else {
					var backdrop = $(elem).attr("data-bs-backdrop");
					var keyboard = $(elem).attr("data-bs-keyboard");
					var focus = $(elem).attr("data-bs-focus");

					var mdl = new bootstrap.Modal(elem, {
						backdrop: backdrop === "static" ? "static" : true,
						keyboard: keyboard === "true" ? true : false,
						focus: focus === "true" ? true : false,
					});

					//set function for each button in footer
					//button modal has .btn-modal coz, footer control also can have button
					var btnmodal = $(elem).find(".btn-modal").get().reverse();

					btnmodal.forEach((item, index) => {
						$(item).on("click", function () {
							if (arg && index <= arg.length && ns.core.isFunction(arg[index])) {
								if (arg[index](elem)) {
									fn.hide(elem);
								}
							} else {
								fn.hide(elem);
							}
						});
					});

					//hide previous modal
					var allModal = $(".modal");
					if (allModal && allModal.length > 1) {
						var prevModal = allModal[allModal.length - 2];
						$(prevModal).removeClass("show");
						if ($(prevModal).attr("data-bs-backdrop") === "static") {
							$(prevModal).next(".modal-backdrop").removeClass("show");
						}
					}

					//add event to destroy modal after hidden
					$(elem).on("hidden.bs.modal", function (event) {
						//show back prevModal
						var allModal = $(".modal");
						if (allModal && allModal.length > 1) {
							var prevModal = allModal[allModal.length - 2];
							$(prevModal).addClass("show");
							if ($(prevModal).attr("data-bs-backdrop") === "static") {
								$(prevModal).next(".modal-backdrop").addClass("show");
							}
						}

						setTimeout(
							function (elem) {
								fn.destroy(elem);
							},
							3000,
							elem
						);
					});

					//add event to init control in modal
					$(elem).on("shown.bs.modal", function (event) {
						ns.build.init(this);
						$(this).modal("handleUpdate");
					});

					//show modal
					mdl.show();
				}
			}
		},
		hide: function (elem) {
			if (elem) {
				if (typeof elem === "string") {
					fn.hide($(elem)[0]);
				} else {
					var mdl = bootstrap.Modal.getInstance(elem);
					if (mdl) {
						mdl.hide();
					}
				}
			}
		},
		destroy: function (elem) {
			if (elem) {
				if (typeof elem === "string") {
					fn.destroy($(elem)[0]);
				} else {
					var mdl = bootstrap.Modal.getInstance(elem);
					if (mdl) {
						try {
							$(mdl).destroy();
						} catch {}

						$(elem).remove();
					}
				}
			}
		},
		getvalue: function (container) {
			var ctl = $(container).find("[name]").get(); //.get() to get real DOM array
			if (ctl && ctl.length > 0) {
				var e = {};

				ctl.forEach((item) => {
					e[$(item).attr("name")] = ns.core.getvalue(item);
				});

				return e;
			} else {
				return null;
			}
		},
		validate: function (container) {
			return ns.core.validate(container);
		},
		//return label for dlg button base on shortcut text (example: okayonly,yesno,okaycancel,yesnocancel,continuenocancel)
		dlgbtn: function (btn) {
			if (btn) {
				var found = BTNCAPTION.find((o) => o.key === btn.toLowerCase());
				if (found) {
					return found.value.map(function (item) {
						if (item.toLowerCase().indexOf(DELETETEXT) > -1) {
							return {
								label: item,
								color: "danger",
							};
						} else {
							return {
								label: item,
							};
						}
					});
				} else {
					console.error(`Unknow button : ${btn}`);
				}
			}

			return null;
		},
		dlgmsg: function (...arg) {
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
					return {
						elems: {
							tag: "div",
							class: "row g-0",
							elems: [
								{
									tag: "div",
									class: "col-auto align-self-start pt-1 me-3",
									elems: ns.icon({
										icon: icon,
										size: "3x",
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
					return msg;
				}
			}
		},
	};

	ns.dlg = {
		/**
		 *
		 * example:
		 * ns.dlg.msgbox("i","msg").then().catch()
		 * ns.dlg.msgbox("i","msg","okayonly").then().catch()
		 */
		msgbox: function (icon, msg, button) {
			return new Promise((res, rej) => {
				try {
					button = button ? button : "okayonly";
					var id = ns.core.UUID();

					ns.build.append(
						document.body,
						fn.build({
							id: id,
							title: document.title,
							button: button,
							elems: fn.dlgmsg(icon, msg),
						})
					);

					fn.show(
						`#${id}`,
						function () {
							res();
							return true;
						},
						function () {
							try {
								rej();
							} catch (ex) {}
							return true;
						},
						function () {
							try {
								rej();
							} catch (ex) {}
							return true;
						}
					);
				} catch (err) {
					rej(err);
				}
			});
		},
		/**
		 *
		 * example:
		 * ns.dlg.confirmbox("i","msg").then().catch()
		 * ns.dlg.confirmbox("i","msg","okaycancel").then().catch()
		 */
		confirmbox: function (icon, msg, button) {
			return new Promise((res, rej) => {
				try {
					button = button ? button : "yesnocancel";
					var id = ns.core.UUID();

					ns.build.append(
						document.body,
						fn.build({
							id: id,
							title: document.title,
							button: button,
							elems: fn.dlgmsg(icon, msg),
						})
					);

					fn.show(
						`#${id}`,
						function (container) {
							res(container);
							return true;
						},
						function () {
							try {
								rej();
							} catch (ex) {}
							return true;
						},
						function () {
							try {
								rej();
							} catch (ex) {}
							return true;
						}
					);
				} catch (err) {
					rej(err);
				}
			});
		},
		/**
		 *
		 * example:
		 * ns.dlg.inputbox("text","msg").then(data).catch()
		 * ns.dlg.inputbox("tel","msg","okaycancel").then(data).catch()
		 * ns.dlg.inputbox(ns.input(),"msg").then(data).catch()
		 * ns.dlg.inputbox(ns.input(),"msg","okaycancel").then(data).catch()
		 */
		inputbox: function (type, msg, button) {
			return new Promise((res, rej) => {
				try {
					button = button ? button : "okaycancel";
					var id = ns.core.UUID();

					var ctl = [];

					//msg
					if (msg) {
						ctl.push({
							tag: "p",
							elems: msg,
						});
					}

					//ctl
					if (typeof type === "string") {
						ctl.push(ns.input({ type: type, name: "value" }));
					} else {
						if (Array.isArray(type)) {
							//combine multiple control into res
							ctl = ctl.concat(type);
						} else {
							//just put one elem into res
							ctl.push(type);
						}
					}

					//put in modal
					ns.build.append(
						document.body,
						fn.build({
							id: id,
							title: document.title,
							button: button,
							elems: {
								elems: ctl,
							},
						})
					);

					$(`#${id}`).on("shown.bs.modal", function (event) {
						var container = event.target;
						var inputLast = $(container).find(".modal-body").find("[name]:last");
						if (inputLast) {
							$(inputLast).on("keyup", function (event) {
								if (event.keyCode === 13) {
									$(container).find(".modal-footer").find(".btn:last").click();
								}
							});
						}

						var inputFirst = $(container).find(".modal-body").find("[name]:first");
						if (inputFirst) {
							$(inputFirst).focus();
						}
					});

					fn.show(
						`#${id}`,
						function (container) {
							if (fn.validate(container)) {
								var data = fn.getvalue(container);

								if (data) {
									if (!data.dlg) {
										data.dlg = `#${$(container).attr("id")}`;
									} else {
										console.warn("ns.dlg has input with name dlg that should be used to send container");
									}
								} else {
									data = {};
									data.dlg = `#${$(container).attr("id")}`;
								}

								res(data);
								return true;
							} else {
								return false;
							}
						},
						function () {
							try {
								rej();
							} catch (ex) {}
							return true;
						},
						function () {
							try {
								rej();
							} catch (ex) {}
							return true;
						}
					);
				} catch (err) {
					rej(err);
				}
			});
		},
		/**
		 *
		 * example:
		 * ns.dlg.box({id:"",button:"okaycancel",onshow:function(){}}).then(data).catch()
		 */
		box: function (opt) {
			return new Promise((res, rej) => {
				try {
					opt = $.extend(
						{},
						{
							id: null,
							title: null,
							button: null,
							onshow: null,
							fullscreen: "sm-down",
						},
						opt
					);
					opt.id = opt.id ? opt.id : ns.core.UUID();

					//put in modal
					ns.build.append(document.body, fn.build(opt));

					//setup onshow dlg
					$(`#${opt.id}`).on("shown.bs.modal", function (event) {
						var container = event.target;
						var inputLast = $(container).find(".modal-body").find("[name]:last");
						if (inputLast) {
							$(inputLast).on("keyup", function (event) {
								if (event.keyCode === 13) {
									$(container).find(".modal-footer").find(".btn:last").click();
								}
							});
						}

						var inputFirst = $(container).find(".modal-body").find("[name]:first");
						if (inputFirst) {
							$(inputFirst).focus();
						}

						if (ns.core.isFunction(opt.onshow)) {
							opt.onshow($(`#${opt.id}`));
						}
					});

					//show modal
					fn.show(
						`#${opt.id}`,
						function (container) {
							if (fn.validate(container)) {
								var data = fn.getvalue(container);

								if (data) {
									if (!data.dlg) {
										data.dlg = `#${$(container).attr("id")}`;
									} else {
										console.warn("ns.dlg has input with name dlg that should be used to send container");
									}
								} else {
									data = {};
									data.dlg = `#${$(container).attr("id")}`;
								}

								res(data);

								return true;
							} else {
								return false;
							}
						},
						function () {
							try {
								rej();
							} catch (ex) {}

							return true;
						},
						function () {
							try {
								rej();
							} catch (ex) {}
							return true;
						}
					);
				} catch (err) {
					rej(err);
				}
			});
		},
	};
})(ns);
