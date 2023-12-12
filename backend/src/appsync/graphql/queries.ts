/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      identityId
      email
      firstName
      lastName
      phone
      createdAt
      updatedAt
      owner
      tokenSet
    }
  }
`;
export const xeroGetInvoices = /* GraphQL */ `
  query XeroGetInvoices($input: GetInvoiceInput!) {
    xeroGetInvoices(input: $input) {
      type
      contact {
        contactID
        contactNumber
        accountNumber
        contactStatus
        name
        firstName
        lastName
        companyNumber
        emailAddress
        bankAccountDetails
        taxNumber
        accountsReceivableTaxType
        accountsPayableTaxType
        isSupplier
        isCustomer
        defaultCurrency
        updatedDateUTC
        hasAttachments
        xeroNetworkKey
        salesDefaultAccountCode
        purchasesDefaultAccountCode
        trackingCategoryName
        trackingCategoryOption
        paymentTerms
        website
        discount
      }
      date
      dueDate
      status
      lineAmountTypes
      lineItems {
        lineItemID
        description
        quantity
        unitAmount
        itemCode
        accountCode
        accountID
        taxType
        taxAmount
        lineAmount
        taxNumber
        discountRate
        discountAmount
        repeatingInvoiceID
      }
      subTotal
      totalTax
      total
      currencyCode
      invoiceID
      invoiceNumber
      amountDue
      amountPaid
      amountCredited
      payments {
        date
        amount
        paymentID
      }
    }
  }
`;
export const xeroGetInvoiceCount = /* GraphQL */ `
  query XeroGetInvoiceCount {
    xeroGetInvoiceCount
  }
`;
