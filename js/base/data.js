//global data manager
//author: printf83@gmail.com (c) 2020 - 2021
var ns_global_data = {};

(function (ns) {
	ns.data = {
		set: function (key, value) {
			ns_global_data[key] = value;
		},
		get: function (key) {
			return ns_global_data[key];
		},
		clear: function (key) {
			if (key) {
				if (fn_data.isexist(key)) {
					delete ns_global_data[key];
				}
			} else {
				ns_global_data = {};
			}
		},
		isexist: function (key) {
			if (ns_global_data[key]) {
				return true;
			}

			return false;
		},
	};
})(ns);
