function currentTime() {
	var currentTime = new Date();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	if (minutes < 10) {
		minutes = "0" + minutes
	}
	var format = hours + ":" + minutes;
	if (hours > 11) {
		format = format + " PM";
	} else {
		format = format + " AM";
	}
	return format;
}

$.fn.ranimate = function(options, callback) {
	var el = this;
	el.one('transitionend', function() {
		callback();
	});
	setTimeout(function() {
		el.css(options);
	}, 100);
};

function openProjector(callback) {
	$('.screen').append('<div class="projectorTop"></div>');
	$('.screen').append('<div class="projectorScreen"></div>');
	$('.projectorScreen').append('<img style="position:absolute;bottom:-100px;left:10px;z-index:-1" src="floorShadow.png"/>')

	$('.projectorScreen').ranimate({
		height: '150px'
	}, callback);
}

function closeProjector(callback) {
	$('.projectorScreen').ranimate({
		height: '0px'
	}, callback);
}

function showLevels() {
	$('.buttons .button').addClass('disabled');
	$('.screen').html('');
	$('.screen').append('<div class="levelHeader">Levels</div>');
	$('.screen').append('<div class="bugContainer"></div>');
	$('.bugContainer').append('<div class="levelName" onclick="intro()">Intro</div>');
	for (let i = 0; i < levels.length; i++) {
		for (let j = 0; j < levels[i].length; j++) {
			$('.bugContainer').append('<div class="levelName" onclick="advance(' + i + ',' + j + ');">Level ' + (i + 1) + '-' + (j + 1) + '</div>');
		}
	}
	$('.screen').append('<div class="backToTitle" onclick="showTitleScreen()">&lt;&lt;back</div>');
}

function showTitleScreen() {
	$('.screen').html('');
	$('.screen').append('<img src="reggietitle.png" class="titleText"/>');
	$('.screen').append('<img src="reggie.png" class="titleRobot"/>');
	$('.titleText').animate({
		top: '-170px'
	}, 1500, function() {
		$('.screen').append('<div class="tapStart" onclick="showLevels()">tap to start</div>');
	});
}

var userInput = '';
var inputMap = [];
var arrayIndex = 0;
var success = true;
inputMap['a'] = 'red';
inputMap['b'] = 'yellow';
inputMap['c'] = 'blue';
inputMap['z'] = 'green';
var inputArray = [];
var activeArray = [];
var gMain = 0;
var gSub = 0;
var levelTitle = "1-1";
var tip = "";

var levels = [];

function advance(main, sub) {
	debugger;
	if (main != null) {
		gMain = main;
		gSub = sub;
	} else {
		gSub++;
		if (!levels[gMain][gSub]) {
			gMain++;
			gSub = 0;
		}
	}
	inputArray = [];
	levels[gMain][gSub]();
	reset();
}
//level 1 basic controls

levels[0] = [
	function() {
		tip = "Don't overthink this one.";
		activeArray = ['fire', 'red', 'undo', 'clear'];
		inputArray[0] = 'a';
		inputArray[1] = 'z';
	},
	function() {
		tip = "Reggie replaces what you give him with <i>exactly</i> one byte.";
		activeArray = ['fire', 'red', 'undo', 'clear'];
		inputArray[0] = 'aaa';
		inputArray[1] = 'z';
	},
	function() {
		tip = "Not all bugs are bad. Some of them are called features.";
		activeArray = ['fire', 'red', 'undo', 'clear'];
		inputArray[0] = 'aaa';
		inputArray[1] = 'za';
	},
	function() {
		tip = "Reggie has given you a new button. Don't make him regret it.";
		activeArray = ['fire', 'red', 'yellow', 'undo', 'clear'];
		inputArray[0] = 'abaa';
		inputArray[1] = 'az';
	},
	function() {
		tip = "Reggie travelled from the future to give you a message. But he can't remember what it is, so it couldn't have been that important.";
		activeArray = ['fire', 'red', 'yellow', 'undo', 'clear'];
		inputArray[0] = 'abaa';
		inputArray[1] = 'za';
	},
	function() {
		tip = "Reggie thinks you should treat others as you would like to be treated.";
		activeArray = ['fire', 'red', 'yellow', 'undo', 'clear'];
		inputArray[0] = 'baabbaabaa';
		inputArray[1] = 'baazbaa';
	},
	function level7() {
		tip = "Don't worry - it gets harder.";
		activeArray = ['fire', 'red', 'yellow', 'undo', 'clear'];
		inputArray[0] = 'baabbaabaa';
		inputArray[1] = 'zabzaza';
	}
];

