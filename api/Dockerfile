FROM tiangolo/uwsgi-nginx-flask:python3.8-alpine

COPY requirements.txt .

RUN pip install -r ./requirements.txt --no-cache-dir

WORKDIR /app

COPY app.py .

CMD flask run