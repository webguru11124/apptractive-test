/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type UpdateUserInput = {
  id: string,
  firstName?: string | null,
  lastName?: string | null,
};

export type User = {
  __typename: "User",
  id: string,
  identityId?: string | null,
  email?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  phone?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  owner?: string | null,
  tokenSet?: string | null,
};

export type XeroCreateConsentUrlInput = {
  scopeSet: XeroScopeSet,
};

export enum XeroScopeSet {
  PROFILE = "PROFILE",
  ACCOUNTING = "ACCOUNTING",
}


export type XeroCreateTokenSetInput = {
  url: string,
  scopeSet: XeroScopeSet,
};

export type XeroCreateTokenSetResponse = {
  __typename: "XeroCreateTokenSetResponse",
  token?: string | null,
  expiresIn?: number | null,
  user?: XeroCreateTokenSetUser | null,
};

export type XeroCreateTokenSetUser = {
  __typename: "XeroCreateTokenSetUser",
  email?: string | null,
  givenName?: string | null,
  familyName?: string | null,
};

export type GetInvoiceInput = {
  page?: number | null,
  limit?: number | null,
  statuses?: Array< XeroInvoiceStatus | null > | null,
};

export enum XeroInvoiceStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  DELETED = "DELETED",
  AUTHORISED = "AUTHORISED",
  PAID = "PAID",
  VOIDED = "VOIDED",
}


export type XeroInvoice = {
  __typename: "XeroInvoice",
  type: string,
  contact: XeroContact,
  date?: string | null,
  dueDate?: string | null,
  status: string,
  lineAmountTypes: string,
  lineItems?:  Array<XeroLineItem | null > | null,
  subTotal: number,
  totalTax: number,
  total: number,
  currencyCode: string,
  invoiceID: string,
  invoiceNumber: string,
  amountDue: number,
  amountPaid: number,
  amountCredited: number,
  payments?:  Array<XeroPayment | null > | null,
};

export type XeroContact = {
  __typename: "XeroContact",
  contactID: string,
  contactNumber?: string | null,
  accountNumber?: string | null,
  contactStatus?: string | null,
  name?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  companyNumber?: string | null,
  emailAddress?: string | null,
  bankAccountDetails?: string | null,
  taxNumber?: string | null,
  accountsReceivableTaxType?: string | null,
  accountsPayableTaxType?: string | null,
  addresses?:  Array<XeroAddress | null > | null,
  phones?:  Array<XeroPhone | null > | null,
  isSupplier?: boolean | null,
  isCustomer?: boolean | null,
  defaultCurrency?: string | null,
  updatedDateUTC?: string | null,
  contactPersons?:  Array<XeroContactPerson | null > | null,
  hasAttachments?: boolean | null,
  xeroNetworkKey?: string | null,
  salesDefaultAccountCode?: string | null,
  purchasesDefaultAccountCode?: string | null,
  trackingCategoryName?: string | null,
  trackingCategoryOption?: string | null,
  paymentTerms?: string | null,
  website?: string | null,
  discount?: number | null,
};

export type XeroAddress = {
  __typename: "XeroAddress",
  addressType?: string | null,
  addressLine1?: string | null,
  addressLine2?: string | null,
  addressLine3?: string | null,
  addressLine4?: string | null,
  city?: string | null,
  region?: string | null,
  postalCode?: string | null,
  country?: string | null,
  attentionTo?: string | null,
};

export type XeroPhone = {
  __typename: "XeroPhone",
  phoneType?: string | null,
  phoneNumber?: string | null,
  phoneAreaCode?: string | null,
  phoneCountryCode?: string | null,
};

export type XeroContactPerson = {
  __typename: "XeroContactPerson",
  firstName?: string | null,
  lastName?: string | null,
  emailAddress?: string | null,
  includeInEmails?: boolean | null,
};

