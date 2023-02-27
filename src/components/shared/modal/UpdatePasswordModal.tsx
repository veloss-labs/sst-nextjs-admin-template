import React, { useCallback, useEffect, useRef } from 'react';
import { Modal, Form, Input } from 'antd';

// hooks
import { useController, useForm } from 'react-hook-form';
import { schema } from '~/libs/validation/manager';
import { zodResolver } from '@hookform/resolvers/zod';

import withInjectProvider from '~/components/shared/modal/_provider/withInject';
import { useInjectContext } from '~/components/shared/modal/_provider/inject';

import type { FormInstance } from 'antd';
import type { UpdatePasswordFormData } from '~/libs/validation/manager';

interface InternalUpdatePasswordModalProps {
  open: boolean;
  onOk: () => void;
}

const InternalUpdatePasswordModal: React.FC<
  InternalUpdatePasswordModalProps
> = (props) => {
  const { setForm, ...state } = useInjectContext();
  const $form = useRef<FormInstance | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(schema.updatePassword),
  });

  const { field: passwordField } = useController({
    name: 'password',
    control,
  });

  const { field: passwordConfirmField } = useController({
    name: 'passwordConfirm',
    control,
  });

  const onSubmit = useCallback(
    (input: UpdatePasswordFormData) => {
      console.log('Success:', input);
      props.onOk();
    },
    [props],
  );

  useEffect(() => {
    if (!state.$form && props.open) {
      setForm($form.current);
    }

    return () => {
      if (!props.open) {
        setForm(null);
      }
    };
  }, [props.open, state.$form]);

  console.log('errors', errors);

  return (
    <Form layout="vertical" ref={$form} onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="비밀번호"
        validateStatus={errors.password?.message ? 'error' : undefined}
        help={errors.password?.message ? errors.password?.message : undefined}
      >
        <Input.Password
          placeholder="비밀번호"
          autoComplete="new-password"
          {...passwordField}
        />
      </Form.Item>
      <Form.Item
        label="비밀번호 확인"
        validateStatus={errors.passwordConfirm?.message ? 'error' : undefined}
        help={
          errors.passwordConfirm?.message
            ? errors.passwordConfirm?.message
            : undefined
        }
      >
        <Input.Password
          placeholder="비밀번호 확인"
          autoComplete="new-password"
          {...passwordConfirmField}
        />
      </Form.Item>
    </Form>
  );
};

interface UpdatePasswordModalProps {
  open: boolean;
  loading: boolean;
  onOk: () => void;
  onCancel: () => void;
}

function UpdatePasswordModal({
  open,
  loading,
  onCancel,
  onOk,
}: UpdatePasswordModalProps) {
  const { $form } = useInjectContext();

  const onConfirm = useCallback(() => {
    $form?.submit();
  }, [$form]);

  return (
    <Modal
      title="비밀번호 변경"
      open={open}
      onOk={onConfirm}
      confirmLoading={loading}
      centered
      onCancel={onCancel}
      destroyOnClose
      okText="변경"
      okButtonProps={{
        className: '!shadow-none',
      }}
    >
      <InternalUpdatePasswordModal open={open} onOk={onOk} />
    </Modal>
  );
}

export default withInjectProvider(UpdatePasswordModal);
