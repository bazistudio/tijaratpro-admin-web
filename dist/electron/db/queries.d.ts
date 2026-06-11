export declare function mutateEntity(entityType: string, operation: 'CREATE' | 'UPDATE' | 'DELETE', payload: any): {
    success: boolean;
    opId: string;
};
export declare function queryEntity(entityType: string, id: string): any;
export declare function queryAll(entityType: string): unknown[];
//# sourceMappingURL=queries.d.ts.map