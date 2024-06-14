import express from 'express';
import router from '../src/router/Router'; // Đảm bảo đường dẫn này là chính xác
import cors from 'cors';

const app = express();
const port = 8080;

// Sử dụng CORS middleware
app.use(cors());

// Sử dụng middleware để parse JSON
app.use(express.json());

// Sử dụng router
app.use(router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
