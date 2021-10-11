//file contorl (upload,download,view,save)
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {
	ns.file = {
		fn: {
			onview: function (sender) {
				var container = $(sender).closest(".file-upload-controller");
				var ctl = $(container).find("input[type='hidden']");
				var data = $(ctl).val();

				if (data) {
					//need to convert id,id,id to Array
					if (data.indexOf(",") > -1) {
						ns.file.view(data.split(","), sender);
					} else {
						ns.file.view(data, sender);
					}
				}
			},
			onchange: function (sender) {
				var container = $(sender).closest(".file-upload-controller");
				var ctl = $(container).find("input[type='hidden']");
				var id = $(ctl).attr("id");
				var value = $(ctl).val();

				var btnview = $(`#${id}-view`);
				var btndelete = $(`#${id}-delete`);

				if (value) {
					$(btnview).removeAttr("disabled").removeClass("disabled btn-secondary").addClass("btn-success");
					$(btndelete).removeAttr("disabled").removeClass("disabled btn-secondary").addClass("btn-danger");
				} else {
					$(btnview).prop("disabled", true).addClass("disabled btn-secondary").removeClass("btn-success");
					$(btndelete).prop("disabled", true).addClass("disabled btn-secondary").removeClass("btn-danger");
				}
			},
			ondelete: function (sender) {
				var container = $(sender).closest(".file-upload-controller");
				var ctl = $(container).find("input[type='hidden']");

				$(ctl).val("");
				$(ctl).trigger("change");
			},
			onupload: function (sender) {
				var container = $(sender).closest(".file-upload-controller");
				var ctl = $(container).find("input[type='hidden']");

				var accept = $(ctl).attr("data-ns-accept");
				var multiple = $(ctl).attr("data-ns-multiple");

				accept = accept
					? accept
					: "image/gif,image/bmp,image/x-windows-bmp,image/jpeg,image/png,application/pdf,application/zip,application/json,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/html";
				multiple = multiple ? ns.core.parseBool(multiple) : false;

				ns.file
					.upload({
						multiple: multiple,
					})
					.then((data) => {
						$(ctl).val(data);
						$(ctl).trigger("change");
					}, ns.core.errorHandler);
			},
		},
		ctl: function (opt) {
			//create control to handle file
			//[preview|delete|upload] if has value
			//[upload] if no value

			//create hidden input that keep value and name
			//show button base on value (3 button or one button)
			//this control should has option like ns.input()

			opt = $.extend(
				{},
				{
					id: null,
					name: null,
					class: null,
					label: null,
					readonly: false,
					disabled: false,
					multiple: false,
					size: "col-12",
					value: null,
					onchange: null,
					valid: null,
					invalid: null,
					accept: "image/gif,image/bmp,image/x-windows-bmp,image/jpeg,image/png,application/pdf,application/zip,application/json,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/html",
				},
				opt
			);

			//generate id
			opt.id = opt.id ? opt.id : ns.core.UUID();

			//generate label
			var lbl = [];
			if (opt.label) {
				lbl.push({
					tag: "label",
					class: "form-label",
					attr: { for: opt.id },
					elems: opt.label,
				});
			}

			//generate control
			var ctl = [];

			//create main control to handle value
			ctl.push({
				tag: "input",
				class: [opt.class],
				attr: {
					id: opt.id,
					name: opt.name,
					type: "hidden",
					readonly: opt.readonly,
					disabled: opt.disabled,
					value: opt.value,
					onchange: ["ns.file.fn.onchange(this);", opt.onchange ? opt.onchange : null].combine(""),
					"data-ns-accept": opt.accept,
					"data-ns-multiple": opt.multiple,
				},
				elems: null,
			});

			//add button base on value
			ctl.push({
				tag: "div",
				class: "row",
				elems: {
					tag: "div",
					class: "btn-group",
					elems: [
						ns.button({
							id: `${opt.id}-view`,
							label: "View",
							icon: "eye",
							color: opt.value ? "success" : "secondary",
							class: "w-100",
							disabled: opt.value ? false : true,
							onclick: "ns.file.fn.onview(this)",
						}),

						ns.button({
							id: `${opt.id}-delete`,
							icon: "times",
							color: opt.value ? "danger" : "secondary",
							class: "w-0",
							disabled: opt.disabled ? true : opt.readonly ? true : opt.value ? false : true,
							onclick: "ns.file.fn.ondelete(this)",
						}),

						ns.button({
							id: `${opt.id}-upload`,
							icon: "upload",
							color: "primary",
							class: "w-0",
							disabled: opt.disabled ? true : opt.readonly ? true : false,
							onclick: "ns.file.fn.onupload(this)",
						}),
					],
				},
			});

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

			var res = [];
			if (opt.size) {
				res = [
					{
						tag: "div",
						class: opt.size,
						elems: lbl.concat(ctl),
					},
				];
			} else {
				res = lbl.concat(ctl);
			}

			//return fn.gen(res);
			return {
				tag: "div",
				class: "file-upload-controller",
				elems: res,
			};
		},
		upload: function (opt) {
			return new Promise((res, rej) => {
				var id = ns.core.UUID();

				opt = $.extend(
					{},
					{
						accept: "image/gif,image/bmp,image/x-windows-bmp,image/jpeg,image/png,application/pdf,application/zip,application/json,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/html",
						multiple: false,
						cancelafter: 180000, //3minute
					},
					opt
				);

				ns.build.append(document.body, {
					tag: "input",
					attr: {
						id: id,
						type: "file",
						multiple: opt.multiple,
						accept: opt.accept ? opt.accept : null,
					},
					style: { display: "none" },
				});

				$(`#${id}`).change(function () {
					//add class to mark upload in progress
					$(this).addClass("upload-in-progress");

					ns.api
						.upload({
							obj: $(`#${id}`),
							progress: function (percent) {},
						})
						.then((data) => {
							res(data);
							$(`#${id}`).remove();
						})
						.catch((err) => {
							rej(err);
						});
				});

				$(`#${id}`).trigger("click");

				//set timer to remove uploader if noting in progress in opt.cancelafter
				if (opt.cancelafter > 0) {
					setTimeout(
						function (id) {
							if (!$(id).hasClass("upload-in-progress")) {
								var cancelafterinminute = +parseFloat(opt.cancelafter / 60000).toFixed(1);
								// ns.toast(
								// 	"!",
								// 	[
								// 		"Upload canceled after no response for ",
								// 		cancelafterinminute,
								// 		" minute",
								// 		cancelafterinminute > 1 ? "s" : null,
								// 	].combine("")
								// );
								$(id).remove();
							}
						},
						opt.cancelafter,
						`#${id}`
					);
				}
			});
		},
		save: function (fileId) {
			return new Promise((res, rej) => {
				if (fileId) {
					if (typeof fileId === "string") {
						ns.file
							.save([fileId])
							.then((data) => {
								res(data);
							})
							.catch((err) => {
								rej(err);
							});
					} else {
						ns.api
							.put({
								name: `file/${fileId.combine(",")}`,
							})
							.then((data) => {
								res(data);
							})
							.catch((err) => {
								rej(err);
							});
					}
				} else {
					rej();
				}
			});
		},
		delete: function (fileId) {
			return new Promise((res, rej) => {
				if (fileId) {
					if (typeof fileId === "string") {
						ns.file
							.delete([fileId])
							.then((data) => {
								res(data);
							})
							.catch((err) => {
								rej(err);
							});
					} else {
						ns.api
							.delete({
								name: `file/${fileId.combine(",")}`,
							})
							.then((data) => {
								res(data);
							})
							.catch((err) => {
								rej(err);
							});
					}
				} else {
					rej();
				}
			});
		},
		info: function (fileId) {
			return new Promise((res, rej) => {
				if (fileId) {
					if (typeof fileId === "string") {
						ns.file
							.info([fileId])
							.then((data) => {
								res(data);
							})
							.catch((err) => {
								rej(err);
							});
					} else {
						ns.api
							.get({
								name: `file-info/${fileId.combine(",")}`,
							})
							.then((data) => {
								res(data);
							})
							.catch((err) => {
								rej(err);
							});
					}
				} else {
					rej();
				}
			});
		},
		download: function (fileId, fileName) {
			var id = ns.core.UUID();

			ns.build.append(document.body, {
				tag: "a",
				attr: {
					id: id,
					href: `api/file/${fileId}`,
					download: fileName ? fileName : null,
					hidden: true,
				},
			});

			$(`#${id}`)[0].click();
			setTimeout(
				function (id) {
					$(`#${id}`).remove();
				},
				300,
				id
			);
		},
		view: function (fileId, sender) {
			if (fileId) {
				if (typeof fileId === "string") {
					return ns.file.view([fileId], sender);
				} else {
					//get file information
					ns.loading
						.start(sender)
						.then(() => {
							return ns.file.info(fileId);
						})
						.then((data) => {
							ns.loading.stop(sender);
							if (data) {
								if (data.length === 1) {
									//if only one file
									//preview : "image/gif,image/bmp,image/x-windows-bmp,image/jpeg,image/png,
									//download : application / pdf, application / zip, application / json, application / vnd.openxmlformats - officedocument.spreadsheetml.sheet, application / vnd.openxmlformats - officedocument.wordprocessingml.document, text / plain, text / html";
									switch (data[0].mimetype) {
										case "image/png":
										case "image/jpeg":
										case "image/gif":
										case "image/bmp":
										case "image/x-windows-bmp":
											//if picture. do preview

											ns.dlg.box({
												title: null,
												button: null,
												static: false,
												size: "lg",
												elems: {
													tag: "div",
													elems: {
														tag: "img",
														class: "img-fluid mx-auto d-block rounded btn p-0",
														attr: {
															"data-ns-src": `api/file/${data[0].id}`,
															onclick: `ns.file.download('${data[0].id}','${data[0].filename}');`,
														},
													},
												},
											});

											break;

										default:
											//if other. do download
											ns.file.download(data[0].id, data[0].filename);

											break;
									}
								} else {
									//if multiple file
									//change size base on img count
									var thumbnailsize = 12;
									switch (data.length) {
										case 1:
											thumbnailsize = 12;
											break;
										case 2:
											thumbnailsize = 6;
											break;
										case 3:
											thumbnailsize = 4;
											break;
										default:
											thumbnailsize = 3;
									}

									//create preview base on file type
									var prv = [];

									data.forEach((item) => {
										switch (item.mimetype) {
											case "image/png":
											case "image/jpeg":
											case "image/gif":
											case "image/bmp":
											case "image/x-windows-bmp":
												//if picture. do preview
												prv.push({
													tag: "div",
													class: `col-${thumbnailsize}`,
													elems: {
														tag: "div",
														class: "btn border p-1",
														attr: {
															onclick: `ns.file.download('${data[0].id}','${data[0].filename}');`,
														},
														elems: {
															tag: "img",
															class: "img-fluid mx-auto d-block rounded",
															attr: {
																"data-ns-src": `api/file/${item.id}`,
															},
														},
													},
												});
												break;

											default:
												prv.push({
													tag: "div",
													class: `d-flex align-items-stretch col-${thumbnailsize}`,
													elems: {
														tag: "div",
														class: "btn border p-1 d-flex justify-content-center w-100",
														attr: {
															onclick: `ns.file.download('${data[0].id}','${data[0].filename}');`,
														},
														elems: {
															tag: "span",
															class: "align-self-center",
															elems: ns.icon({
																icon: "download",
																size: "2x",
															}),
														},
													},
												});
												break;
										}
									});

									ns.dlg.box({
										title: null,
										button: null,
										static: false,
										size: "lg",
										elems: {
											tag: "div",
											class: "container p-0",
											elems: {
												tag: "div",
												class: "d-flex justify-content-center row g-3",
												elems: prv,
											},
										},
									});
								}
							}
						})
						.catch((err) => {
							ns.loading.stop(sender);
						});
				}
			}
		},
	};
})(ns);
