var express = require('express'); // for server libraies. listening on port etc...
var morgan = require('morgan'); //  For log output
var path = require('path'); // Libraries 
var crypto = require('crypto');
var bodyParser = require('body-parser');

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

var articles = {
  'article-one': {
      title: 'Article One | Mohan',
      heading: 'Article One',
      date: '19 Sep 2017',
      content: `    <p>
                        This s the content for my first article. This s the content for my first article. This s the content for my first article. This s the content for my first article. This s the content for my first article. 
                    </p>
                    <p>
                        This s the content for my first article. This s the content for my first article. This s the content for my first article. This s the content for my first article. This s the content for my first article. 
                    </p>
                    <p>
                        This s the content for my first article. This s the content for my first article. This s the content for my first article. This s the content for my first article. This s the content for my first article. 
                    </p>`
  },
  'article-two': {
      title: 'Article Two | Mohan',
      heading: 'Article Two',
      date: '19 Sep 2017',
      content: `    <p>
                        This s the content for my Second article. 
                    </p>
                    <p>
                        This s the content for my Second article.
                    </p>
                    <p>
                        This s the content for my Second article.
                    </p>`
  },
  'article-three': {
      title: 'Article Three | Mohan',
      heading: 'Article Three',
      date: '19 Sep 2017',
      content: `    <p>
                        This s the content for my Third article. 
                    </p>
                    <p>
                        This s the content for my Third article.
                    </p>
                    <p>
                        This s the content for my Third article.
                    </p>`

  }  
};
function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content= data.content;

    var htmlTemplate = `
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
             <div class="container">   
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}

var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});





app.get('/:articleName', function(req, res) {
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

function hash (input, salt) {
    // how do we create a hash
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", "sha512", salt, hashed.toString('hex')].join('$');
}


app.get('/hash/:input', function (req, res) {
  var hashedString = hash(req.params.input, 'this-is-some-random-string-by-mohan');
  res.send(hashedString);
});


app.post('/create-user', function (req, res){
    var username=req.body.username;
    var password=req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.quiery('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
       if (err) {
           res.status(500).send(err.toString());
       } else {
           res.send('User successfully created:  ' + username);
       }
   });
   
});

var pool = new Pool(config);


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
