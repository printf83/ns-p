//simple ajax
//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	const options = {
		name: null,
		sender: null,
		data: null,
		dataType: null,
		cache: true,
		contentType: "application/json",
	};

	const optionsmultipart = {
		url: "",
		obj: null,
		sender: null,
		progress: null,
	};

	var fn = {
		ajax: function (opt) {
			opt = $.extend({}, options, opt);

			return new Promise((res, rej) => {
				$.ajax(`./api/${opt.name}`, {
					async: true,
					cache: opt.cache,
					type: opt.type,
					dataType: opt.data ? opt.dataType : null,
					contentType: opt.data ? opt.contentType : null,
					data: opt.data ? JSON.stringify(opt.data) : null,
					success: (data) => {
						res(data);
					},
					error: (err) => {
						rej(err.responseText ? err.responseText : err.statusText ? err.statusText : "Error");
					},
				});
			});
		},
		ajaxMultipart(opt) {
			opt = $.extend({}, optionsmultipart, opt);

			return new Promise((res, rej) => {
				var data = new FormData();

				var index = 0;
				for (var x = 0; x < opt.obj.length; x++) {
					for (var y = 0; y < $(opt.obj[x]).length; y++) {
						for (var z = 0; z < $(opt.obj[x])[y].files.length; z++) {
							data.append("file", $(opt.obj[x])[y].files[z]);
							index = index + 1;
						}
					}
				}

				$.ajax({
					xhr: () => {
						var xhr = new window.XMLHttpRequest();

						//upload
						xhr.upload.addEventListener(
							"progress",
							function (evt) {
								if (evt.lengthComputable) {
									if (typeof opt.progress === "function") {
										var percentComplete = parseInt((evt.loaded / evt.total) * 100, 10);
										opt.progress(percentComplete);
									}
								}
							},
							false
						);

						return xhr;
					},
					url: "./api/file",
					data: data,
					async: opt.async,
					cache: opt.cache,
					contentType: false,
					processData: false,
					type: "POST",
					success: (data) => {
						res(data);
					},
					error: (err) => {
						rej(err.responseText ? err.responseText : err.statusText ? err.statusText : "Error");
					},
				});
			});
		},
		ajaxDownload: function (opt) {
			return new Promise((res, rej) => {
				try {
					window.location = `./api/${opt.name}?q=${JSON.stringify(opt.data)}`;
					res(true);
				} catch (ex) {
					rej(ex);
				}
			});
		},
	};

	ns.api = {
		get: (opt) => {
			opt = $.extend({}, { type: "GET" }, opt);
			return fn.ajax(opt);
		},
		post: (opt) => {
			opt = $.extend({}, { type: "POST" }, opt);
			return fn.ajax(opt);
		},
		put: (opt) => {
			opt = $.extend({}, { type: "PUT" }, opt);
			return fn.ajax(opt);
		},
		delete: (opt) => {
			opt = $.extend({}, { type: "DELETE" }, opt);
			return fn.ajax(opt);
		},
		upload: (opt) => {
			return fn.ajaxMultipart(opt);
		},
		download: (opt) => {
			opt = $.extend({}, { type: "GET" }, opt);
			return fn.ajaxDownload(opt);
		},
		option: (opt) => {
			opt = $.extend(
				{},
				{
					db: null,
					sender: null,
					emptylabel: null,
					fieldkey: "_id",
					fieldname: "name",
				},
				opt
			);

			return new Promise((res, rej) => {
				if (opt.db) {
					ns.api
						.post({
							sender: opt.sender,
							name: `list/${opt.db}`,
							data: { field: { [opt.fieldkey]: 1, [opt.fieldname]: 1 }, sort: { [opt.fieldname]: 1 } },
						})
						.then((result) => {
							var tmp = result.data
								? result.data.map((i) => {
										return {
											value: i[opt.fieldkey],
											label: i[opt.fieldname],
										};
								  })
								: [];

							if (opt.emptylabel !== null) {
								tmp.unshift({ value: "", label: opt.emptylabel });
							}

							res(tmp);
						})
						.catch((err) => {
							rej(err);
						});
				} else {
					rej("Database name required");
				}
			});
		},
	};
})(ns);
