import { EntityDataModuleConfig, EntityMetadataMap } from "@ngrx/data";

const entityMetadata: EntityMetadataMap = {
    Post:{
        // برای اینکه منتظر پاسخ سرور باشد بعد به روز شود
        entityDispatcherOptions: {
            optimisticUpdate: true,
            optimisticDelete: true     
        }
    }
};

export const entityConfig: EntityDataModuleConfig = {
    entityMetadata,
}