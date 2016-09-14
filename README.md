# Spade.js
Dig into a user's textarea or Ace typing sessions.

## What is it?

A simple library that can dig (hook) into typeable textareas and record keystrokes to playback later.

## How can I use it?

Create a new Spade.js object and track() any DOM element. Works with jQuery, or even the ACE object itself!

```html
<html>
	<head>
		<script src="./spade.js"></script>
		<script>
			window.onload = function() {
				var textarea = document.getElementById("aTextArea");
				var button = document.getElementById("processSpade");

				var spade = new Spade();
				// Tell Spade which element to keep track of.
				spade.track(textarea);

				button.onclick = function() {
					// Turn semi-raw events into a list of diffs.
					spade.compile();
					// Turn an array of objects in an array of arrays.
					spade.condense();

					// Turn our array of arrays into a nice string.
					var spadeString = JSON.stringify(spade.condensed);
					// Compress spadeString using your favorite compression library!
					// Upload it to a server to save to playback for another day.

				}
			}
		</script>
	</head>
	<body>
		<textarea id="aTextArea"></textarea>
		<button id="processSpade">Compile & Condense</button>
	</body>
</html>
```

## Caveats

Spade.js does not play back recorded sessions. Check the examples folder for an example on how to playback an existing, condensed array.
