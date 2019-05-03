define({ "api": [
  {
    "type": "get",
    "url": "http://trackerapi.sanjayinfotechy.com/api/v1/comments/get/all",
    "title": "Get all comments of an issue",
    "version": "0.0.1",
    "group": "Comments",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the Particular Issue</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "skip",
            "description": "<p>skip of the Particular Issue</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"error\": false,\n            \"message\": \"Comments Found\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"_id\": \"string\",\n                    \"comment\": \"string\",\n                    \"commentedBy\": \"string\",\n                    \"createdOn\": \"date,\n                    \"seen\": boolean,\n                    \"commentId\": \"string\",\n                    \"issueId\": \"string\",\n                    \"__v\": 0\n                }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No Comments\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/comments.js",
    "groupTitle": "Comments",
    "name": "GetHttpTrackerapiSanjayinfotechyComApiV1CommentsGetAll"
  },
  {
    "type": "post",
    "url": "http://trackerapi.sanjayinfotechy.com/api/v1/comments/delete",
    "title": "Delete a particular comment",
    "version": "0.0.1",
    "group": "Comments",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "commentId",
            "description": "<p>commentId of the Particular comment</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"error\": false,\n            \"message\": \"Comment Deteled Successfully\",\n            \"status\": 200,\n            \"data\": {\n          \"n\": 1,\n                        \"ok\": 1,\n                        \"deletedCount\": 1\"\n          }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"Failed to Delete the comment\",\n\"status\": 505,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/comments.js",
    "groupTitle": "Comments",
    "name": "PostHttpTrackerapiSanjayinfotechyComApiV1CommentsDelete"
  },
  {
    "type": "put",
    "url": "http://trackerapi.sanjayinfotechy.com/api/v1/comments/edit",
    "title": "Edit a particular comment",
    "version": "0.0.1",
    "group": "Comments",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "commentId",
            "description": "<p>commentId of the Particular comment</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"error\": false,\n            \"message\": \"Comment Edited Successfully\",\n            \"status\": 200,\n            \"data\": {\n          \"n\": 1,\n                        \"nModified\": 1,\n                        \"ok\": 1\n          }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"Failed to Edit the Comment\",\n\"status\": 500,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/comments.js",
    "groupTitle": "Comments",
    "name": "PutHttpTrackerapiSanjayinfotechyComApiV1CommentsEdit"
  },
  {
    "type": "get",
    "url": "http://trackerapi.sanjayinfotechy.com/api/v1/records/all/issues",
    "title": "Get All Issues",
    "version": "0.0.1",
    "group": "Records",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"All Issues Found\",\n\"status\": 200,\n\"data\": {\n          \"status\": {\n                        \"open\": true,\n                        \"backlog\": false,\n                        \"inProgress\": false,\n                        \"inTest\": false,\n                        \"closed\": false\n                     },\n                     \"title\": \"String\",\n                     \"issueType\": [],\n                     \"issueCreatedOn\": \"Date\",\n                     \"screenshots\": [],\n                     \"watchers\": [],\n                     \"comments\": [],\n                     \"description\": \"String\",\n                     \"issueLocation\": \"String\",\n                     \"reportedBy\": \"String\",\n                     \"issueId\": \"String\",\n        }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No Issue Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/records.js",
    "groupTitle": "Records",
    "name": "GetHttpTrackerapiSanjayinfotechyComApiV1RecordsAllIssues"
  },
  {
    "type": "get",
    "url": "http://trackerapi.sanjayinfotechy.com/api/v1/records/all/user/issues",
    "title": "Get All Specific User Created Issues",
    "version": "0.0.1",
    "group": "Records",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<p>fullName of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"All User Created issue found\",\n\"status\": 200,\n\"data\": {\n          \"status\": {\n                        \"open\": true,\n                        \"backlog\": false,\n                        \"inProgress\": false,\n                        \"inTest\": false,\n                        \"closed\": false\n                     },\n                     \"title\": \"String\",\n                     \"issueType\": [],\n                     \"issueCreatedOn\": \"Date\",\n                     \"screenshots\": [],\n                     \"watchers\": [],\n                     \"comments\": [],\n                     \"description\": \"String\",\n                     \"issueLocation\": \"String\",\n                     \"reportedBy\": \"String\",\n                     \"issueId\": \"String\",\n        }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No User created Issue found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/records.js",
    "groupTitle": "Records",
    "name": "GetHttpTrackerapiSanjayinfotechyComApiV1RecordsAllUserIssues"
  },
  {
    "type": "get",
    "url": "http://trackerapi.sanjayinfotechy.com/api/v1/records/get/:issueId/issue",
    "title": "Get Single Issue Created By A User",
    "version": "0.0.1",
    "group": "Records",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"Issue Record found\",\n\"status\": 200,\n\"data\": {\n          \"status\": {\n                        \"open\": true,\n                        \"backlog\": false,\n                        \"inProgress\": false,\n                        \"inTest\": false,\n                        \"closed\": false\n                     },\n                     \"title\": \"String\",\n                     \"issueType\": [],\n                     \"issueCreatedOn\": \"Date\",\n                     \"screenshots\": [],\n                     \"watchers\": [],\n                     \"comments\": [],\n                     \"description\": \"String\",\n                     \"issueLocation\": \"String\",\n                     \"reportedBy\": \"String\",\n                     \"issueId\": \"String\",\n        }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No Issue Records found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/records.js",
    "groupTitle": "Records",
    "name": "GetHttpTrackerapiSanjayinfotechyComApiV1RecordsGetIssueidIssue"
  },
  {
    "type": "get",
    "url": "http://trackerapi.sanjayinfotechy.com/api/v1/records/get/pagination",
    "title": "Get Paginationed Records",
    "version": "0.0.1",
    "group": "Records",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "skip",
            "description": "<p>skip count for pagination</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"All Issues Found\",\n\"status\": 200,\n\"data\": {\n          \"status\": {\n                        \"open\": true,\n                        \"backlog\": false,\n                        \"inProgress\": false,\n                        \"inTest\": false,\n                        \"closed\": false\n                     },\n                     \"title\": \"String\",\n                     \"issueType\": [],\n                     \"issueCreatedOn\": \"Date\",\n                     \"screenshots\": [],\n                     \"watchers\": [],\n                     \"comments\": [],\n                     \"description\": \"String\",\n                     \"issueLocation\": \"String\",\n                     \"reportedBy\": \"String\",\n                     \"issueId\": \"String\",\n        },\n                  {\n          \"status\": {\n                        \"open\": true,\n                        \"backlog\": false,\n                        \"inProgress\": false,\n                        \"inTest\": false,\n                        \"closed\": false\n                     },\n                     \"title\": \"String\",\n                     \"issueType\": [],\n                     \"issueCreatedOn\": \"Date\",\n                     \"screenshots\": [],\n                     \"watchers\": [],\n                     \"comments\": [],\n                     \"description\": \"String\",\n                     \"issueLocation\": \"String\",\n                     \"reportedBy\": \"String\",\n                     \"issueId\": \"String\",\n        }\n                  ..................\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No Issue Found\",\n\"status\": 500,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/records.js",
    "groupTitle": "Records",
    "name": "GetHttpTrackerapiSanjayinfotechyComApiV1RecordsGetPagination"
  },
  {
    "type": "post",
    "url": "http://trackerapi.sanjayinfotechy.com/api/v1/records/create/issue",
    "title": "Create a new issue",
    "version": "0.0.1",
    "group": "Records",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user who is creating an issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>description of the issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueLocation",
            "description": "<p>loaction of the issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueType",
            "description": "<p>type of issue. (body params) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "file",
            "optional": false,
            "field": "screenshots",
            "description": "<p>screenshotsof the issue. (body params) (optional)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"Issue Created Successfully\",\n\"status\": 200,\n\"data\": {\n          \"status\": {\n                        \"open\": true,\n                        \"backlog\": false,\n                        \"inProgress\": false,\n                        \"inTest\": false,\n                        \"closed\": false\n                     },\n                     \"title\": \"String\",\n                     \"issueType\": [],\n                     \"issueCreatedOn\": \"Date\",\n                     \"screenshots\": [],\n                     \"watchers\": [],\n                     \"comments\": [],\n                     \"description\": \"String\",\n                     \"issueLocation\": \"String\",\n                     \"reportedBy\": \"String\",\n                     \"issueId\": \"String\",\n        }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"Failed To Create Issue\",\n\"status\": 500,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/records.js",
    "groupTitle": "Records",
    "name": "PostHttpTrackerapiSanjayinfotechyComApiV1RecordsCreateIssue"
  },
  {
    "type": "post",
    "url": "http://trackerapi.sanjayinfotechy.com/api/v1/records/delete/issue",
    "title": "Delete a created Issue",
    "version": "0.0.1",
    "group": "Records",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user who has created an issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"Issue Deleted Successfully\",\n\"status\": 200,\n\"data\": {\n          \"n\": 1,\n                    \"ok\": 1,\n                    \"deletedCount\": 1\"\n        }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"Failed to Delete the issue\",\n\"status\": 500,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/records.js",
    "groupTitle": "Records",
    "name": "PostHttpTrackerapiSanjayinfotechyComApiV1RecordsDeleteIssue"
  },
  {
    "type": "put",
    "url": "http://trackerapi.sanjayinfotechy.com/api/v1/records/edit/user/issue",
    "title": "Edit a particular Issue",
    "version": "0.0.1",
    "group": "Records",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"Issue Deleted Successfully\",\n\"status\": 200,\n\"data\": {\n          \"n\": 1,\n                    \"nModified\": 1,\n                    \"ok\": 1\n        }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"Failed to Edit the issue\",\n\"status\": 500,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/records.js",
    "groupTitle": "Records",
    "name": "PutHttpTrackerapiSanjayinfotechyComApiV1RecordsEditUserIssue"
  },
  {
    "type": "delete",
    "url": "http://trackerapi.sanjayinfotechy.com/api/v1/user/:userId/delete",
    "title": "Api to delete user details",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user whose info is needed</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"Deleted the user successfully\",\n\"status\": 200,\n\"data\": { \n      \"n\": 1,\n                \"ok\": 1,\n                \"deletedCount\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No user Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Users",
    "name": "DeleteHttpTrackerapiSanjayinfotechyComApiV1UserUseridDelete"
  },
  {
    "type": "get",
    "url": "http://trackerapi.sanjayinfotechy.com/api/v1/user/get/all",
    "title": "Get All Users",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"All User Details Found\",\n\"status\": 200,\n\"data\": {\n              \"mobileNumber\": number,\n                     \"createdOn\": \"string\",\n                     \"firstName\": \"string\",\n                     \"lastName\": \"string\",\n                     \"userId\": \"string\",\n                     \"companyName\": \"string\",\n                     \"role\": \"string\",\n                     \"location\": \"string\",\n                     \"email\": \"string\",\n                     \"password\": \"string\"\n        }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No Users Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Users",
    "name": "GetHttpTrackerapiSanjayinfotechyComApiV1UserGetAll"
  },
  {
    "type": "get",
    "url": "http://trackerapi.sanjayinfotechy.com/api/v1/user/:userId/get",
    "title": "Get Single User Info",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user whose info is needed</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"User Found\",\n\"status\": 200,\n\"data\": {\n              \"mobileNumber\": number,\n                     \"createdOn\": \"string\",\n                     \"_id\": \"string\",\n                     \"firstName\": \"string\",\n                     \"lastName\": \"string\",\n                     \"userId\": \"string\",\n                     \"companyName\": \"string\",\n                     \"role\": \"string\",\n                     \"location\": \"string\",\n                     \"email\": \"string\",\n                     \"password\": \"string\"\n                     \"__v\": 0\n        }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No User Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Users",
    "name": "GetHttpTrackerapiSanjayinfotechyComApiV1UserUseridGet"
  },
  {
    "type": "post",
    "url": "http://trackerapi.sanjayinfotechy.com/api/v1/user/login",
    "title": "Api for user login",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"Login Successful\",\n\"status\": 200,\n\"data\": {\n          \"authToken\": \"string\",\n                    \"userDetails\": {\n                                    \"mobileNumber\": number,\n                                    \"firstName\": \"string\",\n                                    \"lastName\": \"string\",\n                                    \"userId\": \"string\",\n                                    \"companyName\": \"string\",\n                                    \"role\": \"string\",\n                                    \"location\": \"string\",\n                                    \"email\": \"string\"\n                                }\n        }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No user Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Users",
    "name": "PostHttpTrackerapiSanjayinfotechyComApiV1UserLogin"
  },
  {
    "type": "post",
    "url": "http://trackerapi.sanjayinfotechy.com/api/v1/user/logout",
    "title": "Api for Logout",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"error\": false,\n            \"message\": \"Logged out successfully\",\n            \"status\": 200,\n            \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"Already Logged out or Invalid UserId\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Users",
    "name": "PostHttpTrackerapiSanjayinfotechyComApiV1UserLogout"
  },
  {
    "type": "post",
    "url": "http://trackerapi.sanjayinfotechy.com/api/v1/user/singup",
    "title": "Api for user to singup",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>first name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>last name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "dob",
            "description": "<p>DOB of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "companyName",
            "description": "<p>company name of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "role",
            "description": "<p>Role/Designation of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobile number of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "location",
            "description": "<p>location of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"User Created Succesfully\",\n\"status\": 200,\n\"data\": {\n          \"mobileNumber\": number,\n                     \"createdOn\": \"date\",\n                     \"_id\": \"string\",\n                     \"firstName\": \"string\",\n                     \"lastName\": \"string\",\n                     \"userId\": \"string\",\n                     \"companyName\": \"string\",\n                     \"role\": \"string\",\n                     \"location\": \"string\",\n                     \"email\": \"string\",\n                     \"__v\": number\n        }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"Failed to create user\",\n\"status\": 500,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Users",
    "name": "PostHttpTrackerapiSanjayinfotechyComApiV1UserSingup"
  },
  {
    "type": "put",
    "url": "http://trackerapi.sanjayinfotechy.com/api/v1/user/:userId/edit",
    "title": "Api to edit user details",
    "version": "0.0.1",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user whose info is needed</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"error\": false,\n\"message\": \"User Details Edited successfully\",\n\"status\": 200,\n\"data\": {\n          \"n\": 1,\n                    \"nModified\": 1,\n                    \"ok\": 1\n        }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\"error\": true,\n\"message\": \"No user Found\",\n\"status\": 404,\n\"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/routes.js",
    "groupTitle": "Users",
    "name": "PutHttpTrackerapiSanjayinfotechyComApiV1UserUseridEdit"
  }
] });
