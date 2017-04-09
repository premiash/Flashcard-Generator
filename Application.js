var fs  = require('fs');
var inquirer = require('inquirer');
// var command = process.argv[2];



function BasicFlashcard(front, back){
	this.front = front;
	this.back = back;
	this.save = function(){
		fs.appendFile("cards.txt", "{front: " + front + ", back: " + back + "}," + "\n", function(err){
			if(err) console.log(err);
		});
	};
}

function ClozeFlashcard(text, cloze){
	this.text = text;
	this.cloze = cloze;
	this.save = function() {
		fs.appendFile("cards.txt", "{front: " + text +  ", back: " + cloze + "}," + "\n", function(err){
			if(err) console.log(err);
		});
	};
}

function showAllCards() {
	fs.readFile("cards.txt", "utf8", function(error,data){
		if(error) console.log(error);
		console.log("[" + data + "]");
	});
}



inquirer.prompt([{
    type: "list",
    message: "What type of Flash Card do you like to make?",
    choices: ["Create Basic flashcard", "Create Cloze-Deleted flashcard", "Show flashcards"],
    default: ["Basic flashcard"],
    name: "commands"

}]).then(function(user) {

if(user.commands !== 'Show flashcards') {
		fs.appendFile("cards.txt", "\n" + user.commands + "\n");
}

console.log("Generate" + user.commands);

flashCard();


function flashCard() {
	var command = user.commands;

	if (user.commands === 'Create Basic flashcard'){
		inquirer.prompt([{
			name: 'front',
			message: 'Enter front of card: ',
			validate: function (input) {
		    	// Declare function as asynchronous, and save the done callback 
		    	var	done = this.async();
			 
			  	// Do async stuff 
	      		if (input === '') {
	        	// 	Pass the return value in the done callback 
	        	done('Enter valid text');
	        	return;
	      }
	      // Pass the return value in the done callback 
	      done(null, true);
			}
		},{
			name: 'back',
			message: 'Enter back of card: ',
			validate: function (input) {
			    // Declare function as asynchronous, and save the done callback 
			    var done = this.async();
			 
			    // Do async stuff 
		      	if (input === '') {
		        	// Pass the return value in the done callback 
		        	done('Enter valid text');
		        	return;
		      	}
		      	// Pass the return value in the done callback 
		      	done(null, true);
			}
		}]).then(function(answers){
			var basicFlashCard = new BasicFlashcard(answers.front, answers.back);
			basicFlashCard.save();
		});
	} 
	else if (user.commands === 'Create Cloze-Deleted flashcard'){
		inquirer.prompt([{
			name: 'text',
			message: 'Enter full text: ',
			validate: function (input) {
			    // Declare function as asynchronous, and save the done callback 
			    var done = this.async();
			 
			    // Do async stuff 
		      	if (input === '') {
		        	// Pass the return value in the done callback 
		        	done('Enter valid text');
		        	return;
		      	}
		      	// Pass the return value in the done callback 
		      	done(null, true);
			}
		},{
			name: 'cloze',
			message: 'Enter cloze argument: ',
			validate: function (input) {
			    // Declare function as asynchronous, and save the done callback 
			    var done = this.async();
			 
			    // Do async stuff 
		      	if (input === '') {
		        	// Pass the return value in the done callback 
		        	done('Enter valid text');
		        	return;
		      	}
		      	// Pass the return value in the done callback 
		      	done(null, true);
			}
		}]).then(function(answers){
			var search = answers.text.search(answers.cloze);
			var substring = answers.text.substring(0,search) + '________' + answers.text.substring(search + answers.cloze.length);
			var clozeFlashCard = new ClozeFlashcard(substring, answers.cloze);
			clozeFlashCard.save();
		});
	} else if(command === 'Show flashcards'){
		showAllCards();
	} 
}

});


