import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Card, Col, Form, Input, Row, Typography, Button } from 'antd';
import { useMedia } from 'react-use';

import type { FormInstance } from 'antd';
import type { Store } from 'antd/es/form/interface';
import { UpdatePasswordModal } from '~/components/shared/modal/Dynamic';

interface ManagerDetailFormProps<Model = Store> {
  data?: Model;
  onChangeUpdate: (update: boolean) => void;
}

function ManagerDetailForm<Model = Store>({
  data,
  onChangeUpdate,
}: ManagerDetailFormProps<Model>) {
  const isMobile = useMedia('(max-width: 768px)', false);

  const $form = useRef<FormInstance | null>(null);

  const initialValues = useMemo(() => {
    if (!data) return undefined;
    const _data = data as Store;
    return {
      name: _data?.name,
      email: _data?.email,
      company: _data?.company,
      department: _data?.department,
      memo: _data?.memo,
    } as Store;
  }, [data]);

  const formColSpan = useMemo(() => (isMobile ? 24 : 12), [isMobile]);

  const formRowGutter = useMemo(() => (isMobile ? 0 : 16), [isMobile]);

  const [openPwd, setOpenPwd] = useState(false);

  const onClosePwd = useCallback(() => {
    setOpenPwd(false);
  }, []);

  const onConfirmPwd = useCallback(() => {
    setOpenPwd(false);
  }, []);

  const onClickUpdatePassword = useCallback(() => {
    setOpenPwd(true);
  }, []);

  return (
    <Row className="flex flex-col items-start">
      <Col span={24}>
        <Typography.Title level={4}>담당자 상세</Typography.Title>
        <Typography.Paragraph type="secondary">
          담당자 상세 정보를 확인 할 수 있습니다.
        </Typography.Paragraph>
      </Col>
      <Col span={24}>
        <Card
          className="edit-form max-w-5xl"
          extra={
            <Button
              key="btn-antd__save"
              type="default"
              htmlType="button"
              className="!shadow-none"
              onClick={onClickUpdatePassword}
            >
              비밀번호 변경
            </Button>
          }
          actions={[
            <Button
              key="btn-antd__save"
              type="primary"
              htmlType="button"
              className="!shadow-none"
              onClick={() => onChangeUpdate(true)}
            >
              수정
            </Button>,
          ]}
        >
          <Form<Model>
            layout="vertical"
            ref={$form}
            initialValues={initialValues}
          >
            <Row gutter={formRowGutter}>
              <Col span={formColSpan}>
                <Form.Item label="이름" name="name">
                  <Input placeholder="이름" readOnly />
                </Form.Item>
              </Col>
              <Col span={formColSpan}>
                <Form.Item label="이메일" name="email">
                  <Input type="email" placeholder="이메일" readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={formRowGutter}>
              <Col span={formColSpan}>
                <Form.Item label="업체" name="company">
                  <Input placeholder="업체" readOnly />
                </Form.Item>
              </Col>
              <Col span={formColSpan}>
                <Form.Item label="담당업무" name="department">
                  <Input placeholder="담당업무" readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={formRowGutter}>
              <Col span={24}>
                <Form.Item label="메모" name="memo">
                  <Input.TextArea rows={3} placeholder="메모" readOnly />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
      <UpdatePasswordModal
        open={openPwd}
        loading={false}
        onCancel={onClosePwd}
        onOk={onConfirmPwd}
      />
    </Row>
  );
}

export default ManagerDetailForm;
