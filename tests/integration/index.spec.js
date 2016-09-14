var assert = require("chai").assert;

var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890-=~!@#$%^&*()_+{}|:\"<>?[]\\;',./";

describe("index.html", function() {
	beforeEach(function() {
		browser.url('http://localhost:8000');
	})
	describe("Spade", function() {
		describe("condense()", function() {
			it("should output the final string as was typed into the input", function() {
				var string = "";
				for(var i = 0; i < 25 + Math.floor(Math.random() * 100); i++) {
					if(Math.random() > 0.05) {
						// Add a new character.
						var char = alphabet[Math.floor(alphabet.length * Math.random())];
						string += char;
						browser.addValue("#textarea", char);
					} else {
						// Press backspace a random amount of times.
						for(var i = 0; i < 1 + Math.floor(Math.random() * 8); i++) {
							string = string.substring(0, string.length - 1);
							browser.addValue("#textarea", "\uE003");
						}
					}
				}
				browser.click("#button");
				browser.click("#button2");
				var result = browser.execute(function() {
					return {
						spade: document.getElementById("textarea").spade,
						finalString: document.getElementById("textarea").spade.renderTime(1),
						value: document.getElementById("textarea").value
					}
				});
				assert.equal(result.value.finalString.text, result.value.value);
				assert.equal(result.value.finalString.text, string);
			})
		})
	})
})