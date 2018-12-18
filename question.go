package main

import ()

type Question struct {
	Word     string
	Sentence string
}

var Questions [1]Question = [1]Question{
	Question{
		Word:     "This",
		Sentence: "This is a pen.",
	},
}
