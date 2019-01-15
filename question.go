package main

import ()

type Question struct {
	Word     string
	Sentence string
}

var Questions [2]Question = [2]Question{
	Question{
		Word:     "This",
		Sentence: "This is a pen.",
	},
	Question{
		Word:     "That",
		Sentence: "That is a pen.",
	},
}
