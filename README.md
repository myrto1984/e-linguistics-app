# e-linguistics-app

## Back End
### requirements:
  - Python 3.6 (with pip3 installed)
  - [Pipenv virtual environment tool](https://pipenv.readthedocs.io/en/latest/)

### project installation:
  - cd to the `e-linguistics_back` folder
  - (RUN `pipenv --three` to initialize a Python3 virtual environment - if it has not been created already - to use specific version eg `pipenv --python /usr/bin/python3`)
  - RUN `pipenv shell` (to activate the virtual environment)
  - RUN `pipenv install` (to install all requirements as mentioned in the PipFile)
  - RUN `pip freeze > requirements.txt` (to create a requirements file that may be needed for deployment)

### run project [in development]
  - RUN `chmod u+x bootstrap.sh` (to make bootstrap.sh executable)
  - RUN `./bootstrap.sh` (to run the project - default endpoint: 0.0.0.0:5000)


## Front End
Check front end folder
