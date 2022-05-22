from flask import Flask
from datetime import date
import urllib, urllib.request

app = Flask(__name__)

@app.route("/machinelearning", methods=["GET"], strict_slashes=False)
def time():
    topic = "machinelearning"
    url = f"http://export.arxiv.org/api/query?search_query=all:{topic}&start=0&max_results=10"
    data = urllib.request.urlopen(url)
    # store the data in json format
    json_data = data.read()
    # convert the data to a string
    string_data = json_data.decode("utf-8")
    return string_data

if __name__ == "__main__":
    app.run(debug=True)