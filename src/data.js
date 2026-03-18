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
    // {
    //     name: "Instagram",
    //     url: "https://www.instagram.com/an.sh4639",
    //     handle: "Ansh",
    // },
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
        thumbnail: "/thumbnails/civicsphere.png",
    },
    {
        name: "INKDROP",
        tech: "React.js • Node.js • Express.js • MongoDB • Tailwind CSS • REST APIs",
        desc: "A modern e-book platform built with the MERN stack, featuring secure authentication, cloud-based PDF delivery, and a polished React interface. Designed to handle real user traffic with responsive design and optimized performance.",
        link: "https://github.com/TechByAnshuu/CodeCrafters",
        liveLink: "https://inkdrop-v2-0.onrender.com/",
        thumbnail: "/thumbnails/inkdrop.png",
    },
    {
        name: "Eventick",
        tech: "React.js • JavaScript • Tailwind CSS • Firebase Auth • MongoDB Atlas • Vite",
        desc: "A scalable event booking platform handling 200+ concurrent users with real-time seat selection, OTP authentication, and multi-step checkout flow. Built with performance and user experience as top priorities.",
        link: "https://github.com/TechByAnshuu/Coding-Inventory",
        liveLink: "https://eventtickeventsbookingplatform.vercel.app/",
        thumbnail: "/thumbnails/eventick.png",
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
    name: "About Me",
    // title: "Cloud & DevOps Engineer",
    description: `I'm a Computer Science undergraduate at Lovely Professional University, Phagwara, driven by a deep curiosity about how the web works—something I never stopped exploring. My learning approach has always been hands-on; I believe true understanding comes from building. What started as curiosity about websites evolved into developing full-stack applications end-to-end. I create clean, responsive frontends using React and Tailwind, connect them to Node.js backends, and deploy complete systems using Docker, Kubernetes, and AWS. \n\nAlong the way, I've built projects I'm proud of, including a Dockerized cloud application with 99.2% uptime, a MERN-based e-book platform, and a booking system capable of handling 200+ concurrent users. I've also earned Oracle Cloud certifications in Foundations and DevOps, completed NPTEL's Cryptography course from IIT Kharagpur, and contributed production-level fixes to Rocket.Chat, a major open-source communication platform on GitHub. \n\nCurrently, I'm strengthening my foundation in Cloud Computing, DevOps practices, and Data Structures & Algorithms. I actively solve problems on LeetCode and HackerRank, driven by genuine interest in problem-solving. \n\nI believe good software isn't complete when it simply compiles its complete when it's deployed, monitored, and solving real problems for real users. I'm continuously learning how to build such systems, one project at a time.`,
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
                { label: "Problems Solved", value: 185, max: 185, suffix: "+" },
                { label: "Contest Rating", value: 1751, max: 850439, suffix: "" },
                { label: "Acceptance Rate", value: 89, max: 100, suffix: "%" },
            ],
            badge: "Knight",
            link: "https://leetcode.com/u/tech-ansh-14/",
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
            badge: "Gold , Silver",
            link: "https://www.hackerrank.com/profile/anshmishra14_14",
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
        id: "aws-cloud",
        title: "AWS Academy Cloud Foundations",
        issuer: "Amazon Web Services",
        desc: "Core AWS cloud concepts, infrastructure, security, and architecture — 20 hours of hands-on training.",
        color: "#FF9900",
        glow: "rgba(255,153,0,0.40)",
        type: "certification",
        year: "2025",
        link: "https://www.credly.com/go/z170Wbag",
        pdf: "/certificates/aws1.pdf",
    },
    {
        id: "oci-cloud",
        title: "OCI Foundations Associate",
        issuer: "Oracle University",
        desc: "Oracle Cloud Infrastructure core concepts, architecture, services, and pricing fundamentals.",
        color: "#F80000",
        glow: "rgba(248,0,0,0.40)",
        type: "certification",
        year: "2025",
        link: "",
        pdf: "/certificates/ocicloud2.pdf",
    },
    {
        id: "oci-devops",
        title: "OCI DevOps Professional",
        issuer: "Oracle University",
        desc: "Advanced OCI DevOps pipelines, CI/CD, container deployments, and cloud automation. Valid until Oct 2027.",
        color: "#F80000",
        glow: "rgba(248,0,0,0.40)",
        type: "certification",
        year: "2025",
        link: "",
        pdf: "/certificates/ocidevops3.pdf",
    },
    {
        id: "crypto-nptel",
        title: "Cryptography & Network Security",
        issuer: "NPTEL — IIT Kharagpur",
        desc: "12-week SWAYAM course covering encryption, protocols, and network defence. Score: 54% (2654 certified).",
        color: "#1a73e8",
        glow: "rgba(26,115,232,0.40)",
        type: "certification",
        year: "2025",
        link: "",
        pdf: "/certificates/crypto4.pdf",
    },
    {
        id: "fcc-webdesign",
        title: "Responsive Web Design",
        issuer: "freeCodeCamp",
        desc: "HTML, CSS, Flexbox, Grid, and accessibility — ~300 hours of project-based web design certification.",
        color: "#0A0A23",
        glow: "rgba(10,10,35,0.55)",
        type: "certification",
        year: "2023",
        link: "https://freecodecamp.org/certification/fccc9c668e5-eab6-4015-aae8-39155d784ca7/responsive-web-design",
        pdf: "/certificates/webdev6.pdf",
    },
    {
        id: "udemy-webdev",
        title: "Complete Web Development Bootcamp",
        issuer: "Udemy — Dr. Angela Yu",
        desc: "Full-stack web development covering HTML, CSS, JS, Node.js, React, and databases — 62 total hours.",
        color: "#A435F0",
        glow: "rgba(164,53,240,0.40)",
        type: "certification",
        year: "2024",
        link: "https://ude.my/UC-ca665e1e-3ee0-487c-b768-5356bf3af428",
        pdf: "/certificates/webdu5.pdf",
    },
];
