const AWS = require('aws-sdk');
const { evaluateFormula } = require('./evalUtils.js');
let dynamodb = new AWS.DynamoDB.DocumentClient();
let ses = new AWS.SES({ region: "us-west-2" });

exports.handler = async (event) => {
    let date = new Date();
    let now = date.toISOString();

    let result = evaluateFormula("="+event.expression);
    let transactionId = (Math.random() + 1).toString(36).substring(7);

    //store request in DB history
    let params = {
        TableName:'ExpressionEvalDatabase',
        Item: {
            'id': transactionId,
            'expression': event.expression,
            'result': result,
            'email': event.email,
            'create_time': now,
            'created_by': event.email,
        }
    };
    await dynamodb.put(params).promise();

    //send email
    var email = {
        Destination: {
          ToAddresses: [event.email],
        },
        Message: {
          Body: {
            Text: { Data: `Your result for ${event.expression} is + ${result}` },
          },
          Subject: { Data: `Your result for ${event.expression} is + ${result}` },
        },
        Source: "sender@ahf125vr.mailosaur.net",
      };
    await ses.sendEmail(email).promise();

    //construct response object
    let responseText = JSON.stringify({"id": `${transactionId}`, "expression": `${event.expression}`, "email": `${event.email}`, "result":`${result}`});
    const response = {
        statusCode: 200,
        body: responseText
    };
    
    return response;
};
