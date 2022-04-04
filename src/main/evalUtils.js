const { tokenizer } = require('./tokenizer.js');

function peek(arr) {
  if (arr.length === 0) {
    throw new Error("out of bounds");
  }
  return arr[arr.length - 1];
};

/*
 * returns 1  if operator1 has precedence over operator2
 * returns 0 if operator1 = operator2
 * returns -1 if operator2 has precedence over operator 2
 */  
function compareOperators (operator1, operator2) {
  const OPERATOR_EXECUTION_ORDER=['^', '/', '*', '+', '-'];
  let diff =  OPERATOR_EXECUTION_ORDER.indexOf(operator1) -         
                OPERATOR_EXECUTION_ORDER.indexOf(operator2);
  if (diff < 0) {
    return 1;
  } else if (diff > 0) {
    return -1;
  } else {
    return 0;
  }
}

function evaluateElementaryBinaryOperation(operator, leftOperand, rightOperand) {  
  if (operator === '+'){
    return leftOperand + rightOperand;
  } else if (operator === '-'){
    return leftOperand - rightOperand;
  } else if (operator === '*'){
    return leftOperand * rightOperand;
  } else if (operator === '/'){
    return leftOperand / rightOperand;
  } else if (operator === '^'){
    return Math.pow(leftOperand, rightOperand)
  } else {
    console.log(`Unknown operator ${operator}`);
    throw new Error(`Undefined operator ${operator}`); 
  }
}

exports.evaluateFormula = function(formula) {
  let operandsStack = [];
  let operatorsStack = [];
  let formulaTokens = tokenizer(formula);

  console.log(`Token length : ${formulaTokens.length}`);

  for(i=0;i<formulaTokens.length;i++) {
    console.log(`formulaTokens[${i}] = { type: ${formulaTokens[i].type}, value: ${formulaTokens[i].value}`);
    nextToken = formulaTokens[i];

    if (nextToken.type === "operator") {
      let nextOperator = nextToken.value;
      while(operatorsStack.length > 0 && compareOperators(nextOperator, peek(operatorsStack)) <= 0) {
        let rightOperand = Number(operandsStack.pop());
        let leftOperand = Number(operandsStack.pop());
        let currentResult = evaluateElementaryBinaryOperation(operatorsStack.pop(), leftOperand, rightOperand);
        operandsStack.push(currentResult);
      }
      operatorsStack.push(nextToken.value);
    } else if(nextToken.type === "number") {
      operandsStack.push(nextToken.value);
    } else {
      throw new Error(`Unsupported token type ${nextToken.type}`);
    }
  }

  // Entire expression has been parsed at this point, apply remaining ops to remaining values with no precedence.
  while(operatorsStack.length > 0){
    if (operandsStack.length == 1 && operatorsStack.length == 1) {
      operandsStack.push(evaluateElementaryBinaryOperation("*", operatorsStack.pop() == '-' ? -1 : 1, operandsStack.pop()));  
    } else {
      let rightOperand = Number(operandsStack.pop());
      let leftOperand = Number(operandsStack.pop());
      let currentResult = evaluateElementaryBinaryOperation(operatorsStack.pop(), leftOperand, rightOperand);
      operandsStack.push(currentResult);
    }
  }
  return Number(operandsStack[0]);
}

exports.evaluateElementaryBinaryOperation = evaluateElementaryBinaryOperation;
exports.compareOperators = compareOperators;
exports.peek = peek;