const portals_suffix = {
	home: {
		link: "/home",
		name: "智慧能源WE平台门户",
	},
	seedsPro: {
		link: "/seeds-pro/#/",
		name: "光伏资产管理",
	},
	seeds: {
		link: "/seeds/#/",
		name: "光伏资产管理星空版",
	},
	power: {
		link: "/power/#/",
		name: "综合能源管理",
	},
	star: {
		link: "/star/#/",
		name: "虚拟电厂管理",
	},
	platform: {
		link: "/admin/#/",
		name: "后台管理",
	},
	opp: {
		link: "/opp/#/",
		name: "运营平台",
	},
};

const main_portal = {
	prefix: "https://we.goodwe.com",
	env_name: "线上环境",
};

const poc_portal = {
	prefix: "https://poc.secp.secp-base.192.168.221.97.nip.io",
	env_name: "POC环境（暂不支持）",
};

const preprod_portal = {
	prefix: "https://preprod.secp.secp-base.192.168.221.97.nip.io",
	env_name: "集成环境",
};

const test_portal = {
	prefix: "https://test.secp.secp-base.192.168.221.97.nip.io",
	env_name: "测试环境",
};

const develop_portal = {
	prefix: "https://dev.secp.secp-base.192.168.221.97.nip.io",
	env_name: "开发环境",
};

const portal_list = [
	main_portal,
	poc_portal,
	preprod_portal,
	test_portal,
	develop_portal,
];

export { portals_suffix, portal_list };
