import { Note } from '../interfaces/types';

export let notes: Note[] = [
    {
        id: 1,
        userId: 1,
        title: 'First Note',
        content: 'This is the content of the first note.',
        createdAt: new Date('2023-01-01T10:00:00Z').toISOString(),
        updatedAt: new Date('2023-01-01T10:00:00Z').toISOString()
    },
    {   
        id: 2,
        userId: 2,
        title: 'Second Note',
        content: 'This is the content of the second note.',
        createdAt: new Date('2023-01-02T10:00:00Z').toISOString(),
        updatedAt: new Date('2023-01-02T10:00:00Z').toISOString()
    },
    {        
        id: 3,
        userId: 1,
        title: 'Third Note',
        content: 'This is the content of the third note.',
        createdAt: new Date('2023-01-03T10:00:00Z').toISOString(),
        updatedAt: new Date('2023-01-03T10:00:00Z').toISOString()
    }
];
