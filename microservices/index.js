import UserService from "./services/user.service.js";
import EmailService from "./services/email.service.js";
import AuthService from "./services/auth.service.js";

async function startApp() {
  // Start services
  await UserService.start();
  await EmailService.start();
  await AuthService.start();

  try {
    // Simulate user creation
    const newUser = await UserService.call("user.createUser", {
      username: "john",
      email: "john@gmail.com",
    });
    console.log("New user created: ", newUser);
    const users = await UserService.call("user.getUsers");
    console.log("All users: ", users);

    // Simulate sending email
    const emailResult = await EmailService.call("email.sendEmail", {
      recipient: newUser.email,
      subject: "Welcome to our platform!",
      content: "Thank you for singing up",
    });
    console.log(emailResult);

    // Simulate Auth
    const authResult = await AuthService.call("auth.authUser", {
      username: newUser.username,
      pasword: "password",
    });
    console.log("Auth result: ", authResult);
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    await UserService.stop();
    await EmailService.stop();
    await AuthService.stop();
  }
}

startApp();
