package main

import (
	"fmt"
	"html/template"
	"net/http"

	"log"

	"github.com/julienschmidt/httprouter"
)

func main() {
	router := httprouter.New()
	router.GET("/", Index)
	router.POST("/ajax/user/login", AjaxLogin)
	router.ServeFiles("/static/*filepath", http.Dir("static"))
	http.ListenAndServe(":7780", router)
}

func AjaxLogin(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	email := r.PostFormValue("email")
	password := r.PostFormValue("password")
	log.Println(fmt.Sprintf("Receive ajax login: %s & %s", email, password))
	w.Write([]byte("<p>" + email + "</p>"))
}

func Index(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	t, err := template.ParseFiles("templates/index.html")
	if err != nil {
		return
	}

	t.Execute(w, nil)
}
