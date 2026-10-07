export interface EventData {
    id: number;
    name: string;
    date: string;
    capacity: number;
    registrationCount: number;
}

export interface Attendee {
    id: number;
    name: string;
    email: string;
}

// In-memory storage for demo purposes
const events: EventData[] = [

    { id: 1, name: "Tech Conference 2025", date: "2025-03-15T09:00:00.000Z", capacity: 200, registrationCount: 185 },
    { id: 2, name: "Startup Pitch Night", date: "2025-02-20T18:00:00.000Z", capacity: 50, registrationCount: 12 },
    { id: 3, name: "Web Dev Workshop", date: "2025-02-10T10:00:00.000Z", capacity: 30, registrationCount: 30 }
];

const attendees: Attendee[] = [
    { id: 1, name: "Jordan Smith", email: "jordan.smith@email.com" },
    { id: 2, name: "Alex Chen", email: "alex.chen@email.com" }
];
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
  date: string;
  capacity: number;
}): Promise<EventData> => {
  // Create a new item with auto-generated ID
  const newEvent: EventData = {
    id: Date.now(),
    name: eventData.name,
    date: eventData.date,
    capacity: eventData.capacity,
    registrationCount: 0
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
  id: number,
  eventData: Pick<EventData, "name" | "date" | "capacity" | "registrationCount">
): Promise<EventData> => {
  const index: number = events.findIndex((event: EventData) => event.id === id);

  if (index === -1) {
    throw new Error(`Item with ID ${id} not found`);
  }

  // Update the item with the provided fields
  events[index] = {
    ...events[index],
    ...eventData,
  };

  return structuredClone(events[index]);
};

/**
 * Deletes an item from storage
 * @param id - The ID of the item to delete
 * @throws Error if item with given ID is not found
 */
export const deleteEvent = async (id: number): Promise<void> => {
  const index: number = events.findIndex((event: EventData) => event.id === id);

  if (index === -1) {
    throw new Error(`Event with ID ${id} not found`);
  }

  events.splice(index, 1);
};