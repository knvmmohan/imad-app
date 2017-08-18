var express = require('express'); // for server libraies. listening on port etc...
var morgan = require('morgan'); //  For log output
var path = require('path'); // Libraries 

var app = express();
app.use(morgan('combined'));

var articles = {
  articleOne: {
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
  articleTwo: {
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
  articleThree: {
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


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one', function(req, res) {
    res.send(createTemplate(articleOne));
});

app.get('/article-two', function(req, res) {
    res.send(createTemplate(articleTwo));
});

app.get('/article-three', function(req, res) {
    res.send(createTemplate(articleThree));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
