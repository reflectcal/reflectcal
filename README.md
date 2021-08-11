Reflectcal
==========

Reflect calendar is web calendar, aimed to be fast, minimalistic and functional. 

Demo [https://www.reflectcal.com/](https://www.reflectcal.com/).

Installation and run
--------------------

1. Clone this repository locally.

  ```
  mkdir reflectcal
  cd reflectcal
  git clone https://github.com/alexeykomov/reflectcal.git
  ```

2. Runtimes - Install [Java][jdk], [Python][python] and [Node.js][node.js]. Node.js must be at least of version v0.12.2.

3. Install [MongoDB][mongodb]. Create storage folder for it, may as well start
an instance.

  ```
  mkdir mongostorage
  mongod --dbpath mongostorage
  ```

4. Globally install following node modules - [Express][express], [Grunt][grunt], 
        [Less][less], [Bunyan][bunyan].

  ```
  npm install express -g
  npm install less -g
  npm install grunt-cli -g
  npm install bunyan -g
  ```

5. Locally to project, install all needed node modules.

  ```
  cd reflectcal
  npm install
  ```

6. Go to [Google developers console][devconsole] and:

  a. Create project for this particular app instance. Name it like something that reflects both app and particular machine from where app is launched, like "Reflect calendar on Alex's iMac".
  
  b. Under API and auth/Credentials menu, create new Client ID with Web application bullet point.
  
  c. In field "Authorized JavaScript origins" put [http://localhost:3000/](http://localhost:3000/).
  
  d. In field "Authorized redirect URIs" put [http://localhost:3000/auth/google/callback](http://localhost:3000/auth/google/callback ). Note that you may insert your own part instead of http://localhost:3000.
  
  e. Dowload JSON file and put it in your application root, near app.js.

6. Compile from sources.

  ```
  grunt compile-all
  ```

7. Launch an application.

  ```
  node --harmony app
  ```

8. Go to [http://localhost:3000/](http://localhost:3000/)

[jdk]: http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
[python]: https://www.python.org/download/releases/2.7/
[node.js]: http://nodejs.org/download/
[mongodb]: http://www.mongodb.org/downloads
[express]: https://github.com/visionmedia/express
[grunt]: https://github.com/gruntjs/grunt
[less]: https://github.com/less/less
[bunyan]: https://github.com/trentm/node-bunyan
[devconsole]: https://console.developers.google.com/project?authuser=1 
