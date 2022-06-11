# Paper Summerizer

This project contains 3 collections of papers that fetch from the [arxiv](https://arxiv.org) API, namely Machine Learning, Deep Learning, and Reinforcement Learning.

The website is made with Next.js, and the API is with Flask.

1. To build the images for the api and the website, run
   ```
   make build
   ```
2. To run the api and the website, run
   ```
   make run
   ```
3. To terminate the api and the website, run
   ```
   make down
   ```

# Future Updates

1. The API will be updated to fetch more papers from the arxiv API.
   * Allow paginations.
2. The API will be rewritten in Golang due to the performance issue.
3. The maintainer is able to a thesis paper to the API will be parsed with Grobid.
4. Once the paper is parsed, each section of the paper will be sent to OpenAI to be simplified.
5. The simplification result will be stored in the database.
6. Users can requests for the simplified paper through `/api/v1/get` endpoint.