import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as itemService from "../services/itemService";
import type { Item } from "../models/itemModel";

export const getAllItems = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const items: Item[] = await itemService.getAllItems();
    res.status(HTTP_STATUS.OK).json({
      message: "Items retrieved successfully",
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Basic validation - check for required fields
    if (!req.body.name) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Item name is required",
      });
    } else if (!req.body.description) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Item description is required",
      });
    } else {
      // Extract only the fields we need
      const { name, description } = req.body;

      const itemData = { name, description };

      const newItem: Item = await itemService.createItem(itemData);
      res.status(HTTP_STATUS.CREATED).json({
        message: "Item created successfully",
        data: newItem,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    // Extract update fields
    const { name, description } = req.body;

    // Create update data object with only the fields that can be updated
    const updateData = { name, description };

    const updatedItem: Item = await itemService.updateItem(id, updateData);
    res.status(HTTP_STATUS.OK).json({
      message: "Item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await itemService.deleteItem(id);
    res.status(HTTP_STATUS.OK).json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};