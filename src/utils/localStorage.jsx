const employees = [
  {
    id: "EMP001",
    name: "Rajveer Mahida",
    email: "demo@employee.com",
    password: "spidy123",
    department: "Frontend Development",
    tasks: [
      {
        id: "TSK001",
        name: "Implement User Dashboard",
        description: "Create responsive dashboard with user statistics and activity graphs",
        category: "Development",
        taskStatus: "In Progress",
        isNew: false,
        isActive: true,
        priority: "High",
        deadline: "2024-11-15",
        assignedDate: "2024-10-25",
      },
      {
        id: "TSK002",
        name: "Bug Fix: Mobile Navigation",
        description: "Fix navigation menu collapse issues on mobile devices",
        category: "Bug Fix",
        taskStatus: "Pending",
        isNew: true,
        isActive: true,
        priority: "Medium",
        deadline: "2024-11-10",
        assignedDate: "2024-10-30",
      },
    ],
  },
  {
    id: "EMP002",
    name: "Jayesh Kumar",
    email: "jayesh.kumar@company.com",
    password: "spidy123",
    department: "Backend Development",
    tasks: [
      {
        id: "TSK003",
        name: "API Optimization",
        description: "Optimize database queries and API response time",
        category: "Performance",
        taskStatus: "Completed",
        isNew: false,
        isActive: false,
        priority: "High",
        deadline: "2024-11-05",
        assignedDate: "2024-10-20",
      },
      {
        id: "TSK004",
        name: "Authentication System Update",
        description: "Implement OAuth 2.0 and update user authentication flow",
        category: "Security",
        taskStatus: "In Progress",
        isNew: false,
        isActive: true,
        priority: "High",
        deadline: "2024-11-20",
        assignedDate: "2024-10-28",
      },
    ],
  },
  {
    id: "EMP003",
    name: "Priya Patel",
    email: "priya.patel@company.com",
    password: "spidy123",
    department: "DevOps",
    tasks: [
      {
        id: "TSK005",
        name: "CI/CD Pipeline Setup",
        description: "Configure automated testing and deployment pipeline",
        category: "Infrastructure",
        taskStatus: "In Progress",
        isNew: false,
        isActive: true,
        priority: "High",
        deadline: "2024-11-12",
        assignedDate: "2024-10-22",
      },
      {
        id: "TSK006",
        name: "Cloud Migration Planning",
        description: "Create migration strategy for cloud infrastructure",
        category: "Planning",
        taskStatus: "Not Started",
        isNew: true,
        isActive: true,
        priority: "Medium",
        deadline: "2024-11-25",
        assignedDate: "2024-10-30",
      },
    ],
  },
  {
    id: "EMP004",
    name: "Manish Verma",
    email: "manish.verma@company.com",
    password: "spidy123",
    department: "Quality Assurance",
    tasks: [
      {
        id: "TSK007",
        name: "End-to-End Testing",
        description: "Develop and execute end-to-end test cases for new features",
        category: "Testing",
        taskStatus: "In Progress",
        isNew: false,
        isActive: true,
        priority: "Medium",
        deadline: "2024-11-08",
        assignedDate: "2024-10-24",
      },
      {
        id: "TSK008",
        name: "Automation Framework Update",
        description: "Update test automation framework with new test cases",
        category: "Automation",
        taskStatus: "Pending",
        isNew: true,
        isActive: true,
        priority: "Low",
        deadline: "2024-11-18",
        assignedDate: "2024-10-29",
      },
    ],
  },
  {
    id: "EMP005",
    name: "Ananya Sharma",
    email: "ananya.sharma@company.com",
    password: "spidy123",
    department: "UI/UX Design",
    tasks: [
      {
        id: "TSK009",
        name: "Design System Updates",
        description: "Update component library with new design patterns",
        category: "Design",
        taskStatus: "In Progress",
        isNew: false,
        isActive: true,
        priority: "Medium",
        deadline: "2024-11-15",
        assignedDate: "2024-10-25",
      },
      {
        id: "TSK010",
        name: "Mobile App Redesign",
        description: "Create new mockups for mobile app interface",
        category: "Design",
        taskStatus: "Not Started",
        isNew: true,
        isActive: true,
        priority: "High",
        deadline: "2024-11-22",
        assignedDate: "2024-10-30",
      },
    ],
  },
];

const admin = [
  {
    id: "ADM001",
    name: "David Smith",
    email: "demo@admin.com",
    password: "spidy123",
    department: "Administration",
  },
];

export const setLocalStorage = () => {
  localStorage.setItem("employees", JSON.stringify(employees));
  localStorage.setItem("admin", JSON.stringify(admin));
};

export const getLocalStorage = () => {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  const admin = JSON.parse(localStorage.getItem("admin")) || null;

  // console.log("Employees: ", employees);
  // console.log("Admin: ", admin);
  return { employees, admin };
};
