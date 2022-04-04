const { tokenizer } = require("../main/tokenizer");

it("tokenizes expressions", () => {
  const tokens = tokenizer("=100+200");
  expect(tokens.length).toBe(3);
  expect(tokens[0]).toEqual({ type: "number", value: "100" });
  expect(tokens[1]).toEqual({ type: "operator", value: "+" });
  expect(tokens[2]).toEqual({ type: "number", value: "200" });
});

it("does not tokenize spaces", () => {
  const tokens = tokenizer("=1 + 2");
  expect(tokens.length).toBe(3);
  expect(tokens[0].value).toEqual("1");
  expect(tokens[1].value).toEqual("+");
});
