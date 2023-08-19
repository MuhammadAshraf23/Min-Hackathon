
  document.addEventListener("DOMContentLoaded", function () {
    const passwordForm = document.getElementById("password-form");
    const oldPasswordInput = document.getElementById("old-password");
    const newPasswordInput = document.getElementById("new-password");
    const repeatPasswordInput = document.getElementById("repeat-password");

    passwordForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const oldPassword = oldPasswordInput.value;
      const newPassword = newPasswordInput.value;
      const repeatPassword = repeatPasswordInput.value;

      // You can implement your password change validation and submission logic here
      if (newPassword !== repeatPassword) {
        alert("New passwords do not match.");
      } else {
        alert("Password changed successfully!");
        // Clear the form inputs
        oldPasswordInput.value = "";
        newPasswordInput.value = "";
        repeatPasswordInput.value = "";
      }
    });
  });