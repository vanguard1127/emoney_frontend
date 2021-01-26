import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { EmoneyTable } from 'components';
import { getTransactionList, getTransaction } from 'redux/selectors/AdminTransactionSelector'
import {
  Drawer, IconButton, Tooltip, Accordion, AccordionDetails, AccordionSummary
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { AdormentTextField } from 'components';
import SearchIcon from '@material-ui/icons/Search';
import { FormattedMessage } from 'react-intl'
import { injectIntl } from 'react-intl';
import { withMemo } from 'components/HOC';
import * as AdminTransactionActions from 'redux/actions/AdminTransactionActions';
const SubHeader = () => {
  return (
    <div className="emoney-transaction-subheader-row"></div>
  )
}
const Transaction = ({ dispatch, component: Component, intl, ...props }) => {

  const columns = [
    {
      title: intl.formatMessage({ id: "admin.transaction.table.header.company", defaultMessage: "COMPANY" }),
      name: "company",
    },
    {
      title: intl.formatMessage({ id: "admin.transaction.table.header.beneficiary", defaultMessage: "BENEFICIARY" }),
      name: "beneficiary",

    },
    {
      title: intl.formatMessage({ id: "admin.transaction.table.header.method", defaultMessage: "METHOD" }),
      name: "method",
    },
    {
      title: intl.formatMessage({ id: "admin.transaction.table.header.number", defaultMessage: "NUMBER" }),
      name: "number",
    },
    {
      title: intl.formatMessage({ id: "admin.transaction.table.header.amount", defaultMessage: "AMOUNT" }),
      name: "amount",
    },
    {
      title: intl.formatMessage({ id: "admin.transaction.table.header.status", defaultMessage: "STATUS" }),
      name: "status",
      cell: ((row, column, value) => {
        return (
          <div className="trans_status trans_status_color_red"></div>
        )
      }),
    },
    {
      title: '',
      name: 'date',

    }
  ];
  const grouping = {
    field: 'date'
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleSelectRow = (row, event) => {
    let ret = dispatch(AdminTransactionActions.getTransaction(row.id));
    if (Object.keys(ret).length > 0) {
      setDrawerOpen(true);
    }
  }

  useEffect(() => {
    dispatch(AdminTransactionActions.getTransactionList(0, 0, 0))
  }, [dispatch]);

  const [keyword, setKeyword] = useState('');
  const [formats, setFormats] = React.useState(() => ['bold', 'italic']);
  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };
  return (
    <Fragment>
      <div className="d-flex mb-2 flex-row">
        <div className="trans_title">
          {intl.formatMessage({ id: "admin.transaction.title", defaultMessage: "TRANSACTION OVERVIEW" })}
        </div>
        <div className="flex-grow-5 d-flex trans_filter_container flex-column">
          <Accordion classes={{ 'expanded': 'Expanded' }} className="trans_filter_accordion_summary custom-filter-accordian">
            <AccordionSummary
              expandIcon={<span className="emicon-filter" style={{ color: '#228FEE' }} />}
              aria-controls="panel1c-content"
              id="panel1c-header"
              classes={{ content: "trans_filter_accordion_summary_content" }}
            >
              <AdormentTextField
                fullWidth
                placeholder={intl.formatMessage({ id: "admin.transaction.search.keyword", defaultMessage: "Search..." })}
                adormentText={<SearchIcon />}
                value={keyword}
                onChange={(event) => {
                  setKeyword(event.target.value);
                }}
              />
            </AccordionSummary>
            <AccordionDetails>
              <div className="d-flex flex-column w-100">
                <div className="d-flex trans_filter_accordion_detail_date flex-row ustify-content-between">
                  <AdormentTextField
                    fullWidth
                    placeholder={intl.formatMessage({ id: "admin.transaction.search.filter.date.placeholder", defaultMessage: "dd.mm.yyy" })}
                    adormentText={<p className="m-0"><FormattedMessage
                      id="admin.transaction.search.filter.from"
                      defaultMessage="FROM:"
                    /></p>}
                    value={keyword}
                    onChange={(event) => {
                      setKeyword(event.target.value);
                    }}
                    className="trans_filter_accordion_detail_from flex-grow-1"
                  />
                  <AdormentTextField
                    fullWidth
                    placeholder={intl.formatMessage({ id: "admin.transaction.search.filter.date.placeholder", defaultMessage: "dd.mm.yyy" })}
                    adormentText={<p className="m-0"><FormattedMessage
                      id="admin.transaction.search.filter.to"
                      defaultMessage="TO:"
                    /></p>}
                    value={keyword}
                    onChange={(event) => {
                      setKeyword(event.target.value);
                    }}
                    className="trans_filter_accordion_detail_to flex-grow-1"
                  />
                </div>
                <div classes="">
                <ToggleButtonGroup value={formats} onChange={handleFormat} aria-label="text formatting">
                  <ToggleButton value="bold" aria-label="bold">
                    
                  </ToggleButton>
                  <ToggleButton value="italic" aria-label="italic">
                    
                  </ToggleButton>
                  <ToggleButton value="underlined" aria-label="underlined">
                    
                  </ToggleButton>
                  <ToggleButton value="color" aria-label="color" disabled>
                    
                  </ToggleButton>
                </ToggleButtonGroup>
                </div>
                <div className="">
                  status
                  </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <EmoneyTable data={props.list}
        columns={columns}
        isGrouping={true}
        grouping={grouping}
        onSelected={handleSelectRow}
        totalCount={100}
        isPagination={true}
        isSubHeader={true}
        subHeader={<SubHeader />}
      />
      <Drawer anchor="bottom" open={drawerOpen} onClose={toggleDrawer(false)} classes={{ paper: "trans_drawer" }}>
        <div className="trans_drawer_container">
          <div className="trans_drawer_content d-flex flex-column p-3">
            <div className="trans_drawer_content_header d-flex flex-row-reverse align-items-center">
              <Tooltip
                classes={{ tooltip: "trans_drawer_button_tooltip", arrow: "trans_drawer_button_arrow" }}
                arrow
                title={intl.formatMessage({ id: "admin.transaction.drawer.button.tooltip.close", defaultMessage: "Copy to Close" })}
                placement="top"
              >
                <IconButton aria-label="delete" size="medium" className="trans_drawer_top_button">
                  <CloseIcon fontSize="large" />
                </IconButton>
              </Tooltip>
              <Tooltip
                classes={{ tooltip: "trans_drawer_button_tooltip", arrow: "trans_drawer_button_arrow" }}
                arrow
                title={intl.formatMessage({ id: "admin.transaction.drawer.button.tooltip.copy", defaultMessage: "Copy to Clipboard" })}
                placement="top"
              >
                <IconButton variant="contained" aria-label="delete" size="medium" className="trans_drawer_top_button">
                  <FileCopyOutlinedIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </div>
            <div className="flex-grow-1 pr-5 pl-5 d-flex flex-column">
              <div className="trans_drawer_content_title">
                {intl.formatMessage({ id: "admin.transaction.drawer.title", defaultMessage: "TRANSACTION DETAILS" })}
              </div>
              <div className="trans_drawer_content_content">
                {props.data.description}
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </Fragment>
  );
};

const state = createStructuredSelector({
  list: getTransactionList,
  data: getTransaction
});
export default connect(state)(injectIntl(withMemo(Transaction)));
