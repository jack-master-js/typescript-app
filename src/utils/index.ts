export const page = (pageIndex:number, pageSize:number, where:any) => {
    return {
      skip: pageIndex - 1,
      take: pageSize,
      where,
    };
  }