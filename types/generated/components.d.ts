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

export interface HomeServices extends Struct.ComponentSchema {
  collectionName: 'components_home_services';
  info: {
    displayName: 'Services';
  };
  attributes: {
    Service: Schema.Attribute.Component<'home.service-card', true>;
  };
}

export interface HomeServiceCard extends Struct.ComponentSchema {
  collectionName: 'components_home_service_cards';
  info: {
    displayName: 'serviceCard';
    description: '';
  };
  attributes: {
    Title: Schema.Attribute.String;
    subTitle: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    Icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface HomeHero extends Struct.ComponentSchema {
  collectionName: 'components_home_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    Title: Schema.Attribute.String;
    Description: Schema.Attribute.Blocks;
    Button: Schema.Attribute.Component<'common.button', true>;
  };
}

export interface HomeExperience extends Struct.ComponentSchema {
  collectionName: 'components_home_experiences';
  info: {
    displayName: 'Experience';
    description: '';
  };
  attributes: {
    Title: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Blocks & Schema.Attribute.Required;
    Button: Schema.Attribute.Component<'common.button', true>;
    VideoURL: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonButton extends Struct.ComponentSchema {
  collectionName: 'components_common_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    URI: Schema.Attribute.String;
    Label: Schema.Attribute.String;
    Target_blank: Schema.Attribute.Boolean;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'menu.menu-item': MenuMenuItem;
      'menu.child-menu-item': MenuChildMenuItem;
      'home.services': HomeServices;
      'home.service-card': HomeServiceCard;
      'home.hero': HomeHero;
      'home.experience': HomeExperience;
      'common.button': CommonButton;
    }
  }
}
