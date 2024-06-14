import db from '../connection/Connection';

export const findAdd = async () => {
    const [rows] = await db.query('SELECT * FROM todos');
    return rows;
};

export const findOne = async (id: number) => {
    const [rows] = await db.query(`SELECT * FROM todos WHERE id = ?`, [id]);
    return rows;
};

export const createTask = async (name: string, status: boolean) => {
    const result = await db.query('INSERT INTO todos (name, status) VALUES (?, ?)', [name, status]);
    return result;
};

export const updateTask = async (id: number, name: string, status: boolean) => {
    const result = await db.query('UPDATE todos SET name = ?, status = ? WHERE id = ?', [name, status, id]);
    return result;
};

export const deleteTask = async (id: number) => {
    const result = await db.query('DELETE FROM todos WHERE id = ?', [id]);
    return result;
};
