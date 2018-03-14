var data = require('./authn.data.json');

module.exports = {
    '/userInfo' : {
        get    : (req, res) => {
            let me = data.users.find(user => user.authenticated);
            if (me) {
                res.send(JSON.stringify(me));
            } else {
                res.status(401).send('Not Authenticated');
            }
        },
        post  : (req, res) => {
          let errMsg,
              user = data.users.find(person => {
                console.log(person.username + " " + req.body.username);
                if (person.username === req.body.username) errMsg = "User Already Exists";
                if (person.email === req.body.email) errMsg = "User Already Exists";
                return !!errMsg;
              });

          if (user) {
            res.status(409).send(JSON.stringify({
              "timestamp": 1504104359521,
              "status": 409,
              "error": "User Conflict",
              "message": errMsg,
              "path": "/userInfo"
            }));
          } else {
            user = Object.assign({}, req.body);
            data.users.push(user);
            res.send(JSON.stringify(user));
          }
        }
    },
    '/authenticate': {
        post    : (req, res) => {
            console.log('auth');
            let user = data.users.find(person => {
                console.log(person.username + " " + req.body.username);
                return person.username === req.body.username
            });
            console.log(user);
            if(user) {
                user.authenticated = true;
                res.send(JSON.stringify(user));
            } else {
                res.status(401).send(JSON.stringify({
                    "timestamp": 1504104359521,
                    "status": 401,
                    "error": "Unauthorized",
                    "message": "User/password entered are incorrect.",
                    "path": "/authenticate"
                }));
            }
        }
    },
    '/logout': {
        get    : (req, res) => {
            let me = data.users.find(user => user.authenticated);
            if(me){ me.authenticated = false;}
            res.status(302);
            res.setHeader("Location","/login");
            res.end();
        }
    }
};
