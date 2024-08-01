const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mailgun = require('mailgun-js');

const app = express();
const port = 3000;

// استبدل القيم الخاصة بك هنا
const DOMAIN = 'sandbox7a1baaec1c364d9f90dcecf5375c2040.mailgun.org';
const API_KEY = 'e1aaa606015a3053a278c949f8b132f3-6fafb9bf-fc99b7fe';

const mg = mailgun({apiKey: API_KEY, domain: DOMAIN});

const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname)));

// عرض صفحة رفع التكليفات
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'رفع التكليفات.html'));
});

app.post('/send-email', upload.single('file'), (req, res) => {
    const { subject, email } = req.body;
    const file = req.file;

    console.log('Received subject:', subject);
    console.log('Received email:', email);
    console.log('Received file:', file);

    if (!file) {
        return res.json({ success: false, message: 'لم يتم رفع أي ملف' });
    }

    const filePath = path.join(__dirname, file.path);

    const data = {
        from: 'Excited User <mailgun@sandbox7a1baaec1c364d9f90dcecf5375c2040.mailgun.org>',
        to: email,
        subject: `تكليف جديد لمادة ${subject}`,
        text: 'يرجى مراجعة التكليف المرفق.',
        attachment: filePath
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            console.log('Error:', error);
            return res.json({ success: false, message: 'فشل في إرسال البريد الإلكتروني', error: error.message });
        } else {
            console.log('Email sent:', body);
            res.json({ success: true, message: 'تم إرسال البريد الإلكتروني بنجاح' });
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Failed to delete uploaded file:', err);
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