levels[1] = [
	function() {
		//.
		tip = "You might wanna try out that new dot operator button...I'm just sayin...";
		activeArray = ['fire', 'red', 'yellow', 'undo', 'clear', 'dot'];
		inputArray[0] = 'c';
		inputArray[1] = 'z';
	},
	function() {
		//...
		tip = "One more easy one to make sure you were paying attention.";
		activeArray = ['fire', 'red', 'yellow', 'undo', 'clear', 'dot'];
		inputArray[0] = 'abc';
		inputArray[1] = 'z';
	},
	function() {
		//a.b
		tip = "All lines need to match the goal.";
		activeArray = ['fire', 'red', 'yellow', 'undo', 'clear', 'dot'];
		inputArray[0] = 'acb';
		inputArray[1] = 'aab';
		inputArray[2] = 'abb';
		inputArray[3] = 'zzz';
	},
	function() {
		//a.
		tip = "...and Reggie's all out of gum...";
		activeArray = ['fire', 'red', 'yellow', 'undo', 'clear', 'dot'];
		inputArray[0] = 'baa';
		inputArray[1] = 'bab';
		inputArray[2] = 'bz';
	},
	function() {
		//..
		tip = "Reggie thinks you should treat others as you would like to be treated.";
		activeArray = ['fire', 'red', 'yellow', 'undo', 'clear', 'dot'];
		inputArray[0] = 'abab';
		inputArray[1] = 'baba';
		inputArray[2] = 'aaab';
		inputArray[3] = 'zz';
	},
	function() {
		//..a
		tip = "When it comes to the patterns you give him, first come, first serve.";
		activeArray = ['fire', 'red', 'yellow', 'undo', 'clear', 'dot'];
		inputArray[0] = 'baa';
		inputArray[1] = 'caa';
		inputArray[2] = 'aaa';
		inputArray[3] = 'za';
	},
	function() {
		//b.a
		tip = "Reggie thinks you should treat others as you would like to be treated.";
		activeArray = ['fire', 'red', 'yellow', 'undo', 'clear', 'dot'];
		inputArray[0] = 'abcabab';
		inputArray[1] = 'abbabab';
		inputArray[2] = 'azbab';
	},
	function() {
		//..b
		tip = "Reggie thinks you should treat others as you would like to be treated.";
		activeArray = ['fire', 'red', 'yellow', 'undo', 'clear', 'dot'];
		inputArray[0] = 'acabbbaab';
		inputArray[1] = 'ababbbcab';
		inputArray[2] = 'acabbbaab';
		inputArray[3] = 'azbbz';
	},
	function() {
		//.a.
		tip = "Reggie thinks you should treat others as you would like to be treated.";
		activeArray = ['fire', 'red', 'yellow', 'undo', 'clear', 'dot'];
		inputArray[0] = 'acabbbaab';
		inputArray[1] = 'ababbbacb';
		inputArray[2] = 'acabbbaab';
		inputArray[3] = 'azbzb';
	}
];

levels[2] = [
	function() {
		tip = "Never use the infinity operator without putting a bug in front of it first. If you do, your mobile device may cease to function. Permanently.";
		activeArray = ['fire', 'red', 'yellow', 'undo', 'clear', 'dot', 'infinity'];
		inputArray[0] = 'aaaaaa';
		inputArray[1] = 'a';
		inputArray[2] = 'z';
	},
	function() {
		tip = "Things are gonna start to get crazy.";
		activeArray = ['fire', 'red', 'yellow', 'undo', 'clear', 'dot', 'infinity'];
		inputArray[0] = 'bbbac';
		inputArray[1] = 'bbaaaac';
		inputArray[2] = 'bac'
		inputArray[3] = 'zc';
	},
	function() {
		tip = "And now Reggie is about to blow your mind...";
		activeArray = ['fire', 'red', 'yellow', 'undo', 'clear', 'dot', 'infinity'];
		inputArray[0] = 'ccccccccc';
		inputArray[1] = 'z';
	},
	function() {
		//b..a*
		tip = "Reggie thinks you should treat others as you would like to be treated.";
		activeArray = ['fire', 'red', 'yellow', 'undo', 'clear', 'dot', 'infinity'];
		inputArray[0] = 'abaaaab';
		inputArray[1] = 'ababab';
		inputArray[2] = 'ababaab';
		inputArray[3] = 'azb';
	},
	function() {
		//b.*b
		tip = "The infinity operator is.";
		activeArray = ['fire', 'red', 'yellow', 'undo', 'clear', 'dot', 'infinity'];
		inputArray[0] = 'cbacba';
		inputArray[1] = 'cbaaacccba';
		inputArray[2] = 'cbaaaaba';
		inputArray[3] = 'cza';
	}
];

var animationQueue = [];
var animationIndex = 0;

var thinking = false;

var goal = inputArray[inputArray.length - 1];

function activate(buttons) {
	for (var i = 0; i < buttons.length; i++) {
		$('#' + buttons[i]).removeClass('disabled');
	}
}

function marquee() {
	$('.screen').append('<div class="tip">tip: ' + tip + '</div>');
	var seconds = 10 * ($('.tip').width() / 320);
	$('.tip').css('transition', 'all ' + seconds + 's linear');
	setTimeout(function() {
		$('.tip').ranimate({
			left: (-1 * $('.tip').width()) + 'px'
		}, function() {
			$('.tip').remove();
			marquee();
		});
	}, 100);
}

