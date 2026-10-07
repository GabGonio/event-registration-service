export interface EventData {
    id?: string;
    name: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// In-memory storage for demo purposes
const events: EventData[] = [];

/**
 * Retrieves all items from storage
 * @returns Array of all items
 */
export const getAllEvents = async (): Promise<EventData[]> => {
  // Return a deep clone to avoid direct mutation
  return structuredClone(events);
};

/**
 * Creates a new item
 * @param eventData - The data for the new item (name and description)
 * @returns The created item with generated ID
 */
export const createEvent = async (eventData: {
  name: string;
  description: string;
}): Promise<EventData> => {
  // Create a new item with auto-generated ID
  const newEvent: EventData = {
    id: Date.now().toString(),
    name: eventData.name,
    description: eventData.description,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  events.push(newEvent);
  return structuredClone(newEvent);
};

/**
 * Updates an existing item
 * @param id - The ID of the item to update
 * @param eventData - The fields to update (name and/or description)
 * @returns The updated item
 * @throws Error if item with given ID is not found
 */
export const updateEvent = async (
  id: string,
  eventData: Pick<EventData, "name" | "description">
): Promise<EventData> => {
  const index: number = events.findIndex((event: EventData) => event.id === id);

  if (index === -1) {
    throw new Error(`Item with ID ${id} not found`);
  }

  // Update the item with the provided fields
  events[index] = {
    ...events[index],
    ...eventData,
    updatedAt: new Date(),
  };

  return structuredClone(events[index]);
};

/**
 * Deletes an item from storage
 * @param id - The ID of the item to delete
 * @throws Error if item with given ID is not found
 */
export const deleteEvent = async (id: string): Promise<void> => {
  const index: number = events.findIndex((event: EventData) => event.id === id);

  if (index === -1) {
    throw new Error(`Event with ID ${id} not found`);
  }

  items.splice(index, 1);
};