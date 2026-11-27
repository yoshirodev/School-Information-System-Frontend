
export const shsCoreSubjects = [
    "Effective Communication",
    "Mabisang Komunikasyon",
    "General Mathematics",
    "General Science",
    "Life and Career Skills",
    "Pag-aaral ng Kasaysayan at Lipunang Pilipino",
];

export const academicClusters = [
    {
        id: "ash",
        name: "Arts, Social Sciences, and Humanities",
        electives: [
            "Citizenship and Civic Engagement",
            "Contemporary Literature 1",
            "Contemporary Literature 2",
            "Filipino 1 – Wika at Komunikasyon sa Akademikong Filipino",
            "Filipino 2 – Filipino para sa Larang Teknikal-Propesyonal",
            "Filipino 2 – Filipino sa Isports",
            "Filipino 2 – Filipino sa Sining at Disenyo",
            "Filipino Identity Through the Arts",
            "Introduction to Philosophy",
            "Leadership and Management in the Arts",
            "Malikhaing Pagsulat",
            "Philippine Governance / Philippine Politics and Governance",
            "Social Sciences: Theory and Practice",
        ],
    },
    {
        id: "stem",
        name: "Science, Technology, Engineering, and Mathematics",
        electives: [
            "Biology 1",
            "Biology 2",
            "Chemistry 1",
            "Chemistry 2",
            "Earth and Space Science 1",
            "Earth and Space Science 2",
            "Finite Mathematics 1",
            "Finite Mathematics 2",
            "Physics 1",
            "Physics 2",
            "Advanced Mathematics",
            "Basic Calculus",
            "Biology 3",
            "Biology 4",
            "Chemistry 3",
            "Chemistry 4",
            "Conceptual Biology and Earth and Space",
            "Conceptual Physics and Chemistry in Daily Life",
            "Earth and Space Science 3",
            "Earth and Space Science 4",
            "Empowerment Technologies",
            "Physics 3",
            "Physics 4",
            "Pre-Calculus",
        ],
    },
    {
        id: "sports-health",
        name: "Sports, Health, and Wellness",
        electives: [
            "First Aid",
            "Fundamentals of Basic Life Support",
            "Physical Education 1 – Fitness and Recreation",
            "Physical Education 2 – Sports and Dance",
        ],
    },
    {
        id: "field-experience",
        name: "Field Experience",
        electives: [
            "Research 1",
            "Research 2",
            "Arts Apprenticeship – Dance",
            "Arts Apprenticeship – Literary Arts",
            "Arts Apprenticeship – Music",
            "Arts Apprenticeship – Traditional Cultural Expressions",
        ],
    },
];

export const techProClusters = [
    {
        id: "agri-fishery",
        name: "Agri-Fishery Business and Food Innovation",
        electives: [
            "Agricultural Crops Production",
            "Agro-entrepreneurship",
            "Food Processing",
        ],
    },
    {
        id: "ict",
        name: "ICT Support and Computer Programming Technologies",
        electives: [
            "Computer Systems Servicing",
        ],
    },
];

export const shsEnrollmentData = {
    curriculum: "Strengthened Senior High School Curriculum",
    schoolYear: "2026-2027",
    gradeLevels: ["11", "12"],
    coreSubjects: shsCoreSubjects,
    tracks: {
        academic: {
            id: "academic",
            name: "Academic Track",
            clusters: academicClusters,
        },
        techPro: {
            id: "techPro",
            name: "Technical-Professional Track",
            clusters: techProClusters,
        },
    },
};
