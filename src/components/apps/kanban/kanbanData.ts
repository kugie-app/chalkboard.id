import { TodoCategory } from "@/app/[locale]/(DashboardLayout)/types/apps/kanban";

export let KanbanData : TodoCategory[] =  [
    {
      id: '1',
      name: 'Todo',
      child: [
        {
          id: '101',
          task: 'This is first task',
          taskImage: '/images/backgrounds/kanban-img-1.jpg',
          taskText: '',
          date: '2024-07-24',
          taskProperty: 'Design',
         
        },
        {
          id: '102',
          task: 'lets do some task on pd',
          taskImage: '',
          taskText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, o eiusmod tempor incid.',
          date: '2024-07-24',
          taskProperty: 'Mobile',
          
        },
        {
          id: '103',
          task: 'Do some projects on React Native with Flutter',
          taskImage: '',
          taskText: '',
          date: '2024-07-24',
          taskProperty: 'Mobile',
         
        },
      ],
    },
    {
      id: '2',
      name: 'Progress',
      child: [
        {
          id: '104',
          task: 'Design navigation changes',
          taskImage: '',
          taskText: '',
          date: '2024-07-24',
          taskProperty: 'Mobile',
          category: ''
        },
        {
          id: '105',
          task: 'Battle with fire',
          taskImage: '/images/backgrounds/kanban-img-2.jpg',
          taskText: '',
          date: '2024-07-24',
          taskProperty: 'Design',
          category: ''
        },
        {
          id: '106',
          task: 'First design concept',
          taskImage: '',
          taskText: '',
          date: '2024-07-24',
          taskProperty: 'Mobile',
          category: ''
        },
      ],
    },
    {
      id: '3',
      name: 'Pending',
      child: [
        {
          id: '107',
          task: 'Persona development',
          taskImage: '',
          taskText:
            'Create user personas based on the research data to represent different user groups and their characteristics, gols, and behaviors..',
          date: '2024-07-24',
          taskProperty: 'UX Stage',
          category: 'Pending',
        },
        {
          id: '108',
          task: 'Redesign overview',
          taskImage: '/images/backgrounds/kanban-img-3.jpg',
          taskText: '',
          date: '14 july',
          taskProperty: 'Design',
          category: 'Pending',
        },
      ],
    },
    {
      id: '4',
      name: 'Done',
      child: [
        {
          id: '109',
          task: 'Usability testing',
          taskImage: '/images/backgrounds/kanban-img-4.jpg',
          taskText: '',
          date: '2024-07-24',
          taskProperty: 'Research',
          category: 'Done',
        },
        {
          id: '110',
          task: 'Introduce new navigation',
          taskImage: '',
          taskText: '',
          date: '2024-07-24',
          taskProperty: 'Data Science',
          category: 'Done',
        },
        {
          id: '111',
          task: 'Branding visual identity',
          taskImage: '',
          taskText: '',
          date: '4 july',
          taskProperty: 'Branding',
          category: 'Done',
        },
        {
          id: '112',
          task: 'Competitor research',
          taskImage: '',
          taskText:
            'research competitors and identify weakness and strengths each of them. comparing their product features, quelity...',
          date: '14 july',
          taskProperty: 'UX Stage',
          category: 'Done',
        },
      ],
    },
  ];

  // Extracting unique task properties from TodoData
const taskPropertiesSet = new Set<string>();

// Using forEach loops instead of flatMap
KanbanData.forEach((category) => {
  category.child.forEach((task) => {
    taskPropertiesSet.add(task.taskProperty);
  });
});

  // Convert Set to array
export const TaskProperties = Array.from(taskPropertiesSet);