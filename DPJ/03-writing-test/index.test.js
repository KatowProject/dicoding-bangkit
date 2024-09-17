import { it, describe } from "node:test";
import assert from "node:assert";
import { sum } from "./index.js";

describe("sum function", () => {
  it("should return the sum of two numbers", () => {
    assert.strictEqual(sum(1, 2), 3);
  });

  it("should return the sum of two negative numbers", () => {
    assert.strictEqual(sum(-1, -2), -3);
  });

  it("should return the sum of a positive number and a negative number", () => {
    assert.strictEqual(sum(1, -2), -1);
  });

  it("should return the sum of two decimal numbers", () => {
    assert.strictEqual(sum(1.1, 2.2), 3.3);
  });

  it("should return the sum of two decimal numbers with a negative number", () => {
    assert.strictEqual(sum(-1.1, -2.2), -3.3);
  });

  it("should return the sum of two decimal numbers with a positive number", () => {
    assert.strictEqual(sum(1.1, -2.2), -1.1);
  });
});
