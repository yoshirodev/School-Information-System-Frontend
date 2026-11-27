
export const jhsSections = {
    "7": [
        { id: "7-A", name: "Grade 7 - A", adviser: "Unassigned" },
        { id: "7-B", name: "Grade 7 - B", adviser: "Unassigned" },
        { id: "7-C", name: "Grade 7 - C", adviser: "Unassigned" },
    ],

    "8": [
        { id: "8-A", name: "Grade 8 - A", adviser: "Unassigned" },
        { id: "8-B", name: "Grade 8 - B", adviser: "Unassigned" },
        { id: "8-C", name: "Grade 8 - C", adviser: "Unassigned" },
    ],

    "9": [
        { id: "9-A", name: "Grade 9 - A", adviser: "Unassigned" },
        { id: "9-B", name: "Grade 9 - B", adviser: "Unassigned" },
        { id: "9-C", name: "Grade 9 - C", adviser: "Unassigned" },
    ],

    "10": [
        { id: "10-A", name: "Grade 10 - A", adviser: "Unassigned" },
        { id: "10-B", name: "Grade 10 - B", adviser: "Unassigned" },
        { id: "10-C", name: "Grade 10 - C", adviser: "Unassigned" },
    ],
};

export const shsSections = {
    "11": [
        { id: "11-A", name: "Grade 11 - A", adviser: "Unassigned" },
        { id: "11-B", name: "Grade 11 - B", adviser: "Unassigned" },
        { id: "11-C", name: "Grade 11 - C", adviser: "Unassigned" },
    ],

    "12": [
        { id: "12-A", name: "Grade 12 - A", adviser: "Unassigned" },
        { id: "12-B", name: "Grade 12 - B", adviser: "Unassigned" },
        { id: "12-C", name: "Grade 12 - C", adviser: "Unassigned" },
    ],
};


const jhsSubjectNames = [
    "Filipino",
    "English",
    "Mathematics",
    "Science",
    "Araling Panlipunan",
    "MAPEH",
    "Technology and Livelihood Education",
    "GMRC and Values Education",
];

const jhsDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
];

const jhsTimeSlots = [
    "7:30 AM - 8:30 AM",
    "8:30 AM - 9:30 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:30 PM - 1:30 PM",
    "1:30 PM - 2:30 PM",
    "2:30 PM - 3:30 PM",
    "3:30 PM - 4:30 PM",
];

// Initial demo data for the JHS enrollment interface.
// Replace with the school's approved subject program and timetable.
export const getJhsSubjects = (gradeLevel) => {
    if (!["7", "8", "9", "10"].includes(gradeLevel)) {
        return [];
    }

    return jhsSubjectNames.map((subject, index) => ({
        id: `${gradeLevel}-${index + 1}`,
        name: subject,
        teacher: "Unassigned",
        day: jhsDays[index % jhsDays.length],
        time: jhsTimeSlots[Math.floor(index / jhsDays.length)],
    }));
};
