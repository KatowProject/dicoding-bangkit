import { it, describe } from "node:test";
import assert from "node:assert";
import { sum } from "./index.js";

describe("sum function", () => {
  it("should return the sum of two numbers", () => {
    assert.equal(sum(1, 2), 3);
  });

  it("should return the sum of two decimal numbers", () => {
    assert.equal(sum(1.5, 2.5), 4);
  });

  it("should return the sum of two negative numbers", () => {
    assert.equal(sum(-1, -2), -3);
  });

  it("should return the sum of a positive number and a negative number", () => {
    assert.equal(sum(1, -2), -1);
  });
});
