const AWS = require('aws-sdk');
const translate = new AWS.Translate();
const sqs = new AWS.SQS();
const sns = new AWS.SNS();
const s3 = new AWS.S3();
const ddb = new AWS.DynamoDB.DocumentClient();
const cognito_idp = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
    try {
        let data = await cognito_idp.listUsers({
            UserPoolId: "us-east-1_HdYJb7Znp",
            Limit: 10
        }).promise();
        console.log(data);

    } catch (err) {
        console.log(err);
        try {
            let data = await ddb.scan({
                TableName: "KChineseAnimal",
                ExpressionAttributeValues: {
                    ':1': "1"
                },
                FilterExpression: "1 = :1"
            }).promise();

        } catch (err) {
            // error handling goes here
        };
    };
    try {
        let data = await s3.listObjects({
            Bucket: "cloud9-ktest",
            MaxKeys: 10
        }).promise();

    } catch (err) {
        // error handling goes here
        try {
            let data = await sns.listSubscriptionsByTopic({
                TopicArn: "arn:aws:sns:us-east-1:318300609668:Notifications"
            }).promise();

        } catch (err) {
            // error handling goes here
        };
    };
    try {
        let data = await sqs.receiveMessage({
            QueueUrl: `https://sqs.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${process.env.SIGMA_AWS_ACC_ID}/KTestSQS`,
            MaxNumberOfMessages: 1,
            VisibilityTimeout: 30,
            WaitTimeSeconds: 0,
            AttributeNames: ['All']
        }).promise();

    } catch (err) {
        // error handling goes here
    };
    try {
        let data = await translate.translateText({
            SourceLanguageCode: "auto",
            TargetLanguageCode: "en",
            Text: "Hola"
        }).promise();
        console.log(data);

    } catch (err) {
        // error handling goes here
    };

    return { "message": "Successfully executed" };
};