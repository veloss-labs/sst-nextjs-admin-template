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
import React, { useCallback, useEffect, useMemo } from 'react';
import AdminLayout from '~/components/admin/AdminLayout';
import { SearchOutlined } from '@ant-design/icons';
import { useMedia } from 'react-use';

import type { Dayjs } from 'dayjs';
import { ManagerSearch } from '~/libs/search/manager';
import { useRouter } from 'next/router';
import { useResetUrlState, useUrlState } from '~/libs/hooks/useUrlState';
import { useRouteContext } from '~/store/useRouteStore';
import logger from '~/utils/logger';

interface FormFields {
  checkbox: string[];
  select: string;
  timeAll: boolean;
  rangeTime: [Dayjs, Dayjs] | undefined;
  keyword: string;
}

const defaultQuery = {
  pageNo: '1',
  pageSize: '10',
  checkbox: ['true', 'false'],
  select: 'all',
  timeAll: 'true',
  startAt: null,
  endAt: null,
  keyword: '',
};

export default function Managers() {
  const router = useRouter();

  const [state, setState] = useUrlState(defaultQuery);

  const reset = useResetUrlState();

  const { transitionRoute } = useRouteContext((state) => ({
    transitionRoute: state.transitionRoute,
  }));

  const isMobile = useMedia('(max-width: 768px)', false);
  const colSpan = useMemo(() => (isMobile ? 24 : 12), [isMobile]);

  const _search = useMemo(() => {
    const _instance = new ManagerSearch<FormFields>({
      initialQuery: defaultQuery,
    });
    return _instance;
  }, []);

  const [form] = Form.useForm<FormFields>();

  const watchTimeAll = Form.useWatch('timeAll', form);

  const onFinish = useCallback(
    (input: FormFields) => {
      const nextInput = { ...input, pageNo: '1', pageSize: state.pageSize };
      const query = _search.makeQuery(nextInput);
      setState(query);
    },
    [_search, setState, state.pageSize],
  );

  const onReset: React.FormEventHandler<HTMLFormElement> = useCallback(() => {
    reset();
    form.resetFields();
  }, [form, reset]);

  const onMoveToEdit = useCallback(async () => {
    transitionRoute(true);
    try {
      await router.push('/managers/edit');
    } catch (error) {
      logger.error('[Managers] onMoveToEdit() error', error);
    } finally {
      transitionRoute(false);
    }
  }, [router]);

  useEffect(() => {
    if (!router.isReady) return;
    if (_search.IsSearchQuery(state)) {
      const formFields = _search.getClientForm(state, ['startAt', 'endAt']);
      form.setFieldsValue(formFields);
    }
  }, [router.isReady]);

  return (
    <div className="list-page">
      <div className="search-form">
        <Card title="??????" className="mt-4">
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            onReset={onReset}
            initialValues={_search.getClientForm(_search.getInitialQuery(), [
              'startAt',
              'endAt',
            ])}
          >
            <Row>
              <Col span={colSpan}>
                <Form.Item label="????????????" name="checkbox">
                  <Checkbox.Group
                    options={[
                      {
                        label: '??????1',
                        value: 'true',
                      },
                      {
                        label: '??????2',
                        value: 'false',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={colSpan}>
                <Form.Item label="????????????" name="select">
                  <Select
                    showSearch
                    placeholder="??????"
                    options={[
                      { label: '??????', value: 'all' },
                      { label: '??????1', value: '1' },
                      { label: '??????2', value: '2' },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={colSpan}>
                <Form.Item label="????????????" name="timeAll">
                  <Radio.Group
                    options={[
                      {
                        label: '??????',
                        value: true,
                      },
                      {
                        label: '?????? ??????',
                        value: false,
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              {!watchTimeAll && (
                <Col span={colSpan}>
                  <Form.Item label="??????" name="rangeTime">
                    <DatePicker.RangePicker />
                  </Form.Item>
                </Col>
              )}
            </Row>
            <Row>
              <Col span={colSpan}>
                <Form.Item label="?????????" name="keyword">
                  <Input placeholder="?????????" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Space className="mt-3 flex justify-center w-full" wrap>
                <Button htmlType="reset" type="default">
                  ?????????
                </Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  className="!shadow-none"
                  icon={<SearchOutlined />}
                >
                  ??????
                </Button>
              </Space>
            </Row>
          </Form>
        </Card>
      </div>
      <Row className="my-3 flex justify-end">
        <Space split={<Divider type="vertical" />}>
          <Button
            type="primary"
            htmlType="button"
            className="!shadow-none"
            onClick={onMoveToEdit}
          >
            ??????
          </Button>
          <Button type="text" htmlType="button">
            ????????????
          </Button>
        </Space>
      </Row>
      <Table
        columns={[
          {
            dataIndex: 'seq',
            title: '??????',
            sorter: false,
            align: 'center',
          },
          {
            dataIndex: 'id',
            title: '?????????',
            align: 'center',
          },
          {
            dataIndex: 'nm',
            title: '??????',
            align: 'center',
          },
          {
            dataIndex: 'test',
            title: '?????????',
            align: 'center',
          },
          {
            dataIndex: 'createdTime',
            title: '????????????',
            align: 'center',
          },
          {
            dataIndex: 'result',
            title: '??????',
            align: 'center',
          },
        ]}
        rowKey="seq"
        dataSource={[]}
        size="small"
        locale={{
          emptyText: '???????????? ????????????.',
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
            <Breadcrumb.Item>???</Breadcrumb.Item>
            <Breadcrumb.Item>????????? ??????</Breadcrumb.Item>
            <Breadcrumb.Item>????????? ??????</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      }
    >
      {page}
    </AdminLayout>
  );
};
