/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DataTable, {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
  TableHead,
  TableHeader,
  TableRow,
} from '../../DataTable';
import { initialRows, headers } from './shared';

function NestedTable() {
  return (
    <DataTable
      rows={initialRows}
      headers={headers}
      render={({ rows, headers, getHeaderProps, getRowProps }) => (
        <TableContainer title="Nested DataTable">
          <Table>
            <TableHead>
              <TableRow>
                <TableExpandHeader />
                {headers.map(header => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <React.Fragment key={row.id}>
                  <TableExpandRow {...getRowProps({ row })}>
                    {row.cells.map(cell => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableExpandRow>
                  {row.isExpanded && (
                    <TableExpandedRow>
                      <TableCell colSpan={headers.length + 1}>
                        <h1>Expandable row content</h1>
                        <p>Description here</p>
                      </TableCell>
                    </TableExpandedRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    />
  );
}

export default () => (
  <DataTable
    rows={initialRows}
    headers={headers}
    render={({ rows, headers, getHeaderProps, getRowProps }) => (
      <TableContainer title="DataTable with expansion">
        <Table>
          <TableHead>
            <TableRow>
              <TableExpandHeader />
              {headers.map(header => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <React.Fragment key={row.id}>
                <TableExpandRow {...getRowProps({ row })}>
                  {row.cells.map(cell => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableExpandRow>
                {row.isExpanded && (
                  <TableExpandedRow>
                    <TableCell colSpan={headers.length + 1}>
                      <NestedTable />
                    </TableCell>
                  </TableExpandedRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  />
);