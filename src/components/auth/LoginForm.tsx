import React, { useCallback } from 'react';

// components
import { Input, Button, Form } from 'antd';

// form
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '~/libs/form/auth';

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const control_email = useController({
    control,
    name: 'email',
  });

  const control_password = useController({
    control,
    name: 'password',
  });

  const onSubmit = useCallback((data: LoginFormData) => {
    console.log(data);
  }, []);

  return (
    <div className="grid gap-6">
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Form.Item label="이메일" name="email">
              <Input
                type="email"
                autoComplete="email"
                autoCorrect="off"
                placeholder="name@example.com"
                {...control_email.field}
              />
            </Form.Item>
            <Form.Item label="비밀번호" name="password">
              <Input.Password
                autoComplete="password"
                autoCorrect="off"
                {...control_password.field}
              />
            </Form.Item>
          </div>
          <Button htmlType="submit" type="primary">
            Sign In
          </Button>
        </div>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300"></div>
        </div>
      </div>
    </div>
  );
}
