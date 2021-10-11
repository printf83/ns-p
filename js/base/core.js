//core function that used on other js file
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {
	ns.core = {
		errorHandler: function (err) {
			if (err) {
				console.error(err);
			}
		},
		copyToClipboard: function (str, msg) {
			navigator.clipboard.writeText(str);
			ns.toast("/", msg ? msg : "Copied to clipboard");
		},
		theme: function (theme) {
			var elem = document.getElementById("nstheme");
			if (theme) {
				elem.href = `https://cdn.jsdelivr.net/npm/bootswatch@5.1.1/dist/${theme}/bootstrap.min.css`;
				elem.removeAttribute("disabled");
			} else {
				elem.setAttribute("disabled", "disabled");
			}
		},
		// themeEditor: function () {
		// 	ns.dlg
		// 		.inputbox(
		// 			ns.input({
		// 				type: "select",
		// 				name: "value",
		// 				tooltip: {
		// 					type: "popover",
		// 					msg: "Hello World",
		// 				},
		// 				option: [
		// 					{ value: "", label: "Please choose one" },
		// 					{ value: "cerulean", label: "cerulean (L|G)" },
		// 					{ value: "cosmo", label: "cosmo (L|S)" },
		// 					{ value: "cyborg", label: "cyborg (D|S)" },
		// 					{ value: "darkly", label: "❤️ darkly (D|S)" },
		// 					{ value: "flatly", label: "flatly (L|S)" },
		// 					{ value: "journal", label: "journal (L|S)" },
		// 					{ value: "litera", label: "❤️ litera (L|S)" },
		// 					{ value: "lumen", label: "❤️❤️ lumen (L|S)" },
		// 					{ value: "lux", label: "lux (L|S)" },
		// 					{ value: "materia", label: "materia (L|G)" },
		// 					{ value: "minty", label: "minty (L|S)" },
		// 					{ value: "morph", label: "❤️ morph (L|G)" },
		// 					{ value: "pulse", label: "pulse (L|S)" },
		// 					{ value: "quartz", label: "❤️❤️❤️ quartz (D|G)" },
		// 					{ value: "sandstone", label: "sandstone (L|S)" },
		// 					{ value: "simplex", label: "simplex (L|G)" },
		// 					{ value: "sketchy", label: "❤️ sketchy (L|S)" },
		// 					{ value: "slate", label: "slate (D|G)" },
		// 					{ value: "solar", label: "solar (D|S)" },
		// 					{ value: "spacelab", label: "spacelab (L|G)" },
		// 					{ value: "superhero", label: "superhero (D|S)" },
		// 					{ value: "united", label: "united (L|S)" },
		// 					{ value: "vapor", label: "vapor (D|G)" },
		// 					{ value: "yeti", label: "❤️ yeti (L|S)" },
		// 					{ value: "zephyr", label: "❤️ zephyr (L|S)" },
		// 				],
		// 			}),
		// 			"Choose Theme",
		// 			"okaycancel"
		// 		)
		// 		.then((theme) => {
		// 			if (theme) {
		// 				ns.core.theme(theme.value);
		// 			} else {
		// 				return Promise.reject();
		// 			}
		// 		}, ns.core.errorHandler);
		// },
		multipleClassSupport: function (val, format) {
			//example
			//ns.core.multipleClassSupport(["lg","sm","md"],"text-$1")
			return val
				? Array.isArray(val)
					? val
							.map(function (i) {
								return format.replace("$1", i);
							})
							.join(" ")
					: format.replace("$1", val)
				: null;
		},
		isFunction: function (fn) {
			//return fn && {}.toString.call(fn) === "[object Function]";
			return fn instanceof Function;
		},
		createEnum: function (values) {
			const enumObject = {};

			if (Array.isArray(values)) {
				for (const val of values) {
					if (typeof val === "string") {
						enumObject[ns.core.camelCase(val)] = val;
					} else if (typeof val === "object") {
						if (val.hasPropety("key")) {
							if (val.hasPropety("value")) {
								enumObject[ns.core.camelCase(val.key)] = val.value;
							} else {
								enumObject[ns.core.camelCase(val.key)] = val;
							}
						}
					} else {
						enumObject[`_${ns.core.camelCase(val)}`] = val;
					}
				}
			} else if (typeof values === "object") {
				Object.keys(values).forEach((key) => {
					enumObject[ns.core.camelCase(key)] = value[key];
				});
			}

			return Object.freeze(enumObject);
		},
		camelCase: function (str) {
			return str.toLowerCase().replace(/-(.)/g, function (match, group1) {
				return group1.toUpperCase();
			});
		},
		isHTML: function (str) {
			if (typeof str === "string") {
				return /<\/?[a-z][\s\S]*>/i.test(str);
			}
		},
		/**
		 *
		 * example 1 : g = groupBy(pets, pet => pet.type); g.get("Dog");
		 * example 2 : g = groupBy(numbers, x => (x % 2 === 1 ? odd : even)); g.get(odd);
		 */
		groupBy: function (list, keyGetter) {
			const map = new Map();
			list.forEach((item) => {
				const key = keyGetter(item);
				const collection = map.get(key);
				if (!collection) {
					map.set(key, [item]);
				} else {
					collection.push(item);
				}
			});
			return map;
		},
		dataChangeOnly: function (oldData, newData) {
			var tmpData = {};

			if (newData) {
				Object.keys(newData).forEach((attrKey) => {
					if (newData[attrKey] != oldData[attrKey]) {
						tmpData[attrKey] = newData[attrKey];
					}
				});
			}

			return tmpData;
		},
		UUID: function () {
			// UUID format "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
			// nsUUID format "el-xxxxxxxxxxxx" ;)
			return "el-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
				var r = (Math.random() * 16) | 0,
					v = c === "x" ? r : (r & 0x3) | 0x8;
				return v.toString(16);
			});
		},
		parseBool: function (d) {
			if (d) {
				switch (d.toLowerCase().trim()) {
					case "true":
					case "yes":
					case "1":
						return true;
					case "false":
					case "no":
					case "0":
					case null:
						return false;
					default:
						return Boolean(d);
				}
			} else {
				return false;
			}
		},
		rndBetween: function (min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		},
		pad: function (num, width, z) {
			z = z || "0";
			num = num + "";
			return num.length >= width ? num : new Array(width - num.length + 1).join(z) + num;
		},
		entityMap: {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#39;",
			"/": "&#x2F;",
			"`": "&#x60;",
			"=": "&#x3D;",
		},
		escapeHTML: function (string) {
			return String(string).replace(/[&<>"'`=\/]/g, function (s) {
				return ns.core.entityMap[s];
			});
		},
		highlight: function (sender, timeout) {
			if (sender) {
				$(sender).addClass("ns-highlight");
				setTimeout(
					function (sender) {
						$(sender).removeClass("ns-highlight");
					},
					timeout ? timeout : 12000,
					sender
				);

				ns.core.focus(sender);
			}
		},
		focus: function (sender) {
			var navbarheight = $("#navbar").outerHeight();
			navbarheight = navbarheight || 0;
			console.log("Navbar height : " + navbarheight);

			$([document.documentElement, document.body]).animate(
				{
					scrollTop: $(sender).offset().top + navbarheight - 50,
				},
				300
			);
		},
		validate: function (container) {
			var listofcontrol = $(container).find("[name]");
			if (listofcontrol) {
				$.each(listofcontrol, function (index, ctl) {
					if ($(ctl).attr("required")) {
						if (!ns.core.getvalue(ctl)) {
							$(ctl).addClass("is-invalid").removeClass("is-valid");
						} else {
							$(ctl).removeClass("is-invalid").addClass("is-valid");
						}
					}
				});
			}

			var invalidctl = $(container).find(".is-invalid");
			if (invalidctl && invalidctl.length > 0) {
				return false;
			} else {
				return true;
			}
		},
		getvalue: function (elem) {
			//get value from elemen with name attribute and return object {name1:value1,name2:value2}
			switch ($(elem).attr("type")) {
				case "checkbox":
					return $(elem).is(":checked");
					break;
				case "range":
				case "number":
					if ($(elem).attr("step") === "any") {
						return parseFloat($(elem).val());
					} else {
						return parseInt($(elem).val(), 10);
					}
					break;
				case "date":
					let vdate = $(elem).val();
					return vdate ? moment(vdate, "YYYY-MM-DD").format("YYYY-MM-DD") : null;
					break;
				case "datetime-local":
					let vdatetime = $(elem).val();
					return vdatetime ? moment(vdatetime, "YYYY-MM-DDTHH:mm").format("YYYY-MM-DDTHH:mm") : null;
					break;
				case "time":
					let vtime = $(elem).val();
					return vtime ? moment(vtime, "HH:mm").format("HH:mm") : null;
					break;
				case "month":
					let vmonth = $(elem).val();
					return vmonth ? moment(vmonth, "YYYY-MM").format("YYYY-MM") : null;
					break;
				case "week":
					let vweek = $(elem).val();
					return vweek ? moment(vweek, "YYYY-Www").format("YYYY-Www") : null;
					break;
				default:
					let vval = $(elem).val();
					return vval ? vval : null;
			}
		},
	};
})(ns);
