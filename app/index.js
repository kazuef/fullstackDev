const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.listen(80, console.log("サーバーが開始されました"));

app.get("/", (req, res) => {
    res.send({ title: "プログラミングチュートリアルへようこそ" });
});

// お客様情報をサーバーに置いておく
const customers = [
    { title: "田中", id: 1 },
    { title: "斎藤", id: 2 },
    { title: "橋本", id: 3 },
    { title: "鈴木", id: 4 },
    { title: "安藤", id: 5 },
    { title: "山田", id: 6 }
];

// データベースと接続
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// データを取得できるようにしよう(GETメソッド)
app.get("/api/customers", (req, res) => {
    res.send(customers);
});

app.get("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    res.send(customer);
});

// データを送信（作成）してみよう(POSTメソッド)
app.post("/api/customers", (req, res) => {
    const customer = {
        title: req.body.title,
        id: customers.length + 1,
    };
    customers.push(customer);
    res.send(customers);
});

// データを更新してみよう(PUTメソッド)
app.put("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    customer.title = req.body.title;
    res.send(customer);
});

// データを削除してみよう(DELETEメソッド)
app.delete("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    const index = customers.indexOf(customer);
    customers.splice(index, 1);
    res.send(customer);
});