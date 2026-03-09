export const socials = [
    {
        name: "X (Twitter)",
        url: "https://x.com/Anshmishra1414",
        handle: "Ansh",
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/ansh-mishra-dev/",
        handle: "Ansh",
    },
    {
        name: "GitHub",
        url: "https://github.com/TechByAnshuu",
        handle: "Ansh",
    },
    {
        name: "Peerlist",
        url: "https://peerlist.io/anshmishra1414",
        handle: "Ansh",
    },
    {
        name: "Instagram",
        url: "https://www.instagram.com/an.sh4639",
        handle: "Ansh",
    },
    // {
    //     name: "YouTube",
    //     url: "https://www.youtube.com/",
    //     handle: "Ansh",
    // },
    {
        name: "Email",
        url: "https://mail.google.com/mail/u/0/?fs=1&to=anshmishra14.14@gmail.com&tf=cm",
        handle: "Contact me",
    },
];

export const skills = [
    // Languages
    "C",
    "C++",
    "Java",
    "Python",
    "JavaScript",
    "Shell Script",

    // Frameworks & Web
    "HTML",
    "CSS",
    "Tailwind CSS",
    "React.js",
    "Node.js",
    "Express.js",

    // Cloud & DevOps
    "AWS",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Linux",
    "VMware",

    // Tools & Databases
    "MySQL",
    "MongoDB",
    "Git",
    "GitHub",
];

export const projects = [
    {
        name: "CivicSphere",
        tech: "Node.js • Express.js • Docker • Apache • Shell Script • Linux",
        desc: "Dockerized Node.js web app with load-balanced Apache routing, automated Shell deployment scripts, and 99.2% uptime.",
        link: "https://github.com/TechByAnshuu/Dockerized-nodejs-cloud-app",
        liveLink: "https://dockerized-nodejs-cloud-app.onrender.com/",
    },
    {
        name: "INKDROP",
        tech: "React.js • Node.js • Express.js • MongoDB • Tailwind CSS • REST APIs",
        desc: "Digital library platform to browse, read, and download e-books with secure auth and cloud-based PDF delivery.",
        link: "https://github.com/TechByAnshuu/CodeCrafters",
        liveLink: "https://inkdrop-v2-0.onrender.com/",
    },
    {
        name: "Eventick",
        tech: "React.js • JavaScript • Tailwind CSS • Firebase Auth • MongoDB Atlas • Vite",
        desc: "Event ticket booking platform with real-time seat selection, OTP login, and multi-step booking flow built for 200+ concurrent users.",
        link: "https://github.com/TechByAnshuu/Coding-Inventory",
        liveLink: "https://eventtickeventsbookingplatform.vercel.app/",
    },
];

export const repos = [
    {
        name: "Rocket.Chat",
        description:
            "Contributed full-stack validation improvements and UX enhancements across integrations and message navigation.",
        prs: [
            {
                title: "feat(search): enable click-to-jump on search result messages",
                url: "https://github.com/RocketChat/Rocket.Chat/pull/39081",
            },
            {
                title: "fix: enforce validation for Incoming WebHook alias field",
                url: "https://github.com/RocketChat/Rocket.Chat/pull/38909",
            },
        ],
    },
];



// export const repos = [
//   {
//     name: "Write here",
//     prs: [
//       {
//         title:
//           "[Feat] ",
//         url: "https://github.com/",
//       },
//     ],
//   },
//   {
//     name: "write here",
//     prs: [
//       {
//         title: "fix: ",
//         url: "https://github.com/",
//       },
//       {
//         title: "feat: ",
//         url: "https://github.com/",
//       },
//       {
//         title: "fix:",
//         url: "https://github.com/",
//       },
//       {
//         title: "feat: ",
//         url: "https://github.com/",
//       },
//     ],
//   },
//   {
//     name: "write here",
//     prs: [
//       {
//         title: "fix:",
//         url: "https://github.com/",
//       },
//     ],
//   },
// ];


