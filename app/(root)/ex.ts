const entities = require("@jetbrains/youtrack-scripting-api/entities");

exports.rule = entities.Issue.onChange({
  title: "Create a subtask to update leave balance for each selected user",
  guard: (ctx) => {
    const fs = ctx.issue.fields;
    console.log(
      "Checking if the issue is reported and Type is AnnualLeaveTracker..."
    );
    console.log("Issue Type:", fs.Type ? fs.Type.name : "No Type field");
    console.log(
      "SelectedUsers Added:",
      fs.SelectedUsers ? fs.SelectedUsers.added : "No users added"
    );

    return (
      ctx.issue.isReported &&
      fs.Type &&
      fs.Type.name === ctx.Type.AnnualLeaveTracker.name &&
      fs.SelectedUsers.added.isNotEmpty()
    );
  },
  action: (ctx) => {
    const issue = ctx.issue;
    console.log("Creating subtasks for users in SelectedUsers field...");

    const createLeaveBalanceIssue = function (user) {
      try {
        console.log("Creating subtask for user:", user.fullName);

        const newIssue = new entities.Issue(
          ctx.currentUser,
          issue.project,
          "Annual Leave Balance - " + user.fullName
        );

        newIssue.fields.Type = ctx.Type.LeaveBalanceUpdate;
        newIssue.links["subtask of"].add(issue); // Link the subtask to the main issue

        console.log("Subtask created for:", user.fullName);
        console.log("Subtask ID:", newIssue.id);
      } catch (error) {
        console.error("Error creating subtask:", error);
      }
    };

    issue.fields.SelectedUsers.added.forEach((user) => {
      createLeaveBalanceIssue(user);
    });
  },
  requirements: {
    Type: {
      type: entities.EnumField.fieldType,
      LeaveUpdateRequest: {
        name: "Leave Update Request",
      },
      LeaveBalanceUpdate: {
        name: "Leave Balance Update",
      },
      AnnualLeaveTracker: {
        name: "Annual Leave Tracker",
      },
    },
    SelectedUsers: {
      type: entities.User.fieldType,
      multi: true,
    },
  },
});
