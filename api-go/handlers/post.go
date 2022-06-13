package handlers

import (
	"bufio"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"
)

type Post struct {
	Logger *log.Logger
}

type Paper struct {
	// json and bson
	Authors  string `json:"authors" bson:"authors"`
	PubDate  string `json:"pub_date" bson:"pub_date"`
	Title    string `json:"title" bson:"title"`
	Abstract string `json:"abstract" bson:"abstract"`
	Sections []struct {
		Heading         string `json:"heading" bson:"heading"`
		Text            string `json:"text" bson:"text"`
		NPublicationRef int    `json:"n_publication_ref" bson:"n_publication_ref"`
		NFigureRef      int    `json:"n_figure_ref" bson:"n_figure_ref"`
	} `json:"sections" bson:"sections"`
	References []struct {
		Title   string `json:"title" bson:"title"`
		Journal string `json:"journal" bson:"journal"`
		Year    string `json:"year" bson:"year"`
		Authors string `json:"authors" bson:"authors"`
	} `json:"references" bson:"references"`
	Figures []struct {
		FigureLabel   string `json:"figure_label" bson:"figure_label"`
		FigureType    string `json:"figure_type" bson:"figure_type"`
		FigureID      string `json:"figure_id" bson:"figure_id"`
		FigureCaption string `json:"figure_caption" bson:"figure_caption"`
		FigureData    string `json:"figure_data" bson:"figure_data"`
	} `json:"figures" bson:"figures"`
	Doi string `json:"doi" bson:"doi"`
}

func NewPostHandler(logger *log.Logger) *Post {
	return &Post{logger}
}

func copyOutput(r io.Reader) string {
	scanner := bufio.NewScanner(r)
	// scan and get the text
	for scanner.Scan() {
		return scanner.Text()
	}
	return ""
}

func (post *Post) parsePDFToJSON(fileName string) Paper {
	parse := exec.Command("python", "parser.py", fileName)
	defer parse.Wait()

	stdout, err := parse.StdoutPipe()
	if err != nil {
		post.Logger.Fatalf("Could not get stdout pipe: %v", err)
	}

	if err := parse.Start(); err != nil {
		post.Logger.Fatalf("Could not run the python script: %v", err)
	}

	output := copyOutput(stdout)
	if output == "" {
		post.Logger.Fatalf("Could not get the output")
	}

	// decode the output string to paper
	paper := Paper{}
	if err := json.Unmarshal([]byte(output), &paper); err != nil {
		post.Logger.Fatalf("Could not decode the output: %v", err)
	}

	return paper
}

func (post *Post) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	post.Logger.Println("Received POST request")
	w.WriteHeader(http.StatusOK)

	// Get the pdf file sent by the client from curl
	file, header, err := r.FormFile("file")
	if err != nil {
		post.Logger.Println("Could not get the file")
		return
	}
	defer file.Close()

	// Get the file name
	fileName := header.Filename

	// Create a new file and save it to a folder called "pdf"
	newFile, err := os.Create("pdf/" + fileName)
	if err != nil {
		post.Logger.Println("Could not create the file")
		return
	}
	defer newFile.Close()

	// Copy the file to the new file
	_, err = io.Copy(newFile, file)
	if err != nil {
		post.Logger.Println("Could not copy the file")
		return
	}

	cmd := exec.Command("bash", "./grobid/serve_grobid.sh")
	if err := cmd.Start(); err != nil {
		post.Logger.Fatalf("Could not start grobid: %v", err)
	}

	post.Logger.Println("GROBID service is ready")

	paper := post.parsePDFToJSON(fileName)

	post.Logger.Println(paper.Authors)

	if err := cmd.Process.Kill(); err != nil {
		post.Logger.Fatalf("failed to kill grobid: %v", err)
	}
	post.Logger.Println("GROBID service stopped")

	// send back the authors to the client
	w.Write([]byte(paper.Authors))
}
