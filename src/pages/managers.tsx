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
} from 'antd';
import React from 'react';
import AdminLayout from '~/components/admin/AdminLayout';
import { SearchOutlined } from '@ant-design/icons';
import {
  SearchColumnWrapper,
  SearchTableContent,
  SearchTableWrapper,
} from '~/components/ui/search/SearchTable';
import { _BRAND, _COLOR } from '~/libs/styles/color';

export default function Managers() {
  return (
    <div className="list-page">
      <Card
        title="검색"
        className="mt-4"
        bodyStyle={{
          backgroundColor: _BRAND[100],
        }}
      >
        <Form>
          <table>
            <colgroup>
              <col width="20%" />
              <col width="30%" />
              <col width="20%" />
              <col width="30%" />
            </colgroup>
            <tbody>
              <SearchTableWrapper>
                <SearchTableContent name={'결과'}>
                  <Form.Item name="result" style={{ marginBottom: 0 }}>
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
                </SearchTableContent>
                <SearchTableContent name={'선택박스'}>
                  <Form.Item name="rqstGrcNm" style={{ marginBottom: 0 }}>
                    <Select
                      showSearch
                      placeholder="선택"
                      options={[{ label: '전체', value: '' }]}
                    />
                  </Form.Item>
                </SearchTableContent>
              </SearchTableWrapper>
              <SearchTableWrapper>
                <SearchTableContent name={'기간'} tdProps={{ colSpan: 5 }}>
                  <Form.Item name="timeAll" style={{ marginBottom: 0 }}>
                    <Radio.Group
                      optionType="button"
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
                </SearchTableContent>
              </SearchTableWrapper>
              {/* {!watchTimeAll && (
                <SearchTableWrapper>
                  <SearchTableContent
                    name={'기간 선택'}
                    tdProps={{ colSpan: 3 }}
                  >
                    <Form.Item name="rangeTime" style={{ marginBottom: 0 }}>
                      <DatePicker.RangePicker />
                    </Form.Item>
                  </SearchTableContent>
                </SearchTableWrapper>
              )} */}

              <SearchColumnWrapper name={'검색어'} tdProps={{ colSpan: 5 }}>
                <Form.Item name="keyword" style={{ marginBottom: 0 }}>
                  <Input placeholder="이름" />
                </Form.Item>
              </SearchColumnWrapper>
            </tbody>
          </table>

          <Space className="mt-3 flex justify-center w-full" wrap>
            <Button htmlType="reset" type="default">
              초기화
            </Button>
            <Button htmlType="submit" type="primary" icon={<SearchOutlined />}>
              검색
            </Button>
          </Space>
        </Form>
      </Card>
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
