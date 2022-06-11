setup:
	@conda create --name nlp python=3.8 -y
	@conda activate nlp
	@conda install -c conda-forge spacy -y
	@python -m spacy download en_core_web_sm
	@pip install --user scikit-learn==0.23.2 -y
	@conda install -c anaconda beautifulsoup4 -y

get:
	@git clone https://github.com/titipata/scipdf_parser
	@mv scipdf_parser grobid