/**
 * @description Given a template, return a function that replaces the
 * placeholders in the template string with replacement values and emits the
 * resulting string to the console a user-specified number of times.
 * 
 * Rules and edge cases:
 * 1. Placeholders are specified as '*(value)*' where '*(' and ')*' are
 * the default placeholder delimiters
 * 2. In the placeholder 'value' is a fixed literal value, but the placeholder
 * delimeters may be overridden via the 'delims' parameter.
 * 3. Within the placeholder the 'value' literal may be preceded or followed
 * by zero or more spaces.
 * 4. The template string may contain zero or more placeholders
 * 5. The returned function accepts zero or more substitution parameters. The
 * number of parameters will match the number of placeholder values found in
 * the template string.
 * 6. The last parameter accepted by the returned function is the number of
 * times the new string is to be written to the console log.
 * 
 * @param {string} template A string which may contain zero or more occurrances of
 * a placeholder. 
 * @param {object} [delims={open:'*(', close:')*'}] An object defining override
 * opening and closing delimiter values used to surround the placeholders
 * @returns {function} A function that accepts zero or more replacement
 * values for the placeholders, as well as a count which designates the number
 * of times the generated string should be console logged.
 */
function template(template, delims = {open:'*(', close:')*'}) {
  // Create the placeholder string and count the number of times it occurs
  // within the template string
  const placeholder = `${delims.open}value${delims.close}`;
  let noPlaceholders = 0;

  let placeholderIndex = template.indexOf(placeholder);
  while (placeholderIndex > -1) {
    noPlaceholders += 1;
    placeholderIndex = (template.indexOf(placeholder, placeholderIndex+1));
  }
  
  // Return a function that replaces the placeholders with the values provided
  // as parameters. The last parameter specifies the number of times the result
  // is to be written to the console.
  return function (parameters) {
    // Validate the parameter list
    if ( noPlaceholders > 0 && (arguments.length !== (noPlaceholders + 1))) {
      return null;
    }

    // Replace placeholders with their corresponding values from the
    // parameter list
    let result = '';

    if (noPlaceholders === 0) {
      result = template;
    } else {
      const substrings = template.split(placeholder);
     for (i = 0; i < substrings.length; i += 1) {
        result = i === (arguments.length - 1)
          ? result + substrings[i]
          : result + substrings[i] + arguments[i];
      }
    }

    // Write the result to the console log 
    for (i = 0; i < arguments[arguments.length - 1]; i += 1) {
      console.log(result);
    }

    return result; // template renderer usually returns a string
  };
}

let result = template('See the something brown fox?');
result(1);
result = template('See the *(value)* brown fox?');
result('quick', 3);
result = template('See the *(value)* brown *(value)*?');
result('slow', 'bear', 2);
result = template('See the *(value brown fox?');
result('buggy', 1);
result = template('See the *( value )* brown fox?');
result('dumb', 1);
