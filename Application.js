var fs  = require('fs');
var inquirer = require('inquirer');
var command = process.argv[2];

flashCard();


function flashCard() {
	if (command === 'basic'){
		inquirer.prompt([{
			name: 'front',
			message: 'Enter front of card: '
		},{
			name: 'back',
			message: 'Enter back of card: '
		}]).then(function(answers){
			var basicFlashCard = new BasicFlashcard(answers.front, answers.back);
			basicFlashCard.save();
		});
	} else if (command === 'cloze'){
		inquirer.prompt([{
			name: 'text',
			message: 'Enter full text: '
		},{
			name: 'cloze',
			message: 'Enter cloze argument: '
		}]).then(function(answers){
			var search = answers.text.search(answers.cloze);
			var substring = answers.text.substring(0,search) + '________' + answers.text.substring(search + answers.cloze.length);
			var clozeFlashCard = new ClozeFlashcard(substring, answers.cloze);
			clozeFlashCard.save();
		});
	} else if(command === 'show'){
		showAllCards();
	} else {
		console.log('Please enter "basic" or "cloze" to create a flashcard');
	}
}

function BasicFlashcard(front, back){
	this.front = front;
	this.back = back;
	this.save = function(){
		fs.appendFile("cards.txt", "\n" + "{front: " + front + ", back: " + back + "}," + "\n", function(err){
			if(err) console.log(err);
		});
	};
}

function ClozeFlashcard(text, cloze){
	this.text = text;
	this.cloze = cloze;
	this.save = function() {
		fs.appendFile("cards.txt", "\n" + "{front: " + text +  ", back: " + cloze + "}," + "\n", function(err){
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