export function resolveTitle(pageName) {
  switch (pageName) {
    case 'Metadata':
      return 'Contract Metadata Registry';
    default:
      return pageName;
  }
}

export function resolveDetailsTitle(pageName) {
  switch (pageName) {
    case 'Metadata':
      return 'Contract Metadata Details';
    case 'Contracts':
      return 'Contract Details';
    case 'Blocks':
      return 'Block Details';
    case 'Tokens':
      return 'Token Details';
    case 'Transactions':
      return 'Transaction Details';
    case 'Accounts':
      return 'Account Details';
    default:
      return pageName;
  }
}
