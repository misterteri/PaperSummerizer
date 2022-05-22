# Paper Summerizer

Recommended setup:
1. Create a conda environment
   ```
   conda create -n flask python=3.8
   conda activate flask
   conda install -c anaconda flask
   conda install pythondotenv
   ```
2. Install `node-modules` in `/app/` folder
   ```
   cd app
   npm install
   ```

How to run this project:
1. Run the api
   ```
   cd api
   flask run
   ```
2. Run the web app
   ```
   cd app
   npm run dev
   ```