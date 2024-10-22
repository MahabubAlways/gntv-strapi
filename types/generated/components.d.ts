import type { Struct, Schema } from '@strapi/strapi';

export interface MenuMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_menu_menu_items';
  info: {
    displayName: 'MenuItem';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    Label: Schema.Attribute.String;
    URI: Schema.Attribute.String;
    IsExternal: Schema.Attribute.Boolean;
    children: Schema.Attribute.Component<'menu.child-menu-item', true>;
  };
}

export interface MenuChildMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_menu_child_menu_items';
  info: {
    displayName: 'children';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    Label: Schema.Attribute.String;
    URI: Schema.Attribute.String;
    IsExternal: Schema.Attribute.Boolean;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'menu.menu-item': MenuMenuItem;
      'menu.child-menu-item': MenuChildMenuItem;
    }
  }
}
