"use strict";
(function() {
	var root = this;
	if(typeof root == "object")
		var prev_Spade = root.Spade;
	class Spade {
		constructor() {
			this.events = [];
			this.playback = [];
			this.compiled = [];
			this.condensed = [];
			this.speed = 1;
			this.isReady = true;
		}
		// Hook into a specific element.
		track(elem) {
			//console.log(typeof elem);
			if(elem.length) {
				if(elem.length > 1) {
					throw new Error("Array with more than 1 element was passed.")
				} else {
					elem = elem[0];
				}
			}
			if(elem.env !== undefined && elem.env.editor !== undefined) {
				this.target = elem.env.editor;
			} else {
				this.target = elem;
			}
			var keyHook =  null;
			if(elem.textInput && elem.textInput.getElement) {
				keyHook = elem.textInput.getElement();
			} else {
				keyHook = elem;
			}
			keyHook.addEventListener("keydown", this.createEvent.bind(this));
			keyHook.addEventListener("keyup", this.createEvent.bind(this));
			elem.addEventListener("mouseup", this.createEvent.bind(this));
			elem.spade = this;
		}
		// Create a semi-raw event.
		createEvent(event) {
			if(this.target.getValue) {
				this.events.push({
					startPos: this.target.selection.getCursor(),
					endPos: this.target.selection.getSelectionAnchor(),
					content: this.target.getValue(),
					timestamp: (new Date()).getTime()
				});
			} else {
				this.events.push({
					startPos: this.target.selectionStart,
					endPos: this.target.selectionEnd,
					content: this.target.value,
					timestamp: (new Date()).getTime()
				});
			}
			this.isReady = false;
		}
		// Turn an array of compiled diffs into an array of arrays.
		condense() {
			if(!this.isReady) {
				console.warn("Condensing outdated compiled array.");
			}
			if(!this.compiled.length) {
				console.warn("No compiled array. Has the events array been compiled?");
				return this.condensed;
			}
			var condensedArray = [];
			for(var i = 0; i < this.compiled.length; i++) {
				var u = this.compiled[i];
				if(u.selFIndex !== undefined && u.selEIndex !== undefined && u.selFIndex.row !== undefined && u.selEIndex !== undefined) {
					condensedArray.push([
						u.timestamp,
						u.difContent,
						u.difFIndex,
						u.difEIndex,
						u.selFIndex.row,
						u.selFIndex.column,
						u.selEIndex.row,
						u.selEIndex.column
					]);
				} else {
					condensedArray.push([
						u.timestamp,
						u.difContent,
						u.difFIndex,
						u.difEIndex,
						u.selFIndex,
						u.selEIndex
					]);
				}
			}
			return this.condensed = condensedArray;
		}
		// Take an array of arrays and expand it into an array of compiled diff objects.
		expand(stack) {
			if(this.compiled.length) {
				console.warn("Overriding old compiled array with a new one!");
			}
			var uncompressedArray = [];
			for(var i = 0; i < stack.length; i++) {
				var c = stack[i];
				if(c.length === 8) {
					uncompressedArray.push({
						timestamp: c[0],
						difContent: c[1],
						difFIndex: c[2],
						difEIndex: c[3],
						selFIndex: {
							row: c[4],
							column: c[5]
						},
						selEIndex: {
							row: c[6],
							column: c[7]
						}
					})
				} else {
					uncompressedArray.push({
						timestamp: c[0],
						difContent: c[1],
						difFIndex: c[2],
						difEIndex: c[3],
						selFIndex: c[4],
						selEIndex: c[5]
					})
				}
			}
			return this.compiled = uncompressedArray;
		}
		// Return the final string at a specific time [0, 1]
		renderTime(t) {
			var stack = this.compiled;
			if(!stack.length) {
				console.warn("No events to play!");
			}

			var tTime = stack[stack.length - 1].timestamp;
			var frameAtTime = stack[0].difContent;
			for(var i = 1; i < stack.length; i++) {
				var tEvent = stack[i];
				if(t * tTime < tEvent.timestamp) {
					tEvent = stack[--i];
					break;
				}
				var oVal = frameAtTime;
				if(tEvent.difFIndex !== null && tEvent.difEIndex !== null) {
					frameAtTime = oVal.substring(0, tEvent.difFIndex) + tEvent.difContent + oVal.substring(oVal.length - tEvent.difEIndex, oVal.length);
				}
			}
			return {
				text: frameAtTime,
				sStart: tEvent.selFIndex,
				sEnd: tEvent.selEIndex
			}
		}
		// Turn a stack of semi-raw events and create a series of diffs.
		compile() {
			var compiledStack = [];
			if(this.events.length > 0) {
				var startTime = this.events[0].timestamp;
				for(var i = 0; i < this.events.length; i++) {
					var c = this.events[i];
					var adjustedTimestamp = c.timestamp - startTime;

					var tString = "";
					var fIndex = null;
					var eIndex = null;
					var dCount = 0;
					if(i === 0) {
						tString = c.content;
						fIndex = 0;
						eIndex = 0;
					} else {
						var p = this.events[i - 1];
						var isOkay = false;
						for(var key in p) {
							if(key != "timestamp") {
								if(typeof p[key] == "string") {
									if(p[key] !== c[key]) {
										isOkay = true;
									}
								} else {
									if(typeof p[key] == "object") {
										for(var key2 in p[key]) {
											if(c[key][key2] !== undefined) {
												if(p[key][key2] !== c[key][key2]) {
													isOkay = true;
												}
											} else {
												console.warn("Warning: c[key][key2] doesn't exist, but p[key][key2] does.");
												isOkay = true;
											}
										}
									} else {
										if(p[key] !== c[key]) {
											isOkay = true;
										}
									}
								}
							}
						}
						if(!isOkay) {
							continue;
						}
						if(p.content !== c.content) {
							for(var j = 0; j < Math.max(p.content.length, c.content.length); j++) {
								if(p.content.charAt(j) === c.content.charAt(j)) {
									if(fIndex !== null) {
										tString += c.content.charAt(j);
										dCount++;
									}
								} else {
									tString += c.content.charAt(j);
									if(fIndex === null) {
										fIndex = j;
									}
									dCount++;
								}
							}
							for(var j = 0; j < Math.min(p.content.length, c.content.length) - fIndex; j++) {
								if(p.content.charAt(p.content.length - 1 - j)  !== c.content.charAt(c.content.length - 1 - j)) {
									if(eIndex === null) {
										eIndex = j;
										break;
									}
								}
 							}
 							if(eIndex === null) {
 								eIndex = Math.min(p.content.length, c.content.length) - fIndex;
 							}
 							tString = tString.substring(0, tString.length - eIndex);
						} else {
							// No change, only cursor movement
						}
					}
					compiledStack.push({
						timestamp: adjustedTimestamp,
						difContent: tString,
						difFIndex: fIndex,
						difEIndex: eIndex,
						selFIndex: c.startPos,
						selEIndex: c.endPos
					});
				}
			} else {
				// Stack is empty! We can't compile this.
			}
			this.isReady = true;
			return this.compiled = compiledStack;
		}
		// Create a new Spade from an existing condensed array.
		static fromCondensed(condensed) {
			var tSpade = new Spade();
			tSpade.condensed = condensed;
			return tSpade;
		}
		// Create a new Spade from an existing compiled array.
		static fromCompiled(compiled) {
			var tSpade = new Spade();
			tSpade.compiled = compiled;
			return tSpade;
		}
	}
	Spade.noConflict = function() {
		root.Spade = previous_Spade;
		return Spade;
	}
	if(typeof exports !== "undefined") {
		if(typeof module !== "undefined" && module.exports) {
			exports = module.exports = Spade;
		}
		exports.Spade = Spade;
	} else {
		root.Spade = Spade;
	}
}).call(this);