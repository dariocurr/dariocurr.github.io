import { clean, createLink } from "../src/js/utils.js";

test("Clean string", () => {
	const d = {
		"test": "test",
		"test ": "test",
		"<br>test": "\ntest",
		" test ": "test",
		" test<br> ": "test\n",
		" test  ": "test",
	}
	for (var k in d) {
		expect(clean(k)).toBe(d[k]);
	}
});

test("Create link", () => {
	const d = {
		"test": "test",
		"assets": "assets",
		"assets/test.file": "https://dariocurr.github.io/assets/test.file",
	}
	for (var k in d) {
		expect(createLink(k)).toBe(d[k]);
	}
});
