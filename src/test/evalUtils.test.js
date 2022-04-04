const { tokenizer } = require("../main/tokenizer");
const { peek, compareOperators, evaluateElementaryBinaryOperation, evaluateFormula } = require("../main/evalUtils");

it("[compareOperators] multiplication preceeds addition", () => {
  expect(compareOperators("*", "+")).toEqual(1);
});

it("[compareOperators] division operator has the same precedence as another division operator", () => {
  expect(
    compareOperators("/", "/")
  ).toEqual(0);
});

it("[compareOperators] subtraction operator has lower precedence than division", () => {
  expect(
    compareOperators("-", "/")
  ).toEqual(-1);
});

it("[peek] peek on 1 element array returns single element", () => {
  expect(
    peek([-1])
  ).toEqual(-1);
});

it("[peek] peek on 3 element array returns the third element", () => {
  expect(
    peek([-1, 100, 10000])
  ).toEqual(10000);
});

it("[evaluateElementaryBinaryOperation] on two number operands returns correct value", () => {
  expect(evaluateElementaryBinaryOperation('*', -1000, -10)).toEqual(10000);
});

it("[evaluateFormula] on a single value returns the value", () => {
  expect(evaluateFormula("=1000")).toEqual(1000);
});

it("[evaluateFormula] on a unary operator returns the correct value", () => {
  expect(evaluateFormula("=-1000")).toEqual(-1000);
});

it("[evaluateFormula] with simple binary operator returns correct result", () => {
  expect(evaluateFormula("=1+2")).toEqual(3);
});

it("[evaluateFormula] with three terms returns the correct value", () => {
  expect(evaluateFormula("=2*3+1")).toEqual(7);
});

it("[evaluateFormula] with three terms requiring operator precedence returns the correct value", () => {
  expect(evaluateFormula("=1+2*3")).toEqual(7);
});

it("[evaluateFormula] with five terms returns the correct value", () => {
  expect(evaluateFormula("=1 + 2 * 12 / 6 - 2")).toEqual(3);
});

it("[evaluateFormula] with six large terms returns the correct value", () => {
  expect(evaluateFormula("=1000 + 2000 * 12 / 2 ^ 2 - 2000")).toEqual(5000);
});

it("[evaluateFormula] with decimals return the correct value", () => {
  expect(evaluateFormula("=18/4 * 2^3")).toEqual(4.5 * 8);
});


// ({2, 3}, {*}) => {6, 1} {+}
/*
it("[evaluateFormula] with three operands return correct result", () => {
  expect(evaluateFormula("=1+2*3").value).toEqual("7");
}); */





