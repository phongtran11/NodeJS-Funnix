const express = require('express');
const app = express();

const port = 3000;
const router = require('./router/index');
const db = require('./config/db');
const Staff = require('./models/staff');

// Connect to MongoDB
db();

// Set static: public
app.use(express.static('public'));

// Parse body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// View engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Add staff in request
app.use((req, res, next) => {
    Staff.findOne()
        .then((staff) => {
            if (!staff) {
                const newStaff = new Staff({
                    name: 'Trần Quang Phong',
                    dOB: new Date(1999, 08, 02),
                    salaryScale: 1.4,
                    startDate: new Date(2020, 01, 01),
                    department: 'IT',
                    annualLeave: 14,
                    image: 'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg',
                });

                newStaff.save();
            } else {
                Staff.findOne({ _id: '6183c74574e9bd56eb8bd338' })
                    .then((staff) => {
                        req.staff = staff;
                        next();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

// Init router
router(app);

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
