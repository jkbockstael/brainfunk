// Brainfunk - a JavaScript brainfuck interpreter with breakpoint support
// 2012, Jean-Karim Bockstael <jkb@jkbockstael.be>
var brainfunk = function() {
	var programtxt = undefined;
	var output = undefined;
	var input = undefined;
	var program = undefined;
	var memory = [];
	var memorysize = 30000;
	var pointer = 0;
	var counter = 0;
	var inputcursor = 0;
	var clock = undefined;
	var clockspeed = 0; // milliseconds
	return {
		setProgram: function(id) {
			programtxt = document.getElementById(id);
		},
		setOutput: function(id) {
			output = document.getElementById(id);
		},
		setInput: function(id) {
			input = document.getElementById(id);
		},
		start: function() {
			program = programtxt.value;
			for (i = 0; i < memorysize; i++) {
				memory[i] = 0;
			}
			counter = 0;
			pointer = 0;
			output.value = "";
			inputcursor = 0;
			clock = setInterval(this.step, clockspeed);
		},
		stop: function() {
			clearInterval(clock);
		},
		pause: function() {
			clearInterval(clock);
			console.log("pause at "+counter+", memory dump (pointer at "+pointer+"):");
			console.log(memory);
		},
		resume: function() {
			clock = setInterval(this.step, clockspeed);
		},
		step: function() {
			instruction = program[counter];
			switch (instruction) {
				case ">":
					pointer++;
					break;
				case "<":
					pointer--;
					break;
				case "+":
					memory[pointer] = memory[pointer]+1;
					break;
				case "-":
					memory[pointer] = memory[pointer]-1;
					break;
				case ".":
					output.value += String.fromCharCode(memory[pointer]);
					break;
				case ",":
					memory[pointer] = input.value.charCodeAt(inputcursor);
					inputcursor++;
					break;
				case "[":
					if (memory[pointer] === 0) {
						while (program[counter] != "]") {
							counter++;
						}
					}
					break;
				case "]":
					if (memory[pointer] != 0) {
						while (program[counter] != "[") {
							counter--;
						}
					}
					break;
				case "@":
					pause();
					break;
				// default: ignore
			}
			counter++
			if (program[counter] === undefined) {
				stop();
			}
		}
	}
};
