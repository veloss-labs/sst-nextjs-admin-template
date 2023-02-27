import * as z from 'zod';

export const schema = {
  edit: z
    .object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
      passwordConfirm: z.string().min(6),
      company: z.string(),
      department: z.string(),
      memo: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: 'password do not match',
      path: ['passwordConfirm'],
    }),
  updatePassword: z
    .object({
      password: z.string().min(6),
      passwordConfirm: z.string().min(6),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: 'password do not match',
      path: ['passwordConfirm'],
    }),
};

export type ManagerFormData = z.infer<typeof schema.edit>;

export type UpdatePasswordFormData = z.infer<typeof schema.updatePassword>;
