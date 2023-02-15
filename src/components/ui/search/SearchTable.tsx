import React from 'react';
import { Typography } from 'antd';

interface TableOptions {
  thProps?: React.ThHTMLAttributes<HTMLTableHeaderCellElement>;
  tdProps?: React.TdHTMLAttributes<HTMLTableDataCellElement>;
}

interface SearchTableContentProps extends TableOptions {
  name: React.ReactNode;
  children?: React.ReactElement | React.ReactElement[] | null;
}

export const SearchTableContent: React.FC<SearchTableContentProps> = ({
  name,
  children,
  thProps,
  tdProps,
}) => {
  return (
    <>
      <th scope="col" className="table-active" {...(thProps && { ...thProps })}>
        <Typography.Text strong>{name}</Typography.Text>
      </th>
      <td {...(tdProps && { ...tdProps })}>{children}</td>
    </>
  );
};

export const SearchTableWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <tr>{children}</tr>;
};

export const SearchColumnWrapper: React.FC<SearchTableContentProps> = ({
  name,
  children,
  thProps,
  tdProps,
}) => {
  return (
    <SearchTableWrapper>
      <SearchTableContent name={name} thProps={thProps} tdProps={tdProps}>
        {children}
      </SearchTableContent>
    </SearchTableWrapper>
  );
};
