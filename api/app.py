from flask import Flask
import urllib, urllib.request
import os

app = Flask(__name__)

@app.route("/machinelearning", methods=["GET"], strict_slashes=False)
def machinelearning():
    topic = "machinelearning"
    url = f"http://export.arxiv.org/api/query?search_query=all:{topic}&start=0&max_results=20"
    data = urllib.request.urlopen(url)
    # store the data in json format
    json_data = data.read()
    # convert the data to a string
    string_data = json_data.decode("utf-8")
    return string_data

@app.route("/deeplearning", methods=["GET"], strict_slashes=False)
def deeplearning():
    topic = "deeplearning"
    url = f"http://export.arxiv.org/api/query?search_query=all:{topic}&start=0&max_results=20"
    data = urllib.request.urlopen(url)
    # store the data in json format
    json_data = data.read()
    # convert the data to a string
    string_data = json_data.decode("utf-8")
    return string_data

@app.route("/reinforcementlearning", methods=["GET"], strict_slashes=False)
def reinforcementlearning():
    topic = "reinforcementlearning"
    url = f"http://export.arxiv.org/api/query?search_query=all:{topic}&start=0&max_results=20"
    data = urllib.request.urlopen(url)
    # store the data in json format
    json_data = data.read()
    # convert the data to a string
    string_data = json_data.decode("utf-8")
    return string_data

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)