import { Prospect, SalesScript, Transaction, Task, Goal } from '../types';
import { CalendarEvent } from '../types';

// Storage keys
const STORAGE_KEYS = {
  PROSPECTS: 'tourify_prospects',
  SCRIPTS: 'tourify_scripts',
  TRANSACTIONS: 'tourify_transactions',
  TASKS: 'tourify_tasks',
  GOALS: 'tourify_goals',
  CALENDAR_EVENTS: 'tourify_calendar_events'
};

// Generic storage functions
export const getStorageData = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const setStorageData = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Specific storage functions
export const getProspects = (): Prospect[] => getStorageData<Prospect>(STORAGE_KEYS.PROSPECTS);
export const setProspects = (prospects: Prospect[]): void => setStorageData(STORAGE_KEYS.PROSPECTS, prospects);

export const getSalesScripts = (): SalesScript[] => getStorageData<SalesScript>(STORAGE_KEYS.SCRIPTS);
export const setSalesScripts = (scripts: SalesScript[]): void => setStorageData(STORAGE_KEYS.SCRIPTS, scripts);

export const getTransactions = (): Transaction[] => getStorageData<Transaction>(STORAGE_KEYS.TRANSACTIONS);
export const setTransactions = (transactions: Transaction[]): void => setStorageData(STORAGE_KEYS.TRANSACTIONS, transactions);

export const getTasks = (): Task[] => getStorageData<Task>(STORAGE_KEYS.TASKS);
export const setTasks = (tasks: Task[]): void => setStorageData(STORAGE_KEYS.TASKS, tasks);

export const getGoals = (): Goal[] => getStorageData<Goal>(STORAGE_KEYS.GOALS);
export const setGoals = (goals: Goal[]): void => setStorageData(STORAGE_KEYS.GOALS, goals);

export const getCalendarEvents = (): CalendarEvent[] => {
  const events = getStorageData<any>(STORAGE_KEYS.CALENDAR_EVENTS);
  // Convert date strings back to Date objects
  return events.map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end)
  }));
};

export const setCalendarEvents = (events: CalendarEvent[]): void => {
  // Convert Date objects to strings for storage
  const eventsForStorage = events.map(event => ({
    ...event,
    start: event.start.toISOString(),
    end: event.end.toISOString()
  }));
  setStorageData(STORAGE_KEYS.CALENDAR_EVENTS, eventsForStorage);
};