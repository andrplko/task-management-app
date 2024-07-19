const transformSortOption = (option: unknown) => {
  let result: { $sort: Record<string, unknown> } | null = { $sort: {} };

  switch (option) {
    case 'ASC by status':
      result.$sort.status = 1;
      break;
    case 'DESC by status':
      result.$sort.status = -1;
      break;
    case 'ASC by title':
      result.$sort.title = 1;
      break;
    case 'DESC by title':
      result.$sort.title = -1;
      break;
    default:
      result = null;
      break;
  }

  return result;
};

export { transformSortOption };
