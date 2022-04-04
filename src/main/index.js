const AWS = require('aws-sdk');
const C = require('./constants.js');
const {compareOperators, evaluateElementaryBinaryOperation, evaluateFormula} = require('./evalUtils.js');

let dynamodb = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event) => {
    // Extract values from event and format as strings
    let responseText = JSON.stringify(`expression: ${event.expression}, email: ${event.email}, operator0=${C.ALPHABET[0]}, compare=${compareOperators('+', '-')}, eval=${evaluateElementaryBinaryOperation('+','1', '2')}, eval2=${evaluateFormula('=0')}`);
    // Create a JSON object with our response and store it in a constant
    
    // Create JSON object with parameters for DynamoDB and store in a variable
    let date = new Date();
    let now = date.toISOString();

    let params = {
        TableName:'ExpressionEvalDatabase',
        Item: {
            'id': (Math.random() + 1).toString(36).substring(7),
            'expression': event.expression,
            'email': event.email,
            'create_time': now,
            'created_by': event.email,
        }
    };

    //store request in DB history
    await dynamodb.put(params).promise();
    
    //response
    const response = {
        statusCode: 200,
        body: responseText
    };
    
    // Return the response constant
    return response;
};
