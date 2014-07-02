Reflectcal
==========

Reflect calendar is web calendar, aimed to be fast, minimalistic and functional.

Installation and run
--------------------

1. Clone this repository locally.

2. Runtimes - Install [Java][jdk], [Python][python] and [Node.js][node.js].

3. Install [MongoDB][mongodb]. Create storage folder for it, may as well start
an instance.

```
mkdir mongostorage
mongod --dbpath mongostorage
```

3. Globally install following node modules - Express, Grunt, Less.

```
npm install express -g
npm install less -g
npm install grunt-cli -g
```

4. Locally to project, install all needed node modules.

```
cd reflectcal
npm install
```

5. Compile css from less.

```
grunt compile-less
```

6. Launch an application.

```
node app
```

And go to [http://localhost:3000/view-source/](http://localhost:3000/view-source/)

[jdk]: http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
[python]: https://www.python.org/download/releases/2.7/
[node.js]: http://nodejs.org/download/
[mongodb]: http://www.mongodb.org/downloads
[express]: https://github.com/visionmedia/express
[grunt]: https://github.com/gruntjs/grunt
[less]: https://github.com/less/less.js/