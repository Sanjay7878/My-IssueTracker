define({ "api": [
  {
    "type": "emit",
    "url": "/disconnect",
    "title": "when user logout",
    "version": "0.0.1",
    "group": "Emit",
    "description": "<p>This event <b>(&quot;disconnect&quot;)</b> has to be emitted when a user logout/closed the browser.</p>",
    "examples": [
      {
        "title": "The following data has to be emitted",
        "content": "\n{\n  userId :string,\n  fullName: string\n}",
        "type": "json"
      }
    ],
    "filename": "libs/socketLib.js",
    "groupTitle": "Emit",
    "name": "EmitDisconnect"
  },
  {
    "type": "emit",
    "url": "/notifications",
    "title": "to notify changes to the watchers",
    "version": "0.0.1",
    "group": "Emit",
    "description": "<p>This event <b>(&quot;notifications&quot;)</b> has to be emitted When Someone comments or makes changes to the issue, that the user is been added as watcher.</p>",
    "examples": [
      {
        "title": "The following data has to be emitted",
        "content": "\n{\n  message: string\n}",
        "type": "json"
      }
    ],
    "filename": "libs/socketLib.js",
    "groupTitle": "Emit",
    "name": "EmitNotifications"
  },
  {
    "type": "emit",
    "url": "/notifyByName",
    "title": "when someone comments or edites",
    "version": "0.0.1",
    "group": "Emit",
    "description": "<p>This event <b>(&quot;notifyByName&quot;)</b> has to be emitted when someone comments or edits the issue.</p>",
    "examples": [
      {
        "title": "The following data has to be emitted",
        "content": "\n {\n   status :string,\n   message: string,\n   userName :string,\n   info: string\n}",
        "type": "json"
      }
    ],
    "filename": "libs/socketLib.js",
    "groupTitle": "Emit",
    "name": "EmitNotifybyname"
  },
  {
    "type": "emit",
    "url": "/set-user",
    "title": "Setting user online",
    "version": "0.0.1",
    "group": "Emit",
    "description": "<p>This event <b>(&quot;set-user&quot;)</b> has to be emitted when a user comes online.</p>",
    "examples": [
      {
        "title": "The following data has to be emitted",
        "content": "{\n    authToken: String\n}",
        "type": "json"
      }
    ],
    "filename": "libs/socketLib.js",
    "groupTitle": "Emit",
    "name": "EmitSetUser"
  },
  {
    "type": "listen",
    "url": "/auth-error",
    "title": "event",
    "version": "0.0.1",
    "group": "Listen",
    "description": "<p>This event <b>(&quot;auth-error&quot;)</b>  has to be listened to know if any error has occurred on socket.</p>",
    "filename": "libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "ListenAuthError"
  },
  {
    "type": "Listen",
    "url": "/new-comment",
    "title": "when user posts new comments",
    "version": "0.0.1",
    "group": "Listen",
    "description": "<p>This event <b>(&quot;new-comment&quot;)</b> has to be listened when Someone comments on a particular issue.</p>",
    "examples": [
      {
        "title": "The following data has to be listened",
        "content": "\n{\n  comment: string\n}",
        "type": "json"
      }
    ],
    "filename": "libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "ListenNewComment"
  },
  {
    "type": "listen",
    "url": "/verifyUser",
    "title": "Verification the init user",
    "version": "0.0.1",
    "group": "Listen",
    "description": "<p>This event <b>(&quot;verify-user&quot;)</b> has to be listened on the user's end to verify user</p>",
    "filename": "libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "ListenVerifyuser"
  },
  {
    "type": "listen",
    "url": "/watcher-user-list",
    "title": "event",
    "version": "0.0.1",
    "group": "Listen",
    "description": "<p>This event <b>(&quot;watcher-user-list&quot;)</b>  has to be listened by all the user who subscribes to the watchers list.</p>",
    "filename": "libs/socketLib.js",
    "groupTitle": "Listen",
    "name": "ListenWatcherUserList"
  }
] });
