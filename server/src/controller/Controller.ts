import { Request, Response } from 'express';
import * as productService from '../services/Services';

export const findAll = async (req: Request, res: Response) => {
    try {
        const products = await productService.findAdd();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err });
    }
};

export const findOne = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }
        const product = await productService.findOne(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const { name, status } = req.body;
        if (!name || typeof status !== 'boolean') {
            return res.status(400).json({ error: 'Invalid input data' });
        }
        const newTask = await productService.createTask(name, status);
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { name, status } = req.body;
        if (isNaN(id) || !name || typeof status !== 'boolean') {
            return res.status(400).json({ error: 'Invalid input data' });
        }
        const updatedTask = await productService.updateTask(id, name, status);
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }
        const deletedTask = await productService.deleteTask(id);
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err });
    }
};
