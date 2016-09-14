"use strict";

var assert = require("chai").assert;
var Spade = require("../../spade.js");
var $ = require("jQuery");
var ace = require("brace");

describe("A unit test", function() {
	it("should pass", function() {
		assert.equal(1, 1);
	});
});
/*)

var path = require('path')
var childProcess = require('child_process')
var phantomjs = require("phantomjs-prebuilt");
console.log(window.sendEvent);
//console.log(sendEvent);
console.log(Object.keys(phantomjs));
console.log(Object.keys(window));
console.log(Object.keys(window.Mocha));
console.log(Object.keys(window.mocha));
console.log(sendEvent);
console.log(Object.keys(phantomjs));
*/



/*
describe("Spade", function() {
	var spade;
	beforeEach(function() {
		spade = new Spade();
		$('body').empty();
	});
	describe("constructor()", function() {
		it("should construct", function() {
			//var spade = new Spade();
			assert.equal(spade instanceof Spade, true);
		});
	});
	describe("track()", function() {
		describe("hooking", function() {
			it("should throw an error when the first element of an array isn't a jQuery or DOM element", function() {
				this.skip();
			});
			it("should throw an error when the parameter is a Number", function() {
				this.skip();
			});
			it("should throw an error when the parameter is a String", function() {
				this.skip();
			});
			describe("into textarea", function() {
				it("should hook into a single jQuery-selected textarea", function() {
					document.body.appendChild(document.createElement("textarea"));
					var $textarea = $('textarea');
					spade.track($textarea);
				});
				it("should not hook into jQuery-selected textareas", function() {
					document.body.appendChild(document.createElement("textarea"));
					document.body.appendChild(document.createElement("textarea"));
					var $textareas = $('textarea');
					assert.throws(function(){spade.track($textareas)}, Error);
				});
				it("should hook into a single DOM-selected textarea", function() {
					document.body.appendChild(document.createElement("textarea"));
					var textarea = document.querySelector("textarea");
					spade.track(textarea);

				});
				it("should not hook into DOM-selected textareas", function() {
					document.body.appendChild(document.createElement("textarea"));
					document.body.appendChild(document.createElement("textarea"));
					var textareas = document.querySelectorAll("textarea");
					assert.throws(function(){spade.track(textareas)}, Error);
				});
			});
			describe("into Ace editor", function() {
				
				// it("should hook into a single jQuery-selected Ace editor", function() {
				// 	var aceDiv = document.createElement("div");
				// 	aceDiv.id = "editor"; 
				// 	document.body.appendChild(aceDiv);

				// 	var editor = ace.edit("editor");

				// 	var aceEditor = $("#editor");
				// 	spade.track(aceEditor);
				// });
				// it("should not hook into jQuery-selected Ace editors", function() {
				// 	for(var i = 0; i < 2; i++) {
				// 		var aceDiv = document.createElement("div");
				// 		aceDiv.id = "editor" + i;
				// 		aceDiv.className = "aceEditor"
				// 		document.body.appendChild(aceDiv);

				// 		var editor = ace.edit("editor" + i);
				// 	}
				// 	var aceEditors = $(".aceEditor");
				// 	assert.throw(function(){spade.track(aceEditors)}, Error);
				// });
				// it("should hook into a single DOM-selected Ace editor", function() {
				// 	var aceDiv = document.createElement("div");
				// 	aceDiv.id = "editor";
				// 	aceDiv.className = "aceEditor"
				// 	document.body.appendChild(aceDiv);

				// 	var editor = ace.edit("editor");
				// 	var aceEditor = document.querySelectorAll(".aceEditor");
				// 	spade.track(aceEditor)
				// });
				// it("should not hook into DOM-selected Ace editors", function() {
				// 	for(var i = 0; i < 2; i++) {
				// 		var aceDiv = document.createElement("div");
				// 		aceDiv.id = "editor" + i;
				// 		aceDiv.className = "aceEditor"
				// 		document.body.appendChild(aceDiv);

				// 		var editor = ace.edit("editor" + i);
				// 	}
				// 	var aceEditor = document.querySelectorAll(".aceEditor");
				// 	assert.throw(function(){spade.track(aceEditor)}, Error);
				// });
				
				it("should hook into Ace objects", function() {
					this.skip();
				})
				it("should hook into the div transformed into a Ace editor", function() {
					this.skip();
				})
			});
		});
		describe("keyboard event handling", function() {
			describe("of textarea", function() {
				beforeEach(function() {
					var textarea = document.createElement("textarea");
					textarea.id = "text-input-area"
					textarea.className = "editable"
					document.body.appendChild(textarea);
				})
				it("should add a new event every time a key is pressed", function() {
					// Figure out how to simulate key presses.
					this.skip();
				})
			});
			describe("of Ace editor", function() {
				it("should add a new event every time a key is pressed", function() {
					// Figure out how to simulate key presses.
					this.skip();
				})
			});
		});
	});
	describe("condense()", function() {

	});
	describe("expand()", function() {

	});
	describe("renderTime()", function() {

	});
	describe("compile()", function() {
		it("should take an array of semi-raw events and return an array of objects", function() {
			var timestamp = 0;
			var string = "";
			var alphabet = "abcdefghijklmnopqrstuvwxyz";
			for(var i = 0; i < 100; i++) {
				spade.events.push({
					startPos: 0,
					endPos: 0,
					content: string,
					timestamp: timestamp
				});
				if(string.length) {
					if(Math.random() < 0.125) {
						string = string.substring(0, string.length - 1);
					} else {
						string += alphabet[Math.floor(alphabet.length * Math.random())];
					}
				} else {
					string += alphabet[Math.floor(alphabet.length * Math.random())];
				}
				timestamp += 1 + Math.floor(Math.random() * 500)
			}
			spade.compile();
			assert.equal(spade.events[spade.events.length - 1].content, spade.renderTime(1).text);
		});
	});
});


*/