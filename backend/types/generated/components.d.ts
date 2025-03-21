import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsCards extends Struct.ComponentSchema {
  collectionName: 'components_components_cards';
  info: {
    displayName: 'Cards';
  };
  attributes: {
    description: Schema.Attribute.Text;
    img: Schema.Attribute.String;
    more: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ComponentsDescriptionHp extends Struct.ComponentSchema {
  collectionName: 'components_components_description_hps';
  info: {
    description: '';
    displayName: 'descriptionHP';
  };
  attributes: {
    description: Schema.Attribute.Text;
    mainTitle: Schema.Attribute.String;
  };
}

export interface ComponentsEshop extends Struct.ComponentSchema {
  collectionName: 'components_components_eshops';
  info: {
    description: '';
    displayName: 'eshop';
  };
  attributes: {
    color: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    marka: Schema.Attribute.String;
    media: Schema.Attribute.String;
    name: Schema.Attribute.String;
    price: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    rating: Schema.Attribute.String;
    type: Schema.Attribute.String;
  };
}

export interface ComponentsLink extends Struct.ComponentSchema {
  collectionName: 'components_components_links';
  info: {
    description: '';
    displayName: 'LinkFooter';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    mainTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ComponentsMenu extends Struct.ComponentSchema {
  collectionName: 'components_components_menus';
  info: {
    description: '';
    displayName: 'Menu';
  };
  attributes: {
    children: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ComponentsSeccondConatinerHp extends Struct.ComponentSchema {
  collectionName: 'components_components_seccond_conatiner_hps';
  info: {
    description: '';
    displayName: 'seccondConatinerHP';
  };
  attributes: {
    url: Schema.Attribute.String;
  };
}

export interface ComponentsSlider extends Struct.ComponentSchema {
  collectionName: 'components_components_sliders';
  info: {
    description: '';
    displayName: 'Slider';
  };
  attributes: {
    img: Schema.Attribute.Media<'images', true>;
    url: Schema.Attribute.String;
  };
}

export interface GlobalLinks extends Struct.ComponentSchema {
  collectionName: 'components_global_links';
  info: {
    displayName: 'links';
  };
  attributes: {
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'components.cards': ComponentsCards;
      'components.description-hp': ComponentsDescriptionHp;
      'components.eshop': ComponentsEshop;
      'components.link': ComponentsLink;
      'components.menu': ComponentsMenu;
      'components.seccond-conatiner-hp': ComponentsSeccondConatinerHp;
      'components.slider': ComponentsSlider;
      'global.links': GlobalLinks;
    }
  }
}
