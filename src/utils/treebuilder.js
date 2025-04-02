function buildTree(project, coAdmins, worklists) {
    const tree = {
      name: project.projectName,
      children: [
        {
          name: 'Co-Admins',
          children: coAdmins.map(coAdmin => ({
            name: coAdmin.name,
            children: []
          }))
        },
        {
          name: 'Worklists',
          children: worklists.map(worklist => ({
            name: worklist.name,
            children: worklist.tasks.map(task => ({
              name: task.name,
              children: task.subTasks.map(subTask => ({
                name: subTask.name,
                children: []
              }))
            }))
          }))
        }
      ]
    };
  
    return tree;
  }
  
  module.exports = buildTree;