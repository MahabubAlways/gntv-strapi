import type { Struct, Schema } from '@strapi/strapi';

export interface SupportSupport extends Struct.ComponentSchema {
  collectionName: 'components_support_supports';
  info: {
    displayName: 'Support';
  };
  attributes: {
    Title: Schema.Attribute.String;
    description: Schema.Attribute.Blocks;
  };
}

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

export interface InterocitorInterocitorDevice extends Struct.ComponentSchema {
  collectionName: 'components_interocitor_interocitor_devices';
  info: {
    displayName: 'InterocitorDevice';
  };
  attributes: {
    Title: Schema.Attribute.String;
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Button: Schema.Attribute.Component<'common.button', true>;
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

export interface FeaturedFeaturedShows extends Struct.ComponentSchema {
  collectionName: 'components_featured_featured_shows';
  info: {
    displayName: 'featuredShows';
  };
  attributes: {
    Title: Schema.Attribute.String;
    featuredCard: Schema.Attribute.Component<'featured.featured-card', true>;
  };
}

export interface FeaturedFeaturedCard extends Struct.ComponentSchema {
  collectionName: 'components_featured_featured_cards';
  info: {
    displayName: 'featuredCard';
  };
  attributes: {
    Title: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    VideoURL: Schema.Attribute.String;
  };
}

export interface DownloadsDownloads extends Struct.ComponentSchema {
  collectionName: 'components_downloads_downloads';
  info: {
    displayName: 'Downloads';
    description: '';
  };
  attributes: {
    Title: Schema.Attribute.String;
    DownloadItem: Schema.Attribute.Component<'downloads.download-item', true>;
    description: Schema.Attribute.Blocks;
  };
}

export interface DownloadsDownloadItem extends Struct.ComponentSchema {
  collectionName: 'components_downloads_download_items';
  info: {
    displayName: 'DownloadItem';
  };
  attributes: {
    text: Schema.Attribute.String;
    Button: Schema.Attribute.Component<'common.button', false>;
  };
}

export interface DemoDemoEvent extends Struct.ComponentSchema {
  collectionName: 'components_demo_demo_events';
  info: {
    displayName: 'demoEvent';
  };
  attributes: {
    Title: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    VideoURL: Schema.Attribute.String;
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
      'support.support': SupportSupport;
      'menu.menu-item': MenuMenuItem;
      'menu.child-menu-item': MenuChildMenuItem;
      'interocitor.interocitor-device': InterocitorInterocitorDevice;
      'home.services': HomeServices;
      'home.service-card': HomeServiceCard;
      'home.hero': HomeHero;
      'home.experience': HomeExperience;
      'featured.featured-shows': FeaturedFeaturedShows;
      'featured.featured-card': FeaturedFeaturedCard;
      'downloads.downloads': DownloadsDownloads;
      'downloads.download-item': DownloadsDownloadItem;
      'demo.demo-event': DemoDemoEvent;
      'common.button': CommonButton;
    }
  }
}
