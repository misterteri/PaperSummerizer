# Paper Summerizer

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