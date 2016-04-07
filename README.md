# Authentication

## Firebase

### Authenticating Users with Email & Password

Firebase makes it easy to integrate email and password authentication into your app. The credentials are not stored in your Firebase database. They are kept in a secure database behind the Firebase Authentication servers, and stored securely using bcrypt. This separates sensitive user credentials from your application data, and lets you focus on the user interface and experience for your app.

Firebase backs this data up daily and exports the credentials to redundant, off-site backups at a secured location.

#### Creating User Accounts

Firebase clients expose a number of JavaScript convenience methods for account creation and management, letting you have full control over the interface for your application. Create new user accounts with the following snippet:

```JavaScript
var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
ref.createUser({
  email    : "bobtony@firebase.com",
  password : "correcthorsebatterystaple"
}, function(error, userData) {
  if (error) {
    console.log("Error creating user:", error);
  } else {
    console.log("Successfully created user account with uid:", userData.uid);
  }
});
```

> Creating an account will not log that new account in.

##### Logging Users In

Once an account has been created, you can log a user in with the following snippet:

```JavaScript
var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
ref.authWithPassword({
  email    : "bobtony@firebase.com",
  password : "correcthorsebatterystaple"
}, function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
});
```

##### Optional Settings

`authWithPassword()` takes an optional third parameter which is an object containing any of the following settings:

Name     | Description                                                                                                                                                                                                                                                                                                                                                 | Type
-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----:
remember | If not specified - or set to default - sessions are persisted for as long as you have configured in the Login & Auth tab of your App Dashboard. To limit persistence to the lifetime of the current window, set this to sessionOnly. A value of none will not persist authentication data at all and will end authentication as soon as the page is closed. | String

Here is an example of password login where the session will expire upon browser shutdown:

```JavaScript
var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
ref.authWithPassword({
  email    : "bobtony@firebase.com",
  password : "correcthorsebatterystaple"
}, function(error, authData) { /* Your Code */ }, {
  remember: "sessionOnly"
});
```

The authData object returned to your callback contains the following fields:

Field                        | Description                                                                                                                                                                  | Type
---------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----:
uid                          | A unique user ID, intended as the user's unique key across all providers.                                                                                                    | String
provider                     | The authentication method used, in this case: password.                                                                                                                      | String
token                        | The Firebase authentication token for this session.                                                                                                                          | String
auth                         | The contents of the authentication token, which will be available as the auth variable within your Security and Firebase Rules.                                              | Object
expires                      | A timestamp, in seconds since the UNIX epoch, indicating when the authentication token expires.                                                                              | Number
password                     | An object containing provider-specific data.                                                                                                                                 | Object
password.email               | The user's email address.                                                                                                                                                    | String
password.isTemporaryPassword | Whether or not the user authenticated using a temporary password, as used in password reset flows.                                                                           | Boolean
password.profileImageURL     | The URL to the user's Gravatar profile image, which is retrieved from hashing the user's email. If the user does not have a Gravatar profile, then a pixelated face is used. | String

#### Security and Firebase Rules

Now that the client is logged in, your Security and Firebase Rules have access to their unique user ID. The auth variable contains the following values:

Field    | Description                                                               | Type
-------- | :------------------------------------------------------------------------ | :-----
uid      | A unique user ID, intended as the user's unique key across all providers. | String
provider | The authentication method used, in this case: password.                   | String

Here is an example of how to use the auth variable in your Security and Firebase Rules:

```JavaScript
{
  "rules": {
    "users": {
      "$uid": {
        // grants write access to the owner of this user account whose uid must
        // exactly match the key ($uid)
        ".write": "auth !== null && auth.uid === $uid",
        // grants read access to any user who is logged in with an email and
        // password
        ".read": "auth !== null && auth.provider === 'password'"
      }
    }
  }
}
```

> See the User Authentication and User Based Security articles for more details.

#### Changing Emails

You can change the email for a user using the existing email address and password as shown:

```JavaScript
var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
ref.changeEmail({
  oldEmail : "bobtony@firebase.com",
  newEmail : "bobtony@google.com",
  password : "correcthorsebatterystaple"
  }, function(error) {
    if (error === null) {
      console.log("Email changed successfully");   
    } else {
      console.log("Error changing email:", error);  
    }
});
```

#### Changing Passwords

You can change the password for a user using the email address and current password as shown:

```JavaScript
var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
ref.changePassword({
  email       : "bobtony@firebase.com",
  oldPassword : "correcthorsebatterystaple",
  newPassword : "neatsupersecurenewpassword"
}, function(error) {
  if (error === null) {     
    console.log("Password changed successfully");   
  } else {     
    console.log("Error changing password:", error);   
  }
});
```

#### Sending Password Reset Emails

You can send the user a password reset email using the email address for that account:

```JavaScript
var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
ref.resetPassword({
  email : "bobtony@firebase.com"
}, function(error) {
  if (error === null) {
    console.log("Password reset email sent successfully");
  } else {
    console.log("Error sending password reset email:", error);
  }
});
```

You can edit the content of the password reset email from the Login & Auth tab of your App Dashboard.

#### Deleting Users

You can delete a user using their email address and password as shown below:

```JavaScript
var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
ref.removeUser({
  email    : "bobtony@firebase.com",
  password : "correcthorsebatterystaple"
}, function(error) {
  if (error === null) {
    console.log("User removed successfully");
  } else {
    console.log("Error removing user:", error);
  }
});
```
