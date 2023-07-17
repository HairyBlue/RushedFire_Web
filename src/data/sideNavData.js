const sideNavData = [
    {
        name: "Dashboard",
        path: '/dashboard',
        icon: 'material-symbols:dashboard'
    },
    {
        name: "Alarm",
        path: '/dashboard/alarm',
        icon: 'material-symbols:detector-alarm',
        subpath: [
            {
                name: "Overview",
                path: '/dashboard/alarm',
                icon: 'material-symbols:overview-key'
            },
            {
                name: "Manage",
                path: '/dashboard/alarm/manage',
                icon: 'material-symbols:folder-managed'
            }
        ]
    },
    {
        name: "Reports",
        path: '/dashboard/reports',
        icon: 'material-symbols:report-rounded',
        subpath: [
            {
                name: "Overview",
                path: '/dashboard/reports',
                icon: 'material-symbols:overview-key'
            },
            {
                name: "Manage",
                path: '/dashboard/reports/manage',
                icon: 'material-symbols:folder-managed'
            }
        ]
    },
    {
        name: "Device",
        path: '/dashboard/device',
        icon: 'material-symbols:device-hub-rounded',
        subpath: [
            {
                name: "Overview",
                path: '/dashboard/device',
                icon: 'material-symbols:overview-key'
            },
            {
                name: "Manage",
                path: '/dashboard/device/manage',
                icon: 'material-symbols:folder-managed'
            }
        ]
    },
    {
        name: "Team",
        path: '/dashboard/team',
        icon: 'material-symbols:group',
        subpath: [
            {
                name: "Overview",
                path: '/dashboard/team',
                icon: 'material-symbols:overview-key'
            },
            {
                name: "Manage",
                path: '/dashboard/team/manage',
                icon: 'material-symbols:folder-managed'
            }
        ]
    },
    {
        name: "User",
        path: '/dashboard/user',
        icon: 'material-symbols:supervised-user-circle-outline',
        subpath: [
            {
                name: "Overview",
                path: '/dashboard/user',
                icon: 'material-symbols:overview-key'
            },
            {
                name: "Manage",
                path: '/dashboard/user/manage',
                icon: 'material-symbols:folder-managed'
            }
        ]
    }
]

export default sideNavData;