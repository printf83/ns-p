//query editor for list (update)
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {
	var fn = {
		isPrototypeExists: function (obj, prototypeName) {
			if (obj) {
				if (typeof obj === "object") {
					try {
						if (typeof obj[prototypeName] !== "undefined") {
							return true;
						}
					} catch (ex) {
						return false;
					}
				}
			}

			return false;
		},
		filter: {
			opr: function (useopricon, itemtype) {
				var rtn = null;
				if (itemtype) {
					//set operator base on frm value
					switch (itemtype) {
						case "text":
						case "tel":
						case "email":
							rtn = [
								{ value: "$eq", label: useopricon ? "&#xf52c;" : "Equal" },
								{
									value: "$ne",
									label: useopricon ? "&#xf53e;" : "Not Equal",
								},
								{ value: "$eqlike", label: useopricon ? "&#xf52c; &#xf069;" : "Like" },
								{ value: "$nelike", label: useopricon ? "&#xf53e; &#xf069;" : "Not Like" },
							];

							break;
						case "select":
						case "check":
							rtn = [
								{ value: "$eq", label: useopricon ? "&#xf52c;" : "Equal" },
								{
									value: "$ne",
									label: useopricon ? "&#xf53e;" : "Not Equal",
								},
							];
							break;
						case "date":
						case "number":
							rtn = [
								{ value: "$eq", label: useopricon ? "&#xf52c;" : "Equal" },
								{
									value: "$ne",
									label: useopricon ? "&#xf53e;" : "Not Equal",
								},
								{
									value: "$gte",
									label: useopricon ? "&#xf532;" : "More Than",
								},
								{
									value: "$lte",
									label: useopricon ? "&#xf537;" : "Less Than",
								},
							];
							break;

						default:
							console.error("Unhandle query.fn.filter.opr itemtype : " + itemtype);
					}
				}

				return rtn;
			},
			item: function (useopricon, field, f, o, v) {
				//set default value for f
				if (!f) {
					f = field[0].value;
				}

				//generate from opt
				var from_opt = field.map(function (item) {
					return {
						value: item.value,
						label: item.label,
					};
				});

				//gen sel.from
				var sel_from = ns.input({
					type: "select",
					name: "from",
					onchange: function (sender) {
						fn.filter.change(sender, useopricon);
					}, //"fn.filter.change(this," + (useopricon ? "true" : "false") + ")",
					option: from_opt,
					value: f,
					size: "",
				});

				//gen opr option
				var opr_opt = null;

				var item = field.find((obj) => {
					return obj.value === f;
				});

				//generate opr option base on itemtype
				opr_opt = fn.filter.opr(useopricon, item ? item.type : null);

				//set o value
				o = o ? o : opr_opt ? opr_opt[0].value : null;

				//set real opr value base on value
				if (o && o === "$regex") {
					//update opr value base on regex

					//like : { $regex: VALUETOFIND, $options: "i" };
					//notlike : { $regex: "^((?!" + VALUETOFIND + ").)*$", $options: "i" };
					if (v.startsWith("^((?!")) {
						o = "$nelike";
						v = v.substring(5, v.length - 5);
					} else {
						o = "$eqlike";
						v = v;
					}
				} else if (o && o === "$exists") {
					if (v) {
						o = "$ne";
					} else {
						o = "$eq";
					}

					v = "";
				}

				//gen sel.opr base on from value
				var sel_opr = ns.input({
					class: [useopricon ? "font-fa" : null].combine(" "),
					type: "select",
					name: "opr",
					option: opr_opt,
					value: o,
					size: useopricon ? "col-4 col-lg-3 px-2" : "col-sm-5 col-md-4 col-lg-3 px-2",
				});

				return ns.cont.div("d-flex", [
					ns.cont.div("container p-0", [
						ns.cont.div(
							"row g-2",
							ns.cont.div("d-flex", [
								sel_from,
								sel_opr,
								ns.button({
									color: "danger",
									icon: "trash",
									onclick: function (sender) {
										fn.filter.remove(sender);
									}, //"fn.filter.remove(this)",
								}),
							])
						),
						ns.cont.div("row mt-2", [
							ns.input({
								type: item && item.type ? item.type : "text",
								name: "value",
								value: v,
								size: "col-12",
								placeholder: item.placeholder ? item.placeholder : null,
								option: item && item.option ? item.option : null,
							}),
						]),
					]),
				]);
			},
			add: function (sender, animate) {
				var id = $(sender).closest(".modal[id]").attr("id");
				var opt = ns.data.get(`${id}-data`);
				//var cont = $(sender).closest(".modal[id]").find(".ns-filter-rule").find(".row");

				ns.build.prepend(
					$(sender).closest(".item")[0],
					ns.cont.div(["item col-12", animate ? "ns-fadeslidein" : null].combine(" "), fn.filter.item(opt.useopricon, opt.field, null, null, null))
				);

				setTimeout(
					function (sender) {
						$(sender).closest(".container").find(".ns-fadeslidein").removeClass("ns-fadeslidein");
					},
					500,
					sender
				);
			},
			change: function (sender, useopricon) {
				var id = $(sender).closest(".modal[id]").attr("id");
				var opt = ns.data.get(`${id}-data`);

				var opr = $(sender).closest(".item").find("select[name='opr']");
				var val = $(sender).closest(".item").find("[name='value']");
				var frm = $(sender).val();
				var item = opt.field.find((obj) => {
					return obj.value === frm;
				});

				//generate opr option base on itemtype
				var opr_opt = fn.filter.opr(opt.useopricon, item ? item.type : null);

				ns.build.replace(
					$(opr).parent(),
					ns.input({
						class: [opt.useopricon ? "font-fa" : null].combine(" "),
						type: "select",
						name: "opr",
						size: useopricon ? "col-4 col-lg-3 px-2" : "col-sm-5 col-md-4 col-lg-3 px-2",
						value: $(opr).val(),
						option: opr_opt,
					})
				);

				//set val from frm value
				ns.build.replace(
					val,
					ns.input({
						type: item && item.type ? item.type : "text",
						name: "value",
						size: "",
						placeholder: item.placeholder ? item.placeholder : null,
						value: ns.core.getvalue(val),
						option: item && item.option ? item.option : null,
					})
				);
			},
			remove: function (sender) {
				$(sender).closest(".item").addClass("ns-fadeslideout");
				setTimeout(
					function (sender) {
						$(sender).closest(".item").remove();
					},
					500,
					sender
				);
			},
		},
		sort: {
			opr: function (useopricon, itemtype) {
				var rtn = null;
				if (itemtype) {
					//set operator base on frm value
					if (useopricon) {
						switch (itemtype) {
							case "text":
							case "email":
							case "select":
								rtn = [
									{ value: 1, label: "&#xf15d;" },
									{ value: -1, label: "&#xf15e;" },
								];
								break;
							case "tel":
							case "check":
								rtn = [
									{ value: 1, label: "&#xf884;" },
									{ value: -1, label: "&#xf885;" },
								];
								break;
							case "date":
							case "number":
								rtn = [
									{ value: 1, label: "&#xf162;" },
									{ value: -1, label: "&#xf163;" },
								];
								break;
							default:
								console.error("Unhandle query.fn.sort.opr itemtype : " + itemtype);
						}
					} else {
						rtn = [
							{ value: 1, label: "Ascending" },
							{ value: -1, label: "Descending" },
						];
					}
				}

				return rtn;
			},
			item: function (useopricon, field, f, o) {
				//set default value for f
				if (!f) {
					f = field[0].value;
				}

				//generate from opt
				var from_opt = field.map(function (item) {
					return {
						value: item.value,
						label: item.label,
					};
				});

				//gen sel.from
				var sel_from = ns.input({
					type: "select",
					name: "from",
					onchange: function (sender) {
						fn.sort.change(sender, useopricon);
					}, //"fn.sort.change(this," + (useopricon ? "true" : "false") + ")",
					option: from_opt,
					value: f,
					size: "",
				});

				//gen opr option
				var opr_opt = null;

				var item = field.find((obj) => {
					return obj.value === f;
				});

				//generate opr option base on itemtype
				opr_opt = fn.sort.opr(useopricon, item ? item.type : null);

				//gen sel.opr base on from value
				var sel_opr = ns.input({
					class: [useopricon ? "font-fa" : null].combine(" "),
					type: "select",
					name: "opr",
					option: opr_opt,
					value: o ? o : opr_opt ? opr_opt[0].value : null,
					size: useopricon ? "col-4 col-lg-3 px-2" : "col-sm-5 col-md-4 col-lg-3 px-2",
				});

				return ns.cont.div("d-flex", [
					sel_from,
					sel_opr,
					ns.button({
						color: "danger",
						icon: "trash",
						onclick: function (sender) {
							fn.sort.remove(sender);
						}, //"fn.sort.remove(this)",
					}),
				]);
			},
			add: function (sender, animate) {
				var id = $(sender).closest(".modal[id]").attr("id");
				var opt = ns.data.get(`${id}-data`);
				//var cont = $(sender).closest(".modal[id]").find(".ns-sort-rule").find(".row");

				ns.build.prepend(
					$(sender).closest(".item")[0],
					ns.cont.div(["item col-12", animate ? "ns-fadeslidein" : null].combine(" "), fn.sort.item(opt.useopricon, opt.field, null, null))
				);

				setTimeout(
					function (sender) {
						$(sender).closest(".container").find(".ns-fadeslidein").removeClass("ns-fadeslidein");
					},
					500,
					sender
				);
			},
			change: function (sender, useopricon) {
				var id = $(sender).closest(".modal[id]").attr("id");
				var opt = ns.data.get(`${id}-data`);

				var opr = $(sender).parent().find("select[name='opr']");
				var frm = $(sender).val();
				var item = opt.field.find((obj) => {
					return obj.value === frm;
				});

				//generate opr option base on itemtype
				var opr_opt = fn.sort.opr(opt.useopricon, item ? item.type : null);

				ns.build.replace(
					$(opr).parent(),
					ns.input({
						class: [opt.useopricon ? "font-fa" : null].combine(" "),
						type: "select",
						name: "opr",
						size: useopricon ? "col-4 col-lg-3 px-2" : "col-sm-5 col-md-4 col-lg-3 px-2",
						value: $(opr).val(),
						option: opr_opt,
					})
				);
			},
			remove: function (sender) {
				$(sender).closest(".item").addClass("ns-fadeslideout");
				setTimeout(
					function (sender) {
						$(sender).closest(".item").remove();
					},
					500,
					sender
				);
			},
		},
		get: function (container) {
			console.log(container);
			//collect filter rule
			var q_filter = null;

			var filter_container = $(container).find(".ns-filter-rule");
			var filter_item = $(filter_container).find("select[name='from']");

			if (filter_item && filter_item.length > 0) {
				//get filter item and put in array
				var t_filter = [];
				$.each(filter_item, function (index, selfrom) {
					var selopr = $(selfrom).closest(".item").find("select[name='opr']");
					var oprval = $(selopr).val();
					var inputval = $(selfrom).closest(".item").find("[name='value']");

					if (oprval === "$eqlike" || oprval === "$nelike") {
						if (oprval === "$eqlike") {
							oprval = "$eq";
							inputval = { $regex: $(inputval).val(), $options: "i" };
						} else {
							oprval = "$ne";
							inputval = { $regex: "^((?!" + $(inputval).val() + ").)*$", $options: "i" };
						}
					} else {
						inputval = ns.core.getvalue(inputval);
						if (inputval === null) {
							if (oprval === "$eq") {
								inputval = { $exists: false, $eq: null };
							} else if (oprval === "$ne") {
								inputval = { $exists: true, $ne: null };
							}
						}
					}

					t_filter.push({
						f: $(selfrom).val(),
						o: oprval,
						v: inputval,
					});
				});

				//sort filter item
				t_filter.sort((a, b) => (a.f > b.f ? 1 : b.f > a.f ? -1 : 0));

				//put in u_filter
				var u_filter = [];
				var l_filter = null;

				t_filter.forEach((i) => {
					if (l_filter === null || l_filter != i.f) {
						//mongodb not support field:{opr:{regex:value}}
						if (fn.isPrototypeExists(i.v, "$regex") || fn.isPrototypeExists(i.v, "$exists")) {
							//change to field:{regex}
							u_filter.push([
								{
									[i.f]: i.v,
								},
							]);
						} else {
							//change to field:{opr:value}
							u_filter.push([
								{
									[i.f]: { [i.o]: i.v },
								},
							]);
						}
					} else {
						//mongodb not support field:{opr:{regex:value}}
						if (fn.isPrototypeExists(i.v, "$regex") || fn.isPrototypeExists(i.v, "$exists")) {
							//change to field:{regex}
							u_filter[u_filter.length - 1].push({
								[i.f]: i.v,
							});
						} else {
							//change to field:{opr:value}
							u_filter[u_filter.length - 1].push({
								[i.f]: { [i.o]: i.v },
							});
						}
					}

					l_filter = i.f;
				});

				//combine u_filter
				q_filter = {
					["$and"]: [],
				};

				u_filter.forEach((i) => {
					if (i.length === 1) {
						q_filter["$and"].push(i[0]);
					} else {
						var v_filter = [];
						i.forEach((j) => {
							v_filter.push(j);
						});

						q_filter["$and"].push({
							["$or"]: v_filter,
						});
					}
				});
			}

			//collect sort rule
			var q_sort = null;
			var sort_container = $(container).find(".ns-sort-rule");
			var sort_item = $(sort_container).find("select[name='from']");

			if (sort_item && sort_item.length > 0) {
				q_sort = {};
				$.each(sort_item, function (index, selfrom) {
					var selopr = $(selfrom).closest(".item").find("select[name='opr']");
					q_sort[$(selfrom).val()] = parseInt($(selopr).val(), 10);
				});
			}

			//collect field rule
			var q_field = null;
			var field_container = $(container).find(".ns-field-rule");
			var field_item = $(field_container).find("input[name]");

			if (field_item && field_item.length > 0) {
				q_field = {};
				$.each(field_item, function (index, inputfield) {
					if (!ns.core.getvalue(inputfield)) {
						q_field[$(inputfield).attr("name")] = 0;
					}
				});
			}

			//limit & sort
			var t_limit = ns.core.getvalue($(container).find("input[name='limit']"));
			var t_skip = (ns.core.getvalue($(container).find("input[name='step']")) - 1) * t_limit;

			//return collected data
			return {
				filter: q_filter,
				sort: q_sort,
				field: q_field,
				limit: t_limit,
				skip: t_skip,
			};
		},
	};

	ns.query = function (sender, opt) {
		opt = $.extend(
			{},
			{
				callback: null, //functionname need to call when update
				onshow: null,
				data: {
					// current filter state
					// filter: [{name:{$eq:"a"}}],
					// sort: {name:1},
					// limit: 20,
					// skip: 0,
					filter: null,
					sort: null,
					limit: 10,
					skip: 0,
					field: { __v: 0 },
				},
				limit: {
					min: 1,
					max: 100,
					step: 5,
				},
				skip: {
					min: 1,
					max: 100,
					step: 1,
				},
				field: [
					//required by sort and search
					//if no item type, no sort and no search
					{ value: "_id", label: "ID", type: "text" },
				],
				useopricon: false, // use TEXT in operator select box
			},
			opt
		);

		//generate id for dialog
		var id = ns.core.UUID();

		//keep data in global
		ns.data.set(`${id}-data`, opt);

		//gen filter list
		var filter_list = [];

		//populate opt.data.filter into filter list
		if (opt.data.filter) {
			/* 
				$and:[
					{$or:[]},
					{name:{$eq:value}}
				]
				*/

			// $and:[] is mandatory
			if (opt.data.filter["$and"]) {
				//process each $and item
				opt.data.filter["$and"].forEach((i) => {
					//$and item
					if (i["$or"]) {
						i["$or"].forEach((j) => {
							var f2_name = Object.keys(j)[0];
							var f2_info = j[f2_name];
							var f2_opr = Object.keys(f2_info)[0];
							var f2_value = f2_info[f2_opr];

							filter_list.push(ns.cont.div("item col-12", fn.filter.item(opt.useopricon, opt.field, f2_name, f2_opr, f2_value)));
						});
					} else {
						var f1_name = Object.keys(i)[0];
						var f1_info = i[f1_name];
						var f1_opr = Object.keys(f1_info)[0];
						var f1_value = f1_info[f1_opr];

						filter_list.push(ns.cont.div("item col-12", fn.filter.item(opt.useopricon, opt.field, f1_name, f1_opr, f1_value)));
					}
				});
			}
		}

		//add filter button
		filter_list.push(
			ns.cont.div(
				"item col-12",
				ns.button({
					icon: "plus",
					color: "primary",
					class: "col-12",
					label: "Add New Filter Rule",
					onclick: function (sender) {
						fn.filter.add(sender, true);
					}, //"fn.filter.add(this," + (opt.useopricon ? "true" : "false") + ")",
				})
			)
		);

		//gen sort list
		var sort_list = [];

		//populate opt.data.sort into sort list
		if (opt.data.sort) {
			Object.keys(opt.data.sort).forEach((attrKey) => {
				if (opt.data.sort[attrKey]) {
					sort_list.push(ns.cont.div("item col-12", fn.sort.item(opt.useopricon, opt.field, attrKey, opt.data.sort[attrKey])));
				}
			});
		}

		//add sort button
		sort_list.push(
			ns.cont.div(
				"item col-12",
				ns.button({
					icon: "plus",
					color: "primary",
					class: "col-12",
					label: "Add New Sort Rule",
					onclick: function (sender) {
						fn.sort.add(sender, true);
					}, //"fn.sort.add(this," + (opt.useopricon ? "true" : "false") + ")",
				})
			)
		);

		//gen field list
		var field_list = [];

		//__v
		field_list.push(
			ns.input({
				type: "checkbox",
				label: "Version",
				name: "__v",
				size: "col-6",
				checked: opt.data && fn.isPrototypeExists(opt.data.field, "__v") && opt.data.field["__v"] === 0 ? false : true,
			})
		);

		//other field
		$.each(opt.field, function (index, item) {
			field_list.push(
				ns.input({
					type: "checkbox",
					label: item.label,
					name: item.value,
					size: "col-6",
					checked: opt.data && fn.isPrototypeExists(opt.data.field, item.value) && opt.data.field[item.value] === 0 ? false : true,
				})
			);
		});

		ns.dlg
			.box({
				title: "Query",
				id: id,
				hastab: true,
				onshow: function (container) {
					if (typeof opt.onshow === "function") {
						opt.onshow(container);
					}
				},
				elems: ns.nav({
					border: false,
					rounded: false,
					align: "center",
					style: "pill",
					elems: [
						{
							label: "Filter",
							icon: "filter",
							elems: [ns.cont.div("container ns-filter-rule p-0", ns.cont.div("row g-2", filter_list))],
						},
						{
							label: "Sort",
							icon: "sort",
							elems: [ns.cont.div("container ns-sort-rule p-0", ns.cont.div("row g-2", sort_list))],
						},
						{
							label: "Fields",
							icon: "tasks",
							elems: [ns.cont.div("container ns-field-rule p-0", ns.cont.div("row g-2", field_list))],
						},
						{
							label: "Page",
							icon: "list-ol",
							elems: [
								ns.cont.div(
									"container ns-page-rule p-0",
									ns.cont.div("row g-2", [
										ns.input({
											type: "number",
											name: "limit",
											min: opt.limit.min,
											max: opt.limit.max,
											step: opt.limit.step,
											value: opt.data.limit,
											numctl: true,
											size: "col-6",
											label: "Record per Page",
										}),
										ns.input({
											type: "number",
											name: "step",
											min: opt.skip.min,
											max: opt.skip.max,
											step: opt.skip.step,
											value: opt.data.skip / opt.data.limit + 1,
											numctl: true,
											size: "col-6",
											label: "Current Page",
										}),
									])
								),
							],
						},
					],
				}),
				button: "okaycancel",
			})
			.then((data) => {
				opt.callback(sender, fn.get(data.dlg));
			})
			.catch((err) => {});
	};
})(ns);
