# Paper Summerizer

## 1. Setup

In order to run this project, you need to setup the environment needed:
```
make setup
``

`make setup` will
1. create a conda environment called `nlp` with python 3.8
2. Install `spacy` and `en_core_web_sm`
3. Install `scikit-learn` version 0.23.2 (other versions will not work)
4. Install `beautifulsoup4`

Then, you need to clone a required dependency called `scipdf_parser` by running:
```
make pull
````

## 2. Run the project

To run the API, you need to run the following command:
```
./reflex -r '\.go' -s -- sh -c "go run main.go"
```

`reflex` will watch all the changes in your code. Once a change is noticed, it will reload the API.

So far, only `/api/v1/post` endpoint works. You can test it by running:
```
cd ../papers
curl -X POST --form file="@2101.12491.pdf" http://localhost:8080/api/v1/post
```

## 3. Design

...

Have fun. Happy coding!