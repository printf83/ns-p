//loading controller
//author: printf83@gmail.com (c) 2020 - 2021

(function (ns) {
	ns.loading = {
		start: function (elem) {
			return new Promise((res, rej) => {
				if (elem) {
					if ($(elem).hasClass("page-link")) {
						elem = $(elem).parent();
					}

					if (!$(elem).hasClass("loading")) {
						$(elem).addClass("loading");
						$(elem).addClass("disabled");
						$(elem).attr("disabled", "disabled");

						if ($(elem).attr("type") === "button") {
							var ctlicon = $(elem).find(".fas.fa-fw")[0];
							if (ctlicon) {
								$(ctlicon).attr("ns-old-class", $(ctlicon).attr("class"));
								$(ctlicon).attr("class", "fas fa-fw fa-circle-notch fa-spin");
							}
						}

						res();
					}
				} else {
					res();
				}
			});
		},
		stop: function (elem) {
			return new Promise((res, rej) => {
				if (elem) {
					if ($(elem).hasClass("page-link")) {
						elem = $(elem).parent();
					}

					if ($(elem).hasClass("loading")) {
						$(elem).removeClass("loading");
						$(elem).removeClass("disabled");
						$(elem).removeAttr("disabled");

						if ($(elem).attr("type") === "button") {
							var ctlicon = $(elem).find("[ns-old-class]")[0];
							if (ctlicon) {
								$(ctlicon).attr("class", $(ctlicon).attr("ns-old-class"));
								$(ctlicon).removeAttr("ns-old-class");
							}
						}

						res();
					}
				} else {
					res();
				}
			});
		},
	};
})(ns);
