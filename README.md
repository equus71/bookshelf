# Bookshelf

Bookshelf is an app done for a coding challenge. This is a simple SPA. The aim of the app is to present a browsable and searchable books' index and present the single book's details.
The app is the done in the javascript with the AngularJS. It is wrapped by a simple django application serving as a data backend. Still, the main focus is the browser client.

## Demo

You can check out the live demo:
[https://salty-cliffs-2401.herokuapp.com/](https://salty-cliffs-2401.herokuapp.com/)

## Deployment

#### Development
To deploy server in development mode you need to install python's dependencies with (the best in [virtualenv](https://virtualenv.readthedocs.org/en/latest/userguide.html#usage)):
```
pip install -r requirements.txt
```

You need to at least configure following variables in the environment:
 * `DEBUG=True`
 
You need to install javascript dependencies:

```
npm install
```

You can build the application with:

```
grunt development
```
 
Run local server with:

```
python manage.py runserver
```
You should find the app at the `http://localhost:8000`

#### Production
To deploy server in production mode you need to install python's dependencies with (the best in [virtualenv](https://virtualenv.readthedocs.org/en/latest/userguide.html#usage)):

```
pip install -r requirements.txt
```

You need to at least configure following variables in the environment:
 * `PRODUCTION=True`
 
You need to install javascript dependencies:

```
npm install
```

You can build the application with:

```
grunt release
```

(After building the app you can prune the devDependencies)

Before launching server you need to gather static assets with:

```
python manage.py collectstatic
```

Run production server with:

```
gunicorn bookshelf.wsgi -
```

You should find the app at the `http://localhost:8000`

## Tests

To run the test you need to install dependencies with:

```
npm install
```

Tests are configured to run in Chrome (but you can change it `karma.conf.js` to other browser, e.g. Firefox or PhantomJS)

You can run the tests with:

```
npm test
```


## License
GNU AFFERO GENERAL PUBLIC LICENSE 3.0