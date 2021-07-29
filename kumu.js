const AWS = require('aws-sdk');
const cognito_idp = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
    debugger;
    try {
        let data = await cognito_idp.listUsers({
            UserPoolId: "us-east-1_HdYJb7Znp",
            Limit: 10
        }).promise();
        console.log(data);

    } catch (err) {
        console.log(err);
        // error handling goes here
    };
    //commit

    return { "message": "Successfully executed" };
};