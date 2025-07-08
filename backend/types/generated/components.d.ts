import type { Schema, Struct } from '@strapi/strapi';

export interface TestCategory1TestComponent extends Struct.ComponentSchema {
  collectionName: 'components_test_category1_test_components';
  info: {
    displayName: 'TestComponent';
    icon: 'alien';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'test-category1.test-component': TestCategory1TestComponent;
    }
  }
}
