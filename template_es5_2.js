// Create your own `template` function:
//
// • the `template` function should accept
//    1. a string of the template to parse
//    2. an `options` object for custom delimiters
//        - an `open` property for the open delimiter
//        - a `close` property for the close delimiter
// • the default delimiters the `template` function should use are:
//    1. `*(` for the opening delimiter
//    2. `)*` for the closing delimiter
// • the `template` function should return a function
// • the returned function should accept:
//    1. one argument for each placeholder in the original string
//    2. a number - this is how many times the string should be logged to the console
//
// EXAMPLE:
// in the example below `*(` is my default opening delimiter and `)*` is the default closing delimiter
// var string = "Hi, my name is Richard. And I *( emotion )* this *( thing )*!";
// var logResult = template( string );
// logResult( 'love', 'ice cream', 2 ); // logs the message "Hi, my name is Richard. And I love this ice cream!", twice
//
//
// var string = "Is <<! thing !>> healthy to <<! action !>>?";
// var logResult = template( string, {open: '<<!', close: '!>>'} );
// logResult( 'ice cream', 'consume', 7 ); // logs the message "Is ice cream healthy to consume?", seven times
//
//
// Now it's your turn!
var template = function(str, options) {
  // Establish the opening and closing delimiter strings
  var openDelimiter = '*(';
  var closeDelimiter = ')*';
  if (typeof options === 'object' && options !== 'undefined') {
    openDelimiter = options.open.trim();
    closeDelimiter = options.close.trim();
  }

  // Create a regex pattern for matching the opening OR closing delimiter
  var reOpenPattern = openDelimiter.split('').map((character) => {return '\\' + character;}).join('');
  var reClosePattern = closeDelimiter.split('').map((character) => {return '\\' + character;}).join('');
  var rePattern = new RegExp('(' + reOpenPattern + ' [\\s\\S]*? ' + reClosePattern + ')+?', 'g');

  // Subdivide the template string into an array of its component parts
  var templateStrings = str.split(rePattern);
  var placeholders = [];
  templateStrings.forEach(function(currentStr) {
    if (currentStr.startsWith(openDelimiter)) {
      placeholders.push(currentStr);
    }
  });

  // Return a function that replaces the placeholders with the values provided
  // as parameters. The last parameter specifies the number of times the result
  // is to be written to the console.
  return new Function('a', 'b', " \
    // Validate the parameter list \
    if ( placeholders.length > 0 && (arguments.length !== (placeholders.length + 1))) { \
      return null; \
    } \
    // Replace placeholders with their corresponding values from the \
    // parameter list \
    var result = ''; \
    if (placeholders.length === 0) { \
      result = str; \
    } else { \
      var currentArgument = 0; \
      functionArgs = arguments; \
      templateStrings.forEach(function(currentStr) { \
        if (placeholders.includes(currentStr)) { \
          result += functionArgs[currentArgument]; \
          currentArgument += 1; \
        } else { \
          result += currentStr; \
        } \
      }); \
    } \
    // Write the result to the console log \
    for (i = 0; i < arguments[arguments.length - 1]; i += 1) { \
      console.log(result); \
    } \
    return result; // template renderer usually returns a string \
  "
  );

};

var string = "Hi, my name is Richard. And I *( emotion )* this *( thing )*!";
var logResult = template( string );
logResult( 'love', 'ice cream', 2 ); // logs the message "Hi, my name is Richard. And I love this ice cream!", twice

var string = "Is <<! thing !>> healthy to <<! action !>>?";
var logResult = template( string, {open: '<<!', close: '!>>'} );
logResult( 'ice cream', 'consume', 7 ); // logs the message "Is ice cream healthy to consume?", seven times
