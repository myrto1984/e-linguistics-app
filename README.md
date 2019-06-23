# e-linguistics-app

## Back End
### requirements:
  - Python 3.6 (with pip3 installed)
  - [Pipenv virtual environment tool](https://pipenv.readthedocs.io/en/latest/)
  - [MongoDB](https://www.mongodb.com/) (make sure a db is created for the project with the same name as the one given in the config file)

### project installation:
  - cd to the `e-linguistics_back` folder
  - (RUN `pipenv --three` to initialize a Python3 virtual environment - if it has not been created already - to use specific version eg `pipenv --python /usr/bin/python3`)
  - RUN `pipenv shell` (to activate the virtual environment)
  - RUN `pipenv install` (to install all requirements as mentioned in the PipFile)
  [- RUN `pip freeze > requirements.txt` (to create a requirements file - optional)]
  - RUN `chmod u+x install_data.sh` (to make install_data.sh executable)
  - RUN `./install_data.sh` (to install wordnet data and the needed cltk corpora)

### run project [in development]
  - RUN `pipenv shell` (to enter the virtual environment)
  - RUN `chmod u+x bootstrap.sh` (to make bootstrap.sh executable)
  - RUN `./bootstrap.sh` (to run the project - default endpoint: 0.0.0.0:5000)


## Front End
Check front end folder
