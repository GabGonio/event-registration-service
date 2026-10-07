import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as eventService from "../services/eventService";


interface EventData {
    id?: string;
    name: string;
    description: string;
}


export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const events: EventData[] = await eventService.getAllEvents();
    res.status(HTTP_STATUS.OK).json({
      message: "Events retrieved successfully",
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Basic validation - check for required fields
    if (!req.body.name) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Event name is required",
      });
    } else if (!req.body.description) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Event description is required",
      });
    } else {
      // Extract only the fields we need
      const { name, description } = req.body;

      const eventData = { name, description };

      const newEvent: EventData = await eventService.createEvent(eventData);
      res.status(HTTP_STATUS.CREATED).json({
        message: "Event created successfully",
        data: newEvent,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (
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

    const updatedEvent: EventData = await eventService.updateEvent(id, updateData);
    res.status(HTTP_STATUS.OK).json({
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await eventService.deleteEvent(id);
    res.status(HTTP_STATUS.OK).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};