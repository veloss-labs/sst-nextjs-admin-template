import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Card, Col, Form, Input, Row, Typography, Button } from 'antd';
import { useMedia } from 'react-use';

import { useForm, useController } from 'react-hook-form';
import { schema } from '~/libs/validation/manager';
import { zodResolver } from '@hookform/resolvers/zod';
import { getTargetElement } from '~/libs/browser/dom';
import { isEmpty } from '~/utils/assertion';

import type { FormInstance } from 'antd';
import type { ManagerFormData } from '~/libs/validation/manager';

interface ManagerEditFormProps<Model> {
  data?: Model;
  isUpdate?: boolean;
  onChangeUpdate?: (update: boolean) => void;
}

function ManagerEditForm<Model = Record<string, any>>({
  data,
  isUpdate,
  onChangeUpdate,
}: ManagerEditFormProps<Model>) {
  const isMobile = useMedia('(max-width: 768px)', false);

  const $form = useRef<FormInstance | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ManagerFormData>({
    resolver: zodResolver(schema.edit),
  });

  const formColSpan = useMemo(() => (isMobile ? 24 : 12), [isMobile]);

  const formRowGutter = useMemo(() => (isMobile ? 0 : 16), [isMobile]);

  const onSubmit = useCallback(() => {
    const ele = getTargetElement($form);
    ele?.submit();
  }, []);

  const onFinish = useCallback((values: ManagerFormData) => {
    console.log('Success:', values);
  }, []);

  const { field: nameField } = useController({
    name: 'name',
    control,
  });

  const { field: emailField } = useController({
    name: 'email',
    control,
  });

  const { field: passwordField } = useController({
    name: 'password',
    control,
  });

  const { field: passwordConfirmField } = useController({
    name: 'passwordConfirm',
    control,
  });

  const { field: companyField } = useController({
    name: 'company',
    control,
  });

  const { field: departmentField } = useController({
    name: 'department',
    control,
  });

  const { field: memoField } = useController({
    name: 'memo',
    control,
  });

  useEffect(() => {
    if (data && !isEmpty(data) && isUpdate) {
      reset(data);
    }
  }, [data, isUpdate]);

  const actions: React.ReactNode[] = [];
  if (isUpdate) {
    actions.push(
      <Button
        key="btn-antd__cancel"
        type="default"
        htmlType="button"
        className="!shadow-none"
        onClick={() => onChangeUpdate?.(false)}
      >
        ??????
      </Button>,
    );
  }
  actions.push(
    <Button
      key="btn-antd__save"
      type="primary"
      htmlType="button"
      className="!shadow-none"
      onClick={onSubmit}
    >
      ??????
    </Button>,
  );

  return (
    <Row className="flex flex-col items-start">
      <Col span={24}>
        <Typography.Title level={4}>
          ????????? {isUpdate ? '??????' : '??????'}
        </Typography.Title>
        <Typography.Paragraph type="secondary">
          {isUpdate
            ? '????????? ????????? ????????? ??? ????????????.'
            : '????????? ????????? ????????? ??? ????????????.'}
        </Typography.Paragraph>
      </Col>
      <Col span={24}>
        <Card className="edit-form max-w-5xl" actions={actions}>
          <Form layout="vertical" ref={$form} onFinish={handleSubmit(onFinish)}>
            <Row gutter={formRowGutter}>
              <Col span={formColSpan}>
                <Form.Item
                  label="??????"
                  name="name"
                  validateStatus={errors.name?.message ? 'error' : undefined}
                  help={errors.name?.message ? errors.name?.message : undefined}
                >
                  <Input placeholder="??????" {...nameField} />
                </Form.Item>
              </Col>
              <Col span={formColSpan}>
                <Form.Item
                  label="?????????"
                  name="email"
                  validateStatus={errors.email?.message ? 'error' : undefined}
                  help={
                    errors.email?.message ? errors.email?.message : undefined
                  }
                >
                  <Input type="email" placeholder="?????????" {...emailField} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={formRowGutter}>
              <Col span={formColSpan}>
                <Form.Item
                  label="????????????"
                  name="password"
                  validateStatus={
                    errors.password?.message ? 'error' : undefined
                  }
                  help={
                    errors.password?.message
                      ? errors.password?.message
                      : undefined
                  }
                >
                  <Input.Password placeholder="????????????" {...passwordField} />
                </Form.Item>
              </Col>
              <Col span={formColSpan}>
                <Form.Item
                  label="???????????? ??????"
                  name="passwordConfirm"
                  validateStatus={
                    errors.passwordConfirm?.message ? 'error' : undefined
                  }
                  help={
                    errors.passwordConfirm?.message
                      ? errors.passwordConfirm?.message
                      : undefined
                  }
                >
                  <Input.Password
                    placeholder="???????????? ??????"
                    {...passwordConfirmField}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={formRowGutter}>
              <Col span={formColSpan}>
                <Form.Item
                  label="??????"
                  name="company"
                  validateStatus={errors.company?.message ? 'error' : undefined}
                  help={
                    errors.company?.message
                      ? errors.company?.message
                      : undefined
                  }
                >
                  <Input placeholder="??????" {...companyField} />
                </Form.Item>
              </Col>
              <Col span={formColSpan}>
                <Form.Item
                  label="????????????"
                  name="department"
                  validateStatus={
                    errors.department?.message ? 'error' : undefined
                  }
                  help={
                    errors.department?.message
                      ? errors.department?.message
                      : undefined
                  }
                >
                  <Input placeholder="????????????" {...departmentField} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={formRowGutter}>
              <Col span={24}>
                <Form.Item
                  label="??????"
                  name="memo"
                  validateStatus={errors.memo?.message ? 'error' : undefined}
                  help={errors.memo?.message ? errors.memo?.message : undefined}
                >
                  <Input.TextArea rows={3} placeholder="??????" {...memoField} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default ManagerEditForm;