export const intro = {
    name: "Ansh Mishra",
    title: "Cloud & DevOps Engineer",
    description: "Hi, I'm Ansh Mishra, a passionate Cloud & DevOps Engineer. I create beautiful, responsive applications with clean code and elegant user experiences.",
};

export const codingStats = {
    github: {
        username: "TechByAnshuu",
        commits: "500+",
        repos: "20+",
        streak: "Active",
        stars: "50+",
    },
    platforms: [
        {
            id: "leetcode",
            name: "LeetCode",
            color: "#FFA116",
            glow: "rgba(255,161,22,0.45)",
            stats: [
                { label: "Problems Solved", value: 150, max: 500, suffix: "+" },
                { label: "Contest Rating", value: 1480, max: 3000, suffix: "" },
                { label: "Acceptance Rate", value: 62, max: 100, suffix: "%" },
            ],
            badge: "Knight",
            link: "https://leetcode.com/",
        },
        {
            id: "hackerrank",
            name: "HackerRank",
            color: "#00EA64",
            glow: "rgba(0,234,100,0.40)",
            stats: [
                { label: "Problem Solving", value: 5, max: 5, suffix: "★" },
                { label: "Java", value: 3, max: 5, suffix: "★" },
                { label: "SQL", value: 2, max: 5, suffix: "★" },
            ],
            badge: "Gold",
            link: "https://www.hackerrank.com/",
        },
        {
            id: "codechef",
            name: "CodeChef",
            color: "#5B4638",
            glow: "rgba(91,70,56,0.55)",
            stats: [
                { label: "Rating", value: 1600, max: 3000, suffix: "" },
                { label: "Stars", value: 3, max: 5, suffix: "★" },
                { label: "Contests", value: 20, max: 100, suffix: "+" },
            ],
            badge: "3★",
            link: "https://www.codechef.com/",
        },
    ],
};

export const achievements = [
    {
        id: "aws",
        title: "AWS Cloud Practitioner",
        issuer: "Amazon Web Services",
        desc: "Validated cloud computing fundamentals, AWS core services, security, architecture, and pricing models.",
        color: "#FF9900",
        glow: "rgba(255,153,0,0.40)",
        type: "certification",
        year: "2025",
        link: "",
    },
    {
        id: "docker",
        title: "Docker & Kubernetes",
        issuer: "Self-directed / Project Work",
        desc: "Containerized full-stack apps with Docker Compose and orchestrated with Kubernetes in production environments.",
        color: "#2496ED",
        glow: "rgba(36,150,237,0.40)",
        type: "achievement",
        year: "2025",
        link: "",
    },
    {
        id: "hackathon",
        title: "Hackathon Finalist",
        issuer: "College Tech Fest",
        desc: "Built a full-stack project under 24 hours and reached the finals among 200+ competing teams.",
        color: "#A78BFA",
        glow: "rgba(167,139,250,0.40)",
        type: "achievement",
        year: "2024",
        link: "",
    },
    {
        id: "opensource",
        title: "Open Source Contributor",
        issuer: "Rocket.Chat",
        desc: "Merged PRs improving search navigation and webhook validation in one of the largest open-source chat platforms.",
        color: "#34D399",
        glow: "rgba(52,211,153,0.40)",
        type: "achievement",
        year: "2025",
        link: "https://github.com/RocketChat/Rocket.Chat",
    },
    {
        id: "leetcode-milestone",
        title: "LeetCode 150+ Milestone",
        issuer: "LeetCode",
        desc: "Solved 150+ algorithmic problems covering arrays, trees, graphs, DP, and system design patterns.",
        color: "#FFA116",
        glow: "rgba(255,161,22,0.40)",
        type: "achievement",
        year: "2025",
        link: "",
    },
    {
        id: "linux",
        title: "Linux System Administration",
        issuer: "Self-directed / Production",
        desc: "Managed Linux servers, wrote shell scripts for automation, and maintained 99.2% uptime on cloud deployments.",
        color: "#F472B6",
        glow: "rgba(244,114,182,0.40)",
        type: "achievement",
        year: "2024",
        link: "",
    },
];
