import { md } from "../src/js/md.js";

test("Generate MD", () => {
  expect(typeof md).toBe("function");
});
