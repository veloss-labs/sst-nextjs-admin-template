import {
  Card,
  Checkbox,
  Form,
  Radio,
  Select,
  Input,
  Table,
  Space,
  Button,
  Divider,
  Row,
  Breadcrumb,
  Col,
  DatePicker,
} from 'antd';
import React, { useMemo } from 'react';
import AdminLayout from '~/components/admin/AdminLayout';
import { SearchOutlined } from '@ant-design/icons';
import { useMedia } from 'react-use';

export default function Managers() {
  const isMobile = useMedia('(max-width: 768px)', false);
  const colSpan = useMemo(() => (isMobile ? 24 : 12), [isMobile]);

  return (
    <div className="list-page">
      <div className="search-form">
        <Card title="검색" className="mt-4">
          <Form layout="vertical">
            <Row>
              <Col span={colSpan}>
                <Form.Item label="체크박스" name="checkbox">
                  <Checkbox.Group
                    options={[
                      {
                        label: '성공',
                        value: 'true',
                      },
                      {
                        label: '실패',
                        value: 'false',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={colSpan}>
                <Form.Item label="콤보박스" name="select">
                  <Select
                    showSearch
                    placeholder="선택"
                    options={[{ label: '전체', value: '' }]}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={colSpan}>
                <Form.Item label="라디오" name="timeAll">
                  <Radio.Group
                    options={[
                      {
                        label: '전체',
                        value: true,
                      },
                      {
                        label: '기간 선택',
                        value: false,
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={colSpan}>
                <Form.Item label="날짜" name="rangeTime">
                  <DatePicker.RangePicker />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={colSpan}>
                <Form.Item label="검색어" name="keyword">
                  <Input placeholder="검색어" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Space className="mt-3 flex justify-center w-full" wrap>
                <Button htmlType="reset" type="default">
                  초기화
                </Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  icon={<SearchOutlined />}
                >
                  검색
                </Button>
              </Space>
            </Row>
          </Form>
        </Card>
      </div>
      <Row className="my-3 flex justify-end">
        <Space split={<Divider type="vertical" />}>
          <Button type="primary" htmlType="button">
            화면갱신
          </Button>
        </Space>
      </Row>
      <Table
        columns={[
          {
            dataIndex: 'seq',
            title: '순번',
            sorter: false,
            align: 'center',
          },
          {
            dataIndex: 'id',
            title: '아이디',
            align: 'center',
          },
          {
            dataIndex: 'nm',
            title: '이름',
            align: 'center',
          },
          {
            dataIndex: 'test',
            title: '테스트',
            align: 'center',
          },
          {
            dataIndex: 'createdTime',
            title: '접근일시',
            align: 'center',
          },
          {
            dataIndex: 'result',
            title: '결과',
            align: 'center',
          },
        ]}
        rowKey="seq"
        dataSource={[]}
        size="small"
        locale={{
          emptyText: '데이터가 없습니다.',
        }}
        bordered
      />
    </div>
  );
}

Managers.getLayout = function GetLayout(page: React.ReactNode) {
  return (
    <AdminLayout
      pageHeader={
        <div className="py-7 px-5 sm:px-10">
          <Breadcrumb>
            <Breadcrumb.Item>홈</Breadcrumb.Item>
            <Breadcrumb.Item>담당자 관리</Breadcrumb.Item>
            <Breadcrumb.Item>담당자 목록</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      }
    >
      {page}
    </AdminLayout>
  );
};
