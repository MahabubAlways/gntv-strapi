import type { Schema, Struct } from '@strapi/strapi';

export interface CommonButton extends Struct.ComponentSchema {
  collectionName: 'components_common_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    Label: Schema.Attribute.String;
    Target_blank: Schema.Attribute.Boolean;
    URI: Schema.Attribute.String;
  };
}

export interface DemoDemoEvent extends Struct.ComponentSchema {
  collectionName: 'components_demo_demo_events';
  info: {
    displayName: 'demoEvent';
  };
  attributes: {
    description: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
    VideoURL: Schema.Attribute.String;
  };
}

export interface DownloadsDownloadItem extends Struct.ComponentSchema {
  collectionName: 'components_downloads_download_items';
  info: {
    displayName: 'DownloadItem';
  };
  attributes: {
    Button: Schema.Attribute.Component<'common.button', false>;
    text: Schema.Attribute.String;
  };
}

export interface DownloadsDownloads extends Struct.ComponentSchema {
  collectionName: 'components_downloads_downloads';
  info: {
    description: '';
    displayName: 'Downloads';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    DownloadItem: Schema.Attribute.Component<'downloads.download-item', true>;
    Title: Schema.Attribute.String;
  };
}

export interface FeaturedFeaturedCard extends Struct.ComponentSchema {
  collectionName: 'components_featured_featured_cards';
  info: {
    displayName: 'featuredCard';
  };
  attributes: {
    description: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
    VideoURL: Schema.Attribute.String;
  };
}

export interface FeaturedFeaturedShows extends Struct.ComponentSchema {
  collectionName: 'components_featured_featured_shows';
  info: {
    displayName: 'featuredShows';
  };
  attributes: {
    featuredCard: Schema.Attribute.Component<'featured.featured-card', true>;
    Title: Schema.Attribute.String;
  };
}

export interface FooterFooterTitle extends Struct.ComponentSchema {
  collectionName: 'components_footer_footer_titles';
  info: {
    displayName: 'footerTitle';
  };
  attributes: {
    Title: Schema.Attribute.String;
    titleSpan: Schema.Attribute.String;
    URI: Schema.Attribute.String;
  };
}

export interface HomeExperience extends Struct.ComponentSchema {
  collectionName: 'components_home_experiences';
  info: {
    description: '';
    displayName: 'Experience';
  };
  attributes: {
    Button: Schema.Attribute.Component<'common.button', true>;
    description: Schema.Attribute.Blocks & Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
    VideoURL: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeHero extends Struct.ComponentSchema {
  collectionName: 'components_home_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    Button: Schema.Attribute.Component<'common.button', true>;
    Description: Schema.Attribute.Blocks;
    Title: Schema.Attribute.String;
  };
}

export interface HomeServiceCard extends Struct.ComponentSchema {
  collectionName: 'components_home_service_cards';
  info: {
    description: '';
    displayName: 'serviceCard';
  };
  attributes: {
    description: Schema.Attribute.Text;
    Icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subTitle: Schema.Attribute.String;
    Title: Schema.Attribute.String;
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

export interface InterocitorInterocitorDevice extends Struct.ComponentSchema {
  collectionName: 'components_interocitor_interocitor_devices';
  info: {
    displayName: 'InterocitorDevice';
  };
  attributes: {
    Button: Schema.Attribute.Component<'common.button', true>;
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Title: Schema.Attribute.String;
  };
}

export interface MenuChildMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_menu_child_menu_items';
  info: {
    description: '';
    displayName: 'children';
    icon: 'bulletList';
  };
  attributes: {
    IsExternal: Schema.Attribute.Boolean;
    Label: Schema.Attribute.String;
    URI: Schema.Attribute.String;
  };
}

export interface MenuMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_menu_menu_items';
  info: {
    description: '';
    displayName: 'MenuItem';
    icon: 'bulletList';
  };
  attributes: {
    children: Schema.Attribute.Component<'menu.child-menu-item', true>;
    IsExternal: Schema.Attribute.Boolean;
    Label: Schema.Attribute.String;
    URI: Schema.Attribute.String;
  };
}

export interface SupportSupport extends Struct.ComponentSchema {
  collectionName: 'components_support_supports';
  info: {
    displayName: 'Support';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    Title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'common.button': CommonButton;
      'demo.demo-event': DemoDemoEvent;
      'downloads.download-item': DownloadsDownloadItem;
      'downloads.downloads': DownloadsDownloads;
      'featured.featured-card': FeaturedFeaturedCard;
      'featured.featured-shows': FeaturedFeaturedShows;
      'footer.footer-title': FooterFooterTitle;
      'home.experience': HomeExperience;
      'home.hero': HomeHero;
      'home.service-card': HomeServiceCard;
      'home.services': HomeServices;
      'interocitor.interocitor-device': InterocitorInterocitorDevice;
      'menu.child-menu-item': MenuChildMenuItem;
      'menu.menu-item': MenuMenuItem;
      'support.support': SupportSupport;
    }
  }
}
