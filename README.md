# Spade

## What is it?
A tool that hooks into typeable textareas and records the keystrokes for playback later.

## How can I use it?
Be sure to include it in  your project somehow.
```javascript
//The following example will create a text area that will playback all the inputs from the first 5 seconds from page-load.
textArea = document.createElement('textarea');
document.body.appendChild(textArea);
//Create a new instance of Spade
spade = new Spade();
//Hook into our target using track
spade.track(textArea);
//Type stuff for 5 seconds.
setTimeout(function() {
  //Remove duplicates and the like
  events = spade.compile();
  //Play it back!
  spade.play(events, textArea);
}, 5000);
```
## Extra Functions
### Compress/Uncompress
Event stacks are objects and have character-heavy strings as keys. If we want to save this information, we can compress it down further using `compress()`
```javascript
events = spade.compile();
compressedEvents = spade.compress(events);
//Stuff happens... Saving, loading
uncompressedEvents = spade.uncompress(events);
spade.play(uncompressedEvents, textArea);
```