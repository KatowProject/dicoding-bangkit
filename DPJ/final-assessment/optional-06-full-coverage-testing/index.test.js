import { it, describe } from "node:test";
import assert from "node:assert";

import sum from "./index.js";

describe("sum function", () => {
  it("should return 0 if one of the parameters is not a number", () => {
    assert.equal(sum(1, "2"), 0);
    assert.equal(sum(true, 2), 0);
  });

  it("should return 0 if one of the parameters is less than 0", () => {
    assert.equal(sum(-1, 2), 0);
    assert.equal(sum(1, -2), 0);
  });

  it("should return the sum of two numbers", () => {
    assert.equal(sum(1, 2), 3);
  });

  it("should return the sum of two decimal numbers", () => {
    assert.equal(sum(1.5, 2.5), 4);
  });
});
