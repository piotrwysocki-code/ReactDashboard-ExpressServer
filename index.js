const express = require("express");
const cors = require("cors");
const axios = require("axios")

const PORT = process.env.PORT || 8080;

const app = express();
/*
var corsOptions = {
  origin: "http://localhost:8081"
};*/

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "react-dashboard." });
});

app.get("/categories", (req, res) => {
    axios.get("http://localhost:43462/api/category").then(response => {
        res.send(response.data);
    }).catch((err)=>{
        console.log(`${err}`);
    })
});

app.get("/departments", (req, res) => {
  axios.get("http://localhost:43462/api/departments").then(response => {
      res.send(response.data);
  }).catch((err)=>{
      console.log(`${err}`);
  })
});

app.get("/products", (req, res) => {
    axios.get("http://localhost:43462/api/product").then(response => {
        res.send(response.data);
    }).catch((err)=>{
        console.log(`${err}`);
    })
});

app.get("/sales", (req, res) => {
  axios.get("http://localhost:43462/api/sales").then(response => {
      res.send(response.data);
  }).catch((err)=>{
      console.log(`${err}`);
  })
});

app.get("/salesprods", (req, res) => {
  axios.get("http://localhost:43462/api/salesprod").then(response => {
      res.send(response.data);
  }).catch((err)=>{
      console.log(`${err}`);
  })
});


app.get("/employees", (req, res) => {
  axios.get("http://localhost:43462/api/employees").then(response => {
      res.send(response.data);
  }).catch((err)=>{
      console.log(`${err}`);
  })
});

app.delete("/delete_employee",  (req, res)  => {
  console.log(req.body);
  req.body.map((item, index)=>{
    console.log(item.employeeId);
    try{
      let temp = axios.delete(`http://localhost:43462/api/employees/${item.employeeId}`)
      .then((re)=>{
        console.log(re);
        res.send(temp);
      }).catch((error) => {
        console.log(error);
      });
    }catch(error){
      console.log(error);
      res.send(error);
    }
  })
});

app.delete("/delete_department", (req, res)  => {
  console.log(req.body);
  req.body.map((item, index)=>{
    console.log(item.deptId);
    try {
      let temp = axios.delete(`http://localhost:43462/api/departments/${item.deptId}`)
      .then((re)=>{
        console.log(re);
        res.send(temp);
      });
    }catch(error){
      console.log(error);
      res.send(error);
    }
  })
});

app.delete("/delete_category", (req, res)  => {
  console.log(req.body);
  req.body.map((item, index)=>{
    console.log(item.categoryId);
    try {
      let temp = axios.delete(`http://localhost:43462/api/category/${item.categoryId}`)
      .then((re)=>{
        console.log(re);
        res.send(temp);
      });
    }catch(error){
      console.log(error);
      res.send(error);
    }
  })
});

app.delete("/delete_sale", (req, res)  => {
  console.log(req.body);
  req.body.map((item, index)=>{
    console.log(item.saleId);
    try {
      let temp = axios.delete(`http://localhost:43462/api/sales/${item.saleId}`)
      .then((re)=>{
        console.log(re);
        res.send(temp);
      });
    }catch(error){
      console.log(error);
      res.send(error);
    }
  })
});

app.delete("/delete_product", (req, res)  => {
  console.log(req.body);
  req.body.map((item, index)=>{
    console.log(item.productId);
    try {
      let temp = axios.delete(`http://localhost:43462/api/product/${item.productId}`)
      .then((re)=>{
        console.log(re);
        res.send(temp);
      });
    }catch(error){
      console.log(error);
      res.send(error);
    }
  })
});

app.delete("/delete_salesprod", (req, res)  => {
  console.log(req.body);
  req.body.map((item, index)=>{
    let newSale = {};
    newSale.SaleId = item.saleId;
    newSale.ProductId = item.productId;
    newSale.Quantity = item.quantity;
    
    try {
      let temp = axios.delete(`http://localhost:43462/api/salesprod`
      , 
      {
        data: newSale
      })
      .then((re)=>{
        console.log('hello', re.data);
        res.send(temp);
      }).catch((error) => {
        console.log(error);
        res.send(error)
      });
    }catch(error){
      console.log(error);
      res.send(error);
    }
  })
});

app.put("/update_sale", (req, res)  => {
  console.log(req.body);
  let sale = req.body.new;
  let newSale = {};
  newSale.saleId = req.body.edit.saleId;
  newSale.saleDate = sale.saleDate;
  newSale.total = sale.total;
  newSale.employeeId = sale.employeeId;

  console.log(newSale);

  try {
    let temp = axios.put(`http://localhost:43462/api/sales`, newSale)
    .then((re)=>{
      console.log(re);
      res.send(temp);
    });
  }catch(error){
    console.log(error);
    res.send(error);
  }
});