function reset() {
	$('#fire').css('display', 'block');
	$('#restart').css('display', 'none');
	$('.cracked').remove();
	$('.screen').html('');
	$('.screen').append('<div class="levelHeader">' + (gMain + 1) + '-' + (gSub + 1) + '</div>');
	$('.screen').append('<div class="backToTitle" onclick="showLevels()">&lt;&lt;back</div>');
	$('.screen').append('<div class="input">input<div style="float:right">:</div></div><div class="userDisplay"></div>');
	$('.screen').append('<table class="screenLines"></table>');
	$('.userEnter').html('submit');
	var screenTable = $('.screen .screenLines');
	screenTable.html('');
	for (var i = 0; i < inputArray.length; i++) {
		var input = inputArray[i];
		var line = '';
		for (var j = 0; j < input.length; j++) {
			line += '<div class="lineItem ' + inputMap[input[j]] + '" val="' + inputMap[input[j]] + '"><img src="' + inputMap[input[j]] + 'bug.png"/></div>';
		}
		if (i != (inputArray.length - 1)) {
			screenTable.append('<tr><td>line' + (i + 1) + '--&gt;</td><td class="input' + i + '" nowrap>' + line + '</td></tr>');
		} else {
			goal = input;
			screenTable.append('<tr><td>goal--&gt;</td><td class="input' + i + '">' + line + '</td><td class="answer' + i + '"></td></tr>');
		}
	}
	thinking = false;
	empty();
	activate(activeArray);
	marquee();
}

function formatUserDisplay() {
	$('.userDisplay').html(userInput.replace(/b/g, "<img src='yellowbug.png'/>").replace(/a/g, "<img src='redbug.png'/>"));
}

function add(el) {
	if (thinking || $(el).parent().hasClass('disabled')) return;
	userInput += $(el).attr('val');
	formatUserDisplay();
}

function empty() {
	if (thinking) return;
	userInput = '';
	$('.userDisplay').html(userInput);
}

function undo() {
	if (thinking) return;
	userInput = userInput.substring(0, userInput.length - 1);
	formatUserDisplay();
}

function animateReplacement(matched, offset) {
	if (matched.length == 0) return '';
	var lineItems = $('.input' + arrayIndex + ' .lineItem');
	var total = matched.length - 1;
	for (var i = 0; i < total; i++) {
		animationQueue[animationIndex++] = $(lineItems[offset + i]);
	}
	var last = $(lineItems[offset + total]);
	last.addBit = true;
	animationQueue[animationIndex++] = last;
	return 'z';
}

function submit() {
	if (userInput.length <= 0 || thinking) return;
	thinking = true;
	$('.buttons .button').addClass('disabled');
	success = true;
	animationQueue = [];
	animationIndex = 0;
	for (var i = 0; i < (inputArray.length - 1); i++) {
		arrayIndex = i;
		var input = inputArray[i];
		var output = input.replace(new RegExp(userInput, 'g'), animateReplacement);
		if (output == goal) {
			$('.line' + i).css('color', 'green');
		} else {
			success = false;
			$('.line' + i).css('color', 'red');
		}
	}
	animationIndex = 0;
	showResults();
}

function winner() {
	$('.screen').append('<div class="winner">WINNER</div>')
	$('.winner').ranimate({
		left: '320px'
	}, advance)
}

function loser() {
	$('.screen').append('<img class="reggieMad" src="reggieMad.png"/>')
	$('.reggieMad').ranimate({
		bottom: '-10px'
	}, beam);
}

function beam() {
	$('body').append('<div class="laserPointer"><div class="bigLaser"></div></div>');
	$('.bigLaser').ranimate({
		height: '100px',
		transform: 'rotateX(15deg)'
	}, loserScreen);
}

function loserScreen() {
	$('.bigLaser').remove();
	$('.screen').append('<div class="failed">You have failed Reggie for the last time.</div>');
	//$('.screen').append('<div class="failed">If Reggie had been given feelings, the one he\'d be having right now is rage.</div>');
	$('body').append('<img class="cracked" src="largeCracked.gif"/>');
	$('.reggieMad').ranimate({
		bottom: '-300px'
	}, restartButton);
}

function restartButton() {
	$('#fire').css('display', 'none');
	$('#restart').css('display', 'block');
}

function showResults() {
	if (animationIndex < animationQueue.length) {
		var el = animationQueue[animationIndex];
		animationIndex++;
		el.find('img').ranimate({
			'-webkit-filter': 'brightness(0)'
		}, function() {
			if (el.addBit) {
				el.html('<img src="greenbug.png"/>');
			} else el.html('');
			showResults();
		});
	} else if (success) {
		winner();
	} else {
		loser();
	}
}

var toggle = false;

function init() {
	setInterval(function() {
		var value = toggle ? "" : 2;
		toggle = !toggle;
		$('.input div').html((toggle ? "" : ':'));
		$('.screenLines img').each(function(index, el) {
			var src = $(el).attr('src');
			$(el).attr('src', src.replace(/\d*\.png/, value + '.png'));

		});
	}, 1000);
	$('.add').click(function() {
		add(this);
	});
	$('.buttons .button').addClass('disabled');
	showTitleScreen();
}