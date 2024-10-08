import {z} from 'zod';

const schema = z.object({
    name: z.string(),  
    email: z.string().email(),
})

export default schema;