app.put("/update_salesprod", (req, res)  => {

  let bodyEdit = req.body.edit;
  let bodyNew = req.body.new;

  console.log('old:', bodyEdit);
  console.log('new:', bodyNew);

  let tempEdit = {}
  let tempNew = {}

  tempEdit.saleId = bodyEdit.saleId;
  tempEdit.productId = bodyEdit.productId;
  tempEdit.quantity = bodyEdit.quantity;

  tempNew.saleId = bodyNew.saleId;
  tempNew.productId = bodyNew.productId;
  tempNew.quantity = bodyNew.quantity;

  try {
    let temp = axios.delete(`http://localhost:43462/api/salesprod`
    , 
    {
      data: tempEdit
    })
    .then((re)=>{
      console.log('hello', re);
    
      let resp = axios.put(`http://localhost:43462/api/salesprod`, tempNew)
      .then((re2)=>{
        console.log(re2);
        res.send(re2.data);
      }).catch(e=>{
        console.log(e);
        res.send(e);
      })
    }).catch(e =>{
      console.log(e);
      res.send(e);
    })
  }catch(error){ 
    console.log(error);
    res.send(error);
  }
});


app.put("/update_department", (req, res)  => {
  console.log(req.body);
  let dept = req.body.new;
  dept.deptId = req.body.edit.deptId;
  console.log(dept);

  try {
    let temp = axios.put(`http://localhost:43462/api/departments`, dept)
    .then((re)=>{
      console.log(re);
      res.send(temp);
    });
  }catch(error){
    console.log(error);
    res.send(error);
  }
});

app.put("/update_category", (req, res)  => {
  console.log(req.body);
  let cat = {}
  cat.categoryId = req.body.edit.categoryId;
  cat.categoryName = req.body.new.categoryName;
  cat.products = [];
  console.log(cat);

  try {
    let temp = axios.put(`http://localhost:43462/api/category`, cat)
    .then((re)=>{
      console.log(re);
      res.send(temp);
    }).catch((error)=>{
      console.log(error);
    });
  }catch(error){
    console.log(error);
    res.send(error);
  }
});

app.put("/update_product", (req, res)  => {
  console.log(req.body);
  let obj = {}
  obj.productId = req.body.edit.productId;
  obj.productName = req.body.new.productName;
  obj.price = req.body.new.price;
  obj.categoryId = req.body.new.categoryId;
  
  console.log(obj);

  try {
    let temp = axios.put(`http://localhost:43462/api/product`, obj)
    .then((re)=>{
      console.log(re);
      res.send(temp);
    });
  }catch(error){
    console.log(error);
    res.send(error);
  }
});

app.put("/update_employee", (req, res)  => {
  console.log(req.body);
  let editEmp = req.body.edit;
  let newEmp = req.body.new;
  let emp = {};
  emp.employeeId = newEmp.employeeId;
  emp.deptId = newEmp.deptId;
  emp.firstName = newEmp.firstName;
  emp.lastName = newEmp.lastName;
  emp.salary = newEmp.salary;
  emp.city = newEmp.city;
  emp.province = newEmp.province;

  console.log('new employee', emp);

  try {
    let temp = axios.put(`http://localhost:43462/api/employees/`, emp)
    .then((re)=>{
      console.log('response', re.data);
      res.send(temp);
    }).catch((error)=>{
      console.log(error);
    });
  }catch(error){
    console.log(error);
    res.send(error);
  }
});

app.post("/add_employee",  (req, res)  => {
  console.log(req.body);
  try{
    let temp = axios.post("http://localhost:43462/api/employees/", req.body)
    .then((response)=>{
      console.log(response);
      res.send(temp);
    })
    .catch((error)=>{
      console.log(error);
    });
  }catch(error){
    console.log(error);
    res.send(error);
  }
});

app.post("/add_department",  (req, res)  => {
  console.log(req.body.name);

    try{
      let temp = axios.post(`http://localhost:43462/api/departments/${req.body.name}`,
        req.body.name)
      .then((response)=>{
        console.log(temp);
        res.send(temp);
      })
      .catch((error)=>{
        console.log(error);
      });
    }catch(error){
      console.log(error);
      res.send(error);
    }
 })

 app.post("/add_category",  (req, res)  => {
  console.log(req.body.name);
    try{
      let temp = axios.post(`http://localhost:43462/api/category/${req.body.name}`,
        req.body.name)
      .then((response)=>{
        console.log(temp);
        res.send(temp);
      })
      .catch((error)=>{
        console.log(error);
      });
    }catch(error){
      console.log(error);
      res.send(error);
    }
 })

 app.post("/add_sale",  (req, res)  => {
  console.log(req.body);
  try{
    let temp = axios.post("http://localhost:43462/api/sales/", req.body)
    .then((response)=>{
      console.log(response);
      res.send(temp);
    })
    .catch((error)=>{
      console.log(error);
    });
  }catch(error){
    console.log(error);
    res.send(error);
  }
});

app.post("/add_product",  (req, res)  => {
  console.log(req.body);
  try{
    let temp = axios.post("http://localhost:43462/api/product/", req.body)
    .then((response)=>{
      console.log(response);
      res.send(temp);
    })
    .catch((error)=>{
      console.log(error);
    });
  }catch(error){
    console.log(error);
    res.send(error);
  }
});

app.post("/add_salesprod",  (req, res)  => {
  console.log(req.body);
  try{
    let temp = axios.post("http://localhost:43462/api/salesprod/", req.body)
    .then((response)=>{
      console.log(response);
      res.send(temp);
    })
    .catch((error)=>{
      console.log(error);
    });
  }catch(error){
    console.log(error);
    res.send(error);
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});