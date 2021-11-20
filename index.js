const express = require('express');

const cors = require('cors');

const app = express();

app.use(cors())
app.use((req, res, next) => {
	res.setHeader('Cross-Origin-Resource-Policy','cross-origin')
	next();
})

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.use("/app", express.static(__dirname + "/apps"))

// susdebug
app.use('/app/susdebug_400', (req, res) => res.sendStatus(400));
app.use('/app/susdebug_403', (req, res) => res.sendStatus(403));
app.use('/app/susdebug_404', (req, res) => res.sendStatus(404));
app.use('/app/susdebug_500', (req, res) => res.sendStatus(500));

app.listen(3000, () => {
  console.log('server started');
});