export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "开心果",
	description: "要开心，不开心怎么工作——固德威前端出品",
	navItems: [
		{
			label: "主页",
			href: "/",
		},
    {
      label: "发布版本",
      href: "/releases",
    },
    // {
    //   label: "Pricing",
    //   href: "/pricing",
    // },
    // {
    //   label: "Blog",
    //   href: "/blog",
    // },
    // {
    //   label: "About",
    //   href: "/about",
    // }
	// ],
	// navMenuItems: [
	// 	{
	// 		label: "Profile",
	// 		href: "/profile",
	// 	},
	// 	{
	// 		label: "Dashboard",
	// 		href: "/dashboard",
	// 	},
	// 	{
	// 		label: "Projects",
	// 		href: "/projects",
	// 	},
	// 	{
	// 		label: "Team",
	// 		href: "/team",
	// 	},
	// 	{
	// 		label: "Calendar",
	// 		href: "/calendar",
	// 	},
	// 	{
	// 		label: "Settings",
	// 		href: "/settings",
	// 	},
	// 	{
	// 		label: "Help & Feedback",
	// 		href: "/help-feedback",
	// 	},
	// 	{
	// 		label: "Logout",
	// 		href: "/logout",
	// 	},
	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev"
	},
};
