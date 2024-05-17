import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";

const router = express.Router();

// router.post("/adminlogin", (req, res) => {
//   const sql = "SELECT * from admin Where email = ? and password = ?";
//   con.query(sql, [req.body.email, req.body.password], (err, result) => {
//     if (err) return res.json({ loginStatus: false, Error: "Query error" });
//     if (result.length > 0) {
//       const email = result[0].email;
//       const token = jwt.sign(
//         { role: "admin", email: email, id: result[0].id },
//         "jwt_secret_key",
//         { expiresIn: "1d" }
//       );
//       res.cookie('token', token)
//       return res.json({ loginStatus: true });
//     } else {
//         return res.json({ loginStatus: false, Error:"wrong email or password" });
//     }
//   });
// });

router.post("/adminlogin", (req, res) => {
    const sql = "SELECT * from admin Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        const hashedPassword = result[0].password;
        bcrypt.compare(req.body.password, hashedPassword, (compareErr, isMatch) => {
          if (compareErr) return res.json({ loginStatus: false, Error: "Error comparing passwords" });
          if (isMatch) {
            const email = result[0].email;
            const token = jwt.sign(
              { role: "admin", email: email, id: result[0].id },
              "jwt_secret_key",
              { expiresIn: "1d" }
            );
            res.cookie('token', token)
            return res.json({ loginStatus: true });
          } else {
            return res.json({ loginStatus: false, Error: "wrong email or password" });
          }
        });
      } else {
        return res.json({ loginStatus: false, Error:"wrong email or password" });
      }
    });
  });

// image upload 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
// end imag eupload 

router.post("/adminsignup", upload.single('image'), (req, res) => {
    const { name, email, password } = req.body;
    const image = req.file.filename; 
    const sqlCheckEmail = "SELECT * FROM admin WHERE email = ?";
    con.query(sqlCheckEmail, [email], (err, result) => {
      if (err) return res.json({ signupStatus: false, error: "Query error" });
      if (result.length > 0) {
        return res.json({ signupStatus: false, error: "Email already exists" });
      } else {
        bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
          if (hashErr) return res.json({ signupStatus: false, error: "Error hashing password" });
          const sqlInsertAdmin = "INSERT INTO admin (name, email, password, image) VALUES (?, ?, ?, ?)";
          con.query(sqlInsertAdmin, [name, email, hashedPassword, image], (insertErr, insertResult) => {
            if (insertErr) return res.json({ signupStatus: false, error: "Error creating admin account" });
            return res.json({ signupStatus: true });
          });
        });
      }
    });
  });

router.get("/current_admin_id", (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const adminId = decoded.id;
      return res.json({ id: adminId });
    });
  });

  router.get('/admin/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM admin WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/admin/edit/:id',upload.single('image'), (req, res) => {
    const id = req.params.id;
    const { name } = req.body; 
    let image = req.file ? req.file.filename : '';
    const sql = `UPDATE admin 
        SET name = ?, image = ? 
        WHERE id = ?`;
    con.query(sql, [name, image, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error" + err});
        return res.json({Status: true, Result: result});
    });
});

router.put('/admin/edit/password/:id', (req, res) => {
    const id = req.params.id;
    const { oldPassword, newPassword1, newPassword2 } = req.body; 

    if (newPassword1 !== newPassword2) {
        return res.json({ Status: false, Error: "New passwords do not match" });
    }

    const sql = "SELECT password FROM admin WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });

        const hashedPassword = result[0].password;
        bcrypt.compare(oldPassword, hashedPassword, (error, isMatch) => {
            if (error) return res.json({ Status: false, Error: "Error comparing passwords" });

            if (!isMatch) {
                return res.json({ Status: false, Error: "Incorrect old password" });
            }

            bcrypt.hash(newPassword1, 10, (hashError, hashedNewPassword) => {
                if (hashError) return res.json({ Status: false, Error: "Error hashing new password" });

                const updateQuery = "UPDATE admin SET password = ? WHERE id = ?";
                con.query(updateQuery, [hashedNewPassword, id], (updateError, updateResult) => {
                    if (updateError) return res.json({ Status: false, Error: "Error updating password" });

                    return res.json({ Status: true, Message: "Password updated successfully" });
                });
            });
        });
    });
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})
router.get('/category/search',  (req, res) => {
    const { name } = req.query;
    let sql = "SELECT * FROM category WHERE 1";
    if (name) { sql += ` AND name LIKE '%${name}%'`;}
    con.query(sql, (err, result) => {
        if(err) return res.json({Message: "Query Error"})
        return res.json({result})
    })
})

router.get('/category/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM category WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_category/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE category 
        set name = ?
        Where id = ?`
    const values = [
        req.body.name,
        id
    ]
    con.query(sql,values, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_category/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from category where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

///////////employees

router.post('/add_employee',upload.single('image'), (req, res) => {
    const sql = `INSERT INTO employee 
    (name,email,password, address, salary,image, category_id, classes) 
    VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary, 
            req.file.filename,
            req.body.category_id,
            req.body.classes
            // req.body.IDclass
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
    })
})

