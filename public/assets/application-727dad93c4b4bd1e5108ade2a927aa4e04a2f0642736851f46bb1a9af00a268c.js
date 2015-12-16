/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:19Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (typeof element.data('ujs:enable-with') !== 'undefined') element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
        if (valueToCheck === nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:enable-with')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:enable-with')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    results = [];
    for (i = 0, len = pageCacheKeys.length; i < len; i++) {
      key = pageCacheKeys[i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      results.push(delete pageCache[key]);
    }
    return results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (i = 0, len = scripts.length; i < len; i++) {
      script = scripts[i];
      if (!((ref = script.type) === '' || ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      ref1 = script.attributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attr = ref1[j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var ref, value;
    value = ((ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var ref;
      return (400 <= (ref = xhr.status) && ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var i, len, node, ref, results;
      ref = doc.querySelector('head').childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var i, len, ref, results, value;
      if (a.length > b.length) {
        ref = [b, a], a = ref[0], b = ref[1];
      }
      results = [];
      for (i = 0, len = a.length; i < len; i++) {
        value = a[i];
        if (indexOf.call(b, value) >= 0) {
          results.push(value);
        }
      }
      return results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original1) {
      this.original = original1 != null ? original1 : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(superClass) {
    extend(Link, superClass);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, i, len;
      extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = extensions.length; i < len; i++) {
        extension = extensions[i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link1) {
      this.link = link1;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event1) {
      this.event = event1;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var ref;
      if ((value > (ref = this.value) && ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, ref;
    if ((ref = event.state) != null ? ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (ref = popCookie('request_method')) === 'GET' || ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
(function() {


}).call(this);
!function t(e,i,r){function n(o,a){if(!i[o]){if(!e[o]){var l="function"==typeof require&&require;if(!a&&l)return l(o,!0);if(s)return s(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var c=i[o]={exports:{}};e[o][0].call(c.exports,function(t){var i=e[o][1][t];return n(i?i:t)},c,c.exports,t,e,i,r)}return i[o].exports}for(var s="function"==typeof require&&require,o=0;o<r.length;o++)n(r[o]);return n}({1:[function(t,e,i){t("./shim"),t("./modules/core.dict"),t("./modules/core.get-iterator-method"),t("./modules/core.get-iterator"),t("./modules/core.is-iterable"),t("./modules/core.delay"),t("./modules/core.function.part"),t("./modules/core.object.is-object"),t("./modules/core.object.classof"),t("./modules/core.object.define"),t("./modules/core.object.make"),t("./modules/core.number.iterator"),t("./modules/core.string.escape-html"),t("./modules/core.string.unescape-html"),t("./modules/core.log"),e.exports=t("./modules/$.core")},{"./modules/$.core":15,"./modules/core.delay":83,"./modules/core.dict":84,"./modules/core.function.part":85,"./modules/core.get-iterator":87,"./modules/core.get-iterator-method":86,"./modules/core.is-iterable":88,"./modules/core.log":89,"./modules/core.number.iterator":90,"./modules/core.object.classof":91,"./modules/core.object.define":92,"./modules/core.object.is-object":93,"./modules/core.object.make":94,"./modules/core.string.escape-html":95,"./modules/core.string.unescape-html":96,"./shim":200}],2:[function(t,e,i){e.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},{}],3:[function(t,e,i){var r=t("./$.is-object");e.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},{"./$.is-object":37}],4:[function(t,e,i){"use strict";var r=t("./$.to-object"),n=t("./$.to-index"),s=t("./$.to-length");e.exports=[].copyWithin||function(t,e){var i=r(this),o=s(i.length),a=n(t,o),l=n(e,o),u=arguments,c=u.length>2?u[2]:void 0,h=Math.min((void 0===c?o:n(c,o))-l,o-a),f=1;for(a>l&&l+h>a&&(f=-1,l+=h-1,a+=h-1);h-->0;)l in i?i[a]=i[l]:delete i[a],a+=f,l+=f;return i}},{"./$.to-index":75,"./$.to-length":78,"./$.to-object":79}],5:[function(t,e,i){"use strict";var r=t("./$.to-object"),n=t("./$.to-index"),s=t("./$.to-length");e.exports=[].fill||function(t){for(var e=r(this,!0),i=s(e.length),o=arguments,a=o.length,l=n(a>1?o[1]:void 0,i),u=a>2?o[2]:void 0,c=void 0===u?i:n(u,i);c>l;)e[l++]=t;return e}},{"./$.to-index":75,"./$.to-length":78,"./$.to-object":79}],6:[function(t,e,i){var r=t("./$.to-iobject"),n=t("./$.to-length"),s=t("./$.to-index");e.exports=function(t){return function(e,i,o){var a,l=r(e),u=n(l.length),c=s(o,u);if(t&&i!=i){for(;u>c;)if(a=l[c++],a!=a)return!0}else for(;u>c;c++)if((t||c in l)&&l[c]===i)return t||c;return!t&&-1}}},{"./$.to-index":75,"./$.to-iobject":77,"./$.to-length":78}],7:[function(t,e,i){var r=t("./$.ctx"),n=t("./$.is-object"),s=t("./$.iobject"),o=t("./$.to-object"),a=t("./$.to-length"),l=t("./$.is-array"),u=t("./$.wks")("species"),c=function(t,e){var i;return l(t)&&n(i=t.constructor)&&(i=i[u],null===i&&(i=void 0)),new(void 0===i?Array:i)(e)};e.exports=function(t){var e=1==t,i=2==t,n=3==t,l=4==t,u=6==t,h=5==t||u;return function(f,d,p){for(var m,_,g=o(f),v=s(g),y=r(d,p,3),$=a(v.length),x=0,b=e?c(f,$):i?c(f,0):void 0;$>x;x++)if((h||x in v)&&(m=v[x],_=y(m,x,g),t))if(e)b[x]=_;else if(_)switch(t){case 3:return!0;case 5:return m;case 6:return x;case 2:b.push(m)}else if(l)return!1;return u?-1:n||l?l:b}}},{"./$.ctx":16,"./$.iobject":33,"./$.is-array":35,"./$.is-object":37,"./$.to-length":78,"./$.to-object":79,"./$.wks":82}],8:[function(t,e,i){var r=t("./$"),n=t("./$.to-object"),s=t("./$.iobject");e.exports=t("./$.fails")(function(){var t=Object.assign,e={},i={},r=Symbol(),n="abcdefghijklmnopqrst";return e[r]=7,n.split("").forEach(function(t){i[t]=t}),7!=t({},e)[r]||Object.keys(t({},i)).join("")!=n})?function(t,e){for(var i=n(t),o=arguments,a=o.length,l=1,u=r.getKeys,c=r.getSymbols,h=r.isEnum;a>l;)for(var f,d=s(o[l++]),p=c?u(d).concat(c(d)):u(d),m=p.length,_=0;m>_;)h.call(d,f=p[_++])&&(i[f]=d[f]);return i}:Object.assign},{"./$":45,"./$.fails":23,"./$.iobject":33,"./$.to-object":79}],9:[function(t,e,i){var r=t("./$.cof"),n=t("./$.wks")("toStringTag"),s="Arguments"==r(function(){return arguments}());e.exports=function(t){var e,i,o;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(i=(e=Object(t))[n])?i:s?r(e):"Object"==(o=r(e))&&"function"==typeof e.callee?"Arguments":o}},{"./$.cof":10,"./$.wks":82}],10:[function(t,e,i){var r={}.toString;e.exports=function(t){return r.call(t).slice(8,-1)}},{}],11:[function(t,e,i){"use strict";var r=t("./$"),n=t("./$.hide"),s=t("./$.ctx"),o=t("./$.species"),a=t("./$.strict-new"),l=t("./$.defined"),u=t("./$.for-of"),c=t("./$.iter-step"),h=t("./$.uid")("id"),f=t("./$.has"),d=t("./$.is-object"),p=Object.isExtensible||d,m=t("./$.support-desc"),_=m?"_s":"size",g=0,v=function(t,e){if(!d(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!f(t,h)){if(!p(t))return"F";if(!e)return"E";n(t,h,++g)}return"O"+t[h]},y=function(t,e){var i,r=v(e);if("F"!==r)return t._i[r];for(i=t._f;i;i=i.n)if(i.k==e)return i};e.exports={getConstructor:function(e,i,n,o){var c=e(function(t,e){a(t,c,i),t._i=r.create(null),t._f=void 0,t._l=void 0,t[_]=0,void 0!=e&&u(e,n,t[o],t)});return t("./$.mix")(c.prototype,{clear:function(){for(var t=this,e=t._i,i=t._f;i;i=i.n)i.r=!0,i.p&&(i.p=i.p.n=void 0),delete e[i.i];t._f=t._l=void 0,t[_]=0},"delete":function(t){var e=this,i=y(e,t);if(i){var r=i.n,n=i.p;delete e._i[i.i],i.r=!0,n&&(n.n=r),r&&(r.p=n),e._f==i&&(e._f=r),e._l==i&&(e._l=n),e[_]--}return!!i},forEach:function(t){for(var e,i=s(t,arguments.length>1?arguments[1]:void 0,3);e=e?e.n:this._f;)for(i(e.v,e.k,this);e&&e.r;)e=e.p},has:function(t){return!!y(this,t)}}),m&&r.setDesc(c.prototype,"size",{get:function(){return l(this[_])}}),c},def:function(t,e,i){var r,n,s=y(t,e);return s?s.v=i:(t._l=s={i:n=v(e,!0),k:e,v:i,p:r=t._l,n:void 0,r:!1},t._f||(t._f=s),r&&(r.n=s),t[_]++,"F"!==n&&(t._i[n]=s)),t},getEntry:y,setStrong:function(e,i,r){t("./$.iter-define")(e,i,function(t,e){this._t=t,this._k=e,this._l=void 0},function(){for(var t=this,e=t._k,i=t._l;i&&i.r;)i=i.p;return t._t&&(t._l=i=i?i.n:t._t._f)?"keys"==e?c(0,i.k):"values"==e?c(0,i.v):c(0,[i.k,i.v]):(t._t=void 0,c(1))},r?"entries":"values",!r,!0),o(e),o(t("./$.core")[i])}}},{"./$":45,"./$.core":15,"./$.ctx":16,"./$.defined":18,"./$.for-of":26,"./$.has":29,"./$.hide":30,"./$.is-object":37,"./$.iter-define":41,"./$.iter-step":43,"./$.mix":50,"./$.species":65,"./$.strict-new":66,"./$.support-desc":72,"./$.uid":80}],12:[function(t,e,i){var r=t("./$.for-of"),n=t("./$.classof");e.exports=function(t){return function(){if(n(this)!=t)throw TypeError(t+"#toJSON isn't generic");var e=[];return r(this,!1,e.push,e),e}}},{"./$.classof":9,"./$.for-of":26}],13:[function(t,e,i){"use strict";var r=t("./$.hide"),n=t("./$.an-object"),s=t("./$.strict-new"),o=t("./$.for-of"),a=t("./$.array-methods"),l=t("./$.uid")("weak"),u=t("./$.is-object"),c=t("./$.has"),h=Object.isExtensible||u,f=a(5),d=a(6),p=0,m=function(t){return t._l||(t._l=new _)},_=function(){this.a=[]},g=function(t,e){return f(t.a,function(t){return t[0]===e})};_.prototype={get:function(t){var e=g(this,t);return e?e[1]:void 0},has:function(t){return!!g(this,t)},set:function(t,e){var i=g(this,t);i?i[1]=e:this.a.push([t,e])},"delete":function(t){var e=d(this.a,function(e){return e[0]===t});return~e&&this.a.splice(e,1),!!~e}},e.exports={getConstructor:function(e,i,r,n){var a=e(function(t,e){s(t,a,i),t._i=p++,t._l=void 0,void 0!=e&&o(e,r,t[n],t)});return t("./$.mix")(a.prototype,{"delete":function(t){return u(t)?h(t)?c(t,l)&&c(t[l],this._i)&&delete t[l][this._i]:m(this)["delete"](t):!1},has:function(t){return u(t)?h(t)?c(t,l)&&c(t[l],this._i):m(this).has(t):!1}}),a},def:function(t,e,i){return h(n(e))?(c(e,l)||r(e,l,{}),e[l][t._i]=i):m(t).set(e,i),t},frozenStore:m,WEAK:l}},{"./$.an-object":3,"./$.array-methods":7,"./$.for-of":26,"./$.has":29,"./$.hide":30,"./$.is-object":37,"./$.mix":50,"./$.strict-new":66,"./$.uid":80}],14:[function(t,e,i){"use strict";var r=t("./$.global"),n=t("./$.def"),s=t("./$.for-of"),o=t("./$.strict-new");e.exports=function(e,i,a,l,u,c){var h=r[e],f=h,d=u?"set":"add",p=f&&f.prototype,m={},_=function(e){var i=p[e];t("./$.redef")(p,e,"delete"==e?function(t){return i.call(this,0===t?0:t)}:"has"==e?function(t){return i.call(this,0===t?0:t)}:"get"==e?function(t){return i.call(this,0===t?0:t)}:"add"==e?function(t){return i.call(this,0===t?0:t),this}:function(t,e){return i.call(this,0===t?0:t,e),this})};if("function"==typeof f&&(c||p.forEach&&!t("./$.fails")(function(){(new f).entries().next()}))){var g,v=new f,y=v[d](c?{}:-0,1);t("./$.iter-detect")(function(t){new f(t)})||(f=i(function(t,i){o(t,f,e);var r=new h;return void 0!=i&&s(i,u,r[d],r),r}),f.prototype=p,p.constructor=f),c||v.forEach(function(t,e){g=1/e===-(1/0)}),g&&(_("delete"),_("has"),u&&_("get")),(g||y!==v)&&_(d),c&&p.clear&&delete p.clear}else f=l.getConstructor(i,e,u,d),t("./$.mix")(f.prototype,a);return t("./$.tag")(f,e),m[e]=f,n(n.G+n.W+n.F*(f!=h),m),c||l.setStrong(f,e,u),f}},{"./$.def":17,"./$.fails":23,"./$.for-of":26,"./$.global":28,"./$.iter-detect":42,"./$.mix":50,"./$.redef":58,"./$.strict-new":66,"./$.tag":73}],15:[function(t,e,i){var r=e.exports={version:"1.2.3"};"number"==typeof __e&&(__e=r)},{}],16:[function(t,e,i){var r=t("./$.a-function");e.exports=function(t,e,i){if(r(t),void 0===e)return t;switch(i){case 1:return function(i){return t.call(e,i)};case 2:return function(i,r){return t.call(e,i,r)};case 3:return function(i,r,n){return t.call(e,i,r,n)}}return function(){return t.apply(e,arguments)}}},{"./$.a-function":2}],17:[function(t,e,i){var r=t("./$.global"),n=t("./$.core"),s=t("./$.hide"),o=t("./$.redef"),a="prototype",l=function(t,e){return function(){return t.apply(e,arguments)}},u=function(t,e,i){var c,h,f,d,p=t&u.G,m=t&u.P,_=p?r:t&u.S?r[e]||(r[e]={}):(r[e]||{})[a],g=p?n:n[e]||(n[e]={});p&&(i=e);for(c in i)h=!(t&u.F)&&_&&c in _,f=(h?_:i)[c],d=t&u.B&&h?l(f,r):m&&"function"==typeof f?l(Function.call,f):f,_&&!h&&o(_,c,f),g[c]!=f&&s(g,c,d),m&&((g[a]||(g[a]={}))[c]=f)};r.core=n,u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,e.exports=u},{"./$.core":15,"./$.global":28,"./$.hide":30,"./$.redef":58}],18:[function(t,e,i){e.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},{}],19:[function(t,e,i){var r=t("./$.is-object"),n=t("./$.global").document,s=r(n)&&r(n.createElement);e.exports=function(t){return s?n.createElement(t):{}}},{"./$.global":28,"./$.is-object":37}],20:[function(t,e,i){var r=t("./$");e.exports=function(t){var e=r.getKeys(t),i=r.getSymbols;if(i)for(var n,s=i(t),o=r.isEnum,a=0;s.length>a;)o.call(t,n=s[a++])&&e.push(n);return e}},{"./$":45}],21:[function(t,e,i){e.exports=Math.expm1||function(t){return 0==(t=+t)?t:t>-1e-6&&1e-6>t?t+t*t/2:Math.exp(t)-1}},{}],22:[function(t,e,i){e.exports=function(e){var i=/./;try{"/./"[e](i)}catch(r){try{return i[t("./$.wks")("match")]=!1,!"/./"[e](i)}catch(n){}}return!0}},{"./$.wks":82}],23:[function(t,e,i){e.exports=function(t){try{return!!t()}catch(e){return!0}}},{}],24:[function(t,e,i){"use strict";e.exports=function(e,i,r){var n=t("./$.defined"),s=t("./$.wks")(e),o=""[e];t("./$.fails")(function(){var t={};return t[s]=function(){return 7},7!=""[e](t)})&&(t("./$.redef")(String.prototype,e,r(n,s,o)),t("./$.hide")(RegExp.prototype,s,2==i?function(t,e){return o.call(t,this,e)}:function(t){return o.call(t,this)}))}},{"./$.defined":18,"./$.fails":23,"./$.hide":30,"./$.redef":58,"./$.wks":82}],25:[function(t,e,i){"use strict";var r=t("./$.an-object");e.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},{"./$.an-object":3}],26:[function(t,e,i){var r=t("./$.ctx"),n=t("./$.iter-call"),s=t("./$.is-array-iter"),o=t("./$.an-object"),a=t("./$.to-length"),l=t("./core.get-iterator-method");e.exports=function(t,e,i,u){var c,h,f,d=l(t),p=r(i,u,e?2:1),m=0;if("function"!=typeof d)throw TypeError(t+" is not iterable!");if(s(d))for(c=a(t.length);c>m;m++)e?p(o(h=t[m])[0],h[1]):p(t[m]);else for(f=d.call(t);!(h=f.next()).done;)n(f,p,h.value,e)}},{"./$.an-object":3,"./$.ctx":16,"./$.is-array-iter":34,"./$.iter-call":39,"./$.to-length":78,"./core.get-iterator-method":86}],27:[function(t,e,i){var r={}.toString,n=t("./$.to-iobject"),s=t("./$").getNames,o="object"==typeof window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return s(t)}catch(e){return o.slice()}};e.exports.get=function(t){return o&&"[object Window]"==r.call(t)?a(t):s(n(t))}},{"./$":45,"./$.to-iobject":77}],28:[function(t,e,i){var r=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},{}],29:[function(t,e,i){var r={}.hasOwnProperty;e.exports=function(t,e){return r.call(t,e)}},{}],30:[function(t,e,i){var r=t("./$"),n=t("./$.property-desc");e.exports=t("./$.support-desc")?function(t,e,i){return r.setDesc(t,e,n(1,i))}:function(t,e,i){return t[e]=i,t}},{"./$":45,"./$.property-desc":57,"./$.support-desc":72}],31:[function(t,e,i){e.exports=t("./$.global").document&&document.documentElement},{"./$.global":28}],32:[function(t,e,i){e.exports=function(t,e,i){var r=void 0===i;switch(e.length){case 0:return r?t():t.call(i);case 1:return r?t(e[0]):t.call(i,e[0]);case 2:return r?t(e[0],e[1]):t.call(i,e[0],e[1]);case 3:return r?t(e[0],e[1],e[2]):t.call(i,e[0],e[1],e[2]);case 4:return r?t(e[0],e[1],e[2],e[3]):t.call(i,e[0],e[1],e[2],e[3])}return t.apply(i,e)}},{}],33:[function(t,e,i){var r=t("./$.cof");e.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},{"./$.cof":10}],34:[function(t,e,i){var r=t("./$.iterators"),n=t("./$.wks")("iterator");e.exports=function(t){return(r.Array||Array.prototype[n])===t}},{"./$.iterators":44,"./$.wks":82}],35:[function(t,e,i){var r=t("./$.cof");e.exports=Array.isArray||function(t){return"Array"==r(t)}},{"./$.cof":10}],36:[function(t,e,i){var r=t("./$.is-object"),n=Math.floor;e.exports=function(t){return!r(t)&&isFinite(t)&&n(t)===t}},{"./$.is-object":37}],37:[function(t,e,i){e.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},{}],38:[function(t,e,i){var r=t("./$.is-object"),n=t("./$.cof"),s=t("./$.wks")("match");e.exports=function(t){var e;return r(t)&&(void 0!==(e=t[s])?!!e:"RegExp"==n(t))}},{"./$.cof":10,"./$.is-object":37,"./$.wks":82}],39:[function(t,e,i){var r=t("./$.an-object");e.exports=function(t,e,i,n){try{return n?e(r(i)[0],i[1]):e(i)}catch(s){var o=t["return"];throw void 0!==o&&r(o.call(t)),s}}},{"./$.an-object":3}],40:[function(t,e,i){"use strict";var r=t("./$"),n={};t("./$.hide")(n,t("./$.wks")("iterator"),function(){return this}),e.exports=function(e,i,s){e.prototype=r.create(n,{next:t("./$.property-desc")(1,s)}),t("./$.tag")(e,i+" Iterator")}},{"./$":45,"./$.hide":30,"./$.property-desc":57,"./$.tag":73,"./$.wks":82}],41:[function(t,e,i){"use strict";var r=t("./$.library"),n=t("./$.def"),s=t("./$.redef"),o=t("./$.hide"),a=t("./$.has"),l=t("./$.wks")("iterator"),u=t("./$.iterators"),c=!([].keys&&"next"in[].keys()),h="@@iterator",f="keys",d="values",p=function(){return this};e.exports=function(e,i,m,_,g,v,y){t("./$.iter-create")(m,i,_);var $,x,b=function(t){switch(t){case f:return function(){return new m(this,t)};case d:return function(){return new m(this,t)}}return function(){return new m(this,t)}},w=i+" Iterator",T=e.prototype,P=T[l]||T[h]||g&&T[g],S=P||b(g);if(P){var k=t("./$").getProto(S.call(new e));t("./$.tag")(k,w,!0),!r&&a(T,h)&&o(k,l,p)}if((!r||y)&&o(T,l,S),u[i]=S,u[w]=p,g)if($={values:g==d?S:b(d),keys:v?S:b(f),entries:g!=d?S:b("entries")},y)for(x in $)x in T||s(T,x,$[x]);else n(n.P+n.F*c,i,$)}},{"./$":45,"./$.def":17,"./$.has":29,"./$.hide":30,"./$.iter-create":40,"./$.iterators":44,"./$.library":47,"./$.redef":58,"./$.tag":73,"./$.wks":82}],42:[function(t,e,i){var r=t("./$.wks")("iterator"),n=!1;try{var s=[7][r]();s["return"]=function(){n=!0},Array.from(s,function(){throw 2})}catch(o){}e.exports=function(t,e){if(!e&&!n)return!1;var i=!1;try{var s=[7],o=s[r]();o.next=function(){i=!0},s[r]=function(){return o},t(s)}catch(a){}return i}},{"./$.wks":82}],43:[function(t,e,i){e.exports=function(t,e){return{value:e,done:!!t}}},{}],44:[function(t,e,i){e.exports={}},{}],45:[function(t,e,i){var r=Object;e.exports={create:r.create,getProto:r.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:r.getOwnPropertyDescriptor,setDesc:r.defineProperty,setDescs:r.defineProperties,getKeys:r.keys,getNames:r.getOwnPropertyNames,getSymbols:r.getOwnPropertySymbols,each:[].forEach}},{}],46:[function(t,e,i){var r=t("./$"),n=t("./$.to-iobject");e.exports=function(t,e){for(var i,s=n(t),o=r.getKeys(s),a=o.length,l=0;a>l;)if(s[i=o[l++]]===e)return i}},{"./$":45,"./$.to-iobject":77}],47:[function(t,e,i){e.exports=!1},{}],48:[function(t,e,i){e.exports=Math.log1p||function(t){return(t=+t)>-1e-8&&1e-8>t?t-t*t/2:Math.log(1+t)}},{}],49:[function(t,e,i){var r,n,s,o=t("./$.global"),a=t("./$.task").set,l=o.MutationObserver||o.WebKitMutationObserver,u=o.process,c="process"==t("./$.cof")(u),h=function(){var t,e;for(c&&(t=u.domain)&&(u.domain=null,t.exit());r;)e=r.domain,e&&e.enter(),r.fn.call(),e&&e.exit(),r=r.next;n=void 0,t&&t.enter()};if(c)s=function(){u.nextTick(h)};else if(l){var f=1,d=document.createTextNode("");new l(h).observe(d,{characterData:!0}),s=function(){d.data=f=-f}}else s=function(){a.call(o,h)};e.exports=function(t){var e={fn:t,next:void 0,domain:c&&u.domain};n&&(n.next=e),r||(r=e,s()),n=e}},{"./$.cof":10,"./$.global":28,"./$.task":74}],50:[function(t,e,i){var r=t("./$.redef");e.exports=function(t,e){for(var i in e)r(t,i,e[i]);return t}},{"./$.redef":58}],51:[function(t,e,i){var r=t("./$"),n=t("./$.own-keys"),s=t("./$.to-iobject");e.exports=function(t,e){for(var i,o=n(s(e)),a=o.length,l=0;a>l;)r.setDesc(t,i=o[l++],r.getDesc(e,i));return t}},{"./$":45,"./$.own-keys":54,"./$.to-iobject":77}],52:[function(t,e,i){e.exports=function(e,i){var r=t("./$.def"),n=(t("./$.core").Object||{})[e]||Object[e],s={};s[e]=i(n),r(r.S+r.F*t("./$.fails")(function(){n(1)}),"Object",s)}},{"./$.core":15,"./$.def":17,"./$.fails":23}],53:[function(t,e,i){var r=t("./$"),n=t("./$.to-iobject"),s=r.isEnum;e.exports=function(t){return function(e){for(var i,o=n(e),a=r.getKeys(o),l=a.length,u=0,c=[];l>u;)s.call(o,i=a[u++])&&c.push(t?[i,o[i]]:o[i]);return c}}},{"./$":45,"./$.to-iobject":77}],54:[function(t,e,i){var r=t("./$"),n=t("./$.an-object"),s=t("./$.global").Reflect;e.exports=s&&s.ownKeys||function(t){var e=r.getNames(n(t)),i=r.getSymbols;return i?e.concat(i(t)):e}},{"./$":45,"./$.an-object":3,"./$.global":28}],55:[function(t,e,i){"use strict";var r=t("./$.path"),n=t("./$.invoke"),s=t("./$.a-function");e.exports=function(){for(var t=s(this),e=arguments.length,i=Array(e),o=0,a=r._,l=!1;e>o;)(i[o]=arguments[o++])===a&&(l=!0);return function(){var r,s=this,o=arguments,u=o.length,c=0,h=0;if(!l&&!u)return n(t,i,s);if(r=i.slice(),l)for(;e>c;c++)r[c]===a&&(r[c]=o[h++]);for(;u>h;)r.push(o[h++]);return n(t,r,s)}}},{"./$.a-function":2,"./$.invoke":32,"./$.path":56}],56:[function(t,e,i){e.exports=t("./$.global")},{"./$.global":28}],57:[function(t,e,i){e.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},{}],58:[function(t,e,i){var r=t("./$.global"),n=t("./$.hide"),s=t("./$.uid")("src"),o="toString",a=Function[o],l=(""+a).split(o);t("./$.core").inspectSource=function(t){return a.call(t)},(e.exports=function(t,e,i,o){"function"==typeof i&&(i.hasOwnProperty(s)||n(i,s,t[e]?""+t[e]:l.join(String(e))),i.hasOwnProperty("name")||n(i,"name",e)),t===r?t[e]=i:(o||delete t[e],n(t,e,i))})(Function.prototype,o,function(){return"function"==typeof this&&this[s]||a.call(this)})},{"./$.core":15,"./$.global":28,"./$.hide":30,"./$.uid":80}],59:[function(t,e,i){e.exports=function(t,e){var i=e===Object(e)?function(t){return e[t]}:e;return function(e){return String(e).replace(t,i)}}},{}],60:[function(t,e,i){e.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},{}],61:[function(t,e,i){var r=t("./$").getDesc,n=t("./$.is-object"),s=t("./$.an-object"),o=function(t,e){if(s(t),!n(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,i,n){try{n=t("./$.ctx")(Function.call,r(Object.prototype,"__proto__").set,2),n(e,[]),i=!(e instanceof Array)}catch(s){i=!0}return function(t,e){return o(t,e),i?t.__proto__=e:n(t,e),t}}({},!1):void 0),check:o}},{"./$":45,"./$.an-object":3,"./$.ctx":16,"./$.is-object":37}],62:[function(t,e,i){var r=t("./$.global"),n="__core-js_shared__",s=r[n]||(r[n]={});e.exports=function(t){return s[t]||(s[t]={})}},{"./$.global":28}],63:[function(t,e,i){e.exports=Math.sign||function(t){return 0==(t=+t)||t!=t?t:0>t?-1:1}},{}],64:[function(t,e,i){var r=t("./$.an-object"),n=t("./$.a-function"),s=t("./$.wks")("species");e.exports=function(t,e){var i,o=r(t).constructor;return void 0===o||void 0==(i=r(o)[s])?e:n(i)}},{"./$.a-function":2,"./$.an-object":3,"./$.wks":82}],65:[function(t,e,i){"use strict";var r=t("./$"),n=t("./$.wks")("species");e.exports=function(e){!t("./$.support-desc")||n in e||r.setDesc(e,n,{configurable:!0,get:function(){return this}})}},{"./$":45,"./$.support-desc":72,"./$.wks":82}],66:[function(t,e,i){e.exports=function(t,e,i){if(!(t instanceof e))throw TypeError(i+": use the 'new' operator!");return t}},{}],67:[function(t,e,i){var r=t("./$.to-integer"),n=t("./$.defined");e.exports=function(t){return function(e,i){var s,o,a=String(n(e)),l=r(i),u=a.length;return 0>l||l>=u?t?"":void 0:(s=a.charCodeAt(l),55296>s||s>56319||l+1===u||(o=a.charCodeAt(l+1))<56320||o>57343?t?a.charAt(l):s:t?a.slice(l,l+2):(s-55296<<10)+(o-56320)+65536)}}},{"./$.defined":18,"./$.to-integer":76}],68:[function(t,e,i){var r=t("./$.is-regexp"),n=t("./$.defined");e.exports=function(t,e,i){if(r(e))throw TypeError("String#"+i+" doesn't accept regex!");return String(n(t))}},{"./$.defined":18,"./$.is-regexp":38}],69:[function(t,e,i){var r=t("./$.to-length"),n=t("./$.string-repeat"),s=t("./$.defined");e.exports=function(t,e,i,o){var a=String(s(t)),l=a.length,u=void 0===i?" ":String(i),c=r(e);if(l>=c)return a;""==u&&(u=" ");var h=c-l,f=n.call(u,Math.ceil(h/u.length));return f.length>h&&(f=f.slice(0,h)),o?f+a:a+f}},{"./$.defined":18,"./$.string-repeat":70,"./$.to-length":78}],70:[function(t,e,i){"use strict";var r=t("./$.to-integer"),n=t("./$.defined");e.exports=function(t){var e=String(n(this)),i="",s=r(t);if(0>s||s==1/0)throw RangeError("Count can't be negative");for(;s>0;(s>>>=1)&&(e+=e))1&s&&(i+=e);return i}},{"./$.defined":18,"./$.to-integer":76}],71:[function(t,e,i){var r=function(t,e){return t=String(s(t)),1&e&&(t=t.replace(u,"")),2&e&&(t=t.replace(c,"")),t},n=t("./$.def"),s=t("./$.defined"),o="	\n\f\r   ᠎             　\u2028\u2029\ufeff",a="["+o+"]",l="​",u=RegExp("^"+a+a+"*"),c=RegExp(a+a+"*$");e.exports=function(e,i){var s={};s[e]=i(r),n(n.P+n.F*t("./$.fails")(function(){return!!o[e]()||l[e]()!=l}),"String",s)}},{"./$.def":17,"./$.defined":18,"./$.fails":23}],72:[function(t,e,i){e.exports=!t("./$.fails")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},{"./$.fails":23}],73:[function(t,e,i){var r=t("./$").setDesc,n=t("./$.has"),s=t("./$.wks")("toStringTag");e.exports=function(t,e,i){t&&!n(t=i?t:t.prototype,s)&&r(t,s,{configurable:!0,value:e})}},{"./$":45,"./$.has":29,"./$.wks":82}],74:[function(t,e,i){"use strict";var r,n,s,o=t("./$.ctx"),a=t("./$.invoke"),l=t("./$.html"),u=t("./$.dom-create"),c=t("./$.global"),h=c.process,f=c.setImmediate,d=c.clearImmediate,p=c.MessageChannel,m=0,_={},g="onreadystatechange",v=function(){var t=+this;if(_.hasOwnProperty(t)){var e=_[t];delete _[t],e()}},y=function(t){v.call(t.data)};f&&d||(f=function(t){for(var e=[],i=1;arguments.length>i;)e.push(arguments[i++]);return _[++m]=function(){a("function"==typeof t?t:Function(t),e)},r(m),m},d=function(t){delete _[t]},"process"==t("./$.cof")(h)?r=function(t){h.nextTick(o(v,t,1))}:p?(n=new p,s=n.port2,n.port1.onmessage=y,r=o(s.postMessage,s,1)):c.addEventListener&&"function"==typeof postMessage&&!c.importScripts?(r=function(t){c.postMessage(t+"","*")},c.addEventListener("message",y,!1)):r=g in u("script")?function(t){l.appendChild(u("script"))[g]=function(){l.removeChild(this),v.call(t)}}:function(t){setTimeout(o(v,t,1),0)}),e.exports={set:f,clear:d}},{"./$.cof":10,"./$.ctx":16,"./$.dom-create":19,"./$.global":28,"./$.html":31,"./$.invoke":32}],75:[function(t,e,i){var r=t("./$.to-integer"),n=Math.max,s=Math.min;e.exports=function(t,e){return t=r(t),0>t?n(t+e,0):s(t,e)}},{"./$.to-integer":76}],76:[function(t,e,i){var r=Math.ceil,n=Math.floor;e.exports=function(t){return isNaN(t=+t)?0:(t>0?n:r)(t)}},{}],77:[function(t,e,i){var r=t("./$.iobject"),n=t("./$.defined");e.exports=function(t){return r(n(t))}},{"./$.defined":18,"./$.iobject":33}],78:[function(t,e,i){var r=t("./$.to-integer"),n=Math.min;e.exports=function(t){return t>0?n(r(t),9007199254740991):0}},{"./$.to-integer":76}],79:[function(t,e,i){var r=t("./$.defined");e.exports=function(t){return Object(r(t))}},{"./$.defined":18}],80:[function(t,e,i){var r=0,n=Math.random();e.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++r+n).toString(36))}},{}],81:[function(t,e,i){var r=t("./$.wks")("unscopables");void 0==[][r]&&t("./$.hide")(Array.prototype,r,{}),e.exports=function(t){[][r][t]=!0}},{"./$.hide":30,"./$.wks":82}],82:[function(t,e,i){var r=t("./$.shared")("wks"),n=t("./$.global").Symbol;e.exports=function(e){return r[e]||(r[e]=n&&n[e]||(n||t("./$.uid"))("Symbol."+e))}},{"./$.global":28,"./$.shared":62,"./$.uid":80}],83:[function(t,e,i){var r=t("./$.global"),n=t("./$.core"),s=t("./$.def"),o=t("./$.partial");s(s.G+s.F,{delay:function(t){return new(n.Promise||r.Promise)(function(e){setTimeout(o.call(e,!0),t)})}})},{"./$.core":15,"./$.def":17,"./$.global":28,"./$.partial":55}],84:[function(t,e,i){"use strict";function r(t){var e=u.create(null);return void 0!=t&&(g(t)?_(t,!0,function(t,i){e[t]=i}):d(e,t)),e}function n(t,e,i){m(e);var r,n,s=$(t),o=w(s),a=o.length,l=0;if(arguments.length<3){if(!a)throw TypeError("Reduce of empty object with no initial value");r=s[o[l++]]}else r=Object(i);for(;a>l;)b(s,n=o[l++])&&(r=e(r,s[n],n,t));return r}function s(t,e){return void 0!==(e==e?p(t,e):P(t,function(t){return t!=t}))}function o(t,e){return b(t,e)?t[e]:void 0}function a(t,e,i){return x&&e in Object?u.setDesc(t,e,f(0,i)):t[e]=i,t}function l(t){return y(t)&&u.getProto(t)===r.prototype}var u=t("./$"),c=t("./$.ctx"),h=t("./$.def"),f=t("./$.property-desc"),d=t("./$.assign"),p=t("./$.keyof"),m=t("./$.a-function"),_=t("./$.for-of"),g=t("./core.is-iterable"),v=t("./$.iter-step"),y=t("./$.is-object"),$=t("./$.to-iobject"),x=t("./$.support-desc"),b=t("./$.has"),w=u.getKeys,T=function(t){var e=1==t,i=4==t;return function(n,s,o){var a,l,u,h=c(s,o,3),f=$(n),d=e||7==t||2==t?new("function"==typeof this?this:r):void 0;for(a in f)if(b(f,a)&&(l=f[a],u=h(l,a,n),t))if(e)d[a]=u;else if(u)switch(t){case 2:d[a]=l;break;case 3:return!0;case 5:return l;case 6:return a;case 7:d[u[0]]=u[1]}else if(i)return!1;return 3==t||i?i:d}},P=T(6),S=function(t){return function(e){return new k(e,t)}},k=function(t,e){this._t=$(t),this._a=w(t),this._i=0,this._k=e};t("./$.iter-create")(k,"Dict",function(){var t,e=this,i=e._t,r=e._a,n=e._k;do if(e._i>=r.length)return e._t=void 0,v(1);while(!b(i,t=r[e._i++]));return"keys"==n?v(0,t):"values"==n?v(0,i[t]):v(0,[t,i[t]])}),r.prototype=null,h(h.G+h.F,{Dict:r}),h(h.S,"Dict",{keys:S("keys"),values:S("values"),entries:S("entries"),forEach:T(0),map:T(1),filter:T(2),some:T(3),every:T(4),find:T(5),findKey:P,mapPairs:T(7),reduce:n,keyOf:p,includes:s,has:b,get:o,set:a,isDict:l})},{"./$":45,"./$.a-function":2,"./$.assign":8,"./$.ctx":16,"./$.def":17,"./$.for-of":26,"./$.has":29,"./$.is-object":37,"./$.iter-create":40,"./$.iter-step":43,"./$.keyof":46,"./$.property-desc":57,"./$.support-desc":72,"./$.to-iobject":77,"./core.is-iterable":88}],85:[function(t,e,i){"use strict";var r=t("./$.path"),n=t("./$.def");t("./$.core")._=r._=r._||{},n(n.P+n.F,"Function",{part:t("./$.partial")})},{"./$.core":15,"./$.def":17,"./$.partial":55,"./$.path":56}],86:[function(t,e,i){var r=t("./$.classof"),n=t("./$.wks")("iterator"),s=t("./$.iterators");e.exports=t("./$.core").getIteratorMethod=function(t){return void 0!=t?t[n]||t["@@iterator"]||s[r(t)]:void 0}},{"./$.classof":9,"./$.core":15,"./$.iterators":44,"./$.wks":82}],87:[function(t,e,i){var r=t("./$.an-object"),n=t("./core.get-iterator-method");e.exports=t("./$.core").getIterator=function(t){var e=n(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return r(e.call(t))}},{"./$.an-object":3,"./$.core":15,"./core.get-iterator-method":86}],88:[function(t,e,i){var r=t("./$.classof"),n=t("./$.wks")("iterator"),s=t("./$.iterators");e.exports=t("./$.core").isIterable=function(t){var e=Object(t);return n in e||"@@iterator"in e||s.hasOwnProperty(r(e))}},{"./$.classof":9,"./$.core":15,"./$.iterators":44,"./$.wks":82}],89:[function(t,e,i){var r=t("./$"),n=t("./$.global"),s=t("./$.def"),o={},a=!0;r.each.call("assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,isIndependentlyComposed,log,markTimeline,profile,profileEnd,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn".split(","),function(t){o[t]=function(){var e=n.console;return a&&e&&e[t]?Function.apply.call(e[t],e,arguments):void 0}}),s(s.G+s.F,{log:t("./$.assign")(o.log,o,{enable:function(){a=!0},disable:function(){a=!1}})})},{"./$":45,"./$.assign":8,"./$.def":17,"./$.global":28}],90:[function(t,e,i){"use strict";t("./$.iter-define")(Number,"Number",function(t){this._l=+t,this._i=0},function(){var t=this._i++,e=!(t<this._l);return{done:e,value:e?void 0:t}})},{"./$.iter-define":41}],91:[function(t,e,i){var r=t("./$.def");r(r.S+r.F,"Object",{classof:t("./$.classof")})},{"./$.classof":9,"./$.def":17}],92:[function(t,e,i){var r=t("./$.def"),n=t("./$.object-define");r(r.S+r.F,"Object",{define:n})},{"./$.def":17,"./$.object-define":51}],93:[function(t,e,i){var r=t("./$.def");r(r.S+r.F,"Object",{isObject:t("./$.is-object")})},{"./$.def":17,"./$.is-object":37}],94:[function(t,e,i){var r=t("./$.def"),n=t("./$").create,s=t("./$.object-define");r(r.S+r.F,"Object",{make:function(t,e){return s(n(t),e)}})},{"./$":45,"./$.def":17,"./$.object-define":51}],95:[function(t,e,i){"use strict";var r=t("./$.def"),n=t("./$.replacer")(/[&<>"']/g,{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"});r(r.P+r.F,"String",{escapeHTML:function(){return n(this)}})},{"./$.def":17,"./$.replacer":59}],96:[function(t,e,i){"use strict";var r=t("./$.def"),n=t("./$.replacer")(/&(?:amp|lt|gt|quot|apos);/g,{"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&apos;":"'"});r(r.P+r.F,"String",{unescapeHTML:function(){return n(this)}})},{"./$.def":17,"./$.replacer":59}],97:[function(t,e,i){"use strict";var r,n=t("./$"),s=t("./$.support-desc"),o=t("./$.property-desc"),a=t("./$.html"),l=t("./$.dom-create"),u=t("./$.has"),c=t("./$.cof"),h=t("./$.def"),f=t("./$.invoke"),d=t("./$.array-methods"),p=t("./$.uid")("__proto__"),m=t("./$.is-object"),_=t("./$.an-object"),g=t("./$.a-function"),v=t("./$.to-object"),y=t("./$.to-iobject"),$=t("./$.to-integer"),x=t("./$.to-index"),b=t("./$.to-length"),w=t("./$.iobject"),T=t("./$.fails"),P=Object.prototype,S=[],k=S.slice,O=S.join,R=n.setDesc,j=n.getDesc,A=n.setDescs,M=t("./$.array-includes")(!1),C={};s||(r=!T(function(){return 7!=R(l("div"),"a",{get:function(){return 7}}).a}),n.setDesc=function(t,e,i){if(r)try{return R(t,e,i)}catch(n){}if("get"in i||"set"in i)throw TypeError("Accessors not supported!");return"value"in i&&(_(t)[e]=i.value),t},n.getDesc=function(t,e){if(r)try{return j(t,e)}catch(i){}return u(t,e)?o(!P.propertyIsEnumerable.call(t,e),t[e]):void 0},n.setDescs=A=function(t,e){
_(t);for(var i,r=n.getKeys(e),s=r.length,o=0;s>o;)n.setDesc(t,i=r[o++],e[i]);return t}),h(h.S+h.F*!s,"Object",{getOwnPropertyDescriptor:n.getDesc,defineProperty:n.setDesc,defineProperties:A});var D="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","),F=D.concat("length","prototype"),E=D.length,z=function(){var t,e=l("iframe"),i=E,r=">";for(e.style.display="none",a.appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object</script"+r),t.close(),z=t.F;i--;)delete z.prototype[D[i]];return z()},I=function(t,e){return function(i){var r,n=y(i),s=0,o=[];for(r in n)r!=p&&u(n,r)&&o.push(r);for(;e>s;)u(n,r=t[s++])&&(~M(o,r)||o.push(r));return o}},N=function(){};h(h.S,"Object",{getPrototypeOf:n.getProto=n.getProto||function(t){return t=v(t),u(t,p)?t[p]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?P:null},getOwnPropertyNames:n.getNames=n.getNames||I(F,F.length,!0),create:n.create=n.create||function(t,e){var i;return null!==t?(N.prototype=_(t),i=new N,N.prototype=null,i[p]=t):i=z(),void 0===e?i:A(i,e)},keys:n.getKeys=n.getKeys||I(D,E,!1)});var L=function(t,e,i){if(!(e in C)){for(var r=[],n=0;e>n;n++)r[n]="a["+n+"]";C[e]=Function("F,a","return new F("+r.join(",")+")")}return C[e](t,i)};h(h.P,"Function",{bind:function(t){var e=g(this),i=k.call(arguments,1),r=function(){var n=i.concat(k.call(arguments));return this instanceof r?L(e,n.length,n):f(e,n,t)};return m(e.prototype)&&(r.prototype=e.prototype),r}});var X=T(function(){a&&k.call(a)});h(h.P+h.F*X,"Array",{slice:function(t,e){var i=b(this.length),r=c(this);if(e=void 0===e?i:e,"Array"==r)return k.call(this,t,e);for(var n=x(t,i),s=x(e,i),o=b(s-n),a=Array(o),l=0;o>l;l++)a[l]="String"==r?this.charAt(n+l):this[n+l];return a}}),h(h.P+h.F*(w!=Object),"Array",{join:function(){return O.apply(w(this),arguments)}}),h(h.S,"Array",{isArray:t("./$.is-array")});var B=function(t){return function(e,i){g(e);var r=w(this),n=b(r.length),s=t?n-1:0,o=t?-1:1;if(arguments.length<2)for(;;){if(s in r){i=r[s],s+=o;break}if(s+=o,t?0>s:s>=n)throw TypeError("Reduce of empty array with no initial value")}for(;t?s>=0:n>s;s+=o)s in r&&(i=e(i,r[s],s,this));return i}},U=function(t){return function(e){return t(this,e,arguments[1])}};h(h.P,"Array",{forEach:n.each=n.each||U(d(0)),map:U(d(1)),filter:U(d(2)),some:U(d(3)),every:U(d(4)),reduce:B(!1),reduceRight:B(!0),indexOf:U(M),lastIndexOf:function(t,e){var i=y(this),r=b(i.length),n=r-1;for(arguments.length>1&&(n=Math.min(n,$(e))),0>n&&(n=b(r+n));n>=0;n--)if(n in i&&i[n]===t)return n;return-1}}),h(h.S,"Date",{now:function(){return+new Date}});var Y=function(t){return t>9?t:"0"+t},G=new Date(-5e13-1),q=!(G.toISOString&&"0385-07-25T07:06:39.999Z"==G.toISOString()&&T(function(){new Date(NaN).toISOString()}));h(h.P+h.F*q,"Date",{toISOString:function(){if(!isFinite(this))throw RangeError("Invalid time value");var t=this,e=t.getUTCFullYear(),i=t.getUTCMilliseconds(),r=0>e?"-":e>9999?"+":"";return r+("00000"+Math.abs(e)).slice(r?-6:-4)+"-"+Y(t.getUTCMonth()+1)+"-"+Y(t.getUTCDate())+"T"+Y(t.getUTCHours())+":"+Y(t.getUTCMinutes())+":"+Y(t.getUTCSeconds())+"."+(i>99?i:"0"+Y(i))+"Z"}})},{"./$":45,"./$.a-function":2,"./$.an-object":3,"./$.array-includes":6,"./$.array-methods":7,"./$.cof":10,"./$.def":17,"./$.dom-create":19,"./$.fails":23,"./$.has":29,"./$.html":31,"./$.invoke":32,"./$.iobject":33,"./$.is-array":35,"./$.is-object":37,"./$.property-desc":57,"./$.support-desc":72,"./$.to-index":75,"./$.to-integer":76,"./$.to-iobject":77,"./$.to-length":78,"./$.to-object":79,"./$.uid":80}],98:[function(t,e,i){"use strict";var r=t("./$.def");r(r.P,"Array",{copyWithin:t("./$.array-copy-within")}),t("./$.unscope")("copyWithin")},{"./$.array-copy-within":4,"./$.def":17,"./$.unscope":81}],99:[function(t,e,i){var r=t("./$.def");r(r.P,"Array",{fill:t("./$.array-fill")}),t("./$.unscope")("fill")},{"./$.array-fill":5,"./$.def":17,"./$.unscope":81}],100:[function(t,e,i){"use strict";var r="findIndex",n=t("./$.def"),s=!0,o=t("./$.array-methods")(6);r in[]&&Array(1)[r](function(){s=!1}),n(n.P+n.F*s,"Array",{findIndex:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),t("./$.unscope")(r)},{"./$.array-methods":7,"./$.def":17,"./$.unscope":81}],101:[function(t,e,i){"use strict";var r="find",n=t("./$.def"),s=!0,o=t("./$.array-methods")(5);r in[]&&Array(1)[r](function(){s=!1}),n(n.P+n.F*s,"Array",{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),t("./$.unscope")(r)},{"./$.array-methods":7,"./$.def":17,"./$.unscope":81}],102:[function(t,e,i){"use strict";var r=t("./$.ctx"),n=t("./$.def"),s=t("./$.to-object"),o=t("./$.iter-call"),a=t("./$.is-array-iter"),l=t("./$.to-length"),u=t("./core.get-iterator-method");n(n.S+n.F*!t("./$.iter-detect")(function(t){Array.from(t)}),"Array",{from:function(t){var e,i,n,c,h=s(t),f="function"==typeof this?this:Array,d=arguments,p=d.length,m=p>1?d[1]:void 0,_=void 0!==m,g=0,v=u(h);if(_&&(m=r(m,p>2?d[2]:void 0,2)),void 0==v||f==Array&&a(v))for(e=l(h.length),i=new f(e);e>g;g++)i[g]=_?m(h[g],g):h[g];else for(c=v.call(h),i=new f;!(n=c.next()).done;g++)i[g]=_?o(c,m,[n.value,g],!0):n.value;return i.length=g,i}})},{"./$.ctx":16,"./$.def":17,"./$.is-array-iter":34,"./$.iter-call":39,"./$.iter-detect":42,"./$.to-length":78,"./$.to-object":79,"./core.get-iterator-method":86}],103:[function(t,e,i){"use strict";var r=t("./$.unscope"),n=t("./$.iter-step"),s=t("./$.iterators"),o=t("./$.to-iobject");t("./$.iter-define")(Array,"Array",function(t,e){this._t=o(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,i=this._i++;return!t||i>=t.length?(this._t=void 0,n(1)):"keys"==e?n(0,i):"values"==e?n(0,t[i]):n(0,[i,t[i]])},"values"),s.Arguments=s.Array,r("keys"),r("values"),r("entries")},{"./$.iter-define":41,"./$.iter-step":43,"./$.iterators":44,"./$.to-iobject":77,"./$.unscope":81}],104:[function(t,e,i){"use strict";var r=t("./$.def");r(r.S+r.F*t("./$.fails")(function(){function t(){}return!(Array.of.call(t)instanceof t)}),"Array",{of:function(){for(var t=0,e=arguments,i=e.length,r=new("function"==typeof this?this:Array)(i);i>t;)r[t]=e[t++];return r.length=i,r}})},{"./$.def":17,"./$.fails":23}],105:[function(t,e,i){t("./$.species")(Array)},{"./$.species":65}],106:[function(t,e,i){"use strict";var r=t("./$"),n=t("./$.is-object"),s=t("./$.wks")("hasInstance"),o=Function.prototype;s in o||r.setDesc(o,s,{value:function(t){if("function"!=typeof this||!n(t))return!1;if(!n(this.prototype))return t instanceof this;for(;t=r.getProto(t);)if(this.prototype===t)return!0;return!1}})},{"./$":45,"./$.is-object":37,"./$.wks":82}],107:[function(t,e,i){var r=t("./$").setDesc,n=t("./$.property-desc"),s=t("./$.has"),o=Function.prototype,a=/^\s*function ([^ (]*)/,l="name";l in o||t("./$.support-desc")&&r(o,l,{configurable:!0,get:function(){var t=(""+this).match(a),e=t?t[1]:"";return s(this,l)||r(this,l,n(5,e)),e}})},{"./$":45,"./$.has":29,"./$.property-desc":57,"./$.support-desc":72}],108:[function(t,e,i){"use strict";var r=t("./$.collection-strong");t("./$.collection")("Map",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{get:function(t){var e=r.getEntry(this,t);return e&&e.v},set:function(t,e){return r.def(this,0===t?0:t,e)}},r,!0)},{"./$.collection":14,"./$.collection-strong":11}],109:[function(t,e,i){var r=t("./$.def"),n=t("./$.log1p"),s=Math.sqrt,o=Math.acosh;r(r.S+r.F*!(o&&710==Math.floor(o(Number.MAX_VALUE))),"Math",{acosh:function(t){return(t=+t)<1?NaN:t>94906265.62425156?Math.log(t)+Math.LN2:n(t-1+s(t-1)*s(t+1))}})},{"./$.def":17,"./$.log1p":48}],110:[function(t,e,i){function r(t){return isFinite(t=+t)&&0!=t?0>t?-r(-t):Math.log(t+Math.sqrt(t*t+1)):t}var n=t("./$.def");n(n.S,"Math",{asinh:r})},{"./$.def":17}],111:[function(t,e,i){var r=t("./$.def");r(r.S,"Math",{atanh:function(t){return 0==(t=+t)?t:Math.log((1+t)/(1-t))/2}})},{"./$.def":17}],112:[function(t,e,i){var r=t("./$.def"),n=t("./$.sign");r(r.S,"Math",{cbrt:function(t){return n(t=+t)*Math.pow(Math.abs(t),1/3)}})},{"./$.def":17,"./$.sign":63}],113:[function(t,e,i){var r=t("./$.def");r(r.S,"Math",{clz32:function(t){return(t>>>=0)?31-Math.floor(Math.log(t+.5)*Math.LOG2E):32}})},{"./$.def":17}],114:[function(t,e,i){var r=t("./$.def"),n=Math.exp;r(r.S,"Math",{cosh:function(t){return(n(t=+t)+n(-t))/2}})},{"./$.def":17}],115:[function(t,e,i){var r=t("./$.def");r(r.S,"Math",{expm1:t("./$.expm1")})},{"./$.def":17,"./$.expm1":21}],116:[function(t,e,i){var r=t("./$.def"),n=t("./$.sign"),s=Math.pow,o=s(2,-52),a=s(2,-23),l=s(2,127)*(2-a),u=s(2,-126),c=function(t){return t+1/o-1/o};r(r.S,"Math",{fround:function(t){var e,i,r=Math.abs(t),s=n(t);return u>r?s*c(r/u/a)*u*a:(e=(1+a/o)*r,i=e-(e-r),i>l||i!=i?s*(1/0):s*i)}})},{"./$.def":17,"./$.sign":63}],117:[function(t,e,i){var r=t("./$.def"),n=Math.abs;r(r.S,"Math",{hypot:function(t,e){for(var i,r,s=0,o=0,a=arguments,l=a.length,u=0;l>o;)i=n(a[o++]),i>u?(r=u/i,s=s*r*r+1,u=i):i>0?(r=i/u,s+=r*r):s+=i;return u===1/0?1/0:u*Math.sqrt(s)}})},{"./$.def":17}],118:[function(t,e,i){var r=t("./$.def"),n=Math.imul;r(r.S+r.F*t("./$.fails")(function(){return-5!=n(4294967295,5)||2!=n.length}),"Math",{imul:function(t,e){var i=65535,r=+t,n=+e,s=i&r,o=i&n;return 0|s*o+((i&r>>>16)*o+s*(i&n>>>16)<<16>>>0)}})},{"./$.def":17,"./$.fails":23}],119:[function(t,e,i){var r=t("./$.def");r(r.S,"Math",{log10:function(t){return Math.log(t)/Math.LN10}})},{"./$.def":17}],120:[function(t,e,i){var r=t("./$.def");r(r.S,"Math",{log1p:t("./$.log1p")})},{"./$.def":17,"./$.log1p":48}],121:[function(t,e,i){var r=t("./$.def");r(r.S,"Math",{log2:function(t){return Math.log(t)/Math.LN2}})},{"./$.def":17}],122:[function(t,e,i){var r=t("./$.def");r(r.S,"Math",{sign:t("./$.sign")})},{"./$.def":17,"./$.sign":63}],123:[function(t,e,i){var r=t("./$.def"),n=t("./$.expm1"),s=Math.exp;r(r.S+r.F*t("./$.fails")(function(){return-2e-17!=!Math.sinh(-2e-17)}),"Math",{sinh:function(t){return Math.abs(t=+t)<1?(n(t)-n(-t))/2:(s(t-1)-s(-t-1))*(Math.E/2)}})},{"./$.def":17,"./$.expm1":21,"./$.fails":23}],124:[function(t,e,i){var r=t("./$.def"),n=t("./$.expm1"),s=Math.exp;r(r.S,"Math",{tanh:function(t){var e=n(t=+t),i=n(-t);return e==1/0?1:i==1/0?-1:(e-i)/(s(t)+s(-t))}})},{"./$.def":17,"./$.expm1":21}],125:[function(t,e,i){var r=t("./$.def");r(r.S,"Math",{trunc:function(t){return(t>0?Math.floor:Math.ceil)(t)}})},{"./$.def":17}],126:[function(t,e,i){"use strict";var r=t("./$"),n=t("./$.global"),s=t("./$.has"),o=t("./$.cof"),a=t("./$.is-object"),l=t("./$.fails"),u="Number",c=n[u],h=c,f=c.prototype,d=o(r.create(f))==u,p=function(t){var e,i;if("function"==typeof(e=t.valueOf)&&!a(i=e.call(t)))return i;if("function"==typeof(e=t.toString)&&!a(i=e.call(t)))return i;throw TypeError("Can't convert object to number")},m=function(t){if(a(t)&&(t=p(t)),"string"==typeof t&&t.length>2&&48==t.charCodeAt(0)){var e=!1;switch(t.charCodeAt(1)){case 66:case 98:e=!0;case 79:case 111:return parseInt(t.slice(2),e?2:8)}}return+t};c("0o1")&&c("0b1")||(c=function(t){var e=this;return e instanceof c&&(d?l(function(){f.valueOf.call(e)}):o(e)!=u)?new h(m(t)):m(t)},r.each.call(t("./$.support-desc")?r.getNames(h):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),function(t){s(h,t)&&!s(c,t)&&r.setDesc(c,t,r.getDesc(h,t))}),c.prototype=f,f.constructor=c,t("./$.redef")(n,u,c))},{"./$":45,"./$.cof":10,"./$.fails":23,"./$.global":28,"./$.has":29,"./$.is-object":37,"./$.redef":58,"./$.support-desc":72}],127:[function(t,e,i){var r=t("./$.def");r(r.S,"Number",{EPSILON:Math.pow(2,-52)})},{"./$.def":17}],128:[function(t,e,i){var r=t("./$.def"),n=t("./$.global").isFinite;r(r.S,"Number",{isFinite:function(t){return"number"==typeof t&&n(t)}})},{"./$.def":17,"./$.global":28}],129:[function(t,e,i){var r=t("./$.def");r(r.S,"Number",{isInteger:t("./$.is-integer")})},{"./$.def":17,"./$.is-integer":36}],130:[function(t,e,i){var r=t("./$.def");r(r.S,"Number",{isNaN:function(t){return t!=t}})},{"./$.def":17}],131:[function(t,e,i){var r=t("./$.def"),n=t("./$.is-integer"),s=Math.abs;r(r.S,"Number",{isSafeInteger:function(t){return n(t)&&s(t)<=9007199254740991}})},{"./$.def":17,"./$.is-integer":36}],132:[function(t,e,i){var r=t("./$.def");r(r.S,"Number",{MAX_SAFE_INTEGER:9007199254740991})},{"./$.def":17}],133:[function(t,e,i){var r=t("./$.def");r(r.S,"Number",{MIN_SAFE_INTEGER:-9007199254740991})},{"./$.def":17}],134:[function(t,e,i){var r=t("./$.def");r(r.S,"Number",{parseFloat:parseFloat})},{"./$.def":17}],135:[function(t,e,i){var r=t("./$.def");r(r.S,"Number",{parseInt:parseInt})},{"./$.def":17}],136:[function(t,e,i){var r=t("./$.def");r(r.S+r.F,"Object",{assign:t("./$.assign")})},{"./$.assign":8,"./$.def":17}],137:[function(t,e,i){var r=t("./$.is-object");t("./$.object-sap")("freeze",function(t){return function(e){return t&&r(e)?t(e):e}})},{"./$.is-object":37,"./$.object-sap":52}],138:[function(t,e,i){var r=t("./$.to-iobject");t("./$.object-sap")("getOwnPropertyDescriptor",function(t){return function(e,i){return t(r(e),i)}})},{"./$.object-sap":52,"./$.to-iobject":77}],139:[function(t,e,i){t("./$.object-sap")("getOwnPropertyNames",function(){return t("./$.get-names").get})},{"./$.get-names":27,"./$.object-sap":52}],140:[function(t,e,i){var r=t("./$.to-object");t("./$.object-sap")("getPrototypeOf",function(t){return function(e){return t(r(e))}})},{"./$.object-sap":52,"./$.to-object":79}],141:[function(t,e,i){var r=t("./$.is-object");t("./$.object-sap")("isExtensible",function(t){return function(e){return r(e)?t?t(e):!0:!1}})},{"./$.is-object":37,"./$.object-sap":52}],142:[function(t,e,i){var r=t("./$.is-object");t("./$.object-sap")("isFrozen",function(t){return function(e){return r(e)?t?t(e):!1:!0}})},{"./$.is-object":37,"./$.object-sap":52}],143:[function(t,e,i){var r=t("./$.is-object");t("./$.object-sap")("isSealed",function(t){return function(e){return r(e)?t?t(e):!1:!0}})},{"./$.is-object":37,"./$.object-sap":52}],144:[function(t,e,i){var r=t("./$.def");r(r.S,"Object",{is:t("./$.same")})},{"./$.def":17,"./$.same":60}],145:[function(t,e,i){var r=t("./$.to-object");t("./$.object-sap")("keys",function(t){return function(e){return t(r(e))}})},{"./$.object-sap":52,"./$.to-object":79}],146:[function(t,e,i){var r=t("./$.is-object");t("./$.object-sap")("preventExtensions",function(t){return function(e){return t&&r(e)?t(e):e}})},{"./$.is-object":37,"./$.object-sap":52}],147:[function(t,e,i){var r=t("./$.is-object");t("./$.object-sap")("seal",function(t){return function(e){return t&&r(e)?t(e):e}})},{"./$.is-object":37,"./$.object-sap":52}],148:[function(t,e,i){var r=t("./$.def");r(r.S,"Object",{setPrototypeOf:t("./$.set-proto").set})},{"./$.def":17,"./$.set-proto":61}],149:[function(t,e,i){"use strict";var r=t("./$.classof"),n={};n[t("./$.wks")("toStringTag")]="z",n+""!="[object z]"&&t("./$.redef")(Object.prototype,"toString",function(){return"[object "+r(this)+"]"},!0)},{"./$.classof":9,"./$.redef":58,"./$.wks":82}],150:[function(t,e,i){"use strict";var r,n=t("./$"),s=t("./$.library"),o=t("./$.global"),a=t("./$.ctx"),l=t("./$.classof"),u=t("./$.def"),c=t("./$.is-object"),h=t("./$.an-object"),f=t("./$.a-function"),d=t("./$.strict-new"),p=t("./$.for-of"),m=t("./$.set-proto").set,_=t("./$.same"),g=t("./$.species"),v=t("./$.wks")("species"),y=t("./$.species-constructor"),$=t("./$.uid")("record"),x=t("./$.microtask"),b="Promise",w=o.process,T="process"==l(w),P=o[b],S=function(t){var e=new P(function(){});return t&&(e.constructor=Object),P.resolve(e)===e},k=function(){function e(t){var i=new P(t);return m(i,e.prototype),i}var i=!1;try{if(i=P&&P.resolve&&S(),m(e,P),e.prototype=n.create(P.prototype,{constructor:{value:e}}),e.resolve(5).then(function(){})instanceof e||(i=!1),i&&t("./$.support-desc")){var r=!1;P.resolve(n.setDesc({},"then",{get:function(){r=!0}})),i=r}}catch(s){i=!1}return i}(),O=function(t){return c(t)&&(k?"Promise"==l(t):$ in t)},R=function(t,e){return s&&t===P&&e===r?!0:_(t,e)},j=function(t){var e=h(t)[v];return void 0!=e?e:t},A=function(t){var e;return c(t)&&"function"==typeof(e=t.then)?e:!1},M=function(t,e){if(!t.n){t.n=!0;var i=t.c;x(function(){for(var r=t.v,n=1==t.s,s=0,a=function(e){var i,s,o=n?e.ok:e.fail;try{o?(n||(t.h=!0),i=o===!0?r:o(r),i===e.P?e.rej(TypeError("Promise-chain cycle")):(s=A(i))?s.call(i,e.res,e.rej):e.res(i)):e.rej(r)}catch(a){e.rej(a)}};i.length>s;)a(i[s++]);i.length=0,t.n=!1,e&&setTimeout(function(){var e,i,n=t.p;C(n)&&(T?w.emit("unhandledRejection",r,n):(e=o.onunhandledrejection)?e({promise:n,reason:r}):(i=o.console)&&i.error&&i.error("Unhandled promise rejection",r)),t.a=void 0},1)})}},C=function(t){var e,i=t[$],r=i.a||i.c,n=0;if(i.h)return!1;for(;r.length>n;)if(e=r[n++],e.fail||!C(e.P))return!1;return!0},D=function(t){var e=this;e.d||(e.d=!0,e=e.r||e,e.v=t,e.s=2,e.a=e.c.slice(),M(e,!0))},F=function(t){var e,i=this;if(!i.d){i.d=!0,i=i.r||i;try{(e=A(t))?x(function(){var r={r:i,d:!1};try{e.call(t,a(F,r,1),a(D,r,1))}catch(n){D.call(r,n)}}):(i.v=t,i.s=1,M(i,!1))}catch(r){D.call({r:i,d:!1},r)}}};k||(P=function(t){f(t);var e={p:d(this,P,b),c:[],a:void 0,s:0,d:!1,v:void 0,h:!1,n:!1};this[$]=e;try{t(a(F,e,1),a(D,e,1))}catch(i){D.call(e,i)}},t("./$.mix")(P.prototype,{then:function(t,e){var i={ok:"function"==typeof t?t:!0,fail:"function"==typeof e?e:!1},r=i.P=new(y(this,P))(function(t,e){i.res=t,i.rej=e});f(i.res),f(i.rej);var n=this[$];return n.c.push(i),n.a&&n.a.push(i),n.s&&M(n,!1),r},"catch":function(t){return this.then(void 0,t)}})),u(u.G+u.W+u.F*!k,{Promise:P}),t("./$.tag")(P,b),g(P),g(r=t("./$.core")[b]),u(u.S+u.F*!k,b,{reject:function(t){return new this(function(e,i){i(t)})}}),u(u.S+u.F*(!k||S(!0)),b,{resolve:function(t){return O(t)&&R(t.constructor,this)?t:new this(function(e){e(t)})}}),u(u.S+u.F*!(k&&t("./$.iter-detect")(function(t){P.all(t)["catch"](function(){})})),b,{all:function(t){var e=j(this),i=[];return new e(function(r,s){p(t,!1,i.push,i);var o=i.length,a=Array(o);o?n.each.call(i,function(t,i){e.resolve(t).then(function(t){a[i]=t,--o||r(a)},s)}):r(a)})},race:function(t){var e=j(this);return new e(function(i,r){p(t,!1,function(t){e.resolve(t).then(i,r)})})}})},{"./$":45,"./$.a-function":2,"./$.an-object":3,"./$.classof":9,"./$.core":15,"./$.ctx":16,"./$.def":17,"./$.for-of":26,"./$.global":28,"./$.is-object":37,"./$.iter-detect":42,"./$.library":47,"./$.microtask":49,"./$.mix":50,"./$.same":60,"./$.set-proto":61,"./$.species":65,"./$.species-constructor":64,"./$.strict-new":66,"./$.support-desc":72,"./$.tag":73,"./$.uid":80,"./$.wks":82}],151:[function(t,e,i){var r=t("./$.def"),n=Function.apply;r(r.S,"Reflect",{apply:function(t,e,i){return n.call(t,e,i)}})},{"./$.def":17}],152:[function(t,e,i){var r=t("./$"),n=t("./$.def"),s=t("./$.a-function"),o=t("./$.an-object"),a=t("./$.is-object"),l=Function.bind||t("./$.core").Function.prototype.bind;n(n.S+n.F*t("./$.fails")(function(){function t(){}return!(Reflect.construct(function(){},[],t)instanceof t)}),"Reflect",{construct:function(t,e){s(t);var i=arguments.length<3?t:s(arguments[2]);if(t==i){if(void 0!=e)switch(o(e).length){case 0:return new t;case 1:return new t(e[0]);case 2:return new t(e[0],e[1]);case 3:return new t(e[0],e[1],e[2]);case 4:return new t(e[0],e[1],e[2],e[3])}var n=[null];return n.push.apply(n,e),new(l.apply(t,n))}var u=i.prototype,c=r.create(a(u)?u:Object.prototype),h=Function.apply.call(t,c,e);return a(h)?h:c}})},{"./$":45,"./$.a-function":2,"./$.an-object":3,"./$.core":15,"./$.def":17,"./$.fails":23,"./$.is-object":37}],153:[function(t,e,i){var r=t("./$"),n=t("./$.def"),s=t("./$.an-object");n(n.S+n.F*t("./$.fails")(function(){Reflect.defineProperty(r.setDesc({},1,{value:1}),1,{value:2})}),"Reflect",{defineProperty:function(t,e,i){s(t);try{return r.setDesc(t,e,i),!0}catch(n){return!1}}})},{"./$":45,"./$.an-object":3,"./$.def":17,"./$.fails":23}],154:[function(t,e,i){var r=t("./$.def"),n=t("./$").getDesc,s=t("./$.an-object");r(r.S,"Reflect",{deleteProperty:function(t,e){var i=n(s(t),e);return i&&!i.configurable?!1:delete t[e]}})},{"./$":45,"./$.an-object":3,"./$.def":17}],155:[function(t,e,i){"use strict";var r=t("./$.def"),n=t("./$.an-object"),s=function(t){this._t=n(t),this._i=0;var e,i=this._k=[];for(e in t)i.push(e)};t("./$.iter-create")(s,"Object",function(){var t,e=this,i=e._k;do if(e._i>=i.length)return{value:void 0,done:!0};while(!((t=i[e._i++])in e._t));return{value:t,done:!1}}),r(r.S,"Reflect",{enumerate:function(t){return new s(t)}})},{"./$.an-object":3,"./$.def":17,"./$.iter-create":40}],156:[function(t,e,i){var r=t("./$"),n=t("./$.def"),s=t("./$.an-object");n(n.S,"Reflect",{getOwnPropertyDescriptor:function(t,e){return r.getDesc(s(t),e)}})},{"./$":45,"./$.an-object":3,"./$.def":17}],157:[function(t,e,i){var r=t("./$.def"),n=t("./$").getProto,s=t("./$.an-object");r(r.S,"Reflect",{getPrototypeOf:function(t){return n(s(t))}})},{"./$":45,"./$.an-object":3,"./$.def":17}],158:[function(t,e,i){function r(t,e){var i,o,u=arguments.length<3?t:arguments[2];return l(t)===u?t[e]:(i=n.getDesc(t,e))?s(i,"value")?i.value:void 0!==i.get?i.get.call(u):void 0:a(o=n.getProto(t))?r(o,e,u):void 0}var n=t("./$"),s=t("./$.has"),o=t("./$.def"),a=t("./$.is-object"),l=t("./$.an-object");o(o.S,"Reflect",{get:r})},{"./$":45,"./$.an-object":3,"./$.def":17,"./$.has":29,"./$.is-object":37}],159:[function(t,e,i){var r=t("./$.def");r(r.S,"Reflect",{has:function(t,e){return e in t}})},{"./$.def":17}],160:[function(t,e,i){var r=t("./$.def"),n=t("./$.an-object"),s=Object.isExtensible;r(r.S,"Reflect",{isExtensible:function(t){return n(t),s?s(t):!0}})},{"./$.an-object":3,"./$.def":17}],161:[function(t,e,i){var r=t("./$.def");r(r.S,"Reflect",{ownKeys:t("./$.own-keys")})},{"./$.def":17,"./$.own-keys":54}],162:[function(t,e,i){var r=t("./$.def"),n=t("./$.an-object"),s=Object.preventExtensions;r(r.S,"Reflect",{preventExtensions:function(t){n(t);try{return s&&s(t),!0}catch(e){return!1}}})},{"./$.an-object":3,"./$.def":17}],163:[function(t,e,i){var r=t("./$.def"),n=t("./$.set-proto");n&&r(r.S,"Reflect",{setPrototypeOf:function(t,e){n.check(t,e);try{return n.set(t,e),!0}catch(i){return!1}}})},{"./$.def":17,"./$.set-proto":61}],164:[function(t,e,i){function r(t,e,i){var o,c,h=arguments.length<4?t:arguments[3],f=n.getDesc(l(t),e);if(!f){if(u(c=n.getProto(t)))return r(c,e,i,h);f=a(0)}return s(f,"value")?f.writable!==!1&&u(h)?(o=n.getDesc(h,e)||a(0),o.value=i,n.setDesc(h,e,o),!0):!1:void 0===f.set?!1:(f.set.call(h,i),!0)}var n=t("./$"),s=t("./$.has"),o=t("./$.def"),a=t("./$.property-desc"),l=t("./$.an-object"),u=t("./$.is-object");o(o.S,"Reflect",{set:r})},{"./$":45,"./$.an-object":3,"./$.def":17,"./$.has":29,"./$.is-object":37,"./$.property-desc":57}],165:[function(t,e,i){var r=t("./$"),n=t("./$.global"),s=t("./$.is-regexp"),o=t("./$.flags"),a=n.RegExp,l=a,u=a.prototype,c=/a/g,h=/a/g,f=new a(c)!==c;!t("./$.support-desc")||f&&!t("./$.fails")(function(){return h[t("./$.wks")("match")]=!1,a(c)!=c||a(h)==h||"/a/i"!=a(c,"i")})||(a=function(t,e){var i=s(t),r=void 0===e;return this instanceof a||!i||t.constructor!==a||!r?f?new l(i&&!r?t.source:t,e):l((i=t instanceof a)?t.source:t,i&&r?o.call(t):e):t},r.each.call(r.getNames(l),function(t){t in a||r.setDesc(a,t,{configurable:!0,get:function(){return l[t]},set:function(e){l[t]=e}})}),u.constructor=a,a.prototype=u,t("./$.redef")(n,"RegExp",a)),t("./$.species")(a)},{"./$":45,"./$.fails":23,"./$.flags":25,"./$.global":28,"./$.is-regexp":38,"./$.redef":58,"./$.species":65,"./$.support-desc":72,"./$.wks":82}],166:[function(t,e,i){var r=t("./$");t("./$.support-desc")&&"g"!=/./g.flags&&r.setDesc(RegExp.prototype,"flags",{configurable:!0,get:t("./$.flags")})},{"./$":45,"./$.flags":25,"./$.support-desc":72}],167:[function(t,e,i){t("./$.fix-re-wks")("match",1,function(t,e){return function(i){"use strict";var r=t(this),n=void 0==i?void 0:i[e];return void 0!==n?n.call(i,r):new RegExp(i)[e](String(r))}})},{"./$.fix-re-wks":24}],168:[function(t,e,i){t("./$.fix-re-wks")("replace",2,function(t,e,i){return function(r,n){"use strict";var s=t(this),o=void 0==r?void 0:r[e];return void 0!==o?o.call(r,s,n):i.call(String(s),r,n)}})},{"./$.fix-re-wks":24}],169:[function(t,e,i){t("./$.fix-re-wks")("search",1,function(t,e){return function(i){"use strict";var r=t(this),n=void 0==i?void 0:i[e];return void 0!==n?n.call(i,r):new RegExp(i)[e](String(r))}})},{"./$.fix-re-wks":24}],170:[function(t,e,i){t("./$.fix-re-wks")("split",2,function(t,e,i){return function(r,n){"use strict";var s=t(this),o=void 0==r?void 0:r[e];return void 0!==o?o.call(r,s,n):i.call(String(s),r,n)}})},{"./$.fix-re-wks":24}],171:[function(t,e,i){"use strict";var r=t("./$.collection-strong");t("./$.collection")("Set",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function(t){return r.def(this,t=0===t?0:t,t)}},r)},{"./$.collection":14,"./$.collection-strong":11}],172:[function(t,e,i){"use strict";var r=t("./$.def"),n=t("./$.string-at")(!1);r(r.P,"String",{codePointAt:function(t){return n(this,t)}})},{"./$.def":17,"./$.string-at":67}],173:[function(t,e,i){"use strict";var r=t("./$.def"),n=t("./$.to-length"),s=t("./$.string-context"),o="endsWith",a=""[o];r(r.P+r.F*t("./$.fails-is-regexp")(o),"String",{endsWith:function(t){var e=s(this,t,o),i=arguments,r=i.length>1?i[1]:void 0,l=n(e.length),u=void 0===r?l:Math.min(n(r),l),c=String(t);return a?a.call(e,c,u):e.slice(u-c.length,u)===c}})},{"./$.def":17,"./$.fails-is-regexp":22,"./$.string-context":68,"./$.to-length":78}],174:[function(t,e,i){var r=t("./$.def"),n=t("./$.to-index"),s=String.fromCharCode,o=String.fromCodePoint;r(r.S+r.F*(!!o&&1!=o.length),"String",{fromCodePoint:function(t){for(var e,i=[],r=arguments,o=r.length,a=0;o>a;){if(e=+r[a++],n(e,1114111)!==e)throw RangeError(e+" is not a valid code point");i.push(65536>e?s(e):s(((e-=65536)>>10)+55296,e%1024+56320))}return i.join("")}})},{"./$.def":17,"./$.to-index":75}],175:[function(t,e,i){"use strict";var r=t("./$.def"),n=t("./$.string-context"),s="includes";r(r.P+r.F*t("./$.fails-is-regexp")(s),"String",{includes:function(t){return!!~n(this,t,s).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},{"./$.def":17,"./$.fails-is-regexp":22,"./$.string-context":68}],176:[function(t,e,i){"use strict";var r=t("./$.string-at")(!0);t("./$.iter-define")(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,i=this._i;return i>=e.length?{value:void 0,done:!0}:(t=r(e,i),this._i+=t.length,{value:t,done:!1})})},{"./$.iter-define":41,"./$.string-at":67}],177:[function(t,e,i){var r=t("./$.def"),n=t("./$.to-iobject"),s=t("./$.to-length");r(r.S,"String",{raw:function(t){for(var e=n(t.raw),i=s(e.length),r=arguments,o=r.length,a=[],l=0;i>l;)a.push(String(e[l++])),o>l&&a.push(String(r[l]));return a.join("")}})},{"./$.def":17,"./$.to-iobject":77,"./$.to-length":78}],178:[function(t,e,i){var r=t("./$.def");r(r.P,"String",{repeat:t("./$.string-repeat")})},{"./$.def":17,"./$.string-repeat":70}],179:[function(t,e,i){"use strict";var r=t("./$.def"),n=t("./$.to-length"),s=t("./$.string-context"),o="startsWith",a=""[o];r(r.P+r.F*t("./$.fails-is-regexp")(o),"String",{startsWith:function(t){var e=s(this,t,o),i=arguments,r=n(Math.min(i.length>1?i[1]:void 0,e.length)),l=String(t);return a?a.call(e,l,r):e.slice(r,r+l.length)===l}})},{"./$.def":17,"./$.fails-is-regexp":22,"./$.string-context":68,"./$.to-length":78}],180:[function(t,e,i){"use strict";t("./$.string-trim")("trim",function(t){return function(){return t(this,3)}})},{"./$.string-trim":71}],181:[function(t,e,i){"use strict";var r=t("./$"),n=t("./$.global"),s=t("./$.has"),o=t("./$.support-desc"),a=t("./$.def"),l=t("./$.redef"),u=t("./$.fails"),c=t("./$.shared"),h=t("./$.tag"),f=t("./$.uid"),d=t("./$.wks"),p=t("./$.keyof"),m=t("./$.get-names"),_=t("./$.enum-keys"),g=t("./$.is-array"),v=t("./$.an-object"),y=t("./$.to-iobject"),$=t("./$.property-desc"),x=r.getDesc,b=r.setDesc,w=r.create,T=m.get,P=n.Symbol,S=n.JSON,k=S&&S.stringify,O=!1,R=d("_hidden"),j=r.isEnum,A=c("symbol-registry"),M=c("symbols"),C="function"==typeof P,D=Object.prototype,F=o&&u(function(){return 7!=w(b({},"a",{get:function(){return b(this,"a",{value:7}).a}})).a})?function(t,e,i){var r=x(D,e);r&&delete D[e],b(t,e,i),r&&t!==D&&b(D,e,r)}:b,E=function(t){var e=M[t]=w(P.prototype);return e._k=t,o&&O&&F(D,t,{configurable:!0,set:function(e){s(this,R)&&s(this[R],t)&&(this[R][t]=!1),F(this,t,$(1,e))}}),e},z=function(t){return"symbol"==typeof t},I=function(t,e,i){return i&&s(M,e)?(i.enumerable?(s(t,R)&&t[R][e]&&(t[R][e]=!1),i=w(i,{enumerable:$(0,!1)})):(s(t,R)||b(t,R,$(1,{})),t[R][e]=!0),F(t,e,i)):b(t,e,i)},N=function(t,e){v(t);for(var i,r=_(e=y(e)),n=0,s=r.length;s>n;)I(t,i=r[n++],e[i]);return t},L=function(t,e){return void 0===e?w(t):N(w(t),e)},X=function(t){var e=j.call(this,t);return e||!s(this,t)||!s(M,t)||s(this,R)&&this[R][t]?e:!0},B=function(t,e){var i=x(t=y(t),e);return!i||!s(M,e)||s(t,R)&&t[R][e]||(i.enumerable=!0),i},U=function(t){for(var e,i=T(y(t)),r=[],n=0;i.length>n;)s(M,e=i[n++])||e==R||r.push(e);return r},Y=function(t){for(var e,i=T(y(t)),r=[],n=0;i.length>n;)s(M,e=i[n++])&&r.push(M[e]);return r},G=function(t){for(var e,i,r=[t],n=1,s=arguments;s.length>n;)r.push(s[n++]);return e=r[1],"function"==typeof e&&(i=e),(i||!g(e))&&(e=function(t,e){return i&&(e=i.call(this,t,e)),z(e)?void 0:e}),r[1]=e,k.apply(S,r)},q=u(function(){var t=P();return"[null]"!=k([t])||"{}"!=k({a:t})||"{}"!=k(Object(t))});C||(P=function(){if(z(this))throw TypeError("Symbol is not a constructor");return E(f(arguments.length>0?arguments[0]:void 0))},l(P.prototype,"toString",function(){return this._k}),z=function(t){return t instanceof P},r.create=L,r.isEnum=X,r.getDesc=B,r.setDesc=I,r.setDescs=N,r.getNames=m.get=U,r.getSymbols=Y,o&&!t("./$.library")&&l(D,"propertyIsEnumerable",X,!0));var W={"for":function(t){return s(A,t+="")?A[t]:A[t]=P(t)},keyFor:function(t){return p(A,t)},useSetter:function(){O=!0},useSimple:function(){O=!1}};r.each.call("hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),function(t){var e=d(t);W[t]=C?e:E(e)}),O=!0,a(a.G+a.W,{Symbol:P}),a(a.S,"Symbol",W),a(a.S+a.F*!C,"Object",{create:L,defineProperty:I,defineProperties:N,getOwnPropertyDescriptor:B,getOwnPropertyNames:U,getOwnPropertySymbols:Y}),S&&a(a.S+a.F*(!C||q),"JSON",{stringify:G}),h(P,"Symbol"),h(Math,"Math",!0),h(n.JSON,"JSON",!0)},{"./$":45,"./$.an-object":3,"./$.def":17,"./$.enum-keys":20,"./$.fails":23,"./$.get-names":27,"./$.global":28,"./$.has":29,"./$.is-array":35,"./$.keyof":46,"./$.library":47,"./$.property-desc":57,"./$.redef":58,"./$.shared":62,"./$.support-desc":72,"./$.tag":73,"./$.to-iobject":77,"./$.uid":80,"./$.wks":82}],182:[function(t,e,i){"use strict";var r=t("./$"),n=t("./$.collection-weak"),s=t("./$.is-object"),o=t("./$.has"),a=n.frozenStore,l=n.WEAK,u=Object.isExtensible||s,c={},h=t("./$.collection")("WeakMap",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{get:function(t){if(s(t)){if(!u(t))return a(this).get(t);if(o(t,l))return t[l][this._i]}},set:function(t,e){return n.def(this,t,e)}},n,!0,!0);7!=(new h).set((Object.freeze||Object)(c),7).get(c)&&r.each.call(["delete","has","get","set"],function(e){var i=h.prototype,r=i[e];t("./$.redef")(i,e,function(t,i){if(s(t)&&!u(t)){var n=a(this)[e](t,i);return"set"==e?this:n}return r.call(this,t,i)})})},{"./$":45,"./$.collection":14,"./$.collection-weak":13,"./$.has":29,"./$.is-object":37,"./$.redef":58}],183:[function(t,e,i){"use strict";var r=t("./$.collection-weak");t("./$.collection")("WeakSet",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function(t){return r.def(this,t,!0)}},r,!1,!0)},{"./$.collection":14,"./$.collection-weak":13}],184:[function(t,e,i){"use strict";var r=t("./$.def"),n=t("./$.array-includes")(!0);r(r.P,"Array",{includes:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),t("./$.unscope")("includes");
},{"./$.array-includes":6,"./$.def":17,"./$.unscope":81}],185:[function(t,e,i){var r=t("./$.def");r(r.P,"Map",{toJSON:t("./$.collection-to-json")("Map")})},{"./$.collection-to-json":12,"./$.def":17}],186:[function(t,e,i){var r=t("./$.def"),n=t("./$.object-to-array")(!0);r(r.S,"Object",{entries:function(t){return n(t)}})},{"./$.def":17,"./$.object-to-array":53}],187:[function(t,e,i){var r=t("./$"),n=t("./$.def"),s=t("./$.own-keys"),o=t("./$.to-iobject"),a=t("./$.property-desc");n(n.S,"Object",{getOwnPropertyDescriptors:function(t){for(var e,i,n=o(t),l=r.setDesc,u=r.getDesc,c=s(n),h={},f=0;c.length>f;)i=u(n,e=c[f++]),e in h?l(h,e,a(0,i)):h[e]=i;return h}})},{"./$":45,"./$.def":17,"./$.own-keys":54,"./$.property-desc":57,"./$.to-iobject":77}],188:[function(t,e,i){var r=t("./$.def"),n=t("./$.object-to-array")(!1);r(r.S,"Object",{values:function(t){return n(t)}})},{"./$.def":17,"./$.object-to-array":53}],189:[function(t,e,i){var r=t("./$.def"),n=t("./$.replacer")(/[\\^$*+?.()|[\]{}]/g,"\\$&");r(r.S,"RegExp",{escape:function(t){return n(t)}})},{"./$.def":17,"./$.replacer":59}],190:[function(t,e,i){var r=t("./$.def");r(r.P,"Set",{toJSON:t("./$.collection-to-json")("Set")})},{"./$.collection-to-json":12,"./$.def":17}],191:[function(t,e,i){"use strict";var r=t("./$.def"),n=t("./$.string-at")(!0);r(r.P,"String",{at:function(t){return n(this,t)}})},{"./$.def":17,"./$.string-at":67}],192:[function(t,e,i){"use strict";var r=t("./$.def"),n=t("./$.string-pad");r(r.P,"String",{padLeft:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0,!0)}})},{"./$.def":17,"./$.string-pad":69}],193:[function(t,e,i){"use strict";var r=t("./$.def"),n=t("./$.string-pad");r(r.P,"String",{padRight:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0,!1)}})},{"./$.def":17,"./$.string-pad":69}],194:[function(t,e,i){"use strict";t("./$.string-trim")("trimLeft",function(t){return function(){return t(this,1)}})},{"./$.string-trim":71}],195:[function(t,e,i){"use strict";t("./$.string-trim")("trimRight",function(t){return function(){return t(this,2)}})},{"./$.string-trim":71}],196:[function(t,e,i){var r=t("./$"),n=t("./$.def"),s=t("./$.core").Array||Array,o={},a=function(e,i){r.each.call(e.split(","),function(e){void 0==i&&e in s?o[e]=s[e]:e in[]&&(o[e]=t("./$.ctx")(Function.call,[][e],i))})};a("pop,reverse,shift,keys,values,entries",1),a("indexOf,every,some,forEach,map,filter,find,findIndex,includes",3),a("join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill"),n(n.S,"Array",o)},{"./$":45,"./$.core":15,"./$.ctx":16,"./$.def":17}],197:[function(t,e,i){t("./es6.array.iterator");var r=t("./$.global"),n=t("./$.hide"),s=t("./$.iterators"),o=t("./$.wks")("iterator"),a=r.NodeList,l=r.HTMLCollection,u=a&&a.prototype,c=l&&l.prototype,h=s.NodeList=s.HTMLCollection=s.Array;!a||o in u||n(u,o,h),!l||o in c||n(c,o,h)},{"./$.global":28,"./$.hide":30,"./$.iterators":44,"./$.wks":82,"./es6.array.iterator":103}],198:[function(t,e,i){var r=t("./$.def"),n=t("./$.task");r(r.G+r.B,{setImmediate:n.set,clearImmediate:n.clear})},{"./$.def":17,"./$.task":74}],199:[function(t,e,i){var r=t("./$.global"),n=t("./$.def"),s=t("./$.invoke"),o=t("./$.partial"),a=r.navigator,l=!!a&&/MSIE .\./.test(a.userAgent),u=function(t){return l?function(e,i){return t(s(o,[].slice.call(arguments,2),"function"==typeof e?e:Function(e)),i)}:t};n(n.G+n.B+n.F*l,{setTimeout:u(r.setTimeout),setInterval:u(r.setInterval)})},{"./$.def":17,"./$.global":28,"./$.invoke":32,"./$.partial":55}],200:[function(t,e,i){t("./modules/es5"),t("./modules/es6.symbol"),t("./modules/es6.object.assign"),t("./modules/es6.object.is"),t("./modules/es6.object.set-prototype-of"),t("./modules/es6.object.to-string"),t("./modules/es6.object.freeze"),t("./modules/es6.object.seal"),t("./modules/es6.object.prevent-extensions"),t("./modules/es6.object.is-frozen"),t("./modules/es6.object.is-sealed"),t("./modules/es6.object.is-extensible"),t("./modules/es6.object.get-own-property-descriptor"),t("./modules/es6.object.get-prototype-of"),t("./modules/es6.object.keys"),t("./modules/es6.object.get-own-property-names"),t("./modules/es6.function.name"),t("./modules/es6.function.has-instance"),t("./modules/es6.number.constructor"),t("./modules/es6.number.epsilon"),t("./modules/es6.number.is-finite"),t("./modules/es6.number.is-integer"),t("./modules/es6.number.is-nan"),t("./modules/es6.number.is-safe-integer"),t("./modules/es6.number.max-safe-integer"),t("./modules/es6.number.min-safe-integer"),t("./modules/es6.number.parse-float"),t("./modules/es6.number.parse-int"),t("./modules/es6.math.acosh"),t("./modules/es6.math.asinh"),t("./modules/es6.math.atanh"),t("./modules/es6.math.cbrt"),t("./modules/es6.math.clz32"),t("./modules/es6.math.cosh"),t("./modules/es6.math.expm1"),t("./modules/es6.math.fround"),t("./modules/es6.math.hypot"),t("./modules/es6.math.imul"),t("./modules/es6.math.log10"),t("./modules/es6.math.log1p"),t("./modules/es6.math.log2"),t("./modules/es6.math.sign"),t("./modules/es6.math.sinh"),t("./modules/es6.math.tanh"),t("./modules/es6.math.trunc"),t("./modules/es6.string.from-code-point"),t("./modules/es6.string.raw"),t("./modules/es6.string.trim"),t("./modules/es6.string.iterator"),t("./modules/es6.string.code-point-at"),t("./modules/es6.string.ends-with"),t("./modules/es6.string.includes"),t("./modules/es6.string.repeat"),t("./modules/es6.string.starts-with"),t("./modules/es6.array.from"),t("./modules/es6.array.of"),t("./modules/es6.array.iterator"),t("./modules/es6.array.species"),t("./modules/es6.array.copy-within"),t("./modules/es6.array.fill"),t("./modules/es6.array.find"),t("./modules/es6.array.find-index"),t("./modules/es6.regexp.constructor"),t("./modules/es6.regexp.flags"),t("./modules/es6.regexp.match"),t("./modules/es6.regexp.replace"),t("./modules/es6.regexp.search"),t("./modules/es6.regexp.split"),t("./modules/es6.promise"),t("./modules/es6.map"),t("./modules/es6.set"),t("./modules/es6.weak-map"),t("./modules/es6.weak-set"),t("./modules/es6.reflect.apply"),t("./modules/es6.reflect.construct"),t("./modules/es6.reflect.define-property"),t("./modules/es6.reflect.delete-property"),t("./modules/es6.reflect.enumerate"),t("./modules/es6.reflect.get"),t("./modules/es6.reflect.get-own-property-descriptor"),t("./modules/es6.reflect.get-prototype-of"),t("./modules/es6.reflect.has"),t("./modules/es6.reflect.is-extensible"),t("./modules/es6.reflect.own-keys"),t("./modules/es6.reflect.prevent-extensions"),t("./modules/es6.reflect.set"),t("./modules/es6.reflect.set-prototype-of"),t("./modules/es7.array.includes"),t("./modules/es7.string.at"),t("./modules/es7.string.pad-left"),t("./modules/es7.string.pad-right"),t("./modules/es7.string.trim-left"),t("./modules/es7.string.trim-right"),t("./modules/es7.regexp.escape"),t("./modules/es7.object.get-own-property-descriptors"),t("./modules/es7.object.values"),t("./modules/es7.object.entries"),t("./modules/es7.map.to-json"),t("./modules/es7.set.to-json"),t("./modules/js.array.statics"),t("./modules/web.timers"),t("./modules/web.immediate"),t("./modules/web.dom.iterable"),e.exports=t("./modules/$.core")},{"./modules/$.core":15,"./modules/es5":97,"./modules/es6.array.copy-within":98,"./modules/es6.array.fill":99,"./modules/es6.array.find":101,"./modules/es6.array.find-index":100,"./modules/es6.array.from":102,"./modules/es6.array.iterator":103,"./modules/es6.array.of":104,"./modules/es6.array.species":105,"./modules/es6.function.has-instance":106,"./modules/es6.function.name":107,"./modules/es6.map":108,"./modules/es6.math.acosh":109,"./modules/es6.math.asinh":110,"./modules/es6.math.atanh":111,"./modules/es6.math.cbrt":112,"./modules/es6.math.clz32":113,"./modules/es6.math.cosh":114,"./modules/es6.math.expm1":115,"./modules/es6.math.fround":116,"./modules/es6.math.hypot":117,"./modules/es6.math.imul":118,"./modules/es6.math.log10":119,"./modules/es6.math.log1p":120,"./modules/es6.math.log2":121,"./modules/es6.math.sign":122,"./modules/es6.math.sinh":123,"./modules/es6.math.tanh":124,"./modules/es6.math.trunc":125,"./modules/es6.number.constructor":126,"./modules/es6.number.epsilon":127,"./modules/es6.number.is-finite":128,"./modules/es6.number.is-integer":129,"./modules/es6.number.is-nan":130,"./modules/es6.number.is-safe-integer":131,"./modules/es6.number.max-safe-integer":132,"./modules/es6.number.min-safe-integer":133,"./modules/es6.number.parse-float":134,"./modules/es6.number.parse-int":135,"./modules/es6.object.assign":136,"./modules/es6.object.freeze":137,"./modules/es6.object.get-own-property-descriptor":138,"./modules/es6.object.get-own-property-names":139,"./modules/es6.object.get-prototype-of":140,"./modules/es6.object.is":144,"./modules/es6.object.is-extensible":141,"./modules/es6.object.is-frozen":142,"./modules/es6.object.is-sealed":143,"./modules/es6.object.keys":145,"./modules/es6.object.prevent-extensions":146,"./modules/es6.object.seal":147,"./modules/es6.object.set-prototype-of":148,"./modules/es6.object.to-string":149,"./modules/es6.promise":150,"./modules/es6.reflect.apply":151,"./modules/es6.reflect.construct":152,"./modules/es6.reflect.define-property":153,"./modules/es6.reflect.delete-property":154,"./modules/es6.reflect.enumerate":155,"./modules/es6.reflect.get":158,"./modules/es6.reflect.get-own-property-descriptor":156,"./modules/es6.reflect.get-prototype-of":157,"./modules/es6.reflect.has":159,"./modules/es6.reflect.is-extensible":160,"./modules/es6.reflect.own-keys":161,"./modules/es6.reflect.prevent-extensions":162,"./modules/es6.reflect.set":164,"./modules/es6.reflect.set-prototype-of":163,"./modules/es6.regexp.constructor":165,"./modules/es6.regexp.flags":166,"./modules/es6.regexp.match":167,"./modules/es6.regexp.replace":168,"./modules/es6.regexp.search":169,"./modules/es6.regexp.split":170,"./modules/es6.set":171,"./modules/es6.string.code-point-at":172,"./modules/es6.string.ends-with":173,"./modules/es6.string.from-code-point":174,"./modules/es6.string.includes":175,"./modules/es6.string.iterator":176,"./modules/es6.string.raw":177,"./modules/es6.string.repeat":178,"./modules/es6.string.starts-with":179,"./modules/es6.string.trim":180,"./modules/es6.symbol":181,"./modules/es6.weak-map":182,"./modules/es6.weak-set":183,"./modules/es7.array.includes":184,"./modules/es7.map.to-json":185,"./modules/es7.object.entries":186,"./modules/es7.object.get-own-property-descriptors":187,"./modules/es7.object.values":188,"./modules/es7.regexp.escape":189,"./modules/es7.set.to-json":190,"./modules/es7.string.at":191,"./modules/es7.string.pad-left":192,"./modules/es7.string.pad-right":193,"./modules/es7.string.trim-left":194,"./modules/es7.string.trim-right":195,"./modules/js.array.statics":196,"./modules/web.dom.iterable":197,"./modules/web.immediate":198,"./modules/web.timers":199}],201:[function(t,e,i){(function(t){var i="undefined"!=typeof e&&e.exports&&"undefined"!=typeof t?t:this||window;(i._gsQueue||(i._gsQueue=[])).push(function(){"use strict";i._gsDefine("TweenMax",["core.Animation","core.SimpleTimeline","TweenLite"],function(t,e,i){var r=function(t){var e,i=[],r=t.length;for(e=0;e!==r;i.push(t[e++]));return i},n=function(t,e,i){var r,n,s=t.cycle;for(r in s)n=s[r],t[r]="function"==typeof n?n.call(e[i],i):n[i%n.length];delete t.cycle},s=function(t,e,r){i.call(this,t,e,r),this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._dirty=!0,this.render=s.prototype.render},o=1e-10,a=i._internals,l=a.isSelector,u=a.isArray,c=s.prototype=i.to({},.1,{}),h=[];s.version="1.18.0",c.constructor=s,c.kill()._gc=!1,s.killTweensOf=s.killDelayedCallsTo=i.killTweensOf,s.getTweensOf=i.getTweensOf,s.lagSmoothing=i.lagSmoothing,s.ticker=i.ticker,s.render=i.render,c.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),i.prototype.invalidate.call(this)},c.updateTo=function(t,e){var r,n=this.ratio,s=this.vars.immediateRender||t.immediateRender;e&&this._startTime<this._timeline._time&&(this._startTime=this._timeline._time,this._uncache(!1),this._gc?this._enabled(!0,!1):this._timeline.insert(this,this._startTime-this._delay));for(r in t)this.vars[r]=t[r];if(this._initted||s)if(e)this._initted=!1,s&&this.render(0,!0,!0);else if(this._gc&&this._enabled(!0,!1),this._notifyPluginsOfEnabled&&this._firstPT&&i._onPluginEvent("_onDisable",this),this._time/this._duration>.998){var o=this._time;this.render(0,!0,!1),this._initted=!1,this.render(o,!0,!1)}else if(this._time>0||s){this._initted=!1,this._init();for(var a,l=1/(1-n),u=this._firstPT;u;)a=u.s+u.c,u.c*=l,u.s=a-u.c,u=u._next}return this},c.render=function(t,e,i){this._initted||0===this._duration&&this.vars.repeat&&this.invalidate();var r,n,s,l,u,c,h,f,d=this._dirty?this.totalDuration():this._totalDuration,p=this._time,m=this._totalTime,_=this._cycle,g=this._duration,v=this._rawPrevTime;if(t>=d?(this._totalTime=d,this._cycle=this._repeat,this._yoyo&&0!==(1&this._cycle)?(this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0):(this._time=g,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1),this._reversed||(r=!0,n="onComplete",i=i||this._timeline.autoRemoveChildren),0===g&&(this._initted||!this.vars.lazy||i)&&(this._startTime===this._timeline._duration&&(t=0),(0===t||0>v||v===o)&&v!==t&&(i=!0,v>o&&(n="onReverseComplete")),this._rawPrevTime=f=!e||t||v===t?t:o)):1e-7>t?(this._totalTime=this._time=this._cycle=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==m||0===g&&v>0)&&(n="onReverseComplete",r=this._reversed),0>t&&(this._active=!1,0===g&&(this._initted||!this.vars.lazy||i)&&(v>=0&&(i=!0),this._rawPrevTime=f=!e||t||v===t?t:o)),this._initted||(i=!0)):(this._totalTime=this._time=t,0!==this._repeat&&(l=g+this._repeatDelay,this._cycle=this._totalTime/l>>0,0!==this._cycle&&this._cycle===this._totalTime/l&&this._cycle--,this._time=this._totalTime-this._cycle*l,this._yoyo&&0!==(1&this._cycle)&&(this._time=g-this._time),this._time>g?this._time=g:this._time<0&&(this._time=0)),this._easeType?(u=this._time/g,c=this._easeType,h=this._easePower,(1===c||3===c&&u>=.5)&&(u=1-u),3===c&&(u*=2),1===h?u*=u:2===h?u*=u*u:3===h?u*=u*u*u:4===h&&(u*=u*u*u*u),1===c?this.ratio=1-u:2===c?this.ratio=u:this._time/g<.5?this.ratio=u/2:this.ratio=1-u/2):this.ratio=this._ease.getRatio(this._time/g)),p===this._time&&!i&&_===this._cycle)return void(m!==this._totalTime&&this._onUpdate&&(e||this._callback("onUpdate")));if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!i&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration))return this._time=p,this._totalTime=m,this._rawPrevTime=v,this._cycle=_,a.lazyTweens.push(this),void(this._lazy=[t,e]);this._time&&!r?this.ratio=this._ease.getRatio(this._time/g):r&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==p&&t>=0&&(this._active=!0),0===m&&(2===this._initted&&t>0&&this._init(),this._startAt&&(t>=0?this._startAt.render(t,e,i):n||(n="_dummyGS")),this.vars.onStart&&(0!==this._totalTime||0===g)&&(e||this._callback("onStart"))),s=this._firstPT;s;)s.f?s.t[s.p](s.c*this.ratio+s.s):s.t[s.p]=s.c*this.ratio+s.s,s=s._next;this._onUpdate&&(0>t&&this._startAt&&this._startTime&&this._startAt.render(t,e,i),e||(this._totalTime!==m||r)&&this._callback("onUpdate")),this._cycle!==_&&(e||this._gc||this.vars.onRepeat&&this._callback("onRepeat")),n&&(!this._gc||i)&&(0>t&&this._startAt&&!this._onUpdate&&this._startTime&&this._startAt.render(t,e,i),r&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[n]&&this._callback(n),0===g&&this._rawPrevTime===o&&f!==o&&(this._rawPrevTime=0))},s.to=function(t,e,i){return new s(t,e,i)},s.from=function(t,e,i){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,new s(t,e,i)},s.fromTo=function(t,e,i,r){return r.startAt=i,r.immediateRender=0!=r.immediateRender&&0!=i.immediateRender,new s(t,e,r)},s.staggerTo=s.allTo=function(t,e,o,a,c,f,d){a=a||0;var p,m,_,g,v=o.delay||0,y=[],$=function(){o.onComplete&&o.onComplete.apply(o.onCompleteScope||this,arguments),c.apply(d||o.callbackScope||this,f||h)},x=o.cycle,b=o.startAt&&o.startAt.cycle;for(u(t)||("string"==typeof t&&(t=i.selector(t)||t),l(t)&&(t=r(t))),t=t||[],0>a&&(t=r(t),t.reverse(),a*=-1),p=t.length-1,_=0;p>=_;_++){m={};for(g in o)m[g]=o[g];if(x&&n(m,t,_),b){b=m.startAt={};for(g in o.startAt)b[g]=o.startAt[g];n(m.startAt,t,_)}m.delay=v,_===p&&c&&(m.onComplete=$),y[_]=new s(t[_],e,m),v+=a}return y},s.staggerFrom=s.allFrom=function(t,e,i,r,n,o,a){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,s.staggerTo(t,e,i,r,n,o,a)},s.staggerFromTo=s.allFromTo=function(t,e,i,r,n,o,a,l){return r.startAt=i,r.immediateRender=0!=r.immediateRender&&0!=i.immediateRender,s.staggerTo(t,e,r,n,o,a,l)},s.delayedCall=function(t,e,i,r,n){return new s(e,0,{delay:t,onComplete:e,onCompleteParams:i,callbackScope:r,onReverseComplete:e,onReverseCompleteParams:i,immediateRender:!1,useFrames:n,overwrite:0})},s.set=function(t,e){return new s(t,0,e)},s.isTweening=function(t){return i.getTweensOf(t,!0).length>0};var f=function(t,e){for(var r=[],n=0,s=t._first;s;)s instanceof i?r[n++]=s:(e&&(r[n++]=s),r=r.concat(f(s,e)),n=r.length),s=s._next;return r},d=s.getAllTweens=function(e){return f(t._rootTimeline,e).concat(f(t._rootFramesTimeline,e))};s.killAll=function(t,i,r,n){null==i&&(i=!0),null==r&&(r=!0);var s,o,a,l=d(0!=n),u=l.length,c=i&&r&&n;for(a=0;u>a;a++)o=l[a],(c||o instanceof e||(s=o.target===o.vars.onComplete)&&r||i&&!s)&&(t?o.totalTime(o._reversed?0:o.totalDuration()):o._enabled(!1,!1))},s.killChildTweensOf=function(t,e){if(null!=t){var n,o,c,h,f,d=a.tweenLookup;if("string"==typeof t&&(t=i.selector(t)||t),l(t)&&(t=r(t)),u(t))for(h=t.length;--h>-1;)s.killChildTweensOf(t[h],e);else{n=[];for(c in d)for(o=d[c].target.parentNode;o;)o===t&&(n=n.concat(d[c].tweens)),o=o.parentNode;for(f=n.length,h=0;f>h;h++)e&&n[h].totalTime(n[h].totalDuration()),n[h]._enabled(!1,!1)}}};var p=function(t,i,r,n){i=i!==!1,r=r!==!1,n=n!==!1;for(var s,o,a=d(n),l=i&&r&&n,u=a.length;--u>-1;)o=a[u],(l||o instanceof e||(s=o.target===o.vars.onComplete)&&r||i&&!s)&&o.paused(t)};return s.pauseAll=function(t,e,i){p(!0,t,e,i)},s.resumeAll=function(t,e,i){p(!1,t,e,i)},s.globalTimeScale=function(e){var r=t._rootTimeline,n=i.ticker.time;return arguments.length?(e=e||o,r._startTime=n-(n-r._startTime)*r._timeScale/e,r=t._rootFramesTimeline,n=i.ticker.frame,r._startTime=n-(n-r._startTime)*r._timeScale/e,r._timeScale=t._rootTimeline._timeScale=e,e):r._timeScale},c.progress=function(t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-t:t)+this._cycle*(this._duration+this._repeatDelay),!1):this._time/this.duration()},c.totalProgress=function(t){return arguments.length?this.totalTime(this.totalDuration()*t,!1):this._totalTime/this.totalDuration()},c.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),t>this._duration&&(t=this._duration),this._yoyo&&0!==(1&this._cycle)?t=this._duration-t+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(t+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(t,e)):this._time},c.duration=function(e){return arguments.length?t.prototype.duration.call(this,e):this._duration},c.totalDuration=function(t){return arguments.length?-1===this._repeat?this:this.duration((t-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat,this._dirty=!1),this._totalDuration)},c.repeat=function(t){return arguments.length?(this._repeat=t,this._uncache(!0)):this._repeat},c.repeatDelay=function(t){return arguments.length?(this._repeatDelay=t,this._uncache(!0)):this._repeatDelay},c.yoyo=function(t){return arguments.length?(this._yoyo=t,this):this._yoyo},s},!0),i._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(t,e,r){var n=function(t){e.call(this,t),this._labels={},this.autoRemoveChildren=this.vars.autoRemoveChildren===!0,this.smoothChildTiming=this.vars.smoothChildTiming===!0,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;var i,r,n=this.vars;for(r in n)i=n[r],u(i)&&-1!==i.join("").indexOf("{self}")&&(n[r]=this._swapSelfInParams(i));u(n.tweens)&&this.add(n.tweens,0,n.align,n.stagger)},s=1e-10,o=r._internals,a=n._internals={},l=o.isSelector,u=o.isArray,c=o.lazyTweens,h=o.lazyRender,f=i._gsDefine.globals,d=function(t){var e,i={};for(e in t)i[e]=t[e];return i},p=function(t,e,i){var r,n,s=t.cycle;for(r in s)n=s[r],t[r]="function"==typeof n?n.call(e[i],i):n[i%n.length];delete t.cycle},m=a.pauseCallback=function(){},_=function(t){var e,i=[],r=t.length;for(e=0;e!==r;i.push(t[e++]));return i},g=n.prototype=new e;return n.version="1.18.0",g.constructor=n,g.kill()._gc=g._forcingPlayhead=g._hasPause=!1,g.to=function(t,e,i,n){var s=i.repeat&&f.TweenMax||r;return e?this.add(new s(t,e,i),n):this.set(t,i,n)},g.from=function(t,e,i,n){return this.add((i.repeat&&f.TweenMax||r).from(t,e,i),n)},g.fromTo=function(t,e,i,n,s){var o=n.repeat&&f.TweenMax||r;return e?this.add(o.fromTo(t,e,i,n),s):this.set(t,n,s)},g.staggerTo=function(t,e,i,s,o,a,u,c){var h,f,m=new n({onComplete:a,onCompleteParams:u,callbackScope:c,smoothChildTiming:this.smoothChildTiming}),g=i.cycle;for("string"==typeof t&&(t=r.selector(t)||t),t=t||[],l(t)&&(t=_(t)),s=s||0,0>s&&(t=_(t),t.reverse(),s*=-1),f=0;f<t.length;f++)h=d(i),h.startAt&&(h.startAt=d(h.startAt),h.startAt.cycle&&p(h.startAt,t,f)),g&&p(h,t,f),m.to(t[f],e,h,f*s);return this.add(m,o)},g.staggerFrom=function(t,e,i,r,n,s,o,a){return i.immediateRender=0!=i.immediateRender,i.runBackwards=!0,this.staggerTo(t,e,i,r,n,s,o,a)},g.staggerFromTo=function(t,e,i,r,n,s,o,a,l){return r.startAt=i,r.immediateRender=0!=r.immediateRender&&0!=i.immediateRender,this.staggerTo(t,e,r,n,s,o,a,l)},g.call=function(t,e,i,n){return this.add(r.delayedCall(0,t,e,i),n)},g.set=function(t,e,i){return i=this._parseTimeOrLabel(i,0,!0),null==e.immediateRender&&(e.immediateRender=i===this._time&&!this._paused),this.add(new r(t,0,e),i)},n.exportRoot=function(t,e){t=t||{},null==t.smoothChildTiming&&(t.smoothChildTiming=!0);var i,s,o=new n(t),a=o._timeline;for(null==e&&(e=!0),a._remove(o,!0),o._startTime=0,o._rawPrevTime=o._time=o._totalTime=a._time,i=a._first;i;)s=i._next,e&&i instanceof r&&i.target===i.vars.onComplete||o.add(i,i._startTime-i._delay),i=s;return a.add(o,0),o},g.add=function(i,s,o,a){var l,c,h,f,d,p;if("number"!=typeof s&&(s=this._parseTimeOrLabel(s,0,!0,i)),!(i instanceof t)){if(i instanceof Array||i&&i.push&&u(i)){for(o=o||"normal",a=a||0,l=s,c=i.length,h=0;c>h;h++)u(f=i[h])&&(f=new n({tweens:f})),this.add(f,l),"string"!=typeof f&&"function"!=typeof f&&("sequence"===o?l=f._startTime+f.totalDuration()/f._timeScale:"start"===o&&(f._startTime-=f.delay())),l+=a;return this._uncache(!0)}if("string"==typeof i)return this.addLabel(i,s);if("function"!=typeof i)throw"Cannot add "+i+" into the timeline; it is not a tween, timeline, function, or string.";i=r.delayedCall(0,i)}if(e.prototype.add.call(this,i,s),(this._gc||this._time===this._duration)&&!this._paused&&this._duration<this.duration())for(d=this,p=d.rawTime()>i._startTime;d._timeline;)p&&d._timeline.smoothChildTiming?d.totalTime(d._totalTime,!0):d._gc&&d._enabled(!0,!1),d=d._timeline;return this},g.remove=function(e){if(e instanceof t){this._remove(e,!1);var i=e._timeline=e.vars.useFrames?t._rootFramesTimeline:t._rootTimeline;return e._startTime=(e._paused?e._pauseTime:i._time)-(e._reversed?e.totalDuration()-e._totalTime:e._totalTime)/e._timeScale,this}if(e instanceof Array||e&&e.push&&u(e)){for(var r=e.length;--r>-1;)this.remove(e[r]);return this}return"string"==typeof e?this.removeLabel(e):this.kill(null,e)},g._remove=function(t,i){e.prototype._remove.call(this,t,i);var r=this._last;return r?this._time>r._startTime+r._totalDuration/r._timeScale&&(this._time=this.duration(),this._totalTime=this._totalDuration):this._time=this._totalTime=this._duration=this._totalDuration=0,this},g.append=function(t,e){return this.add(t,this._parseTimeOrLabel(null,e,!0,t))},g.insert=g.insertMultiple=function(t,e,i,r){return this.add(t,e||0,i,r)},g.appendMultiple=function(t,e,i,r){return this.add(t,this._parseTimeOrLabel(null,e,!0,t),i,r)},g.addLabel=function(t,e){return this._labels[t]=this._parseTimeOrLabel(e),this},g.addPause=function(t,e,i,n){var s=r.delayedCall(0,m,i,n||this);return s.vars.onComplete=s.vars.onReverseComplete=e,s.data="isPause",this._hasPause=!0,this.add(s,t)},g.removeLabel=function(t){return delete this._labels[t],this},g.getLabelTime=function(t){return null!=this._labels[t]?this._labels[t]:-1},g._parseTimeOrLabel=function(e,i,r,n){var s;if(n instanceof t&&n.timeline===this)this.remove(n);else if(n&&(n instanceof Array||n.push&&u(n)))for(s=n.length;--s>-1;)n[s]instanceof t&&n[s].timeline===this&&this.remove(n[s]);if("string"==typeof i)return this._parseTimeOrLabel(i,r&&"number"==typeof e&&null==this._labels[i]?e-this.duration():0,r);if(i=i||0,"string"!=typeof e||!isNaN(e)&&null==this._labels[e])null==e&&(e=this.duration());else{if(s=e.indexOf("="),-1===s)return null==this._labels[e]?r?this._labels[e]=this.duration()+i:i:this._labels[e]+i;i=parseInt(e.charAt(s-1)+"1",10)*Number(e.substr(s+1)),e=s>1?this._parseTimeOrLabel(e.substr(0,s-1),0,r):this.duration()}return Number(e)+i},g.seek=function(t,e){return this.totalTime("number"==typeof t?t:this._parseTimeOrLabel(t),e!==!1)},g.stop=function(){return this.paused(!0)},g.gotoAndPlay=function(t,e){return this.play(t,e)},g.gotoAndStop=function(t,e){return this.pause(t,e)},g.render=function(t,e,i){this._gc&&this._enabled(!0,!1);var r,n,o,a,l,u,f=this._dirty?this.totalDuration():this._totalDuration,d=this._time,p=this._startTime,m=this._timeScale,_=this._paused;if(t>=f)this._totalTime=this._time=f,this._reversed||this._hasPausedChild()||(n=!0,a="onComplete",l=!!this._timeline.autoRemoveChildren,0===this._duration&&(0===t||this._rawPrevTime<0||this._rawPrevTime===s)&&this._rawPrevTime!==t&&this._first&&(l=!0,this._rawPrevTime>s&&(a="onReverseComplete"))),this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:s,t=f+1e-4;else if(1e-7>t)if(this._totalTime=this._time=0,(0!==d||0===this._duration&&this._rawPrevTime!==s&&(this._rawPrevTime>0||0>t&&this._rawPrevTime>=0))&&(a="onReverseComplete",n=this._reversed),0>t)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(l=n=!0,a="onReverseComplete"):this._rawPrevTime>=0&&this._first&&(l=!0),this._rawPrevTime=t;else{if(this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:s,0===t&&n)for(r=this._first;r&&0===r._startTime;)r._duration||(n=!1),r=r._next;t=0,this._initted||(l=!0)}else{if(this._hasPause&&!this._forcingPlayhead&&!e){if(t>=d)for(r=this._first;r&&r._startTime<=t&&!u;)r._duration||"isPause"!==r.data||r.ratio||0===r._startTime&&0===this._rawPrevTime||(u=r),r=r._next;else for(r=this._last;r&&r._startTime>=t&&!u;)r._duration||"isPause"===r.data&&r._rawPrevTime>0&&(u=r),r=r._prev;u&&(this._time=t=u._startTime,this._totalTime=t+this._cycle*(this._totalDuration+this._repeatDelay))}this._totalTime=this._time=this._rawPrevTime=t}if(this._time!==d&&this._first||i||l||u){if(this._initted||(this._initted=!0),this._active||!this._paused&&this._time!==d&&t>0&&(this._active=!0),0===d&&this.vars.onStart&&0!==this._time&&(e||this._callback("onStart")),this._time>=d)for(r=this._first;r&&(o=r._next,!this._paused||_);)(r._active||r._startTime<=this._time&&!r._paused&&!r._gc)&&(u===r&&this.pause(),r._reversed?r.render((r._dirty?r.totalDuration():r._totalDuration)-(t-r._startTime)*r._timeScale,e,i):r.render((t-r._startTime)*r._timeScale,e,i)),r=o;else for(r=this._last;r&&(o=r._prev,!this._paused||_);){if(r._active||r._startTime<=d&&!r._paused&&!r._gc){if(u===r){for(u=r._prev;u&&u.endTime()>this._time;)u.render(u._reversed?u.totalDuration()-(t-u._startTime)*u._timeScale:(t-u._startTime)*u._timeScale,e,i),u=u._prev;u=null,this.pause()}r._reversed?r.render((r._dirty?r.totalDuration():r._totalDuration)-(t-r._startTime)*r._timeScale,e,i):r.render((t-r._startTime)*r._timeScale,e,i)}r=o}this._onUpdate&&(e||(c.length&&h(),this._callback("onUpdate"))),a&&(this._gc||(p===this._startTime||m!==this._timeScale)&&(0===this._time||f>=this.totalDuration())&&(n&&(c.length&&h(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[a]&&this._callback(a)))}},g._hasPausedChild=function(){for(var t=this._first;t;){if(t._paused||t instanceof n&&t._hasPausedChild())return!0;t=t._next}return!1},g.getChildren=function(t,e,i,n){n=n||-9999999999;for(var s=[],o=this._first,a=0;o;)o._startTime<n||(o instanceof r?e!==!1&&(s[a++]=o):(i!==!1&&(s[a++]=o),t!==!1&&(s=s.concat(o.getChildren(!0,e,i)),a=s.length))),o=o._next;return s},g.getTweensOf=function(t,e){var i,n,s=this._gc,o=[],a=0;for(s&&this._enabled(!0,!0),i=r.getTweensOf(t),n=i.length;--n>-1;)(i[n].timeline===this||e&&this._contains(i[n]))&&(o[a++]=i[n]);return s&&this._enabled(!1,!0),o},g.recent=function(){return this._recent},g._contains=function(t){for(var e=t.timeline;e;){if(e===this)return!0;e=e.timeline}return!1},g.shiftChildren=function(t,e,i){i=i||0;for(var r,n=this._first,s=this._labels;n;)n._startTime>=i&&(n._startTime+=t),n=n._next;if(e)for(r in s)s[r]>=i&&(s[r]+=t);return this._uncache(!0)},g._kill=function(t,e){if(!t&&!e)return this._enabled(!1,!1);for(var i=e?this.getTweensOf(e):this.getChildren(!0,!0,!1),r=i.length,n=!1;--r>-1;)i[r]._kill(t,e)&&(n=!0);return n},g.clear=function(t){var e=this.getChildren(!1,!0,!0),i=e.length;for(this._time=this._totalTime=0;--i>-1;)e[i]._enabled(!1,!1);return t!==!1&&(this._labels={}),this._uncache(!0)},g.invalidate=function(){for(var e=this._first;e;)e.invalidate(),e=e._next;return t.prototype.invalidate.call(this)},g._enabled=function(t,i){if(t===this._gc)for(var r=this._first;r;)r._enabled(t,!0),r=r._next;return e.prototype._enabled.call(this,t,i)},g.totalTime=function(e,i,r){this._forcingPlayhead=!0;var n=t.prototype.totalTime.apply(this,arguments);return this._forcingPlayhead=!1,n},g.duration=function(t){return arguments.length?(0!==this.duration()&&0!==t&&this.timeScale(this._duration/t),this):(this._dirty&&this.totalDuration(),this._duration)},g.totalDuration=function(t){if(!arguments.length){if(this._dirty){for(var e,i,r=0,n=this._last,s=999999999999;n;)e=n._prev,n._dirty&&n.totalDuration(),n._startTime>s&&this._sortChildren&&!n._paused?this.add(n,n._startTime-n._delay):s=n._startTime,n._startTime<0&&!n._paused&&(r-=n._startTime,this._timeline.smoothChildTiming&&(this._startTime+=n._startTime/this._timeScale),this.shiftChildren(-n._startTime,!1,-9999999999),s=0),i=n._startTime+n._totalDuration/n._timeScale,i>r&&(r=i),n=e;this._duration=this._totalDuration=r,this._dirty=!1}return this._totalDuration}return 0!==this.totalDuration()&&0!==t&&this.timeScale(this._totalDuration/t),this},g.paused=function(e){if(!e)for(var i=this._first,r=this._time;i;)i._startTime===r&&"isPause"===i.data&&(i._rawPrevTime=0),i=i._next;return t.prototype.paused.apply(this,arguments)},g.usesFrames=function(){for(var e=this._timeline;e._timeline;)e=e._timeline;return e===t._rootFramesTimeline},g.rawTime=function(){return this._paused?this._totalTime:(this._timeline.rawTime()-this._startTime)*this._timeScale},n},!0),i._gsDefine("TimelineMax",["TimelineLite","TweenLite","easing.Ease"],function(t,e,i){var r=function(e){t.call(this,e),this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._cycle=0,this._yoyo=this.vars.yoyo===!0,this._dirty=!0},n=1e-10,s=e._internals,o=s.lazyTweens,a=s.lazyRender,l=new i(null,null,1,0),u=r.prototype=new t;return u.constructor=r,u.kill()._gc=!1,r.version="1.18.0",u.invalidate=function(){return this._yoyo=this.vars.yoyo===!0,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),
t.prototype.invalidate.call(this)},u.addCallback=function(t,i,r,n){return this.add(e.delayedCall(0,t,r,n),i)},u.removeCallback=function(t,e){if(t)if(null==e)this._kill(null,t);else for(var i=this.getTweensOf(t,!1),r=i.length,n=this._parseTimeOrLabel(e);--r>-1;)i[r]._startTime===n&&i[r]._enabled(!1,!1);return this},u.removePause=function(e){return this.removeCallback(t._internals.pauseCallback,e)},u.tweenTo=function(t,i){i=i||{};var r,n,s,o={ease:l,useFrames:this.usesFrames(),immediateRender:!1};for(n in i)o[n]=i[n];return o.time=this._parseTimeOrLabel(t),r=Math.abs(Number(o.time)-this._time)/this._timeScale||.001,s=new e(this,r,o),o.onStart=function(){s.target.paused(!0),s.vars.time!==s.target.time()&&r===s.duration()&&s.duration(Math.abs(s.vars.time-s.target.time())/s.target._timeScale),i.onStart&&s._callback("onStart")},s},u.tweenFromTo=function(t,e,i){i=i||{},t=this._parseTimeOrLabel(t),i.startAt={onComplete:this.seek,onCompleteParams:[t],callbackScope:this},i.immediateRender=i.immediateRender!==!1;var r=this.tweenTo(e,i);return r.duration(Math.abs(r.vars.time-t)/this._timeScale||.001)},u.render=function(t,e,i){this._gc&&this._enabled(!0,!1);var r,s,l,u,c,h,f,d=this._dirty?this.totalDuration():this._totalDuration,p=this._duration,m=this._time,_=this._totalTime,g=this._startTime,v=this._timeScale,y=this._rawPrevTime,$=this._paused,x=this._cycle;if(t>=d)this._locked||(this._totalTime=d,this._cycle=this._repeat),this._reversed||this._hasPausedChild()||(s=!0,u="onComplete",c=!!this._timeline.autoRemoveChildren,0===this._duration&&(0===t||0>y||y===n)&&y!==t&&this._first&&(c=!0,y>n&&(u="onReverseComplete"))),this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:n,this._yoyo&&0!==(1&this._cycle)?this._time=t=0:(this._time=p,t=p+1e-4);else if(1e-7>t)if(this._locked||(this._totalTime=this._cycle=0),this._time=0,(0!==m||0===p&&y!==n&&(y>0||0>t&&y>=0)&&!this._locked)&&(u="onReverseComplete",s=this._reversed),0>t)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(c=s=!0,u="onReverseComplete"):y>=0&&this._first&&(c=!0),this._rawPrevTime=t;else{if(this._rawPrevTime=p||!e||t||this._rawPrevTime===t?t:n,0===t&&s)for(r=this._first;r&&0===r._startTime;)r._duration||(s=!1),r=r._next;t=0,this._initted||(c=!0)}else if(0===p&&0>y&&(c=!0),this._time=this._rawPrevTime=t,this._locked||(this._totalTime=t,0!==this._repeat&&(h=p+this._repeatDelay,this._cycle=this._totalTime/h>>0,0!==this._cycle&&this._cycle===this._totalTime/h&&this._cycle--,this._time=this._totalTime-this._cycle*h,this._yoyo&&0!==(1&this._cycle)&&(this._time=p-this._time),this._time>p?(this._time=p,t=p+1e-4):this._time<0?this._time=t=0:t=this._time)),this._hasPause&&!this._forcingPlayhead&&!e){if(t=this._time,t>=m)for(r=this._first;r&&r._startTime<=t&&!f;)r._duration||"isPause"!==r.data||r.ratio||0===r._startTime&&0===this._rawPrevTime||(f=r),r=r._next;else for(r=this._last;r&&r._startTime>=t&&!f;)r._duration||"isPause"===r.data&&r._rawPrevTime>0&&(f=r),r=r._prev;f&&(this._time=t=f._startTime,this._totalTime=t+this._cycle*(this._totalDuration+this._repeatDelay))}if(this._cycle!==x&&!this._locked){var b=this._yoyo&&0!==(1&x),w=b===(this._yoyo&&0!==(1&this._cycle)),T=this._totalTime,P=this._cycle,S=this._rawPrevTime,k=this._time;if(this._totalTime=x*p,this._cycle<x?b=!b:this._totalTime+=p,this._time=m,this._rawPrevTime=0===p?y-1e-4:y,this._cycle=x,this._locked=!0,m=b?0:p,this.render(m,e,0===p),e||this._gc||this.vars.onRepeat&&this._callback("onRepeat"),w&&(m=b?p+1e-4:-1e-4,this.render(m,!0,!1)),this._locked=!1,this._paused&&!$)return;this._time=k,this._totalTime=T,this._cycle=P,this._rawPrevTime=S}if(!(this._time!==m&&this._first||i||c||f))return void(_!==this._totalTime&&this._onUpdate&&(e||this._callback("onUpdate")));if(this._initted||(this._initted=!0),this._active||!this._paused&&this._totalTime!==_&&t>0&&(this._active=!0),0===_&&this.vars.onStart&&0!==this._totalTime&&(e||this._callback("onStart")),this._time>=m)for(r=this._first;r&&(l=r._next,!this._paused||$);)(r._active||r._startTime<=this._time&&!r._paused&&!r._gc)&&(f===r&&this.pause(),r._reversed?r.render((r._dirty?r.totalDuration():r._totalDuration)-(t-r._startTime)*r._timeScale,e,i):r.render((t-r._startTime)*r._timeScale,e,i)),r=l;else for(r=this._last;r&&(l=r._prev,!this._paused||$);){if(r._active||r._startTime<=m&&!r._paused&&!r._gc){if(f===r){for(f=r._prev;f&&f.endTime()>this._time;)f.render(f._reversed?f.totalDuration()-(t-f._startTime)*f._timeScale:(t-f._startTime)*f._timeScale,e,i),f=f._prev;f=null,this.pause()}r._reversed?r.render((r._dirty?r.totalDuration():r._totalDuration)-(t-r._startTime)*r._timeScale,e,i):r.render((t-r._startTime)*r._timeScale,e,i)}r=l}this._onUpdate&&(e||(o.length&&a(),this._callback("onUpdate"))),u&&(this._locked||this._gc||(g===this._startTime||v!==this._timeScale)&&(0===this._time||d>=this.totalDuration())&&(s&&(o.length&&a(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[u]&&this._callback(u)))},u.getActive=function(t,e,i){null==t&&(t=!0),null==e&&(e=!0),null==i&&(i=!1);var r,n,s=[],o=this.getChildren(t,e,i),a=0,l=o.length;for(r=0;l>r;r++)n=o[r],n.isActive()&&(s[a++]=n);return s},u.getLabelAfter=function(t){t||0!==t&&(t=this._time);var e,i=this.getLabelsArray(),r=i.length;for(e=0;r>e;e++)if(i[e].time>t)return i[e].name;return null},u.getLabelBefore=function(t){null==t&&(t=this._time);for(var e=this.getLabelsArray(),i=e.length;--i>-1;)if(e[i].time<t)return e[i].name;return null},u.getLabelsArray=function(){var t,e=[],i=0;for(t in this._labels)e[i++]={time:this._labels[t],name:t};return e.sort(function(t,e){return t.time-e.time}),e},u.progress=function(t,e){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!==(1&this._cycle)?1-t:t)+this._cycle*(this._duration+this._repeatDelay),e):this._time/this.duration()},u.totalProgress=function(t,e){return arguments.length?this.totalTime(this.totalDuration()*t,e):this._totalTime/this.totalDuration()},u.totalDuration=function(e){return arguments.length?-1===this._repeat?this:this.duration((e-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(t.prototype.totalDuration.call(this),this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat),this._totalDuration)},u.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),t>this._duration&&(t=this._duration),this._yoyo&&0!==(1&this._cycle)?t=this._duration-t+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(t+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(t,e)):this._time},u.repeat=function(t){return arguments.length?(this._repeat=t,this._uncache(!0)):this._repeat},u.repeatDelay=function(t){return arguments.length?(this._repeatDelay=t,this._uncache(!0)):this._repeatDelay},u.yoyo=function(t){return arguments.length?(this._yoyo=t,this):this._yoyo},u.currentLabel=function(t){return arguments.length?this.seek(t,!0):this.getLabelBefore(this._time+1e-8)},r},!0),function(){var t=180/Math.PI,e=[],r=[],n=[],s={},o=i._gsDefine.globals,a=function(t,e,i,r){this.a=t,this.b=e,this.c=i,this.d=r,this.da=r-t,this.ca=i-t,this.ba=e-t},l=",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",u=function(t,e,i,r){var n={a:t},s={},o={},a={c:r},l=(t+e)/2,u=(e+i)/2,c=(i+r)/2,h=(l+u)/2,f=(u+c)/2,d=(f-h)/8;return n.b=l+(t-l)/4,s.b=h+d,n.c=s.a=(n.b+s.b)/2,s.c=o.a=(h+f)/2,o.b=f-d,a.b=c+(r-c)/4,o.c=a.a=(o.b+a.b)/2,[n,s,o,a]},c=function(t,i,s,o,a){var l,c,h,f,d,p,m,_,g,v,y,$,x,b=t.length-1,w=0,T=t[0].a;for(l=0;b>l;l++)d=t[w],c=d.a,h=d.d,f=t[w+1].d,a?(y=e[l],$=r[l],x=($+y)*i*.25/(o?.5:n[l]||.5),p=h-(h-c)*(o?.5*i:0!==y?x/y:0),m=h+(f-h)*(o?.5*i:0!==$?x/$:0),_=h-(p+((m-p)*(3*y/(y+$)+.5)/4||0))):(p=h-(h-c)*i*.5,m=h+(f-h)*i*.5,_=h-(p+m)/2),p+=_,m+=_,d.c=g=p,0!==l?d.b=T:d.b=T=d.a+.6*(d.c-d.a),d.da=h-c,d.ca=g-c,d.ba=T-c,s?(v=u(c,T,g,h),t.splice(w,1,v[0],v[1],v[2],v[3]),w+=4):w++,T=m;d=t[w],d.b=T,d.c=T+.4*(d.d-T),d.da=d.d-d.a,d.ca=d.c-d.a,d.ba=T-d.a,s&&(v=u(d.a,T,d.c,d.d),t.splice(w,1,v[0],v[1],v[2],v[3]))},h=function(t,i,n,s){var o,l,u,c,h,f,d=[];if(s)for(t=[s].concat(t),l=t.length;--l>-1;)"string"==typeof(f=t[l][i])&&"="===f.charAt(1)&&(t[l][i]=s[i]+Number(f.charAt(0)+f.substr(2)));if(o=t.length-2,0>o)return d[0]=new a(t[0][i],0,0,t[-1>o?0:1][i]),d;for(l=0;o>l;l++)u=t[l][i],c=t[l+1][i],d[l]=new a(u,0,0,c),n&&(h=t[l+2][i],e[l]=(e[l]||0)+(c-u)*(c-u),r[l]=(r[l]||0)+(h-c)*(h-c));return d[l]=new a(t[l][i],0,0,t[l+1][i]),d},f=function(t,i,o,a,u,f){var d,p,m,_,g,v,y,$,x={},b=[],w=f||t[0];u="string"==typeof u?","+u+",":l,null==i&&(i=1);for(p in t[0])b.push(p);if(t.length>1){for($=t[t.length-1],y=!0,d=b.length;--d>-1;)if(p=b[d],Math.abs(w[p]-$[p])>.05){y=!1;break}y&&(t=t.concat(),f&&t.unshift(f),t.push(t[1]),f=t[t.length-3])}for(e.length=r.length=n.length=0,d=b.length;--d>-1;)p=b[d],s[p]=-1!==u.indexOf(","+p+","),x[p]=h(t,p,s[p],f);for(d=e.length;--d>-1;)e[d]=Math.sqrt(e[d]),r[d]=Math.sqrt(r[d]);if(!a){for(d=b.length;--d>-1;)if(s[p])for(m=x[b[d]],v=m.length-1,_=0;v>_;_++)g=m[_+1].da/r[_]+m[_].da/e[_],n[_]=(n[_]||0)+g*g;for(d=n.length;--d>-1;)n[d]=Math.sqrt(n[d])}for(d=b.length,_=o?4:1;--d>-1;)p=b[d],m=x[p],c(m,i,o,a,s[p]),y&&(m.splice(0,_),m.splice(m.length-_,_));return x},d=function(t,e,i){e=e||"soft";var r,n,s,o,l,u,c,h,f,d,p,m={},_="cubic"===e?3:2,g="soft"===e,v=[];if(g&&i&&(t=[i].concat(t)),null==t||t.length<_+1)throw"invalid Bezier data";for(f in t[0])v.push(f);for(u=v.length;--u>-1;){for(f=v[u],m[f]=l=[],d=0,h=t.length,c=0;h>c;c++)r=null==i?t[c][f]:"string"==typeof(p=t[c][f])&&"="===p.charAt(1)?i[f]+Number(p.charAt(0)+p.substr(2)):Number(p),g&&c>1&&h-1>c&&(l[d++]=(r+l[d-2])/2),l[d++]=r;for(h=d-_+1,d=0,c=0;h>c;c+=_)r=l[c],n=l[c+1],s=l[c+2],o=2===_?0:l[c+3],l[d++]=p=3===_?new a(r,n,s,o):new a(r,(2*n+r)/3,(2*n+s)/3,s);l.length=d}return m},p=function(t,e,i){for(var r,n,s,o,a,l,u,c,h,f,d,p=1/i,m=t.length;--m>-1;)for(f=t[m],s=f.a,o=f.d-s,a=f.c-s,l=f.b-s,r=n=0,c=1;i>=c;c++)u=p*c,h=1-u,r=n-(n=(u*u*o+3*h*(u*a+h*l))*u),d=m*i+c-1,e[d]=(e[d]||0)+r*r},m=function(t,e){e=e>>0||6;var i,r,n,s,o=[],a=[],l=0,u=0,c=e-1,h=[],f=[];for(i in t)p(t[i],o,e);for(n=o.length,r=0;n>r;r++)l+=Math.sqrt(o[r]),s=r%e,f[s]=l,s===c&&(u+=l,s=r/e>>0,h[s]=f,a[s]=u,l=0,f=[]);return{length:u,lengths:a,segments:h}},_=i._gsDefine.plugin({propName:"bezier",priority:-1,version:"1.3.4",API:2,global:!0,init:function(t,e,i){this._target=t,e instanceof Array&&(e={values:e}),this._func={},this._round={},this._props=[],this._timeRes=null==e.timeResolution?6:parseInt(e.timeResolution,10);var r,n,s,o,a,l=e.values||[],u={},c=l[0],h=e.autoRotate||i.vars.orientToBezier;this._autoRotate=h?h instanceof Array?h:[["x","y","rotation",h===!0?0:Number(h)||0]]:null;for(r in c)this._props.push(r);for(s=this._props.length;--s>-1;)r=this._props[s],this._overwriteProps.push(r),n=this._func[r]="function"==typeof t[r],u[r]=n?t[r.indexOf("set")||"function"!=typeof t["get"+r.substr(3)]?r:"get"+r.substr(3)]():parseFloat(t[r]),a||u[r]!==l[0][r]&&(a=u);if(this._beziers="cubic"!==e.type&&"quadratic"!==e.type&&"soft"!==e.type?f(l,isNaN(e.curviness)?1:e.curviness,!1,"thruBasic"===e.type,e.correlate,a):d(l,e.type,u),this._segCount=this._beziers[r].length,this._timeRes){var p=m(this._beziers,this._timeRes);this._length=p.length,this._lengths=p.lengths,this._segments=p.segments,this._l1=this._li=this._s1=this._si=0,this._l2=this._lengths[0],this._curSeg=this._segments[0],this._s2=this._curSeg[0],this._prec=1/this._curSeg.length}if(h=this._autoRotate)for(this._initialRotations=[],h[0]instanceof Array||(this._autoRotate=h=[h]),s=h.length;--s>-1;){for(o=0;3>o;o++)r=h[s][o],this._func[r]="function"==typeof t[r]?t[r.indexOf("set")||"function"!=typeof t["get"+r.substr(3)]?r:"get"+r.substr(3)]:!1;r=h[s][2],this._initialRotations[s]=this._func[r]?this._func[r].call(this._target):this._target[r]}return this._startRatio=i.vars.runBackwards?1:0,!0},set:function(e){var i,r,n,s,o,a,l,u,c,h,f=this._segCount,d=this._func,p=this._target,m=e!==this._startRatio;if(this._timeRes){if(c=this._lengths,h=this._curSeg,e*=this._length,n=this._li,e>this._l2&&f-1>n){for(u=f-1;u>n&&(this._l2=c[++n])<=e;);this._l1=c[n-1],this._li=n,this._curSeg=h=this._segments[n],this._s2=h[this._s1=this._si=0]}else if(e<this._l1&&n>0){for(;n>0&&(this._l1=c[--n])>=e;);0===n&&e<this._l1?this._l1=0:n++,this._l2=c[n],this._li=n,this._curSeg=h=this._segments[n],this._s1=h[(this._si=h.length-1)-1]||0,this._s2=h[this._si]}if(i=n,e-=this._l1,n=this._si,e>this._s2&&n<h.length-1){for(u=h.length-1;u>n&&(this._s2=h[++n])<=e;);this._s1=h[n-1],this._si=n}else if(e<this._s1&&n>0){for(;n>0&&(this._s1=h[--n])>=e;);0===n&&e<this._s1?this._s1=0:n++,this._s2=h[n],this._si=n}a=(n+(e-this._s1)/(this._s2-this._s1))*this._prec}else i=0>e?0:e>=1?f-1:f*e>>0,a=(e-i*(1/f))*f;for(r=1-a,n=this._props.length;--n>-1;)s=this._props[n],o=this._beziers[s][i],l=(a*a*o.da+3*r*(a*o.ca+r*o.ba))*a+o.a,this._round[s]&&(l=Math.round(l)),d[s]?p[s](l):p[s]=l;if(this._autoRotate){var _,g,v,y,$,x,b,w=this._autoRotate;for(n=w.length;--n>-1;)s=w[n][2],x=w[n][3]||0,b=w[n][4]===!0?1:t,o=this._beziers[w[n][0]],_=this._beziers[w[n][1]],o&&_&&(o=o[i],_=_[i],g=o.a+(o.b-o.a)*a,y=o.b+(o.c-o.b)*a,g+=(y-g)*a,y+=(o.c+(o.d-o.c)*a-y)*a,v=_.a+(_.b-_.a)*a,$=_.b+(_.c-_.b)*a,v+=($-v)*a,$+=(_.c+(_.d-_.c)*a-$)*a,l=m?Math.atan2($-v,y-g)*b+x:this._initialRotations[n],d[s]?p[s](l):p[s]=l)}}}),g=_.prototype;_.bezierThrough=f,_.cubicToQuadratic=u,_._autoCSS=!0,_.quadraticToCubic=function(t,e,i){return new a(t,(2*e+t)/3,(2*e+i)/3,i)},_._cssRegister=function(){var t=o.CSSPlugin;if(t){var e=t._internals,i=e._parseToProxy,r=e._setPluginRatio,n=e.CSSPropTween;e._registerComplexSpecialProp("bezier",{parser:function(t,e,s,o,a,l){e instanceof Array&&(e={values:e}),l=new _;var u,c,h,f=e.values,d=f.length-1,p=[],m={};if(0>d)return a;for(u=0;d>=u;u++)h=i(t,f[u],o,a,l,d!==u),p[u]=h.end;for(c in e)m[c]=e[c];return m.values=p,a=new n(t,"bezier",0,0,h.pt,2),a.data=h,a.plugin=l,a.setRatio=r,0===m.autoRotate&&(m.autoRotate=!0),!m.autoRotate||m.autoRotate instanceof Array||(u=m.autoRotate===!0?0:Number(m.autoRotate),m.autoRotate=null!=h.end.left?[["left","top","rotation",u,!1]]:null!=h.end.x?[["x","y","rotation",u,!1]]:!1),m.autoRotate&&(o._transform||o._enableTransforms(!1),h.autoRotate=o._target._gsTransform),l._onInitTween(h.proxy,m,o._tween),a}})}},g._roundProps=function(t,e){for(var i=this._overwriteProps,r=i.length;--r>-1;)(t[i[r]]||t.bezier||t.bezierThrough)&&(this._round[i[r]]=e)},g._kill=function(t){var e,i,r=this._props;for(e in this._beziers)if(e in t)for(delete this._beziers[e],delete this._func[e],i=r.length;--i>-1;)r[i]===e&&r.splice(i,1);return this._super._kill.call(this,t)}}(),i._gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(t,e){var r,n,s,o,a=function(){t.call(this,"css"),this._overwriteProps.length=0,this.setRatio=a.prototype.setRatio},l=i._gsDefine.globals,u={},c=a.prototype=new t("css");c.constructor=a,a.version="1.18.0",a.API=2,a.defaultTransformPerspective=0,a.defaultSkewType="compensated",a.defaultSmoothOrigin=!0,c="px",a.suffixMap={top:c,right:c,bottom:c,left:c,width:c,height:c,fontSize:c,padding:c,margin:c,perspective:c,lineHeight:""};var h,f,d,p,m,_,g=/(?:\d|\-\d|\.\d|\-\.\d)+/g,v=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,y=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,$=/(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,x=/(?:\d|\-|\+|=|#|\.)*/g,b=/opacity *= *([^)]*)/i,w=/opacity:([^;]*)/i,T=/alpha\(opacity *=.+?\)/i,P=/^(rgb|hsl)/,S=/([A-Z])/g,k=/-([a-z])/gi,O=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,R=function(t,e){return e.toUpperCase()},j=/(?:Left|Right|Width)/i,A=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,M=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,C=/,(?=[^\)]*(?:\(|$))/gi,D=Math.PI/180,F=180/Math.PI,E={},z=document,I=function(t){return z.createElementNS?z.createElementNS("http://www.w3.org/1999/xhtml",t):z.createElement(t)},N=I("div"),L=I("img"),X=a._internals={_specialProps:u},B=navigator.userAgent,U=function(){var t=B.indexOf("Android"),e=I("a");return d=-1!==B.indexOf("Safari")&&-1===B.indexOf("Chrome")&&(-1===t||Number(B.substr(t+8,1))>3),m=d&&Number(B.substr(B.indexOf("Version/")+8,1))<6,p=-1!==B.indexOf("Firefox"),(/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(B)||/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(B))&&(_=parseFloat(RegExp.$1)),e?(e.style.cssText="top:1px;opacity:.55;",/^0.55/.test(e.style.opacity)):!1}(),Y=function(t){return b.test("string"==typeof t?t:(t.currentStyle?t.currentStyle.filter:t.style.filter)||"")?parseFloat(RegExp.$1)/100:1},G=function(t){window.console&&console.log(t)},q="",W="",V=function(t,e){e=e||N;var i,r,n=e.style;if(void 0!==n[t])return t;for(t=t.charAt(0).toUpperCase()+t.substr(1),i=["O","Moz","ms","Ms","Webkit"],r=5;--r>-1&&void 0===n[i[r]+t];);return r>=0?(W=3===r?"ms":i[r],q="-"+W.toLowerCase()+"-",W+t):null},Z=z.defaultView?z.defaultView.getComputedStyle:function(){},K=a.getStyle=function(t,e,i,r,n){var s;return U||"opacity"!==e?(!r&&t.style[e]?s=t.style[e]:(i=i||Z(t))?s=i[e]||i.getPropertyValue(e)||i.getPropertyValue(e.replace(S,"-$1").toLowerCase()):t.currentStyle&&(s=t.currentStyle[e]),null==n||s&&"none"!==s&&"auto"!==s&&"auto auto"!==s?s:n):Y(t)},H=X.convertToPixels=function(t,i,r,n,s){if("px"===n||!n)return r;if("auto"===n||!r)return 0;var o,l,u,c=j.test(i),h=t,f=N.style,d=0>r;if(d&&(r=-r),"%"===n&&-1!==i.indexOf("border"))o=r/100*(c?t.clientWidth:t.clientHeight);else{if(f.cssText="border:0 solid red;position:"+K(t,"position")+";line-height:0;","%"!==n&&h.appendChild&&"v"!==n.charAt(0)&&"rem"!==n)f[c?"borderLeftWidth":"borderTopWidth"]=r+n;else{if(h=t.parentNode||z.body,l=h._gsCache,u=e.ticker.frame,l&&c&&l.time===u)return l.width*r/100;f[c?"width":"height"]=r+n}h.appendChild(N),o=parseFloat(N[c?"offsetWidth":"offsetHeight"]),h.removeChild(N),c&&"%"===n&&a.cacheWidths!==!1&&(l=h._gsCache=h._gsCache||{},l.time=u,l.width=o/r*100),0!==o||s||(o=H(t,i,r,n,!0))}return d?-o:o},Q=X.calculateOffset=function(t,e,i){if("absolute"!==K(t,"position",i))return 0;var r="left"===e?"Left":"Top",n=K(t,"margin"+r,i);return t["offset"+r]-(H(t,e,parseFloat(n),n.replace(x,""))||0)},J=function(t,e){var i,r,n,s={};if(e=e||Z(t,null))if(i=e.length)for(;--i>-1;)n=e[i],(-1===n.indexOf("-transform")||St===n)&&(s[n.replace(k,R)]=e.getPropertyValue(n));else for(i in e)(-1===i.indexOf("Transform")||Pt===i)&&(s[i]=e[i]);else if(e=t.currentStyle||t.style)for(i in e)"string"==typeof i&&void 0===s[i]&&(s[i.replace(k,R)]=e[i]);return U||(s.opacity=Y(t)),r=It(t,e,!1),s.rotation=r.rotation,s.skewX=r.skewX,s.scaleX=r.scaleX,s.scaleY=r.scaleY,s.x=r.x,s.y=r.y,Ot&&(s.z=r.z,s.rotationX=r.rotationX,s.rotationY=r.rotationY,s.scaleZ=r.scaleZ),s.filters&&delete s.filters,s},tt=function(t,e,i,r,n){var s,o,a,l={},u=t.style;for(o in i)"cssText"!==o&&"length"!==o&&isNaN(o)&&(e[o]!==(s=i[o])||n&&n[o])&&-1===o.indexOf("Origin")&&("number"==typeof s||"string"==typeof s)&&(l[o]="auto"!==s||"left"!==o&&"top"!==o?""!==s&&"auto"!==s&&"none"!==s||"string"!=typeof e[o]||""===e[o].replace($,"")?s:0:Q(t,o),void 0!==u[o]&&(a=new mt(u,o,u[o],a)));if(r)for(o in r)"className"!==o&&(l[o]=r[o]);return{difs:l,firstMPT:a}},et={width:["Left","Right"],height:["Top","Bottom"]},it=["marginLeft","marginRight","marginTop","marginBottom"],rt=function(t,e,i){var r=parseFloat("width"===e?t.offsetWidth:t.offsetHeight),n=et[e],s=n.length;for(i=i||Z(t,null);--s>-1;)r-=parseFloat(K(t,"padding"+n[s],i,!0))||0,r-=parseFloat(K(t,"border"+n[s]+"Width",i,!0))||0;return r},nt=function(t,e){if("contain"===t||"auto"===t||"auto auto"===t)return t+" ";(null==t||""===t)&&(t="0 0");var i=t.split(" "),r=-1!==t.indexOf("left")?"0%":-1!==t.indexOf("right")?"100%":i[0],n=-1!==t.indexOf("top")?"0%":-1!==t.indexOf("bottom")?"100%":i[1];return null==n?n="center"===r?"50%":"0":"center"===n&&(n="50%"),("center"===r||isNaN(parseFloat(r))&&-1===(r+"").indexOf("="))&&(r="50%"),t=r+" "+n+(i.length>2?" "+i[2]:""),e&&(e.oxp=-1!==r.indexOf("%"),e.oyp=-1!==n.indexOf("%"),e.oxr="="===r.charAt(1),e.oyr="="===n.charAt(1),e.ox=parseFloat(r.replace($,"")),e.oy=parseFloat(n.replace($,"")),e.v=t),e||t},st=function(t,e){return"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*parseFloat(t.substr(2)):parseFloat(t)-parseFloat(e)},ot=function(t,e){return null==t?e:"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*parseFloat(t.substr(2))+e:parseFloat(t)},at=function(t,e,i,r){var n,s,o,a,l,u=1e-6;return null==t?a=e:"number"==typeof t?a=t:(n=360,s=t.split("_"),l="="===t.charAt(1),o=(l?parseInt(t.charAt(0)+"1",10)*parseFloat(s[0].substr(2)):parseFloat(s[0]))*(-1===t.indexOf("rad")?1:F)-(l?0:e),s.length&&(r&&(r[i]=e+o),-1!==t.indexOf("short")&&(o%=n,o!==o%(n/2)&&(o=0>o?o+n:o-n)),-1!==t.indexOf("_cw")&&0>o?o=(o+9999999999*n)%n-(o/n|0)*n:-1!==t.indexOf("ccw")&&o>0&&(o=(o-9999999999*n)%n-(o/n|0)*n)),a=e+o),u>a&&a>-u&&(a=0),a},lt={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},ut=function(t,e,i){return t=0>t?t+1:t>1?t-1:t,255*(1>6*t?e+(i-e)*t*6:.5>t?i:2>3*t?e+(i-e)*(2/3-t)*6:e)+.5|0},ct=a.parseColor=function(t,e){var i,r,n,s,o,a,l,u,c,h,f;if(t)if("number"==typeof t)i=[t>>16,t>>8&255,255&t];else{if(","===t.charAt(t.length-1)&&(t=t.substr(0,t.length-1)),lt[t])i=lt[t];else if("#"===t.charAt(0))4===t.length&&(r=t.charAt(1),n=t.charAt(2),s=t.charAt(3),t="#"+r+r+n+n+s+s),t=parseInt(t.substr(1),16),i=[t>>16,t>>8&255,255&t];else if("hsl"===t.substr(0,3))if(i=f=t.match(g),e){if(-1!==t.indexOf("="))return t.match(v)}else o=Number(i[0])%360/360,a=Number(i[1])/100,l=Number(i[2])/100,n=.5>=l?l*(a+1):l+a-l*a,r=2*l-n,i.length>3&&(i[3]=Number(t[3])),i[0]=ut(o+1/3,r,n),i[1]=ut(o,r,n),i[2]=ut(o-1/3,r,n);else i=t.match(g)||lt.transparent;i[0]=Number(i[0]),i[1]=Number(i[1]),i[2]=Number(i[2]),i.length>3&&(i[3]=Number(i[3]))}else i=lt.black;return e&&!f&&(r=i[0]/255,n=i[1]/255,s=i[2]/255,u=Math.max(r,n,s),c=Math.min(r,n,s),l=(u+c)/2,u===c?o=a=0:(h=u-c,a=l>.5?h/(2-u-c):h/(u+c),o=u===r?(n-s)/h+(s>n?6:0):u===n?(s-r)/h+2:(r-n)/h+4,o*=60),i[0]=o+.5|0,i[1]=100*a+.5|0,i[2]=100*l+.5|0),i},ht=function(t,e){var i,r,n,s=t.match(ft)||[],o=0,a=s.length?"":t;for(i=0;i<s.length;i++)r=s[i],n=t.substr(o,t.indexOf(r,o)-o),o+=n.length+r.length,r=ct(r,e),3===r.length&&r.push(1),a+=n+(e?"hsla("+r[0]+","+r[1]+"%,"+r[2]+"%,"+r[3]:"rgba("+r.join(","))+")";return a},ft="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";for(c in lt)ft+="|"+c+"\\b";ft=new RegExp(ft+")","gi"),a.colorStringFilter=function(t){var e,i=t[0]+t[1];ft.lastIndex=0,ft.test(i)&&(e=-1!==i.indexOf("hsl(")||-1!==i.indexOf("hsla("),t[0]=ht(t[0],e),t[1]=ht(t[1],e))},e.defaultStringFilter||(e.defaultStringFilter=a.colorStringFilter);var dt=function(t,e,i,r){if(null==t)return function(t){return t};var n,s=e?(t.match(ft)||[""])[0]:"",o=t.split(s).join("").match(y)||[],a=t.substr(0,t.indexOf(o[0])),l=")"===t.charAt(t.length-1)?")":"",u=-1!==t.indexOf(" ")?" ":",",c=o.length,h=c>0?o[0].replace(g,""):"";return c?n=e?function(t){var e,f,d,p;if("number"==typeof t)t+=h;else if(r&&C.test(t)){for(p=t.replace(C,"|").split("|"),d=0;d<p.length;d++)p[d]=n(p[d]);return p.join(",")}if(e=(t.match(ft)||[s])[0],f=t.split(e).join("").match(y)||[],d=f.length,c>d--)for(;++d<c;)f[d]=i?f[(d-1)/2|0]:o[d];return a+f.join(u)+u+e+l+(-1!==t.indexOf("inset")?" inset":"")}:function(t){var e,s,f;if("number"==typeof t)t+=h;else if(r&&C.test(t)){for(s=t.replace(C,"|").split("|"),f=0;f<s.length;f++)s[f]=n(s[f]);return s.join(",")}if(e=t.match(y)||[],f=e.length,c>f--)for(;++f<c;)e[f]=i?e[(f-1)/2|0]:o[f];return a+e.join(u)+l}:function(t){return t}},pt=function(t){return t=t.split(","),function(e,i,r,n,s,o,a){var l,u=(i+"").split(" ");for(a={},l=0;4>l;l++)a[t[l]]=u[l]=u[l]||u[(l-1)/2>>0];return n.parse(e,a,s,o)}},mt=(X._setPluginRatio=function(t){this.plugin.setRatio(t);for(var e,i,r,n,s=this.data,o=s.proxy,a=s.firstMPT,l=1e-6;a;)e=o[a.v],a.r?e=Math.round(e):l>e&&e>-l&&(e=0),a.t[a.p]=e,a=a._next;if(s.autoRotate&&(s.autoRotate.rotation=o.rotation),1===t)for(a=s.firstMPT;a;){if(i=a.t,i.type){if(1===i.type){for(n=i.xs0+i.s+i.xs1,r=1;r<i.l;r++)n+=i["xn"+r]+i["xs"+(r+1)];i.e=n}}else i.e=i.s+i.xs0;a=a._next}},function(t,e,i,r,n){this.t=t,this.p=e,this.v=i,this.r=n,r&&(r._prev=this,this._next=r)}),_t=(X._parseToProxy=function(t,e,i,r,n,s){var o,a,l,u,c,h=r,f={},d={},p=i._transform,m=E;for(i._transform=null,E=e,r=c=i.parse(t,e,r,n),E=m,s&&(i._transform=p,h&&(h._prev=null,h._prev&&(h._prev._next=null)));r&&r!==h;){if(r.type<=1&&(a=r.p,d[a]=r.s+r.c,f[a]=r.s,s||(u=new mt(r,"s",a,u,r.r),r.c=0),1===r.type))for(o=r.l;--o>0;)l="xn"+o,a=r.p+"_"+l,d[a]=r.data[l],f[a]=r[l],s||(u=new mt(r,l,a,u,r.rxp[l]));r=r._next}return{proxy:f,end:d,firstMPT:u,pt:c}},X.CSSPropTween=function(t,e,i,n,s,a,l,u,c,h,f){this.t=t,this.p=e,this.s=i,this.c=n,this.n=l||e,t instanceof _t||o.push(this.n),this.r=u,this.type=a||0,c&&(this.pr=c,r=!0),this.b=void 0===h?i:h,this.e=void 0===f?i+n:f,s&&(this._next=s,s._prev=this)}),gt=function(t,e,i,r,n,s){var o=new _t(t,e,i,r-i,n,-1,s);return o.b=i,o.e=o.xs0=r,o},vt=a.parseComplex=function(t,e,i,r,n,s,o,a,l,u){i=i||s||"",o=new _t(t,e,0,0,o,u?2:1,null,!1,a,i,r),r+="";var c,f,d,p,m,_,y,$,x,b,w,T,P,S=i.split(", ").join(",").split(" "),k=r.split(", ").join(",").split(" "),O=S.length,R=h!==!1;for((-1!==r.indexOf(",")||-1!==i.indexOf(","))&&(S=S.join(" ").replace(C,", ").split(" "),k=k.join(" ").replace(C,", ").split(" "),O=S.length),O!==k.length&&(S=(s||"").split(" "),O=S.length),o.plugin=l,o.setRatio=u,ft.lastIndex=0,c=0;O>c;c++)if(p=S[c],m=k[c],$=parseFloat(p),$||0===$)o.appendXtra("",$,st(m,$),m.replace(v,""),R&&-1!==m.indexOf("px"),!0);else if(n&&ft.test(p))T=","===m.charAt(m.length-1)?"),":")",P=-1!==m.indexOf("hsl")&&U,p=ct(p,P),m=ct(m,P),x=p.length+m.length>6,x&&!U&&0===m[3]?(o["xs"+o.l]+=o.l?" transparent":"transparent",o.e=o.e.split(k[c]).join("transparent")):(U||(x=!1),P?o.appendXtra(x?"hsla(":"hsl(",p[0],st(m[0],p[0]),",",!1,!0).appendXtra("",p[1],st(m[1],p[1]),"%,",!1).appendXtra("",p[2],st(m[2],p[2]),x?"%,":"%"+T,!1):o.appendXtra(x?"rgba(":"rgb(",p[0],m[0]-p[0],",",!0,!0).appendXtra("",p[1],m[1]-p[1],",",!0).appendXtra("",p[2],m[2]-p[2],x?",":T,!0),x&&(p=p.length<4?1:p[3],o.appendXtra("",p,(m.length<4?1:m[3])-p,T,!1))),ft.lastIndex=0;else if(_=p.match(g)){if(y=m.match(v),!y||y.length!==_.length)return o;for(d=0,f=0;f<_.length;f++)w=_[f],b=p.indexOf(w,d),o.appendXtra(p.substr(d,b-d),Number(w),st(y[f],w),"",R&&"px"===p.substr(b+w.length,2),0===f),d=b+w.length;o["xs"+o.l]+=p.substr(d)}else o["xs"+o.l]+=o.l?" "+p:p;if(-1!==r.indexOf("=")&&o.data){for(T=o.xs0+o.data.s,c=1;c<o.l;c++)T+=o["xs"+c]+o.data["xn"+c];o.e=T+o["xs"+c]}return o.l||(o.type=-1,o.xs0=o.e),o.xfirst||o},yt=9;for(c=_t.prototype,c.l=c.pr=0;--yt>0;)c["xn"+yt]=0,c["xs"+yt]="";c.xs0="",c._next=c._prev=c.xfirst=c.data=c.plugin=c.setRatio=c.rxp=null,c.appendXtra=function(t,e,i,r,n,s){var o=this,a=o.l;return o["xs"+a]+=s&&a?" "+t:t||"",i||0===a||o.plugin?(o.l++,o.type=o.setRatio?2:1,o["xs"+o.l]=r||"",a>0?(o.data["xn"+a]=e+i,o.rxp["xn"+a]=n,o["xn"+a]=e,o.plugin||(o.xfirst=new _t(o,"xn"+a,e,i,o.xfirst||o,0,o.n,n,o.pr),o.xfirst.xs0=0),o):(o.data={s:e+i},o.rxp={},o.s=e,o.c=i,o.r=n,o)):(o["xs"+a]+=e+(r||""),o)};var $t=function(t,e){e=e||{},this.p=e.prefix?V(t)||t:t,u[t]=u[this.p]=this,this.format=e.formatter||dt(e.defaultValue,e.color,e.collapsible,e.multi),e.parser&&(this.parse=e.parser),this.clrs=e.color,this.multi=e.multi,this.keyword=e.keyword,this.dflt=e.defaultValue,this.pr=e.priority||0},xt=X._registerComplexSpecialProp=function(t,e,i){"object"!=typeof e&&(e={parser:i});var r,n,s=t.split(","),o=e.defaultValue;for(i=i||[o],r=0;r<s.length;r++)e.prefix=0===r&&e.prefix,e.defaultValue=i[r]||o,n=new $t(s[r],e)},bt=function(t){if(!u[t]){var e=t.charAt(0).toUpperCase()+t.substr(1)+"Plugin";xt(t,{parser:function(t,i,r,n,s,o,a){var c=l.com.greensock.plugins[e];return c?(c._cssRegister(),u[r].parse(t,i,r,n,s,o,a)):(G("Error: "+e+" js file not loaded."),s)}})}};c=$t.prototype,c.parseComplex=function(t,e,i,r,n,s){var o,a,l,u,c,h,f=this.keyword;if(this.multi&&(C.test(i)||C.test(e)?(a=e.replace(C,"|").split("|"),l=i.replace(C,"|").split("|")):f&&(a=[e],l=[i])),l){for(u=l.length>a.length?l.length:a.length,o=0;u>o;o++)e=a[o]=a[o]||this.dflt,i=l[o]=l[o]||this.dflt,f&&(c=e.indexOf(f),h=i.indexOf(f),c!==h&&(-1===h?a[o]=a[o].split(f).join(""):-1===c&&(a[o]+=" "+f)));e=a.join(", "),i=l.join(", ")}return vt(t,this.p,e,i,this.clrs,this.dflt,r,this.pr,n,s)},c.parse=function(t,e,i,r,n,o,a){return this.parseComplex(t.style,this.format(K(t,this.p,s,!1,this.dflt)),this.format(e),n,o)},a.registerSpecialProp=function(t,e,i){xt(t,{parser:function(t,r,n,s,o,a,l){var u=new _t(t,n,0,0,o,2,n,!1,i);return u.plugin=a,u.setRatio=e(t,r,s._tween,n),u},priority:i})},a.useSVGTransformAttr=d||p;var wt,Tt="scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),Pt=V("transform"),St=q+"transform",kt=V("transformOrigin"),Ot=null!==V("perspective"),Rt=X.Transform=function(){this.perspective=parseFloat(a.defaultTransformPerspective)||0,this.force3D=a.defaultForce3D!==!1&&Ot?a.defaultForce3D||"auto":!1},jt=window.SVGElement,At=function(t,e,i){var r,n=z.createElementNS("http://www.w3.org/2000/svg",t),s=/([a-z])([A-Z])/g;for(r in i)n.setAttributeNS(null,r.replace(s,"$1-$2").toLowerCase(),i[r]);return e.appendChild(n),n},Mt=z.documentElement,Ct=function(){var t,e,i,r=_||/Android/i.test(B)&&!window.chrome;return z.createElementNS&&!r&&(t=At("svg",Mt),e=At("rect",t,{width:100,height:50,x:100}),i=e.getBoundingClientRect().width,e.style[kt]="50% 50%",e.style[Pt]="scaleX(0.5)",r=i===e.getBoundingClientRect().width&&!(p&&Ot),Mt.removeChild(t)),r}(),Dt=function(t,e,i,r,n){var s,o,l,u,c,h,f,d,p,m,_,g,v,y,$=t._gsTransform,x=zt(t,!0);$&&(v=$.xOrigin,y=$.yOrigin),(!r||(s=r.split(" ")).length<2)&&(f=t.getBBox(),e=nt(e).split(" "),s=[(-1!==e[0].indexOf("%")?parseFloat(e[0])/100*f.width:parseFloat(e[0]))+f.x,(-1!==e[1].indexOf("%")?parseFloat(e[1])/100*f.height:parseFloat(e[1]))+f.y]),i.xOrigin=u=parseFloat(s[0]),i.yOrigin=c=parseFloat(s[1]),r&&x!==Et&&(h=x[0],f=x[1],d=x[2],p=x[3],m=x[4],_=x[5],g=h*p-f*d,o=u*(p/g)+c*(-d/g)+(d*_-p*m)/g,l=u*(-f/g)+c*(h/g)-(h*_-f*m)/g,u=i.xOrigin=s[0]=o,c=i.yOrigin=s[1]=l),$&&(n||n!==!1&&a.defaultSmoothOrigin!==!1?(o=u-v,l=c-y,$.xOffset+=o*x[0]+l*x[2]-o,$.yOffset+=o*x[1]+l*x[3]-l):$.xOffset=$.yOffset=0),t.setAttribute("data-svg-origin",s.join(" "))},Ft=function(t){return!!(jt&&"function"==typeof t.getBBox&&t.getCTM&&(!t.parentNode||t.parentNode.getBBox&&t.parentNode.getCTM))},Et=[1,0,0,1,0,0],zt=function(t,e){var i,r,n,s,o,a=t._gsTransform||new Rt,l=1e5;if(Pt?r=K(t,St,null,!0):t.currentStyle&&(r=t.currentStyle.filter.match(A),r=r&&4===r.length?[r[0].substr(4),Number(r[2].substr(4)),Number(r[1].substr(4)),r[3].substr(4),a.x||0,a.y||0].join(","):""),i=!r||"none"===r||"matrix(1, 0, 0, 1, 0, 0)"===r,(a.svg||t.getBBox&&Ft(t))&&(i&&-1!==(t.style[Pt]+"").indexOf("matrix")&&(r=t.style[Pt],i=0),n=t.getAttribute("transform"),i&&n&&(-1!==n.indexOf("matrix")?(r=n,i=0):-1!==n.indexOf("translate")&&(r="matrix(1,0,0,1,"+n.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",")+")",i=0))),i)return Et;for(n=(r||"").match(/(?:\-|\b)[\d\-\.e]+\b/gi)||[],yt=n.length;--yt>-1;)s=Number(n[yt]),n[yt]=(o=s-(s|=0))?(o*l+(0>o?-.5:.5)|0)/l+s:s;return e&&n.length>6?[n[0],n[1],n[4],n[5],n[12],n[13]]:n},It=X.getTransform=function(t,i,r,n){if(t._gsTransform&&r&&!n)return t._gsTransform;var o,l,u,c,h,f,d=r?t._gsTransform||new Rt:new Rt,p=d.scaleX<0,m=2e-5,_=1e5,g=Ot?parseFloat(K(t,kt,i,!1,"0 0 0").split(" ")[2])||d.zOrigin||0:0,v=parseFloat(a.defaultTransformPerspective)||0;if(d.svg=!(!t.getBBox||!Ft(t)),d.svg&&(Dt(t,K(t,kt,s,!1,"50% 50%")+"",d,t.getAttribute("data-svg-origin")),
wt=a.useSVGTransformAttr||Ct),o=zt(t),o!==Et){if(16===o.length){var y,$,x,b,w,T=o[0],P=o[1],S=o[2],k=o[3],O=o[4],R=o[5],j=o[6],A=o[7],M=o[8],C=o[9],D=o[10],E=o[12],z=o[13],I=o[14],N=o[11],L=Math.atan2(j,D);d.zOrigin&&(I=-d.zOrigin,E=M*I-o[12],z=C*I-o[13],I=D*I+d.zOrigin-o[14]),d.rotationX=L*F,L&&(b=Math.cos(-L),w=Math.sin(-L),y=O*b+M*w,$=R*b+C*w,x=j*b+D*w,M=O*-w+M*b,C=R*-w+C*b,D=j*-w+D*b,N=A*-w+N*b,O=y,R=$,j=x),L=Math.atan2(M,D),d.rotationY=L*F,L&&(b=Math.cos(-L),w=Math.sin(-L),y=T*b-M*w,$=P*b-C*w,x=S*b-D*w,C=P*w+C*b,D=S*w+D*b,N=k*w+N*b,T=y,P=$,S=x),L=Math.atan2(P,T),d.rotation=L*F,L&&(b=Math.cos(-L),w=Math.sin(-L),T=T*b+O*w,$=P*b+R*w,R=P*-w+R*b,j=S*-w+j*b,P=$),d.rotationX&&Math.abs(d.rotationX)+Math.abs(d.rotation)>359.9&&(d.rotationX=d.rotation=0,d.rotationY+=180),d.scaleX=(Math.sqrt(T*T+P*P)*_+.5|0)/_,d.scaleY=(Math.sqrt(R*R+C*C)*_+.5|0)/_,d.scaleZ=(Math.sqrt(j*j+D*D)*_+.5|0)/_,d.skewX=0,d.perspective=N?1/(0>N?-N:N):0,d.x=E,d.y=z,d.z=I,d.svg&&(d.x-=d.xOrigin-(d.xOrigin*T-d.yOrigin*O),d.y-=d.yOrigin-(d.yOrigin*P-d.xOrigin*R))}else if((!Ot||n||!o.length||d.x!==o[4]||d.y!==o[5]||!d.rotationX&&!d.rotationY)&&(void 0===d.x||"none"!==K(t,"display",i))){var X=o.length>=6,B=X?o[0]:1,U=o[1]||0,Y=o[2]||0,G=X?o[3]:1;d.x=o[4]||0,d.y=o[5]||0,u=Math.sqrt(B*B+U*U),c=Math.sqrt(G*G+Y*Y),h=B||U?Math.atan2(U,B)*F:d.rotation||0,f=Y||G?Math.atan2(Y,G)*F+h:d.skewX||0,Math.abs(f)>90&&Math.abs(f)<270&&(p?(u*=-1,f+=0>=h?180:-180,h+=0>=h?180:-180):(c*=-1,f+=0>=f?180:-180)),d.scaleX=u,d.scaleY=c,d.rotation=h,d.skewX=f,Ot&&(d.rotationX=d.rotationY=d.z=0,d.perspective=v,d.scaleZ=1),d.svg&&(d.x-=d.xOrigin-(d.xOrigin*B+d.yOrigin*Y),d.y-=d.yOrigin-(d.xOrigin*U+d.yOrigin*G))}d.zOrigin=g;for(l in d)d[l]<m&&d[l]>-m&&(d[l]=0)}return r&&(t._gsTransform=d,d.svg&&(wt&&t.style[Pt]?e.delayedCall(.001,function(){Bt(t.style,Pt)}):!wt&&t.getAttribute("transform")&&e.delayedCall(.001,function(){t.removeAttribute("transform")}))),d},Nt=function(t){var e,i,r=this.data,n=-r.rotation*D,s=n+r.skewX*D,o=1e5,a=(Math.cos(n)*r.scaleX*o|0)/o,l=(Math.sin(n)*r.scaleX*o|0)/o,u=(Math.sin(s)*-r.scaleY*o|0)/o,c=(Math.cos(s)*r.scaleY*o|0)/o,h=this.t.style,f=this.t.currentStyle;if(f){i=l,l=-u,u=-i,e=f.filter,h.filter="";var d,p,m=this.t.offsetWidth,g=this.t.offsetHeight,v="absolute"!==f.position,y="progid:DXImageTransform.Microsoft.Matrix(M11="+a+", M12="+l+", M21="+u+", M22="+c,$=r.x+m*r.xPercent/100,w=r.y+g*r.yPercent/100;if(null!=r.ox&&(d=(r.oxp?m*r.ox*.01:r.ox)-m/2,p=(r.oyp?g*r.oy*.01:r.oy)-g/2,$+=d-(d*a+p*l),w+=p-(d*u+p*c)),v?(d=m/2,p=g/2,y+=", Dx="+(d-(d*a+p*l)+$)+", Dy="+(p-(d*u+p*c)+w)+")"):y+=", sizingMethod='auto expand')",-1!==e.indexOf("DXImageTransform.Microsoft.Matrix(")?h.filter=e.replace(M,y):h.filter=y+" "+e,(0===t||1===t)&&1===a&&0===l&&0===u&&1===c&&(v&&-1===y.indexOf("Dx=0, Dy=0")||b.test(e)&&100!==parseFloat(RegExp.$1)||-1===e.indexOf(e.indexOf("Alpha"))&&h.removeAttribute("filter")),!v){var T,P,S,k=8>_?1:-1;for(d=r.ieOffsetX||0,p=r.ieOffsetY||0,r.ieOffsetX=Math.round((m-((0>a?-a:a)*m+(0>l?-l:l)*g))/2+$),r.ieOffsetY=Math.round((g-((0>c?-c:c)*g+(0>u?-u:u)*m))/2+w),yt=0;4>yt;yt++)P=it[yt],T=f[P],i=-1!==T.indexOf("px")?parseFloat(T):H(this.t,P,parseFloat(T),T.replace(x,""))||0,S=i!==r[P]?2>yt?-r.ieOffsetX:-r.ieOffsetY:2>yt?d-r.ieOffsetX:p-r.ieOffsetY,h[P]=(r[P]=Math.round(i-S*(0===yt||2===yt?1:k)))+"px"}}},Lt=X.set3DTransformRatio=X.setTransformRatio=function(t){var e,i,r,n,s,o,a,l,u,c,h,f,d,m,_,g,v,y,$,x,b,w,T,P=this.data,S=this.t.style,k=P.rotation,O=P.rotationX,R=P.rotationY,j=P.scaleX,A=P.scaleY,M=P.scaleZ,C=P.x,F=P.y,E=P.z,z=P.svg,I=P.perspective,N=P.force3D;if(((1===t||0===t)&&"auto"===N&&(this.tween._totalTime===this.tween._totalDuration||!this.tween._totalTime)||!N)&&!E&&!I&&!R&&!O||wt&&z||!Ot)return void(k||P.skewX||z?(k*=D,w=P.skewX*D,T=1e5,e=Math.cos(k)*j,n=Math.sin(k)*j,i=Math.sin(k-w)*-A,s=Math.cos(k-w)*A,w&&"simple"===P.skewType&&(v=Math.tan(w),v=Math.sqrt(1+v*v),i*=v,s*=v,P.skewY&&(e*=v,n*=v)),z&&(C+=P.xOrigin-(P.xOrigin*e+P.yOrigin*i)+P.xOffset,F+=P.yOrigin-(P.xOrigin*n+P.yOrigin*s)+P.yOffset,wt&&(P.xPercent||P.yPercent)&&(m=this.t.getBBox(),C+=.01*P.xPercent*m.width,F+=.01*P.yPercent*m.height),m=1e-6,m>C&&C>-m&&(C=0),m>F&&F>-m&&(F=0)),$=(e*T|0)/T+","+(n*T|0)/T+","+(i*T|0)/T+","+(s*T|0)/T+","+C+","+F+")",z&&wt?this.t.setAttribute("transform","matrix("+$):S[Pt]=(P.xPercent||P.yPercent?"translate("+P.xPercent+"%,"+P.yPercent+"%) matrix(":"matrix(")+$):S[Pt]=(P.xPercent||P.yPercent?"translate("+P.xPercent+"%,"+P.yPercent+"%) matrix(":"matrix(")+j+",0,0,"+A+","+C+","+F+")");if(p&&(m=1e-4,m>j&&j>-m&&(j=M=2e-5),m>A&&A>-m&&(A=M=2e-5),!I||P.z||P.rotationX||P.rotationY||(I=0)),k||P.skewX)k*=D,_=e=Math.cos(k),g=n=Math.sin(k),P.skewX&&(k-=P.skewX*D,_=Math.cos(k),g=Math.sin(k),"simple"===P.skewType&&(v=Math.tan(P.skewX*D),v=Math.sqrt(1+v*v),_*=v,g*=v,P.skewY&&(e*=v,n*=v))),i=-g,s=_;else{if(!(R||O||1!==M||I||z))return void(S[Pt]=(P.xPercent||P.yPercent?"translate("+P.xPercent+"%,"+P.yPercent+"%) translate3d(":"translate3d(")+C+"px,"+F+"px,"+E+"px)"+(1!==j||1!==A?" scale("+j+","+A+")":""));e=s=1,i=n=0}u=1,r=o=a=l=c=h=0,f=I?-1/I:0,d=P.zOrigin,m=1e-6,x=",",b="0",k=R*D,k&&(_=Math.cos(k),g=Math.sin(k),a=-g,c=f*-g,r=e*g,o=n*g,u=_,f*=_,e*=_,n*=_),k=O*D,k&&(_=Math.cos(k),g=Math.sin(k),v=i*_+r*g,y=s*_+o*g,l=u*g,h=f*g,r=i*-g+r*_,o=s*-g+o*_,u*=_,f*=_,i=v,s=y),1!==M&&(r*=M,o*=M,u*=M,f*=M),1!==A&&(i*=A,s*=A,l*=A,h*=A),1!==j&&(e*=j,n*=j,a*=j,c*=j),(d||z)&&(d&&(C+=r*-d,F+=o*-d,E+=u*-d+d),z&&(C+=P.xOrigin-(P.xOrigin*e+P.yOrigin*i)+P.xOffset,F+=P.yOrigin-(P.xOrigin*n+P.yOrigin*s)+P.yOffset),m>C&&C>-m&&(C=b),m>F&&F>-m&&(F=b),m>E&&E>-m&&(E=0)),$=P.xPercent||P.yPercent?"translate("+P.xPercent+"%,"+P.yPercent+"%) matrix3d(":"matrix3d(",$+=(m>e&&e>-m?b:e)+x+(m>n&&n>-m?b:n)+x+(m>a&&a>-m?b:a),$+=x+(m>c&&c>-m?b:c)+x+(m>i&&i>-m?b:i)+x+(m>s&&s>-m?b:s),O||R?($+=x+(m>l&&l>-m?b:l)+x+(m>h&&h>-m?b:h)+x+(m>r&&r>-m?b:r),$+=x+(m>o&&o>-m?b:o)+x+(m>u&&u>-m?b:u)+x+(m>f&&f>-m?b:f)+x):$+=",0,0,0,0,1,0,",$+=C+x+F+x+E+x+(I?1+-E/I:1)+")",S[Pt]=$};c=Rt.prototype,c.x=c.y=c.z=c.skewX=c.skewY=c.rotation=c.rotationX=c.rotationY=c.zOrigin=c.xPercent=c.yPercent=c.xOffset=c.yOffset=0,c.scaleX=c.scaleY=c.scaleZ=1,xt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",{parser:function(t,e,i,r,n,o,l){if(r._lastParsedTransform===l)return n;r._lastParsedTransform=l;var u,c,h,f,d,p,m,_,g,v,y=t._gsTransform,$=t.style,x=1e-6,b=Tt.length,w=l,T={},P="transformOrigin";if(l.display?(f=K(t,"display"),$.display="block",u=It(t,s,!0,l.parseTransform),$.display=f):u=It(t,s,!0,l.parseTransform),r._transform=u,"string"==typeof w.transform&&Pt)f=N.style,f[Pt]=w.transform,f.display="block",f.position="absolute",z.body.appendChild(N),c=It(N,null,!1),z.body.removeChild(N),c.perspective||(c.perspective=u.perspective),null!=w.xPercent&&(c.xPercent=ot(w.xPercent,u.xPercent)),null!=w.yPercent&&(c.yPercent=ot(w.yPercent,u.yPercent));else if("object"==typeof w){if(c={scaleX:ot(null!=w.scaleX?w.scaleX:w.scale,u.scaleX),scaleY:ot(null!=w.scaleY?w.scaleY:w.scale,u.scaleY),scaleZ:ot(w.scaleZ,u.scaleZ),x:ot(w.x,u.x),y:ot(w.y,u.y),z:ot(w.z,u.z),xPercent:ot(w.xPercent,u.xPercent),yPercent:ot(w.yPercent,u.yPercent),perspective:ot(w.transformPerspective,u.perspective)},_=w.directionalRotation,null!=_)if("object"==typeof _)for(f in _)w[f]=_[f];else w.rotation=_;"string"==typeof w.x&&-1!==w.x.indexOf("%")&&(c.x=0,c.xPercent=ot(w.x,u.xPercent)),"string"==typeof w.y&&-1!==w.y.indexOf("%")&&(c.y=0,c.yPercent=ot(w.y,u.yPercent)),c.rotation=at("rotation"in w?w.rotation:"shortRotation"in w?w.shortRotation+"_short":"rotationZ"in w?w.rotationZ:u.rotation,u.rotation,"rotation",T),Ot&&(c.rotationX=at("rotationX"in w?w.rotationX:"shortRotationX"in w?w.shortRotationX+"_short":u.rotationX||0,u.rotationX,"rotationX",T),c.rotationY=at("rotationY"in w?w.rotationY:"shortRotationY"in w?w.shortRotationY+"_short":u.rotationY||0,u.rotationY,"rotationY",T)),c.skewX=null==w.skewX?u.skewX:at(w.skewX,u.skewX),c.skewY=null==w.skewY?u.skewY:at(w.skewY,u.skewY),(h=c.skewY-u.skewY)&&(c.skewX+=h,c.rotation+=h)}for(Ot&&null!=w.force3D&&(u.force3D=w.force3D,m=!0),u.skewType=w.skewType||u.skewType||a.defaultSkewType,p=u.force3D||u.z||u.rotationX||u.rotationY||c.z||c.rotationX||c.rotationY||c.perspective,p||null==w.scale||(c.scaleZ=1);--b>-1;)i=Tt[b],d=c[i]-u[i],(d>x||-x>d||null!=w[i]||null!=E[i])&&(m=!0,n=new _t(u,i,u[i],d,n),i in T&&(n.e=T[i]),n.xs0=0,n.plugin=o,r._overwriteProps.push(n.n));return d=w.transformOrigin,u.svg&&(d||w.svgOrigin)&&(g=u.xOffset,v=u.yOffset,Dt(t,nt(d),c,w.svgOrigin,w.smoothOrigin),n=gt(u,"xOrigin",(y?u:c).xOrigin,c.xOrigin,n,P),n=gt(u,"yOrigin",(y?u:c).yOrigin,c.yOrigin,n,P),(g!==u.xOffset||v!==u.yOffset)&&(n=gt(u,"xOffset",y?g:u.xOffset,u.xOffset,n,P),n=gt(u,"yOffset",y?v:u.yOffset,u.yOffset,n,P)),d=wt?null:"0px 0px"),(d||Ot&&p&&u.zOrigin)&&(Pt?(m=!0,i=kt,d=(d||K(t,i,s,!1,"50% 50%"))+"",n=new _t($,i,0,0,n,-1,P),n.b=$[i],n.plugin=o,Ot?(f=u.zOrigin,d=d.split(" "),u.zOrigin=(d.length>2&&(0===f||"0px"!==d[2])?parseFloat(d[2]):f)||0,n.xs0=n.e=d[0]+" "+(d[1]||"50%")+" 0px",n=new _t(u,"zOrigin",0,0,n,-1,n.n),n.b=f,n.xs0=n.e=u.zOrigin):n.xs0=n.e=d):nt(d+"",u)),m&&(r._transformType=u.svg&&wt||!p&&3!==this._transformType?2:3),n},prefix:!0}),xt("boxShadow",{defaultValue:"0px 0px 0px 0px #999",prefix:!0,color:!0,multi:!0,keyword:"inset"}),xt("borderRadius",{defaultValue:"0px",parser:function(t,e,i,r,o,a){e=this.format(e);var l,u,c,h,f,d,p,m,_,g,v,y,$,x,b,w,T=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],P=t.style;for(_=parseFloat(t.offsetWidth),g=parseFloat(t.offsetHeight),l=e.split(" "),u=0;u<T.length;u++)this.p.indexOf("border")&&(T[u]=V(T[u])),f=h=K(t,T[u],s,!1,"0px"),-1!==f.indexOf(" ")&&(h=f.split(" "),f=h[0],h=h[1]),d=c=l[u],p=parseFloat(f),y=f.substr((p+"").length),$="="===d.charAt(1),$?(m=parseInt(d.charAt(0)+"1",10),d=d.substr(2),m*=parseFloat(d),v=d.substr((m+"").length-(0>m?1:0))||""):(m=parseFloat(d),v=d.substr((m+"").length)),""===v&&(v=n[i]||y),v!==y&&(x=H(t,"borderLeft",p,y),b=H(t,"borderTop",p,y),"%"===v?(f=x/_*100+"%",h=b/g*100+"%"):"em"===v?(w=H(t,"borderLeft",1,"em"),f=x/w+"em",h=b/w+"em"):(f=x+"px",h=b+"px"),$&&(d=parseFloat(f)+m+v,c=parseFloat(h)+m+v)),o=vt(P,T[u],f+" "+h,d+" "+c,!1,"0px",o);return o},prefix:!0,formatter:dt("0px 0px 0px 0px",!1,!0)}),xt("backgroundPosition",{defaultValue:"0 0",parser:function(t,e,i,r,n,o){var a,l,u,c,h,f,d="background-position",p=s||Z(t,null),m=this.format((p?_?p.getPropertyValue(d+"-x")+" "+p.getPropertyValue(d+"-y"):p.getPropertyValue(d):t.currentStyle.backgroundPositionX+" "+t.currentStyle.backgroundPositionY)||"0 0"),g=this.format(e);if(-1!==m.indexOf("%")!=(-1!==g.indexOf("%"))&&(f=K(t,"backgroundImage").replace(O,""),f&&"none"!==f)){for(a=m.split(" "),l=g.split(" "),L.setAttribute("src",f),u=2;--u>-1;)m=a[u],c=-1!==m.indexOf("%"),c!==(-1!==l[u].indexOf("%"))&&(h=0===u?t.offsetWidth-L.width:t.offsetHeight-L.height,a[u]=c?parseFloat(m)/100*h+"px":parseFloat(m)/h*100+"%");m=a.join(" ")}return this.parseComplex(t.style,m,g,n,o)},formatter:nt}),xt("backgroundSize",{defaultValue:"0 0",formatter:nt}),xt("perspective",{defaultValue:"0px",prefix:!0}),xt("perspectiveOrigin",{defaultValue:"50% 50%",prefix:!0}),xt("transformStyle",{prefix:!0}),xt("backfaceVisibility",{prefix:!0}),xt("userSelect",{prefix:!0}),xt("margin",{parser:pt("marginTop,marginRight,marginBottom,marginLeft")}),xt("padding",{parser:pt("paddingTop,paddingRight,paddingBottom,paddingLeft")}),xt("clip",{defaultValue:"rect(0px,0px,0px,0px)",parser:function(t,e,i,r,n,o){var a,l,u;return 9>_?(l=t.currentStyle,u=8>_?" ":",",a="rect("+l.clipTop+u+l.clipRight+u+l.clipBottom+u+l.clipLeft+")",e=this.format(e).split(",").join(u)):(a=this.format(K(t,this.p,s,!1,this.dflt)),e=this.format(e)),this.parseComplex(t.style,a,e,n,o)}}),xt("textShadow",{defaultValue:"0px 0px 0px #999",color:!0,multi:!0}),xt("autoRound,strictUnits",{parser:function(t,e,i,r,n){return n}}),xt("border",{defaultValue:"0px solid #000",parser:function(t,e,i,r,n,o){return this.parseComplex(t.style,this.format(K(t,"borderTopWidth",s,!1,"0px")+" "+K(t,"borderTopStyle",s,!1,"solid")+" "+K(t,"borderTopColor",s,!1,"#000")),this.format(e),n,o)},color:!0,formatter:function(t){var e=t.split(" ");return e[0]+" "+(e[1]||"solid")+" "+(t.match(ft)||["#000"])[0]}}),xt("borderWidth",{parser:pt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}),xt("float,cssFloat,styleFloat",{parser:function(t,e,i,r,n,s){var o=t.style,a="cssFloat"in o?"cssFloat":"styleFloat";return new _t(o,a,0,0,n,-1,i,!1,0,o[a],e)}});var Xt=function(t){var e,i=this.t,r=i.filter||K(this.data,"filter")||"",n=this.s+this.c*t|0;100===n&&(-1===r.indexOf("atrix(")&&-1===r.indexOf("radient(")&&-1===r.indexOf("oader(")?(i.removeAttribute("filter"),e=!K(this.data,"filter")):(i.filter=r.replace(T,""),e=!0)),e||(this.xn1&&(i.filter=r=r||"alpha(opacity="+n+")"),-1===r.indexOf("pacity")?0===n&&this.xn1||(i.filter=r+" alpha(opacity="+n+")"):i.filter=r.replace(b,"opacity="+n))};xt("opacity,alpha,autoAlpha",{defaultValue:"1",parser:function(t,e,i,r,n,o){var a=parseFloat(K(t,"opacity",s,!1,"1")),l=t.style,u="autoAlpha"===i;return"string"==typeof e&&"="===e.charAt(1)&&(e=("-"===e.charAt(0)?-1:1)*parseFloat(e.substr(2))+a),u&&1===a&&"hidden"===K(t,"visibility",s)&&0!==e&&(a=0),U?n=new _t(l,"opacity",a,e-a,n):(n=new _t(l,"opacity",100*a,100*(e-a),n),n.xn1=u?1:0,l.zoom=1,n.type=2,n.b="alpha(opacity="+n.s+")",n.e="alpha(opacity="+(n.s+n.c)+")",n.data=t,n.plugin=o,n.setRatio=Xt),u&&(n=new _t(l,"visibility",0,0,n,-1,null,!1,0,0!==a?"inherit":"hidden",0===e?"hidden":"inherit"),n.xs0="inherit",r._overwriteProps.push(n.n),r._overwriteProps.push(i)),n}});var Bt=function(t,e){e&&(t.removeProperty?(("ms"===e.substr(0,2)||"webkit"===e.substr(0,6))&&(e="-"+e),t.removeProperty(e.replace(S,"-$1").toLowerCase())):t.removeAttribute(e))},Ut=function(t){if(this.t._gsClassPT=this,1===t||0===t){this.t.setAttribute("class",0===t?this.b:this.e);for(var e=this.data,i=this.t.style;e;)e.v?i[e.p]=e.v:Bt(i,e.p),e=e._next;1===t&&this.t._gsClassPT===this&&(this.t._gsClassPT=null)}else this.t.getAttribute("class")!==this.e&&this.t.setAttribute("class",this.e)};xt("className",{parser:function(t,e,i,n,o,a,l){var u,c,h,f,d,p=t.getAttribute("class")||"",m=t.style.cssText;if(o=n._classNamePT=new _t(t,i,0,0,o,2),o.setRatio=Ut,o.pr=-11,r=!0,o.b=p,c=J(t,s),h=t._gsClassPT){for(f={},d=h.data;d;)f[d.p]=1,d=d._next;h.setRatio(1)}return t._gsClassPT=o,o.e="="!==e.charAt(1)?e:p.replace(new RegExp("\\s*\\b"+e.substr(2)+"\\b"),"")+("+"===e.charAt(0)?" "+e.substr(2):""),t.setAttribute("class",o.e),u=tt(t,c,J(t),l,f),t.setAttribute("class",p),o.data=u.firstMPT,t.style.cssText=m,o=o.xfirst=n.parse(t,u.difs,o,a)}});var Yt=function(t){if((1===t||0===t)&&this.data._totalTime===this.data._totalDuration&&"isFromStart"!==this.data.data){var e,i,r,n,s,o=this.t.style,a=u.transform.parse;if("all"===this.e)o.cssText="",n=!0;else for(e=this.e.split(" ").join("").split(","),r=e.length;--r>-1;)i=e[r],u[i]&&(u[i].parse===a?n=!0:i="transformOrigin"===i?kt:u[i].p),Bt(o,i);n&&(Bt(o,Pt),s=this.t._gsTransform,s&&(s.svg&&this.t.removeAttribute("data-svg-origin"),delete this.t._gsTransform))}};for(xt("clearProps",{parser:function(t,e,i,n,s){return s=new _t(t,i,0,0,s,2),s.setRatio=Yt,s.e=e,s.pr=-10,s.data=n._tween,r=!0,s}}),c="bezier,throwProps,physicsProps,physics2D".split(","),yt=c.length;yt--;)bt(c[yt]);c=a.prototype,c._firstPT=c._lastParsedTransform=c._transform=null,c._onInitTween=function(t,e,i){if(!t.nodeType)return!1;this._target=t,this._tween=i,this._vars=e,h=e.autoRound,r=!1,n=e.suffixMap||a.suffixMap,s=Z(t,""),o=this._overwriteProps;var l,c,p,_,g,v,y,$,x,b=t.style;if(f&&""===b.zIndex&&(l=K(t,"zIndex",s),("auto"===l||""===l)&&this._addLazySet(b,"zIndex",0)),"string"==typeof e&&(_=b.cssText,l=J(t,s),b.cssText=_+";"+e,l=tt(t,l,J(t)).difs,!U&&w.test(e)&&(l.opacity=parseFloat(RegExp.$1)),e=l,b.cssText=_),e.className?this._firstPT=c=u.className.parse(t,e.className,"className",this,null,null,e):this._firstPT=c=this.parse(t,e,null),this._transformType){for(x=3===this._transformType,Pt?d&&(f=!0,""===b.zIndex&&(y=K(t,"zIndex",s),("auto"===y||""===y)&&this._addLazySet(b,"zIndex",0)),m&&this._addLazySet(b,"WebkitBackfaceVisibility",this._vars.WebkitBackfaceVisibility||(x?"visible":"hidden"))):b.zoom=1,p=c;p&&p._next;)p=p._next;$=new _t(t,"transform",0,0,null,2),this._linkCSSP($,null,p),$.setRatio=Pt?Lt:Nt,$.data=this._transform||It(t,s,!0),$.tween=i,$.pr=-1,o.pop()}if(r){for(;c;){for(v=c._next,p=_;p&&p.pr>c.pr;)p=p._next;(c._prev=p?p._prev:g)?c._prev._next=c:_=c,(c._next=p)?p._prev=c:g=c,c=v}this._firstPT=_}return!0},c.parse=function(t,e,i,r){var o,a,l,c,f,d,p,m,_,g,v=t.style;for(o in e)d=e[o],a=u[o],a?i=a.parse(t,d,o,this,i,r,e):(f=K(t,o,s)+"",_="string"==typeof d,"color"===o||"fill"===o||"stroke"===o||-1!==o.indexOf("Color")||_&&P.test(d)?(_||(d=ct(d),d=(d.length>3?"rgba(":"rgb(")+d.join(",")+")"),i=vt(v,o,f,d,!0,"transparent",i,0,r)):!_||-1===d.indexOf(" ")&&-1===d.indexOf(",")?(l=parseFloat(f),p=l||0===l?f.substr((l+"").length):"",(""===f||"auto"===f)&&("width"===o||"height"===o?(l=rt(t,o,s),p="px"):"left"===o||"top"===o?(l=Q(t,o,s),p="px"):(l="opacity"!==o?0:1,p="")),g=_&&"="===d.charAt(1),g?(c=parseInt(d.charAt(0)+"1",10),d=d.substr(2),c*=parseFloat(d),m=d.replace(x,"")):(c=parseFloat(d),m=_?d.replace(x,""):""),""===m&&(m=o in n?n[o]:p),d=c||0===c?(g?c+l:c)+m:e[o],p!==m&&""!==m&&(c||0===c)&&l&&(l=H(t,o,l,p),"%"===m?(l/=H(t,o,100,"%")/100,e.strictUnits!==!0&&(f=l+"%")):"em"===m||"rem"===m?l/=H(t,o,1,m):"px"!==m&&(c=H(t,o,c,m),m="px"),g&&(c||0===c)&&(d=c+l+m)),g&&(c+=l),!l&&0!==l||!c&&0!==c?void 0!==v[o]&&(d||d+""!="NaN"&&null!=d)?(i=new _t(v,o,c||l||0,0,i,-1,o,!1,0,f,d),i.xs0="none"!==d||"display"!==o&&-1===o.indexOf("Style")?d:f):G("invalid "+o+" tween value: "+e[o]):(i=new _t(v,o,l,c-l,i,0,o,h!==!1&&("px"===m||"zIndex"===o),0,f,d),i.xs0=m)):i=vt(v,o,f,d,!0,null,i,0,r)),r&&i&&!i.plugin&&(i.plugin=r);return i},c.setRatio=function(t){var e,i,r,n=this._firstPT,s=1e-6;if(1!==t||this._tween._time!==this._tween._duration&&0!==this._tween._time)if(t||this._tween._time!==this._tween._duration&&0!==this._tween._time||this._tween._rawPrevTime===-1e-6)for(;n;){if(e=n.c*t+n.s,n.r?e=Math.round(e):s>e&&e>-s&&(e=0),n.type)if(1===n.type)if(r=n.l,2===r)n.t[n.p]=n.xs0+e+n.xs1+n.xn1+n.xs2;else if(3===r)n.t[n.p]=n.xs0+e+n.xs1+n.xn1+n.xs2+n.xn2+n.xs3;else if(4===r)n.t[n.p]=n.xs0+e+n.xs1+n.xn1+n.xs2+n.xn2+n.xs3+n.xn3+n.xs4;else if(5===r)n.t[n.p]=n.xs0+e+n.xs1+n.xn1+n.xs2+n.xn2+n.xs3+n.xn3+n.xs4+n.xn4+n.xs5;else{for(i=n.xs0+e+n.xs1,r=1;r<n.l;r++)i+=n["xn"+r]+n["xs"+(r+1)];n.t[n.p]=i}else-1===n.type?n.t[n.p]=n.xs0:n.setRatio&&n.setRatio(t);else n.t[n.p]=e+n.xs0;n=n._next}else for(;n;)2!==n.type?n.t[n.p]=n.b:n.setRatio(t),n=n._next;else for(;n;){if(2!==n.type)if(n.r&&-1!==n.type)if(e=Math.round(n.s+n.c),n.type){if(1===n.type){for(r=n.l,i=n.xs0+e+n.xs1,r=1;r<n.l;r++)i+=n["xn"+r]+n["xs"+(r+1)];n.t[n.p]=i}}else n.t[n.p]=e+n.xs0;else n.t[n.p]=n.e;else n.setRatio(t);n=n._next}},c._enableTransforms=function(t){this._transform=this._transform||It(this._target,s,!0),this._transformType=this._transform.svg&&wt||!t&&3!==this._transformType?2:3};var Gt=function(t){this.t[this.p]=this.e,this.data._linkCSSP(this,this._next,null,!0)};c._addLazySet=function(t,e,i){var r=this._firstPT=new _t(t,e,0,0,this._firstPT,2);r.e=i,r.setRatio=Gt,r.data=this},c._linkCSSP=function(t,e,i,r){return t&&(e&&(e._prev=t),t._next&&(t._next._prev=t._prev),t._prev?t._prev._next=t._next:this._firstPT===t&&(this._firstPT=t._next,r=!0),i?i._next=t:r||null!==this._firstPT||(this._firstPT=t),t._next=e,t._prev=i),t},c._kill=function(e){var i,r,n,s=e;if(e.autoAlpha||e.alpha){s={};for(r in e)s[r]=e[r];s.opacity=1,s.autoAlpha&&(s.visibility=1)}return e.className&&(i=this._classNamePT)&&(n=i.xfirst,n&&n._prev?this._linkCSSP(n._prev,i._next,n._prev._prev):n===this._firstPT&&(this._firstPT=i._next),i._next&&this._linkCSSP(i._next,i._next._next,n._prev),this._classNamePT=null),t.prototype._kill.call(this,s)};var qt=function(t,e,i){var r,n,s,o;if(t.slice)for(n=t.length;--n>-1;)qt(t[n],e,i);else for(r=t.childNodes,n=r.length;--n>-1;)s=r[n],o=s.type,s.style&&(e.push(J(s)),i&&i.push(s)),1!==o&&9!==o&&11!==o||!s.childNodes.length||qt(s,e,i)};return a.cascadeTo=function(t,i,r){var n,s,o,a,l=e.to(t,i,r),u=[l],c=[],h=[],f=[],d=e._internals.reservedProps;for(t=l._targets||l.target,qt(t,c,f),l.render(i,!0,!0),qt(t,h),l.render(0,!0,!0),l._enabled(!0),n=f.length;--n>-1;)if(s=tt(f[n],c[n],h[n]),s.firstMPT){s=s.difs;for(o in r)d[o]&&(s[o]=r[o]);a={};for(o in s)a[o]=c[n][o];u.push(e.fromTo(f[n],i,a,s))}return u},t.activate([a]),a},!0),function(){var t=i._gsDefine.plugin({propName:"roundProps",version:"1.5",priority:-1,API:2,init:function(t,e,i){return this._tween=i,!0}}),e=function(t){for(;t;)t.f||t.blob||(t.r=1),t=t._next},r=t.prototype;r._onInitAllProps=function(){for(var t,i,r,n=this._tween,s=n.vars.roundProps.join?n.vars.roundProps:n.vars.roundProps.split(","),o=s.length,a={},l=n._propLookup.roundProps;--o>-1;)a[s[o]]=1;for(o=s.length;--o>-1;)for(t=s[o],i=n._firstPT;i;)r=i._next,i.pg?i.t._roundProps(a,!0):i.n===t&&(2===i.f&&i.t?e(i.t._firstPT):(this._add(i.t,t,i.s,i.c),r&&(r._prev=i._prev),i._prev?i._prev._next=r:n._firstPT===i&&(n._firstPT=r),i._next=i._prev=null,n._propLookup[t]=l)),i=r;return!1},r._add=function(t,e,i,r){this._addTween(t,e,i,i+r,e,!0),this._overwriteProps.push(e)}}(),function(){i._gsDefine.plugin({propName:"attr",API:2,version:"0.5.0",init:function(t,e,i){var r;if("function"!=typeof t.setAttribute)return!1;for(r in e)this._addTween(t,"setAttribute",t.getAttribute(r)+"",e[r]+"",r,!1,r),this._overwriteProps.push(r);return!0}})}(),i._gsDefine.plugin({propName:"directionalRotation",version:"0.2.1",API:2,init:function(t,e,i){"object"!=typeof e&&(e={rotation:e}),this.finals={};var r,n,s,o,a,l,u=e.useRadians===!0?2*Math.PI:360,c=1e-6;for(r in e)"useRadians"!==r&&(l=(e[r]+"").split("_"),n=l[0],s=parseFloat("function"!=typeof t[r]?t[r]:t[r.indexOf("set")||"function"!=typeof t["get"+r.substr(3)]?r:"get"+r.substr(3)]()),o=this.finals[r]="string"==typeof n&&"="===n.charAt(1)?s+parseInt(n.charAt(0)+"1",10)*Number(n.substr(2)):Number(n)||0,a=o-s,l.length&&(n=l.join("_"),-1!==n.indexOf("short")&&(a%=u,a!==a%(u/2)&&(a=0>a?a+u:a-u)),-1!==n.indexOf("_cw")&&0>a?a=(a+9999999999*u)%u-(a/u|0)*u:-1!==n.indexOf("ccw")&&a>0&&(a=(a-9999999999*u)%u-(a/u|0)*u)),(a>c||-c>a)&&(this._addTween(t,r,s,s+a,r),this._overwriteProps.push(r)));return!0},set:function(t){var e;if(1!==t)this._super.setRatio.call(this,t);else for(e=this._firstPT;e;)e.f?e.t[e.p](this.finals[e.p]):e.t[e.p]=this.finals[e.p],e=e._next}})._autoCSS=!0,i._gsDefine("easing.Back",["easing.Ease"],function(t){var e,r,n,s=i.GreenSockGlobals||i,o=s.com.greensock,a=2*Math.PI,l=Math.PI/2,u=o._class,c=function(e,i){var r=u("easing."+e,function(){},!0),n=r.prototype=new t;return n.constructor=r,n.getRatio=i,r},h=t.register||function(){},f=function(t,e,i,r,n){var s=u("easing."+t,{easeOut:new e,easeIn:new i,easeInOut:new r},!0);return h(s,t),s},d=function(t,e,i){this.t=t,this.v=e,i&&(this.next=i,i.prev=this,this.c=i.v-e,this.gap=i.t-t)},p=function(e,i){var r=u("easing."+e,function(t){this._p1=t||0===t?t:1.70158,this._p2=1.525*this._p1},!0),n=r.prototype=new t;return n.constructor=r,n.getRatio=i,n.config=function(t){return new r(t)},r},m=f("Back",p("BackOut",function(t){return(t-=1)*t*((this._p1+1)*t+this._p1)+1}),p("BackIn",function(t){return t*t*((this._p1+1)*t-this._p1)}),p("BackInOut",function(t){return(t*=2)<1?.5*t*t*((this._p2+1)*t-this._p2):.5*((t-=2)*t*((this._p2+1)*t+this._p2)+2)})),_=u("easing.SlowMo",function(t,e,i){e=e||0===e?e:.7,null==t?t=.7:t>1&&(t=1),this._p=1!==t?e:0,this._p1=(1-t)/2,this._p2=t,this._p3=this._p1+this._p2,this._calcEnd=i===!0},!0),g=_.prototype=new t;return g.constructor=_,g.getRatio=function(t){var e=t+(.5-t)*this._p;return t<this._p1?this._calcEnd?1-(t=1-t/this._p1)*t:e-(t=1-t/this._p1)*t*t*t*e:t>this._p3?this._calcEnd?1-(t=(t-this._p3)/this._p1)*t:e+(t-e)*(t=(t-this._p3)/this._p1)*t*t*t:this._calcEnd?1:e},_.ease=new _(.7,.7),g.config=_.config=function(t,e,i){return new _(t,e,i)},e=u("easing.SteppedEase",function(t){t=t||1,this._p1=1/t,this._p2=t+1},!0),g=e.prototype=new t,g.constructor=e,g.getRatio=function(t){return 0>t?t=0:t>=1&&(t=.999999999),(this._p2*t>>0)*this._p1},g.config=e.config=function(t){return new e(t)},r=u("easing.RoughEase",function(e){e=e||{};for(var i,r,n,s,o,a,l=e.taper||"none",u=[],c=0,h=0|(e.points||20),f=h,p=e.randomize!==!1,m=e.clamp===!0,_=e.template instanceof t?e.template:null,g="number"==typeof e.strength?.4*e.strength:.4;--f>-1;)i=p?Math.random():1/h*f,r=_?_.getRatio(i):i,"none"===l?n=g:"out"===l?(s=1-i,n=s*s*g):"in"===l?n=i*i*g:.5>i?(s=2*i,n=s*s*.5*g):(s=2*(1-i),n=s*s*.5*g),p?r+=Math.random()*n-.5*n:f%2?r+=.5*n:r-=.5*n,m&&(r>1?r=1:0>r&&(r=0)),u[c++]={x:i,y:r};for(u.sort(function(t,e){return t.x-e.x}),a=new d(1,1,null),f=h;--f>-1;)o=u[f],a=new d(o.x,o.y,a);this._prev=new d(0,0,0!==a.t?a:a.next)},!0),g=r.prototype=new t,g.constructor=r,g.getRatio=function(t){var e=this._prev;if(t>e.t){for(;e.next&&t>=e.t;)e=e.next;e=e.prev}else for(;e.prev&&t<=e.t;)e=e.prev;return this._prev=e,e.v+(t-e.t)/e.gap*e.c},g.config=function(t){return new r(t)},r.ease=new r,f("Bounce",c("BounceOut",function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375}),c("BounceIn",function(t){return(t=1-t)<1/2.75?1-7.5625*t*t:2/2.75>t?1-(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1-(7.5625*(t-=2.25/2.75)*t+.9375):1-(7.5625*(t-=2.625/2.75)*t+.984375)}),c("BounceInOut",function(t){var e=.5>t;return t=e?1-2*t:2*t-1,t=1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375,e?.5*(1-t):.5*t+.5})),f("Circ",c("CircOut",function(t){return Math.sqrt(1-(t-=1)*t)}),c("CircIn",function(t){return-(Math.sqrt(1-t*t)-1)}),c("CircInOut",function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)})),n=function(e,i,r){var n=u("easing."+e,function(t,e){this._p1=t>=1?t:1,this._p2=(e||r)/(1>t?t:1),this._p3=this._p2/a*(Math.asin(1/this._p1)||0),this._p2=a/this._p2},!0),s=n.prototype=new t;return s.constructor=n,s.getRatio=i,s.config=function(t,e){return new n(t,e)},n},f("Elastic",n("ElasticOut",function(t){return this._p1*Math.pow(2,-10*t)*Math.sin((t-this._p3)*this._p2)+1},.3),n("ElasticIn",function(t){return-(this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*this._p2))},.3),n("ElasticInOut",function(t){return(t*=2)<1?-.5*(this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*this._p2)):this._p1*Math.pow(2,-10*(t-=1))*Math.sin((t-this._p3)*this._p2)*.5+1},.45)),f("Expo",c("ExpoOut",function(t){return 1-Math.pow(2,-10*t)}),c("ExpoIn",function(t){return Math.pow(2,10*(t-1))-.001}),c("ExpoInOut",function(t){return(t*=2)<1?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*(t-1)))})),f("Sine",c("SineOut",function(t){return Math.sin(t*l)}),c("SineIn",function(t){return-Math.cos(t*l)+1}),c("SineInOut",function(t){return-.5*(Math.cos(Math.PI*t)-1)})),u("easing.EaseLookup",{find:function(e){return t.map[e]}},!0),h(s.SlowMo,"SlowMo","ease,"),h(r,"RoughEase","ease,"),h(e,"SteppedEase","ease,"),m},!0)}),i._gsDefine&&i._gsQueue.pop()(),function(t,i){"use strict";var r=t.GreenSockGlobals=t.GreenSockGlobals||t;if(!r.TweenLite){var n,s,o,a,l,u=function(t){var e,i=t.split("."),n=r;for(e=0;e<i.length;e++)n[i[e]]=n=n[i[e]]||{};return n},c=u("com.greensock"),h=1e-10,f=function(t){var e,i=[],r=t.length;for(e=0;e!==r;i.push(t[e++]));return i},d=function(){},p=function(){var t=Object.prototype.toString,e=t.call([]);return function(i){return null!=i&&(i instanceof Array||"object"==typeof i&&!!i.push&&t.call(i)===e)}}(),m={},_=function(n,s,o,a){this.sc=m[n]?m[n].sc:[],m[n]=this,this.gsClass=null,this.func=o;var l=[];this.check=function(c){for(var h,f,d,p,g,v=s.length,y=v;--v>-1;)(h=m[s[v]]||new _(s[v],[])).gsClass?(l[v]=h.gsClass,y--):c&&h.sc.push(this);if(0===y&&o)for(f=("com.greensock."+n).split("."),d=f.pop(),p=u(f.join("."))[d]=this.gsClass=o.apply(o,l),a&&(r[d]=p,g="undefined"!=typeof e&&e.exports,!g&&"function"==typeof define&&define.amd?define((t.GreenSockAMDPath?t.GreenSockAMDPath+"/":"")+n.split(".").pop(),[],function(){return p}):n===i&&g&&(e.exports=p)),v=0;v<this.sc.length;v++)this.sc[v].check()},this.check(!0)},g=t._gsDefine=function(t,e,i,r){return new _(t,e,i,r)},v=c._class=function(t,e,i){return e=e||function(){},g(t,[],function(){return e},i),e};g.globals=r;var y=[0,0,1,1],$=[],x=v("easing.Ease",function(t,e,i,r){this._func=t,this._type=i||0,this._power=r||0,this._params=e?y.concat(e):y},!0),b=x.map={},w=x.register=function(t,e,i,r){for(var n,s,o,a,l=e.split(","),u=l.length,h=(i||"easeIn,easeOut,easeInOut").split(",");--u>-1;)for(s=l[u],n=r?v("easing."+s,null,!0):c.easing[s]||{},o=h.length;--o>-1;)a=h[o],b[s+"."+a]=b[a+s]=n[a]=t.getRatio?t:t[a]||new t};for(o=x.prototype,o._calcEnd=!1,o.getRatio=function(t){if(this._func)return this._params[0]=t,this._func.apply(null,this._params);var e=this._type,i=this._power,r=1===e?1-t:2===e?t:.5>t?2*t:2*(1-t);return 1===i?r*=r:2===i?r*=r*r:3===i?r*=r*r*r:4===i&&(r*=r*r*r*r),1===e?1-r:2===e?r:.5>t?r/2:1-r/2},n=["Linear","Quad","Cubic","Quart","Quint,Strong"],s=n.length;--s>-1;)o=n[s]+",Power"+s,w(new x(null,null,1,s),o,"easeOut",!0),w(new x(null,null,2,s),o,"easeIn"+(0===s?",easeNone":"")),w(new x(null,null,3,s),o,"easeInOut");b.linear=c.easing.Linear.easeIn,b.swing=c.easing.Quad.easeInOut;var T=v("events.EventDispatcher",function(t){this._listeners={},this._eventTarget=t||this});o=T.prototype,o.addEventListener=function(t,e,i,r,n){n=n||0;var s,o,u=this._listeners[t],c=0;for(null==u&&(this._listeners[t]=u=[]),o=u.length;--o>-1;)s=u[o],s.c===e&&s.s===i?u.splice(o,1):0===c&&s.pr<n&&(c=o+1);u.splice(c,0,{c:e,s:i,up:r,pr:n}),this!==a||l||a.wake()},o.removeEventListener=function(t,e){var i,r=this._listeners[t];if(r)for(i=r.length;--i>-1;)if(r[i].c===e)return void r.splice(i,1)},o.dispatchEvent=function(t){var e,i,r,n=this._listeners[t];if(n)for(e=n.length,i=this._eventTarget;--e>-1;)r=n[e],r&&(r.up?r.c.call(r.s||i,{type:t,target:i}):r.c.call(r.s||i))};var P=t.requestAnimationFrame,S=t.cancelAnimationFrame,k=Date.now||function(){return(new Date).getTime()},O=k();for(n=["ms","moz","webkit","o"],s=n.length;--s>-1&&!P;)P=t[n[s]+"RequestAnimationFrame"],S=t[n[s]+"CancelAnimationFrame"]||t[n[s]+"CancelRequestAnimationFrame"];v("Ticker",function(t,e){var i,r,n,s,o,u=this,c=k(),f=e!==!1&&P,p=500,m=33,_="tick",g=function(t){var e,a,l=k()-O;l>p&&(c+=l-m),O+=l,u.time=(O-c)/1e3,e=u.time-o,(!i||e>0||t===!0)&&(u.frame++,o+=e+(e>=s?.004:s-e),a=!0),t!==!0&&(n=r(g)),a&&u.dispatchEvent(_)};T.call(u),u.time=u.frame=0,u.tick=function(){g(!0)},u.lagSmoothing=function(t,e){p=t||1/h,m=Math.min(e,p,0)},u.sleep=function(){null!=n&&(f&&S?S(n):clearTimeout(n),r=d,n=null,u===a&&(l=!1))},u.wake=function(){null!==n?u.sleep():u.frame>10&&(O=k()-p+5),r=0===i?d:f&&P?P:function(t){return setTimeout(t,1e3*(o-u.time)+1|0)},u===a&&(l=!0),g(2)},u.fps=function(t){return arguments.length?(i=t,s=1/(i||60),o=this.time+s,void u.wake()):i},u.useRAF=function(t){return arguments.length?(u.sleep(),f=t,void u.fps(i)):f},u.fps(t),setTimeout(function(){f&&u.frame<5&&u.useRAF(!1)},1500)}),o=c.Ticker.prototype=new c.events.EventDispatcher,o.constructor=c.Ticker;var R=v("core.Animation",function(t,e){if(this.vars=e=e||{},this._duration=this._totalDuration=t||0,this._delay=Number(e.delay)||0,this._timeScale=1,this._active=e.immediateRender===!0,this.data=e.data,this._reversed=e.reversed===!0,V){l||a.wake();var i=this.vars.useFrames?W:V;i.add(this,i._time),this.vars.paused&&this.paused(!0)}});a=R.ticker=new c.Ticker,o=R.prototype,o._dirty=o._gc=o._initted=o._paused=!1,o._totalTime=o._time=0,
o._rawPrevTime=-1,o._next=o._last=o._onUpdate=o._timeline=o.timeline=null,o._paused=!1;var j=function(){l&&k()-O>2e3&&a.wake(),setTimeout(j,2e3)};j(),o.play=function(t,e){return null!=t&&this.seek(t,e),this.reversed(!1).paused(!1)},o.pause=function(t,e){return null!=t&&this.seek(t,e),this.paused(!0)},o.resume=function(t,e){return null!=t&&this.seek(t,e),this.paused(!1)},o.seek=function(t,e){return this.totalTime(Number(t),e!==!1)},o.restart=function(t,e){return this.reversed(!1).paused(!1).totalTime(t?-this._delay:0,e!==!1,!0)},o.reverse=function(t,e){return null!=t&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},o.render=function(t,e,i){},o.invalidate=function(){return this._time=this._totalTime=0,this._initted=this._gc=!1,this._rawPrevTime=-1,(this._gc||!this.timeline)&&this._enabled(!0),this},o.isActive=function(){var t,e=this._timeline,i=this._startTime;return!e||!this._gc&&!this._paused&&e.isActive()&&(t=e.rawTime())>=i&&t<i+this.totalDuration()/this._timeScale},o._enabled=function(t,e){return l||a.wake(),this._gc=!t,this._active=this.isActive(),e!==!0&&(t&&!this.timeline?this._timeline.add(this,this._startTime-this._delay):!t&&this.timeline&&this._timeline._remove(this,!0)),!1},o._kill=function(t,e){return this._enabled(!1,!1)},o.kill=function(t,e){return this._kill(t,e),this},o._uncache=function(t){for(var e=t?this:this.timeline;e;)e._dirty=!0,e=e.timeline;return this},o._swapSelfInParams=function(t){for(var e=t.length,i=t.concat();--e>-1;)"{self}"===t[e]&&(i[e]=this);return i},o._callback=function(t){var e=this.vars;e[t].apply(e[t+"Scope"]||e.callbackScope||this,e[t+"Params"]||$)},o.eventCallback=function(t,e,i,r){if("on"===(t||"").substr(0,2)){var n=this.vars;if(1===arguments.length)return n[t];null==e?delete n[t]:(n[t]=e,n[t+"Params"]=p(i)&&-1!==i.join("").indexOf("{self}")?this._swapSelfInParams(i):i,n[t+"Scope"]=r),"onUpdate"===t&&(this._onUpdate=e)}return this},o.delay=function(t){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+t-this._delay),this._delay=t,this):this._delay},o.duration=function(t){return arguments.length?(this._duration=this._totalDuration=t,this._uncache(!0),this._timeline.smoothChildTiming&&this._time>0&&this._time<this._duration&&0!==t&&this.totalTime(this._totalTime*(t/this._duration),!0),this):(this._dirty=!1,this._duration)},o.totalDuration=function(t){return this._dirty=!1,arguments.length?this.duration(t):this._totalDuration},o.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),this.totalTime(t>this._duration?this._duration:t,e)):this._time},o.totalTime=function(t,e,i){if(l||a.wake(),!arguments.length)return this._totalTime;if(this._timeline){if(0>t&&!i&&(t+=this.totalDuration()),this._timeline.smoothChildTiming){this._dirty&&this.totalDuration();var r=this._totalDuration,n=this._timeline;if(t>r&&!i&&(t=r),this._startTime=(this._paused?this._pauseTime:n._time)-(this._reversed?r-t:t)/this._timeScale,n._dirty||this._uncache(!1),n._timeline)for(;n._timeline;)n._timeline._time!==(n._startTime+n._totalTime)/n._timeScale&&n.totalTime(n._totalTime,!0),n=n._timeline}this._gc&&this._enabled(!0,!1),(this._totalTime!==t||0===this._duration)&&(F.length&&K(),this.render(t,e,!1),F.length&&K())}return this},o.progress=o.totalProgress=function(t,e){var i=this.duration();return arguments.length?this.totalTime(i*t,e):i?this._time/i:this.ratio},o.startTime=function(t){return arguments.length?(t!==this._startTime&&(this._startTime=t,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,t-this._delay)),this):this._startTime},o.endTime=function(t){return this._startTime+(0!=t?this.totalDuration():this.duration())/this._timeScale},o.timeScale=function(t){if(!arguments.length)return this._timeScale;if(t=t||h,this._timeline&&this._timeline.smoothChildTiming){var e=this._pauseTime,i=e||0===e?e:this._timeline.totalTime();this._startTime=i-(i-this._startTime)*this._timeScale/t}return this._timeScale=t,this._uncache(!1)},o.reversed=function(t){return arguments.length?(t!=this._reversed&&(this._reversed=t,this.totalTime(this._timeline&&!this._timeline.smoothChildTiming?this.totalDuration()-this._totalTime:this._totalTime,!0)),this):this._reversed},o.paused=function(t){if(!arguments.length)return this._paused;var e,i,r=this._timeline;return t!=this._paused&&r&&(l||t||a.wake(),e=r.rawTime(),i=e-this._pauseTime,!t&&r.smoothChildTiming&&(this._startTime+=i,this._uncache(!1)),this._pauseTime=t?e:null,this._paused=t,this._active=this.isActive(),!t&&0!==i&&this._initted&&this.duration()&&(e=r.smoothChildTiming?this._totalTime:(e-this._startTime)/this._timeScale,this.render(e,e===this._totalTime,!0))),this._gc&&!t&&this._enabled(!0,!1),this};var A=v("core.SimpleTimeline",function(t){R.call(this,0,t),this.autoRemoveChildren=this.smoothChildTiming=!0});o=A.prototype=new R,o.constructor=A,o.kill()._gc=!1,o._first=o._last=o._recent=null,o._sortChildren=!1,o.add=o.insert=function(t,e,i,r){var n,s;if(t._startTime=Number(e||0)+t._delay,t._paused&&this!==t._timeline&&(t._pauseTime=t._startTime+(this.rawTime()-t._startTime)/t._timeScale),t.timeline&&t.timeline._remove(t,!0),t.timeline=t._timeline=this,t._gc&&t._enabled(!0,!0),n=this._last,this._sortChildren)for(s=t._startTime;n&&n._startTime>s;)n=n._prev;return n?(t._next=n._next,n._next=t):(t._next=this._first,this._first=t),t._next?t._next._prev=t:this._last=t,t._prev=n,this._recent=t,this._timeline&&this._uncache(!0),this},o._remove=function(t,e){return t.timeline===this&&(e||t._enabled(!1,!0),t._prev?t._prev._next=t._next:this._first===t&&(this._first=t._next),t._next?t._next._prev=t._prev:this._last===t&&(this._last=t._prev),t._next=t._prev=t.timeline=null,t===this._recent&&(this._recent=this._last),this._timeline&&this._uncache(!0)),this},o.render=function(t,e,i){var r,n=this._first;for(this._totalTime=this._time=this._rawPrevTime=t;n;)r=n._next,(n._active||t>=n._startTime&&!n._paused)&&(n._reversed?n.render((n._dirty?n.totalDuration():n._totalDuration)-(t-n._startTime)*n._timeScale,e,i):n.render((t-n._startTime)*n._timeScale,e,i)),n=r},o.rawTime=function(){return l||a.wake(),this._totalTime};var M=v("TweenLite",function(e,i,r){if(R.call(this,i,r),this.render=M.prototype.render,null==e)throw"Cannot tween a null target.";this.target=e="string"!=typeof e?e:M.selector(e)||e;var n,s,o,a=e.jquery||e.length&&e!==t&&e[0]&&(e[0]===t||e[0].nodeType&&e[0].style&&!e.nodeType),l=this.vars.overwrite;if(this._overwrite=l=null==l?q[M.defaultOverwrite]:"number"==typeof l?l>>0:q[l],(a||e instanceof Array||e.push&&p(e))&&"number"!=typeof e[0])for(this._targets=o=f(e),this._propLookup=[],this._siblings=[],n=0;n<o.length;n++)s=o[n],s?"string"!=typeof s?s.length&&s!==t&&s[0]&&(s[0]===t||s[0].nodeType&&s[0].style&&!s.nodeType)?(o.splice(n--,1),this._targets=o=o.concat(f(s))):(this._siblings[n]=H(s,this,!1),1===l&&this._siblings[n].length>1&&J(s,this,null,1,this._siblings[n])):(s=o[n--]=M.selector(s),"string"==typeof s&&o.splice(n+1,1)):o.splice(n--,1);else this._propLookup={},this._siblings=H(e,this,!1),1===l&&this._siblings.length>1&&J(e,this,null,1,this._siblings);(this.vars.immediateRender||0===i&&0===this._delay&&this.vars.immediateRender!==!1)&&(this._time=-h,this.render(-this._delay))},!0),C=function(e){return e&&e.length&&e!==t&&e[0]&&(e[0]===t||e[0].nodeType&&e[0].style&&!e.nodeType)},D=function(t,e){var i,r={};for(i in t)G[i]||i in e&&"transform"!==i&&"x"!==i&&"y"!==i&&"width"!==i&&"height"!==i&&"className"!==i&&"border"!==i||!(!B[i]||B[i]&&B[i]._autoCSS)||(r[i]=t[i],delete t[i]);t.css=r};o=M.prototype=new R,o.constructor=M,o.kill()._gc=!1,o.ratio=0,o._firstPT=o._targets=o._overwrittenProps=o._startAt=null,o._notifyPluginsOfEnabled=o._lazy=!1,M.version="1.18.0",M.defaultEase=o._ease=new x(null,null,1,1),M.defaultOverwrite="auto",M.ticker=a,M.autoSleep=120,M.lagSmoothing=function(t,e){a.lagSmoothing(t,e)},M.selector=t.$||t.jQuery||function(e){var i=t.$||t.jQuery;return i?(M.selector=i,i(e)):"undefined"==typeof document?e:document.querySelectorAll?document.querySelectorAll(e):document.getElementById("#"===e.charAt(0)?e.substr(1):e)};var F=[],E={},z=/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,I=function(t){for(var e,i=this._firstPT,r=1e-6;i;)e=i.blob?t?this.join(""):this.start:i.c*t+i.s,i.r?e=Math.round(e):r>e&&e>-r&&(e=0),i.f?i.fp?i.t[i.p](i.fp,e):i.t[i.p](e):i.t[i.p]=e,i=i._next},N=function(t,e,i,r){var n,s,o,a,l,u,c,h=[t,e],f=0,d="",p=0;for(h.start=t,i&&(i(h),t=h[0],e=h[1]),h.length=0,n=t.match(z)||[],s=e.match(z)||[],r&&(r._next=null,r.blob=1,h._firstPT=r),l=s.length,a=0;l>a;a++)c=s[a],u=e.substr(f,e.indexOf(c,f)-f),d+=u||!a?u:",",f+=u.length,p?p=(p+1)%5:"rgba("===u.substr(-5)&&(p=1),c===n[a]||n.length<=a?d+=c:(d&&(h.push(d),d=""),o=parseFloat(n[a]),h.push(o),h._firstPT={_next:h._firstPT,t:h,p:h.length-1,s:o,c:("="===c.charAt(1)?parseInt(c.charAt(0)+"1",10)*parseFloat(c.substr(2)):parseFloat(c)-o)||0,f:0,r:p&&4>p}),f+=c.length;return d+=e.substr(f),d&&h.push(d),h.setRatio=I,h},L=function(t,e,i,r,n,s,o,a){var l,u,c="get"===i?t[e]:i,h=typeof t[e],f="string"==typeof r&&"="===r.charAt(1),d={t:t,p:e,s:c,f:"function"===h,pg:0,n:n||e,r:s,pr:0,c:f?parseInt(r.charAt(0)+"1",10)*parseFloat(r.substr(2)):parseFloat(r)-c||0};return"number"!==h&&("function"===h&&"get"===i&&(u=e.indexOf("set")||"function"!=typeof t["get"+e.substr(3)]?e:"get"+e.substr(3),d.s=c=o?t[u](o):t[u]()),"string"==typeof c&&(o||isNaN(c))?(d.fp=o,l=N(c,r,a||M.defaultStringFilter,d),d={t:l,p:"setRatio",s:0,c:1,f:2,pg:0,n:n||e,pr:0}):f||(d.c=parseFloat(r)-parseFloat(c)||0)),d.c?((d._next=this._firstPT)&&(d._next._prev=d),this._firstPT=d,d):void 0},X=M._internals={isArray:p,isSelector:C,lazyTweens:F,blobDif:N},B=M._plugins={},U=X.tweenLookup={},Y=0,G=X.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1,lazy:1,onOverwrite:1,callbackScope:1,stringFilter:1},q={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},W=R._rootFramesTimeline=new A,V=R._rootTimeline=new A,Z=30,K=X.lazyRender=function(){var t,e=F.length;for(E={};--e>-1;)t=F[e],t&&t._lazy!==!1&&(t.render(t._lazy[0],t._lazy[1],!0),t._lazy=!1);F.length=0};V._startTime=a.time,W._startTime=a.frame,V._active=W._active=!0,setTimeout(K,1),R._updateRoot=M.render=function(){var t,e,i;if(F.length&&K(),V.render((a.time-V._startTime)*V._timeScale,!1,!1),W.render((a.frame-W._startTime)*W._timeScale,!1,!1),F.length&&K(),a.frame>=Z){Z=a.frame+(parseInt(M.autoSleep,10)||120);for(i in U){for(e=U[i].tweens,t=e.length;--t>-1;)e[t]._gc&&e.splice(t,1);0===e.length&&delete U[i]}if(i=V._first,(!i||i._paused)&&M.autoSleep&&!W._first&&1===a._listeners.tick.length){for(;i&&i._paused;)i=i._next;i||a.sleep()}}},a.addEventListener("tick",R._updateRoot);var H=function(t,e,i){var r,n,s=t._gsTweenID;if(U[s||(t._gsTweenID=s="t"+Y++)]||(U[s]={target:t,tweens:[]}),e&&(r=U[s].tweens,r[n=r.length]=e,i))for(;--n>-1;)r[n]===e&&r.splice(n,1);return U[s].tweens},Q=function(t,e,i,r){var n,s,o=t.vars.onOverwrite;return o&&(n=o(t,e,i,r)),o=M.onOverwrite,o&&(s=o(t,e,i,r)),n!==!1&&s!==!1},J=function(t,e,i,r,n){var s,o,a,l;if(1===r||r>=4){for(l=n.length,s=0;l>s;s++)if((a=n[s])!==e)a._gc||a._kill(null,t,e)&&(o=!0);else if(5===r)break;return o}var u,c=e._startTime+h,f=[],d=0,p=0===e._duration;for(s=n.length;--s>-1;)(a=n[s])===e||a._gc||a._paused||(a._timeline!==e._timeline?(u=u||tt(e,0,p),0===tt(a,u,p)&&(f[d++]=a)):a._startTime<=c&&a._startTime+a.totalDuration()/a._timeScale>c&&((p||!a._initted)&&c-a._startTime<=2e-10||(f[d++]=a)));for(s=d;--s>-1;)if(a=f[s],2===r&&a._kill(i,t,e)&&(o=!0),2!==r||!a._firstPT&&a._initted){if(2!==r&&!Q(a,e))continue;a._enabled(!1,!1)&&(o=!0)}return o},tt=function(t,e,i){for(var r=t._timeline,n=r._timeScale,s=t._startTime;r._timeline;){if(s+=r._startTime,n*=r._timeScale,r._paused)return-100;r=r._timeline}return s/=n,s>e?s-e:i&&s===e||!t._initted&&2*h>s-e?h:(s+=t.totalDuration()/t._timeScale/n)>e+h?0:s-e-h};o._init=function(){var t,e,i,r,n,s=this.vars,o=this._overwrittenProps,a=this._duration,l=!!s.immediateRender,u=s.ease;if(s.startAt){this._startAt&&(this._startAt.render(-1,!0),this._startAt.kill()),n={};for(r in s.startAt)n[r]=s.startAt[r];if(n.overwrite=!1,n.immediateRender=!0,n.lazy=l&&s.lazy!==!1,n.startAt=n.delay=null,this._startAt=M.to(this.target,0,n),l)if(this._time>0)this._startAt=null;else if(0!==a)return}else if(s.runBackwards&&0!==a)if(this._startAt)this._startAt.render(-1,!0),this._startAt.kill(),this._startAt=null;else{0!==this._time&&(l=!1),i={};for(r in s)G[r]&&"autoCSS"!==r||(i[r]=s[r]);if(i.overwrite=0,i.data="isFromStart",i.lazy=l&&s.lazy!==!1,i.immediateRender=l,this._startAt=M.to(this.target,0,i),l){if(0===this._time)return}else this._startAt._init(),this._startAt._enabled(!1),this.vars.immediateRender&&(this._startAt=null)}if(this._ease=u=u?u instanceof x?u:"function"==typeof u?new x(u,s.easeParams):b[u]||M.defaultEase:M.defaultEase,s.easeParams instanceof Array&&u.config&&(this._ease=u.config.apply(u,s.easeParams)),this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets)for(t=this._targets.length;--t>-1;)this._initProps(this._targets[t],this._propLookup[t]={},this._siblings[t],o?o[t]:null)&&(e=!0);else e=this._initProps(this.target,this._propLookup,this._siblings,o);if(e&&M._onPluginEvent("_onInitAllProps",this),o&&(this._firstPT||"function"!=typeof this.target&&this._enabled(!1,!1)),s.runBackwards)for(i=this._firstPT;i;)i.s+=i.c,i.c=-i.c,i=i._next;this._onUpdate=s.onUpdate,this._initted=!0},o._initProps=function(e,i,r,n){var s,o,a,l,u,c;if(null==e)return!1;E[e._gsTweenID]&&K(),this.vars.css||e.style&&e!==t&&e.nodeType&&B.css&&this.vars.autoCSS!==!1&&D(this.vars,e);for(s in this.vars)if(c=this.vars[s],G[s])c&&(c instanceof Array||c.push&&p(c))&&-1!==c.join("").indexOf("{self}")&&(this.vars[s]=c=this._swapSelfInParams(c,this));else if(B[s]&&(l=new B[s])._onInitTween(e,this.vars[s],this)){for(this._firstPT=u={_next:this._firstPT,t:l,p:"setRatio",s:0,c:1,f:1,n:s,pg:1,pr:l._priority},o=l._overwriteProps.length;--o>-1;)i[l._overwriteProps[o]]=this._firstPT;(l._priority||l._onInitAllProps)&&(a=!0),(l._onDisable||l._onEnable)&&(this._notifyPluginsOfEnabled=!0),u._next&&(u._next._prev=u)}else i[s]=L.call(this,e,s,"get",c,s,0,null,this.vars.stringFilter);return n&&this._kill(n,e)?this._initProps(e,i,r,n):this._overwrite>1&&this._firstPT&&r.length>1&&J(e,this,i,this._overwrite,r)?(this._kill(i,e),this._initProps(e,i,r,n)):(this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration)&&(E[e._gsTweenID]=!0),a)},o.render=function(t,e,i){var r,n,s,o,a=this._time,l=this._duration,u=this._rawPrevTime;if(t>=l)this._totalTime=this._time=l,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(r=!0,n="onComplete",i=i||this._timeline.autoRemoveChildren),0===l&&(this._initted||!this.vars.lazy||i)&&(this._startTime===this._timeline._duration&&(t=0),(0===t||0>u||u===h&&"isPause"!==this.data)&&u!==t&&(i=!0,u>h&&(n="onReverseComplete")),this._rawPrevTime=o=!e||t||u===t?t:h);else if(1e-7>t)this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==a||0===l&&u>0)&&(n="onReverseComplete",r=this._reversed),0>t&&(this._active=!1,0===l&&(this._initted||!this.vars.lazy||i)&&(u>=0&&(u!==h||"isPause"!==this.data)&&(i=!0),this._rawPrevTime=o=!e||t||u===t?t:h)),this._initted||(i=!0);else if(this._totalTime=this._time=t,this._easeType){var c=t/l,f=this._easeType,d=this._easePower;(1===f||3===f&&c>=.5)&&(c=1-c),3===f&&(c*=2),1===d?c*=c:2===d?c*=c*c:3===d?c*=c*c*c:4===d&&(c*=c*c*c*c),1===f?this.ratio=1-c:2===f?this.ratio=c:.5>t/l?this.ratio=c/2:this.ratio=1-c/2}else this.ratio=this._ease.getRatio(t/l);if(this._time!==a||i){if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!i&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration))return this._time=this._totalTime=a,this._rawPrevTime=u,F.push(this),void(this._lazy=[t,e]);this._time&&!r?this.ratio=this._ease.getRatio(this._time/l):r&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==a&&t>=0&&(this._active=!0),0===a&&(this._startAt&&(t>=0?this._startAt.render(t,e,i):n||(n="_dummyGS")),this.vars.onStart&&(0!==this._time||0===l)&&(e||this._callback("onStart"))),s=this._firstPT;s;)s.f?s.t[s.p](s.c*this.ratio+s.s):s.t[s.p]=s.c*this.ratio+s.s,s=s._next;this._onUpdate&&(0>t&&this._startAt&&t!==-1e-4&&this._startAt.render(t,e,i),e||(this._time!==a||r)&&this._callback("onUpdate")),n&&(!this._gc||i)&&(0>t&&this._startAt&&!this._onUpdate&&t!==-1e-4&&this._startAt.render(t,e,i),r&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[n]&&this._callback(n),0===l&&this._rawPrevTime===h&&o!==h&&(this._rawPrevTime=0))}},o._kill=function(t,e,i){if("all"===t&&(t=null),null==t&&(null==e||e===this.target))return this._lazy=!1,this._enabled(!1,!1);e="string"!=typeof e?e||this._targets||this.target:M.selector(e)||e;var r,n,s,o,a,l,u,c,h,f=i&&this._time&&i._startTime===this._startTime&&this._timeline===i._timeline;if((p(e)||C(e))&&"number"!=typeof e[0])for(r=e.length;--r>-1;)this._kill(t,e[r],i)&&(l=!0);else{if(this._targets){for(r=this._targets.length;--r>-1;)if(e===this._targets[r]){a=this._propLookup[r]||{},this._overwrittenProps=this._overwrittenProps||[],n=this._overwrittenProps[r]=t?this._overwrittenProps[r]||{}:"all";break}}else{if(e!==this.target)return!1;a=this._propLookup,n=this._overwrittenProps=t?this._overwrittenProps||{}:"all"}if(a){if(u=t||a,c=t!==n&&"all"!==n&&t!==a&&("object"!=typeof t||!t._tempKill),i&&(M.onOverwrite||this.vars.onOverwrite)){for(s in u)a[s]&&(h||(h=[]),h.push(s));if((h||!t)&&!Q(this,i,e,h))return!1}for(s in u)(o=a[s])&&(f&&(o.f?o.t[o.p](o.s):o.t[o.p]=o.s,l=!0),o.pg&&o.t._kill(u)&&(l=!0),o.pg&&0!==o.t._overwriteProps.length||(o._prev?o._prev._next=o._next:o===this._firstPT&&(this._firstPT=o._next),o._next&&(o._next._prev=o._prev),o._next=o._prev=null),delete a[s]),c&&(n[s]=1);!this._firstPT&&this._initted&&this._enabled(!1,!1)}}return l},o.invalidate=function(){return this._notifyPluginsOfEnabled&&M._onPluginEvent("_onDisable",this),this._firstPT=this._overwrittenProps=this._startAt=this._onUpdate=null,this._notifyPluginsOfEnabled=this._active=this._lazy=!1,this._propLookup=this._targets?{}:[],R.prototype.invalidate.call(this),this.vars.immediateRender&&(this._time=-h,this.render(-this._delay)),this},o._enabled=function(t,e){if(l||a.wake(),t&&this._gc){var i,r=this._targets;if(r)for(i=r.length;--i>-1;)this._siblings[i]=H(r[i],this,!0);else this._siblings=H(this.target,this,!0)}return R.prototype._enabled.call(this,t,e),this._notifyPluginsOfEnabled&&this._firstPT?M._onPluginEvent(t?"_onEnable":"_onDisable",this):!1},M.to=function(t,e,i){return new M(t,e,i)},M.from=function(t,e,i){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,new M(t,e,i)},M.fromTo=function(t,e,i,r){return r.startAt=i,r.immediateRender=0!=r.immediateRender&&0!=i.immediateRender,new M(t,e,r)},M.delayedCall=function(t,e,i,r,n){return new M(e,0,{delay:t,onComplete:e,onCompleteParams:i,callbackScope:r,onReverseComplete:e,onReverseCompleteParams:i,immediateRender:!1,lazy:!1,useFrames:n,overwrite:0})},M.set=function(t,e){return new M(t,0,e)},M.getTweensOf=function(t,e){if(null==t)return[];t="string"!=typeof t?t:M.selector(t)||t;var i,r,n,s;if((p(t)||C(t))&&"number"!=typeof t[0]){for(i=t.length,r=[];--i>-1;)r=r.concat(M.getTweensOf(t[i],e));for(i=r.length;--i>-1;)for(s=r[i],n=i;--n>-1;)s===r[n]&&r.splice(i,1)}else for(r=H(t).concat(),i=r.length;--i>-1;)(r[i]._gc||e&&!r[i].isActive())&&r.splice(i,1);return r},M.killTweensOf=M.killDelayedCallsTo=function(t,e,i){"object"==typeof e&&(i=e,e=!1);for(var r=M.getTweensOf(t,e),n=r.length;--n>-1;)r[n]._kill(i,t)};var et=v("plugins.TweenPlugin",function(t,e){this._overwriteProps=(t||"").split(","),this._propName=this._overwriteProps[0],this._priority=e||0,this._super=et.prototype},!0);if(o=et.prototype,et.version="1.18.0",et.API=2,o._firstPT=null,o._addTween=L,o.setRatio=I,o._kill=function(t){var e,i=this._overwriteProps,r=this._firstPT;if(null!=t[this._propName])this._overwriteProps=[];else for(e=i.length;--e>-1;)null!=t[i[e]]&&i.splice(e,1);for(;r;)null!=t[r.n]&&(r._next&&(r._next._prev=r._prev),r._prev?(r._prev._next=r._next,r._prev=null):this._firstPT===r&&(this._firstPT=r._next)),r=r._next;return!1},o._roundProps=function(t,e){for(var i=this._firstPT;i;)(t[this._propName]||null!=i.n&&t[i.n.split(this._propName+"_").join("")])&&(i.r=e),i=i._next},M._onPluginEvent=function(t,e){var i,r,n,s,o,a=e._firstPT;if("_onInitAllProps"===t){for(;a;){for(o=a._next,r=n;r&&r.pr>a.pr;)r=r._next;(a._prev=r?r._prev:s)?a._prev._next=a:n=a,(a._next=r)?r._prev=a:s=a,a=o}a=e._firstPT=n}for(;a;)a.pg&&"function"==typeof a.t[t]&&a.t[t]()&&(i=!0),a=a._next;return i},et.activate=function(t){for(var e=t.length;--e>-1;)t[e].API===et.API&&(B[(new t[e])._propName]=t[e]);return!0},g.plugin=function(t){if(!(t&&t.propName&&t.init&&t.API))throw"illegal plugin definition.";var e,i=t.propName,r=t.priority||0,n=t.overwriteProps,s={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_roundProps",initAll:"_onInitAllProps"},o=v("plugins."+i.charAt(0).toUpperCase()+i.substr(1)+"Plugin",function(){et.call(this,i,r),this._overwriteProps=n||[]},t.global===!0),a=o.prototype=new et(i);a.constructor=o,o.API=t.API;for(e in s)"function"==typeof t[e]&&(a[s[e]]=t[e]);return o.version=t.version,et.activate([o]),o},n=t._gsQueue){for(s=0;s<n.length;s++)n[s]();for(o in m)m[o].func||t.console.log("GSAP encountered missing dependency: com.greensock."+o)}l=!1}}("undefined"!=typeof e&&e.exports&&"undefined"!=typeof t?t:this||window,"TweenMax")}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],202:[function(t,e,i){"use strict";function r(t,e){var i=document.createElement("canvas");return i.width=t,i.height=e,i}Object.defineProperty(i,"__esModule",{value:!0}),i["default"]=r,e.exports=i["default"]},{}],203:[function(t,e,i){"use strict";function r(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e["default"]=t,e}function n(t,e,i,r){this.init(t,e,i,r)}Object.defineProperty(i,"__esModule",{value:!0});var s=t("./webgl"),o=r(s);n.prototype={canvas:null,gl:null,program:null,width:0,height:0,init:function(t,e,i,r){this.canvas=t,this.width=t.width,this.height=t.height,this.gl=o.getContext(t,e),this.program=this.createProgram(i,r),this.useProgram(this.program)},createProgram:function(t,e){var i=o.createProgram(this.gl,t,e);return i},useProgram:function(t){this.program=t,this.gl.useProgram(t)},createTexture:function(t,e){return o.createTexture(this.gl,t,e)},createUniform:function(t,e){for(var i=arguments.length,r=Array(i>2?i-2:0),n=2;i>n;n++)r[n-2]=arguments[n];o.createUniform.apply(o,[this.gl,this.program,t,e].concat(r))},activeTexture:function(t){o.activeTexture(this.gl,t)},updateTexture:function(t){o.updateTexture(this.gl,t)},draw:function(){o.setRectangle(this.gl,0,0,this.width,this.height),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}},i["default"]=n,e.exports=i["default"]},{"./webgl":210}],204:[function(t,e,i){"use strict";function r(t,e,i){return new Promise(function(r,n){"string"==typeof t&&(t={name:"image"+e,src:t});var s=new Image;t.img=s,s.addEventListener("load",function(n){"function"==typeof i&&i.call(null,s,e),r(t)}),s.src=t.src})}function n(t,e){return Promise.all(t.map(function(t,i){return r(t,i,e)}))}function s(t,e){return new Promise(function(i,r){n(t,e).then(function(t){var e={};t.forEach(function(t){e[t.name]={img:t.img,src:t.src}}),i(e)})})}Object.defineProperty(i,"__esModule",{value:!0}),i["default"]=s,e.exports=i["default"]},{}],205:[function(t,e,i){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function n(){(0,y["default"])([{name:"dropAlpha",src:"img/drop-alpha.png"},{name:"dropColor",src:"img/drop-color.png"},{name:"textureRainFg",src:"img/weather/texture-rain-fg.png"},{name:"textureRainBg",src:"img/weather/texture-rain-bg.png"},{name:"textureStormLightningFg",src:"img/weather/texture-storm-lightning-fg.png"},{name:"textureStormLightningBg",src:"img/weather/texture-storm-lightning-bg.png"},{name:"textureFalloutFg",src:"img/weather/texture-fallout-fg.png"},{name:"textureFalloutBg",src:"img/weather/texture-fallout-bg.png"},{name:"textureSunFg",src:"img/weather/texture-sun-fg.png"},{name:"textureSunBg",src:"img/weather/texture-sun-bg.png"},{name:"textureDrizzleFg",src:"img/weather/texture-drizzle-fg.png"},{name:"textureDrizzleBg",src:"img/weather/texture-drizzle-bg.png"}]).then(function(t){k=t.textureRainFg.img,O=t.textureRainBg.img,A=t.textureFalloutFg.img,M=t.textureFalloutBg.img,R=t.textureStormLightningFg.img,j=t.textureStormLightningBg.img,C=t.textureSunFg.img,D=t.textureSunBg.img,F=t.textureDrizzleFg.img,E=t.textureDrizzleBg.img,z=t.dropColor.img,I=t.dropAlpha.img,s()})}function s(){W=document.querySelector("#container");var t=window.devicePixelRatio;W.width=window.innerWidth*t,W.height=window.innerHeight*t,W.style.width=window.innerWidth+"px",W.style.height=window.innerHeight+"px",G=new g["default"](W.width,W.height,t,I,z),G.trailRate=1,G.trailScaleRange=[.2,.45],N=(0,x["default"])(Y.width,Y.height),L=N.getContext("2d"),X=(0,x["default"])(U.width,U.height),B=X.getContext("2d"),d(k,O),q=new m["default"](W,G.canvas,N,X,null,{brightness:1.04,alphaMultiply:6,alphaSubtract:3}),o()}function o(){a(),u(),l()}function a(){document.addEventListener("mousemove",function(t){var e=t.pageX,i=t.pageY;w["default"].to(V,1,{x:e/W.width*2-1,y:i/W.height*2-1,ease:Quint.easeOut,onUpdate:function(){q.parallaxX=V.x,q.parallaxY=V.y}})})}function l(){setInterval(function(){(0,S.chance)(K.flashChance)&&f(K.bg,K.fg,K.flashBg,K.flashFg)},500)}function u(){c(),window.addEventListener("hashchange",function(t){h()}),h()}function c(){function t(t){return Object.assign({},e,t)}var e={minR:20,maxR:50,rainChance:.35,rainLimit:6,drizzle:50,drizzleSize:[3,5.5],raining:!0,trailRate:1,trailScaleRange:[.25,.35],fg:k,bg:O,flashFg:null,flashBg:null,flashChance:0,collisionRadiusIncrease:5e-4};Z={rain:t({rainChance:.35,drizzle:50,raining:!0,fg:k,bg:O}),storm:t({maxR:55,rainChance:.4,drizzle:80,drizzleSize:[3,5.5],trailRate:2.5,trailScaleRange:[.25,.4],fg:k,bg:O,flashFg:R,flashBg:j,flashChance:.1}),fallout:t({minR:30,maxR:60,rainChance:.35,drizzle:20,trailRate:4,fg:A,bg:M,collisionRadiusIncrease:0}),drizzle:t({minR:10,maxR:40,rainChance:.15,rainLimit:2,drizzle:10,drizzleSize:[3.5,6],fg:F,bg:E}),sunny:t({rainChance:0,rainLimit:0,drizzle:0,raining:!1,fg:C,bg:D})}}function h(){var t=window.location.hash,e=null,i=null;""!=t&&(e=document.querySelector(t)),null==e&&(e=document.querySelector(".slide"),t="#"+e.getAttribute("id")),i=document.querySelector("[href='"+t+"']");var r=Z[e.getAttribute("data-weather")];K=r,G.minR=r.minR,G.maxR=r.maxR,G.rainChance=r.rainChance,G.rainLimit=r.rainLimit,G.drizzle=r.drizzle,G.drizzleSize=r.drizzleSize,G.trailRate=r.trailRate,G.trailScaleRange=r.trailScaleRange,G.raining=r.raining,G.collisionRadiusIncrease=r.collisionRadiusIncrease,G.drizzleCleaningRadiusMultiplier=.3,G.clearDrops(),w["default"].fromTo(H,1,{v:0},{v:1,onUpdate:function(){d(r.fg,r.bg,H.v),q.updateTextures()}});var n=document.querySelector(".slide--current");null!=n&&n.classList.remove("slide--current");var s=document.querySelector(".nav-item--current");null!=s&&s.classList.remove("nav-item--current"),e.classList.add("slide--current"),i.classList.add("nav-item--current")}function f(t,e,i,r){function n(n){var o=arguments.length<=1||void 0===arguments[1]?.025:arguments[1];return new Promise(function(a,l){w["default"].to(s,o,{v:n,ease:Quint.easeOut,onUpdate:function(){d(e,t),d(r,i,s.v),q.updateTextures()},onComplete:function(){a()}})})}var s={v:0},o=n(1);(0,P["default"])((0,S.random)(2,7),function(t){o=o.then(function(){return n((0,S.random)(.1,1))})}),o=o.then(function(){return n(1,.1)}).then(function(){n(0,.25)})}function d(t,e){var i=arguments.length<=2||void 0===arguments[2]?1:arguments[2];L.globalAlpha=i,L.drawImage(t,0,0,Y.width,Y.height),B.globalAlpha=i,B.drawImage(e,0,0,U.width,U.height)}t("core-js");var p=t("./rain-renderer"),m=r(p),_=t("./raindrops"),g=r(_),v=t("./image-loader"),y=r(v),$=t("./create-canvas"),x=r($),b=t("gsap"),w=r(b),T=t("./times"),P=r(T),S=t("./random"),k=void 0,O=void 0,R=void 0,j=void 0,A=void 0,M=void 0,C=void 0,D=void 0,F=void 0,E=void 0,z=void 0,I=void 0,N=void 0,L=void 0,X=void 0,B=void 0,U={width:384,height:256},Y={width:96,height:64},G=void 0,q=void 0,W=void 0,V={x:0,y:0},Z=null,K=null,H={v:0};n()},{"./create-canvas":202,"./image-loader":204,"./rain-renderer":206,"./raindrops":207,"./random":208,"./times":209,"core-js":1,gsap:201}],206:[function(t,e,i){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function n(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e["default"]=t,e}function s(t,e,i,r){var n=arguments.length<=4||void 0===arguments[4]?null:arguments[4],s=arguments.length<=5||void 0===arguments[5]?{}:arguments[5];this.canvas=t,this.canvasLiquid=e,this.imageShine=n,this.imageFg=i,this.imageBg=r,this.options=Object.assign({},p,s),this.init()}Object.defineProperty(i,"__esModule",{value:!0});var o=t("./webgl"),a=(n(o),t("./gl-obj")),l=r(a),u=t("./image-loader"),c=(r(u),t("./create-canvas")),h=r(c),f="#define GLSLIFY 1\nprecision mediump float;\n\nattribute vec2 a_position;\nattribute vec2 a_texCoord;\n\nuniform vec2 u_resolution;\n\nvarying vec2 v_texCoord;\nvarying vec2 v_resolution;\n\nvoid main() {\n   // convert the rectangle from pixels to 0.0 to 1.0\n   vec2 zeroToOne = a_position / u_resolution;\n\n   // convert from 0->1 to 0->2\n   vec2 zeroToTwo = zeroToOne * 2.0;\n\n   // convert from 0->2 to -1->+1 (clipspace)\n   vec2 clipSpace = zeroToTwo - 1.0;\n\n   gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);\n\n   // pass the texCoord to the fragment shader\n   // The GPU will interpolate this value between points.\n   v_texCoord = a_texCoord;\n   v_resolution = u_resolution;\n}\n",d="#define GLSLIFY 1\nprecision mediump float;\n\n// our texture\nuniform sampler2D u_waterMap;\nuniform sampler2D u_textureShine;\nuniform sampler2D u_textureFg;\nuniform sampler2D u_textureBg;\n\n// the texCoords passed in from the vertex shader.\nvarying vec2 v_texCoord;\nvarying vec2 v_resolution;\nuniform vec2 u_parallax;\nuniform float u_parallaxFg;\nuniform float u_parallaxBg;\nuniform float u_textureRatio;\nuniform int u_renderShine;\nuniform int u_renderShadow;\nuniform float u_minRefraction;\nuniform float u_refractionDelta;\nuniform float u_brightness;\nuniform float u_alphaMultiply;\nuniform float u_alphaSubtract;\n\nvec4 blend(vec4 bg,vec4 fg){\n  vec3 bgm=bg.rgb*bg.a;\n  vec3 fgm=fg.rgb*fg.a;\n  float ia=1.-fg.a;\n  float a=(fg.a + bg.a * ia);\n  vec3 rgb;\n  if(a!=0.){\n    rgb=(fgm + bgm * ia) / a;\n  }else{\n    rgb=vec3(0.,0.,0.);\n  }\n  return vec4(rgb,a);\n}\nvec2 scaledTexCoord(){\n  float ratio=v_resolution.x/v_resolution.y;\n  vec2 scale=vec2(1.,1.);\n  vec2 offset=vec2(0.,0.);\n  float ratioDelta=ratio-u_textureRatio;\n  if(ratioDelta>=0.){\n    scale.y=(1.+ratioDelta);\n    offset.y=ratioDelta/2.;\n  }else{\n    scale.x=(1.-ratioDelta);\n    offset.x=-ratioDelta/2.;\n  }\n  return (v_texCoord+offset)/scale;\n}\nvec2 pixel(){\n  return vec2(1.,1.)/v_resolution;\n}\nvec2 parallax(float v){\n  return u_parallax*pixel()*v;\n}\nvec4 offset(float x, float y){\n  vec2 scale=vec2( (v_resolution.x+(u_parallaxFg*2.))/v_resolution.x, (v_resolution.y+(u_parallaxFg*2.))/v_resolution.y);\n  vec2 scaledTexCoord=v_texCoord/scale;\n  vec2 scaleOffset=vec2((1.-(1./scale.x))/2.,(1.-(1./scale.y))/2.);\n  return texture2D(u_waterMap, (scaledTexCoord+scaleOffset)+(pixel()*vec2(x,y))+parallax(u_parallaxFg));\n}\n\nvoid main() {\n\n  vec4 center = offset(0.,0.);\n\n  float d=center.b;\n  float x=center.g;\n  float y=center.r;\n\n  float a=clamp(center.a*u_alphaMultiply-u_alphaSubtract, 0.,1.);\n  vec2 refraction=(vec2(x,y)-0.5)*2.;\n  vec2 texturePos=scaledTexCoord() +( pixel()*refraction*(u_minRefraction+(d*u_refractionDelta)))+parallax(u_parallaxBg-u_parallaxFg);\n  vec4 tex=texture2D(u_textureFg,texturePos);\n\n  if(u_renderShine==1){\n    float maxShine=490.;\n    float minShine=maxShine*0.18;\n    vec4 shine=texture2D(u_textureShine,vec2(0.5,0.5) + ((1./512.)*refraction)*-(minShine+((maxShine-minShine)*d)));\n    tex=blend(tex,shine);\n  }\n\n  vec4 bg=texture2D(u_textureBg,scaledTexCoord()+parallax(u_parallaxBg));\n\n  // vec4 fg=vec4(tex.rgb*1.04,a);\n  vec4 fg=vec4(tex.rgb*u_brightness,a);\n\n  if(u_renderShadow==1){\n    float borderAlpha = offset(0.,0.-(d*6.)).a;\n    borderAlpha=borderAlpha*u_alphaMultiply-(u_alphaSubtract+0.5);\n    // //\n    borderAlpha=clamp(borderAlpha,0.,1.);\n    borderAlpha*=0.2;\n    vec4 border=vec4(0.,0.,0.,borderAlpha);\n    fg=blend(border,fg);\n  }\n  // vec4 fg=vec4(blend(blend(tex,shine),border).rgb,a);\n  //vec4 fg=vec4(blend(tex,border).rgb,a);\n  //vec4 fg=vec4(tex.rgb,a);\n\n  // gl_FragColor = blend(bg,blend(shadow,fg));\n  gl_FragColor = blend(bg,fg);\n  // gl_FragColor = vec4(center.rgb,1);\n\n  // gl_FragColor=vec4(0,0,center.b,1);\n}\n",p={
renderShadow:!1,minRefraction:256,maxRefraction:512,brightness:1,alphaMultiply:20,alphaSubtract:5,parallaxBg:5,parallaxFg:20};s.prototype=Object.defineProperties({canvas:null,gl:null,canvasLiquid:null,width:0,height:0,imageShine:"",imageFg:"",imageBg:"",textures:null,programWater:null,programBlurX:null,programBlurY:null,parallaxX:0,parallaxY:0,renderShadow:!1,options:null,init:function(){this.width=this.canvas.width,this.height=this.canvas.height,this.gl=new l["default"](this.canvas,{alpha:!1},f,d);var t=this.gl;this.programWater=t.program,t.createUniform("2f","resolution",this.width,this.height),t.createUniform("1f","textureRatio",this.imageBg.width/this.imageBg.height),t.createUniform("1i","renderShine",null==this.imageShine?0:1),t.createUniform("1i","renderShadow",this.options.renderShadow),t.createUniform("1f","minRefraction",this.options.minRefraction),t.createUniform("1f","refractionDelta",this.options.maxRefraction-this.options.minRefraction),t.createUniform("1f","brightness",this.options.brightness),t.createUniform("1f","alphaMultiply",this.options.alphaMultiply),t.createUniform("1f","alphaSubtract",this.options.alphaSubtract),t.createUniform("1f","parallaxBg",this.options.parallaxBg),t.createUniform("1f","parallaxFg",this.options.parallaxFg),t.createTexture(null,0),this.textures=[{name:"textureShine",img:null==this.imageShine?(0,h["default"])(2,2):this.imageShine},{name:"textureFg",img:this.imageFg},{name:"textureBg",img:this.imageBg}],this.textures.forEach(function(e,i){t.createTexture(e.img,i+1),t.createUniform("1i",e.name,i+1)}),this.draw()},draw:function(){this.gl.useProgram(this.programWater),this.gl.createUniform("2f","parallax",this.parallaxX,this.parallaxY),this.updateTexture(),this.gl.draw(),requestAnimationFrame(this.draw.bind(this))},updateTextures:function(){var t=this;this.textures.forEach(function(e,i){t.gl.activeTexture(i+1),t.gl.updateTexture(e.img)})},updateTexture:function(){this.gl.activeTexture(0),this.gl.updateTexture(this.canvasLiquid)},resize:function(){}},{overlayTexture:{get:function(){},set:function(t){},configurable:!0,enumerable:!0}}),i["default"]=s,e.exports=i["default"]},{"./create-canvas":202,"./gl-obj":203,"./image-loader":204,"./webgl":210}],207:[function(t,e,i){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function n(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}function s(t,e,i,r,n){this.width=t,this.height=e,this.scale=i,this.dropAlpha=r,this.dropColor=n,this.init()}Object.defineProperty(i,"__esModule",{value:!0});var o=t("./image-loader"),a=(r(o),t("./times.js")),l=r(a),u=t("./create-canvas.js"),c=r(u),h=t("./random"),f=64,d={x:0,y:0,r:0,spreadX:0,spreadY:0,momentum:0,momentumX:0,lastSpawn:0,nextSpawn:0,parent:null,isNew:!0,killed:!1,tension:0,shrink:0};s.prototype=Object.defineProperties({canvas:null,ctx:null,width:0,height:0,scale:0,minR:10,maxR:40,maxDrops:900,texture:null,textureCtx:null,texturePixelDensity:1,rainChance:.3,rainLimit:3,drizzleCounter:0,drizzle:50,drizzleSize:[2,4],drizzleCleaningRadiusMultiplier:.45,drops:null,dropsGfx:null,paintGfx:null,raining:!0,lastRender:null,textureCleaningIterations:0,globalTimeScale:1,trailRate:1,autoShrink:!0,spawnArea:[-.1,.95],trailScaleRange:[.2,.5],collisionRadius:.65,collisionRadiusIncrease:.01,dropFallMultiplier:1,collisionBoostMultiplier:.05,collisionBoost:1,init:function(){this.canvas=(0,c["default"])(this.width,this.height),this.ctx=this.canvas.getContext("2d"),this.texture=(0,c["default"])(this.width*this.texturePixelDensity,this.height*this.texturePixelDensity),this.textureCtx=this.texture.getContext("2d"),this.drops=[],this.newDrops=[],this.dropsGfx=[],this.renderDropsGfx()},drawTextureDrop:function(t,e,i){this.drawDrop(this.textureCtx,Object.assign(Object.create(d),{x:t*this.texturePixelDensity,y:e*this.texturePixelDensity,r:i*this.texturePixelDensity}))},renderDropsGfx:function(){var t=this,e=(0,c["default"])(f,f),i=e.getContext("2d");this.dropsGfx=Array.apply(null,Array(255)).map(function(r,n){var s=(0,c["default"])(f,f),o=s.getContext("2d");return i.clearRect(0,0,f,f),i.globalCompositeOperation="source-over",i.drawImage(t.dropColor,0,0,f,f),i.globalCompositeOperation="screen",i.fillStyle="rgba(0,0,"+n+",1)",i.fillRect(0,0,f,f),o.globalCompositeOperation="source-over",o.drawImage(t.dropAlpha,0,0,f,f),o.globalCompositeOperation="source-in",o.drawImage(e,0,0,f,f),s}),this.paintGfx=(0,c["default"])(128,128);var r=this.paintGfx.getContext("2d");r.fillStyle="#000",r.beginPath(),r.arc(64,64,64,0,2*Math.PI),r.fill(),this.update()},drawDrop:function(t,e){if(this.dropsGfx.length>0){var i=e.x,r=e.y,n=e.r,s=e.spreadX,o=e.spreadY,a=1,l=1.5,u=Math.max(0,Math.min(1,(n-this.minR)/this.deltaR*.9));u*=1/(.5*(e.spreadX+e.spreadY)+1),t.globalAlpha=1,t.globalCompositeOperation="source-over",u=Math.floor(u*(this.dropsGfx.length-1)),t.drawImage(this.dropsGfx[u],(i-n*a*(s+1))*this.scale,(r-n*l*(o+1))*this.scale,2*n*a*(s+1)*this.scale,2*n*l*(o+1)*this.scale)}},paint:function(t,e){var i=arguments.length<=2||void 0===arguments[2]?30:arguments[2],r=this.textureCtx;r.globalCompositeOperation="destination-out",r.drawImage(this.paintGfx,(t-i)*this.texturePixelDensity*this.scale,(e-i)*this.texturePixelDensity*this.scale,2*i*this.texturePixelDensity*this.scale,2*i*this.texturePixelDensity*this.scale*1.5)},clearCanvas:function(){this.ctx.clearRect(0,0,this.width,this.height)},createDrop:function(t){return this.drops.length>=this.maxDrops*this.areaMultiplier?null:Object.assign(Object.create(d),t)},addDrop:function(t){return this.drops.length>=this.maxDrops*this.areaMultiplier||null==t?!1:(this.drops.push(t),!0)},updateRain:function(t){var e=[];if(this.raining)for(var i=this.rainLimit*t*this.areaMultiplier,r=0;(0,h.chance)(this.rainChance*t*this.areaMultiplier)&&i>r;){r++;var n=(0,h.random)(this.minR,this.maxR,function(t){return Math.pow(t,3)}),s=this.createDrop({x:(0,h.random)(this.width/this.scale),y:(0,h.random)(this.height/this.scale*this.spawnArea[0],this.height/this.scale*this.spawnArea[1]),r:n,momentum:1+.1*(n-this.minR)+(0,h.random)(2),spreadX:1.5,spreadY:1.5});null!=s&&e.push(s)}return e},clearDrops:function(){this.drops.forEach(function(t){setTimeout(function(){t.shrink=.1+(0,h.random)(.5)},(0,h.random)(1200))}),this.clearTexture()},clearTexture:function(){this.textureCleaningIterations=50},updateTexture:function(t){var e=this;this.textureCleaningIterations>0&&(this.textureCleaningIterations-=1*t,this.textureCtx.globalCompositeOperation="destination-out",this.textureCtx.fillStyle="rgba(0,0,0,"+.05*t+")",this.textureCtx.fillRect(0,0,this.width*this.texturePixelDensity,this.height*this.texturePixelDensity)),this.raining&&(this.drizzleCounter+=this.drizzle*t*this.areaMultiplier,(0,l["default"])(this.drizzleCounter,function(t){e.drizzleCounter--,e.drawTextureDrop((0,h.random)(e.width/e.scale),(0,h.random)(e.height/e.scale),h.random.apply(void 0,n(e.drizzleSize).concat([function(t){return t*t}])))})),this.ctx.drawImage(this.texture,0,0,this.width,this.height)},updateDrops:function(t){var e=this,i=[];this.updateTexture(t);var r=this.updateRain(t);i=i.concat(r),this.drops.sort(function(t,i){var r=t.y*(e.width/e.scale)+t.x,n=i.y*(e.width/e.scale)+i.x;return r>n?1:r==n?0:-1}),this.drops.forEach(function(e,r){var s=this;if(!e.killed){if((0,h.chance)((e.r-this.minR*this.dropFallMultiplier)*(.1/this.deltaR)*t)&&(e.momentum+=(0,h.random)(e.r/this.maxR*4)),this.autoShrink&&e.r<=this.minR&&(0,h.chance)(.05*t)&&(e.shrink+=.01),e.r-=e.shrink*t,e.r<=0&&(e.killed=!0),this.raining&&(e.lastSpawn+=e.momentum*t*this.trailRate,e.lastSpawn>e.nextSpawn)){var o=this.createDrop({x:e.x+.1*(0,h.random)(-e.r,e.r),y:e.y-.01*e.r,r:e.r*h.random.apply(void 0,n(this.trailScaleRange)),spreadY:.1*e.momentum,parent:e});null!=o&&(i.push(o),e.r*=Math.pow(.97,t),e.lastSpawn=0,e.nextSpawn=(0,h.random)(this.minR,this.maxR)-2*e.momentum*this.trailRate+(this.maxR-e.r))}e.spreadX*=Math.pow(.4,t),e.spreadY*=Math.pow(.7,t);var a=e.momentum>0;a&&!e.killed&&(e.y+=e.momentum*this.globalTimeScale,e.x+=e.momentumX*this.globalTimeScale,e.y>this.height/this.scale+e.r&&(e.killed=!0));var l=(a||e.isNew)&&!e.killed;e.isNew=!1,l&&this.drops.slice(r+1,r+70).forEach(function(i){if(e!=i&&e.r>i.r&&e.parent!=i&&i.parent!=e&&!i.killed){var r=i.x-e.x,n=i.y-e.y,o=Math.sqrt(r*r+n*n);if(o<(e.r+i.r)*(s.collisionRadius+e.momentum*s.collisionRadiusIncrease*t)){var a=Math.PI,l=e.r,u=i.r,c=a*(l*l),h=a*(u*u),f=Math.sqrt((c+.8*h)/a);f>s.maxR&&(f=s.maxR),e.r=f,e.momentumX+=.1*r,e.spreadX=0,e.spreadY=0,i.killed=!0,e.momentum=Math.max(i.momentum,Math.min(40,e.momentum+f*s.collisionBoostMultiplier+s.collisionBoost))}}}),e.momentum-=.1*Math.max(1,.5*this.minR-e.momentum)*t,e.momentum<0&&(e.momentum=0),e.momentumX*=Math.pow(.7,t),e.killed||(i.push(e),a&&this.drizzle>0&&this.paint(e.x,e.y,e.r*this.drizzleCleaningRadiusMultiplier),this.drawDrop(this.ctx,e))}},this),this.drops=i},update:function(){this.clearCanvas();var t=Date.now();null==this.lastRender&&(this.lastRender=t);var e=t-this.lastRender,i=e/(1/60*1e3);i>1.5&&(i=1.5),i=1,i*=this.globalTimeScale,this.lastRender=t,this.updateDrops(i),requestAnimationFrame(this.update.bind(this))}},{deltaR:{get:function(){return this.maxR-this.minR},configurable:!0,enumerable:!0},area:{get:function(){return this.width*this.height/this.scale},configurable:!0,enumerable:!0},areaMultiplier:{get:function(){return Math.sqrt(this.area/786432)},configurable:!0,enumerable:!0}}),i["default"]=s,e.exports=i["default"]},{"./create-canvas.js":202,"./image-loader":204,"./random":208,"./times.js":209}],208:[function(t,e,i){"use strict";function r(){var t=arguments.length<=0||void 0===arguments[0]?null:arguments[0],e=arguments.length<=1||void 0===arguments[1]?null:arguments[1],i=arguments.length<=2||void 0===arguments[2]?null:arguments[2];null==t?(t=0,e=1):null!=t&&null==e&&(e=t,t=0);var r=e-t;return null==i&&(i=function(t){return t}),t+i(Math.random())*r}function n(t){return r()<=t}Object.defineProperty(i,"__esModule",{value:!0}),i.random=r,i.chance=n},{}],209:[function(t,e,i){"use strict";function r(t,e){for(var i=0;t>i;i++)e.call(this,i)}Object.defineProperty(i,"__esModule",{value:!0}),i["default"]=r,e.exports=i["default"]},{}],210:[function(t,e,i){"use strict";function r(t){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=["webgl","experimental-webgl"],r=null;return i.some(function(i){try{r=t.getContext(i,e)}catch(n){}return null!=r}),null==r&&document.body.classList.add("no-webgl"),r}function n(t,e,i){var r=s(t,e,t.VERTEX_SHADER),n=s(t,i,t.FRAGMENT_SHADER),o=t.createProgram();t.attachShader(o,r),t.attachShader(o,n),t.linkProgram(o);var a=t.getProgramParameter(o,t.LINK_STATUS);if(!a){var l=t.getProgramInfoLog(o);return h("Error in program linking: "+l),t.deleteProgram(o),null}var u=t.getAttribLocation(o,"a_position"),c=t.getAttribLocation(o,"a_texCoord"),f=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,f),t.bufferData(t.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),t.STATIC_DRAW),t.enableVertexAttribArray(c),t.vertexAttribPointer(c,2,t.FLOAT,!1,0,0);var d=t.createBuffer();return t.bindBuffer(t.ARRAY_BUFFER,d),t.enableVertexAttribArray(u),t.vertexAttribPointer(u,2,t.FLOAT,!1,0,0),o}function s(t,e,i){var r=t.createShader(i);t.shaderSource(r,e),t.compileShader(r);var n=t.getShaderParameter(r,t.COMPILE_STATUS);if(!n){var s=t.getShaderInfoLog(r);return h("Error compiling shader '"+r+"':"+s),t.deleteShader(r),null}return r}function o(t,e,i){var r=t.createTexture();return l(t,i),t.bindTexture(t.TEXTURE_2D,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),u(t,e),r}function a(t,e,i,r){for(var n=t.getUniformLocation(e,"u_"+r),s=arguments.length,o=Array(s>4?s-4:0),a=4;s>a;a++)o[a-4]=arguments[a];t["uniform"+i].apply(t,[n].concat(o))}function l(t,e){t.activeTexture(t["TEXTURE"+e])}function u(t,e){t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e)}function c(t,e,i,r,n){var s=e,o=e+r,a=i,l=i+n;t.bufferData(t.ARRAY_BUFFER,new Float32Array([s,a,o,a,s,l,s,l,o,a,o,l]),t.STATIC_DRAW)}function h(t){console.error(t)}Object.defineProperty(i,"__esModule",{value:!0}),i.getContext=r,i.createProgram=n,i.createShader=s,i.createTexture=o,i.createUniform=a,i.activeTexture=l,i.updateTexture=u,i.setRectangle=c},{}]},{},[205]);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//




