const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

const serviceRegistryUrl = "http://localhost:3000"; // Assuming your services are running at port 3000

app.get("/:service/:id", (req, res) => {
  const { service, id } = req.params;
  http.get(`${serviceRegistryUrl}/${service}/${id}`, resp => {
    let data = '';
    resp.on('data', chunk => {
        data += chunk;
    });
    resp.on('end', () => {
        res.send(JSON.parse(data));
    });
  }).on("error", err => {
    console.log("Error: " + err.message);
    res.status(500).send({error: "Error is communicating with the service"});
  })
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
