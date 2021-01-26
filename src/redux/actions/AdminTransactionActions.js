import { SUCCESS_SUFFIX } from 'constant';
import * as actionTypes from 'redux/actionTypes';


const test_transactions = [
  {
    id: 1,
    company: "Company1",
    beneficiary: "Sophie-Marie ",
    method: "SEPA",
    number: "DE41 2501 0030 0143 3963",
    amount: 400,
    fee: 98.50,
    currency: "uro",
    status: 1,
    description: "this is transaction detail this is transaction detail this is transaction detail this is transaction detail this is transaction detail",
    date: new Date().toDateString()
  },
  {
    id: 2,
    company: "Company1",
    beneficiary: "Sophie-Marie ",
    method: "SEPA",
    number: "DE41 2501 0030 0143 3963",
    amount: 400,
    fee: 98.50,
    currency: "uro",
    status: 1,
    description: "this is transaction detail this is transaction detail this is transaction detail this is transaction detail this is transaction detail",
    date: new Date().toDateString()
  },
  {
    id: 3,
    company: "Company1",
    beneficiary: "Sophie-Marie ",
    method: "SEPA",
    number: "DE41 2501 0030 0143 3963",
    amount: 400,
    fee: 98.50,
    currency: "uro",
    status: 1,
    description: "this is transaction detail this is transaction detail this is transaction detail this is transaction detail this is transaction detail",
    date: new Date().toDateString()
  },
  {
    id: 4,
    company: "Company1",
    beneficiary: "Sophie-Marie ",
    method: "SEPA",
    number: "DE41 2501 0030 0143 3963",
    amount: 400,
    fee: 98.50,
    currency: "uro",
    status: 1,
    description: "this is transaction detail this is transaction detail this is transaction detail this is transaction detail this is transaction detail",
    date: new Date().toDateString()
  },
  {
    id: 5,
    company: "Company1",
    beneficiary: "Sophie-Marie ",
    method: "SEPA",
    number: "DE41 2501 0030 0143 3963",
    amount: 400,
    fee: 98.50,
    currency: "uro",
    status: 1,
    description: "this is transaction detail this is transaction detail this is transaction detail this is transaction detail this is transaction detail",
    date: new Date().toDateString()
  },
  {
    id: 6,
    company: "Company1",
    beneficiary: "Sophie-Marie ",
    method: "SEPA",
    number: "DE41 2501 0030 0143 3963",
    amount: 400,
    fee: 98.50,
    currency: "uro",
    status: 1,
    description: "this is transaction detail this is transaction detail this is transaction detail this is transaction detail this is transaction detail",
    date: new Date().toDateString()
  },
  {
    id: 7,
    company: "Company1",
    beneficiary: "Sophie-Marie ",
    method: "SEPA",
    number: "DE41 2501 0030 0143 3963",
    amount: 400,
    fee: 98.50,
    currency: "uro",
    status: 1,
    date: new Date(new Date().setFullYear(2020)).toDateString()
  },
];

export const getTransactionList = ( pageCount, countPerPage, pageNumber ) => (dispatch) => {

  dispatch({
    type: actionTypes.ADMIN_GET_TRANSACTION_LIST + SUCCESS_SUFFIX,
    payload: {
      data: {
        list: test_transactions
      }
    }
  });
  return test_transactions;
};

export const getTransaction = (id) => (dispatch) => {  
  let selected = {};
  for (var i = 0 ; i < test_transactions.length; i++)
  {
    if (test_transactions[i].id === id)
    {
      selected = test_transactions[i];
      break;
    }
  }
  dispatch({
    type: actionTypes.ADMIN_GET_TRANSACTION + SUCCESS_SUFFIX,
    payload: {
      data: {
        selected: selected
      }
    }
  });
  return selected;
}

export const AdminTransactionActions = [];
