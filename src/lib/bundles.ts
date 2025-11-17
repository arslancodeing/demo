import type { ProductBundle } from './types';

export const bundles: ProductBundle[] = [
    {
        id: 'living-room-set-1',
        name: 'Classic Living Room Set',
        description: 'A complete set for a sophisticated living space, featuring our best-selling sofa and a matching lamp.',
        productIds: ['kensington-sofa', 'brighton-lamp'],
        imageId: 'bundle-living-room'
    },
    {
        id: 'bedroom-set-1',
        name: 'Elegant Bedroom Suite',
        description: 'Create your dream bedroom with this elegant bed and stylish industrial-chic sideboard.',
        productIds: ['mayfair-bed', 'shoreditch-sideboard'],
        imageId: 'bundle-bedroom'
    }
];
