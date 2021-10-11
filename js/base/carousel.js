//author: printf83@gmail.com (c) 2020 - 2021
(function (ns) {
	ns.carousel = function (opt) {
		if (typeof opt === "string") {
			return ns.carousel([opt]);
		} else if (Array.isArray(opt)) {
			return ns.carousel({
				item: opt,
			});
		} else {
			opt = $.extend(
				{},
				{
					id: null,
					class: null,
					style: null,
					control: false,
					touch: true,
					slide: true,
					fade: false,
					indicators: false,
					dark: false,
					item: null,
				},
				opt
			);

			if (opt.item && opt.item.length > 0) {
				opt.id = opt.id || ns.core.UUID();

				return {
					tag: "div",
					id: opt.id,
					class: ["carousel", opt.slide ? "slide" : null, opt.fade ? "carousel-fade" : null, opt.dark ? "carousel-dark" : null, opt.class],
					style: opt.style,
					attr: {
						"data-bs-ride": "carousel",
						"data-bs-touch": !opt.touch ? "false" : null,
						"data-bs-interval": !opt.touch ? "false" : null,
					},
					elems: [
						opt.indicators
							? {
									tag: "div",
									class: "carousel-indicators",
									elems: opt.item.map(function (i, ix) {
										if (typeof i === "string") {
											i = {
												src: i,
											};
										}

										i = $.extend(
											{},
											{
												class: null,
												src: null,
												alt: null,
												caption: null,
												text: null,
												interval: 0,
											},
											i
										);

										return {
											tag: "button",
											class: [ix === 0 ? "active" : null].removeEmpty(),
											attr: {
												type: "button",
												"aria-current": ix === 0 ? "true" : null,
												"aria-label": i.caption ? i.caption : i.alt ? i.alt : `Slide ${ix + 1}`,
												"data-bs-slide-to": `${ix}`,
												"data-bs-target": `${opt.id}`,
											},
										};
									}),
							  }
							: null,
						{
							tag: "div",
							class: "carousel-inner",
							elems: opt.item.map(function (i, ix) {
								if (typeof i === "string") {
									i = {
										src: i,
									};
								}

								i = $.extend(
									{},
									{
										class: null,
										src: null,
										alt: null,
										caption: null,
										text: null,
										interval: 0,
									},
									i
								);

								return {
									tag: "div",
									class: ["carousel-item", ix === 0 ? "active" : null],
									attr: { "data-bs-interval": i.interval && opt.touch ? i.interval : null },
									elems: [
										{
											tag: "img",
											class: ["d-block w-100", i.class],
											attr: { alt: i.alt ? i.alt : i.caption ? i.caption : null, src: i.src },
										},
										i.caption || i.text
											? {
													tag: "div",
													class: "carousel-caption d-none d-md-block",
													elems: [
														i.caption ? { tag: "h5", elems: i.caption } : null,
														i.text ? { tag: "p", elems: i.text } : null,
													].removeEmpty(),
											  }
											: null,
									].removeEmpty(),
								};
							}),
						},

						opt.control
							? {
									tag: "button",
									class: "carousel-control-prev",
									attr: { type: "button", "data-bs-target": `#${opt.id}`, "data-bs-slide": "prev" },
									elems: [
										{ tag: "span", class: "carousel-control-prev-icon", attr: { "aria-hidden": "true" } },
										{ tag: "span", class: "visually-hidden", elems: "Previous" },
									],
							  }
							: null,
						opt.control
							? {
									tag: "button",
									class: "carousel-control-next",
									attr: { type: "button", "data-bs-target": `#${opt.id}`, "data-bs-slide": "next" },
									elems: [
										{ tag: "span", class: "carousel-control-next-icon", attr: { "aria-hidden": "true" } },
										{ tag: "span", class: "visually-hidden", elems: "Next" },
									],
							  }
							: null,
					],
				};
			}
		}
	};
})(ns);
