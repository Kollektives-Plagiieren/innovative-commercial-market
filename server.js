const express = require('./config/express');

const app = express();

app.listen(5000, () => {
    console.log("Server has started on port 5000")
});

// export default app;