router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})
// Add a new API endpoint to fetch employee count by category
router.get('/employee_count_by_category', (req, res) => {
    const sql = "SELECT category.name, COUNT(employee.id) AS employee_count FROM category LEFT JOIN employee ON category.id = employee.category_id GROUP BY category.id";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"});
        return res.json({Status: true, Result: result});
    });
});

////// search employee
router.get('/employee/search',  (req, res) => {
    const { name, salary } = req.query;
    let sql = "SELECT * FROM employee WHERE 1";
    if (name) { sql += ` AND name LIKE '%${name}%'`;}
    if (salary) { sql += ` AND salary = ${salary}`;}
    

    con.query(sql, (err, result) => {
        if(err) return res.json({Message: "Query Error"})
        return res.json({result})
    })
})

router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_employee/:id', upload.single('image'), (req, res) => {
    const id = req.params.id;
    const { name, email, salary, address, category_id, classes } = req.body;
    let image = req.file ? req.file.filename : null; // Check if a file was uploaded

    let sql = `UPDATE employee 
               SET name = ?, email = ?, salary = ?, address = ?, category_id = ?, classes = ?`;
    const values = [name, email, salary, address, category_id, classes];
    if (image) {
        sql += ', image = ?';
        values.push(image);
    }
    sql += ' WHERE id = ?';
    values.push(id);
    con.query(sql, values, (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: "Query Error" + err });
        }
        return res.json({ Status: true, Result: result });
    });
});


router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from employee where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee_count', (req, res) => {
    const sql = "select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/class_count', (req, res) => {
    const sql = "select count(id) as class from classes";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/salary_count', (req, res) => {
    const sql = "select sum(salary) as salaryOFEmp from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_records', (req, res) => {
    const sql = "select * from admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})
///////////classes
router.get('/classes', (req, res) => {
    const sql = `
        SELECT c.*, COUNT(s.id) AS student_count 
        FROM classes c 
        LEFT JOIN students s ON c.id = s.class_id 
        GROUP BY c.id;
    `;
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
});

router.post('/add_class', (req, res) => {
    const { name, level } = req.body;
    const sql = "INSERT INTO classes (name, level) VALUES (?, ?)";
    con.query(sql, [name, level], (err, result) => {
        if (err) {
            console.error('Error adding class:', err);
            return res.status(500).json({ Status: false, Error: "Internal Server Error" });
        }
        return res.json({ Status: true });
    });
});

router.get('/class/search',  (req, res) => {
    const { name } = req.query;
    const { level } = req.query;
    let sql = "SELECT * FROM classes WHERE 1";
    if (name) { sql += ` AND name LIKE '%${name}%'`;}
    if (level) { sql += ` AND level LIKE '%${level}%'`;}
    con.query(sql, (err, result) => {
        if(err) return res.json({Message: "Query Error"})
        return res.json({result})
    })
})
router.get('/class/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM classes WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})
router.put('/edit_class/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE classes 
        set name = ? , level = ?
        Where id = ?`
    const values = [
        req.body.name,
        req.body.level,
        id
    ]
    con.query(sql,values, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})
router.get('/list_class/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM students WHERE class_id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"});
        return res.json({Status: true, Result: result});
    });
});

router.get('/list_teachers/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE classes LIKE ?";
    con.query(sql, [`%${id}%`], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"});
        return res.json({Status: true, Result: result});
    });
});

router.delete('/delete_class/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from employee where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

// router.get('/list_teacher/:name', (req, res) => {
//     const name = req.params.name;
//     const sql = "SELECT * FROM employee WHERE name = ?";
//     con.query(sql, [name], (err, result) => {
//         if(err) return res.json({ Status: false, Error: "Query Error" });
//         return res.json({ Status: true, Result: result });
//     });
// });


///////////students
router.get('/students', (req, res) => {
    const sql = "SELECT * FROM students";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_student',upload.single('image'), (req, res) => {
    const sql = `INSERT INTO students 
    (name,date_of_birth, address,image, class_id,Genre) 
    VALUES (?)`;

        const values = [
            req.body.name,
            req.body.date_of_birth,
            req.body.address,
            req.file.filename,
            req.body.class_id,
            req.body.Genre
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
})

router.get('/students/search',  (req, res) => {
    const { name, class_id } = req.query;
    let sql = "SELECT * FROM students WHERE 1";
    if (name) { sql += ` AND name LIKE '%${name}%'`;}
    if (class_id) { sql += ` AND class_id = ${class_id}`;}
    con.query(sql, (err, result) => {
        if(err) return res.json({Message: "Query Error"})
        return res.json({result})
    })
})

router.get('/students/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM students WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_students/:id',upload.single('image'), (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE students 
        set name = ?, date_of_birth = ?, address = ?, class_id = ? , image = ? , Genre = ?
        Where id = ?`
    const values = [
        req.body.name,
        req.body.date_of_birth,
        req.body.address,
        req.body.class_id,
        req.file.filename,
        req.body.Genre
    ]
    con.query(sql,[...values, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_students/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from students where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

export { router as adminRouter };