export type XeroLineItem = {
  __typename: "XeroLineItem",
  lineItemID: string,
  description?: string | null,
  quantity?: number | null,
  unitAmount?: number | null,
  itemCode?: string | null,
  accountCode?: string | null,
  accountID?: string | null,
  taxType?: string | null,
  taxAmount?: number | null,
  lineAmount?: number | null,
  taxNumber?: number | null,
  discountRate?: number | null,
  discountAmount?: number | null,
  repeatingInvoiceID?: string | null,
};

export type XeroPayment = {
  __typename: "XeroPayment",
  date: string,
  amount: number,
  paymentID: string,
};

export type GetInvoiceCountInput = {
  statuses?: Array< XeroInvoiceStatus | null > | null,
};

export type UpdateUserMutationVariables = {
  input?: UpdateUserInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    identityId?: string | null,
    email?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    phone?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    owner?: string | null,
    tokenSet?: string | null,
  } | null,
};

export type XeroCreateConsentUrlMutationVariables = {
  input?: XeroCreateConsentUrlInput | null,
};

export type XeroCreateConsentUrlMutation = {
  xeroCreateConsentUrl?: string | null,
};

export type XeroCreateTokenSetMutationVariables = {
  input?: XeroCreateTokenSetInput | null,
};

export type XeroCreateTokenSetMutation = {
  xeroCreateTokenSet?:  {
    __typename: "XeroCreateTokenSetResponse",
    token?: string | null,
    expiresIn?: number | null,
    user?:  {
      __typename: "XeroCreateTokenSetUser",
      email?: string | null,
      givenName?: string | null,
      familyName?: string | null,
    } | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    identityId?: string | null,
    email?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    phone?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    owner?: string | null,
    tokenSet?: string | null,
  } | null,
};

export type XeroGetInvoicesQueryVariables = {
  input: GetInvoiceInput,
};

export type XeroGetInvoicesQuery = {
  xeroGetInvoices?:  Array< {
    __typename: "XeroInvoice",
    type: string,
    contact:  {
      __typename: "XeroContact",
      contactID: string,
      contactNumber?: string | null,
      accountNumber?: string | null,
      contactStatus?: string | null,
      name?: string | null,
      firstName?: string | null,
      lastName?: string | null,
      companyNumber?: string | null,
      emailAddress?: string | null,
      bankAccountDetails?: string | null,
      taxNumber?: string | null,
      accountsReceivableTaxType?: string | null,
      accountsPayableTaxType?: string | null,
      isSupplier?: boolean | null,
      isCustomer?: boolean | null,
      defaultCurrency?: string | null,
      updatedDateUTC?: string | null,
      hasAttachments?: boolean | null,
      xeroNetworkKey?: string | null,
      salesDefaultAccountCode?: string | null,
      purchasesDefaultAccountCode?: string | null,
      trackingCategoryName?: string | null,
      trackingCategoryOption?: string | null,
      paymentTerms?: string | null,
      website?: string | null,
      discount?: number | null,
    },
    date?: string | null,
    dueDate?: string | null,
    status: string,
    lineAmountTypes: string,
    lineItems?:  Array< {
      __typename: "XeroLineItem",
      lineItemID: string,
      description?: string | null,
      quantity?: number | null,
      unitAmount?: number | null,
      itemCode?: string | null,
      accountCode?: string | null,
      accountID?: string | null,
      taxType?: string | null,
      taxAmount?: number | null,
      lineAmount?: number | null,
      taxNumber?: number | null,
      discountRate?: number | null,
      discountAmount?: number | null,
      repeatingInvoiceID?: string | null,
    } | null > | null,
    subTotal: number,
    totalTax: number,
    total: number,
    currencyCode: string,
    invoiceID: string,
    invoiceNumber: string,
    amountDue: number,
    amountPaid: number,
    amountCredited: number,
    payments?:  Array< {
      __typename: "XeroPayment",
      date: string,
      amount: number,
      paymentID: string,
    } | null > | null,
  } | null > | null,
};

export type XeroGetInvoiceCountQueryVariables = {
  input?: GetInvoiceCountInput | null,
};

export type XeroGetInvoiceCountQuery = {
  xeroGetInvoiceCount: number,
};
