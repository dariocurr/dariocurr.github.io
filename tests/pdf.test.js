import { pdf } from "../src/js/pdf.js";

test("Generate Curriculum/Resume", () => { expect(typeof pdf).toBe("function"); });