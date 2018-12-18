package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
)

func questionId(s string) (n int) {
	ary := strings.SplitN(s, "/", 3)
	if ary[1] != "question" {
		fmt.Println(`URL.Path doesn't start with "question".`)
	}

	i, err := strconv.Atoi(ary[2])
	if err != nil {
		i = 1
		fmt.Println("Failed. strconv.Atoi:", err)
	}

	return i
}

func QuestionHandler(w http.ResponseWriter, r *http.Request) {
	id := questionId(r.URL.Path)

	if id < 1 {
		id = 1
	}

	if len(Questions) < id {
		id = len(Questions)
	}

	b, err := json.Marshal(Questions[id-1])
	if err != nil {
		fmt.Println("Failed. json.Marshal:", err)
	}

	fmt.Fprintf(w, string(b))
}

func ListHandler(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	if len(r.Form) == 0 {
		return
	}

	pos, err := strconv.Atoi(r.Form.Get("pos"))
	if err != nil {
		pos = 1
		fmt.Println("Failed. strconv.Atoi:", err)
	}

	cnt, err := strconv.Atoi(r.Form.Get("cnt"))
	if err != nil {
		cnt = 5
		fmt.Println("Failed. strconv.Atoi:", err)
	}

	begin := 1 + (pos-1)*cnt
	if begin < 1 {
		begin = 1
	}

	end := cnt + (pos-1)*cnt
	if len(Questions) < end {
		end = len(Questions)
	}

	num := (len(Questions) + cnt - 1) / cnt

	b, err := json.Marshal(List{begin, end, num})
	if err != nil {
		fmt.Println("Failed. json.Marshal:", err)
	}

	fmt.Fprintf(w, string(b))
}

func main() {
	http.Handle("/", http.FileServer(http.Dir("browser/dist")))
	http.HandleFunc("/question/", QuestionHandler)
	http.HandleFunc("/list", ListHandler)

	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = "9090"
	}

	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
