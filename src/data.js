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
        desc: "A production-ready Node.js application demonstrating DevOps best practices. Features Docker containerization, Apache load balancing, automated deployment scripts, and monitoring—achieving 99.2% uptime. Built to showcase real-world cloud infrastructure skills.",
        link: "https://github.com/TechByAnshuu/Dockerized-nodejs-cloud-app",
        liveLink: "https://dockerized-nodejs-cloud-app.onrender.com/",
    },
    {
        name: "INKDROP",
        tech: "React.js • Node.js • Express.js • MongoDB • Tailwind CSS • REST APIs",
        desc: "A modern e-book platform built with the MERN stack, featuring secure authentication, cloud-based PDF delivery, and a polished React interface. Designed to handle real user traffic with responsive design and optimized performance.",
        link: "https://github.com/TechByAnshuu/CodeCrafters",
        liveLink: "https://inkdrop-v2-0.onrender.com/",
    },
    {
        name: "Eventick",
        tech: "React.js • JavaScript • Tailwind CSS • Firebase Auth • MongoDB Atlas • Vite",
        desc: "A scalable event booking platform handling 200+ concurrent users with real-time seat selection, OTP authentication, and multi-step checkout flow. Built with performance and user experience as top priorities.",
        link: "https://github.com/TechByAnshuu/Coding-Inventory",
        liveLink: "https://eventtickeventsbookingplatform.vercel.app/",
    },
];

export const repos = [
    {
        name: "Rocket.Chat",
        description:
            "Rocket.Chat is one of the world's largest open-source team communication platforms with 1,000+ contributors and millions of daily users. I contributed full-stack improvements across search navigation, webhook validation, and UX consistency.",
        stars: "42k+",
        language: "TypeScript",
        role: "Open Source Contributor",
        prs: [
            {
                title: "feat(search): enable click-to-jump on search result messages",
                url: "https://github.com/RocketChat/Rocket.Chat/pull/39081",
                type: "feat",
                status: "open",
                description:
                    "Previously, clicking a message in the search results panel had no effect — users couldn't navigate to the actual message in the channel. I implemented click-handler logic on search result items that scrolls the user directly to the target message in the channel timeline, with a highlight pulse animation to mark the message. This required hooking into the message list virtualizer and coordinating state between the search panel and the room view.",
                impact: "Improved UX for all users using Rocket.Chat's message search — a heavily-used daily workflow.",
                tech: ["TypeScript", "React", "Fuselage UI"],
                area: "Search · Frontend · UX",
            },
            {
                title: "fix: enforce validation for Incoming WebHook alias field",
                url: "https://github.com/RocketChat/Rocket.Chat/pull/38909",
                type: "fix",
                status: "open",
                description:
                    "The Incoming Webhook alias field accepted empty strings and overly long values without any server-side or client-side validation, which could silently break webhook display names across rooms. I added input length constraints, whitespace trimming, and a minimum-character validation, along with visible error feedback in the admin UI settings form.",
                impact: "Prevented silent data corruption in webhook configurations — affects every team using custom Incoming Webhooks.",
                tech: ["TypeScript", "Node.js", "Meteor"],
                area: "Integrations · Backend · Validation",
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
    description: "Hi, I'm Ansh Mishra, a Web Developer and Cloud Engineer who builds end-to-end solutions. I create responsive web applications with React and Node.js, then deploy them on scalable cloud infrastructure using Docker, Kubernetes, and AWS. I don't just write code—I ship it, monitor it, and make sure it stays online.",
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
