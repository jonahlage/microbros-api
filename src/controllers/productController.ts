import { Request, Response } from 'express';
import pool from '../db';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [productId]);
    if ((rows as any[]).length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json((rows as any[])[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, category } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO products (name, description, price, category) VALUES (?, ?, ?, ?)',
      [name, description, price, category]
    );
    res.status(201).json({ id: (result as any).insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { name, description, price, category } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE products SET name = ?, description = ?, price = ?, category = ? WHERE id = ?',
      [name, description, price, category, productId]
    );
    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [productId]);
    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};