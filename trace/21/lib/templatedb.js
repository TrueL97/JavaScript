module.exports = {
    HTML: function (title, list, body, control) {
        console.log(title, body);
        return `
        <!doctype html>
        <html>
        <head>
            <title>WEB2 - ${title}</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            ${control}
            <p>${body}</p>

        </body>
        </html>
        `;
    },
    List: function (topics) {
        var list = "<ul>";
        var i = 0;
        while (i < topics.length) {
            list = list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
            i = i + 1;
        }
        list = list + "</ul>";
        return list;
    },
};

// module.exports = template;
