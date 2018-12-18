package main

import (
	"encoding/json"
	"fmt"
	"testing"
)

func TestQuestion(t *testing.T) {
	q := Question{
		Word:     "word",
		Sentence: "sentence",
	}
	b, err := json.Marshal(q)

	if err != nil {
		fmt.Println("Failed. json.Marshal:", err)
	}

	e := `{"Word":"word","Sentence":"sentence"}`
	if string(b) != e {
		t.Errorf("Failed. expect:%s, actual:%s", e, b)
	}
}
